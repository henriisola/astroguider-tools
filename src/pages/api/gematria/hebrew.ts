import type { NextApiRequest, NextApiResponse } from 'next';
import { digitalRoot } from '../numero/core';

const map: Record<string, number> = {
  א:1, ב:2, ג:3, ד:4, ה:5, ו:6, ז:7, ח:8, ט:9,
  י:10, כ:20, ל:30, מ:40, נ:50, ס:60, ע:70, פ:80,
  צ:90, ק:100, ר:200, ש:300, ת:400
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { phrase } = req.body as { phrase: string };
  const total = [...phrase].reduce((s, c) => s + (map[c] ?? 0), 0);
  res.status(200).json({ hebrew: total, reduced: digitalRoot(total) });
}
