import userModel from "../models/user.model.js";
import { checkPassword, hashPassword } from "../helper/user/hashedPw.js";
import { generateToken } from "../helper/user/token.js";
import {
  findUserByEmail,
  validateRequest,
} from "../helper/user/aggregations.js";

const signupController = async (req, res) => {
  if (validateRequest(req, res)) return;

  const { username, email, password, role, gender, bio } = req.body;

  try {
    const userExists = await userModel.aggregate(findUserByEmail(email));

    if (userExists.length > 0) {
      return res
        .status(400)
        .json({ message: "⚠️ Oops! This email is already in use." });
    }

    const hashedPassword = await hashPassword(password);

    const user = new userModel({
      username,
      email,
      password: hashedPassword,
      bio,
      gender,
      role: role || "user",
    });

    await user.save();

    return res.status(201).json({
      message: `🎉 Welcome aboard, ${username}! Registration successful.`,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "🚨 Internal Server Error!", error });
  }
};

const loginController = async (req, res) => {
  if (validateRequest(req, res)) return;

  const { email, password } = req.body;

  try {
    const user = await userModel.aggregate(findUserByEmail(email));

    if (user.length === 0) {
      return res
        .status(401)
        .json({ message: "No account found with this email." });
    }

    const userData = user[0];
    const isMatch = await checkPassword(password, userData.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Invalid email or password. Please try again." });
    }

    const token = generateToken({ id: userData._id, role: userData.role });

    return res.json({
      message: `Welcome back, ${userData.username}!`,
      token,
      user: { userId: userData._id, username: userData.username, role: userData.role },
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "🚨 Internal Server Error!", error });
  }
};

export { signupController, loginController };
