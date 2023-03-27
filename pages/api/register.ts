import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../lib/db";
import { hashPassword } from "../../lib/auth";

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({});
    return;
  }

  const { body } = req;

  try {
    await db.user.create({
      data: {
        email: body.email,
        password: await hashPassword(body.password),
      },
    });

    res.status(200).json({});
  } catch (e) {
    res.status(500).json({});
  }
}
