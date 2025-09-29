import { defineConfig } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config({
  path: "../../.env"
});

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
});
