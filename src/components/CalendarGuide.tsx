'use client';

import React, { useState } from 'react';

// ─── Content ──────────────────────────────────────────────────

const STEPS = [
  {
    number: '1',
    title: 'Navigate to any month',
    desc: 'Use the arrow buttons or select a month and year directly from the dropdowns. The Today button jumps back to the current month instantly.',
  },
  {
    number: '2',
    title: 'Read the month header',
    desc: 'The Universal Month number and its meaning are shown in the header bar. If your profile has a birth date, your Personal Month and Personal Year numbers appear alongside it.',
  },
  {
    number: '3',
    title: 'Explore day cards',
    desc: 'Each day shows its Universal Day number with total sum, Western zodiac sign, Chinese zodiac animal, and — if your profile is active — your Personal Day number marked with ◎.',
  },
  {
    number: '4',
    title: 'Tap a day to add notes or events',
    desc: 'Select any day to open the day editor. Choose an event type, add a title and a personal note. Entries are saved privately in your browser and shown with a coloured dot on the calendar.',
  },
];

const CYCLE_TYPES = [
  {
    name: 'Universal Day',
    tagColor: '#c6a85b',
    desc: 'Calculated by summing all digits of the full date (day + month + year). This is the collective energy of the day — the same for everyone on Earth. It sets the general tone.',
    example: '1 April 2026 → 1+4+2+0+2+6 = 15 → 1+5 = 6 (Harmony)',
  },
  {
    name: 'Universal Month',
    tagColor: '#7b9ec9',
    desc: 'Derived from the sum of all digits in the year and month. Shown in the header bar, it colours the overall theme of the entire month.',
    example: 'April 2026 → 4+2+0+2+6 = 14 → 5 (Change)',
  },
  {
    name: 'Personal Day ◎',
    tagColor: '#54ab8c',
    desc: 'Your individual day number, unique to your birth date. Calculated from your Personal Year + Universal Month + day number. Requires an active profile with a birth date.',
    example: 'Personal Year 8 + Month 4 + Day 1 → reduced to Personal Day',
  },
  {
    name: 'Personal Month',
    tagColor: '#54ab8c',
    desc: 'Your Personal Year number combined with the current month. Shown in the header when your profile is active. Describes the personal theme running through the whole month.',
    example: 'Personal Year 3 + Month 4 = 7 (Reflection)',
  },
  {
    name: 'Personal Year',
    tagColor: '#54ab8c',
    desc: 'Calculated from your birth day, birth month, and the current calendar year. Describes your overarching personal theme for the entire year.',
    example: 'Born 17 July → 1+7+7+2+0+2+6 = 25 → 7 (Reflection year)',
  },
];

const NUMBER_MEANINGS = [
  { num: 1,  color: '#c6a85b', title: 'New Beginnings', desc: 'Initiation, independence, leadership energy. Good for starting new projects, making decisions, asserting direction.' },
  { num: 2,  color: '#7b9ec9', title: 'Cooperation',    desc: 'Partnership, patience, diplomacy. Favours collaboration, negotiations, and deepening relationships.' },
  { num: 3,  color: '#e07b6a', title: 'Expression',     desc: 'Creativity, communication, social energy. Good for creative work, presentations, and social connections.' },
  { num: 4,  color: '#54ab8c', title: 'Foundation',     desc: 'Structure, discipline, hard work. Favours planning, organising, and building solid groundwork.' },
  { num: 5,  color: '#b07edb', title: 'Change',         desc: 'Freedom, movement, unexpected shifts. Adaptability is key — avoid rigid plans on 5 days.' },
  { num: 6,  color: '#e8b86d', title: 'Harmony',        desc: 'Responsibility, care, family. Favours nurturing relationships, resolving conflicts, and creative pursuits.' },
  { num: 7,  color: '#6ab0c9', title: 'Reflection',     desc: 'Introspection, analysis, spiritual inquiry. Good for research, solitude, and inner work.' },
  { num: 8,  color: '#c97070', title: 'Abundance',      desc: 'Power, ambition, material focus. Favours business decisions, financial matters, and taking initiative.' },
  { num: 9,  color: '#7bc98a', title: 'Completion',     desc: 'Endings, release, humanitarian energy. Good for finishing projects, letting go, and acts of generosity.' },
];

const MASTER_NUMBERS = [
  { num: 11, color: '#e8d5ff', title: 'Master Intuition', desc: 'Heightened sensitivity and intuitive insight. Pay attention to dreams, synchronicities, and inner signals. Not a day for forcing — a day for receiving.' },
  { num: 22, color: '#ffd700', title: 'Master Builder',   desc: 'The most powerful day in the cycle. Visions can take practical form. Ambitions aligned with purpose carry unusual weight on 22 days.' },
  { num: 33, color: '#54ab8c', title: 'Master Teacher',   desc: 'A rare vibration of compassion and service. Emphasises healing, uplifting others, and leading through the heart — with strong boundaries.' },
];

const EVENT_TYPES = [
  { label: '🔔 Reminder',  color: '#c6a85b', desc: 'General reminders and time-sensitive notes.' },
  { label: '💼 Meeting',   color: '#7b9ec9', desc: 'Work meetings, calls, and appointments.' },
  { label: '⭐ Important', color: '#e07b6a', desc: 'Key dates, deadlines, and significant moments.' },
  { label: '🌿 Personal',  color: '#54ab8c', desc: 'Personal milestones, self-care, and lifestyle events.' },
  { label: '✨ Spiritual', color: '#b07edb', desc: 'Rituals, meditations, and energetically significant days.' },
];

