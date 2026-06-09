import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { birthDate } = req.body;
  const date = new Date(birthDate);

  const day   = date.getUTCDate();         // 4
  const month = date.getUTCMonth() + 1;    // 9
  const year  = date.getUTCFullYear();     // 1959

  const clampChallenge = (n: number) => Math.min(8, Math.max(0, n));

  const reduce = (n: number): number => {
    while (n > 9 && ![11, 22, 33].includes(n)) {
      n = n.toString().split('').reduce((s, d) => s + +d, 0);
    }
    return n;
  };

  const yRed = reduce(year);

  const P1 = reduce(month + day);
  const P2 = reduce(day + year);
  const P3 = reduce(P1 + P2);
  const P4 = reduce(month + day + year);

  const C1 = clampChallenge(Math.abs(month - day));
  const C2 = clampChallenge(Math.abs(day - yRed));
  const C3 = clampChallenge(Math.abs(P1 - P2));
  const C4 = clampChallenge(Math.abs(P3 - P4));  

  res.status(200).json({
    pinnacles: [P1, P2, P3, P4],
    challenges: [C1, C2, C3, C4]
  });
}
