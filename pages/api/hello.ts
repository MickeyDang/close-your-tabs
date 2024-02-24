// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const Database = require("@replit/database");

const db = new Database();

type Data = {
  result: [];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { id } = req.query;

  let tabs_today = (await db.get(id)) ?? 0;
  tabs_today += 1;
  await db.set(id, tabs_today);

  res.status(200).json({ result: tabs_today } as Data);
}
