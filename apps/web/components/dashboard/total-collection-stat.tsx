import { count, eq, and } from "drizzle-orm";

import { db } from "@pouch/db";
import { collections } from "@pouch/db/schema";
import { Card } from "@pouch/ui/components/card";
import { FolderOpen, TrendingUp } from "lucide-react";

export async function TotalCollectionStat({ userId }: { userId: string }) {
  const result = await db
    .select({ count: count() })
    .from(collections)
    .where(eq(collections.userId, userId));

  const numberOfCollections = result[0]?.count || 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">
            Collections
          </p>
          <p className="text-3xl font-bold mt-2">{numberOfCollections}</p>
          <p className="text-xs font-medium text-muted-foreground mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-green-500" aria-hidden="true" />
            <span className="text-green-500">+4 from last month</span>
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
          <FolderOpen className="h-6 w-6 text-purple-500" />
        </div>
      </div>
    </Card>
  );
}
