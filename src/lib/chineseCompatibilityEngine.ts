// ─────────────────────────────────────────────────────────────────────────────
// Chinese Zodiac Compatibility Engine
// Based on trine philosophy — same trine = natural harmony
// ─────────────────────────────────────────────────────────────────────────────

export type ChineseAnimal =
  | 'Rat' | 'Ox' | 'Tiger' | 'Rabbit'
  | 'Dragon' | 'Snake' | 'Horse' | 'Goat'
  | 'Monkey' | 'Rooster' | 'Dog' | 'Pig';

export type ChineseElement = 'Wood' | 'Fire' | 'Earth' | 'Metal' | 'Water';

export type CompatibilityTier = 'excellent' | 'good' | 'neutral' | 'challenging';

// ─────────────────────────────────────────────────────────────────────────────
// Trine groups — the core of the system
// ─────────────────────────────────────────────────────────────────────────────

// Trine 1: Action, ambition, passion — Rat, Dragon, Monkey
// Trine 2: Determination, wisdom, endurance — Ox, Snake, Rooster
// Trine 3: Courage, idealism, independence — Tiger, Horse, Dog
// Trine 4: Calm, creativity, empathy — Rabbit, Goat, Pig

const TRINES: ChineseAnimal[][] = [
  ['Rat', 'Dragon', 'Monkey'],   // Trine 1
  ['Ox', 'Snake', 'Rooster'],    // Trine 2
  ['Tiger', 'Horse', 'Dog'],     // Trine 3
  ['Rabbit', 'Goat', 'Pig'],     // Trine 4
];

// Direct opposites — maximum tension
// These pairs sit directly across the zodiac wheel
const OPPOSITES: [ChineseAnimal, ChineseAnimal][] = [
  ['Rat', 'Horse'],
  ['Ox', 'Goat'],
  ['Tiger', 'Monkey'],
  ['Rabbit', 'Rooster'],
  ['Dragon', 'Dog'],
  ['Snake', 'Pig'],
];

// ─────────────────────────────────────────────────────────────────────────────
// Element compatibility
// ─────────────────────────────────────────────────────────────────────────────

// Productive cycle: Wood→Fire→Earth→Metal→Water→Wood
const PRODUCTIVE_PAIRS: [ChineseElement, ChineseElement][] = [
  ['Wood', 'Fire'],
  ['Fire', 'Earth'],
  ['Earth', 'Metal'],
  ['Metal', 'Water'],
  ['Water', 'Wood'],
];

// Controlling cycle: Wood controls Earth, Earth controls Water, etc.
const CONTROLLING_PAIRS: [ChineseElement, ChineseElement][] = [
  ['Wood', 'Earth'],
  ['Earth', 'Water'],
  ['Water', 'Fire'],
  ['Fire', 'Metal'],
  ['Metal', 'Wood'],
];

// ─────────────────────────────────────────────────────────────────────────────
// Helper: find trine index for an animal
// ─────────────────────────────────────────────────────────────────────────────

function getTrine(animal: ChineseAnimal): number {
  return TRINES.findIndex(trine => trine.includes(animal));
}

function isOpposite(a: ChineseAnimal, b: ChineseAnimal): boolean {
  return OPPOSITES.some(
    ([x, y]) => (x === a && y === b) || (x === b && y === a)
  );
}

function sameTrine(a: ChineseAnimal, b: ChineseAnimal): boolean {
  const trineA = getTrine(a);
  return trineA !== -1 && TRINES[trineA].includes(b);
}

// ─────────────────────────────────────────────────────────────────────────────
// Animal compatibility
// ─────────────────────────────────────────────────────────────────────────────

export function getAnimalCompatibilityTier(
  a: ChineseAnimal,
  b: ChineseAnimal
): CompatibilityTier {
  if (a === b) return 'excellent'; // same animal — mirror energy, strong resonance
  if (sameTrine(a, b)) return 'excellent'; // trine partners
  if (isOpposite(a, b)) return 'challenging'; // direct conflict
  return 'good'; // different trine, not opposite — workable
}

export function getAnimalCompatibilityScore(
  a: ChineseAnimal,
  b: ChineseAnimal
): number {
  const tier = getAnimalCompatibilityTier(a, b);
  return { excellent: 10, good: 7, neutral: 5, challenging: 3 }[tier];
}

