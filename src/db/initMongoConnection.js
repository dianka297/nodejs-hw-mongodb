import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";

const user = getEnvVar('MONGODB_USER');
const pswd = getEnvVar('MONGODB_PASSWORD');
const url = getEnvVar('MONGODB_URL');
const db = getEnvVar('MONGODB_DB');

const uri = "mongodb+srv://dianamakharadze96:01-E729D@cluster.jryok.mongodb.net/Contacts?retryWrites=true&w=majority";



export async function initMongoConnection() {
    try{
        await mongoose.connect(DB_URI);
        console.log("Mongo connection successfully established!");
    }catch(error){
        console.error("Mongodb connection error",error);
        process.exit(1);
    } 
}