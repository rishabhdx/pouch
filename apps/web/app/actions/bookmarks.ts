"use server";

import { revalidatePath } from "next/cache";
import { db } from "@pouch/db";
import { bookmarks } from "@pouch/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from "@pouch/auth/server";
import { headers } from "next/headers";

export async function toggleFavorite(bookmarkId: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    // Get current bookmark state
    const bookmark = await db.query.bookmarks.findFirst({
      where: (b, { and, eq }) =>
        and(eq(b.id, bookmarkId), eq(b.userId, session.user.id))
    });

    if (!bookmark) {
      return { success: false, error: "Bookmark not found" };
    }

    // Toggle the favorite status
    const [updated] = await db
      .update(bookmarks)
      .set({ isFavorite: !bookmark.isFavorite })
      .where(
        and(eq(bookmarks.id, bookmarkId), eq(bookmarks.userId, session.user.id))
      )
      .returning({ isFavorite: bookmarks.isFavorite });

    revalidatePath("/dashboard");

    return { success: true, isFavorite: updated?.isFavorite };
  } catch (error) {
    console.error("Error toggling favorite:", error);
    return { success: false, error: "Failed to update bookmark" };
  }
}

export async function toggleArchive(bookmarkId: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const bookmark = await db.query.bookmarks.findFirst({
      where: (b, { and, eq }) =>
        and(eq(b.id, bookmarkId), eq(b.userId, session.user.id))
    });

    if (!bookmark) {
      return { success: false, error: "Bookmark not found" };
    }

    const [updated] = await db
      .update(bookmarks)
      .set({ isArchived: !bookmark.isArchived })
      .where(
        and(eq(bookmarks.id, bookmarkId), eq(bookmarks.userId, session.user.id))
      )
      .returning({ isArchived: bookmarks.isArchived });

    revalidatePath("/dashboard");

    return { success: true, isArchived: updated?.isArchived };
  } catch (error) {
    console.error("Error toggling archive:", error);
    return { success: false, error: "Failed to update bookmark" };
  }
}

export async function deleteBookmark(bookmarkId: string) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session?.user?.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await db
      .delete(bookmarks)
      .where(
        and(eq(bookmarks.id, bookmarkId), eq(bookmarks.userId, session.user.id))
      );

    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    return { success: false, error: "Failed to delete bookmark" };
  }
}
