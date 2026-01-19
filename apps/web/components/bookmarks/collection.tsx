import { db } from "@pouch/db";
import {
  type Collection,
  type BookmarkWithCollectionAndTags
} from "@pouch/db/schema";
import { BookmarksView } from "@/components/bookmarks/main-view";

interface CollectionBookmarksProps {
  userId: string;
  collection: Collection;
  slug?: string;
}

export async function CollectionBookmarks({
  collection,
  userId
}: CollectionBookmarksProps) {
  const allBookmarks: BookmarkWithCollectionAndTags[] =
    await db.query.bookmarks.findMany({
      where: (bookmark, { eq, and }) =>
        and(
          eq(bookmark.userId, userId),
          eq(bookmark.collectionId, collection.id)
        ),
      orderBy: (bookmark, { desc }) => [desc(bookmark.createdAt)],
      with: { collection: true, bookmarksToTags: { with: { tag: true } } }
    });

  return <BookmarksView data={allBookmarks} />;
}
