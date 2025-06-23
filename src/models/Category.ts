import { model, Schema } from "mongoose";

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    books: [
      {
        type: Schema.Types.ObjectId,
        ref: "Book",
        //   required: true,
      },
    ],
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
    versionKey: false, // Disable the __v field
  }
);

const Category = model("Category", categorySchema);

export default Category;
