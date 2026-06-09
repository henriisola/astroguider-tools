// ===============================
// 🔣 CLASSIC CHALDEAN NUMEROLOGY
// ===============================

// Chaldean letter mapping
const chaldeanMap: Record<string, number> = {
  A: 1, I: 1, J: 1, Q: 1, Y: 1,
  B: 2, K: 2, R: 2,
  C: 3, G: 3, L: 3, S: 3,
  D: 4, M: 4, T: 4,
  E: 5, H: 5, N: 5, X: 5,
  U: 6, V: 6, W: 6,
  O: 7, Z: 7,
  F: 8,
};

// ===============================
// 🔄 PURE REDUCTION (1–9 ONLY)
// ===============================

export function reduceToSingleDigit(num: number): number {
  while (num > 9) {
    num = num
      .toString()
      .split('')
      .reduce((acc, digit) => acc + Number(digit), 0);
  }
  return num;
}

// ===============================
// 🔢 BASE CALCULATION ENGINE
// ===============================

function calculateFromString(input: string): { rawSum: number; final: number } {
  const cleaned = input.toUpperCase().replace(/[^A-Z]/g, '');

  const rawSum = cleaned
    .split('')
    .reduce((acc, char) => acc + (chaldeanMap[char] || 0), 0);

  const final = reduceToSingleDigit(rawSum);

  return { rawSum, final };
}

// ===============================
// ✨ EXPRESSION (Full Name)
// ===============================
// Classic Chaldean: whole name

export function calculateChaldeanExpression(name: string) {
  return calculateFromString(name);
}

// ===============================
// 💖 SOUL URGE (Vowels Only)
// ===============================

export function calculateChaldeanSoulUrge(name: string) {
  const vowelsOnly = name.replace(/[^AEIOUaeiou]/g, '');
  return calculateFromString(vowelsOnly);
}

// ===============================
// 🗣 PERSONALITY (Consonants Only)
// ===============================

export function calculateChaldeanPersonality(name: string) {
  const consonantsOnly = name.replace(/[AEIOUaeiou]/g, '');
  return calculateFromString(consonantsOnly);
}

// ===============================
// 🧠 OPTIONAL: COMPOUND + ROOT
// ===============================

export function calculateChaldeanCompound(name: string): {
  compound: number;
  root: number;
} {
  const { rawSum, final } = calculateChaldeanExpression(name);

  return {
    compound: rawSum,
    root: final,
  };
}