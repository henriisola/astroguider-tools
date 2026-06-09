import { LetterEnergy } from '@/src/types/LetterEnergy';

export function getLetterologyInsight(entries: LetterEnergy[]): string {
  const vowels = entries.filter(e => e.type === 'vowel');
  const consonants = entries.filter(e => e.type === 'consonant');

  const themes: string[] = [];

  if (vowels.length > consonants.length) {
    themes.push('Your emotional and intuitive side plays a dominant role in your identity.');
  } else if (consonants.length > vowels.length) {
    themes.push('Your outer personality and mental strength are key drivers in your character.');
  } else {
    themes.push('You have a balanced energetic expression between intuition and structure.');
  }

  const firstLetter = entries[0];
  if (firstLetter) {
    themes.push(`The first letter "${firstLetter.letter}" sets the tone as ${firstLetter.meaning.toLowerCase()}.`);
  }

  const spiritualLetters = entries.filter(e => e.meaning.toLowerCase().includes('spirit'));
  if (spiritualLetters.length > 0) {
    themes.push('You carry spiritual sensitivity encoded in your name.');
  }

  const leadershipLetters = entries.filter(e => e.meaning.toLowerCase().includes('leadership'));
  if (leadershipLetters.length >= 2) {
    themes.push('Leadership is a recurring theme in your energetic profile.');
  }

  return themes.join(' ');
}
