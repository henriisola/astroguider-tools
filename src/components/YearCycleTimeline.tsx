// YearCycleTimeline.tsx
// 1-9 vuosikierto listana syntymäpäivästä +10 vuotta nykyhetkestä eteenpäin
// Käyttö: <YearCycleTimeline birthDate="1980-04-01" />

'use client';

import React, { useMemo } from 'react';

// ─── Helpers ─────────────────────────────────────────────────

function reduceToSingle(n: number): number {
  if (n === 11 || n === 22 || n === 33) return n;
  while (n > 9) {
    n = String(n).split('').reduce((a, d) => a + Number(d), 0);
    if (n === 11 || n === 22 || n === 33) return n;
  }
  return n;
}

function digitSum(n: number): number {
  return String(n).split('').reduce((a, d) => a + Number(d), 0);
}

function calcPersonalYear(birthDate: string, targetYear: number): number {
  const b = new Date(birthDate);
  // Personal Year alkaa syntymäpäivänä — käytetään viimeisimmän syntymäpäivän vuotta
  // Ennen syntymäpäivää: active year = targetYear - 1
  // Syntymäpäivänä tai jälkeen: active year = targetYear
  const today = new Date();
  const birthdayInTargetYear = new Date(targetYear, b.getMonth(), b.getDate());
  const activeYear = (targetYear === today.getFullYear() && today < birthdayInTargetYear)
    ? targetYear - 1
    : targetYear;
  // Kaava: jokainen numero puretaan digiteiksi erikseen
  // esim. 17.7.2025 → (1+7) + (0+7) + (2+0+2+5) = 8+7+9 = 24 → 6
  const dayDigits = digitSum(b.getDate());
  const monthDigits = digitSum(b.getMonth() + 1);
  const yearDigits = digitSum(activeYear);
  return reduceToSingle(dayDigits + monthDigits + yearDigits);
}

// ─── Year meanings ───────────────────────────────────────────

const YEAR_DATA: Record<number, { theme: string; keywords: string; color: string; desc: string }> = {
  1: {
    theme: 'New Beginnings',
    keywords: 'Initiative · Independence · Leadership',
    color: '#c6a85b',
    desc: 'A year of fresh starts and planting seeds. Decisions made now shape the next 9-year cycle. Take initiative — what you begin here will grow.',
  },
  2: {
    theme: 'Cooperation',
    keywords: 'Patience · Relationships · Sensitivity',
    color: '#7b9ec9',
    desc: 'A year of partnership and subtle growth. Results take time — focus on nurturing relationships and developing what you started last year.',
  },
  3: {
    theme: 'Expression',
    keywords: 'Creativity · Communication · Growth',
    color: '#b07edb',
    desc: 'A year of expansion, joy and self-expression. Creative projects flourish and social connections multiply. Let yourself be seen.',
  },
  4: {
    theme: 'Foundation',
    keywords: 'Work · Discipline · Structure',
    color: '#c97070',
    desc: 'A year of hard work and building solid foundations. Progress may feel slow but what you construct now lasts. Stay focused and practical.',
  },
  5: {
    theme: 'Change',
    keywords: 'Freedom · Adventure · Transition',
    color: '#54ab8c',
    desc: 'A year of significant change and unexpected movement. Embrace flexibility — this is not the year to resist what wants to shift.',
  },
  6: {
    theme: 'Responsibility',
    keywords: 'Home · Nurturing · Service',
    color: '#e07b6a',
    desc: 'A year focused on family, home and responsibility to others. Relationships deepen and commitments are tested. Love and service are the themes.',
  },
  7: {
    theme: 'Reflection',
    keywords: 'Inner work · Wisdom · Solitude',
    color: '#9b8fc8',
    desc: 'A year of introspection, study and spiritual development. Outer activity slows; inner growth accelerates. Trust the quiet and go deeper.',
  },
  8: {
    theme: 'Abundance',
    keywords: 'Power · Achievement · Material mastery',
    color: '#e8b86d',
    desc: 'A year of harvest, ambition and material manifestation. What you have built since Year 1 begins to pay off. Step into your authority.',
  },
  9: {
    theme: 'Completion',
    keywords: 'Release · Endings · Wisdom',
    color: '#6ab0c9',
    desc: 'A year of completion and letting go. Release what no longer serves before the new cycle begins. Forgiveness, closure and harvest.',
  },
  11: {
    theme: 'Illumination',
    keywords: 'Intuition · Inspiration · Higher calling',
    color: '#e8d5ff',
    desc: 'A master year of heightened intuition and spiritual awareness. Extraordinary potential — and extraordinary sensitivity. Trust what you receive.',
  },
  22: {
    theme: 'Master Building',
    keywords: 'Vision · Legacy · Large-scale creation',
    color: '#ffd700',
    desc: 'A master year of building something of lasting significance. The most powerful year in any 9-year cycle — begin something that will endure.',
  },
  33: {
    theme: 'Master Teaching',
    keywords: 'Compassion · Service · Universal love',
    color: '#54ab8c',
    desc: 'A rare master year of selfless service and compassionate teaching. Your influence reaches far beyond the personal.',
  },
};

