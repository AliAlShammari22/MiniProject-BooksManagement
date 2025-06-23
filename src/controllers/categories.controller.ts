import { Request, Response, NextFunction } from "express";
import Category from "../models/Category";
import Book from "../models/Book";

//GET: Get all categories
const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const catcegories = await Category.find()
      .populate("books", "title")
      .select("-__v");
    if (!catcegories) {
      res.status(404).json("Error categories Not found");
    }
    res.status(200).json(catcegories);
  } catch (error) {
    next(error);
  }
};

//GET: Get category by ID
const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json("Error Category Not found");
    }
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

//POST: create a new category
const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, bookId } = req.body;
    const newCategory = await Category.create({ name, books: bookId });
    const book = await Book.findByIdAndUpdate(bookId, {
      $push: { categories: newCategory._id },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

//PUT: Update a category
const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, books } = req.body;
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { name, books },
      {
        new: true,
      }
    );
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

//DELETE: Delete a category
const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const deletedcat = await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

//POST: Add a category to a book
const addcategoryToBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { categoryId, bookId } = req.params;
    //1. find the category and add the book to the array
    const category = await Category.findByIdAndUpdate(categoryId, {
      $push: { books: bookId },
    });
    //2. find the book and add the category to the array
    const book = await Book.findByIdAndUpdate(bookId, {
      $push: { categories: categoryId },
    });
    if (!category || !book) {
      res.status(404).json("Error Category or Book Not found");
    }
    res.status(200).json({ message: "category added to book successfully" });
  } catch (error) {
    next(error);
  }
};

export {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
  addcategoryToBook,
};
