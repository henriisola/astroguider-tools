export function calculateLifePathNumber(date: string): number {
    const digits = date.replace(/\D/g, '').split('').map(Number);
    let sum = digits.reduce((acc, val) => acc + val, 0);
  
    while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
      sum = sum.toString().split('').reduce((acc, val) => acc + parseInt(val), 0);
    }
  
    return sum;
  }
  
  const numerologyMap: Record<string, number> = {
    A: 1, J: 1, S: 1,
    B: 2, K: 2, T: 2,
    C: 3, L: 3, U: 3,
    D: 4, M: 4, V: 4,
    E: 5, N: 5, W: 5,
    F: 6, O: 6, X: 6,
    G: 7, P: 7, Y: 7,
    H: 8, Q: 8, Z: 8,
    I: 9, R: 9,
  };
  
  function reduceNumber(num: number): number {
    while (num > 9 && num !== 11 && num !== 22 && num !== 33) {
      num = num.toString().split('').reduce((acc, val) => acc + parseInt(val), 0);
    }
    return num;
  }
  
  export function calculateFullNumerologyProfile(name: string) {
    const clean = name.toUpperCase().replace(/[^A-Z]/g, '');
  
    let expressionTotal = 0;
    let soulUrgeTotal = 0;
    let personalityTotal = 0;
  
    const vowels: { letter: string; value: number }[] = [];
    const consonants: { letter: string; value: number }[] = [];
  
    for (const char of clean) {
      const value = numerologyMap[char] || 0;
      expressionTotal += value;
  
      if ('AEIOU'.includes(char)) {
        soulUrgeTotal += value;
        vowels.push({ letter: char, value });
      } else {
        personalityTotal += value;
        consonants.push({ letter: char, value });
      }
    }
  
    return {
      expression: reduceNumber(expressionTotal),
      soulurge: reduceNumber(soulUrgeTotal),
      personality: reduceNumber(personalityTotal),
      vowels,
      consonants
    };
  }
  
  