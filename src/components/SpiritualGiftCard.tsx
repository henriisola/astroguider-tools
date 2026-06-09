import React from 'react';
import { getSpiritualGift } from '@/utils/numerology/spiritualGifts';

interface Props {
  birthdayNumber: number;
}

export const SpiritualGiftCard: React.FC<Props> = ({ birthdayNumber }) => {
  const [gift, emoji, description] = getSpiritualGift(birthdayNumber);
  if (!gift) return null;

  return (
    <div
      className="bg-[#16181d] border border-zinc-800 rounded-xl p-5 space-y-2 w-full"
      style={{ borderColor: '#ffffff' }}
    >
      <p className="text-[10px] uppercase tracking-widest text-zinc-600">Spiritual Gift</p>
      <div className="flex items-center gap-2">
        <span className="text-xl">{emoji}</span>
        <p className="text-zinc-200 text-sm font-semibold">{gift}</p>
      </div>
      <p className="text-zinc-500 text-[11px] leading-relaxed italic">{description}</p>
    </div>
  );
};

export default SpiritualGiftCard;