'use client';

import React, { useState, useEffect } from 'react';
import { calculateChaldeanExpression } from '@/numerology/calculateChaldeanNumber';
import { getLetterEnergyInsight } from '@/components/getLetterEnergyInsight';
import { getLetterologyInsight } from '@/utils/ai/getLetterologyInsight';
import { getChaldeanExpressionInsight } from '@/utils/ai/getChaldeanPersonalityInsight';
import { getCareerInsightFromNumber } from '@/utils/ai/getChaldeanCareerInsight';
import { calculateChaldeanSmallLifePath, calculateChaldeanBigLifePath } from '@/utils/numerology/chaldeanLifePath';
import { reduceToSingleDigit } from '@/numerology/calculateChaldeanNumber';
import {
  getCompoundMeaning,
  COMPOUND_ENERGY_COLORS,
  COMPOUND_ENERGY_LABELS,
} from '@/lib/chaldeanCompoundMeanings';

// ─── Types ────────────────────────────────────────────────────

interface Props {
  phrase: string;
  value: number;
  reduced: number;
  parts: { word: string; value: number }[];
  aiInsight?: {
    rawPathInsight: string;
    birthdayInsight: string;
    ascendantMessage: string;
    karmaMessage: string;
    soulLesson: string;
    loveInsight?: string;
  };
  birthdate: string;
  soulUrge?: number;
}

// ─── Helpers ──────────────────────────────────────────────────

function parseEuropeanDate(input: string | undefined): Date {
  if (!input) return new Date('1970-01-01');
  if (/^\d{4}-\d{2}-\d{2}$/.test(input)) return new Date(input);
  const [day, month, year] = input.split(/[./-]/).map(s => parseInt(s.trim(), 10));
  return new Date(year, month - 1, day);
}

const NUMBER_SYMBOLS: Record<number, string> = {
  1:'🔥', 2:'💧', 3:'🎨', 4:'🪵', 5:'🌪️',
  6:'💖', 7:'🔮', 8:'💼', 9:'🕊️',
};

// ─── Sub-components ───────────────────────────────────────────

function LetterGrid({ parts }: { parts: { word: string; value: number }[] }) {
  const letters = parts.filter(p => /[a-zA-Z]/.test(p.word));
  return (
    <div className="flex flex-wrap gap-1.5">
      {letters.map((p, i) => {
        const isVowel = /[aeiouAEIOU]/.test(p.word);
        return (
          <div
            key={i}
            className="flex flex-col items-center justify-center w-9 h-9 rounded-lg border text-center"
            style={{
              borderColor: isVowel ? '#c6a85b44' : '#7b9ec944',
              backgroundColor: isVowel ? '#c6a85b0e' : '#7b9ec90e',
            }}
          >
            <span
              className="text-[11px] font-bold font-mono leading-none"
              style={{ color: isVowel ? '#c6a85b' : '#7b9ec9' }}
            >
              {p.word.toUpperCase()}
            </span>
            <span className="text-[10px] text-zinc-500 leading-none mt-0.5">{p.value}</span>
          </div>
        );
      })}
    </div>
  );
}

