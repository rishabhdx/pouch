import { auth } from "@pouch/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/");
  }

  return <div className="h-full w-full py-4 px-4 lg:px-6">Dashboard</div>;
}
