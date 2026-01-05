import { count, eq, and } from "drizzle-orm";

import { db } from "@pouch/db";
import { collections } from "@pouch/db/schema";
import { Card } from "@pouch/ui/components/card";
import { TrendingUp } from "lucide-react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Folder01Icon } from "@hugeicons/core-free-icons";

export async function TotalCollectionStat({ userId }: { userId: string }) {
  const result = await db
    .select({ count: count() })
    .from(collections)
    .where(eq(collections.userId, userId));

  const numberOfCollections = result[0]?.count || 0;

  return (
    <Card className="py-0 overflow-hidden bg-muted/50 flex flex-col gap-0">
      <div className="px-4 py-3 w-full flex justify-between items-center text-foreground">
        <p className="text-sm font-medium">Collections</p>
        <HugeiconsIcon
          icon={Folder01Icon}
          color="currentColor"
          className="size-4"
        />
      </div>
      <div className="border-t border-border flex flex-col gap-2 rounded-xl bg-background flex-1 p-4">
        <div className="w-full flex items-center justify-between">
          <p className="text-3xl font-bold">{numberOfCollections}</p>
          <div className="inline-flex items-center gap-2">
            <TrendingUp className="size-4 text-green-500" aria-hidden="true" />
            <span className="text-green-500">12%</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
