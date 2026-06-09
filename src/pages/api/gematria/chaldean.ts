import type { NextApiRequest, NextApiResponse } from 'next';
import { digitalRoot } from '../numero/core';

const map: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8, P: 8
};

// Funktio palauttamaan myös osat (kirjain + pisteet)
const calculateChaldeanValue = (phrase: string) => {
  const parts = [...phrase.toUpperCase()]
    .filter(c => map[c] !== undefined)
    .map(c => ({ word: c, value: map[c] }));

  const total = parts.reduce((sum, part) => sum + part.value, 0);
  return { total, parts };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { phrase } = req.body as { phrase: string };

  const { total, parts } = calculateChaldeanValue(phrase);
  res.status(200).json({
    chaldean: total,
    reduced: digitalRoot(total),
    parts
  });
}
