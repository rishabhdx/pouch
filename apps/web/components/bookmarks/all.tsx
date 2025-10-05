import { db } from "@pouch/db";
import { bookmarks } from "@pouch/db/schema";
import { eq } from "drizzle-orm";
import { BookmarksView } from "@/components/bookmarks/main-view";

interface AllBookmarksProps {
  userId: string;
}

export async function AllBookmarks({ userId }: AllBookmarksProps) {
  const allBookmarks = await db
    .select()
    .from(bookmarks)
    .where(eq(bookmarks.userId, userId));

  return <BookmarksView data={allBookmarks} />;
}
