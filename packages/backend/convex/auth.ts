import { components } from "./_generated/api";
import { internalAction, query } from "./_generated/server";
import authSchema from "./betterAuth/schema";
import { createClient, GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import {
  anonymous,
  genericOAuth,
  twoFactor,
  username,
  magicLink,
  emailOTP
} from "better-auth/plugins";
// import {
//   sendMagicLink,
//   sendOTPVerification,
//   sendEmailVerification,
//   sendResetPassword,
// } from "../convex/email";
import { betterAuth, type BetterAuthOptions } from "better-auth";
import { requireActionCtx } from "@convex-dev/better-auth/utils";
import { DataModel } from "./_generated/dataModel";
import { v } from "convex/values";
import authConfig from "./auth.config";

// This implementation uses Local Install as it would be in a new project.

const siteUrl = process.env.SITE_URL;

// @ts-expect-error
export const authComponent = createClient<DataModel, typeof authSchema>(
  components.betterAuth,
  {
    local: {
      schema: authSchema
    },
    verbose: false
  }
);

export const createAuthOptions = (ctx: GenericCtx<DataModel>) => {
  return {
    baseURL: siteUrl,
    database: authComponent.adapter(ctx),
    account: {
      accountLinking: {
        enabled: true,
        allowDifferentEmails: true
      }
    },
    emailVerification: {
      // sendVerificationEmail: async ({ user, url }) => {
      //   await sendEmailVerification(requireActionCtx(ctx), {
      //     to: user.email,
      //     url,
      //   });
      // },
    },
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true
      // sendResetPassword: async ({ user, url }) => {
      //   await sendResetPassword(requireActionCtx(ctx), {
      //     to: user.email,
      //     url,
      //   });
      // },
    },
    // socialProviders: {
    //   github: {
    //     clientId: process.env.GITHUB_CLIENT_ID as string,
    //     clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    //   },
    //   google: {
    //     clientId: process.env.GOOGLE_CLIENT_ID as string,
    //     clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    //     accessType: "offline",
    //     prompt: "select_account consent",
    //   },
    // },
    // user: {
    //   additionalFields: {
    //     foo: {
    //       type: "string",
    //       required: false,
    //     },
    //   },
    //   deleteUser: {
    //     enabled: true,
    //   },
    // },
    plugins: [
      anonymous(),
      username(),
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          // await sendMagicLink(requireActionCtx(ctx), {
          //   to: email,
          //   url,
          // });
        }
      }),
      emailOTP({
        async sendVerificationOTP({ email, otp }) {
          // await sendOTPVerification(requireActionCtx(ctx), {
          //   to: email,
          //   code: otp,
          // });
        }
      }),
      twoFactor(),
      genericOAuth({
        config: [
          {
            providerId: "slack",
            clientId: process.env.SLACK_CLIENT_ID as string,
            clientSecret: process.env.SLACK_CLIENT_SECRET as string,
            discoveryUrl: "https://slack.com/.well-known/openid-configuration",
            scopes: ["openid", "email", "profile"]
          }
        ]
      }),
      convex({
        authConfig
      }) as any
    ]
  } satisfies BetterAuthOptions;
};

export const createAuth = (ctx: GenericCtx<DataModel>) =>
  betterAuth(createAuthOptions(ctx) as BetterAuthOptions);

export const { getAuthUser } = authComponent.clientApi();

// export const rotateKeys = internalAction({
//   args: {},
//   handler: async ctx => {
//     const auth = createAuth(ctx);
//     return auth.api.rotateKeys();
//   }
// });

// Example functions, feel free to edit, omit, etc.

// Get the current user
export const getCurrentUser = query({
  args: {},
  handler: async ctx => {
    return authComponent.getAuthUser(ctx as unknown as GenericCtx<DataModel>);
  }
});

// Get a user by their Better Auth user id with Local Install
export const getUserById = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    // @ts-expect-error
    return ctx.runQuery(components.betterAuth.users.getUser, {
      userId: args.userId
    });
  }
});

// import { createClient, type GenericCtx } from "@convex-dev/better-auth";
// import { convex } from "@convex-dev/better-auth/plugins";
// import { components } from "./_generated/api";
// import { DataModel } from "./_generated/dataModel";
// import { query } from "./_generated/server";
// import { betterAuth } from "better-auth";
// import authConfig from "./auth.config";

// const siteUrl = process.env.SITE_URL!;

// // The component client has methods needed for integrating Convex with Better Auth,
// // as well as helper methods for general use.
// export const authComponent = createClient<DataModel>(components.betterAuth);

// export const createAuth = (ctx: GenericCtx<DataModel>) => {
//   return betterAuth({
//     baseURL: siteUrl,
//     database: authComponent.adapter(ctx),
//     // Configure simple, non-verified email/password to get started
//     emailAndPassword: {
//       enabled: true,
//       requireEmailVerification: false
//     },
//     plugins: [
//       // The Convex plugin is required for Convex compatibility
//       convex({ authConfig })
//     ]
//   });
// };

// // Example function for getting the current user
// // Feel free to edit, omit, etc.
// export const getCurrentUser = query({
//   args: {},
//   handler: async ctx => {
//     return authComponent.getAuthUser(ctx);
//   }
// });
