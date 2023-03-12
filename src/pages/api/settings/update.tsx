import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/session";
import { SettingsSchema } from "@/modules/admin";
import type { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";

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
    const session = await getServerSession(req, res);

    if (!session) {
      res.status(401).json({ message: "You must be logged in" });
    }

    const { username, name } = SettingsSchema.parse(req.body);

    const updatedUserInfo = await prisma.user.update({
      data: { username, name },
      where: { username: session?.user.username },
      select: { username: true, name: true },
    });

    await res.revalidate(`/${session?.user.username}`);
    await res.revalidate(`/${username}`);
    res.status(200).json(updatedUserInfo);
  } catch (error) {
    if (error instanceof ZodError) {
      res.status(400).json({
        message: error.message,
      });
    } else {
      res.status(500).json({
        message: "Internal server error",
      });
    }
  }
}
