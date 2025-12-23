import { TotalBookmarkStat } from "@/components/dashboard/total-bookmark-stat";
import { FavoriteBookmarksStat } from "@/components/dashboard/favorite-bookmarks-stat";
import { TotalTagsStat } from "@/components/dashboard/total-tags-stat";
import { TotalCollectionStat } from "@/components/dashboard/total-collection-stat";

export async function StatsRow({ userId }: { userId: string }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <TotalBookmarkStat userId={userId} />
      <FavoriteBookmarksStat userId={userId} />
      <TotalTagsStat userId={userId} />
      <TotalCollectionStat userId={userId} />
    </div>
  );
}
