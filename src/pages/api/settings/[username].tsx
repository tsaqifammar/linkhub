import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/session";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(400)
      .json({ message: "Only GET method is available for this endpoint" });
  }

  const { username } = req.query as { username: string };

  try {
    const session = await getServerSession(req, res);

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await prisma.user.findUnique({
      where: { username },
      select: {
        username: true,
        name: true,
      },
    });

    return res.status(200).json({
      username,
      name: user?.name,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
