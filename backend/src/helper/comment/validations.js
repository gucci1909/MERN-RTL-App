import { body } from "express-validator";

const validateAddComment = [
  body("comment").notEmpty().withMessage("Comment content is required"),
];

const validateApproveComment = [
  body("comment_id")
    .notEmpty()
    .isMongoId()
    .withMessage("Valid comment ID is required"),
  body("user_id")
    .notEmpty()
    .isMongoId()
    .withMessage("Valid user ID is required"),
  body("approved")
    .isBoolean()
    .withMessage("Approved field must be true or false"),
];

export { validateAddComment, validateApproveComment };
