// ─────────────────────────────────────────────────────────────────────────────
// Birthday Number — Three-Layer Interpretation
//
// Numerologists read compound birthday numbers in layers:
//   First digit  → what you have already mastered (innate gift)
//   Second digit → a secondary talent or lens
//   Reduced      → what you came here to develop and grow into
//
// Single-digit birthdays have only one layer (the number itself).
// ─────────────────────────────────────────────────────────────────────────────

export interface BirthdayLayers {
    raw: number;          // e.g. 17
    reduced: number;      // e.g. 8
    isSingle: boolean;
    layer1?: { digit: number; title: string; desc: string };   // first digit
    layer2?: { digit: number; title: string; desc: string };   // second digit
    layerFinal: { digit: number; title: string; desc: string }; // reduced / lesson
  }
  
  const DIGIT_TITLES: Record<number, string> = {
    1: 'Pioneer',
    2: 'Diplomat',
    3: 'Creative Communicator',
    4: 'Builder',
    5: 'Freedom Seeker',
    6: 'Harmoniser',
    7: 'Seeker of Truth',
    8: 'Power-Manifestor',
    9: 'Humanitarian',
  };
  
  const DIGIT_GIFT: Record<number, string> = {
    1: 'You arrived with natural confidence and a drive to initiate. Leadership comes easily — you don\'t wait for permission.',
    2: 'You arrived with heightened sensitivity and the gift of attunement. You read rooms and people with quiet precision.',
    3: 'You arrived with expressive instincts and creative energy already switched on. Communication flows naturally.',
    4: 'You arrived with a builder\'s eye — you instinctively see what needs organising and how to make things last.',
    5: 'You arrived with restless curiosity and a hunger for experience. Adaptability is already wired in.',
    6: 'You arrived with a nurturing instinct and a sense of responsibility toward others. Care comes naturally.',
    7: 'You arrived with deep introspection and a questioning mind already active. You seek meaning before comfort.',
    8: 'You arrived with an innate sense of how power and resources work. Ambition and authority feel familiar.',
    9: 'You arrived with empathy and a wide emotional range already present. You feel the world at a collective level.',
  };
  
  const DIGIT_LESSON: Record<number, string> = {
    1: 'Your deepest lesson is sovereign independence — to build an identity that is entirely your own, without needing external validation to stand in your authority.',
    2: 'Your deepest lesson is the art of true partnership — learning to give and receive equally, and to hold your ground while remaining open to others.',
    3: 'Your deepest lesson is disciplined expression — to take your natural creativity and bring it to completion rather than scattering it across unfinished beginnings.',
    4: 'Your deepest lesson is grounded mastery — to build systems and structures that serve real life, without letting order become rigidity or control.',
    5: 'Your deepest lesson is conscious freedom — to embrace change and experience without losing yourself to impulse, excess, or perpetual motion.',
    6: 'Your deepest lesson is love with boundaries — to serve and nurture from genuine abundance rather than obligation, and to receive as gracefully as you give.',
    7: 'Your deepest lesson is trust in the unseen — to develop faith in your inner knowing and share your insights with the world rather than retreating into isolation.',
    8: 'Your deepest lesson is integrity in power — to master the material world without being mastered by it, and to use authority in ways that uplift rather than dominate.',
    9: 'Your deepest lesson is the art of release — to serve humanity without losing yourself, and to complete cycles fully before moving on.',
  };
  
  const COMPOUND_CONTEXT: Record<number, string> = {
    10: 'The 1 and 0 together carry the full circle — you begin new cycles with the potential of everything and nothing at once. The 0 amplifies whatever the 1 initiates.',
    11: 'Two 1s side by side double the initiating force and create the Master Intuition vibration — a rare sensitivity to the unseen world.',
    12: 'The 1 leads and the 2 refines — you move forward with confidence but with an instinct for harmony and relatedness woven in.',
    13: 'The 1 and 3 together carry a karmic charge — great creative force, but the path demands consistent effort. Nothing comes without earning it.',
    14: 'The 1 and 4 combine pioneering spirit with the need for structure — karmic lessons around freedom used responsibly.',
    15: 'The 1 and 5 create magnetic, multi-talented energy — a natural draw toward art, influence, and the pleasure of living fully.',
    16: 'The 1 and 6 together carry a karmic weight — lessons in pride, love, and the willingness to rebuild after collapse.',
    17: 'The 1 and 7 bring together worldly ambition and inner wisdom — a combination that carries deep karmic purpose and spiritual responsibility.',
    18: 'The 1 and 8 amplify ambition and force — enormous potential for impact, balanced by lessons around compassion and the right use of power.',
    19: 'The 1 and 9 carry the full arc from beginning to completion — this is a karmic number that demands earned independence rather than assumed authority.',
    20: 'The 2 and 0 create a gentle, receptive vibration amplified by the infinite potential of 0 — deeply intuitive and spiritually attuned.',
    21: 'The 2 and 1 bring cooperation and leadership together — you understand people and can also guide them.',
    22: 'Two 2s form the Master Builder vibration — an extraordinary capacity to translate vision into lasting material reality.',
    23: 'The 2 and 3 weave social sensitivity with expressive charm — naturally magnetic and communicative.',
    24: 'The 2 and 4 ground emotional intelligence into practical responsibility — loyal, caring, and dependable.',
    25: 'The 2 and 5 balance attunement with curiosity — you absorb experience and turn it into wisdom.',
    26: 'The 2 and 6 together carry responsibility in relationships and business — a cautionary vibration that rewards careful partnership choices.',
    27: 'The 2 and 7 combine emotional intelligence with deep spiritual perception — a rare blend of heart and mind.',
    28: 'The 2 and 8 bring partnership and power into potential tension — great leadership capacity balanced by lessons in humility.',
    29: 'The 2 and 9 carry a deeply empathic and spiritually complex energy — lessons in emotional strength and trust in higher guidance.',
    30: 'The 3 and 0 amplify pure expressive potential — creativity at its most concentrated, shaped entirely by intention.',
    31: 'The 3 and 1 combine creativity with pioneering drive — you create with vision and follow through with independence.',
  };
  
  function reduceToSingle(n: number): number {
    if (n === 11 || n === 22 || n === 33) return n;
    while (n > 9) {
      n = String(n).split('').reduce((a, d) => a + Number(d), 0);
      if (n === 11 || n === 22 || n === 33) return n;
    }
    return n;
  }
  
  export function getBirthdayLayers(birthday: number): BirthdayLayers {
    const reduced = reduceToSingle(birthday);
  
    // Single digit
    if (birthday <= 9) {
      return {
        raw: birthday,
        reduced,
        isSingle: true,
        layerFinal: {
          digit: birthday,
          title: DIGIT_TITLES[birthday] ?? '',
          desc: DIGIT_GIFT[birthday] ?? '',
        },
      };
    }
  
    // Compound
    const digits = String(birthday).split('').map(Number);
    const d1 = digits[0];
    const d2 = digits[1];
    const context = COMPOUND_CONTEXT[birthday] ?? '';
  
    return {
      raw: birthday,
      reduced,
      isSingle: false,
      layer1: {
        digit: d1,
        title: `${DIGIT_TITLES[d1] ?? d1} — already yours`,
        desc: (DIGIT_GIFT[d1] ?? '') + (context ? `\n\n${context}` : ''),
      },
      layer2: d2 > 0 ? {
        digit: d2,
        title: `${DIGIT_TITLES[d2] ?? d2} — secondary gift`,
        desc: DIGIT_GIFT[d2] ?? '',
      } : undefined,
      layerFinal: {
        digit: reduced,
        title: `${DIGIT_TITLES[reduced] ?? reduced} — your life lesson`,
        desc: DIGIT_LESSON[reduced] ?? '',
      },
    };
  }