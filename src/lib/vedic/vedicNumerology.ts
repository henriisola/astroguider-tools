export interface vedicNumerologyResult {
    mulank: number; // Root Number
    bhagyank: number; // Destiny Number
    mulankSteps: string; // Calculation steps for Moolank
    bhagyankSteps: string; // Calculation steps for Bhagyank
  }
  
  // Reduce to single digit (1–9), and return steps
  function reduceToSingleDigitWithSteps(n: number): { result: number; steps: string } {
    const original = n;
    let steps = `${n}`;
    while (n > 9) {
      const digits = n.toString().split('').map(Number);
      const sum = digits.reduce((a, b) => a + b, 0);
      steps += ` → ${digits.join('+')} = ${sum}`;
      n = sum;
    }
    return { result: n, steps: `${original} → ${steps} → ${n}` };
  }
  
  // Mulank = Day of Birth reduced to 1–9
  export function calculateMulank(day: number): { result: number; steps: string } {
    return reduceToSingleDigitWithSteps(day);
  }
  
  // Bhagyank = Full Birthdate (DDMMYYYY) reduced to 1–9
  export function calculateBhagyank(day: number, month: number, year: number): { result: number; steps: string } {
    const full = `${day}${month}${year}`;
    const digits = [...full].map(Number);
    const total = digits.reduce((a, b) => a + b, 0);
    const reduced = reduceToSingleDigitWithSteps(total);
    return {
      result: reduced.result,
      steps: `${full} → ${digits.join('+')} = ${total} → ${reduced.steps}`
    };
  }
  
  export function calculatenumerologyNumerology(day: number, month: number, year: number): vedicNumerologyResult {
    const mulankObj = calculateMulank(day);
    const bhagyankObj = calculateBhagyank(day, month, year);
  
    return {
      mulank: mulankObj.result,
      bhagyank: bhagyankObj.result,
      mulankSteps: mulankObj.steps,
      bhagyankSteps: bhagyankObj.steps
    };
  }
  