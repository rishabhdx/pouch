import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@pouch/auth/server";
import { AllBookmarks } from "@/components/bookmarks/all";
import { BookmarksLoadingState } from "@/components/loading-states/bookmarks";
import { BookmarkOptions } from "@/components/bookmarks-new/options";

type SearchParams = {
  q?: string;
  favorite?: string;
  archived?: string;
  collections?: string;
  tags?: string;
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
          initialCollections={
            params.collections ? params.collections.split(";") : []
          }
          initialTags={params.tags ? params.tags.split(";") : []}
        />
      </div>
      <Suspense fallback={<BookmarksLoadingState />}>
        <AllBookmarks userId={session.user.id} />
      </Suspense>
    </div>
  );
}
