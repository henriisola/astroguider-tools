// Pythagoras master-reduction
function reduceToSingleOrMaster(num: number): number {
  while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
    num = num
      .toString()
      .split('')
      .reduce((acc, digit) => acc + Number(digit), 0);
  }
  return num;
}

const pythaTable: Record<string, number> = {
  A: 1, J: 1, S: 1,
  B: 2, K: 2, T: 2,
  C: 3, L: 3, U: 3,
  D: 4, M: 4, V: 4,
  E: 5, N: 5, W: 5,
  F: 6, O: 6, X: 6,
  G: 7, P: 7, Y: 7,
  H: 8, Q: 8, Z: 8,
  I: 9, R: 9,
};

export function getPythaNumber(name: string): number {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '');
  return clean.split('').reduce((acc, char) => acc + (pythaTable[char] || 0), 0);
}

export function getPythagorasExpression(name: string): { rawSum: number; final: number } {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '');
  const rawSum = clean.split('').reduce((acc, char) => acc + (pythaTable[char] || 0), 0);
  const final = reduceToSingleOrMaster(rawSum);
  return { rawSum, final };
}

export function getPythagoreanSoulUrge(name: string): { rawSum: number; final: number } {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '');
  const vowels = clean.split('').filter(c => 'AEIOU'.includes(c));
  const rawSum = vowels.reduce((acc, c) => acc + (pythaTable[c] || 0), 0);
  const final = reduceToSingleOrMaster(rawSum);
  return { rawSum, final };
}

export function getPythagoreanPersonality(name: string): { rawSum: number; final: number } {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '');
  const consonants = clean.split('').filter(c => !'AEIOU'.includes(c));
  const rawSum = consonants.reduce((acc, c) => acc + (pythaTable[c] || 0), 0);
  const final = reduceToSingleOrMaster(rawSum);
  return { rawSum, final };
}

export function getPythagoreanBreakdown(name: string) {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '');

  const vowels = clean
    .split('')
    .filter(c => 'AEIOU'.includes(c))
    .map(c => ({ letter: c, value: pythaTable[c] || 0 }));

  const consonants = clean
    .split('')
    .filter(c => /^[A-Z]$/.test(c) && !'AEIOU'.includes(c))
    .map(c => ({ letter: c, value: pythaTable[c] || 0 }));

  return { vowels, consonants };
}