function CompoundCard({ compound, root }: { compound: number; root: number }) {
  const meaning = getCompoundMeaning(compound);
  if (!meaning) return null;

  const color = COMPOUND_ENERGY_COLORS[meaning.energy];
  const label = COMPOUND_ENERGY_LABELS[meaning.energy];

  return (
    <div
      className="rounded-xl border p-5 space-y-3"
      style={{ borderColor: `${color}33`, backgroundColor: `${color}08` }}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-2xl font-bold font-serif"
              style={{ color }}
            >
              {compound}
            </span>
            <span className="text-zinc-600 text-xs">→</span>
            <span className="text-zinc-400 text-sm font-mono">{root}</span>
          </div>
          <p className="text-zinc-200 text-sm font-semibold">{meaning.title}</p>
        </div>
        <span
          className="text-[10px] px-2 py-[3px] rounded-full font-mono uppercase tracking-wider flex-shrink-0"
          style={{ color, backgroundColor: `${color}20`, border: `1px solid ${color}44` }}
        >
          {label}
        </span>
      </div>

      {/* Description */}
      <p className="text-zinc-400 text-[11px] leading-relaxed">{meaning.description}</p>

      {/* Keywords */}
      <div className="flex flex-wrap gap-1.5">
        {meaning.keywords.map(k => (
          <span
            key={k}
            className="text-[10px] px-2 py-[2px] rounded font-mono"
            style={{ color: `${color}cc`, backgroundColor: `${color}14` }}
          >
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}

function NumberRow({ label, value, sub }: { label: string; value: number; sub?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-zinc-800 last:border-0">
      <div>
        <p className="text-zinc-300 text-xs font-medium">{label}</p>
        {sub && <p className="text-zinc-600 text-[10px]">{sub}</p>}
      </div>
      <span className="text-zinc-200 text-sm font-bold font-mono">
        {value} {NUMBER_SYMBOLS[value] ?? ''}
      </span>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────

export const GematriaCardEnhanced: React.FC<Props> = ({
  phrase,
  value,
  reduced,
  parts,
  aiInsight,
  birthdate,
  soulUrge,
}) => {
  const expression = calculateChaldeanExpression(phrase);
  const letterology = getLetterEnergyInsight(phrase);

  const [expressionInsight, setExpressionInsight] = useState('');
  const [careerInsight, setCareerInsight] = useState('');

  const date = parseEuropeanDate(birthdate);
  const { reduced: smallPath } = calculateChaldeanSmallLifePath(date);
  const { reduced: bigPath } = calculateChaldeanBigLifePath(date);

  useEffect(() => {
    setExpressionInsight(getChaldeanExpressionInsight(expression.final));
    setCareerInsight(getCareerInsightFromNumber(reduced));
  }, [phrase, reduced, expression.final]);

  const vowelsWithValues = parts.filter(p => /[aeiouAEIOU]/.test(p.word));
  const consonantsWithValues = parts.filter(p => /[a-zA-Z]/.test(p.word) && !/[aeiouAEIOU]/.test(p.word));
  const vowelSum = vowelsWithValues.reduce((acc, curr) => acc + curr.value, 0);
  const consonantSum = consonantsWithValues.reduce((acc, curr) => acc + curr.value, 0);
  const total = vowelSum + consonantSum;
  const totalReduced = reduceToSingleDigit(total);

  // Soul urge compound
  const soulUrgeCompound = vowelSum >= 10 ? vowelSum : null;
  // Personality compound
  const personalityCompound = consonantSum >= 10 ? consonantSum : null;

  return (
    <div className="bg-[#16181d] border border-zinc-800 rounded-xl p-6 space-y-7 avoid-break">

      {/* Header */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Chaldean Name Analysis</p>
        <p className="text-zinc-200 text-sm font-medium">{phrase}</p>
      </div>

      {/* Letter grid */}
      <div>
        <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-3">Letter values</p>
        <LetterGrid parts={parts} />
        <div className="flex gap-4 mt-3">
          <span className="text-[10px] text-zinc-500">
            <span style={{ color: '#c6a85b' }}>■</span> Vowels
          </span>
          <span className="text-[10px] text-zinc-500">
            <span style={{ color: '#7b9ec9' }}>■</span> Consonants
          </span>
        </div>
      </div>

      {/* Number summary */}
      <div className="bg-[#0b0c10] rounded-lg border border-zinc-800 px-4 py-2">
        <NumberRow
          label="Soul Urge (vowels)"
          value={reduceToSingleDigit(vowelSum)}
          sub={vowelSum > 9 ? `Compound ${vowelSum}` : undefined}
        />
        <NumberRow
          label="Personality (consonants)"
          value={reduceToSingleDigit(consonantSum)}
          sub={consonantSum > 9 ? `Compound ${consonantSum}` : undefined}
        />
        <NumberRow
          label="Expression (full name)"
          value={expression.final}
          sub={expression.rawSum > 9 ? `Compound ${expression.rawSum}` : undefined}
        />
        {birthdate && birthdate !== '1970-01-01' && (
          <>
            <NumberRow
              label="Chaldean Life Path (small)"
              value={smallPath}
              sub="Day + Month + Year reduced separately"
            />
            <NumberRow
              label="Chaldean Life Path (big)"
              value={bigPath}
              sub="All digits summed directly"
            />
          </>
        )}
      </div>

      {/* Compound number — Expression */}
      {expression.rawSum >= 10 && (
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-3">
            Compound number · Expression
          </p>
          <CompoundCard compound={expression.rawSum} root={expression.final} />
        </div>
      )}

      {/* Compound number — Soul Urge */}
      {soulUrgeCompound && soulUrgeCompound !== expression.rawSum && (
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-3">
            Compound number · Soul Urge
          </p>
          <CompoundCard compound={soulUrgeCompound} root={reduceToSingleDigit(soulUrgeCompound)} />
        </div>
      )}

      {/* Compound number — Personality */}
      {personalityCompound && personalityCompound !== expression.rawSum && personalityCompound !== soulUrgeCompound && (
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-3">
            Compound number · Personality
          </p>
          <CompoundCard compound={personalityCompound} root={reduceToSingleDigit(personalityCompound)} />
        </div>
      )}

      {/* Expression insight */}
      {expressionInsight && (
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">Expression insight</p>
          <p className="text-zinc-400 text-[11px] leading-relaxed">{expressionInsight}</p>
        </div>
      )}

      {/* Career insight */}
      {careerInsight && (
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">Career insight</p>
          <p className="text-zinc-400 text-[11px] leading-relaxed">{careerInsight}</p>
        </div>
      )}

    </div>
  );
};