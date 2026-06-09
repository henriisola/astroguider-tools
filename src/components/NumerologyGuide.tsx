'use client';

import React, { useState } from 'react';

const STEPS = [
  {
    number: '1',
    title: 'Enter your full birth name',
    desc: 'Use the name exactly as it appears on your birth certificate — including middle names. Nicknames or married names give different results.',
  },
  {
    number: '2',
    title: 'Select your date of birth',
    desc: 'Your birthdate is used to calculate your Life Path and personal cycle numbers. It never changes, so always use your actual birth date.',
  },
  {
    number: '3',
    title: 'Add birth time (optional)',
    desc: 'Birth time is used for additional timing calculations. If you don\'t know it, leave it blank — all other results still work perfectly.',
  },
  {
    number: '4',
    title: 'Press Analyze',
    desc: 'Your full numerology profile is calculated instantly. Scroll down to explore each section.',
  },
];

const NUMBERS = [
  {
    name: 'Life Path',
    tag: 'Most important number',
    tagColor: '#c6a85b',
    desc: 'Calculated from your birthdate. This is your core number — it describes your life\'s main theme, the lessons you\'re here to learn, and the path you\'re naturally drawn to walk.',
    example: 'Born 15 Jun 1990 → 1+5+6+1+9+9+0 = 31 → 3+1 = Life Path 4',
  },
  {
    name: 'Birthday Number',
    tag: 'Your natural gift',
    tagColor: '#54ab8c',
    desc: 'Simply the day of the month you were born. It reveals a special talent or ability you arrived with — a natural skill that comes easily to you without much effort.',
    example: 'Born on the 15th → Birthday Number 6',
  },
  {
    name: 'Soul Urge',
    tag: 'Your inner motivation',
    tagColor: '#7b9ec9',
    desc: 'Calculated from the vowels in your full birth name. This number reveals what truly drives you from the inside — your deepest desires, what makes you feel fulfilled, and what you secretly long for.',
    example: 'Vowels in "JOHN PAUL" → Soul Urge number',
  },
  {
    name: 'Expression',
    tag: 'Your natural abilities',
    tagColor: '#b07edb',
    desc: 'Calculated from all the letters in your full birth name. It shows the talents and characteristics you naturally express to the world — how others tend to see you and what you\'re naturally good at.',
    example: 'All letters in full birth name → Expression number',
  },
  {
    name: 'Personality',
    tag: 'Your outer mask',
    tagColor: '#e07b6a',
    desc: 'Calculated from the consonants in your name. This is the first impression you give to strangers — the "mask" you naturally wear in public before people get to know the real you.',
    example: 'Consonants in full birth name → Personality number',
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────────────────────────────────────

function Step({ number, title, desc }: { number: string; title: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <div
        className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold font-mono border"
        style={{ borderColor: '#c6a85b44', color: '#c6a85b', backgroundColor: '#c6a85b11' }}
      >
        {number}
      </div>
      <div>
        <p className="text-zinc-300 text-xs font-medium mb-1">{title}</p>
        <p className="text-zinc-500 text-[11px] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function NumberEntry({ name, tag, tagColor, desc, example }: {
  name: string; tag: string; tagColor: string; desc: string; example: string;
}) {
  return (
    <div className="border-l-2 pl-4 py-1" style={{ borderColor: `${tagColor}55` }}>
      <p className="text-zinc-200 text-xs font-semibold mb-1">{name}</p>
      <span
        className="inline-block text-[10px] px-2 py-[2px] rounded-full font-mono mb-2"
        style={{ color: tagColor, backgroundColor: `${tagColor}18` }}
      >
        {tag}
      </span>
      <p className="text-zinc-400 text-[11px] leading-relaxed mb-2">{desc}</p>
      <p className="text-[10px] font-mono" style={{ color: `${tagColor}88` }}>
        e.g. {example}
      </p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────────────────────

export default function NumerologyGuide() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#16181d] border border-zinc-800 rounded-xl mb-8 overflow-hidden">

      {/* Guide toggle — full guide hidden on mobile by default */}
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-5 py-3 text-left hover:bg-zinc-800/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span
            className="text-zinc-600 text-[10px] transition-transform duration-200"
            style={{ transform: open ? 'rotate(90deg)' : 'rotate(0deg)', display: 'inline-block' }}
          >
            ▶
          </span>
          <span className="text-[11px] text-zinc-400">How to use this tool</span>
        </div>
        <span className="text-[10px] text-zinc-600">{open ? 'Hide' : 'Show'}</span>
      </button>

      {open && (
        <div className="border-t border-zinc-800 p-6 space-y-6">

          <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">
            Steps
          </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {STEPS.map(s => (
            <Step key={s.number} {...s} />
          ))}
        </div>

          <div className="h-px bg-zinc-800" />

          {/* Core numbers */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-4">
              Your core numbers
            </p>
            <div className="space-y-5">
              {NUMBERS.map(n => (
                <NumberEntry key={n.name} {...n} />
              ))}
            </div>
          </div>

          <div className="h-px bg-zinc-800" />

          {/* Master numbers */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-3">
              Master numbers
            </p>
            <div className="bg-[#0b0c10] rounded-lg p-4 border border-zinc-800 space-y-2 text-[11px] leading-relaxed">
              <p className="text-zinc-400">
                <span className="text-[#e8d5ff] font-medium">11</span>,{' '}
                <span className="text-[#ffd700] font-medium">22</span> and{' '}
                <span className="text-[#54ab8c] font-medium">33</span> are called Master Numbers.
                When your calculation produces these, they are <em>not</em> reduced further.
              </p>
              <p className="text-zinc-400">
                <span className="text-[#e8d5ff] font-medium">11 — The Illuminator.</span>{' '}
                Heightened intuition, spiritual sensitivity and the gateway between worlds.
              </p>
              <p className="text-zinc-400">
                <span className="text-[#ffd700] font-medium">22 — The Master Builder.</span>{' '}
                The ability to turn grand visions into lasting, real-world reality.
              </p>
              <p className="text-zinc-400">
                <span className="text-[#54ab8c] font-medium">33 — The Master Teacher.</span>{' '}
                The rarest number — compassionate service, healing and selfless teaching.
              </p>
              <p className="text-zinc-500">
                All three carry greater potential but also greater challenge.
              </p>
            </div>
          </div>

        </div>

      )}
    </div>
  );
}