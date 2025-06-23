import express from "express";
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthorById,
  updateAuthor,
} from "../controllers/authors.controller";

const router = express.Router();

router.get("/", getAllAuthors);
router.post("/", createAuthor);
router.get("/:id", getAuthorById);
router.put("/:id", updateAuthor);
router.delete("/:id", deleteAuthor);

export default router;
