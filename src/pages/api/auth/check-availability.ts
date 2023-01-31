import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

type Data =
  | {
      ok: boolean;
      errors: {
        field: string;
        message: string;
      }[];
    }
  | {
      message: string;
    };

function createError(field: string, message: string) {
  return { field, message };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    res
      .status(400)
      .json({ message: "Only GET method is available for this endpoint" });
  }

  const { username, email } = req.query;

  let errors = [];

  if (username) {
    const userWithUsername = await prisma.user.findUnique({
      where: { username: username as string },
    });
    if (userWithUsername || ["login", "sign-up", "admin"].includes(username as string))
      errors.push(createError("username", "Username has already been used"));
  }

  if (email) {
    const userWithEmail = await prisma.user.findUnique({
      where: { email: email as string },
    });
    if (userWithEmail)
      errors.push(createError("email", "Email has already been used"));
  }

  res.json({
    ok: errors.length === 0,
    errors,
  });
}
