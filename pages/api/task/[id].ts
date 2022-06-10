import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "../../../lib/prisma";

// DELETE /api/task/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const postId = req.query.id;

  const session = await getSession({ req });

  if (req.method === "DELETE") {
    if (session) {
      const task = await prisma.task.delete({
        where: { id: String(postId) },
      });
      res.json(task);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } else {
    throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
  }
}
