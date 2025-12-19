import { AllCollections } from "@/components/collections/all";
import { auth } from "@pouch/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function CollectionsPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (!session) {
    redirect("/");
  }

  return (
    <div className="h-full w-full py-4 px-4 lg:px-6 overflow-hidden flex flex-col gap-4">
      <h2 className="inline-flex items-center gap-2 text-2xl font-semibold">
        All collections
      </h2>
      <Suspense fallback={<div>Loading collections...</div>}>
        <AllCollections userId={session.user.id} />
      </Suspense>
    </div>
  );
}
