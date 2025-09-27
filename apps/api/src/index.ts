import express from "express";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
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
app.use(morgan(":method :url :status :req[header] - :response-time ms"));
// app.use(morgan("dev"));
// morgan(function (tokens, req, res) {
//   return [
//     tokens.method ? tokens.method(req, res) : "-",
//     tokens.url ? tokens.url(req, res) : "-",
//     tokens.status ? tokens.status(req, res) : "-",
//     tokens.res ? tokens.res(req, res, "content-length") : "-",
//     tokens["response-time"] ? tokens["response-time"](req, res) : "-",
//     "ms",
//   ].join(" ");
// });

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
