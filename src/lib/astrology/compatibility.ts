
  export const CHINESE_ZODIAC_COMPATIBILITY: Record<string, {
    best: string[];
    moderate: string[];
    least: string[];
    love?: string[];
  }> = {
    Rat: {
      best: ['Dragon', 'Monkey'],
      moderate: ['Snake', 'Rooster', 'Ox', 'Pig', 'Rabbit', 'Goat', 'Dog', 'Tiger'],
      least: ['Horse'],
      love: ['Ox', 'Dragon'],
    },
    Ox: {
      best: ['Snake', 'Rooster'],
      moderate: ['Dragon', 'Monkey', 'Rat', 'Dog', 'Tiger', 'Horse', 'Pig', 'Rabbit'],
      least: ['Goat'],
      love: ['Rat', 'Rooster'],
    },
    Tiger: {
      best: ['Dog', 'Horse'],
      moderate: ['Pig', 'Rabbit', 'Goat', 'Snake', 'Rooster', 'Ox', 'Dragon', 'Rat'],
      least: ['Monkey'],
      love: ['Pig', 'Horse'],
    },
    Rabbit: {
      best: ['Pig', 'Goat'],
      moderate: ['Dog', 'Tiger', 'Horse', 'Dragon', 'Monkey', 'Rat', 'Snake', 'Ox'],
      least: ['Rooster'],
      love: ['Goat', 'Dog'],
    },
    Dragon: {
      best: ['Monkey', 'Rat'],
      moderate: ['Snake', 'Rooster', 'Ox', 'Pig', 'Rabbit', 'Goat', 'Tiger', 'Horse'],
      least: ['Dog'],
      love: ['Rooster', 'Rat'],
    },
    Snake: {
      best: ['Rooster', 'Ox'],
      moderate: ['Dragon', 'Monkey', 'Rat', 'Dog', 'Tiger', 'Horse', 'Rabbit', 'Goat'],
      least: ['Pig'],
      love: ['Ox', 'Rooster'],
    },
    Horse: {
      best: ['Dog', 'Tiger'],
      moderate: ['Pig', 'Rabbit', 'Goat', 'Snake', 'Rooster', 'Ox', 'Dragon', 'Monkey'],
      least: ['Rat'],
      love: ['Goat', 'Tiger'],
    },
    Goat: {
      best: ['Pig', 'Rabbit'],
      moderate: ['Dog', 'Tiger', 'Horse', 'Dragon', 'Monkey', 'Rat', 'Snake', 'Rooster'],
      least: ['Ox'],
      love: ['Rabbit', 'Horse'],
    },
    Monkey: {
      best: ['Dragon', 'Rat'],
      moderate: ['Snake', 'Rooster', 'Ox', 'Pig', 'Rabbit', 'Goat', 'Dog', 'Horse'],
      least: ['Tiger'],
      love: ['Rat', 'Dragon'],
    },
    Rooster: {
      best: ['Snake', 'Ox'],
      moderate: ['Dragon', 'Monkey', 'Rat', 'Dog', 'Tiger', 'Horse', 'Pig', 'Goat'],
      least: ['Rabbit'],
      love: ['Ox', 'Dragon'],
    },
    Dog: {
      best: ['Tiger', 'Horse'],
      moderate: ['Pig', 'Rabbit', 'Goat', 'Snake', 'Rooster', 'Ox', 'Monkey', 'Rat'],
      least: ['Dragon'],
      love: ['Rabbit', 'Tiger'],
    },
    Pig: {
      best: ['Rabbit', 'Goat'],
      moderate: ['Dog', 'Tiger', 'Horse', 'Dragon', 'Monkey', 'Rat', 'Rooster', 'Ox'],
      least: ['Snake'],
      love: ['Rabbit', 'Tiger'],
    },
  };
  
  