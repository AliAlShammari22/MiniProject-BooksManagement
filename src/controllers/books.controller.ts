import { Request, Response, NextFunction } from "express";
import Book from "../models/Book";
import Author from "../models/Author";

//GET: Get all books
const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { author, categories, title, includeDeleted } = req.query;
    const filter: any = {};

    // Soft delete logic
    if (includeDeleted !== "true") {
      filter.deleted = false;
    }

    // Author filter
    if (author) {
      filter.author = author;
    }

    // Categories filter (supports comma-separated values)
    if (categories) {
      const categoryArray = (categories as string).split(",");
      filter.categories = { $in: categoryArray };
    }

    // Title filter (case-insensitive partial match)
    if (title) {
      filter.title = { $regex: title, $options: "i" };
    }
    const books = await Book.find(filter)
      .populate({
        path: "author",
        select: "name country books",
        populate: {
          path: "books",
          select: "title -_id",
        },
      })
      .populate("categories", "name")
      .select("-__v");
    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

//GET: Get book by ID
const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const includeDeleted = req.query.includeDeleted === "true";
    const filter: any = { _id: req.params.id };
    if (!includeDeleted) filter.deleted = false;
    const book = await Book.findOne(filter);
    if (!book) {
      res.status(404).json("Error Book Not found");
    }
    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

//POST: Create a new book
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, authorId } = req.body;

    let imagePath = "";
    if (req.file) {
      imagePath = req.file.path;
    }

    const newBook = await Book.create({
      title,
      image: imagePath,
      author: authorId,
    });

    await Author.findByIdAndUpdate(authorId, {
      $push: { books: newBook._id },
    });

    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

//PUT: Update a book
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, image, categories } = req.body;
    const { id } = req.params;
    const imagePath = req.file ? req.file.path : req.body.image;
    const book = await Book.findByIdAndUpdate(id, {
      title,
      author,
      image: imagePath,
      categories,
    });
    res.status(200).json({
      message: "Book updated successfully",
      book,
    });
  } catch (error) {
    next(error);
  }
};

//DELETE: Delete a book
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, { deleted: true });
    res.status(200).json({ message: "Book soft-deleted successfully", book });
    if (!book) res.status(404).json("Book not found");
  } catch (error) {
    next(error);
  }
};

export { getAllBooks, getBookById, createBook, updateBook, deleteBook };
