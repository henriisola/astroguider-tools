export function getNameNumber(name: string): number {
    const letterValues: { [char: string]: number } = {
      a: 1, i: 1, j: 1, q: 1, y: 1,
      b: 2, k: 2, r: 2,
      c: 3, g: 3, l: 3, s: 3,
      d: 4, m: 4, t: 4,
      e: 5, h: 5, n: 5, x: 5,
      u: 6, v: 6, w: 6,
      o: 7, z: 7,
      f: 8, p: 8
    };
  
    const clean = name.toLowerCase().replace(/[^a-z]/g, '');
    const total = [...clean].reduce((sum, ch) => sum + (letterValues[ch] || 0), 0);
  
    const reduce = (n: number): number =>
      n > 9 ? reduce(n.toString().split('').reduce((a, b) => a + Number(b), 0)) : n;
  
    return reduce(total);
  }
  