import { NextFunction, Request, Response } from "express";
import Author from "../models/Author";
import { Error } from "mongoose";

// GET: All authors
const getAllAuthors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authors = await Author.find()
      .populate("books", "title")
      .select("-__v");
    if (!authors) {
      res.status(404).json("Error Authors Not found");
    }
    res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

//GET: Get author by ID
const getAuthorById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const author = await Author.findById(req.params.id);
    if (!author) {
      res.status(404).json("Error Author Not found");
    }
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

//POST: create a new author
const createAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, country } = req.body;
    const newAuthor = await Author.create({
      name,
      country,
    });
    res.status(201).json(newAuthor);
  } catch (error) {
    next(error);
  }
};

//PUT: Update an author
const updateAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, country, books } = req.body;
    const author = await Author.findByIdAndUpdate(
      req.params.id,
      { name, country, books },
      {
        new: true,
      }
    );
    res.status(200).json(author);
  } catch (error) {
    next(error);
  }
};

//DELETE: Delete an author
const deleteAuthor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({
      message: "Author deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  deleteAuthor,
};
