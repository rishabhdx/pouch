import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@pouch/auth/server";
import { AllBookmarks } from "@/components/bookmarks/all";

export default async function AllLinksPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div className="h-full w-full py-4 px-4 lg:px-6">
      <h2 className="inline-flex items-center gap-2 text-2xl font-semibold">
        All Bookmarks
      </h2>
      <Suspense fallback={<div>Loading...</div>}>
        {/* //! TODO - Fetch all and bookmarks and provide it to BookmarksView */}
        <AllBookmarks />
        {/* <BookmarksView /> */}
      </Suspense>
    </div>
  );
}
