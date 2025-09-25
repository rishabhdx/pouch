import { BookmarksView } from "@/components/bookmarks/main-view";
import { auth } from "@pouch/auth/server";
import { FolderOpen } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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

  return (
    <div className="h-full w-full py-4 px-4 lg:px-6">
      <h2 className="inline-flex items-center gap-2 text-2xl font-semibold">
        <FolderOpen
          className="size-6 text-muted-foreground"
          aria-hidden="true"
        />
        Single Collection: {slug}
      </h2>
      {/* //! TODO - Fetch collection details and bookmarks and provide it to BookmarksView */}
      <BookmarksView preappliedFilters={{ collections: [slug] }} />
    </div>
  );
}
