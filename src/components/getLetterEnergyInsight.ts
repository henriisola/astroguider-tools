const vowels = ['A', 'E', 'I', 'O', 'U'];

const letterMeanings: Record<string, string> = {
  A: 'Leadership and boldness',
  B: 'Support and structure',
  C: 'Creativity and charm',
  D: 'Stability and pragmatism',
  E: 'Expressiveness and freedom',
  F: 'Responsibility and service',
  G: 'Mysticism and analysis',
  H: 'Power and ambition',
  I: 'Idealism and intuition',
  J: 'Justice and charisma',
  K: 'Mastery and discipline',
  L: 'Harmony and aesthetics',
  M: 'Work ethic and material mastery',
  N: 'Adaptability and intellect',
  O: 'Emotional depth and vision',
  P: 'Intellect and persuasion',
  Q: 'Occult insight and uniqueness',
  R: 'Realism and strength',
  S: 'Sensitivity and spirit',
  T: 'Discipline and leadership',
  U: 'Change and receptivity',
  V: 'Courage and manifestation',
  W: 'Wisdom and mystery',
  X: 'Transformation and karma',
  Y: 'Duality and insight',
  Z: 'Power and finality'
};

export interface LetterEnergy {
  letter: string;
  position: number;
  type: 'vowel' | 'consonant';
  meaning: string;
  word: string;
}

export function getLetterEnergyInsight(phrase: string): LetterEnergy[] {
  return phrase.trim().split(/\s+/).flatMap((word) =>
    word.toUpperCase().split('').map((char, idx) => ({
      letter: char,
      position: idx + 1,
      type: vowels.includes(char) ? 'vowel' : 'consonant',
      meaning: letterMeanings[char] || 'Unmapped',
      word
    }))
  );
}
