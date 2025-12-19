import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@pouch/auth/server";
import { AllBookmarks } from "@/components/bookmarks/all";
import { BookmarksLoadingState } from "@/components/loading-states/bookmarks";

export default async function AllLinksPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div className="h-full w-full py-4 px-4 lg:px-6 overflow-hidden flex flex-col gap-4">
      <h2 className="inline-flex items-center gap-2 text-2xl font-semibold">
        All Bookmarks
      </h2>
      <Suspense fallback={<BookmarksLoadingState />}>
        <AllBookmarks userId={session.user.id} />
      </Suspense>
    </div>
  );
}
