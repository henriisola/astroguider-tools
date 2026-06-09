export function getChineseHourSign(date: Date): string {
  const hour = date.getHours();

  if (hour >= 23 || hour < 1) return 'Rat';
  if (hour >= 1 && hour < 3) return 'Ox';
  if (hour >= 3 && hour < 5) return 'Tiger';
  if (hour >= 5 && hour < 7) return 'Rabbit';
  if (hour >= 7 && hour < 9) return 'Dragon';
  if (hour >= 9 && hour < 11) return 'Snake';
  if (hour >= 11 && hour < 13) return 'Horse';
  if (hour >= 13 && hour < 15) return 'Goat';
  if (hour >= 15 && hour < 17) return 'Monkey';
  if (hour >= 17 && hour < 19) return 'Rooster';
  if (hour >= 19 && hour < 21) return 'Dog';
  if (hour >= 21 && hour < 23) return 'Pig';

  return 'Unknown'; // fallback if something unexpected happens
}
