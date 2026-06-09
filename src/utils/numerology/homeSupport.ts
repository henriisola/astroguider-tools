type SupportCategory = {
  supportive: number[];
  neutral: number[];
  challenging: number[];
};

type SupportResult = SupportCategory & {
  masterNumbers: Record<number, string>;
};

const SUPPORT_MATRIX: Record<number, SupportCategory> = {
  1: { supportive: [2, 6], neutral: [4], challenging: [5, 8] },
  2: { supportive: [4, 6], neutral: [7], challenging: [5, 8] },
  3: { supportive: [2, 6], neutral: [4], challenging: [5, 9] },
  4: { supportive: [2, 6], neutral: [7], challenging: [5, 8] },
  5: { supportive: [4, 6], neutral: [2], challenging: [8] },
  6: { supportive: [2, 4], neutral: [7], challenging: [5] },
  7: { supportive: [4, 2], neutral: [6], challenging: [5, 9] },
  8: { supportive: [2, 6], neutral: [4], challenging: [8, 5] },
  9: { supportive: [2, 6], neutral: [4], challenging: [5] },
  11: { supportive: [2, 6], neutral: [4], challenging: [8] },
};

export function getSupportiveHouseNumbers(
  lifePath: number,
  birthdayNumber?: number
): SupportResult {
  // Pidetään 11 omana erikoistapauksenaan, muut normalisoidaan 1–9-alueelle
  const normalized =
    lifePath === 11 ? 11 : ((lifePath % 9) || 9);

  const base = SUPPORT_MATRIX[normalized];

  return {
    ...base,
    masterNumbers: {
      22: 'Highly demanding. Often better for work than for rest.',
      33: 'Emotionally intense. Can overload the nervous system.',
    },
  };
}