// ─── Component ───────────────────────────────────────────────

interface Props {
  birthDate: string;
}

export default function YearCycleTimeline({ birthDate }: Props) {
  const currentYear = new Date().getFullYear();

  const years = useMemo(() => {
    if (!birthDate) return [];
    const b = new Date(birthDate);
    const birthYear = b.getFullYear();
    const startYear = birthYear;
    const endYear = currentYear + 10;
    const result = [];
    for (let y = startYear; y <= endYear; y++) {
      result.push({ year: y, py: calcPersonalYear(birthDate, y) });
    }
    return result;
  }, [birthDate, currentYear]);

  if (!birthDate || years.length === 0) return null;

  // Nykyinen Personal Year
  const currentPY = calcPersonalYear(birthDate, currentYear);
  const currentData = YEAR_DATA[currentPY];

  // Etsi nykyinen kohta listassa
  const currentIdx = years.findIndex(y => y.year === currentYear);

  // Näytä 5 vuotta taaksepäin nykyhetkestä, loput eteenpäin
  const displayStart = Math.max(0, currentIdx - 5);
  const displayYears = years.slice(displayStart);

  return (
    <div className="bg-[#16181d] border border-zinc-800 rounded-xl p-6 space-y-6">
      <div>
        <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">9-Year Cycle Timeline</p>
        <p className="text-zinc-600 text-[11px]">
          Your personal year cycle from birth — showing every year's energy from 5 years back to 10 years ahead.
        </p>
      </div>

      {/* Nykyinen vuosi korostettuna */}
      <div className="rounded-xl p-4 border-2" style={{
        borderColor: `${currentData?.color ?? '#c6a85b'}66`,
        backgroundColor: `${currentData?.color ?? '#c6a85b'}0a`
      }}>
        <div className="flex items-start justify-between mb-2">
          <div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-1">Current year — {currentYear}</p>
            <p className="text-zinc-200 text-sm font-semibold">
              Personal Year{' '}
              <span style={{ color: currentData?.color ?? '#c6a85b' }}>{currentPY}</span>
              {' '}— {currentData?.theme}
            </p>
            <p className="text-[10px] text-zinc-500 mt-1">{currentData?.keywords}</p>
          </div>
          <span className="text-4xl font-serif font-bold" style={{ color: currentData?.color ?? '#c6a85b' }}>
            {currentPY}
          </span>
        </div>
        <p className="text-zinc-400 text-[11px] leading-relaxed">{currentData?.desc}</p>
      </div>

      {/* Koko lista */}
      <div className="space-y-2">
        {displayYears.map(({ year, py }) => {
          const data = YEAR_DATA[py];
          const isCurrent = year === currentYear;
          const isPast = year < currentYear;
          const isFuture = year > currentYear;

          return (
            <div
              key={year}
              className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-colors ${
                isCurrent ? 'bg-zinc-800/60' : 'hover:bg-zinc-800/30'
              }`}
            >
              {/* Year */}
              <span className={`text-xs font-mono w-12 flex-shrink-0 ${
                isCurrent ? 'text-zinc-200 font-bold' : isPast ? 'text-zinc-600' : 'text-zinc-400'
              }`}>
                {year}
              </span>

              {/* PY number badge */}
              <span
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold font-serif"
                style={{
                  backgroundColor: isCurrent || isFuture ? `${data?.color ?? '#c6a85b'}22` : 'transparent',
                  color: isCurrent || isFuture ? (data?.color ?? '#c6a85b') : '#4a4a52',
                  border: isCurrent
                    ? `1px solid ${data?.color ?? '#c6a85b'}88`
                    : isFuture
                    ? `1px solid ${data?.color ?? '#c6a85b'}33`
                    : '1px solid #27272a',
                }}
              >
                {py}
              </span>

              {/* Theme */}
              <span className={`text-xs flex-1 ${
                isCurrent ? 'text-zinc-200 font-semibold' : isPast ? 'text-zinc-600' : 'text-zinc-300'
              }`}>
                {data?.theme}
                {isCurrent && (
                  <span className="ml-2 text-[9px] uppercase tracking-widest text-zinc-500">← now</span>
                )}
              </span>

              {/* Keywords — vain future + current */}
              {!isPast && (
                <span className="text-[10px] text-zinc-500 hidden sm:block text-right max-w-[160px] leading-relaxed">
                  {data?.keywords}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-zinc-700 text-[10px] leading-relaxed">
        Personal year is calculated from your birth day + month + the calendar year. It shifts on your birthday each year, not on January 1st.
      </p>
    </div>
  );
}