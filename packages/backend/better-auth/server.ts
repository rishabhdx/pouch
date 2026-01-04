import { convexBetterAuthNextJs } from "@convex-dev/better-auth/nextjs";

// import "dotenv/config";

import dotenv from "dotenv";

dotenv.config({
  path: "../../.env"
});

export const {
  handler,
  preloadAuthQuery,
  isAuthenticated,
  getToken,
  fetchAuthQuery,
  fetchAuthMutation,
  fetchAuthAction
} = convexBetterAuthNextJs({
  // convexUrl: process.env.SITE_URL!,
  // convexSiteUrl: process.env.CONVEX_SITE_URL!
  convexUrl: process.env.NEXT_PUBLIC_CONVEX_URL!,
  convexSiteUrl: process.env.NEXT_PUBLIC_CONVEX_SITE_URL!
});

// import { convexAdapter } from "@convex-dev/better-auth";
// import { convex } from "@convex-dev/better-auth/plugins";
// import { requireMutationCtx } from "@convex-dev/better-auth/utils";
// // import VerifyEmail from "@repo/email/templates/verify-email";
// import { betterAuth, BetterAuthOptions } from "better-auth";
// // import { organization } from "better-auth/plugins";
// import { GenericCtx } from "../convex/_generated/server";
// import { authComponent } from "../convex/auth";
// import { sendEmail } from "../convex/lib/email";

// const createOptions = (ctx: GenericCtx) =>
//   ({
//     baseURL: process.env.APP_URL as string,
//     database: convexAdapter(ctx, { adapter: authComponent.adapter }),
//     account: {
//       accountLinking: {
//         enabled: true,
//         allowDifferentEmails: true
//       }
//     },
//     emailAndPassword: {
//       enabled: true
//     },
//     emailVerification: {
//       sendVerificationEmail: async ({ user, url }) => {
//         await sendEmail(requireMutationCtx(ctx), {
//           to: user.email,
//           subject: "Verify your email address",
//           react: VerifyEmail({ name: user.name || "", verificationUrl: url })
//         });
//       }
//     }
//     // socialProviders: {
//     //   github: {
//     //     clientId: process.env.GITHUB_CLIENT_ID as string,
//     //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//     //   },
//     //   google: {
//     //     clientId: process.env.GOOGLE_CLIENT_ID as string,
//     //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     //     accessType: "offline",
//     //     prompt: "select_account+consent",
//     //   },
//     // },
//     // plugins: [organization()],
//   }) satisfies BetterAuthOptions;

// export const auth = (ctx: GenericCtx): ReturnType<typeof betterAuth> => {
//   const options = createOptions(ctx);
//   return betterAuth({
//     ...options,
//     plugins: [
//       ...options.plugins,
//       // Pass in options so plugin schema inference flows through. Only required
//       // for plugins that customize the user or session schema.
//       // See "Some caveats":
//       // https://www.better-auth.com/docs/concepts/session-management#customizing-session-response
//       convex({ options })
//     ]
//   });
// };
