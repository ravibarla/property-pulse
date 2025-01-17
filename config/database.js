'use serve'
import mongoose from "mongoose";

let connected = false;

const connectDB = async () => {
  mongoose.set("strictQuery", "true");
  //if the database is already connected dont connect again
  if (connected) {
    console.log("mongoDB is already connected");
    return;
  }
  //connect to mongodb
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    connected = true;
    console.log("MongoDB connected ...");
  } catch (err) {
    console.log("error :", err);
  }
};

export default connectDB;
