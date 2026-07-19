import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email("Invalid email address format."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .regex(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).*$/,
      "Password requires a number, a capital letter, and a special character."
    ),
  name: z.string().min(1, "Name must be non-empty."),
});

export const signinSchema = z.object({
  email: z.string().email("Invalid email address format."),
  password: z.string().min(1, "Password is required."),
});
