import { db } from "@pouch/db";
import { type BookmarkWithCollectionAndTags } from "@pouch/db/schema";
import { BookmarksView } from "@/components/bookmarks/main-view";

interface AllBookmarksProps {
  userId: string;
}

export async function AllBookmarks({ userId }: AllBookmarksProps) {
  const allBookmarks: BookmarkWithCollectionAndTags[] =
    await db.query.bookmarks.findMany({
      where: (bookmark, { and, eq }) =>
        and(eq(bookmark.userId, userId), eq(bookmark.isArchived, false)),
      orderBy: (bookmark, { desc }) => [desc(bookmark.createdAt)],
      with: { collection: true, bookmarksToTags: { with: { tag: true } } }
    });

  return <BookmarksView data={allBookmarks} />;

  // return <MainView data={allBookmarks} />;
}
