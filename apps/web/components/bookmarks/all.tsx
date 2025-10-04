import { auth } from "@pouch/auth/server";
import { headers } from "next/headers";
import { db } from "@pouch/db";
import { bookmarks } from "@pouch/db/schema";
import { eq } from "drizzle-orm";
import { BookmarksView } from "@/components/bookmarks/main-view";

export async function AllBookmarks() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return <div>Please log in to see your bookmarks.</div>;
  }

  const allBookmarks = await db
    .select()
    .from(bookmarks)
    .where(eq(bookmarks.userId, session.user.id));

  return <BookmarksView data={allBookmarks} />;
}
