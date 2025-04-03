const validateLikeAction = [
  body("like")
    .isBoolean()
    .withMessage("Like must be a boolean value (true or false)"),
];

export { validateLikeAction };
