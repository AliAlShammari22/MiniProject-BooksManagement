import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  addcategoryToBook,
} from "../controllers/categories.controller";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/", createCategory);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
router.put("/:categoryId/:bookId", addcategoryToBook);
export default router;
