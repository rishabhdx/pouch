import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { browser } from "wxt/browser";
import { Button, buttonVariants } from "@pouch/ui/components/button";
import { Separator } from "@pouch/ui/components/separator";
import { ArrowUpRight, FolderOpen, Hash } from "lucide-react";
import { useEffect } from "react";
import { Textarea } from "@pouch/ui/components/textarea";
import { Badge } from "@pouch/ui/components/badge";
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

    // await browser.tabs.sendMessage(tab.id, {
    //   type: ACTIONS.EXTRACT_METADATA,
    //   title: tab.title,
    //   url: tab.url
    // });
  };

  const handleSaveBookmark = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const [tab] = await browser.tabs.query({
      active: true,
      currentWindow: true
    });

    if (!tab.id) return;

    await browser.tabs.sendMessage(tab.id, {
      type: ACTIONS.SAVE_BOOKMARK,
      title: title,
      url: tab.url!,
      collectionId: collection.id,
      tags: tags.map(tag => tag.id)
    });
  };

  return (
    <div className="w-sm h-full bg-background text-foreground border border-border rounded-md p-4">
      <form
        className="bg-card flex flex-col space-y-4"
        onSubmit={handleSaveBookmark}
      >
        <Textarea
          placeholder="Type here..."
          className="w-full bg-secondary text-sm resize-none"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        {/* <p className="text-base font-medium">{tabTitle}</p> */}
        {/* <Input placeholder="Type here..." className="w-full" /> */}
        <Separator className="w-full" />
        <div className="w-full flex justify-between items-center">
          {/* <Label htmlFor="collection" className="text-muted-foreground">
            Save to
          </Label> */}

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
              })
            )}
            // className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground"
          >
            Choose folder
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Open</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-96 h-96" align="start">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={"bottom"}>
                <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bottom">
                  Bottom
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="right">
                  Right
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu> */}
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
              })
            )}
            // className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground"
          >
            Add tags
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <Button type="submit">Save tab</Button>
      </form>
    </div>
  );
}
