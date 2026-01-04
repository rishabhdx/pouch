import { auth } from "@pouch/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
// import { isAuthenticated } from "@pouch/backend/better-auth/server";

import { SignInForm } from "@/components/auth/sign-in-form";

export default async function SignInPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  });

  if (session) {
    redirect("/dashboard");
  }

  // const isAuth = await isAuthenticated();

  // if (isAuth) {
  //   redirect("/dashboard");
  // }

  return <SignInForm />;
}
