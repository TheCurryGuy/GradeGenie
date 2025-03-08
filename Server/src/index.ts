import express from "express"; 
import jwt from "jsonwebtoken";
import { UserModel, LinkModel } from "./Schema/db";
import { JWT_PASSWORD } from "./Config/config";
import { userMiddleware } from "./Middleware/middleware";
// import { randomHash } from "./utils";
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

app.listen(3000, ()=> {
    console.log("Server running on port 3000");
})