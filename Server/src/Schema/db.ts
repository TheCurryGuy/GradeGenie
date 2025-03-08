import mongoose, { model, Schema } from "mongoose";
import { MONGO_URL } from "../Config/config";

mongoose.connect(MONGO_URL? MONGO_URL: "null")

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    username: {type: String, unique : true},
    password: String
})

const linkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: "User", required: true, unique: true}

})

export const UserModel = model("User", UserSchema );
export const LinkModel = model("Link", linkSchema);
  