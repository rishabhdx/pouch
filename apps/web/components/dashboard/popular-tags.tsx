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
    <div className="flex flex-col gap-4">
      <h3 className="text-xl font-semibold">Popular Tags</h3>
      <Card className="p-4">
        <div className="flex flex-wrap gap-2">
          {result.map(tag => (
            <TagBadge key={tag.id} className="rounded-full font-semibold">
              {tag.name}
            </TagBadge>
          ))}
        </div>
      </Card>
    </div>
  );
}
