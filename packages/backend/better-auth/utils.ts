import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";
import { ConvexError } from "convex/values";
import "dotenv/config";

// import dotenv from "dotenv";

// dotenv.config({
//   path: "../../.env"
// });

export const {
  handler,
  preloadAuthQuery,
  isAuthenticated,
  getToken,
  fetchAuthQuery,
  fetchAuthMutation,
  fetchAuthAction
} = convexBetterAuthNextJs({
  convexUrl: process.env.CONVEX_URL!,
  convexSiteUrl: process.env.SITE_URL!
});

export const isAuthError = (error: unknown) => {
  // This broadly matches potentially auth related errors, can be rewritten to
  // work with your app's own error handling.
  const message =
    (error instanceof ConvexError && error.data) ||
    (error instanceof Error && error.message) ||
    "";
  // Loose match for auth related errors
  return /auth/i.test(message);
};
