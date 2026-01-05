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

  const allBookmarksCount = await db.$count(
    bookmarks,
    eq(bookmarks.userId, session.user.id)
  );
  const favoritesCount = await db.$count(
    bookmarks,
    and(eq(bookmarks.userId, session.user.id), eq(bookmarks.isFavorite, true))
  );
  const archivedCount = await db.$count(
    bookmarks,
    and(eq(bookmarks.userId, session.user.id), eq(bookmarks.isArchived, true))
  );

  return (
    <SidebarGroupContent>
      <SidebarMenu>
        <GroupItem
          label="All"
          href="/dashboard/all"
          count={allBookmarksCount}
          icon={AllBookmarkIcon}
        />
        <GroupItem
          label="Favorite"
          icon={FavouriteIcon}
          href="/dashboard/favorite"
          count={favoritesCount}
        />
        <GroupItem
          label="Archived"
          icon={Archive03Icon}
          href="/dashboard/archived"
          count={archivedCount}
        />
      </SidebarMenu>
    </SidebarGroupContent>
  );
}
