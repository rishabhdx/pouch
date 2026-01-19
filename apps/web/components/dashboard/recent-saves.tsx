import Link from "next/link";

import { db } from "@pouch/db";
import { type Bookmark } from "@pouch/db/schema";
import { ListViewItem } from "@/components/bookmarks-new/list-view-item";
import { Card } from "@pouch/ui/components/card";

export async function RecentSaves({ userId }: { userId: string }) {
  const allBookmarks: Bookmark[] = await db.query.bookmarks.findMany({
    where: (bookmark, { and, eq }) =>
      and(eq(bookmark.userId, userId), eq(bookmark.isArchived, false)),
    orderBy: (bookmark, { desc }) => [desc(bookmark.createdAt)],
    limit: 5
  });

  return (
    <Card className="lg:col-span-2 py-0 overflow-hidden bg-muted/50 flex flex-col gap-0">
      <div className="px-4 py-3 w-full flex justify-between items-center text-foreground">
        <p className="text-sm font-medium">Recent saves</p>
        <Link
          href="/dashboard/all"
          className="text-muted-foreground text-xs font-medium"
        >
          View All
        </Link>
      </div>
      <div className="border-t border-border flex flex-col gap-2 rounded-xl bg-background flex-1 p-4">
        <div className="flex flex-col gap-6">
          {allBookmarks.map(bookmark => (
            <ListViewItem
              key={bookmark.id}
              item={bookmark}
              hideActions={true}
            />
          ))}
        </div>
      </div>
    </Card>
  );

  // return (
  //   <div className="lg:col-span-2 flex flex-col gap-4">
  //     <div className="flex items-center justify-between">
  //       <h3 className="text-xl font-semibold">Recent Saves</h3>
  //       <Button
  //         variant="link"
  //         size="sm"
  //         asChild
  //         className="text-muted-foreground"
  //       >
  //         <Link href="/dashboard/all">View All</Link>
  //       </Button>
  //     </div>

  //     <div className="flex flex-col gap-6">
  //       {allBookmarks.map(bookmark => (
  //         <ListViewItem key={bookmark.id} item={bookmark} hideActions={true} />
  //       ))}
  //     </div>
  //   </div>
  // );
}
