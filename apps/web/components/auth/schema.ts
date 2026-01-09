import { z } from "zod";

export const signUpFormSchema = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(25, { message: "Name must be at most 25 characters long" }),
    email: z.string().email({
      message: "Please enter a valid email address"
    }),
    password: z
      .string({
        message: "Please enter a valid password"
      })
      .min(8, { message: "Password should be at least 8 characters long" })
      .max(16, { message: "Password should be at most 16 characters long" }),
    confirmPassword: z
      .string({
        message: "Invalid confirm password"
      })
      .min(8, { message: "Password should be at least 8 characters long" })
      .max(16, { message: "Password should be at most 16 characters long" })
  })
  .refine(
    values => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match",
      path: ["confirmPassword"]
    }
  );

export const signInFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address"
  }),
  password: z
    .string({
      message: "Please enter a valid password"
    })
    .min(8, { message: "Password should be at least 8 characters long" })
    .max(16, { message: "Password should be at most 16 characters long" })
});
