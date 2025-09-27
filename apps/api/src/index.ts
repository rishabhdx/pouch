import express from "express";
import helmet from "helmet";
import cors from "cors";
import { expressHandler } from "@pouch/auth/server";

import { rootRouter } from "./routes";

const app = express();

// Security middleware
app.use(helmet());
app.use(
  cors({
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization", "x-requested-with"],
    exposedHeaders: ["set-cookie"]
  })
);

app.all("/api/auth/{*any}", expressHandler);

app.use(express.urlencoded({ extended: true }));

app.get("/", (_, res) => {
  res.send("Welcome to Pouch API!");
});

app.use("/api/v1", express.json(), rootRouter); // API routes

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
