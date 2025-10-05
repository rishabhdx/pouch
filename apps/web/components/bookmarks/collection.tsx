import { db } from "@pouch/db";
import { bookmarks, type Collection } from "@pouch/db/schema";
import { and, eq } from "drizzle-orm";
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
  await new Promise(resolve => setTimeout(resolve, 10000));
  const allBookmarks = await db
    .select()
    .from(bookmarks)
    .where(
      and(
        eq(bookmarks.userId, userId),
        eq(bookmarks.collectionId, collection.id)
      )
    );

  return <BookmarksView data={allBookmarks} />;
}
