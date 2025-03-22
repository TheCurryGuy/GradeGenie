import express, { Request, Response } from "express"; 
import jwt from "jsonwebtoken";
import { UserModel, AssignmentModel, SubmissionModel } from "./Schema/db";
import { JWT_PASSWORD, GEMINI_API_KEY } from "./Config/config";
import { userMiddleware } from "./Middleware/middleware";
import multer from 'multer';
import { randomHash, filterNullValues, filterObjectProperties, InnerObjectType, FilteredObjectType, filterSecondObjectProperties, FilteredSecondObjectType } from "./Utils/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import cors from "cors";
import bcrypt from "bcrypt"
import fs from "fs";
import path from "path";

const app = express();
app.use(express.json()); 
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.options('*', cors());


declare global{
    namespace Express{
        export interface Request{
            userId: string
        }
    }
}

const UPLOADS_DIR = path.join(__dirname, 'uploads');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      fs.mkdirSync(UPLOADS_DIR, { recursive: true }); 
      cb(null, UPLOADS_DIR);
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Use original filename
    }
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }
  });
  
  const apiKey = GEMINI_API_KEY? GEMINI_API_KEY : "null";
  const genAI = new GoogleGenerativeAI(apiKey);
  const fileManager = new GoogleAIFileManager(apiKey);
  
  async function uploadToGemini(filePath: string, mimeType: string) {
    const uploadResult = await fileManager.uploadFile(filePath, {
      mimeType,
      displayName: filePath,
    });
    const file = uploadResult.file;
    console.log(`Uploaded file ${file.displayName} as: ${file.name}`);
    return file;
  }
  
  async function waitForFilesActive(files: any[]) {
    console.log("Waiting for file processing...");
    for (const name of files.map((file) => file.name)) {
      let file = await fileManager.getFile(name);
      while (file.state === "PROCESSING") {
        process.stdout.write(".");
        await new Promise((resolve) => setTimeout(resolve, 10_000));
        file = await fileManager.getFile(name);
      }
      if (file.state !== "ACTIVE") {
        throw Error(`File ${file.name} failed to process`);
      }
    }
    console.log("...all files ready\n");
  }
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens:5000,
    responseMimeType: "text/plain",
  };


app.post("/api/v1/data", upload.single('assignmentFile'), async (req: Request, res:Response): Promise<void> => {
    try {
      // Extract text data from req.body
      const { Name, Class, Section, RollNo, Department, Email, PhoneNumber, hash } = req.body;
      let ocrTextResult = "OCR processing not performed.";
      let geminiUploadedFile;
      let assignmentFilePath: string | undefined = undefined;
  
      if (req.file) {
        assignmentFilePath = req.file.path;
  
        try {
          geminiUploadedFile = await uploadToGemini(assignmentFilePath, req.file.mimetype);
          await waitForFilesActive([geminiUploadedFile]);
  
          // Corrected geminiRequest to include 'role: "user"' in contents
          const geminiRequest = {
            contents: [{
              role: "user", // Added role: "user" here
              parts: [
                {
                  fileData: {
                    mimeType: geminiUploadedFile.mimeType,
                    fileUri: geminiUploadedFile.uri,
                  },
                },
                { text: "Your job is to extract the handwritten text from the file and provide the extracted data as is, without adding any extra words whatsoever. Behave like a ocr and give the extracted data as you response" },
              ],
            }],
            generationConfig: generationConfig,
          };
  
          const geminiResponse = await model.generateContent(geminiRequest);
          const responseText = geminiResponse.response.text();
  
          if (responseText) {
            ocrTextResult = responseText;
            console.log("Gemini OCR Result:", ocrTextResult);
          } else {
            ocrTextResult = "Gemini OCR processing failed to extract text.";
            console.error("Gemini OCR failed to extract text.");
          }
  
        } catch (geminiUploadError: any) {
          console.error("Gemini File Upload or Processing Error:", geminiUploadError);
          ocrTextResult = "Error during Gemini file upload or processing.";
        }
      }
      const newSubmission = await SubmissionModel.create({
        Name,
        Class,
        Section,
        RollNo,
        Department,
        Email,
        PhoneNumber,
        hash,
        assignmentFile: assignmentFilePath,
      });
  
      res.status(201).json({
        message: 'Submission successful',
        submissionId: newSubmission._id,
        ocrText: ocrTextResult,
      });
    } catch (error: any) {
      console.error('Error saving submission or during OCR process:', error);
      if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
        res.status(400).json({ message: 'File size exceeds the limit of 5MB.' });
      } else{
        res.status(500).json({ message: 'Failed to submit data or process OCR', error: error.message });
      }
    }
    return;
});

app.get("/", (req, res) => {

    res.json({
        message: "GradeGenie Server is alive!"
    })
})

app.post("/api/v1/signup",async (req,res) => {
    //todo: zod validation, hash the password
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const password = req.body.password;

    try{
        const hashedPassword = await bcrypt.hash(password, 4)
        await UserModel.create({
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: hashedPassword
        })
        res.json({
            message: "User Signed Up Successfully!"
        })
    }
    catch(error){
        res.sendStatus(403).json({
            message: "User already exists"
        })
    }
})

