import * as z from "zod";

export const UserSchema = z.object({
  id: z.optional(z.string()),
  name: z.string().min(1, {
    message: "Name is required",
  }),
  username: z
    .string()
    .min(3, {
      message: "minimum 3 characters are required",
    })
    .trim()
    .transform((s, ctx) => {
      const withoutWhitespace = s;
      if (/\s/.test(s)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "space is not allowed",
        });
        //This is a special symbol you can use to return early from the transform function.  It has type `never` so it does not affect the inferred return type.
        return z.NEVER;
      }
      return withoutWhitespace;
    }),
  role: z.string().min(1, {
    message: "role is required",
  }),
});

export const UserDeleteSchema = z.object({
  username: z.string().min(3, {
    message: "Name is required",
  }),
});
