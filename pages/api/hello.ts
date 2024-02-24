// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const Database = require("@replit/database");

const db = new Database();

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  let tabs_today = (await db.get("tabs_today")) ?? 0;
  tabs_today += 1;
  await db.set("tabs_today", tabs_today);
  res.status(200).json({ tabs_today: tabs_today });
}
