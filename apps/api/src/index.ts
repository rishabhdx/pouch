import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { expressHandler } from "@pouch/auth/server";

dotenv.config({
  path: "../../.env"
});

import { rootRouter } from "./routes";

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    methods: ["GET", "POST"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "x-requested-with",
      "Cookie"
    ],
    exposedHeaders: ["set-cookie"],
    credentials: true
  })
);
app.use(morgan("dev"));

app.all("/api/auth/*splat", expressHandler);

app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.send("Welcome to Pouch API!");
});

app.use("/api/v1", express.json(), rootRouter); // API routes

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
