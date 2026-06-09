const animals = [
  'Rat', 'Ox', 'Tiger', 'Rabbit', 'Dragon', 'Snake',
  'Horse', 'Goat', 'Monkey', 'Rooster', 'Dog', 'Pig'
] as const;

type Animal = typeof animals[number];

  const chineseCharacters = {
    Rat: '鼠',
    Ox: '牛',
    Tiger: '虎',
    Rabbit: '兔',
    Dragon: '龙',
    Snake: '蛇',
    Horse: '马',
    Goat: '羊',
    Monkey: '猴',
    Rooster: '鸡',
    Dog: '狗',
    Pig: '猪'
  };
  
  const emojis = {
    Rat: '🐀',
    Ox: '🐂',
    Tiger: '🐅',
    Rabbit: '🐇',
    Dragon: '🐉',
    Snake: '🐍',
    Horse: '🐎',
    Goat: '🐐',
    Monkey: '🐒',
    Rooster: '🐓',
    Dog: '🐕',
    Pig: '🐖'
  };
  
  const elements = ['Wood', 'Fire', 'Earth', 'Metal', 'Water'];
  const yinYang = ['Yang', 'Yin'];
  
  const animalDescriptions: Record<string, string> = {
    Rat: "Clever, charming, and resourceful.",
    Ox: "Dependable, patient, and methodical.",
    Tiger: "Brave, competitive, and confident.",
    Rabbit: "Gentle, elegant, and kind.",
    Dragon: "Ambitious, intelligent, and passionate.",
    Snake: "Wise, mysterious, and intuitive.",
    Horse: "Energetic, independent, and spirited.",
    Goat: "Calm, creative, and compassionate.",
    Monkey: "Witty, curious, and playful.",
    Rooster: "Hardworking, observant, and honest.",
    Dog: "Loyal, sincere, and responsible.",
    Pig: "Generous, warm-hearted, and good-natured.",
  };
  
  export function getChineseZodiac(year: number) {
    const animalIndex = (year - 4) % 12;
    const elementIndex = Math.floor(((year - 4) % 10) / 2);
    const yinYangType = yinYang[(year - 4) % 2];
  
    const animal: Animal = animals[animalIndex];
    const element = elements[elementIndex];
    const chineseChar = chineseCharacters[animal];
    const emoji = emojis[animal];
  
    return {
      animal,
      element,
      yinYang: yinYangType,
      emoji,
      chineseChar,
      full: `${yinYangType} ${element} ${animal}`,
      label: `${yinYangType} ${element} ${animal} (${chineseChar}) ${emoji}`,
      description: animalDescriptions[animal],
    };
  }