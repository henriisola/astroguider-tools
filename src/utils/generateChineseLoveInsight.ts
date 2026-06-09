import { CHINESE_ZODIAC_LOVE_MATCHES } from 'lib/astrology/loveMatches';

export function generateChineseLoveInsight(sign: string): string {
  const love = CHINESE_ZODIAC_LOVE_MATCHES[sign];
  if (!love || !Array.isArray(love.best)) return 'Love insight is unavailable for this sign.';

  const best = love.best.join(', ');
  const note = love.note ?? '';

  return `As a ${sign}, your romantic spark is strongest with ${best}. ${note}`;
}
