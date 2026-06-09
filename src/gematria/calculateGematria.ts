export type GematriaResult = {
    original: string;
    ordinal: number;
    reverse: number;
    reduction: number;
  };
  
  export function calculateGematria(text: string): GematriaResult {
    const clean = text.toUpperCase().replace(/[^A-Z]/g, '');
  
    const ordinal = [...clean].reduce((sum, char) => {
      return sum + (char.charCodeAt(0) - 64); // A=1, B=2, ..., Z=26
    }, 0);
  
    const reverse = [...clean].reduce((sum, char) => {
      return sum + (27 - (char.charCodeAt(0) - 64)); // A=26, ..., Z=1
    }, 0);
  
    const reduction = [...clean].reduce((sum, char) => {
      const val = char.charCodeAt(0) - 64;
      const reduced = val % 9 === 0 ? 9 : val % 9;
      return sum + reduced;
    }, 0);
  
    return {
      original: text,
      ordinal,
      reverse,
      reduction: Math.abs(reduction),
    };
  }

  export function getGematriaValue(name: string): number {
    const clean = name.toUpperCase().replace(/[^A-Z]/g, '');
    const table: { [key: string]: number } = {
      A: 1, B: 2, C: 3, D: 4, E: 5, F: 6, G: 7, H: 8, I: 9,
      J: 10, K: 20, L: 30, M: 40, N: 50, O: 60, P: 70, Q: 80, R: 90,
      S: 100, T: 200, U: 300, V: 400, W: 500, X: 600, Y: 700, Z: 800
    };
    return clean.split('').reduce((sum, char) => sum + (table[char] || 0), 0);
  }
  
  