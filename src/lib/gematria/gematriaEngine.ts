// ======================================================
// GEMATRIA RESEARCH ENGINE v1
// Deterministic multi-alphabet analysis core
// ======================================================

export type AlphabetGroup = "english" | "hebrew" | "greek";

export type CipherDefinition = {
  name: string;
  group: AlphabetGroup;
  valueOf: (ch: string) => number;
};

export type BreakdownPart = {
  char: string;
  value: number;
};

export type CipherResult = {
  cipher: string;
  group: AlphabetGroup;
  total: number;
  breakdown: BreakdownPart[];
  digitalRoot: number;
};

export type WordAnalysis = {
  input: string;
  normalized: string;
  results: CipherResult[];
};

// ------------------------------------------------------
// Helpers
// ------------------------------------------------------

function digitalRoot(n: number): number {
  if (n === 0) return 0;
  return n % 9 === 0 ? 9 : n % 9;
}

function primeFactors(n: number): number[] {
  const factors: number[] = [];
  let divisor = 2;

  while (n >= 2) {
    if (n % divisor === 0) {
      factors.push(divisor);
      n = n / divisor;
    } else {
      divisor++;
    }
  }

  return factors;
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function isSquare(n: number): boolean {
  return Number.isInteger(Math.sqrt(n));
}

function isTriangular(n: number): boolean {
  const x = (Math.sqrt(8 * n + 1) - 1) / 2;
  return Number.isInteger(x);
}

function normalizeInput(input: string) {
  return input.trim().toUpperCase();
}

// ------------------------------------------------------
// English
// ------------------------------------------------------

const EN_ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function buildOrdinal(): Record<string, number> {
  const map: Record<string, number> = {};
  EN_ALPHA.forEach((ch, i) => (map[ch] = i + 1));
  return map;
}

function buildReverse(): Record<string, number> {
  const map: Record<string, number> = {};
  EN_ALPHA.forEach((ch, i) => (map[ch] = 26 - i));
  return map;
}

const ORDINAL = buildOrdinal();
const REVERSE = buildReverse();

const CHALDEAN: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 8, G: 3, H: 5, I: 1, J: 1, K: 2, L: 3, M: 4,
  N: 5, O: 7, P: 8, Q: 1, R: 2, S: 3, T: 4, U: 6, V: 6, W: 6, X: 5, Y: 1, Z: 7
};

const PYTHAGOREAN: Record<string, number> = {
  A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
  J: 1, K: 2, L: 3, M: 4, N: 5, O: 6, P: 7, Q: 8, R: 9,
  S: 1, T: 2, U: 3, V: 4, W: 5, X: 6, Y: 7, Z: 8
};

// ------------------------------------------------------
// Hebrew
// ------------------------------------------------------

const HEBREW_STANDARD: Record<string, number> = {
  א: 1, ב: 2, ג: 3, ד: 4, ה: 5, ו: 6, ז: 7, ח: 8, ט: 9,
  י: 10, כ: 20, ל: 30, מ: 40, נ: 50, ס: 60, ע: 70, פ: 80, צ: 90,
  ק: 100, ר: 200, ש: 300, ת: 400,
  ך: 20, ם: 40, ן: 50, ף: 80, ץ: 90
};

const HEBREW_GADOL: Record<string, number> = {
  ...HEBREW_STANDARD,
  ך: 500, ם: 600, ן: 700, ף: 800, ץ: 900
};

// ------------------------------------------------------
// Greek
// ------------------------------------------------------

const GREEK_STANDARD: Record<string, number> = {
  Α: 1, Β: 2, Γ: 3, Δ: 4, Ε: 5, Ϛ: 6, Ζ: 7, Η: 8, Θ: 9,
  Ι: 10, Κ: 20, Λ: 30, Μ: 40, Ν: 50, Ξ: 60, Ο: 70, Π: 80, Ϟ: 90,
  Ρ: 100, Σ: 200, Τ: 300, Υ: 400, Φ: 500, Χ: 600, Ψ: 700, Ω: 800, Ϡ: 900
};

// ------------------------------------------------------
// Cipher Registry
// ------------------------------------------------------

