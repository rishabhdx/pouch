import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { browser } from "wxt/browser";
import { Button, buttonVariants } from "@pouch/ui/components/button";
import { Separator } from "@pouch/ui/components/separator";
import {
  ArrowUpRight,
  Check,
  FolderOpen,
  Hash,
  TriangleAlert
} from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "@pouch/ui/components/textarea";
import { Badge } from "@pouch/ui/components/badge";
import { Spinner } from "@pouch/ui/components/spinner";
import { cn } from "@pouch/ui/lib/utils";
import { useStore } from "@/lib/store";
import { ACTIONS } from "@/constants";

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async () => {
    const sessionKey = await browser.storage.local.get("session");

    if (Object.keys(sessionKey).length <= 0) {
      console.log("Session key does not exist in local storage");

      throw redirect({
        to: "/welcome"
      });
    }
  }
});

function Index() {
  const title = useStore(store => store.title);
  const setTitle = useStore(store => store.setTitle);
  const collection = useStore(store => store.collection);
  const tags = useStore(store => store.tags);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (
      message: Record<string, unknown>,
      sender: globalThis.Browser.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      switch (message.type) {
        case ACTIONS.SAVE_BOOKMARK_FAILURE:
          handleSaveBookmarkFailure(message.error as string);
          break;
        case ACTIONS.SAVE_BOOKMARK_SUCCESS:
          handleSaveBookmarkSuccess();
          break;
        default:
          console.warn("Unknown message type received in popup:", message);
      }
    };

    browser.runtime.onMessage.addListener(handleMessage);

    return () => {
      browser.runtime.onMessage.removeListener(handleMessage);
    };
  }, []);

  useEffect(() => {
    gatherInfo();
  }, []);

  const gatherInfo = async () => {
    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true
    });

    if (!tab.id) return;

    setTitle(tab.title ?? "");
  };

  const handleSaveBookmark = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const [tab] = await browser.tabs.query({
        active: true,
        currentWindow: true
      });

      if (!tab.id) return;

      await browser.tabs.sendMessage(tab.id, {
        type: ACTIONS.SAVE_BOOKMARK,
        title: title,
        url: tab.url!,
        tabId: tab.id,
        collectionId: collection.id,
        tags: tags.map(tag => tag.id)
      });
    } catch (error) {
      console.error("errors and errors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveBookmarkSuccess = () => {
    setSuccess("Bookmark saved successfully!");

    setTimeout(() => {
      setSuccess(null);
    }, 5000);
  };

  const handleSaveBookmarkFailure = (errorMessage: string) => {
    setError(errorMessage);

    setTimeout(() => {
      setError(null);
    }, 5000);
  };

  return (
    <div className="w-sm h-full bg-background text-foreground border border-border rounded-md p-4">
      <form
        className="bg-card flex flex-col space-y-4"
        onSubmit={handleSaveBookmark}
        aria-disabled={isLoading}
      >
        <Textarea
          placeholder="Type here..."
          className="w-full bg-secondary text-sm resize-none"
          value={title}
          onChange={e => setTitle(e.target.value)}
          disabled={isLoading}
        />
        <Separator className="w-full" />
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <FolderOpen
              className="size-4 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="text-sm font-medium">Save to</p>
            <Badge variant="secondary">{collection.name}</Badge>
          </div>

          <Link
            to="/collections"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-muted-foreground"
              }),
              isLoading && "pointer-events-none"
            )}
            disabled={isLoading}
            // className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground"
          >
            Choose folder
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <Separator className="w-full" />
        <div className="w-full flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <Hash className="size-4 text-muted-foreground" aria-hidden="true" />
            <p className="text-sm font-medium">Tags</p>
            <Badge variant="secondary">{tags.length} tags added</Badge>
          </div>

          <Link
            to="/tags"
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "text-muted-foreground"
              }),
              isLoading && "pointer-events-none"
            )}
            disabled={isLoading}
            // className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground"
          >
            Add tags
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        {error && (
          <div className="w-full flex justify-center items-center gap-1 bg-destructive/10 p-2 rounded-md">
            <TriangleAlert
              className="size-4 text-destructive"
              aria-hidden="true"
            />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {success && (
          <div className="w-full flex justify-center items-center gap-1 bg-green-500/10 p-2 rounded-md">
            <Check className="size-4 text-green-600" aria-hidden="true" />
            <p className="text-sm text-green-600">{success}</p>
          </div>
        )}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Spinner className="size-4" aria-hidden="true" />
              Saving...
            </>
          ) : (
            "Save tab"
          )}
        </Button>
      </form>
    </div>
  );
}
