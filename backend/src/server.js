import * as dotenv from "dotenv";
import path from "path";
import cors from "cors";
import express from "express";
import { fileURLToPath } from "url";
import MongoDBConnectDB from "./config/db.js";
dotenv.config({ path: ".env.local" });

const app = express();
const PORT = +process.env.PORT || 5000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// app.use("/api/auth", userRoutes);
// app.use("/api/posts", postRoutes);

// app.use("/api/comment", commentRoutes);
// app.use("/api/like", likeRoutes);

app.listen(PORT, async () => {
  await MongoDBConnectDB();
  console.info(
    `\x1b[32m✅ SUCCESS:\x1b[0m Server running on: \x1b[4;36mhttp://localhost:${PORT}\x1b[0m`
  );
});

process.on("error", (err) => {
  console.error(`\x1b[31m❌ FAILURE:\x1b[0m Server failed to start:`, err);
});
