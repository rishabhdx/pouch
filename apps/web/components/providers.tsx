"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ProgressProvider } from "@bprogress/next/app";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

// import { ConvexReactClient } from "convex/react";
// import { authClient } from "@pouch/backend/better-auth/client";
// import { ConvexBetterAuthProvider } from "@convex-dev/better-auth/react";

// const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const queryClient = new QueryClient();

export function Providers({
  children,
  initialToken
}: {
  children: React.ReactNode;
  initialToken?: string | null;
}) {
  return (
    // <ConvexBetterAuthProvider
    //   client={convex}
    //   // @ts-expect-error
    //   authClient={authClient}
    //   initialToken={initialToken}
    // >
    <ProgressProvider
      height="2px"
      color="var(--muted-foreground)"
      options={{ showSpinner: false }}
      shallowRouting
    >
      <NuqsAdapter>
        <NextThemesProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </NextThemesProvider>
      </NuqsAdapter>
    </ProgressProvider>
    // </ConvexBetterAuthProvider>
  );
}
