'use client';

import React from 'react';
import {
  NUM_MEANINGS,
  getMasterNumberMeaning,
  getSoulUrgeMeaning,
  getExpressionMeaning,
  getPersonalityMeaning,
} from '@/lib/numerology/meanings';
import { getBirthdayLayers } from '@/lib/numerology/birthdayLayers';

interface NumerologyOverviewProps {
  phrase: string;
  currentAge?: number | null;
  lifePath: number;
  lifePathRaw?: number;
  birthdayNumber?: number;
  soulUrge: number;
  soulUrgeRaw?: number;
  personality: number;
  personalityRaw?: number;
  expression: number;
  expressionRaw?: number;
  vowels: { letter: string; value: number }[];
  consonants: { letter: string; value: number }[];
}

function digitalRoot(n: number): number {
  return n > 9 && ![11, 22, 33].includes(n)
    ? digitalRoot(String(n).split('').map(Number).reduce((a, b) => a + b, 0))
    : n;
}

const NUM_COLORS: Record<number, string> = {
  1:'#c6a85b', 2:'#7b9ec9', 3:'#e07b6a', 4:'#54ab8c',
  5:'#b07edb', 6:'#e8b86d', 7:'#6ab0c9', 8:'#c97070',
  9:'#7bc98a', 11:'#e8d5ff', 22:'#ffd700', 33:'#54ab8c',
};

function LetterRow({ label, letters, sum, color }: {
  label: string;
  letters: { letter: string; value: number }[];
  sum: number;
  color: string;
}) {
  return (
    <div className="flex gap-2 items-baseline">
      <span className="text-zinc-600 text-[10px] uppercase tracking-widest w-24 flex-shrink-0">{label}</span>
      <span className="text-[11px] font-mono flex flex-wrap gap-x-2 gap-y-1">
        {letters.map((v, i) => (
          <span key={i} className="flex-shrink-0">
            <span style={{ color }}>{v.letter.toUpperCase()}</span>
            <span className="text-zinc-600">({v.value})</span>
          </span>
        ))}
        <span className="text-zinc-400 ml-1">= {sum}</span>
      </span>
    </div>
  );
}

function BirthdayEntry({ birthday }: { birthday: number }) {
  const layers = getBirthdayLayers(birthday);
  const color = NUM_COLORS[layers.reduced] ?? '#c6a85b';

  return (
    <div className="py-5 border-b border-zinc-800/60 last:border-0">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div>
          <p className="text-zinc-200 text-sm font-semibold">Birthday Number</p>
          <p className="text-zinc-600 text-[10px] mt-0.5">Your natural gift</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {!layers.isSingle && (
            <span className="text-zinc-600 text-[10px] font-mono">{layers.raw} →</span>
          )}
          <div
            className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-base font-bold font-serif"
            style={{ color, borderColor: `${color}55`, backgroundColor: `${color}12` }}
          >
            {layers.reduced}
          </div>
        </div>
      </div>

      {/* Single digit */}
      {layers.isSingle && (
        <p className="text-zinc-500 text-[11px] leading-relaxed">{layers.layerFinal.desc}</p>
      )}

      {/* Compound — three layers */}
      {!layers.isSingle && (
        <div className="space-y-4 mt-1">

          {/* Layer 1 */}
          {layers.layer1 && (
            <div className="border-l-2 pl-3" style={{ borderColor: `${NUM_COLORS[layers.layer1.digit] ?? '#c6a85b'}55` }}>
              <div className="flex items-center gap-3 mb-1">
                <span
                  className="w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold font-mono flex-shrink-0"
                  style={{
                    color: NUM_COLORS[layers.layer1.digit] ?? '#c6a85b',
                    borderColor: `${NUM_COLORS[layers.layer1.digit] ?? '#c6a85b'}44`,
                    backgroundColor: `${NUM_COLORS[layers.layer1.digit] ?? '#c6a85b'}0e`,
                  }}
                >
                  {layers.layer1.digit}
                </span>
                <p className="text-zinc-400 text-[11px] font-medium">{layers.layer1.title}</p>
              </div>
              <p className="text-zinc-500 text-[11px] leading-relaxed whitespace-pre-line">{layers.layer1.desc}</p>
            </div>
          )}

          {/* Layer 2 */}
          {layers.layer2 && (
            <div className="border-l-2 pl-3" style={{ borderColor: `${NUM_COLORS[layers.layer2.digit] ?? '#c6a85b'}55` }}>
              <div className="flex items-center gap-3 mb-1">
                <span
                  className="w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold font-mono flex-shrink-0"
                  style={{
                    color: NUM_COLORS[layers.layer2.digit] ?? '#c6a85b',
                    borderColor: `${NUM_COLORS[layers.layer2.digit] ?? '#c6a85b'}44`,
                    backgroundColor: `${NUM_COLORS[layers.layer2.digit] ?? '#c6a85b'}0e`,
                  }}
                >
                  {layers.layer2.digit}
                </span>
                <p className="text-zinc-400 text-[11px] font-medium">{layers.layer2.title}</p>
              </div>
              <p className="text-zinc-500 text-[11px] leading-relaxed">{layers.layer2.desc}</p>
            </div>
          )}

          {/* Layer final — the lesson */}
          <div className="border-l-2 pl-3" style={{ borderColor: `${color}77` }}>
            <div className="flex items-center gap-3 mb-1">
              <span
                className="w-7 h-7 rounded-full border flex items-center justify-center text-xs font-bold font-mono flex-shrink-0"
                style={{ color, borderColor: `${color}55`, backgroundColor: `${color}12` }}
              >
                {layers.reduced}
              </span>
              <p className="font-medium text-[11px]" style={{ color }}>{layers.layerFinal.title}</p>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">{layers.layerFinal.desc}</p>
          </div>

        </div>
      )}
    </div>
  );
}

