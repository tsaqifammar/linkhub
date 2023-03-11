import prisma from "@/lib/prisma";
import { z } from "zod";
import type { NextApiRequest, NextApiResponse } from "next";
import { LinkSchema } from "@/modules/admin";
import { getServerSession } from "@/lib/session";

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

    const linksInfo = await prisma.user.findUnique({
      where: { username },
      select: {
        appearanceSettings: {
          select: {
            colorMode: true,
            linkhubBackgroundColor1: true,
            linkhubBackgroundColor2: true,
            linkhubTextColor: true,
          },
        },
        links: true,
      },
    });

    if (!linksInfo) {
      return res.status(404).json({ message: "Username not found" });
    }

    let links = z.array(LinkSchema).parse(linksInfo?.links);

    if (!session || session.user.username !== username) {
      links = links.filter((item) => item.enabled);
      links.forEach((item) => {
        delete item.viewCount;
      });
    }

    return res.status(200).json({
      links,
      appearance: linksInfo?.appearanceSettings,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
}
