import { db } from "@pouch/db";
import { type Collection } from "@pouch/db/schema";
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
  // const allBookmarks = await db
  //   .select()
  //   .from(bookmarks)
  //   .where(
  //     and(
  //       eq(bookmarks.userId, userId),
  //       eq(bookmarks.collectionId, collection.id)
  //     )
  //   );

  const allBookmarks = await db.query.bookmarks.findMany({
    where: (bookmark, { eq, and }) =>
      and(
        eq(bookmark.userId, userId),
        eq(bookmark.collectionId, collection.id)
      ),
    orderBy: (bookmark, { desc }) => [desc(bookmark.createdAt)],
    with: {
      collection: true
    }
  });
  // type BookmarkWithCollection = (typeof allBookmarks)[number];

  return <BookmarksView data={allBookmarks} />;
}
