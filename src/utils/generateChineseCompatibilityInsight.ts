import { CHINESE_ZODIAC_COMPATIBILITY } from '@/lib/astrology/compatibility';

export function generateChineseCompatibilityInsight(sign: string): string {
  const compat = CHINESE_ZODIAC_COMPATIBILITY[sign];
  if (!compat) return 'Compatibility insights are unavailable for this sign.';

  const best = compat.best.join(', ');
  const moderate = compat.moderate.join(', ');
  const least = compat.least.join(', ');

  return `As a ${sign}, your natural affinity lies with ${best}. These signs often bring out your best qualities and align with your personality.

Moderate compatibility with ${moderate} can lead to interesting relationships that require understanding and balance.

However, with ${least}, challenges may arise due to contrasting energies — these connections may demand greater patience and communication.`;
}
