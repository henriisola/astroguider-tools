import {
  getAnimalCompatibilityScore,
  getElementCompatibilityScore,
  describeAnimalCompatibility,
  describeElementCompatibility,
  type ChineseAnimal,
  type ChineseElement,
} from '@/lib/chineseCompatibilityEngine';

import {
  getHarmonyScore,
  describeLifePathHarmony,
  describeSoulUrgeHarmony,
} from '@/lib/numerologyHarmonyEngine';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

export interface ChineseProfile {
  animal: ChineseAnimal;
  element: ChineseElement;
}

export interface PinnaclesProfile {
  pinnacles: number[];
  challenges: number[];
}

export interface LoveProfile {
  name: string;
  birthDate: string;
  lifePath: number;
  soulUrge: number;
  expression: {
    pythagorean: {
      rawSum: number;
      final: number;
    };
  };
  chinese: ChineseProfile;
  pinnacles?: PinnaclesProfile | null;
  karmicDebtNumbers?: number[];
}

export interface RelationshipNumberInfo {
  raw: number;
  reduced: number;
  isKarmic: boolean;
}

export interface KarmicFlags {
  karmicDebtDetected: boolean;
  mirrorPattern: boolean;
}

export interface ChineseMatchInfo {
  animalCompatibility: string;
  elementCompatibility: string;
}

