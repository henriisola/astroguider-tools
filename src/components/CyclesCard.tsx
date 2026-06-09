'use client';

import { useEffect, useState } from 'react';
import {
  getPersonalYearMeaning,
  getPersonalMonthMeaning,
  getPersonalDayMeaning,
} from '@/lib/numerology/meanings';

type Props = {
  cycles: { personalYear: number; personalMonth: number; personalDay: number };
  birthdate: string;
};

function CycleRow({ label, number, formula, description, color }: {
  label: string; number: number; formula: string; description: string; color: string;
}) {
  return (
    <div className="py-5 border-b border-zinc-800/60 last:border-0">
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <p className="text-zinc-300 text-sm font-semibold">{label}</p>
          <p className="text-zinc-600 text-[10px] font-mono">{formula}</p>
        </div>
        <span className="text-lg font-bold font-serif flex-shrink-0" style={{ color }}>{number}</span>
      </div>
      <p className="text-zinc-500 text-[11px] leading-relaxed">{description}</p>
    </div>
  );
}

export const CyclesCard = ({ cycles, birthdate }: Props) => {
  const [criticalDays, setCriticalDays] = useState<number | null>(null);

  useEffect(() => {
    if (!birthdate) return;
    const today = new Date();
    const birth = new Date(birthdate);
    const next = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (today > next) next.setFullYear(today.getFullYear() + 1);
    const diff = Math.ceil((next.getTime() - today.getTime()) / 86400000);
    setCriticalDays(diff <= 52 ? diff : null);
  }, [birthdate]);

  return (
    <div className="bg-[#16181d] border border-zinc-800 rounded-xl px-5 avoid-break">
      <p className="text-[10px] uppercase tracking-widest text-zinc-600 pt-5 pb-1">Personal Cycles</p>

      <CycleRow
        label="Personal Year" number={cycles.personalYear}
        formula="Birth day + Birth month + Current year → reduced"
        description={getPersonalYearMeaning(cycles.personalYear)}
        color="#c6a85b"
      />
      <CycleRow
        label="Personal Month" number={cycles.personalMonth}
        formula="Personal year + Current month → reduced"
        description={getPersonalMonthMeaning(cycles.personalMonth)}
        color="#54ab8c"
      />
      <CycleRow
        label="Personal Day" number={cycles.personalDay}
        formula="Personal month + Day of month → reduced"
        description={getPersonalDayMeaning(cycles.personalDay)}
        color="#7b9ec9"
      />

      {criticalDays !== null && (
        <div className="py-4">
          <div className="rounded-lg px-4 py-3 text-[11px] font-medium"
            style={{ borderColor: '#c9707044', border: '1px solid', backgroundColor: '#c9707011', color: '#c97070' }}>
            ⚠️ {criticalDays} days until your next birthday — a critical transition period.
          </div>
        </div>
      )}
    </div>
  );
};

export default CyclesCard;