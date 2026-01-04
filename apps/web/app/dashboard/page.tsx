import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { ActivitySummary } from "@/components/dashboard/activity-summary";
import { RecentSaves } from "@/components/dashboard/recent-saves";
import { StatsRow } from "@/components/dashboard/stats-row";
import { auth } from "@pouch/auth/server";
import { PopularTags } from "@/components/dashboard/popular-tags";
// import { isAuthenticated } from "@pouch/backend/better-auth/server";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/");
  }

  // const isAuth = await isAuthenticated();

  // if (!isAuth) {
  //   redirect("/");
  // }

  // console.log({ isAuth });

  return (
    <div className="h-full w-full py-4 px-4 lg:px-6 overflow-hidden flex flex-col gap-2">
      <h2 className="inline-flex items-center gap-2 text-3xl tracking-tight font-bold text-balance mt-2">
        Welcome back, {session.user.name || session.user.email}
      </h2>
      <p className="mt-2 text-muted-foreground text-pretty">
        Here's an overview of your saved bookmarks and activity.
      </p>

      <div className="w-full h-full overflow-y-auto flex flex-col gap-6 mt-4">
        <StatsRow userId={session.user.id} />

        <div className="grid gap-6 lg:grid-cols-3">
          <RecentSaves userId={session.user.id} />

          <div className="lg:col-span-1 flex flex-col gap-6">
            <ActivitySummary userId={session.user.id} />
            <PopularTags userId={session.user.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
