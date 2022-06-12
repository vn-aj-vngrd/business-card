import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "../../../lib/prisma";

// DELETE /api/task/:id
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const id = req.query.id;

  const session = await getSession({ req });
  if (!session) {
    res.status(401).send({ message: "Unauthorized" });
  }

  if (req.method === "DELETE") {
    const task = await prisma.task.delete({
      where: { id: String(id) },
    });
    return res.json(task);
  }

  // UPDATE /api/task/:id
  if (req.method === "PUT") {
    const { title, description, completed } = req.body;

    const updateTask = await prisma.task.update({
      where: { id: String(id) },
      data: { completed, title, description },
    });
    return res.json(updateTask);
  }

  throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
}
