import prisma from "@/lib/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

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
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401).json({ message: "You must be logged in" });
    }

    const user = await prisma.user.findFirst({
      where: { id: session?.user.id },
    });
    const totalLinkViews = await prisma.link.aggregate({
      _sum: {
        viewCount: true,
      },
      where: {
        authorId: user?.id,
      },
    });

    res.status(200).json({
      visitCount: user?.visitCount || 0,
      totalLinkViews: totalLinkViews._sum.viewCount || 0,
    });
  } catch (error) {
    res.status(500);
  }
}
