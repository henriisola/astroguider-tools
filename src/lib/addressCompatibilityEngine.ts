import { calculateFullNumerologyProfile } from '@/lib/numerology';
import {
  getHarmony,
  type HarmonyLevel,
  HARMONY_COLORS,
  HARMONY_LABELS,
  HARMONY_SCORE,
} from '@/lib/numerologyHarmonyEngine';
import {
  yearToAnimal,
  getAddressAnimalCompatibility,
  getTrineInfo,
  type ChineseAnimal,
  type CompatibilityTier,
} from '@/lib/chineseCompatibilityEngine';
import { getNervousSystemNote } from '@/lib/addressNervousSystem';

// ─── Types ────────────────────────────────────────────────────

export type AddressInputs = {
  streetNumber: string;
  streetName: string;
  city: string;
  propertyType: string;
  buildingYear?: string;
  personA: { name: string; birthDate: string };
  personB?: { name: string; birthDate: string };
  twoPersonMode: boolean;
};

export type ChineseBuildingResult = {
  buildingAnimal: ChineseAnimal;
  buildingYear: number;
  tier: CompatibilityTier;
  score: number;
  description: string;
  trineInfo: ReturnType<typeof getTrineInfo>;
};

export type PersonAddressScore = {
  lifePath: number;
  soulUrge: number;
  expression: number;
  personalYear: number;
  pinnacle: number;
  lifePathVsHome: HarmonyLevel;
  soulUrgeVsHome: HarmonyLevel;
  personalYearNote: string;
  pinnacleNote: string;
  nervousSystemNote: string;
  score: number;
  strengths: string[];
  watchPoints: string[];
  chinese?: ChineseBuildingResult;
};

export type AddressCompatibilityResult = {
  homeNumber: { raw: number; reduced: number };
  streetPythagorean: { raw: number; reduced: number };
  cityNumber: { raw: number; reduced: number };
  combinedVibration: { raw: number; reduced: number };
  masterNumbers: number[];
  addressCharacter: string;
  addressEnergy: string;
  addressShadow: string;
  personA: PersonAddressScore;
  personB?: PersonAddressScore;
  overallScore: number;
  summary: string;
  propertyTypeNote: string;
  disclaimer: string;
};

// ─── Numerology helpers ───────────────────────────────────────

function reduceToSingle(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  while (n > 9) {
    n = String(n).split('').reduce((a, d) => a + Number(d), 0);
    if (n === 11 || n === 22 || n === 33) return n;
  }
  return n;
}

function digitSumStr(s: string): number {
  return s.replace(/[^0-9]/g, '').split('').reduce((a, d) => a + Number(d), 0);
}

function calcHomeNumberFromStreetNumber(streetNumber: string): { raw: number; reduced: number } {
  const digits = streetNumber.replace(/[^0-9]/g, '');
  const direct = digits ? parseInt(digits, 10) : 0;

  // Preserve master number house numbers like "11" or "11B" (but not e.g. "011").
  if (digits === '11' || digits === '22' || digits === '33') return { raw: direct, reduced: direct };

  const raw = digitSumStr(streetNumber);
  return { raw, reduced: reduceToSingle(raw) };
}

function calcLifePath(dateStr: string): number {
  const d = new Date(dateStr);
  const raw = String(d.getFullYear()).split('').reduce((a, c) => a + Number(c), 0)
    + (d.getMonth() + 1) + d.getDate();
  return reduceToSingle(raw);
}

function calcPersonalYear(birthDateStr: string, targetDateStr: string): number {
  const b = new Date(birthDateStr);
  const t = new Date(targetDateStr);
  const birthdayThisYear = new Date(t.getFullYear(), b.getMonth(), b.getDate());
  const activeYear = t >= birthdayThisYear ? t.getFullYear() : t.getFullYear() - 1;
  const raw = digitSumStr(`${b.getMonth() + 1}${b.getDate()}${activeYear}`);
  return reduceToSingle(raw);
}

