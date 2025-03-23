import dotenv from "dotenv";
dotenv.config();
export const JWT_PASSWORD = process.env.JWT_PASS;
export const MONGO_URL = process.env.DATABASE_URL;
export const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
export const BLOB_READ_WRITE_TOKEN= process.env.BLOB_READ_WRITE_TOKEN;
