// src/utils/primenumbers.ts

export function calculatePrimeNumbers(birthDate: string): string {
    const birthNumber = parseInt(birthDate.replaceAll('-', ''), 10); // esim. 19900417 -> 19900417
    const primes: number[] = [];
  
    let n = birthNumber;
    while (primes.length < 10) {
      if (isPrime(n)) primes.push(n);
      n++;
    }
  
    return primes.join(', ');
  }
  
  function isPrime(num: number): boolean {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  }
  