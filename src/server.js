import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI;

export async function initMongoConnection() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Mongo connection successfully established!");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
}
