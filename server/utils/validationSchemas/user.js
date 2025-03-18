import { z } from "zod";

const restoreUserSchema = z.object({
  body: z
    .object({
      username: z.string().optional(),
      email: z.string().email().optional(),
      password: z.string().min(8),
    })
    .refine((data) => data.username || data.email, {
      message: "Username or email is required!",
    }),
});

const updateUserSchema = z.object({
  body: z
    .object({
      username: z
        .string()
        .regex(/^[a-zA-Z0-9-_]{2,16}$/gi)
        .optional(),
      firstName: z
        .string()
        .regex(/^[a-zA-Z-]{2,32}$/gi)
        .optional(),
      lastName: z
        .string()
        .regex(/^[a-zA-Z-]{2,32}$/gi)
        .optional(),
      gender: z.enum(["male", "female"]).optional(),
    })
    .strict(),
  files: z
    .object({
      avatar: z.any(),
    })
    .optional(),
});

export { updateUserSchema, restoreUserSchema };
