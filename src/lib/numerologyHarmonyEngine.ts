// ─────────────────────────────────────────────────────────────────────────────
// Numerology Harmony Engine
// Based on practitioner compatibility data — not trine mathematics
// Source: 20+ years of client work in numerological practice
// ─────────────────────────────────────────────────────────────────────────────

export type HarmonyLevel = 'excellent' | 'good' | 'neutral' | 'challenging';

// ─────────────────────────────────────────────────────────────────────────────
// Compatibility matrix
// For asymmetric pairs: if either side says 'excellent' → excellent
//                       if either side says 'challenging' → challenging
//                       otherwise average
// ─────────────────────────────────────────────────────────────────────────────

// Raw data — keyed by number, each entry lists best/friendly/challenging
// Master numbers kept as-is (not reduced to base)
const RAW: Record<number, { best: number[]; friendly: number[]; challenging: number[] }> = {
  1:  { best: [11, 6],        friendly: [2, 7, 4],      challenging: [9] },
  2:  { best: [8],            friendly: [3, 4, 5, 6, 1], challenging: [9] },
  3:  { best: [5, 8],         friendly: [],              challenging: [4, 7] },
  4:  { best: [9, 8, 6],      friendly: [1, 2, 7],       challenging: [3, 5] },
  5:  { best: [3, 7],         friendly: [2, 8, 9],       challenging: [6, 4] },
  6:  { best: [1, 4],         friendly: [2, 3, 9],       challenging: [5] },
  7:  { best: [5, 11],        friendly: [1, 4],          challenging: [8, 3] },
  8:  { best: [2, 4, 22, 33], friendly: [1, 3, 5],       challenging: [7, 8] },
  9:  { best: [4],            friendly: [3, 5, 6],       challenging: [1, 2, 11, 22] },
  11: { best: [1, 7],         friendly: [3],             challenging: [9] },
  22: { best: [8],            friendly: [3],             challenging: [9] },
  33: { best: [8],            friendly: [3, 5],          challenging: [4, 7] },
};

function getRaw(n: number) {
  return RAW[n] ?? { best: [], friendly: [], challenging: [] };
}

function rawHarmony(a: number, b: number): HarmonyLevel {
  const da = getRaw(a);
  if (da.best.includes(b)) return 'excellent';
  if (da.challenging.includes(b)) return 'challenging';
  if (da.friendly.includes(b)) return 'good';
  return 'neutral';
}

// ─────────────────────────────────────────────────────────────────────────────
// Main harmony function — resolves asymmetry
// excellent wins over all; challenging wins over neutral/good;
// good wins over neutral
// ─────────────────────────────────────────────────────────────────────────────

const LEVEL_RANK: Record<HarmonyLevel, number> = {
  excellent: 3,
  good: 2,
  neutral: 1,
  challenging: 0,
};

export function getHarmony(a: number, b: number): HarmonyLevel {
  if (a === b) return 'excellent';

  const ab = rawHarmony(a, b);
  const ba = rawHarmony(b, a);

  // If one says challenging and the other says excellent → neutral (real tension but also attraction)
  if (
    (ab === 'challenging' && ba === 'excellent') ||
    (ab === 'excellent' && ba === 'challenging')
  ) {
    return 'neutral';
  }

  // Otherwise take the stronger signal
  return LEVEL_RANK[ab] >= LEVEL_RANK[ba] ? ab : ba;
}

export function getHarmonyScore(a: number, b: number): number {
  return { excellent: 10, good: 7, neutral: 5, challenging: 3 }[getHarmony(a, b)];
}

// ─────────────────────────────────────────────────────────────────────────────
// Score helpers
// ─────────────────────────────────────────────────────────────────────────────

export const HARMONY_SCORE: Record<HarmonyLevel, number> = {
  excellent: 10,
  good: 7,
  neutral: 5,
  challenging: 3,
};

export const HARMONY_COLORS: Record<HarmonyLevel, string> = {
  excellent: '#54ab8c',
  good: '#c6a85b',
  neutral: '#7b9ec9',
  challenging: '#c97070',
};

export const HARMONY_LABELS: Record<HarmonyLevel, string> = {
  excellent: 'Excellent',
  good: 'Good',
  neutral: 'Neutral',
  challenging: 'Challenging',
};

// ─────────────────────────────────────────────────────────────────────────────
// Harmony descriptions — context-aware
// ─────────────────────────────────────────────────────────────────────────────

