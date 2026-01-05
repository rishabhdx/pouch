import { count, eq } from "drizzle-orm";

import { db } from "@pouch/db";
import { bookmarks } from "@pouch/db/schema";
import { Card } from "@pouch/ui/components/card";

import { TrendingUp } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { AllBookmarkIcon } from "@hugeicons/core-free-icons";

export async function TotalBookmarkStat({ userId }: { userId: string }) {
  const result = await db
    .select({ count: count() })
    .from(bookmarks)
    .where(eq(bookmarks.userId, userId));

  const numberOfBookmarks = result[0]?.count || 0;

  return (
    <Card className="py-0 overflow-hidden bg-muted/50 flex flex-col gap-0">
      <div className="px-4 py-3 w-full flex justify-between items-center text-foreground">
        <p className="text-sm font-medium">Total Bookmarks</p>
        <HugeiconsIcon
          icon={AllBookmarkIcon}
          color="currentColor"
          className="size-4"
        />
      </div>
      <div className="border-t border-border flex flex-col gap-2 rounded-xl bg-background flex-1 p-4">
        <div className="w-full flex items-center justify-between">
          <p className="text-3xl font-bold">{numberOfBookmarks}</p>
          <div className="inline-flex items-center gap-2">
            <TrendingUp className="size-4 text-green-500" aria-hidden="true" />
            <span className="text-green-500">12%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
