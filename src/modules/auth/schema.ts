import { z } from "zod";

export const SignUpSchema = z
  .object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const LoginSchema = z.object({
  username: z.string(),
  password: z.string().min(6),
});

export type SignUpProps = z.infer<typeof SignUpSchema>;
export type LoginProps = z.infer<typeof LoginSchema>;

export type User = {
  id: string;
  username: string;
  email: string;
};
