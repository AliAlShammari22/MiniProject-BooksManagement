import express from "express";
import {
  createBook,
  deleteBook,
  getAllBooks,
  getBookById,
  updateBook,
} from "../controllers/books.controller";
import upload from "../middlewares/Multer";

const router = express.Router();

router.get("/", getAllBooks);
router.post("/", upload.single("image"), createBook);
router.get("/:id", getBookById);
router.put("/:id", upload.single("image"), updateBook);
router.delete("/:id", deleteBook);

export default router;
