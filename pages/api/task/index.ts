import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "../../../lib/prisma";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    res.status(401).send({ message: "Unauthorized" });
  }

  // POST /api/task
  if (req.method === "POST") {
    const { title, description } = req.body;

    const result = await prisma.task.create({
      data: {
        title: title,
        description: description,
        completed: false,
        created_at: new Date(),
        updated_at: new Date(),
        user: { connect: { email: session?.user?.email || "" } },
      },
    });
    res.json(result);
  }

  // GET /api/task
  if (req.method === "GET") {
    const result = await prisma.task.findMany({
      where: { userEmail: String(session?.user?.email) },
    });

    const finishedTasks = result.filter((task) => task.completed);
    const unfinishedTasks = result.filter((task) => !task.completed);

    res.json({ finishedTasks, unfinishedTasks });
  }

  throw new Error(`The HTTP ${req.method} method is not supported at this route.`);
}
