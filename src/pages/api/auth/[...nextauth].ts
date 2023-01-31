import { LoginProps, LoginSchema } from "@/modules/auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, _) {
        const { username, password } = credentials as LoginProps;

        try {
          LoginSchema.parse({
            username,
            password,
          });
        } catch (error) {
          if (error instanceof ZodError) {
            throw Error(error.message);
          }
        }

        const user = await prisma.user.findUnique({ where: { username } });

        if (!user) throw Error("User not found");

        if (await bcrypt.compare(password, user.password)) {
          return {
            id: user.id,
            username: user.username,
            email: user.email,
          };
        }

        throw Error("Invalid credentials");
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      // @ts-ignore
      if (user?.username) token.username = user?.username;
      return token;
    },
    async session({ session, token }) {
      if (token?.username) {
        session.user.username = token.username as string;
      }
      return session;
    },
  }
};

export default NextAuth(authOptions);
