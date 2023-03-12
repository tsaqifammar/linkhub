import { NextApiRequest, NextApiResponse } from "next";
import { LoginProps, LoginSchema } from "@/modules/auth";
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ZodError } from "zod";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

type CreateAuthOptions = (req: NextApiRequest) => NextAuthOptions;

export const createAuthOptions: CreateAuthOptions = (req) => ({
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
    async jwt({ token, user }) {
      if (req.query.update) {
        const username = req.query.username as string;
        const user = await prisma.user.findUnique({ where: { username }});
        if (user) token.username = user.username;
      }
      if (user) {
        token.id = user.id;
        // @ts-ignore
        token.username = user?.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      if (token?.username) {
        session.user.username = token.username as string;
      }
      return Promise.resolve(session);
    },
  },
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  return NextAuth(req, res, createAuthOptions(req));
}

export default handler;
