import { validationResult } from "express-validator";

const findUserByEmail = (email) => [
  { $match: { email } },
  { $limit: 1 },
  {
    $project: {
      _id: 1,
      username: 1,
      email: 1,
      password: 1,
      role: 1,
    },
  },
];

const validateRequest = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
};

export { findUserByEmail, validateRequest };