function calcPinnacle(birthDateStr: string): number {
  const b = new Date(birthDateStr);
  const lp = calcLifePath(birthDateStr);
  const age = new Date().getFullYear() - b.getFullYear();
  const firstCycle = 36 - lp;
  const p1 = reduceToSingle(digitSumStr(`${b.getMonth() + 1}${b.getDate()}`));
  const p2 = reduceToSingle(digitSumStr(`${b.getDate()}${b.getFullYear()}`));
  const p3 = reduceToSingle(p1 + p2);
  const p4 = reduceToSingle(digitSumStr(`${b.getMonth() + 1}${b.getFullYear()}`));
  if (age < firstCycle) return p1;
  if (age < firstCycle + 9) return p2;
  if (age < firstCycle + 18) return p3;
  return p4;
}

const PYTHAGOREAN: Record<string, number> = {
  A:1,J:1,S:1, B:2,K:2,T:2, C:3,L:3,U:3, D:4,M:4,V:4,
  E:5,N:5,W:5, F:6,O:6,X:6, G:7,P:7,Y:7, H:8,Q:8,Z:8, I:9,R:9,
};
const VOWELS = new Set(['A','E','I','O','U']);

function calcPythagorean(name: string) {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '');
  const raw = clean.split('').reduce((a, c) => a + (PYTHAGOREAN[c] ?? 0), 0);
  return { raw, reduced: reduceToSingle(raw) };
}

function calcSoulUrge(name: string): number {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '');
  const raw = clean.split('').filter(c => VOWELS.has(c))
    .reduce((a, c) => a + (PYTHAGOREAN[c] ?? 0), 0);
  return reduceToSingle(raw);
}

// ─── Chinese building ─────────────────────────────────────────

function calcChineseBuildingCompatibility(birthDate: string, buildingYear: number): ChineseBuildingResult {
  const b = new Date(birthDate);
  const personAnimal = yearToAnimal(b.getFullYear());
  const buildingAnimal = yearToAnimal(buildingYear);
  const { tier, score, description } = getAddressAnimalCompatibility(personAnimal, buildingAnimal);
  const trineInfo = getTrineInfo(personAnimal);
  return { buildingAnimal, buildingYear, tier, score, description, trineInfo };
}

// ─── Address energy ───────────────────────────────────────────

