import { headers } from "next/headers";
import Link from "next/link";
import { and, eq } from "drizzle-orm";

import { auth } from "@pouch/auth/server";
import { db } from "@pouch/db";
import { bookmarks } from "@pouch/db/schema";
import {
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem
} from "@pouch/ui/components/sidebar";
import { Archive, Cloud, Heart } from "lucide-react";

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
        <SidebarMenuItem>
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
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroupContent>
  );
}
