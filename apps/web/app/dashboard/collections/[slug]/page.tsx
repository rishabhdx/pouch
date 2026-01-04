import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { eq, and } from "drizzle-orm";

import { db } from "@pouch/db";
import { auth } from "@pouch/auth/server";
import { collections } from "@pouch/db/schema";
import { CollectionBookmarks } from "@/components/bookmarks/collection";
import { FolderOpen } from "lucide-react";
import { BookmarksLoadingState } from "@/components/loading-states/bookmarks";
import { HugeiconsIcon } from "@hugeicons/react";
import { Folder01FreeIcons } from "@hugeicons/core-free-icons";

export default async function CollectionPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/");
  }

  const { slug } = await params;

  const response = await db
    .select()
    .from(collections)
    .where(
      and(eq(collections.userId, session.user.id), eq(collections.slug, slug))
    );

  const collection = response[0];

  if (!collection) {
    return <div>No collection found for the selected slug.</div>;
  }

  return (
    <div className="h-full w-full py-4 px-4 lg:px-6 overflow-hidden flex flex-col gap-4">
      <h2 className="inline-flex items-center gap-2 text-2xl font-semibold">
        {/* <FolderOpen
          className="size-6 text-muted-foreground"
          aria-hidden="true"
        /> */}
        <div className="size-10 rounded-lg flex items-center justify-center bg-secondary/50">
          {/* <FolderClosed className="size-5 text-foreground/75" /> */}
          <HugeiconsIcon
            icon={Folder01FreeIcons}
            color="currentColor"
            className="size-5 text-foreground/75"
            aria-hidden="true"
          />
        </div>
        {collection.name}
      </h2>
      <Suspense fallback={<BookmarksLoadingState />}>
        <CollectionBookmarks
          userId={session.user.id}
          slug={slug}
          collection={collection}
        />
      </Suspense>
    </div>
  );
}