export const ADDRESS_ENERGY: Record<number, { character: string; energy: string; shadow: string }> = {
  1: {
    character: 'The Independent Home',
    energy: 'A space that fosters ambition, self-reliance and new beginnings. Best for individuals, entrepreneurs and those starting a new chapter.',
    shadow: 'Can amplify loneliness and ego — partnerships and family life may feel strained. The energy favours the individual over the couple. Conflict can arise when two strong personalities share this space.',
  },
  2: {
    character: 'The Harmonious Home',
    energy: 'A nurturing, peaceful environment that supports relationships, cooperation and emotional healing. Ideal for couples and families.',
    shadow: 'Oversensitivity and emotional dependency can build quietly here. Decision-making becomes harder; occupants may avoid necessary confrontations. Can attract passive-aggressive dynamics over time.',
  },
  3: {
    character: 'The Creative Home',
    energy: 'A vibrant, sociable space filled with creative energy. Great for artists, communicators and those who love to entertain.',
    shadow: 'The 3 is associated with scattered energy, overspending and social excess. In relationships, this energy can invite third-party interference and infidelity. Boundaries dissolve easily — not ideal for those seeking stability or commitment.',
  },
  4: {
    character: 'The Foundation Home',
    energy: 'A stable, grounded space built for long-term security. Supports hard work, discipline and building something lasting.',
    shadow: 'Can feel oppressive or limiting over time. The energy amplifies routine to the point of rigidity, and occupants may experience depression, stagnation or a sense of being trapped. Joy and spontaneity require conscious effort here.',
  },
  5: {
    character: 'The Dynamic Home',
    energy: 'A lively, ever-changing space that attracts adventure and freedom. Best for those who embrace change and value flexibility.',
    shadow: 'Restlessness, instability and addictive tendencies are common in 5 homes. Long-term commitments are difficult to maintain. Occupants often move on sooner than expected — this is rarely a permanent home.',
  },
  6: {
    character: 'The Family Home',
    energy: 'A warm, nurturing space deeply connected to family, love and responsibility. One of the best home numbers for raising a family.',
    shadow: 'Perfectionism and over-responsibility can become suffocating. One person often carries the emotional weight of the household. Control dynamics dressed as care are common, leading to resentment beneath the surface.',
  },
  7: {
    character: 'The Sanctuary',
    energy: 'A quiet, introspective space that supports deep thinking, spiritual growth and inner work. Perfect for those who need solitude and depth.',
    shadow: 'The 7 is one of the most challenging home numbers. It is associated with isolation, illness, accidents and financial stagnation. Many numerologists advise particular caution during personal 7 years — losses and unexpected events tend to concentrate here. Not recommended for those seeking material growth or active social life.',
  },
  8: {
    character: 'The Prosperity Home',
    energy: 'A powerful space associated with material success, ambition and financial flow. Supports business-minded individuals and couples building wealth.',
    shadow: 'Power struggles and control conflicts are amplified in 8 homes. Financial pressure — both feast and famine — is common. The energy demands integrity; those who cut corners here often face significant material consequences.',
  },
  9: {
    character: 'The Compassionate Home',
    energy: 'A generous, open space that attracts many people and serves a higher purpose. Ideal for those with a humanitarian or service-oriented calling.',
    shadow: 'The 9 is the number of endings — most numerologists do not recommend it as a long-term family home. Relationships, life phases and careers tend to conclude here rather than begin. Occupants frequently move on, often involuntarily. Financial accumulation is difficult; what comes in tends to flow back out.',
  },
  11: {
    character: 'The Visionary Home',
    energy: 'A Master Number home of heightened spiritual sensitivity and inspiration. Intensely felt — deeply rewarding for those ready for its energy.',
    shadow: 'The 11 amplifies everything — including anxiety, nervous tension and hypersensitivity. Those not spiritually grounded may find this home overwhelming. Rest is difficult; the energy rarely allows true stillness.',
  },
  22: {
    character: "The Builder's Home",
    energy: 'A Master Number home of exceptional potential. Supports the creation of something lasting and significant. Demands focus and intention.',
    shadow: 'The weight of the 22 can feel immense. Procrastination, self-doubt and the paralysis of unrealised potential are common. This home demands that occupants rise to its level — those who cannot may feel chronically inadequate.',
  },
  33: {
    character: "The Healer's Home",
    energy: 'The rarest Master Number home. A space of profound compassion and healing energy. Best for those with a strong spiritual calling.',
    shadow: 'The 33 demands selfless service, which can lead to complete self-neglect. Martyrdom and emotional depletion are real risks. Boundaries must be consciously maintained or this home will give everything away — including the occupants\' own wellbeing.',
  },
};

const PROPERTY_TYPE_NOTES: Record<string, Record<HarmonyLevel, string>> = {
  apartment: {
    excellent: "This apartment's energy is an excellent match. The numerological vibration supports your daily life and personal growth.",
    good: "A good match for apartment living. The energy supports comfort and stability in your day-to-day life.",
    neutral: "A workable energy for an apartment. Neutral vibrations — your own intentions will shape the space more than the numbers.",
    challenging: "Some energetic friction with this apartment. Not prohibitive, but grounding rituals and clear intentions will help.",
  },
  house: {
    excellent: "An excellent match for a home you plan to put down roots in. The energy strongly supports long-term stability and growth.",
    good: "A good home energy that supports family life and lasting comfort.",
    neutral: "A balanced home energy. Suitable but not deeply amplifying — what you bring to the space matters most.",
    challenging: "Some friction with this home's energy. For a long-term purchase, it's worth sitting with this and considering carefully.",
  },
  office: {
    excellent: "A highly auspicious space for business. The energy strongly supports focus, productivity and professional success.",
    good: "A good business space. The energy is broadly supportive of your professional goals.",
    neutral: "A workable office energy. Your own drive and clarity will be more important than the numbers here.",
    challenging: "Some energetic resistance in this office space. Extra attention to structure and boundaries will be needed.",
  },
  holiday: {
    excellent: "A wonderful match for a retreat or holiday property. The energy supports rest, renewal and joy.",
    good: "A good holiday property energy — comfortable and restorative.",
    neutral: "A balanced energy for a secondary property. Pleasant without being strongly amplifying.",
    challenging: "Some friction with this holiday property's energy. Fine for short visits, but worth noting for a long-term investment.",
  },
};

