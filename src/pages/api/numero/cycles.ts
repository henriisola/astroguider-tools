import type { NextApiRequest, NextApiResponse } from 'next';
import { digitalRoot } from '@/lib/numerology/utils';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { birthDate } = req.body as { birthDate: string }; // YYYY‑MM‑DD
  const [y, m, d] = birthDate.split('-').map(Number);

  const today  = new Date();
  const thisYr = today.getFullYear();
  // birthday this calendar year
  const birthdayThisYear = new Date(thisYr, m - 1, d);

  // If the birthday hasn’t happened yet, you’re still in last year’s cycle
  const cycleBaseYear = today >= birthdayThisYear ? thisYr : thisYr - 1;

  /* ---------- calculations ---------- */
  const personalYear  = digitalRoot(cycleBaseYear + m + d);
  const personalMonth = digitalRoot(personalYear   + (today.getMonth() + 1));
  const personalDay   = digitalRoot(personalMonth  +  today.getDate());

  res.status(200).json({ personalYear, personalMonth, personalDay });
}
