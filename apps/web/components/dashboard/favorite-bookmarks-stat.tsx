import { count, eq, and } from "drizzle-orm";

import { db } from "@pouch/db";
import { bookmarks } from "@pouch/db/schema";
import { Card } from "@pouch/ui/components/card";
import { Star, TrendingDown } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { FavouriteIcon } from "@hugeicons/core-free-icons";

export async function FavoriteBookmarksStat({ userId }: { userId: string }) {
  const result = await db
    .select({ count: count() })
    .from(bookmarks)
    .where(and(eq(bookmarks.userId, userId), eq(bookmarks.isFavorite, true)));

  const numberOfFavoriteBookmarks = result[0]?.count || 0;

  return (
    <Card className="py-0 overflow-hidden bg-muted/50 flex flex-col gap-0">
      <div className="px-4 py-3 w-full flex justify-between items-center text-foreground">
        <p className="text-sm font-medium">Favorites</p>
        <HugeiconsIcon
          icon={FavouriteIcon}
          color="currentColor"
          className="size-4"
        />
      </div>
      <div className="border-t border-border flex flex-col gap-2 rounded-xl bg-background flex-1 p-4">
        <div className="w-full flex items-center justify-between">
          <p className="text-3xl font-bold">{numberOfFavoriteBookmarks}</p>
          <div className="inline-flex items-center gap-2">
            <TrendingDown className="size-4 text-red-500" aria-hidden="true" />
            <span className="text-red-500">12%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