const CIPHERS: CipherDefinition[] = [
  { name: "English Ordinal",  group: "english", valueOf: (ch) => ORDINAL[ch] || 0 },
  { name: "Reverse Ordinal",  group: "english", valueOf: (ch) => REVERSE[ch] || 0 },
  {
    name: "Full Reduction",
    group: "english",
    valueOf: (ch) => {
      const v = ORDINAL[ch];
      return v ? digitalRoot(v) : 0;
    }
  },
  { name: "Chaldean",         group: "english", valueOf: (ch) => CHALDEAN[ch] || 0 },
  { name: "Pythagorean",      group: "english", valueOf: (ch) => PYTHAGOREAN[ch] || 0 },
  { name: "Hebrew Standard",  group: "hebrew",  valueOf: (ch) => HEBREW_STANDARD[ch] || 0 },
  { name: "Hebrew Gadol",     group: "hebrew",  valueOf: (ch) => HEBREW_GADOL[ch] || 0 },
  { name: "Greek Isopsephy",  group: "greek",   valueOf: (ch) => GREEK_STANDARD[ch] || 0 },
];


// ------------------------------------------------------
// Core Engine
// ------------------------------------------------------

export function analyzeWord(input: string): WordAnalysis {
  const normalized = normalizeInput(input);

  const results: CipherResult[] = CIPHERS.map((cipher) => {
    const breakdown: BreakdownPart[] = [];
    let total = 0;

    for (const ch of normalized) {
      const value = cipher.valueOf(ch);
      if (value > 0) {
        breakdown.push({ char: ch, value });
        total += value;
      }
    }

    return {
      cipher: cipher.name,
      group: cipher.group,
      total,
      breakdown,
      digitalRoot: digitalRoot(total)
    };
  }).filter((r) => r.total > 0);

  // 🔥 Cross-cipher same value detection (same word, different ciphers)
  const resultsWithCrossMatch = results.map((result) => {
    const crossMatch = results.some(
      (other) => other.cipher !== result.cipher && other.total === result.total
    );
    return {
      ...result,
      crossMatch
    };
  });

  return {
    input,
    normalized,
    results: resultsWithCrossMatch
  };
}

export function compareWords(a: string, b: string) {

  const resultA = analyzeWord(a);
  const resultB = analyzeWord(b);

  const rawComparison = resultA.results.map(resA => {
    const resB = resultB.results.find(r => r.cipher === resA.cipher);
    if (!resB) return null;

    const factorsA = primeFactors(resA.total);
    const factorsB = primeFactors(resB.total);
    const sharedFactors = [
      ...new Set(
        factorsA.filter(f => factorsB.includes(f))
      )
    ];
    
    return {
      cipher: resA.cipher,
      group: resA.group,
      a: resA.total,
      b: resB.total,
      difference: resA.total - resB.total,
      sameValue: resA.total === resB.total,
      sameReduction: resA.digitalRoot === resB.digitalRoot,
      mirror: false,
      crossMatch: false,
      sharedFactors,
      sharedFactorCount: sharedFactors.length,
      digitalRootA: resA.digitalRoot,
      digitalRootB: resB.digitalRoot,
      propertiesA: {
        prime: isPrime(resA.total),
        square: isSquare(resA.total),
        triangular: isTriangular(resA.total)
      },
      propertiesB: {
        prime: isPrime(resB.total),
        square: isSquare(resB.total),
        triangular: isTriangular(resB.total)
      }
    };
  }).filter(Boolean) as any[];

  // 🔥 Mirror detection
  for (let i = 0; i < rawComparison.length; i++) {
    for (let j = i + 1; j < rawComparison.length; j++) {
      if (
        rawComparison[i].difference !== 0 &&
        rawComparison[i].difference === -rawComparison[j].difference
      ) {
        rawComparison[i].mirror = true;
        rawComparison[j].mirror = true;
      }
    }
  }

  // 🔥 Cross-cipher same value detection
  for (let i = 0; i < rawComparison.length; i++) {
    for (let j = 0; j < rawComparison.length; j++) {
      if (i === j) continue;

      if (
        rawComparison[i].a === rawComparison[j].b &&
        rawComparison[i].cipher !== rawComparison[j].cipher
      ) {
        rawComparison[i].crossMatch = true;
      }
    }
  }

  return {
    a: resultA,
    b: resultB,
    comparison: rawComparison
  };
}
