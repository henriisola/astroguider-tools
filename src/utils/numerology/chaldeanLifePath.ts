// utils/numerology/chaldeanLifePath.ts

// Laskee summan kaikista numeroista yksitellen (esim. 1976 => 1+9+7+6 = 23)
export function digitSum(n: number): number {
    return n
      .toString()
      .split('')
      .map(Number)
      .reduce((a, b) => a + b, 0);
  }
  
  // Redusoi kokonaisluvun yksinumeroiseksi (ellei haluta säilyttää master-lukuja)
  export function reduceToSingleDigit(n: number): number {
    while (n > 9) {
      n = digitSum(n);
    }
    return n;
  }
  
  // Laskee Small Life Path numeron (päivä + kuukausi + vuosi), ei redusoida komponentteja ensin
  export function calculateChaldeanSmallLifePath(date: Date): { raw: number; reduced: number } {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error('Invalid date passed to calculateChaldeanSmallLifePath:', date);
      return { raw: 0, reduced: 0 };
    }
  
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    const raw = day + month + year;
    const reduced = reduceToSingleDigit(raw);
  
    return { raw, reduced };
  }
  
  // Laskee Big Life Path numeron (kaikki syntymäpäivän numerot yksitellen summattuna)
  export function calculateChaldeanBigLifePath(date: Date): { raw: number; reduced: number } {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error('Invalid date passed to calculateChaldeanBigLifePath:', date);
      return { raw: 0, reduced: 0 };
    }
  
    const digits = date
      .toISOString()
      .slice(0, 10) // "YYYY-MM-DD"
      .replace(/-/g, '')
      .split('')
      .map(Number);
  
    const raw = digits.reduce((sum, d) => sum + d, 0);
    const reduced = reduceToSingleDigit(raw);
  
    return { raw, reduced };
  }
  