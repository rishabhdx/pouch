"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";

import { cn } from "@pouch/ui/lib/utils";
import { Button } from "@pouch/ui/components/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator
} from "@pouch/ui/components/field";
import { authClient } from "@pouch/auth/client";
import {
  NameField,
  EmailField,
  PasswordField,
  ConfirmPasswordField
} from "@/components/auth/fields";
import { signUpFormSchema } from "@/components/auth/schema";
import { GalleryVerticalEnd } from "lucide-react";

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    validators: {
      onSubmit: signUpFormSchema
    },
    onSubmit: async ({ value }) => {
      await authClient.signUp.email(
        {
          name: value.name,
          email: value.email,
          password: value.password
        },
        {
          onSuccess: () => {
            router.push("/dashboard");
          },
          onError: ({ error }) => {
            toast.error("An error has occured.", {
              description: error.message,
              closeButton: true
            });
          }
        }
      );
    }
  });

  const handleSocialLogin = async (provider: "github" | "google") => {
    const data = await authClient.signIn.social({
      provider
    });

    console.log("handleSocialLogin", data);
  };

  console.log("form state", form.state);

  return (
    <div
      className={cn("max-w-md w-full flex flex-col gap-6", className)}
      {...props}
    >
      <form
        id="sign-up-form"
        className={cn("grid gap-6", className)}
        onSubmit={e => {
          e.preventDefault();
          form.handleSubmit();
        }}
        aria-disabled={form.state.isSubmitting}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-2 text-center">
            <Link
              href="/"
              className="flex flex-col items-center gap-2 font-medium"
            >
              <div className="flex size-8 items-center justify-center rounded-md">
                <GalleryVerticalEnd className="size-6" />
              </div>
              <span className="sr-only">Pouch</span>
            </Link>
            <h1 className="text-xl font-bold">Welcome to Pouch</h1>
            <h2 className="text-muted-foreground font-medium">
              Sign up with your Google or GitHub account
            </h2>
          </div>
          <Field className="grid gap-4 sm:grid-cols-2">
            <Button
              variant="outline"
              type="button"
              onClick={() => handleSocialLogin("github")}
              disabled={form.state.isSubmitting}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3a12.3 12.3 0 0 0 -6.2 0c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3a4.2 4.2 0 0 0 -.1 3.2a4.6 4.6 0 0 0 -1.3 3.2c0 4.6 2.7 5.7 5.5 6c-.6 .6 -.6 1.2 -.5 2v3.5" />
              </svg>
              Continue with GitHub
            </Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => handleSocialLogin("google")}
              disabled={form.state.isSubmitting}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 2a9.96 9.96 0 0 1 6.29 2.226a1 1 0 0 1 .04 1.52l-1.51 1.362a1 1 0 0 1 -1.265 .06a6 6 0 1 0 2.103 6.836l.001 -.004h-3.66a1 1 0 0 1 -.992 -.883l-.007 -.117v-2a1 1 0 0 1 1 -1h6.945a1 1 0 0 1 .994 .89c.04 .367 .061 .737 .061 1.11c0 5.523 -4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10z" />
              </svg>
              Continue with Google
            </Button>
          </Field>

          <FieldSeparator>Or continue with</FieldSeparator>

          <form.Field
            name="name"
            children={field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return <NameField field={field} isInvalid={isInvalid} />;
            }}
          />
          <form.Field
            name="email"
            children={field => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <EmailField
                  field={field}
                  isInvalid={isInvalid}
                  disabled={form.state.isSubmitting}
                />
              );
            }}
          />
          <Field>
            <Field className="grid grid-cols-2 gap-4">
              <form.Field
                name="password"
                children={field => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <PasswordField
                      field={field}
                      isInvalid={isInvalid}
                      disabled={form.state.isSubmitting}
                    />
                  );
                }}
              />
              <form.Field
                name="confirmPassword"
                children={field => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;

                  return (
                    <ConfirmPasswordField
                      field={field}
                      isInvalid={isInvalid}
                      // disabled={form.state.isSubmitting}
                    />
                  );
                }}
              />
            </Field>
          </Field>

          <Field>
            <Button type="submit" disabled={form.state.isSubmitting}>
              Create Account
            </Button>
          </Field>

          <FieldDescription className="text-center text-sm">
            Already have an account?
            <Link
              href="/auth/sign-in"
              className="underline underline-offset-4 ml-2"
            >
              Sign in
            </Link>
          </FieldDescription>
        </FieldGroup>
      </form>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking sign up, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
