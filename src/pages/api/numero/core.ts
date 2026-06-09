import type { NextApiRequest, NextApiResponse } from 'next';

/* ---------- helpers ---------- */
const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const pythagorean = [...'12345678912345678912345678']  // A=1 … I=9, J=1 …
  .map(n => Number(n));

export const charVal = (ch: string) =>
  pythagorean[letters.indexOf(ch.toUpperCase())] ?? 0;

export const digitalRoot = (n: number): number =>
  n > 9 && ![11, 22, 33].includes(n)
    ? digitalRoot(
        String(n)
          .split('')
          .map(Number)
          .reduce((a, b) => a + b, 0)
      )
    : n;

/* ---------- core calc ---------- */
export const calcNumerology = (name: string, dob: string) => {
  const clean = name.replace(/[^A-Z]/gi, '');
  const vowels = clean.replace(/[^AEIOU]/gi, '');
  const consonants = clean.replace(/[AEIOU]/gi, '');

  const birthDigits = dob.split('-').join('').split('').map(Number);
  const rawLifePath = birthDigits.reduce((a, b) => a + b, 0);
  const lifePath = digitalRoot(rawLifePath);

  const birthDay = Number(dob.split('-')[2]);
  const birthdayRaw = birthDay;
  const birthdayReduced = digitalRoot(birthDay);

  const nameTotal = [...clean].reduce((s, c) => s + charVal(c), 0);
  const destiny = digitalRoot(nameTotal);
  
  const soulUrgeRaw = [...vowels].reduce((s, c) => s + charVal(c), 0);
  const soulUrge = {
    raw: soulUrgeRaw,
    final: digitalRoot(soulUrgeRaw)
  };

  const personalityRaw = [...consonants].reduce((s, c) => s + charVal(c), 0);
  const personality = {
    raw: personalityRaw,
    final: digitalRoot(personalityRaw)
  };
  
  const expressionRaw = nameTotal;
  const expression = {
    raw: expressionRaw,
    final: digitalRoot(expressionRaw)
  };

  return {
    lifePath,
    lifePathRaw: rawLifePath,
    destiny,
    soulUrge,
    personality,
    expression,
    birthdayNumber: birthdayRaw,
    birthdayReduced
  };
} 

/* ---------- API route ---------- */
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, birthDate } = req.body as {
    name: string;
    birthDate: string; // ISO YYYY‑MM‑DD
  };

  try {
    const data = calcNumerology(name, birthDate);
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ error: 'Bad input' });
  }
}
