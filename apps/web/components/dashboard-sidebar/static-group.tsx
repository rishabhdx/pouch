import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";

import { auth } from "@pouch/auth/server";
import { db } from "@pouch/db";
import { bookmarks } from "@pouch/db/schema";
import { SidebarGroupContent, SidebarMenu } from "@pouch/ui/components/sidebar";
import { GroupItem } from "@/components/dashboard-sidebar/group-item";
import {
  AllBookmarkIcon,
  Archive03Icon,
  FavouriteIcon
} from "@hugeicons/core-free-icons";

export async function StaticSidebarGroup() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return <div>Please log in to see your bookmarks.</div>;
  }

  const [allBookmarksResult, favoriteBookmarksResult, archivedBookmarksResult] =
    await Promise.allSettled([
      db.$count(bookmarks, eq(bookmarks.userId, session.user.id)),
      db.$count(
        bookmarks,
        and(
          eq(bookmarks.userId, session.user.id),
          eq(bookmarks.isFavorite, true)
        )
      ),
      db.$count(
        bookmarks,
        and(
          eq(bookmarks.userId, session.user.id),
          eq(bookmarks.isArchived, true)
        )
      )
    ]);

  const results = {
    all:
      allBookmarksResult.status === "fulfilled" ? allBookmarksResult.value : 0,
    favorite:
      favoriteBookmarksResult.status === "fulfilled"
        ? favoriteBookmarksResult.value
        : 0,
    archived:
      archivedBookmarksResult.status === "fulfilled"
        ? archivedBookmarksResult.value
        : 0
  };

  return (
    <SidebarGroupContent>
      <SidebarMenu>
        <GroupItem
          label="All"
          href="/dashboard/all"
          count={results.all}
          icon={AllBookmarkIcon}
        />
        <GroupItem
          label="Favorite"
          icon={FavouriteIcon}
          href="/dashboard/favorite"
          count={results.favorite}
        />
        <GroupItem
          label="Archived"
          icon={Archive03Icon}
          href="/dashboard/archived"
          count={results.archived}
        />
      </SidebarMenu>
    </SidebarGroupContent>
  );
}
