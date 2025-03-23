import express, { Request, Response } from "express"; 
import jwt from "jsonwebtoken";
import { UserModel, AssignmentModel, SubmissionModel } from "./Schema/db";
import { JWT_PASSWORD, GEMINI_API_KEY, MAIN_READ_WRITE_TOKEN} from "./Config/config";
import { userMiddleware } from "./Middleware/middleware";
import multer from 'multer';
import { randomHash, filterNullValues, filterObjectProperties, InnerObjectType, FilteredObjectType, filterSecondObjectProperties, FilteredSecondObjectType, ThirdFilteredObjectType, ThirdfilterObjectProperties } from "./Utils/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import cors from "cors";
import bcrypt from "bcrypt"
import fs from "fs";
import path from "path";
import { createObjectCsvStringifier } from 'csv-writer'; 
import { put } from '@vercel/blob';

const app = express();
app.use(express.json()); 
// Enable CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://grade-genie.vercel.app',
  'https://grade-genie-git-main-team-altfs-projects.vercel.app',
  'https://grade-genie-21na6hq7f-team-altfs-projects.vercel.app'
];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['*'], // Allow all headers
  credentials: true
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
    limits: { fileSize: 3 * 1024 * 1024 }
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
    return
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


  app.post("/api/v1/data", upload.single('assignmentFile'), async (req: Request, res: Response): Promise<void> => {
    try {
        const { Name, Class, Section, RollNo, Department, Email, PhoneNumber, hash } = req.body;
        let ocrTextResult = "OCR processing not performed.";
        let geminiUploadedFile;
        let assignmentFilePath: string | undefined = undefined;

        if (req.file) {
             // --- Vercel Blob Upload ---
            const file = req.file;
            const { url } = await put(file.originalname, file.buffer, {
                access: 'public', 
                token: MAIN_READ_WRITE_TOKEN,
            });

            assignmentFilePath = url; // Store the Vercel Blob URL


            try {
                geminiUploadedFile = await uploadToGemini(req.file.path, req.file.mimetype); // Still upload to Gemini
                await waitForFilesActive([geminiUploadedFile]);


                const geminiRequest = {
                    contents: [{
                        role: "user",
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
                    ocrTextResult = "Error during Gemini file upload or processing.";
                    console.error("Gemini OCR failed to extract text.");
                }

            } catch (geminiUploadError: any) {
                console.error("Gemini File Upload or Processing Error:", geminiUploadError);
                ocrTextResult = "Error during Gemini file upload or processing.";
            }
        }
        if (ocrTextResult !== "Error during Gemini file upload or processing.") {
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
        } else {
            res.status(201).json({
                message: 'Submission unsuccessful'
            });
        }
    } catch (error: any) {
        console.error('Error saving submission or during OCR process:', error);
        if (error instanceof multer.MulterError && error.code === 'LIMIT_FILE_SIZE') {
            res.status(400).json({ message: 'File size exceeds the limit of 5MB.' });
        } else {
            res.status(500).json({ message: 'Failed to submit data or process OCR', error: error.message });
        }
    }
    return;
});

app.post("/api/v1/result", async (req: Request, res: Response): Promise<void> => {
    try {
      const { ocrText, sub_id } = req.body;
      if (!ocrText || !sub_id) {
        res.status(400).json({ message: "Missing required fields: ocrText and sub_id" });
        return;
      }
      const submission = await SubmissionModel.findById(sub_id);
      if (!submission) {
        res.status(404).json({ message: "Submission not found" });
        return;
      }
      const assignment = await AssignmentModel.findOne({ 
        hash: submission.hash 
      });
      if (!assignment) {
        res.status(400).json({ message: "Linked assignment not found" });
        return;
      }
      const systemInstruction = `You are a professional teacher who critically evaluates student's answers based on multiple factors, including depth, clarity, knowledge, grammar, and tone. Your task is to assess their responses rigorously and assign them a score on a scale of 1 to 100, ensuring that the score appears as the heading of your response. You need to be pretty harsh in your evaluation and can also return 0 if the answer is not upto the mark. The score should be in the format of "Score: <score> / 100". Also the Grade should be in bold to distinguish it from the followed feedback. Following this, you must provide a concise yet insightful analysis of their answer within 150-200 words, highlighting its strengths and weaknesses. After the analysis, generate a detailed, personalized feedback section of up to 500 words, offering constructive suggestions for improvement. Maintain a friendly and encouraging tone throughout your response to ensure the student feels motivated and supported in their learning journey.`;
      const userContent = `Name: ${submission.Name || "Student"}\nQuestions: ${assignment.Questions}\nAnswer: ${ocrText}`;
      const geminiResponse = await model.generateContent({
        contents: [{
          role: "user",
          parts: [
            { text: systemInstruction },
            { text: userContent }
          ]
        }],
        generationConfig
      }).catch(err => {
        throw new Error(`Gemini API Error: ${err.message}`);
      });
      const evaluationResultText = geminiResponse.response.text();
      if (!evaluationResultText) {
        throw new Error("Empty response from Gemini");
      }
      submission.evaluationResult = evaluationResultText;
      await submission.save();
      res.status(200).json({
        message: "Evaluation successful",
        result: evaluationResultText
      });
  
    } catch (error: any) {
      console.error("Result route error:", error);
      if (!res.headersSent) {
        const statusCode = error.message.includes("not found") ? 404 : 500;
        res.status(statusCode).json({
          message: "Evaluation failed",
        });
      }
    }
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
    } catch (e: any) { 
        console.error("Error in /api/v1/generate:", e); 
        res.status(500).json({
            message: "Failed to generate assignment.",
            error: e.message, 
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

app.get("/api/v1/latest/assignments", userMiddleware, async (req, res): Promise<void> => {
    const userId = req.userId;
    const data: InnerObjectType[] = await AssignmentModel.find({userId})
    if (!data || data.length === 0) {
        res.status(404).json({
            message: "Data Not Found"
        });
        return;
    }
    const assignmentHashes: string[] = data.map(assignment => assignment.hash).filter((hash): hash is string => hash !== undefined);
    const submissionCounts: number[] = [];
    for (const hash of assignmentHashes) {
        const submissions = await SubmissionModel.find({ hash: hash });
        submissionCounts.push(submissions.length);
    }
    const filteredData: ThirdFilteredObjectType[] = ThirdfilterObjectProperties(data);
    res.status(200).json({
        assignments: filteredData, 
        submissionCounts: submissionCounts, 
        message: "Data Fetched Successfully"
    });
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

app.post("/api/v1/export", userMiddleware, async (req, res): Promise<void> => {
    try {
        const hash = req.body.hash;
        if (!hash) {
            res.status(400).send("Hash query parameter is required.");
            return
        }
        const submissions = await SubmissionModel.find({hash: hash})
        const csvStringifier = createObjectCsvStringifier({
            header: [
                { id: 'Name', title: 'Name' },
                { id: 'Class', title: 'Class' },
                { id: 'Section', title: 'Section' },
                { id: 'RollNo', title: 'RollNo' },
                { id: 'Department', title: 'Department' },
                { id: 'Email', title: 'Email' },
                { id: 'PhoneNumber', title: 'PhoneNumber' },
                { id: 'hash', title: 'Hash' },
                { id: 'evaluationResult', title: 'EvaluationResult' },
                { id: 'assignmentFile', title: 'AssignmentFile' },
                { id: '_id', title: 'Submission ID'},
            ]
        });

        const csvData = csvStringifier.getHeaderString() + csvStringifier.stringifyRecords(submissions);

        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=submissions.csv');
        res.status(200).send(csvData);

    } catch (error: any) {
        console.error("Error generating CSV for submissions:", error);
        res.status(500).send("Error generating CSV for submissions");
    }
    return
});


app.listen(3000, ()=> {
    console.log("Server running on port 3000");
})