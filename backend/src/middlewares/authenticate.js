import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message:
        "🛑 Access Denied! You need a valid token to proceed. Please log in and try again. 🔐",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message:
          "⏳ Oops! Your session has expired. Please log in again to continue. 🔄",
      });
    } else if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message:
          "🚫 Invalid token detected! Are you trying to hack us? 🕵️‍♂️ Try logging in properly.",
      });
    } else {
      return res.status(401).json({
        message:
          "🔍 Authentication failed! Something went wrong. Try again or contact support. 🤔",
      });
    }
  }
};

export default authMiddleware;
