import prisma from "@/lib/prisma";
import { getServerSession } from "@/lib/session";
import { LinkProps } from "@/modules/admin";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res
      .status(400)
      .json({ message: "Only GET method is available for this endpoint" });
  }

  try {
    const session = await getServerSession(req, res);

    if (!session) {
      res.status(401).json({ message: "You must be logged in" });
    }

    const user = await prisma.user.findFirst({
      where: { id: session?.user.id },
    });

    const links = user!.links as Prisma.JsonArray;
    const totalLinkViews: number = links.reduce(
      (acc: number, cur: any) => acc + ((cur as LinkProps).viewCount || 0),
      0
    );

    res.status(200).json({
      visitCount: user?.visitCount || 0,
      totalLinkViews: totalLinkViews || 0,
    });
  } catch (error) {
    res.status(500).end();
  }
}
