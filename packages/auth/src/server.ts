import { betterAuth } from "better-auth";
import { toNextJsHandler } from "better-auth/next-js";
import { toNodeHandler } from "better-auth/node";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import dotenv from "dotenv";
import { db } from "@pouch/db";

export { fromNodeHeaders } from "better-auth/node";
export { nextCookies } from "better-auth/next-js";

dotenv.config({
  path: "../../../.env"
});

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