export function describeLifePathHarmony(
  a: number,
  b: number,
  context: 'person' | 'name' | 'address' | 'date' = 'person'
): string {
  const harmony = getHarmony(a, b);

  if (context === 'person') {
    if (harmony === 'excellent') {
      if (a === b) return `You share Life Path ${a} — an identical vibration. You understand each other's core drive instinctively, which creates both deep resonance and the challenge of mirroring each other's patterns.`;
      return `Life Paths ${a} and ${b} are naturally compatible — your core energies support and amplify one another.`;
    }
    if (harmony === 'good') return `Life Paths ${a} and ${b} are broadly compatible. Your energies complement each other with no significant areas of friction.`;
    if (harmony === 'neutral') return `Life Paths ${a} and ${b} have a workable dynamic. You approach life differently, but mutual awareness makes the relationship function well.`;
    return `Life Paths ${a} and ${b} create inherent tension. The relationship can absolutely work — but it requires conscious effort and genuine respect for each other's fundamentally different nature.`;
  }

  if (context === 'name') {
    if (harmony === 'excellent') return `Your Life Path ${a} resonates strongly with this name's energy (${b}). The name amplifies your natural direction.`;
    if (harmony === 'good') return `Your Life Path ${a} and this name's energy (${b}) are broadly compatible. The name works in your favour.`;
    if (harmony === 'neutral') return `Your Life Path ${a} and this name's energy (${b}) are workable. The name won't hold you back but may not deeply amplify your direction.`;
    return `Your Life Path ${a} and this name's energy (${b}) have some friction. Worth understanding the tension before committing to this name.`;
  }

  if (context === 'address') {
    if (harmony === 'excellent') return `Your Life Path ${a} resonates with this home's energy (${b}). The space supports your core life direction.`;
    if (harmony === 'good') return `Your Life Path ${a} and this home's energy (${b}) are broadly compatible. A supportive environment.`;
    if (harmony === 'neutral') return `Your Life Path ${a} and this home's energy (${b}) are workable. Some adjustment may be needed to feel truly at ease here.`;
    return `Your Life Path ${a} and this home's energy (${b}) create some friction. The home may feel energetically at odds with your natural direction.`;
  }

  // date
  if (harmony === 'excellent') return `Your Life Path ${a} resonates with this date's energy (${b}). A naturally supportive combination.`;
  if (harmony === 'good') return `Your Life Path ${a} and this date's energy (${b}) are compatible. The timing works in your favour.`;
  if (harmony === 'neutral') return `Your Life Path ${a} and this date's energy (${b}) are workable. The timing is neither amplifying nor opposing.`;
  return `Your Life Path ${a} and this date's energy (${b}) have some friction. Going in with clear intention will help.`;
}

export function describeSoulUrgeHarmony(
  personSU: number,
  targetSU: number,
  context: 'person' | 'name' | 'address' = 'person'
): string {
  const harmony = getHarmony(personSU, targetSU);

  if (context === 'name') {
    if (harmony === 'excellent') return `Your Soul Urge (${personSU}) and this name's soul energy (${targetSU}) resonate deeply. The name will feel right from the inside.`;
    if (harmony === 'good') return `Your Soul Urge (${personSU}) is compatible with this name's energy (${targetSU}). You will feel at home with this name.`;
    if (harmony === 'neutral') return `Your Soul Urge (${personSU}) and the name's energy (${targetSU}) are workable. The name won't feel wrong, but may not feel deeply personal.`;
    return `There is some tension between your Soul Urge (${personSU}) and this name's energy (${targetSU}). You may find yourself working against the name's natural pull.`;
  }

  if (context === 'address') {
    if (harmony === 'excellent') return `Your Soul Urge (${personSU}) resonates with this home's energy (${targetSU}) — you will feel emotionally at home here.`;
    if (harmony === 'good') return `Your Soul Urge (${personSU}) is compatible with this home's energy (${targetSU}).`;
    if (harmony === 'neutral') return `Your Soul Urge (${personSU}) and this home's energy (${targetSU}) are workable — some emotional adjustment may be needed.`;
    return `Your Soul Urge (${personSU}) may not feel fully nourished by this home's energy (${targetSU}).`;
  }

  // person vs person
  if (harmony === 'excellent') return `Your Soul Urges (${personSU} and ${targetSU}) resonate naturally — your inner motivations support one another.`;
  if (harmony === 'good') return `Your Soul Urges (${personSU} and ${targetSU}) are compatible — broadly aligned inner drives.`;
  if (harmony === 'neutral') return `Your Soul Urges (${personSU} and ${targetSU}) are workable — different motivations that can coexist with awareness.`;
  return `Your Soul Urges (${personSU} and ${targetSU}) have inherent tension — your inner motivations pull in different directions.`;
}

export function describeExpressionHarmony(
  personExpr: number,
  nameExpr: number
): string {
  const harmony = getHarmony(personExpr, nameExpr);
  if (harmony === 'excellent') return `Your natural expression (${personExpr}) and the name's outward energy (${nameExpr}) resonate strongly. The world will see you through this name exactly as you intend.`;
  if (harmony === 'good') return `Your expression (${personExpr}) and the name's energy (${nameExpr}) are compatible. The name supports how you wish to be perceived.`;
  if (harmony === 'neutral') return `Your expression (${personExpr}) and the name's energy (${nameExpr}) are workable but not deeply resonant.`;
  return `There may be a gap between how you naturally express yourself (${personExpr}) and how this name presents you to the world (${nameExpr}).`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Trine info retained for CompatibilityBlueprintGuide display
// ─────────────────────────────────────────────────────────────────────────────

export function getTrineTheme(_n: number) {
  return null; // trine display removed — practitioner data used instead
}