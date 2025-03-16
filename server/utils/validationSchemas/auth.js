import { z } from "zod";

const signupSchema = z.object({
  username: z.string().regex(/^[a-zA-Z0-9-_]{2,16}$/gi),
  firstName: z
    .string()
    .regex(/^[a-zA-Z-]{2,32}$/gi)
    .optional(),
  lastName: z
    .string()
    .regex(/^[a-zA-Z-]{2,32}$/gi)
    .optional(),
  email: z.string().email(),
  password: z.string().min(8),
  gender: z.enum(["male", "female"]).optional(),
  avatar: z.any().optional(), // FIXME
});

const signinSchema = z
  .object({
    username: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(8),
  })
  .refine((data) => data.username || data.email, {
    message: "Username or email is required",
  });

export { signupSchema, signinSchema };
