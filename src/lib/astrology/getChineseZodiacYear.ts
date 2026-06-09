import { CHINESE_NEW_YEAR_DATES } from './newYearDates';

export function getChineseZodiacYear(birthdate: Date): number {
  const year = birthdate.getFullYear();
  const newYearDate = CHINESE_NEW_YEAR_DATES[year];

  if (!newYearDate) {
    console.warn(`No Chinese New Year date found for year ${year}. Defaulting to ${year}`);
    return year; // fallback
  }

  if (birthdate < newYearDate) {
    return year - 1;
  }

  return year;
}
