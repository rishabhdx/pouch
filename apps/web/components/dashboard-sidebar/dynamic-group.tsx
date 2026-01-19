import { and, eq, sql } from "drizzle-orm";
import { headers } from "next/headers";

import { auth } from "@pouch/auth/server";
import { db } from "@pouch/db";
import { collections, bookmarks } from "@pouch/db/schema";
import { SidebarGroupContent, SidebarMenu } from "@pouch/ui/components/sidebar";

import { ItemsTree } from "@/components/dashboard-sidebar/items-tree";
import { DynamicSidebarGroupEmptyState } from "@/components/empty-states/dynamic-sidebar-group";

export async function DynamicSidebarGroup() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    return <div>Please log in to see your bookmarks.</div>;
  }

  const allCollectionsWithBookmarkCount = await db
    .select({
      id: collections.id,
      name: collections.name,
      slug: collections.slug,
      bookmarkCount: collections.bookmarkCount
    })
    .from(collections)
    .where(eq(collections.userId, session.user.id));

  if (allCollectionsWithBookmarkCount.length <= 0) {
    return (
      <SidebarGroupContent>
        <SidebarMenu>
          <DynamicSidebarGroupEmptyState />
        </SidebarMenu>
      </SidebarGroupContent>
    );
  }

  return (
    <SidebarGroupContent>
      <SidebarMenu>
        {allCollectionsWithBookmarkCount.map(item => (
          <ItemsTree key={item.id} item={item} />
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  );
}
