import { BookmarksView } from "@/components/bookmarks/main-view";
import { auth } from "@pouch/auth/server";
import { FolderOpen } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { db } from "@pouch/db";
import { collections } from "@pouch/db/schema";
import { eq, and } from "drizzle-orm";

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

  if (response.length === 0 || !response[0]) {
    redirect("/dashboard/collections");
  }

  const collection = response[0];

  return (
    <div className="h-full w-full py-4 px-4 lg:px-6">
      <h2 className="inline-flex items-center gap-2 text-2xl font-semibold">
        <FolderOpen
          className="size-6 text-muted-foreground"
          aria-hidden="true"
        />
        {collection.name}
      </h2>
      {/* //! TODO - Fetch collection details and bookmarks and provide it to BookmarksView */}
      <BookmarksView data={[]} preappliedFilters={{ collections: [slug] }} />
    </div>
  );
}