export interface LoveCompatibilityResult {
  chemistryScore: number;
  stabilityScore: number;
  karmaScore: number;
  lifePathMatch: string;
  relationshipNumber: RelationshipNumberInfo;
  karmicFlags: KarmicFlags;
  chineseMatch: ChineseMatchInfo;
  outlook: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

const KARMIC_DEBT_NUMBERS = new Set([13, 14, 16, 19]);

const clampScore = (value: number, min = 0, max = 10): number =>
  Math.max(min, Math.min(max, Math.round(value)));

const reduceWithMasters = (num: number): number => {
  const masterSet = new Set([11, 22, 33]);
  while (num > 9 && !masterSet.has(num)) {
    num = num.toString().split('').reduce((acc, d) => acc + Number(d), 0);
  }
  return num;
};

const hasKarmicDebt = (profile: LoveProfile): boolean => {
  if (!profile.birthDate) return false;
  const birth = new Date(profile.birthDate);
  const day = birth.getUTCDate();
  if (KARMIC_DEBT_NUMBERS.has(day)) return true;
  if (profile.pinnacles?.pinnacles?.some(p => KARMIC_DEBT_NUMBERS.has(p))) return true;
  if (profile.karmicDebtNumbers?.some(n => KARMIC_DEBT_NUMBERS.has(n))) return true;
  return false;
};

const computeRelationshipNumber = (
  lifePathA: number,
  lifePathB: number,
): RelationshipNumberInfo => {
  const raw = lifePathA + lifePathB;
  const reduced = reduceWithMasters(raw);
  const isKarmic = KARMIC_DEBT_NUMBERS.has(raw);
  return { raw, reduced, isKarmic };
};

const computeMirrorPattern = (a: LoveProfile, b: LoveProfile): boolean => {
  const sameLifePath = reduceWithMasters(a.lifePath) === reduceWithMasters(b.lifePath);
  if (!sameLifePath) return false;
  return hasKarmicDebt(a) || hasKarmicDebt(b);
};

// ─────────────────────────────────────────────────────────────────────────────
// Pinnacle resonance — updated to trine logic
// ─────────────────────────────────────────────────────────────────────────────

const ratePinnacleResonance = (
  a?: PinnaclesProfile | null,
  b?: PinnaclesProfile | null,
): number => {
  if (!a?.pinnacles || !b?.pinnacles) return 5;
  const firstA = a.pinnacles[0];
  const firstB = b.pinnacles[0];
  if (firstA === undefined || firstB === undefined) return 5;
  return getHarmonyScore(firstA, firstB);
};

// ─────────────────────────────────────────────────────────────────────────────
// Outlook builder
// ─────────────────────────────────────────────────────────────────────────────

const buildOutlook = (
  chemistryScore: number,
  stabilityScore: number,
  karmaScore: number,
  lifePathMatch: string,
  chineseAnimalText: string,
): string => {
  const parts: string[] = [];

  if (chemistryScore >= 8) {
    parts.push('There is a strong mutual attraction between you and the emotional chemistry flows quite naturally.');
  } else if (chemistryScore >= 5) {
    parts.push('Your chemistry builds over time – it is more about deep understanding than constant fireworks.');
  } else {
    parts.push('The sense of chemistry may feel uneven at times, but clear awareness of each other\'s needs helps balance the connection.');
  }

  if (stabilityScore >= 8) {
    parts.push('The structural foundation looks stable: your life paths and timing cycles support a long-term partnership.');
  } else if (stabilityScore >= 5) {
    parts.push('Over the long run, this relationship asks for shared planning and clarity of values, but it holds real potential.');
  } else {
    parts.push('Long-term stability may require especially clear agreements about roles, boundaries, and shared goals.');
  }

  if (karmaScore >= 7) {
    parts.push('This connection has a strong karmic learning note – you activate themes in each other that the soul wants to work on in this lifetime.');
  } else if (karmaScore >= 4) {
    parts.push('There are karmic tones present, but they function more as subtle reminders than as a heavy burden.');
  } else {
    parts.push('There is only a light karmic charge – the dynamic is more about conscious choice and shared growth than old debts.');
  }

  parts.push(`From the perspective of your life paths: ${lifePathMatch}`);
  parts.push(chineseAnimalText);

  return parts.join(' ');
};

// ─────────────────────────────────────────────────────────────────────────────
// Main comparison function
// ─────────────────────────────────────────────────────────────────────────────

export function compareProfiles(
  profileA: LoveProfile,
  profileB: LoveProfile,
): LoveCompatibilityResult {

  // Karmic
  const relationshipNumber = computeRelationshipNumber(profileA.lifePath, profileB.lifePath);
  const karmicDebtA = hasKarmicDebt(profileA);
  const karmicDebtB = hasKarmicDebt(profileB);
  const mirrorPattern = computeMirrorPattern(profileA, profileB);

  // Life path — trine-based
  const lifePathScore = getHarmonyScore(profileA.lifePath, profileB.lifePath);
  const lifePathMatch = describeLifePathHarmony(profileA.lifePath, profileB.lifePath, 'person');

  // Soul urge — trine-based
  const soulUrgeScore = getHarmonyScore(profileA.soulUrge, profileB.soulUrge);

  // Expression — Pythagorean only, trine-based
  const expressionScore = getHarmonyScore(
    profileA.expression.pythagorean.final,
    profileB.expression.pythagorean.final,
  );

  // Chinese — element via new engine
  const elementScore = getElementCompatibilityScore(
    profileA.chinese.element,
    profileB.chinese.element,
  );

  // Chemistry: soul urge + expression + element
  const chemistryScore = clampScore(
    soulUrgeScore * 0.45 + expressionScore * 0.35 + elementScore * 0.2,
  );

  // Animal — trine-based
  const animalScore = getAnimalCompatibilityScore(
    profileA.chinese.animal,
    profileB.chinese.animal,
  );

  // Pinnacle — trine-based
  const pinnacleScore = ratePinnacleResonance(
    profileA.pinnacles ?? null,
    profileB.pinnacles ?? null,
  );

  // Stability: life path + animal + pinnacle
  const stabilityScore = clampScore(
    lifePathScore * 0.4 + animalScore * 0.35 + pinnacleScore * 0.25,
  );

  // Karma
  let karmaScoreBase = 0;
  if (karmicDebtA || karmicDebtB) karmaScoreBase += 4;
  if (relationshipNumber.isKarmic) karmaScoreBase += 3;
  if (mirrorPattern) karmaScoreBase += 3;
  const karmaScore = clampScore(karmaScoreBase);

  // Chinese descriptions
  const chineseAnimalText = describeAnimalCompatibility(
    profileA.chinese.animal,
    profileB.chinese.animal,
  );

  const outlook = buildOutlook(
    chemistryScore,
    stabilityScore,
    karmaScore,
    lifePathMatch,
    chineseAnimalText,
  );

  return {
    chemistryScore,
    stabilityScore,
    karmaScore,
    lifePathMatch,
    relationshipNumber,
    karmicFlags: {
      karmicDebtDetected: karmicDebtA || karmicDebtB,
      mirrorPattern,
    },
    chineseMatch: {
      animalCompatibility: chineseAnimalText,
      elementCompatibility: describeElementCompatibility(
        profileA.chinese.element,
        profileB.chinese.element,
      ),
    },
    outlook,
  };
}