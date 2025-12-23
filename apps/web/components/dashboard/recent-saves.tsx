import Link from "next/link";

import { db } from "@pouch/db";
import { BookmarkWithCollection } from "@pouch/db/schema";
import { Button } from "@pouch/ui/components/button";
import { ListViewItem } from "@/components/bookmarks-new/list-view-item";

export async function RecentSaves({ userId }: { userId: string }) {
  const allBookmarks: BookmarkWithCollection[] =
    await db.query.bookmarks.findMany({
      where: (bookmark, { and, eq }) =>
        and(eq(bookmark.userId, userId), eq(bookmark.isArchived, false)),
      orderBy: (bookmark, { desc }) => [desc(bookmark.createdAt)],
      with: { collection: true, bookmarksToTags: { with: { tag: true } } },
      limit: 5
    });

  return (
    <div className="lg:col-span-2 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Recent Saves</h3>
        <Button
          variant="link"
          size="sm"
          asChild
          className="text-muted-foreground"
        >
          <Link href="/dashboard/all">View All</Link>
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        {allBookmarks.map(bookmark => (
          <ListViewItem key={bookmark.id} item={bookmark} hideActions={true} />
        ))}
      </div>
    </div>
  );
}
