import { createAuthOptions } from "@/pages/api/auth/[...nextauth]";
import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";

export const getServerSession = (req: NextApiRequest, res: NextApiResponse) => {
  return unstable_getServerSession(req, res, createAuthOptions(req));
}
