import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";

const user = getEnvVar("MONGODB_USER");
const pswd = getEnvVar("MONGODB_PASSWORD");
const db = getEnvVar("MONGODB_DB");

const uri = `mongodb+srv://${user}:${pswd}@cluster.jryok.mongodb.net/${db}?retryWrites=true&w=majority`;

export default async function initMongoConnection() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Mongo connection successfully established!");
  } catch (error) {
    console.error("❌ Mongodb connection error", error);
    process.exit(1);
  }
}
