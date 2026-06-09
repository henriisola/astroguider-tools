// KarmicNumbersSection.tsx
// Usage: <KarmicNumbersSection birthDate="1980-04-01" fullName="John Paul Smith" />

'use client';

import React from 'react';

// ─── Karmic Debt ──────────────────────────────────────────────
// Raised when the raw sum (before reduction) is 13, 14, 16 or 19

const KARMIC_DEBT_MEANINGS: Record<number, { title: string; desc: string }> = {
  13: {
    title: "Discipline & Consistency",
    desc: "Past-life misuse of creative energy — laziness or shortcuts at the expense of others. This life calls for focused effort, follow-through and building something real rather than relying on talent alone.",
  },
  14: {
    title: "Emotional Control & Freedom",
    desc: "Overindulgence and misuse of freedom in a past life. This life calls for self-discipline around addictions, excess and impulsiveness — genuine freedom comes only through responsible choices.",
  },
  16: {
    title: "Ego & Humility",
    desc: "Pride, arrogance or betrayal of trust in a past life. This life brings repeated situations that dissolve ego-built structures. The lesson: build on spiritual rather than personal foundations.",
  },
  19: {
    title: "Independence & Cooperation",
    desc: "Misuse of power or refusal to serve others in a past life. This life calls for learning to accept help, acknowledge others and use personal strength in service rather than self-interest.",
  },
};

// ─── Pythagorean helpers ─────────────────────────────────────

const PYTHAGOREAN: Record<string, number> = {
  A:1,J:1,S:1, B:2,K:2,T:2, C:3,L:3,U:3, D:4,M:4,V:4,
  E:5,N:5,W:5, F:6,O:6,X:6, G:7,P:7,Y:7, H:8,Q:8,Z:8, I:9,R:9,
};
const VOWELS = new Set(['A','E','I','O','U']);

function calcExpressionRaw(name: string): number {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '');
  return clean.split('').reduce((a, c) => a + (PYTHAGOREAN[c] ?? 0), 0);
}

function calcSoulUrgeRaw(name: string): number {
  const clean = name.toUpperCase().replace(/[^A-Z]/g, '');
  return clean.split('').filter(c => VOWELS.has(c))
    .reduce((a, c) => a + (PYTHAGOREAN[c] ?? 0), 0);
}

type DebtSource = { number: number; source: string };

function getKarmicDebts(birthDate: string, fullName?: string): DebtSource[] {
  const d = new Date(birthDate);
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();

  const DEBT_NUMS = [13, 14, 16, 19];
  const found: DebtSource[] = [];
  const seen = new Set<string>();

  const add = (num: number, source: string) => {
    const key = `${num}-${source}`;
    if (DEBT_NUMS.includes(num) && !seen.has(key)) {
      seen.add(key);
      found.push({ number: num, source });
    }
  };

  add(day, 'Birthday');

  const lpRaw = String(year).split('').reduce((a, c) => a + Number(c), 0) + month + day;
  add(lpRaw, 'Life Path');

  if (fullName?.trim()) {
    const exprRaw = calcExpressionRaw(fullName);
    add(exprRaw, 'Expression');

    const suRaw = calcSoulUrgeRaw(fullName);
    add(suRaw, 'Soul Urge');
  }

  return found.sort((a, b) => a.number - b.number);
}

// ─── Component ───────────────────────────────────────────────

interface Props {
  birthDate: string;
  fullName?: string;
}

export default function KarmicNumbersSection({ birthDate, fullName }: Props) {
  if (!birthDate) return null;

  const debts = getKarmicDebts(birthDate, fullName);

  if (debts.length === 0) {
    return (
      <div className="bg-[#16181d] border border-zinc-800 rounded-xl p-6">
        <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-3">Karmic Debt</p>
        <p className="text-zinc-600 text-[11px]">
          No karmic debt numbers (13, 14, 16, 19) found in your core profile. A relatively clean karmic slate for this lifetime.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-[#16181d] border border-zinc-800 rounded-xl p-6 space-y-6">
      <div className="flex items-center gap-2">
        <p className="text-[10px] uppercase tracking-widest text-zinc-600">Karmic Debt</p>
        <span className="text-[10px] px-2 py-[1px] rounded-full bg-[#c9707022] text-[#c97070]">
          {[...new Set(debts.map(d => d.number))].join(', ')}
        </span>
      </div>
      <p className="text-zinc-600 text-[11px] leading-relaxed">
        Karmic debt numbers appear when the raw calculation before reduction equals 13, 14, 16 or 19. They indicate specific soul-level lessons carried from past lives that this incarnation is designed to resolve.
      </p>
      <div className="space-y-4">
        {debts.map(({ number: n, source }) => (
          <div key={`${n}-${source}`} className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-serif border border-[#c9707044] text-[#c97070] bg-[#c9707011]">
              {n}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <p className="text-zinc-300 text-xs font-medium">
                  {n} — {KARMIC_DEBT_MEANINGS[n].title}
                </p>
                <span className="text-[9px] px-1.5 py-[1px] rounded bg-zinc-800 text-zinc-500 uppercase tracking-wide">
                  {source}
                </span>
              </div>
              <p className="text-zinc-500 text-[11px] leading-relaxed">
                {KARMIC_DEBT_MEANINGS[n].desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
