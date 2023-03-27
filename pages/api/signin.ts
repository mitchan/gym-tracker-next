import { NextApiRequest, NextApiResponse } from "next";

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({});
    return;
  }

  const { body } = req;

  if (body.email === "admin" && body.password === "admin") {
    res.status(201);
    res.json({});
  } else {
    res.status(401);
    res.json({});
  }
}