app.post("/api/v1/signin", async (req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const userExists = await UserModel.findOne({
        username
    })
    if(userExists){
        if (!JWT_PASSWORD) {
            // Handle missing JWT_PASSWORD securely
            res.status(500).json({ message: "Internal Server Error: JWT_PASSWORD is not set" }); 
        } else{
            const passwordMatch = userExists.password ? await bcrypt.compare(password, userExists.password) : false;
            if(!passwordMatch){
                res.status(403).json({
                    message: "Incorrect Credentials"
                })
                return;
            } else{
                const token = jwt.sign({
                    id: userExists._id
                },JWT_PASSWORD);
                res.json({
                    token
                })
            }
        }
    } else{
        res.status(403).json({
            message: "Incorrect Credentials"
        })
    }  
})

app.post("/api/v1/generate", userMiddleware, async (req, res) => {
    console.log(req.body)
    const name = req.body.Name;
    const grade = req.body.Class;
    const section = req.body.Section;
    const rollno = req.body.RollNo;
    const dept = req.body.Department;
    const email = req.body.Email;
    const phonenumber = req.body.PhoneNumber;
    const hashed = randomHash(8, req.userId);
    const questions = req.body.Questions;
    const title = req.body.Title;
    const description = req.body.Description;
    const deadline = req.body.Deadline;

    // Log the received request body to inspect the data
    console.log("Request Body received at /api/v1/generate:", req.body);
    console.log("User ID from middleware:", req.userId); // Log userId to verify middleware

    try {
        await AssignmentModel.create({
            Name: name,
            Class: grade,
            Section: section,
            RollNo: rollno,
            Department: dept,
            Email: email,
            PhoneNumber: phonenumber,
            hash: hashed,
            Questions: questions,
            userId: req.userId,
            Title: title,
            Description: description,
            Deadline: deadline
        });
        res.json({ hash: hashed });
    } catch (e: any) { // Type 'e' as 'any' to access error properties
        console.error("Error in /api/v1/generate:", e); // Log the full error object to server console

        // Send a more informative error response to the frontend
        res.status(500).json({ // Use 500 status code for server errors
            message: "Failed to generate assignment.",
            error: e.message, // Include the error message for debugging
            // Optionally, you can include more error details like e.stack if needed for development,
            // but avoid sending stack traces in production for security reasons.
        });
    }
});

app.get("/api/v1/generate/:shareId", async (req, res) => {
    const hash = req.params.shareId;
    try {
        const data = await AssignmentModel.findOne({
            hash: hash
        }) as InnerObjectType | null;

        if (!data) {
            res.status(404).json({ 
                message: "Assignment not found"
            });
        } else {
            const filteredData: FilteredSecondObjectType = filterSecondObjectProperties(data);
            res.status(200).json({ 
                info: filteredData
            });
        }
    } catch (error) {
        console.error("Error fetching shared assignment:", error);
        res.status(500).json({ 
            message: "Failed to retrieve assignment. Please try again later."
        });
    }
});

app.get("/api/v1/userdata", userMiddleware, async(req, res): Promise<void> => {
    const userId = req.userId;
    const data = await UserModel.findOne({
        _id: userId
    });

    if(data) {
        res.json({ 
            info: data
        });
        return;
    }
    res.status(404).json({ 
        data: "Error user not Found!"
    });
});

app.get("/api/v1/assignments", userMiddleware, async(req, res): Promise<void> => {
    const userId = req.userId;
    const data = await AssignmentModel.find({
        userId: userId
    });
    const dataLen = 89
    if(data) {
        res.json({ 
            info: data,
            submissions: dataLen
        });
        return;
    }
    res.status(404).json({ 
        data: "Error user not Found!"
    });
});


app.post("/api/v1/generate/:shareId", async (req, res)=> {
    const hash = req.params.shareId;
    const data = req.body;
    const filteredData = filterNullValues(data);
    if(!filteredData){
        res.status(404).json({
            message: "Data Not Found"
        })
    } else{
        const verify = await AssignmentModel.findOne({
            hash
        })
        if(!verify){
            res.json({
                message: "unexpected error occured"
            })
        } 
        try{
            await SubmissionModel.create(filteredData);
            res.json({message: "Submitted Successfully"});
        } catch(e){
            res.json({
                message: "Error"
            })
        }
    }
})

app.get("/api/v1/get/latest/all", userMiddleware, async (req, res): Promise<void> => {
    const userId = (req as any).userId; // Assuming userMiddleware adds userId to the request object

    try {
        const data: InnerObjectType[] = await AssignmentModel.find({ userId }); // Fetch ALL assignments for the user

        if (!data || data.length === 0) {
            res.status(404).json({
                message: "Data Not Found"
            });
            return;
        }

        const filteredData: FilteredObjectType[] = filterObjectProperties(data);
        

        res.json({
            data: filteredData // Send the array of filtered objects - THIS IS WHAT YOU WANTED
        });

    } catch (error) {
        console.error("Error fetching assignments:", error);
        res.status(500).json({
            message: "Internal Server Error"
        });
    }
});

app.delete('/api/v1/delete', userMiddleware, async (req, res): Promise<void> => {
    try {
        const { _id } = req.body;
        const userId = req.userId; // Get userId from request object

        if (!_id) {
            res.status(400).json({ success: false, message: 'Missing assignment ID' });
            return;
        }
        const deletedAssignment = await AssignmentModel.findOneAndDelete({
            _id,
            userId // Ensure user owns the assignment
      });
  
      if (!deletedAssignment) {
        res.status(404).json({ success: false, message: 'Assignment not found' });
        return;
      }
  
      res.json({ 
        success: true, 
        message: 'Assignment deleted successfully',
        deletedId: _id
      });
  
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ 
        success: false
      });
    }
  });


app.listen(3000, ()=> {
    console.log("Server running on port 3000");
})