import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { db } from "@pouch/db";
import { auth } from "@pouch/auth/server";
import { AllBookmarks } from "@/components/bookmarks/all";
import { BookmarksLoadingState } from "@/components/loading-states/bookmarks";
import { BookmarkOptions } from "@/components/bookmarks/options";

type SearchParams = {
  q?: string;
  favorite?: string;
  archived?: string;
  collections?: string;
  tags?: string;
  sort?: string;
  page?: string;
};

export default async function AllLinksPage({
  searchParams
}: {
  searchParams: Promise<SearchParams>;
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/");
  }

  // Fetch collections and tags in parallel
  const [allCollections, allTags] = await Promise.all([
    db.query.collections.findMany({
      where: (collections, { eq }) => eq(collections.userId, session.user.id),
      orderBy: (collections, { desc }) => [desc(collections.createdAt)],
      columns: {
        id: true,
        name: true,
        slug: true
      }
    }),
    db.query.tags.findMany({
      where: (tags, { eq }) => eq(tags.userId, session.user.id),
      orderBy: (tags, { desc }) => [desc(tags.createdAt)],
      columns: {
        id: true,
        name: true,
        slug: true
      }
    })
  ]);

  const params = await searchParams;

  return (
    <div className="h-full w-full py-4 px-4 lg:px-6 overflow-hidden flex flex-col gap-4">
      <div className="w-full flex items-center justify-between">
        <h2 className="inline-flex items-center gap-2 text-2xl font-semibold shrink-0">
          All Bookmarks
        </h2>

        <BookmarkOptions
          initialQuery={params.q ?? ""}
          initialFavorite={params.favorite === "true"}
          initialArchived={params.archived === "true"}
          initialSort={params.sort ? JSON.parse(params.sort) : []}
          initialTags={params.tags ? params.tags.split(";") : []}
          initialCollections={
            params.collections ? params.collections.split(";") : []
          }
          allCollections={allCollections}
          allTags={allTags}
        />
      </div>
      <Suspense fallback={<BookmarksLoadingState />}>
        <AllBookmarks userId={session.user.id} />
      </Suspense>
    </div>
  );
}