function NumberEntry({ label, tag, number, rawLabel, description, masterNote }: {
  label: string;
  tag: string;
  number: number;
  rawLabel?: string;
  description?: string;
  masterNote?: string;
}) {
  const color = NUM_COLORS[number] ?? '#c6a85b';
  const isMaster = [11, 22, 33].includes(number);

  return (
    <div className="py-5 border-b border-zinc-800/60 last:border-0">
      <div className="flex items-center justify-between gap-4 mb-3">
        <div>
          <p className="text-zinc-200 text-sm font-semibold">{label}</p>
          <p className="text-zinc-600 text-[10px] mt-0.5">{tag}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {rawLabel && (
            <span className="text-zinc-600 text-[10px] font-mono">{rawLabel} →</span>
          )}
          <div
            className="w-10 h-10 rounded-full border-2 flex items-center justify-center text-base font-bold font-serif"
            style={{ color, borderColor: `${color}55`, backgroundColor: `${color}12` }}
          >
            {number}
          </div>
        </div>
      </div>
      {isMaster && (
        <span className="inline-block text-[10px] px-2 py-[2px] rounded-full font-mono mb-2"
          style={{ color, backgroundColor: `${color}18` }}>
          Master Number
        </span>
      )}
      {description && (
        <p className="text-zinc-500 text-[11px] leading-relaxed">{description}</p>
      )}
      {masterNote && (
        <p className="text-[11px] leading-relaxed italic mt-2" style={{ color: `${color}bb` }}>
          {masterNote}
        </p>
      )}
    </div>
  );
}

export const NumerologyOverviewCard: React.FC<NumerologyOverviewProps> = ({
  lifePath, lifePathRaw, birthdayNumber,
  soulUrge, soulUrgeRaw, expression, expressionRaw,
  personality, personalityRaw, vowels, consonants, phrase, currentAge,
}) => {
  const vowelSum = vowels.filter(v => typeof v?.value === 'number').reduce((s, v) => s + v.value, 0);
  const consonantSum = consonants.filter(c => typeof c?.value === 'number').reduce((s, c) => s + c.value, 0);

  return (
    <div className="w-full space-y-6">

      {/* Name breakdown */}
      <div className="bg-[#16181d] border border-zinc-800 rounded-xl p-5 space-y-3">
        <p className="text-[10px] uppercase tracking-widest text-zinc-600">Pythagorean Name Analysis</p>
        <div className="space-y-2 text-[12px]">
          <div className="flex gap-2">
            <span className="text-zinc-600 text-[10px] uppercase tracking-widest w-16 flex-shrink-0 pt-[1px]">Name: </span>
            <span className="text-zinc-200">{phrase}</span>
          </div>
          {currentAge != null && (
            <div className="flex gap-2">
              <span className="text-zinc-600 text-[10px] uppercase tracking-widest w-16 flex-shrink-0 pt-[1px]">Age: </span>
              <span className="text-zinc-300">{currentAge}</span>
            </div>
          )}
        </div>
        <div className="space-y-2 pt-2">
          <LetterRow label="Vowels:" letters={vowels.filter(v => v?.letter)} sum={vowelSum} color="#c6a85b" />
          <LetterRow label="Consonants:" letters={consonants.filter(c => c?.letter)} sum={consonantSum} color="#7b9ec9" />
          <div className="flex gap-2 items-baseline pt-1">
            <span className="text-zinc-600 text-[10px] uppercase tracking-widest w-24 flex-shrink-0">Total: </span>
            <span className="text-zinc-300 text-[11px] font-mono font-semibold">{vowelSum + consonantSum}</span>
          </div>
        </div>
      </div>

      {/* Core numbers — one card, dividers between entries */}
      <div className="bg-[#16181d] border border-zinc-800 rounded-xl px-5">
        <p className="text-[10px] uppercase tracking-widest text-zinc-600 pt-5 pb-1">Core Numbers</p>

        <NumberEntry
          label="Life Path" tag="Your core life direction" number={lifePath}
          rawLabel={lifePathRaw && lifePathRaw !== lifePath ? String(lifePathRaw) : undefined}
          description={NUM_MEANINGS[lifePath]?.text}
          masterNote={[11,22,33].includes(lifePath) ? getMasterNumberMeaning(lifePath) : undefined}
        />
        {typeof birthdayNumber === 'number' && (
          <BirthdayEntry birthday={birthdayNumber} />
        )}
        {typeof soulUrge === 'number' && (
          <NumberEntry
            label="Soul Urge" tag="Your inner motivation" number={soulUrge}
            rawLabel={soulUrgeRaw && soulUrgeRaw !== soulUrge ? String(soulUrgeRaw) : undefined}
            description={getSoulUrgeMeaning(soulUrge) ?? undefined}
          />
        )}
        {typeof personality === 'number' && (
          <NumberEntry
            label="Personality" tag="Your outer expression" number={personality}
            rawLabel={personalityRaw && personalityRaw !== personality ? String(personalityRaw) : undefined}
            description={getPersonalityMeaning(personality) ?? undefined}
          />
        )}
        {typeof expression === 'number' && (
          <NumberEntry
            label="Expression" tag="Your natural abilities" number={expression}
            rawLabel={expressionRaw && expressionRaw !== expression ? String(expressionRaw) : undefined}
            description={getExpressionMeaning(expression) ?? undefined}
          />
        )}
      </div>

    </div>
  );
};

export default NumerologyOverviewCard;