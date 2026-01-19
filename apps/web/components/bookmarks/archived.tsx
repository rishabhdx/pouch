import { db } from "@pouch/db";
import { BookmarkWithCollectionAndTags } from "@pouch/db/schema";
import { BookmarksView } from "@/components/bookmarks/main-view";
import { MainView } from "@/components/bookmarks-new/main-view";

interface ArchivedBookmarksProps {
  userId: string;
}

export async function ArchivedBookmarks({ userId }: ArchivedBookmarksProps) {
  const archivedBookmarks: BookmarkWithCollectionAndTags[] =
    await db.query.bookmarks.findMany({
      where: (bookmark, { and, eq }) =>
        and(eq(bookmark.userId, userId), eq(bookmark.isArchived, true)),
      orderBy: (bookmark, { desc }) => [desc(bookmark.createdAt)],
      with: { collection: true, bookmarksToTags: { with: { tag: true } } }
    });

  return <MainView data={archivedBookmarks} />;
}
