import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    res
      .status(400)
      .json({ message: "Only PUT method is available for this endpoint" });
  }

  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Username must be provided"
      });
    }

    await prisma.user.update({
      where: { username },
      data: {
        visitCount: {
          increment: 1
        }
      }
    });

    return res.status(200).end();
  } catch (error) {
    return res.status(500).end();
  }
}
