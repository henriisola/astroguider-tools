'use client';

import React, { useState, useEffect } from 'react';
import SiteLayout from '@/components/SiteLayout';
import { CyclesCard } from '@/components/CyclesCard';
import { getActiveProfile, ddmmyyyyToISO } from '@/hooks/useProfile';
import { getStoredMode } from '@/hooks/useMode';
import ProfileBanner from '@/components/ProfileBanner';
import KarmicNumbersSection from '@/components/KarmicNumbersSection';
import YearCycleTimeline from '@/components/YearCycleTimeline';

const STORAGE_KEY = 'astroguider_cycles_birthdate';

function pad(n: number) { return String(n).padStart(2, '0'); }
function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function Skeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[120, 96, 80].map((h, i) => (
        <div key={i} className="rounded-lg bg-zinc-800/60" style={{ height: h }} />
      ))}
    </div>
  );
}

function CycleRing({ label, number, color }: { label: string; number: number | null; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center border-2 text-2xl font-serif font-bold"
        style={{ borderColor: color, color }}>
        {number ?? '–'}
      </div>
      <span className="text-[10px] uppercase tracking-widest text-zinc-500">{label}</span>
    </div>
  );
}

export default function PersonalCyclesPage() {
  const [birthdate, setBirthdate] = useState('');
  const [cycles, setCycles] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFields, setShowFields] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isAdmin = getStoredMode() === 'admin';
    setShowFields(isAdmin);

    const profile = getActiveProfile();
    if (profile?.birthDate) {
      const iso = ddmmyyyyToISO(profile.birthDate);
      setBirthdate(iso);
      triggerAnalyze(iso);
      return;
    }

    if (!isAdmin) {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) { setBirthdate(saved); triggerAnalyze(saved); }
      } catch { /* silent */ }
    }
  }, []);

  const triggerAnalyze = async (date: string) => {
    if (!date) return;
    setLoading(true); setError(''); setCycles(null);
    try {
      const res = await fetch('/api/numero/cycles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthDate: date }),
      });
      if (!res.ok) throw new Error('API error');
      setCycles(await res.json());
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleAnalyze = async () => {
    if (!birthdate) return;
    try { localStorage.setItem(STORAGE_KEY, birthdate); } catch { /* silent */ }
    await triggerAnalyze(birthdate);
  };

  const handleReset = () => {
    setBirthdate(''); setCycles(null); setError('');
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* silent */ }
  };

  return (
    <SiteLayout>
      <div className="max-w-2xl mx-auto px-4">

        <section className="text-center mb-10 space-y-3">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-200">Your Personal Cycles</h1>
          <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Your personal numerological annual, monthly and daily cycle
          </p>
          <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#54ab8c] to-transparent opacity-50" />
        </section>

        <div className="bg-[#16181d] border border-zinc-800 rounded-xl p-6 mb-8 space-y-4 overflow-hidden">

          <ProfileBanner onEditChange={editing => setShowFields(editing)} />

          {showFields && (
            <div>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 mb-2 block">Date of Birth</span>
              <input
                type="date" value={birthdate} max={todayISO()}
                onChange={e => setBirthdate(e.target.value)}
                className="block w-full box-border bg-[#0b0c10] border border-zinc-800 px-4 py-3
                           rounded-lg text-zinc-200 focus:border-[#54ab8c] focus:outline-none
                           transition-colors min-h-[48px]"
              />
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={handleAnalyze} disabled={!birthdate || loading}
              className="flex-1 min-h-[48px] bg-[#c6a85b] hover:bg-[#b8964a] disabled:opacity-40
                         disabled:cursor-not-allowed text-[#0b0c10] font-semibold rounded-lg transition-colors text-sm">
              {loading ? 'Calculating…' : 'Calculate Cycles'}
            </button>
            {(cycles || birthdate) && (
              <button onClick={handleReset}
                className="min-h-[48px] px-5 border border-zinc-700 hover:border-zinc-500
                           text-zinc-400 rounded-lg transition-colors text-sm">
                Reset
              </button>
            )}
          </div>

          {error && <p className="text-red-400 text-[12px]">{error}</p>}
        </div>

        {loading && <Skeleton />}

        {!loading && cycles && (
          <div className="space-y-6">
            <div className="bg-[#16181d] border border-zinc-800 rounded-xl p-6">
              <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-5 text-center">Active cycles today</p>
              <div className="flex justify-around">
                <CycleRing label="Year"  number={cycles.personalYear}  color="#54ab8c" />
                <CycleRing label="Month" number={cycles.personalMonth} color="#c6a85b" />
                <CycleRing label="Day"   number={cycles.personalDay}   color="#7b9ec9" />
              </div>
            </div>
            <CyclesCard cycles={cycles} birthdate={birthdate} />
            <YearCycleTimeline birthDate={birthdate} />
            <div className="pt-4 pb-10 print:hidden">
              <button onClick={() => window.print()}
                className="bg-[#c6a85b] border border-zinc-700 hover:border-[#c6a85b]
                           text-zinc-400 hover:text-[#c6a85b] px-5 py-2 rounded-lg transition-colors text-[13px]">
                📄 Print / Save as PDF
              </button>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}