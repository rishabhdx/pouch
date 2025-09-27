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
