import { createAuthClient } from "better-auth/react";
import { auth } from "./server";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:3000"
});
