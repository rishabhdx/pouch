import { db } from "@pouch/db";
import { BookmarkWithCollection } from "@pouch/db/schema";
import { BookmarksView } from "@/components/bookmarks/main-view";

interface AllBookmarksProps {
  userId: string;
}

export async function AllBookmarks({ userId }: AllBookmarksProps) {
  // const allBookmarks = await db
  //   .select()
  //   .from(bookmarks)
  //   .where(eq(bookmarks.userId, userId));

  const allBookmarks: BookmarkWithCollection[] =
    await db.query.bookmarks.findMany({
      where: (bookmark, { and, eq }) =>
        and(eq(bookmark.userId, userId), eq(bookmark.isArchived, false)),
      orderBy: (bookmark, { desc }) => [desc(bookmark.createdAt)],
      with: { collection: true, bookmarksToTags: { with: { tag: true } } }
    });

  console.log("All bookmarks:", allBookmarks);

  return <BookmarksView data={allBookmarks} />;
}
