import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";

export const connect = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to database ${conn.connection.host}`.bgGreen.white);
  } catch (err) {
    console.log(`Error in mongodb ${err}`.bgRed.white);
  }
};
