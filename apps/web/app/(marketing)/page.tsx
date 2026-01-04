import { Navbar } from "@/app/(marketing)/_components/navbar";
// import { Hero } from "@/app/(marketing)/_components/hero";
import { auth } from "@pouch/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
// import { isAuthenticated } from "@pouch/backend/better-auth/server";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (session?.session || session?.user) {
    // Redirect to dashboard
    redirect("/dashboard");
  }

  // const isAuth = await isAuthenticated();

  // if (isAuth) {
  //   redirect("/dashboard");
  // }

  return (
    <div className="relative min-h-svh bg-background text-foreground overflow-y-auto">
      <Navbar />
      <div>hero section</div>
      {/* <Hero /> */}
      <div className="bg-gray-600 w-full h-80"></div>
      <div className="bg-green-600 w-full h-80"></div>
    </div>
  );
}
