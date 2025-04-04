import multer from "multer";
import path from "path";

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = /jpeg|jpg|png/;
  const extname = allowedFileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedFileTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    return cb(new Error("Only images (jpeg, jpg, png) are allowed"));
  }
};

const upload = multer({
  dest: "src/files/",
  limits: { fileSize: 1000000 },
  fileFilter,
});

export default upload;