export function describeAnimalCompatibility(
  a: ChineseAnimal,
  b: ChineseAnimal
): string {
  if (a === b) {
    return `Two ${a}s share the same instincts, values and energy rhythm. The resonance is immediate and natural — though mirroring can amplify both the strengths and the shadows.`;
  }

  if (sameTrine(a, b)) {
    const trineIdx = getTrine(a);
    const trineDescriptions = [
      'You both belong to the First Trine — ambitious, passionate and action-oriented. Your energies fuel one another naturally.',
      'You both belong to the Second Trine — determined, wise and enduring. You share a deep respect for each other\'s persistence and depth.',
      'You both belong to the Third Trine — courageous, idealistic and fiercely independent. You understand each other\'s drive for freedom and meaning.',
      'You both belong to the Fourth Trine — calm, creative and deeply empathetic. Your shared sensitivity creates a gentle, nurturing dynamic.',
    ];
    return trineDescriptions[trineIdx] ?? `${a} and ${b} are trine partners — naturally compatible and mutually supportive.`;
  }

  if (isOpposite(a, b)) {
    return `${a} and ${b} sit directly opposite one another on the Chinese zodiac wheel. This creates a natural tension — you can fascinate and frustrate one another in equal measure. Growth is possible but requires conscious effort and mutual respect.`;
  }

  return `${a} and ${b} come from different trines but are not in direct conflict. The relationship is workable and can be enriching — the differences become strengths when both partners appreciate what the other brings.`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Element compatibility
// ─────────────────────────────────────────────────────────────────────────────

export function getElementCompatibilityTier(
  a: ChineseElement,
  b: ChineseElement
): CompatibilityTier {
  if (a === b) return 'excellent';

  const isProductive = PRODUCTIVE_PAIRS.some(
    ([e1, e2]) => (a === e1 && b === e2) || (a === e2 && b === e1)
  );
  if (isProductive) return 'good';

  const isControlling = CONTROLLING_PAIRS.some(
    ([e1, e2]) => (a === e1 && b === e2) || (a === e2 && b === e1)
  );
  if (isControlling) return 'neutral';

  return 'good'; // remaining combinations
}

export function getElementCompatibilityScore(
  a: ChineseElement,
  b: ChineseElement
): number {
  const tier = getElementCompatibilityTier(a, b);
  return { excellent: 10, good: 7, neutral: 5, challenging: 3 }[tier];
}

export function describeElementCompatibility(
  a: ChineseElement,
  b: ChineseElement
): string {
  if (a === b) {
    return `You share the ${a} element — a strong natural resonance that creates a common base tone. The energy between you feels familiar and understood.`;
  }

  const isProductive = PRODUCTIVE_PAIRS.some(
    ([e1, e2]) => (a === e1 && b === e2) || (a === e2 && b === e1)
  );
  if (isProductive) {
    return `${a} and ${b} form a productive element combination — one feeds and supports the other in a flowing, generative dynamic.`;
  }

  const isControlling = CONTROLLING_PAIRS.some(
    ([e1, e2]) => (a === e1 && b === e2) || (a === e2 && b === e1)
  );
  if (isControlling) {
    return `${a} and ${b} create a controlling element dynamic — one element naturally checks and challenges the other. This can bring structure or friction depending on awareness.`;
  }

  return `${a} and ${b} have a neutral element relationship — compatibility is shaped more by personality and values than by elemental energy.`;
}

// ─────────────────────────────────────────────────────────────────────────────
// Building / address compatibility
// Compares a person's birth year animal with a building's construction year animal
// ─────────────────────────────────────────────────────────────────────────────

export function getAddressAnimalCompatibility(
  personAnimal: ChineseAnimal,
  buildingAnimal: ChineseAnimal
): {
  tier: CompatibilityTier;
  score: number;
  description: string;
} {
  const tier = getAnimalCompatibilityTier(personAnimal, buildingAnimal);
  const score = getAnimalCompatibilityScore(personAnimal, buildingAnimal);

  let description = '';

  if (tier === 'excellent') {
    if (personAnimal === buildingAnimal) {
      description = `This building was constructed in a ${buildingAnimal} year — the same as your birth sign. The space carries an energy that mirrors your own nature. It will feel instinctively right.`;
    } else {
      description = `This building was constructed in a ${buildingAnimal} year, which is in the same trine as your ${personAnimal} energy. The space supports your natural direction and feels aligned with who you are.`;
    }
  } else if (tier === 'good') {
    description = `This building was constructed in a ${buildingAnimal} year. The energy is broadly compatible with your ${personAnimal} nature — not a perfect mirror, but supportive and workable.`;
  } else if (tier === 'neutral') {
    description = `This building was constructed in a ${buildingAnimal} year. The energy is neutral relative to your ${personAnimal} nature — neither amplifying nor resisting. Your own intentions will shape the space.`;
  } else {
    description = `This building was constructed in a ${buildingAnimal} year, which is in direct opposition to your ${personAnimal} energy. ${personAnimal} and ${buildingAnimal} are natural opposites on the zodiac wheel. This doesn't make the space impossible, but it's worth acknowledging the energetic friction — especially for a long-term home or office.`;
  }

  return { tier, score, description };
}

// ─────────────────────────────────────────────────────────────────────────────
// Year → Animal lookup
// ─────────────────────────────────────────────────────────────────────────────

const ANIMAL_CYCLE: ChineseAnimal[] = [
  'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig',
];

// Reference: 2020 = Rat
export function yearToAnimal(year: number): ChineseAnimal {
  const index = ((year - 2020) % 12 + 12) % 12;
  return ANIMAL_CYCLE[index];
}

// ─────────────────────────────────────────────────────────────────────────────
// Trine info (for display)
// ─────────────────────────────────────────────────────────────────────────────

export const TRINE_INFO: Record<number, { name: string; theme: string; animals: ChineseAnimal[] }> = {
  0: { name: 'First Trine', theme: 'Action & Ambition', animals: ['Rat', 'Dragon', 'Monkey'] },
  1: { name: 'Second Trine', theme: 'Wisdom & Endurance', animals: ['Ox', 'Snake', 'Rooster'] },
  2: { name: 'Third Trine', theme: 'Courage & Independence', animals: ['Tiger', 'Horse', 'Dog'] },
  3: { name: 'Fourth Trine', theme: 'Creativity & Empathy', animals: ['Rabbit', 'Goat', 'Pig'] },
};

export function getTrineInfo(animal: ChineseAnimal) {
  const idx = getTrine(animal);
  return TRINE_INFO[idx] ?? null;
}