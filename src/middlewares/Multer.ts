import multer, { FileFilterCallback } from "multer";
import { Request } from "express";
import path from "path";

const storageCustom = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
  },
});

const fileTypeFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedTypes = /png|jpg|jpeg/;

  const extValid = allowedTypes.test(
    path.extname(file.originalname).toLocaleLowerCase()
  );

  const mimeValid = allowedTypes.test(file.mimetype);

  if (extValid && mimeValid) {
    cb(null, true);
  } else {
    cb(new Error("Only .png, .jpg, .jpeg files are allowed."));
  }
};

const upload = multer({
  storage: storageCustom,
  fileFilter: fileTypeFilter,
  limits: { fileSize: 1024 * 1024 * 5 },
});

export default upload;
