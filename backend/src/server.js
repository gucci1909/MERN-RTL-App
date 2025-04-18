import * as dotenv from "dotenv";
import path from "path";
import cors from "cors";
import express from "express";
import { fileURLToPath } from "url";
import helmet from "helmet";
import morgan from "morgan";
import MongoDBConnectDB from "./config/db.js";
import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import likeRoutes from "./routes/like.route.js";
import logger from "./config/logger.js";
import errorHandler from "./middlewares/errorHandler.js";
dotenv.config();

/* this is a express framework api, where we are making api's for a social-media app where a user can post content after logging to 
the application, we also have features like adding comments(admin approved), adding likes to posts and many more */

const app = express();
const PORT = +process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

/* we are using middle wares for logging, json data, cors, helmet */
app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// logger using morgan
app.use(
  morgan("dev", { stream: { write: (message) => logger.info(message.trim()) } })
);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

/* sharing the endpoints for the required routes */
app.use("/api/auth", userRoutes);
app.use("/api/posts", postRoutes);

app.use("/api/comment", commentRoutes);
app.use("/api/like", likeRoutes);

/* error handling for logging using winston*/
app.use(errorHandler);

app.listen(PORT, async () => {
  await MongoDBConnectDB();
  console.info(
    `\x1b[32m✅ SUCCESS:\x1b[0m Server running on: \x1b[4;36mhttp://localhost:${PORT}\x1b[0m`
  );
});

process.on("uncaughtException", (err) => {
  logger.error(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});

process.on("unhandledRejection", (err) => {
  logger.error(`Unhandled Rejection: ${err.message}`);
});
