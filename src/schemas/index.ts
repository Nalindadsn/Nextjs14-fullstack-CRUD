import * as z from "zod";

export const UserSchema = z.object({
  id:z.optional(z.string()),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  username: z.string().min(3, {
    message: "Name is required",
  }),
  role: z.string().min(1, {
    message: "Name is required",
  }),
});

export const UserDeleteSchema = z.object({
  username: z.string().min(3, {
    message: "Name is required",
  }),
});
