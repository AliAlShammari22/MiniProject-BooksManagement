import { model, Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    deleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    versionKey: false, // Disable the __v field
  }
);

const Book = model("Book", bookSchema);

export default Book;
