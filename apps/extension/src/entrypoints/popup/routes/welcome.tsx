import { browser } from "wxt/browser";
import { ACTIONS } from "@/constants";
import { Button } from "@pouch/ui/components/button";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { authClient } from "@pouch/auth/client";

export const Route = createFileRoute("/welcome")({
  component: RouteComponent,
  beforeLoad: async () => {
    const session = await authClient.getSession();
    if (session && session.data) {
      throw redirect({
        to: "/"
      });
    }
  }
});

function RouteComponent() {
  const handleSignInClick = async () => {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true
    });

    if (!tab.id) return;

    await browser.tabs.sendMessage(tab.id, {
      type: ACTIONS.INITIATE_SIGNIN_FROM_WELCOME
    });
    console.log("Sign-in initiated from welcome page");
  };

  return (
    <div className="w-sm h-full bg-background text-foreground border border-border rounded-md p-4 flex flex-col space-y-2 items-center">
      <h1 className="text-center text-lg font-semibold">Welcome to Pouch!</h1>
      <p className="text-base text-center text-muted-foreground">
        Thank you for installing Pouch, a privacy-first, open-source bookmark
        manager.
      </p>
      <Button onClick={handleSignInClick}>Sign in to get started</Button>
    </div>
  );
}
