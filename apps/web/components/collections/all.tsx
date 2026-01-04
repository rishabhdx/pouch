import { db } from "@pouch/db";
import { CollectionsView } from "@/components/collections/main-view";
// import { BookmarkWithCollection } from "@pouch/db/schema";
// import { BookmarksView } from "@/components/bookmarks/main-view";

interface AllCollectionsProps {
  userId: string;
}

export async function AllCollections({ userId }: AllCollectionsProps) {
  // const allCollections = await db
  //   .select()
  //   .from(bookmarks)
  //   .where(eq(bookmarks.userId, userId));

  const allCollections = await db.query.collections.findMany({
    where: (collection, { eq }) => eq(collection.userId, userId),
    orderBy: (collection, { desc }) => [desc(collection.createdAt)]
    // with: {
    //   bookmarks: {
    //     where: (bookmark, { eq }) => eq(bookmark.userId, userId)
    //   }
    // }
  });

  console.log("All collections:", allCollections);

  return <CollectionsView data={allCollections} />;
}
