import { count, eq, and, gt } from "drizzle-orm";
import { subDays } from "date-fns";

import { db } from "@pouch/db";
import { bookmarks, tags, collections } from "@pouch/db/schema";
import { Badge } from "@pouch/ui/components/badge";
import { Card } from "@pouch/ui/components/card";
import { Bookmark, FolderOpen, Hash } from "lucide-react";

export async function ActivitySummary({ userId }: { userId: string }) {
  const bookmarksResult = await db
    .select({ count: count() })
    .from(bookmarks)
    .where(
      and(
        eq(bookmarks.userId, userId),
        gt(bookmarks.createdAt, subDays(new Date(), 7))
      )
    );

  const collectionsResult = await db
    .select({ count: count() })
    .from(collections)
    .where(
      and(
        eq(collections.userId, userId),
        gt(collections.createdAt, subDays(new Date(), 7))
      )
    );

  const tagsResult = await db
    .select({ count: count() })
    .from(tags)
    .where(
      and(eq(tags.userId, userId), gt(tags.createdAt, subDays(new Date(), 7)))
    );

  const numberOfBookmarks = bookmarksResult[0]?.count || 0;
  const numberOfCollections = collectionsResult[0]?.count || 0;
  const numberOfTags = tagsResult[0]?.count || 0;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex w-full items-center justify-between">
        <h3 className="text-xl font-semibold">Activity Summary</h3>

        <span className="text-muted-foreground text-sm font-medium">
          Last 7 days
        </span>
      </div>
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fuchsia-500/10">
                <Bookmark className="h-5 w-5 text-fuchsia-500" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-muted-foreground">Bookmarks</p>
                <p className="text-sm font-medium">
                  {numberOfBookmarks} new added.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10">
                <Hash className="h-5 w-5 text-blue-500" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-muted-foreground">Tags</p>
                <p className="text-sm font-medium">{numberOfTags} new added</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10">
                <FolderOpen className="h-5 w-5 text-purple-500" />
              </div>
              <div className="flex flex-col gap-0.5">
                <p className="text-xs text-muted-foreground">Collections</p>
                <p className="text-sm font-medium">
                  {numberOfCollections} new added
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
