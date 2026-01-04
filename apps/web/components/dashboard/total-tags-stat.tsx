import { count, eq } from "drizzle-orm";

import { db } from "@pouch/db";
import { tags } from "@pouch/db/schema";
import { Card } from "@pouch/ui/components/card";
import { Hash, TrendingUp } from "lucide-react";

export async function TotalTagsStat({ userId }: { userId: string }) {
  const result = await db
    .select({ count: count() })
    .from(tags)
    .where(eq(tags.userId, userId));

  const numberOfTags = result[0]?.count || 0;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">Tags</p>
          <p className="text-3xl font-bold mt-2">{numberOfTags}</p>
          <p className="text-xs font-medium text-muted-foreground mt-1 flex items-center gap-1">
            <TrendingUp className="h-3 w-3 text-green-500" aria-hidden="true" />
            <span className="text-green-500">+1 from last month</span>
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10">
          <Hash className="h-6 w-6 text-blue-500" />
        </div>
      </div>
    </Card>
  );
}
