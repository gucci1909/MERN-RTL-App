import { body } from "express-validator";

const validateAddComment = [
  body("content").notEmpty().withMessage("Comment content is required"),
  body("user_id")
    .notEmpty()
    .isMongoId()
    .withMessage("Valid user ID is required"),
];

const validateApproveComment = [
  body("comment_id")
    .notEmpty()
    .isMongoId()
    .withMessage("Valid comment ID is required"),
  body("status")
    .isIn(["approved", "rejected"])
    .withMessage("Status must be 'approved' or 'rejected'"),
];

export { validateAddComment, validateApproveComment };
