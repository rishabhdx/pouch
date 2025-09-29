import { betterAuth } from "better-auth";
import { toNextJsHandler } from "better-auth/next-js";
import { toNodeHandler } from "better-auth/node";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@pouch/db";
import dotenv from "dotenv";
// import "dotenv/config";

export { fromNodeHeaders, toNodeHandler } from "better-auth/node";
export { nextCookies } from "better-auth/next-js";

dotenv.config({
  path: "../../.env"
});

console.log("DATABASE_URL from auth:", process.env.DATABASE_URL);
console.log("BETTER_AUTH_SECRET from auth:", process.env.BETTER_AUTH_SECRET);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg"
  }),
  emailAndPassword: {
    enabled: true
  },
  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:8080",
    "moz-extension://*",
    "chrome-extension://*"
  ]
  // socialProviders: {
  //   google: {
  //     clientId: process.env.GOOGLE_CLIENT_ID as string,
  //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
  //   },
  //   github: {
  //     clientId: process.env.GITHUB_CLIENT_ID as string,
  //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string
  //   }
  // }
});

export const authHandler = toNextJsHandler(auth.handler);
export const expressHandler = toNodeHandler(auth);
