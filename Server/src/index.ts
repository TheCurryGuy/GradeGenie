import express from "express"; 
import jwt from "jsonwebtoken";
import { UserModel, AssignmentModel, SubmissionModel } from "./Schema/db";
import { JWT_PASSWORD } from "./Config/config";
import { userMiddleware } from "./Middleware/middleware";
import { randomHash, filterNullValues } from "./Utils/utils";
import cors from "cors";
import bcrypt from "bcrypt"


const app = express();
app.use(cors({
    origin: 'http://localhost:5173'
}));

app.options('*', cors());
app.use(express.json());

declare global{
    namespace Express{
        export interface Request{
            userId: string
        }
    }
}

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
    const name = req.body.Name;
    const grade = req.body.Class;
    const section = req.body.Section;
    const rollno = req.body.RollNo;
    const dept = req.body.Department;
    const email = req.body.Email;
    const phonenumber = req.body.PhoneNumber;
    const hashed = randomHash(8, req.userId); 
    const questions = req.body.Questions;
    try{
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
            userId: req.userId
        });
        res.json({hash:hashed});
    } catch(e){
        res.json({
            message: "Error"
        })
    }
});

app.get("/api/v1/generate/:shareId", async (req,res) => {
    const hash = req.params.shareId;
    const data = await AssignmentModel.findOne({
        hash
    })
    if(!data) {
        res.status(411).json({
            message: "It Seems like the Submission Deadline Passed away 🫤"
        })
    } else{
        const user = await UserModel.findOne({
            _id: data.userId
        })
        if(!user){
            res.status(404).json({
                message: "User Not Found"
            }) 
            return;
        } 
        res.status(200).json({
            username: user.firstName,//as user can be null although thats imposible
            data: data
        })
    }
})


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



app.listen(3000, ()=> {
    console.log("Server running on port 3000");
})