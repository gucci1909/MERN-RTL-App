import { validationResult } from "express-validator";
import userModel from "../models/user.model.js";
import { checkPassword, hashPassword } from "../helper/user/hashedPw.js";
import { generateToken } from "../helper/user/token.js";

export const signupController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, role } = req.body;

  try {
    let userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ message: "⚠️ Oops! This email is already in use." });
    }

    const hashedPassword = await hashPassword(password);

    const user = new userModel({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    await user.save();

    return res
      .status(201)
      .json({ message: `🎉 Welcome aboard, ${username}! Registration successful.` });
  } catch (error) {
    return res.status(500).json({ message: "🚨 Internal Server Error!", error });
  }
};

export const loginController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "❌ No account found with this email." });
    }

    const isMatch = await checkPassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "🔐 Incorrect password! Try again." });
    }

    const token = generateToken(
      { id: user._id, role: user.role },
    );

    return res.json({
      message: `🚀 Welcome back, ${user.username}!`,
      token,
      user: { id: user._id, username: user.username, role: user.role },
    });
    
  } catch (error) {
    return res.status(500).json({ message: "🚨 Internal Server Error!", error });
  }
};
