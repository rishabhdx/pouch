import { db } from "@pouch/db";
import { BookmarkWithCollection } from "@pouch/db/schema";
import { BookmarksView } from "@/components/bookmarks/main-view";
import { MainView } from "@/components/bookmarks-new/main-view";

interface FavoriteBookmarksProps {
  userId: string;
}

export async function FavoriteBookmarks({ userId }: FavoriteBookmarksProps) {
  const favoriteBookmarks: BookmarkWithCollection[] =
    await db.query.bookmarks.findMany({
      where: (bookmark, { and, eq }) =>
        and(eq(bookmark.userId, userId), eq(bookmark.isFavorite, true)),
      orderBy: (bookmark, { desc }) => [desc(bookmark.createdAt)],
      with: { collection: true, bookmarksToTags: { with: { tag: true } } }
    });

  return <MainView data={favoriteBookmarks} />;
}
