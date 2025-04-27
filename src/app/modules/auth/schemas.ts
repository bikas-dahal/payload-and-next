import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4, "Password must be at least 4 characters long"),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long")
    .regex(
      /^[a-z0-9][a-z0-9-]*[a-z0-9]$/,
      "Username can only contain letters, numbers, and dashes"
    )
    .refine(
      (value) => !value.includes("--"),
      "Username cannot contain consecutive underscores"
    )
    .transform((value) => value.toLowerCase()),
});

export type RegisterType = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type LoginType = z.infer<typeof loginSchema>;
