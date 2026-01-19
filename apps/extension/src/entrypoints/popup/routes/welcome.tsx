import { browser } from "wxt/browser";
import { ACTIONS } from "@/constants";
import { Button } from "@pouch/ui/components/button";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/welcome")({
  component: RouteComponent
});

function RouteComponent() {
  // const { data, isLoading, isError } = useQuery({
  //   queryKey: ["posts", 1],
  //   queryFn: () => fetchPosts(1)
  // });

  // console.log("Posts data:", { data, isLoading, isError });

  const handleSignInClick = async () => {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true
    });

    console.log("Active tab:", tab);

    if (!tab.id) return;

    // Check if we can inject content scripts on this tab
    const url = tab.url || "";
    if (
      url.startsWith("chrome://") ||
      url.startsWith("chrome-extension://") ||
      url.startsWith("about:") ||
      url.startsWith("edge://") ||
      url.startsWith("moz-extension://")
    ) {
      // Open sign-in in a new tab instead
      await browser.tabs.create({
        url: `${import.meta.env.WXT_WEBSITE_URL}/auth/sign-in`
      });
      return;
    }

    try {
      await browser.tabs.sendMessage(tab.id, {
        type: ACTIONS.INITIATE_SIGNIN_FROM_WELCOME
      });
      console.log("Sign-in initiated from welcome page");
    } catch (error) {
      console.error("Error initiating sign-in from welcome page:", error);
    }
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
