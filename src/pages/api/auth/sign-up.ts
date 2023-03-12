import type { NextApiRequest, NextApiResponse } from "next";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { SignUpSchema } from "@/modules/auth";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res
      .status(400)
      .json({ message: "Only POST method is available for this endpoint" });
  }

  const { username, email, password, confirmPassword } = req.body;

  try {
    const signUpInfo = SignUpSchema.parse({
      username,
      email,
      password,
      confirmPassword
    });

    const hashedPassword = await bcrypt.hash(signUpInfo.password, 10);

    const user = await prisma.user.create({
      data: {
        username: signUpInfo.username,
        email: signUpInfo.email,
        password: hashedPassword,
        appearanceSettings: {
          create: {},
        },
      },
    });

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: error.message,
      });
    } else if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      res.status(409).json({
        message: "User with the same info already exists",
      });
    }
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
