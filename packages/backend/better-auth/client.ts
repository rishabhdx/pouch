// import { createAuthClient } from "better-auth/react";
// import { convexClient } from "@convex-dev/better-auth/client/plugins";

// export const authClient = createAuthClient({
//   baseURL: "http://localhost:3000",
//   plugins: [convexClient()]
// });

"use client";

import {
  twoFactorClient,
  magicLinkClient,
  emailOTPClient,
  genericOAuthClient,
  anonymousClient,
  inferAdditionalFields
} from "better-auth/client/plugins";
import { authComponent } from "../convex/auth";
import { convexClient } from "@convex-dev/better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
// import { PropsWithChildren } from "react";
import { api } from "../convex/_generated/api";
import { AuthBoundary } from "@convex-dev/better-auth/react";
// import { isAuthError } from "@/lib/utils";
// import { useRouter } from "next/navigation";

export const authClient = createAuthClient({
  plugins: [
    inferAdditionalFields<typeof authComponent>(),
    anonymousClient(),
    magicLinkClient(),
    emailOTPClient(),
    twoFactorClient(),
    genericOAuthClient(),
    convexClient() as any
  ]
});

// export const ClientAuthBoundary = ({ children }: PropsWithChildren) => {
//   const router = useRouter();
//   return (
//     <AuthBoundary
//       authClient={authClient}
//       onUnauth={() => router.push("/sign-in")}
//       getAuthUserFn={api.auth.getAuthUser}
//       isAuthError={isAuthError}
//     >
//       {children}
//     </AuthBoundary>
//   );
// };
