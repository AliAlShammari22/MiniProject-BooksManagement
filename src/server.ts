// import express from "express";
// import mongoose from "mongoose";
// import dotenv from "dotenv";

// const app = express();
// const PORT = 8080;
// dotenv.config();

// //sever
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_DB as string);
//     console.log(`MongoDB connected: ${conn.connection.host} successfully`);
//   } catch (error) {
//     console.error("MongoDB connection failed:", error);
//     process.exit(1);
//   }
// };

// connectDB();

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
