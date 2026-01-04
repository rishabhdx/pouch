import { auth } from "@pouch/auth/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
// import { isAuthenticated } from "@pouch/backend/better-auth/server";

import { SignUpForm } from "@/components/auth/sign-up-form";

export default async function SignUpPage() {
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

  return <SignUpForm />;
}
