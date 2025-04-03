import { body } from "express-validator";

const validatePost = [
  body("title").notEmpty().withMessage("Title is required"),
  body("content").notEmpty().withMessage("Content is required"),
  body("image_url").optional().isURL().withMessage("Invalid image URL"),
];

export { validatePost };
