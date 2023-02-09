import prisma from "@/lib/prisma";
import { LinkProps, LinksFormSchema } from "@/modules/admin";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { ZodError } from "zod";
import { authOptions } from "../auth/[...nextauth]";

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
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session) {
      res.status(401).json({ message: "You must be logged in" });
    }

    const { links, appearance } = LinksFormSchema.parse(req.body);

    const updatedUserInfo = await prisma.user.update({
      data: {
        links: links,
        pageSettings: {
          update: {
            backgroundIsGradient: appearance.colorMode === "gradient",
            linkhubBackgroundColor1: appearance.linkhubBackgroundColor1,
            linkhubBackgroundColor2: appearance.linkhubBackgroundColor2,
            linkhubTextColor: appearance.linkhubTextColor,
          },
        },
      },
      where: {
        username: session?.user.username,
      },
      select: {
        username: true,
        links: true,
        pageSettings: true,
      }
    });

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
