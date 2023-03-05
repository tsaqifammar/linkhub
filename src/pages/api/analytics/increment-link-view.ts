import prisma from "@/lib/prisma";
import { LinkProps } from "@/modules/admin";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { z, ZodError } from "zod";

const IncrementLinkViewSchema = z.object({
  username: z.string(),
  index: z.number(),
  url: z.string(),
});

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
    // `url` is used for asserting that link[index].url == url, to prevent incorrect updates
    // in case links are updated while also being viewed at the same time.
    const { username, index, url } = IncrementLinkViewSchema.parse({
      username: req.body.username,
      index: req.body.index,
      url: req.body.url,
    });

    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const links = user!.links as Prisma.JsonArray;
    if (index > links.length) {
      return res.status(400).json({
        message: `Index exceeds links count for ${username}`,
      });
    }

    const indexedLink = links[index - 1] as LinkProps;
    if (indexedLink.url !== url) {
      return res.status(400).json({
        message: `Url doesn't match with indexed link`,
      });
    }

    indexedLink.viewCount += 1;

    links[index - 1] = indexedLink;
    await prisma.user.update({
      data: { links },
      where: { username },
    });

    return res.status(200).end();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: error.message,
      });
    }
    return res.status(500).end();
  }
}
