import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "../../../lib/prisma";

// POST /api/task
// Required fields in body: title, description
// Required fields in body:
export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  const { title, description } = req.body;

  const session = await getSession({ req });
  if (session) {
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
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
