import { eq } from "drizzle-orm";

import { db } from "@pouch/db";
import { tags } from "@pouch/db/schema";
import { Card } from "@pouch/ui/components/card";
import { TagBadge } from "@pouch/ui/components/web/tag-badge";

export async function PopularTags({ userId }: { userId: string }) {
  const result = await db
    .select()
    .from(tags)
    .where(eq(tags.userId, userId))
    .limit(8);

  return (
    <Card className="py-0 overflow-hidden bg-muted/50 flex flex-col gap-0">
      <div className="px-4 py-3 w-full flex justify-between items-center text-foreground">
        <p className="text-sm font-medium">Popular tags</p>
      </div>
      <div className="border-t border-border flex flex-col gap-2 rounded-xl bg-background flex-1 p-4">
        <div className="flex flex-wrap gap-2">
          {result.map(tag => (
            <TagBadge key={tag.id} className="rounded-full font-semibold">
              {tag.name}
            </TagBadge>
          ))}
        </div>
      </div>
    </Card>
  );
}
