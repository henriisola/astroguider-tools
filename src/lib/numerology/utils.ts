export const digitalRoot = (n: number): number =>
    n > 9 && ![11, 22, 33].includes(n)
      ? digitalRoot(
          String(n)
            .split('')
            .map(Number)
            .reduce((a, b) => a + b, 0),
        )
      : n;
  