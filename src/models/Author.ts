import { time } from "console";
import { model, Schema } from "mongoose";

const authorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    versionKey: false, // Disable the __v field
  }
);

const Author = model("Author", authorSchema);

export default Author;
