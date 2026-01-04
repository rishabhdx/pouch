import { headers } from "next/headers";
import { and, eq } from "drizzle-orm";

import { auth } from "@pouch/auth/server";
import { db } from "@pouch/db";
import { bookmarks } from "@pouch/db/schema";
import { SidebarGroupContent, SidebarMenu } from "@pouch/ui/components/sidebar";
import { GroupItem } from "@/components/dashboard-sidebar/group-item";
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
          icon="cloud"
          href="/dashboard/all"
          count={allBookmarksCount}
        />
        <GroupItem
          label="Favorites"
          icon="heart"
          href="/dashboard/favorite"
          // href="/dashboard/all?favorite=true"
          count={favoritesCount}
        />
        <GroupItem
          label="Archived"
          icon="archive"
          href="/dashboard/archived"
          // href="/dashboard/all?archived=true"
          count={archivedCount}
        />
        {/* <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={`/dashboard/all`}>
              <Cloud className="size-4" aria-hidden="true" />
              All
            </Link>
          </SidebarMenuButton>
          <SidebarMenuBadge className="font-mono text-muted-foreground">
            {allBookmarksCount}
          </SidebarMenuBadge>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={`/dashboard/all?favorite=true`}>
              <Heart className="size-4" aria-hidden="true" />
              Favorites
            </Link>
          </SidebarMenuButton>
          <SidebarMenuBadge className="font-mono text-muted-foreground">
            {favoritesCount}
          </SidebarMenuBadge>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton asChild>
            <Link href={`/dashboard/all?archived=true`}>
              <Archive className="size-4" aria-hidden="true" />
              Archived
            </Link>
          </SidebarMenuButton>
          <SidebarMenuBadge className="font-mono text-muted-foreground">
            {archivedCount}
          </SidebarMenuBadge>
        </SidebarMenuItem> */}
      </SidebarMenu>
    </SidebarGroupContent>
  );
}