function getPersonalYearNote(py: number, propertyType: string): string {
  const ctx = propertyType === 'office' ? 'move to this space' : 'move here';
  if (py === 1)  return `Personal Year 1 — a year of new beginnings. One of the most auspicious times to ${ctx} and start fresh.`;
  if (py === 2)  return `Personal Year 2 is about patience and relationships. A gentle time to ${ctx} — focus on creating harmony in the space.`;
  if (py === 3)  return `Personal Year 3 brings creativity and expansion. A positive time to ${ctx} and infuse the space with your vision.`;
  if (py === 4)  return `Personal Year 4 is about building foundations. An excellent time to invest in a long-term property.`;
  if (py === 5)  return `Personal Year 5 brings change. Good for a move, but ensure you are choosing from clarity rather than restlessness.`;
  if (py === 6)  return `Personal Year 6 is deeply connected to home and family. One of the most natural years to ${ctx}.`;
  if (py === 7)  return `Personal Year 7 is inward-focused. A good time to choose a quieter, more reflective space.`;
  if (py === 8)  return `Personal Year 8 is a year of material focus and ambition. A strong time for property decisions with long-term financial intent.`;
  if (py === 9)  return `Personal Year 9 is a year of completion and release. Better to finalise decisions early, as new cycles begin next year.`;
  if (py === 11) return `Master Personal Year 11 — heightened intuition. Trust your gut feeling about this space above all else.`;
  if (py === 22) return `Master Personal Year 22 — a year of building something lasting. A significant time for an important property decision.`;
  return `Personal Year ${py} — clarity of purpose will guide you to the right decision.`;
}

function getPinnacleNote(pinnacle: number, homeNum: number): string {
  const h = getHarmony(pinnacle, homeNum);
  if (h === 'excellent') return `Your current Pinnacle cycle (${pinnacle}) resonates strongly with this property's energy (${homeNum}). The space will support your life phase.`;
  if (h === 'good')      return `Your Pinnacle (${pinnacle}) is broadly compatible with this property's energy (${homeNum}). Good timing overall.`;
  if (h === 'neutral')   return `Your Pinnacle (${pinnacle}) and this property's energy (${homeNum}) are neutrally aligned. Other factors will matter more.`;
  return `Some tension between your current Pinnacle (${pinnacle}) and this property's energy (${homeNum}). Worth factoring into your decision.`;
}

function calcPersonScore(
  name: string, birthDate: string, targetDate: string,
  homeReduced: number, propertyType: string, buildingYear?: number,
): PersonAddressScore {
  const profile = calculateFullNumerologyProfile(name);
  const lifePath   = calcLifePath(birthDate);
  const soulUrge   = profile.soulurge ?? calcSoulUrge(name);
  const expression = calcPythagorean(name).reduced;
  const personalYear = calcPersonalYear(birthDate, targetDate);
  const pinnacle     = calcPinnacle(birthDate);
  const lifePathVsHome  = getHarmony(lifePath, homeReduced);
  const soulUrgeVsHome  = getHarmony(soulUrge, homeReduced);
  const chinese = buildingYear ? calcChineseBuildingCompatibility(birthDate, buildingYear) : undefined;
  const numerologyBase  = Math.round(HARMONY_SCORE[lifePathVsHome] * 0.55 + HARMONY_SCORE[soulUrgeVsHome] * 0.45);
  const score = chinese
    ? Math.min(10, Math.round(numerologyBase * 0.75 + chinese.score * 0.25))
    : Math.min(10, numerologyBase);

  const strengths: string[]   = [];
  const watchPoints: string[] = [];

  if (lifePathVsHome === 'excellent' || lifePathVsHome === 'good')
    strengths.push(`Life Path ${lifePath} aligns well with home energy ${homeReduced} — this space supports your core life direction.`);
  else
    watchPoints.push(`Some friction between Life Path ${lifePath} and home energy ${homeReduced} — you may need to work harder to feel at ease here.`);

  if (soulUrgeVsHome === 'excellent' || soulUrgeVsHome === 'good')
    strengths.push(`Soul Urge ${soulUrge} resonates with this home — you will feel emotionally at home here.`);
  else
    watchPoints.push(`Your Soul Urge (${soulUrge}) may not feel fully nourished by this home's energy (${homeReduced}).`);

  if (chinese) {
    if (chinese.tier === 'excellent')
      strengths.push(`Chinese zodiac: the building's ${chinese.buildingAnimal} year energy is in your trine — naturally aligned with your birth sign.`);
    else if (chinese.tier === 'good')
      strengths.push(`Chinese zodiac: the building's ${chinese.buildingAnimal} year energy is broadly compatible with your sign.`);
    else if (chinese.tier === 'challenging')
      watchPoints.push(`Chinese zodiac: the building was constructed in a ${chinese.buildingAnimal} year, which is in direct opposition to your birth sign. Worth acknowledging for a long-term home.`);
  }

  return {
    lifePath, soulUrge, expression, personalYear, pinnacle,
    lifePathVsHome, soulUrgeVsHome,
    personalYearNote:   getPersonalYearNote(personalYear, propertyType),
    pinnacleNote:       getPinnacleNote(pinnacle, homeReduced),
    nervousSystemNote:  getNervousSystemNote(lifePath, homeReduced),
    score, strengths, watchPoints, chinese,
  };
}