// ─── Sub-components ───────────────────────────────────────────

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

function CycleEntry({ name, tagColor, desc, example }: {
  name: string; tagColor: string; desc: string; example: string;
}) {
  return (
    <div className="border-l-2 pl-4 py-1" style={{ borderColor: `${tagColor}55` }}>
      <p className="text-zinc-200 text-xs font-semibold mb-1">{name}</p>
      <p className="text-zinc-400 text-[11px] leading-relaxed mb-2">{desc}</p>
      <p className="text-[10px] font-mono" style={{ color: `${tagColor}88` }}>e.g. {example}</p>
    </div>
  );
}

function BulletEntry({ label, color, desc }: { label: string; color: string; desc: string }) {
  return (
    <div className="flex gap-3">
      <div className="flex-shrink-0 mt-[4px] w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      <div>
        <p className="text-zinc-300 text-xs font-medium mb-0.5">{label}</p>
        <p className="text-zinc-500 text-[11px] leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────

export default function CalendarGuide() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-[#16181d] border border-zinc-800 rounded-xl mb-8 overflow-hidden">

      {/* Guide toggle */}
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
          <span className="text-[11px] text-zinc-400">How to use this calendar</span>
        </div>
        <span className="text-[10px] text-zinc-600">{open ? 'Hide' : 'Show'}</span>
      </button>

      {open && (
        <div className="border-t border-zinc-800">


      {/* How to use — always visible */}
      <div className="p-6">
        <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-4">
          How to use this calendar
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {STEPS.map(s => <Step key={s.number} {...s} />)}
        </div>
      </div>

      {/* Collapsible */}

        <div className="border-t border-zinc-800 p-6 space-y-8">

          {/* Cycle types */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-4">
              The five cycle numbers
            </p>
            <div className="space-y-5">
              {CYCLE_TYPES.map(c => <CycleEntry key={c.name} {...c} />)}
            </div>
          </div>

          <div className="h-px bg-zinc-800" />

          {/* Numbers 1–9 */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-3">
              Numbers 1–9 and their energy
            </p>
            <div className="bg-[#0b0c10] rounded-lg p-4 border border-zinc-800 space-y-3">
              {NUMBER_MEANINGS.map(n => (
                <div key={n.num} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 inline-block mt-0.5 text-[10px] px-2 py-[2px] rounded font-semibold font-mono"
                    style={{ backgroundColor: `${n.color}22`, color: n.color, border: `1px solid ${n.color}44` }}
                  >
                    {n.num}
                  </span>
                  <div>
                    <p className="text-zinc-300 text-[11px] font-medium">{n.title}</p>
                    <p className="text-zinc-500 text-[11px] leading-relaxed">{n.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="h-px bg-zinc-800" />

          {/* Master numbers */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-3">
              Master numbers
            </p>
            <div className="bg-[#0b0c10] rounded-lg p-4 border border-zinc-800 space-y-3">
              {MASTER_NUMBERS.map(n => (
                <div key={n.num} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 inline-block mt-0.5 text-[10px] px-2 py-[2px] rounded font-semibold font-mono"
                    style={{ backgroundColor: `${n.color}22`, color: n.color, border: `1px solid ${n.color}44` }}
                  >
                    {n.num} ✦
                  </span>
                  <div>
                    <p className="text-zinc-300 text-[11px] font-medium">{n.title}</p>
                    <p className="text-zinc-500 text-[11px] leading-relaxed">{n.desc}</p>
                  </div>
                </div>
              ))}
              <p className="text-zinc-600 text-[11px] pt-1">
                Master numbers are never reduced further — 11 stays 11, 22 stays 22, 33 stays 33. Marked with ✦ on the calendar.
              </p>
            </div>
          </div>

          <div className="h-px bg-zinc-800" />

          {/* Event types */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-3">
              Event types
            </p>
            <div className="bg-[#0b0c10] rounded-lg p-4 border border-zinc-800 space-y-3">
              {EVENT_TYPES.map(e => (
                <div key={e.label} className="flex items-start gap-3">
                  <span
                    className="flex-shrink-0 inline-block mt-0.5 text-[10px] px-2 py-[2px] rounded font-semibold"
                    style={{ backgroundColor: `${e.color}22`, color: e.color, border: `1px solid ${e.color}44` }}
                  >
                    {e.label}
                  </span>
                  <p className="text-zinc-500 text-[11px] leading-relaxed">{e.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-zinc-600 text-[11px] mt-3 leading-relaxed">
              A coloured dot appears on the day card when an entry exists. The dot colour matches the event type — or gold if only a note is saved.
            </p>
          </div>

          <div className="h-px bg-zinc-800" />

          {/* Personal numbers */}
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-3">
              Personal numbers and your profile
            </p>
            <div className="bg-[#0b0c10] rounded-lg p-4 border border-zinc-800 space-y-2 text-[11px] leading-relaxed">
              <p className="text-zinc-400">
                Personal Day <span className="text-[#54ab8c] font-bold font-mono">◎</span>, Personal Month, and Personal Year numbers are only shown when you have an active profile with a birth date set.
              </p>
              <p className="text-zinc-400">
                These numbers run parallel to the Universal cycles but are unique to you — two people on the same day experience different personal energies.
              </p>
              <p className="text-zinc-500">
                Set your profile from the profile indicator in the top right corner to activate personal numbers across the entire calendar.
              </p>
            </div>
          </div>

        </div>
        </div>
      )}
    </div>
  );
}