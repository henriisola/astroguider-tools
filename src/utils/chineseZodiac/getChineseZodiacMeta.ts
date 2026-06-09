// utils/chineseZodiac/getChineseZodiacMeta.ts

const animals = [
    'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
    'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
  ];
  
  const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
  
  const baseYear = 1984;
  
  const signCompatibilities: Record<string, { good: string[]; bad: string[] }> = {
    Rat: { good: ['Ox', 'Dragon'], bad: ['Horse', 'Goat'] },
    Ox: { good: ['Rat', 'Rooster'], bad: ['Sheep', 'Horse'] },
    Tiger: { good: ['Pig', 'Horse'], bad: ['Monkey', 'Snake'] },
    Rabbit: { good: ['Goat', 'Pig'], bad: ['Rooster', 'Dragon'] },
    Dragon: { good: ['Rooster', 'Rat'], bad: ['Dog', 'Rabbit'] },
    Snake: { good: ['Rooster', 'Ox'], bad: ['Pig', 'Tiger'] },
    Horse: { good: ['Tiger', 'Goat'], bad: ['Rat', 'Ox'] },
    Goat: { good: ['Rabbit', 'Horse'], bad: ['Ox', 'Rat'] },
    Monkey: { good: ['Rat', 'Dragon'], bad: ['Tiger', 'Pig'] },
    Rooster: { good: ['Ox', 'Snake'], bad: ['Rabbit', 'Dog'] },
    Dog: { good: ['Tiger', 'Rabbit'], bad: ['Dragon', 'Rooster'] },
    Pig: { good: ['Tiger', 'Rabbit'], bad: ['Snake', 'Monkey'] },
  };
  
  function getAnimal(year: number): string {
    const index = (year - baseYear + 12) % 12;
    return animals[index];
  }
  
  function getElement(year: number): string {
    const index = Math.floor((year - baseYear + 10) % 10 / 2);
    return elements[index];
  }
  
  export function getChineseZodiacMeta(year: number) {
    const animal = getAnimal(year);
    const element = getElement(year);
    const good = signCompatibilities[animal]?.good || [];
    const bad = signCompatibilities[animal]?.bad || [];
  
    return {
      year,
      animal,
      element,
      favorableSigns: good,
      challengingSigns: bad,
    };
  }
  
  export function getUserChineseSign(birthYear: number) {
    const animal = getAnimal(birthYear);
    const element = getElement(birthYear);
    return { birthYear, animal, element };
  }
  
  export function getCompatibility(userAnimal: string, currentAnimal: string): 'good' | 'bad' | 'neutral' {
    const compat = signCompatibilities[currentAnimal];
    if (!compat) return 'neutral';
    if (compat.good.includes(userAnimal)) return 'good';
    if (compat.bad.includes(userAnimal)) return 'bad';
    return 'neutral';
  }
  