// ─── Main export ──────────────────────────────────────────────

export function calculateAddressCompatibility(inputs: AddressInputs): AddressCompatibilityResult {
  const { streetNumber, streetName, city, propertyType, personA, personB, twoPersonMode, buildingYear } = inputs;
  const targetDate     = new Date().toISOString().slice(0, 10);
  const buildingYearNum = buildingYear ? parseInt(buildingYear) : undefined;
  const homeNumber     = calcHomeNumberFromStreetNumber(streetNumber);
  const streetPythagorean = calcPythagorean(streetName);
  const cityNumber        = calcPythagorean(city);
  const combinedRaw       = homeNumber.reduced + streetPythagorean.reduced + cityNumber.reduced;
  const combinedVibration = { raw: combinedRaw, reduced: reduceToSingle(combinedRaw) };

  const masterNumbers: number[] = [];
  [homeNumber.reduced, combinedVibration.reduced, streetPythagorean.reduced].forEach(n => {
    if ([11, 22, 33].includes(n) && !masterNumbers.includes(n)) masterNumbers.push(n);
  });

  const addrInfo = ADDRESS_ENERGY[homeNumber.reduced] ?? ADDRESS_ENERGY[1];
  const scoreA   = calcPersonScore(personA.name, personA.birthDate, targetDate, homeNumber.reduced, propertyType, buildingYearNum);
  const scoreB   = twoPersonMode && personB?.name && personB?.birthDate
    ? calcPersonScore(personB.name, personB.birthDate, targetDate, homeNumber.reduced, propertyType, buildingYearNum)
    : undefined;

  const overallScore   = scoreB ? Math.round((scoreA.score + scoreB.score) / 2) : scoreA.score;
  const harmonyLevel: HarmonyLevel = overallScore >= 8 ? 'excellent' : overallScore >= 6 ? 'good' : overallScore >= 4 ? 'neutral' : 'challenging';
  const ptNotes        = PROPERTY_TYPE_NOTES[propertyType] ?? PROPERTY_TYPE_NOTES.house;

  const summaryMap: Record<string, string> = {
    excellent: `This address resonates strongly with your numerological profile. The combined vibration of the home, street and city creates a supportive environment for your life direction.`,
    good:      `This is a good address match. The energies are broadly supportive and there are no significant areas of conflict.`,
    neutral:   `This address has a balanced energy for you. It won't hold you back, but may not amplify your energy as strongly as a better-matched address would.`,
    challenging: `This address presents some numerological friction. Understanding the dynamics will help you make the most of the space.`,
  };

  return {
    homeNumber, streetPythagorean, cityNumber, combinedVibration, masterNumbers,
    addressCharacter: addrInfo.character,
    addressEnergy:    addrInfo.energy,
    addressShadow:    addrInfo.shadow,
    personA: scoreA, personB: scoreB, overallScore,
    summary:          summaryMap[harmonyLevel],
    propertyTypeNote: ptNotes[harmonyLevel],
    disclaimer: 'This analysis is a numerological perspective — one lens among many. Always combine this with practical research, professional advice and your own judgment when making property decisions.',
  };
}