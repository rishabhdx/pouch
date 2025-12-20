import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@pouch/auth/server";
import { TotalBookmarkStat } from "@/components/dashboard/total-bookmark-stat";
import { Card } from "@pouch/ui/components/card";
import { FavoriteBookmarksStat } from "@/components/dashboard/favorite-bookmarks-stat";
import { TotalTagsStat } from "@/components/dashboard/total-tags-stat";
import { Clock } from "lucide-react";

export async function StatsRow() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <TotalBookmarkStat userId={session.user.id} />
      <FavoriteBookmarksStat userId={session.user.id} />
      <TotalTagsStat userId={session.user.id} />

      <Card className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Reading Time
            </p>
            <p className="text-3xl font-bold mt-2">42h</p>
            <p className="text-xs text-muted-foreground mt-1">
              Content to explore
            </p>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/10">
            <Clock className="h-6 w-6 text-purple-500" />
          </div>
        </div>
      </Card>
    </div>
  );
}
