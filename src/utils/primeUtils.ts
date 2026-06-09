export function getPrimesFromDateString(dateString: string): number[] {
    const raw = dateString.replace(/\D/g, '');
    const digitsNormal = raw.split('');
    const digitsReversed = [...digitsNormal].reverse();
    const primes = new Set<number>();
  
    [digitsNormal, digitsReversed].forEach(digits => {
      for (let i = 0; i < digits.length - 1; i++) {
        const twoDigit = parseInt(`${digits[i]}${digits[i + 1]}`, 10);
        if (twoDigit >= 2 && twoDigit <= 99 && isPrime(twoDigit)) {
          primes.add(twoDigit);
        }
      }
    });
  
    return Array.from(primes).sort((a, b) => a - b);
  }
  
  function isPrime(n: number): boolean {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) return false;
    }
    return true;
  }
  