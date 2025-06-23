import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import authorsRouter from "./routes/authors.routers";
import categoriesRouter from "./routes/categories.routers";
import booksRouter from "./routes/books.routers";
import notFound from "./middlewares/NotFound";
import errorHandler from "./middlewares/ErrorHandler";
import cors from "cors";

const app = express();
const PORT = 8080;
dotenv.config();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/authors", authorsRouter);
app.use("/categories", categoriesRouter);
app.use("/books", booksRouter);

app.use(notFound);
app.use(errorHandler);

//sever
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_DB as string);
    console.log(`MongoDB connected: ${conn.connection.host} successfully`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
