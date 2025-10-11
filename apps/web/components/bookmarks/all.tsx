import { db } from "@pouch/db";
import { BookmarksView } from "@/components/bookmarks/main-view";

interface AllBookmarksProps {
  userId: string;
}

export async function AllBookmarks({ userId }: AllBookmarksProps) {
  // const allBookmarks = await db
  //   .select()
  //   .from(bookmarks)
  //   .where(eq(bookmarks.userId, userId));

  const allBookmarks = await db.query.bookmarks.findMany({
    where: (bookmark, { eq }) => eq(bookmark.userId, userId),
    orderBy: (bookmark, { desc }) => [desc(bookmark.createdAt)]
  });

  return <BookmarksView data={allBookmarks} />;
}
