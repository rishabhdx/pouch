import { count, eq, and } from "drizzle-orm";

import { db } from "@pouch/db";
import { bookmarks } from "@pouch/db/schema";
import { Card } from "@pouch/ui/components/card";
import { Star, TrendingDown } from "lucide-react";

export async function FavoriteBookmarksStat({ userId }: { userId: string }) {
  const result = await db
    .select({ count: count() })
    .from(bookmarks)
    .where(and(eq(bookmarks.userId, userId), eq(bookmarks.isFavorite, true)));

  const numberOfFavoriteBookmarks = result[0]?.count || 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Favorites</p>
          <p className="text-3xl font-bold mt-2">{numberOfFavoriteBookmarks}</p>
          <p className="text-xs font-medium text-muted-foreground mt-1 flex items-center gap-1">
            <TrendingDown className="h-3 w-3 text-red-500" aria-hidden="true" />
            <span className="text-red-500">-3 from last month</span>
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/10">
          <Star className="h-6 w-6 text-amber-500" />
        </div>
      </div>
    </Card>
  );
}
