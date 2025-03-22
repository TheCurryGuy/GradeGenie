import mongoose, { model, Schema } from "mongoose";
import { MONGO_URL } from "../Config/config";

mongoose.connect(MONGO_URL? MONGO_URL: "null")

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {type: String, unique : true},
    password: String
})

const AssignmentSchema = new Schema({
   Name: Boolean,
   Class: Boolean,
   Section: Boolean,
   RollNo: Boolean,
   Department: Boolean,
   Email: Boolean,
   PhoneNumber: Boolean,
   hash: String,
   Questions: String,
   Title: String,
   Description: String,
   Deadline: String,
   userId: {type: mongoose.Types.ObjectId, ref: "User", required: true}
})

const SubmissionSchema: Schema = new Schema({
    Name: { type: String },
    Class: { type: String },
    Section: { type: String },
    RollNo: { type: String },
    Department: { type: String },
    Email: { type: String },
    PhoneNumber: { type: String },
    hash: {type: String},
    assignmentFile: { type: String }, // Store the file path or filename in the database
  })


const linkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true}
})

export const UserModel = model("User", UserSchema );
export const LinkModel = model("Link", linkSchema);
export const AssignmentModel = model("Assignment", AssignmentSchema); 
export const SubmissionModel = model("Submissions", SubmissionSchema)
  