import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { ActivitySummary } from "@/components/dashboard/activity-summary";
import { RecentSaves } from "@/components/dashboard/recent-saves";
import { StatsRow } from "@/components/dashboard/stats-row";
import { auth } from "@pouch/auth/server";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div className="h-full w-full py-4 px-4 lg:px-6 overflow-hidden flex flex-col gap-2">
      <h2 className="inline-flex items-center gap-2 text-3xl tracking-tight font-bold text-balance">
        Welcome back, {session.user.name || session.user.email}
      </h2>
      <p className="mt-2 text-muted-foreground text-pretty">
        Here's an overview of your saved bookmarks and activity.
      </p>

      <div className="w-full">
        <StatsRow />

        <div className="grid gap-6 lg:grid-cols-3">
          <RecentSaves />

          <ActivitySummary />
        </div>
      </div>
    </div>
  );
}
