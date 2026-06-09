'use client';

import { useState, useEffect } from 'react';
import SiteLayout from '@/components/SiteLayout';
import { getActiveProfile, ddmmyyyyToISO } from '@/hooks/useProfile';
import { getStoredMode } from '@/hooks/useMode';
import ProfileBanner from '@/components/ProfileBanner';
import { PINNACLE_DEEP, CHALLENGE_DEEP } from '@/lib/pinnacleMeaningsDeep';

function pad(n: number) { return String(n).padStart(2, '0'); }
function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

function calcAge(birthDate: string): number {
  const b = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - b.getFullYear();
  if (today.getMonth() < b.getMonth() ||
    (today.getMonth() === b.getMonth() && today.getDate() < b.getDate())) age--;
  return age;
}

const PERIOD_LABELS = ['Age 0–34', 'Age 35–43', 'Age 44–52', 'Age 53+ · continues for life'];

const NUM_COLORS: Record<number, string> = {
  1:'#c6a85b', 2:'#7b9ec9', 3:'#e07b6a', 4:'#54ab8c',
  5:'#b07edb', 6:'#e8b86d', 7:'#6ab0c9', 8:'#c97070',
  9:'#7bc98a', 11:'#e8d5ff', 22:'#ffd700', 33:'#54ab8c',
};

const inputCls =
  'block w-full box-border bg-[#0b0c10] border border-zinc-800 px-4 py-3 rounded-lg ' +
  'text-zinc-200 focus:border-[#c6a85b] focus:outline-none transition-colors min-h-[48px] text-sm';

function NumberBadge({ n, size = 'md' }: { n: number; size?: 'sm' | 'md' | 'lg' }) {
  const color = NUM_COLORS[n] ?? '#c6a85b';
  const dim = size === 'lg' ? 'w-14 h-14 text-xl' : size === 'sm' ? 'w-8 h-8 text-sm' : 'w-11 h-11 text-base';
  return (
    <div className={`${dim} rounded-full border-2 flex items-center justify-center font-bold font-serif flex-shrink-0`}
      style={{ borderColor: color, color, backgroundColor: `${color}11` }}>
      {n}
    </div>
  );
}

function TagList({ items, color }: { items: string[]; color: string }) {
  return (
    <div className="space-y-2">
      {items.map((item, i) => (
        <div key={i} className="flex gap-2">
          <span className="flex-shrink-0 text-xs mt-[2px]" style={{ color }}>◆</span>
          <p className="text-zinc-400 text-[11px] leading-relaxed">{item}</p>
        </div>
      ))}
    </div>
  );
}

function PinnacleBlock({ index, pinnacle, challenge, age, isActive, isPast }: {
  index: number; pinnacle: number; challenge: number;
  age: number | null; isActive: boolean; isPast: boolean;
}) {
  const pm = PINNACLE_DEEP[pinnacle];
  const cm = CHALLENGE_DEEP[challenge];
  const pc = NUM_COLORS[pinnacle] ?? '#c6a85b';
  const cc = NUM_COLORS[challenge] ?? '#c97070';

  return (
    <div className="rounded-xl border overflow-hidden transition-opacity"
      style={{ borderColor: isActive ? `${pc}55` : '#27272a', opacity: isPast ? 0.6 : 1 }}>

      <div className="px-5 py-3 flex items-center justify-between"
        style={{ backgroundColor: isActive ? `${pc}0a` : '#16181d' }}>
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-600">
            Period {index + 1} · {PERIOD_LABELS[index]}
          </p>
          {isActive && (
            <span className="inline-block text-[10px] px-2 py-[1px] rounded-full font-mono mt-1"
              style={{ color: pc, backgroundColor: `${pc}18` }}>
              You are here
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <NumberBadge n={pinnacle} size="md" />
          <span className="text-zinc-700 text-xs">vs</span>
          <div className="w-11 h-11 rounded-full border-2 flex items-center justify-center text-base font-bold font-serif flex-shrink-0"
            style={{ borderColor: `${cc}88`, color: cc, backgroundColor: `${cc}11` }}>
            {challenge}
          </div>
        </div>
      </div>

      <div className="px-5 py-5 space-y-6 bg-[#16181d]">
        {pm && (
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: `${pc}99` }}>Pinnacle {pinnacle}</p>
              <p className="text-zinc-200 text-sm font-semibold">{pm.title}</p>
              <p className="text-[10px] font-mono mt-0.5" style={{ color: `${pc}88` }}>{pm.theme}</p>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">{pm.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#54ab8c] mb-2">Gifts</p>
                <TagList items={pm.gifts} color="#54ab8c" />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-2">Demands</p>
                <TagList items={pm.demands} color="#7b9ec9" />
              </div>
            </div>
            <div className="rounded-lg px-4 py-3 border" style={{ borderColor: '#3f3f46', backgroundColor: '#0b0c10' }}>
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Shadow side</p>
              <p className="text-zinc-500 text-[11px] leading-relaxed">{pm.shadow}</p>
            </div>
            <div className="rounded-lg px-4 py-3 border" style={{ borderColor: `${pc}33`, backgroundColor: `${pc}08` }}>
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: `${pc}88` }}>Affirmation</p>
              <p className="text-[12px] italic leading-relaxed" style={{ color: pc }}>{pm.affirmation}</p>
            </div>
          </div>
        )}

        <div className="h-px bg-zinc-800" />

        {cm && (
          <div className="space-y-4">
            <div>
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: `${cc}99` }}>Challenge {challenge}</p>
              <p className="text-zinc-200 text-sm font-semibold">{cm.title}</p>
            </div>
            <p className="text-zinc-400 text-[11px] leading-relaxed">{cm.description}</p>
            <div className="rounded-lg px-4 py-3 border" style={{ borderColor: '#3f3f46', backgroundColor: '#0b0c10' }}>
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-1">Core lesson</p>
              <p className="text-zinc-300 text-[11px] leading-relaxed italic">{cm.lesson}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-[#c97070] mb-2">Watch for</p>
              <TagList items={cm.watchFor} color="#c97070" />
            </div>
            <div className="rounded-lg px-4 py-3 border" style={{ borderColor: `${cc}33`, backgroundColor: `${cc}08` }}>
              <p className="text-[10px] uppercase tracking-widest mb-1" style={{ color: `${cc}88` }}>Growth path</p>
              <p className="text-zinc-400 text-[11px] leading-relaxed">{cm.growthPath}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function PinnaclesPage() {
  const [birthDate, setBirthDate] = useState('');
  const [data, setData] = useState<{ pinnacles: number[]; challenges: number[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFields, setShowFields] = useState(false);

  useEffect(() => {
    const isAdmin = getStoredMode() === 'admin';
    setShowFields(isAdmin);

    const p = getActiveProfile();
    if (p?.birthDate) {
      const iso = ddmmyyyyToISO(p.birthDate);
      setBirthDate(iso);
      triggerAnalyze(iso);
    }
  }, []);

  const triggerAnalyze = async (date: string) => {
    if (!date) return;
    setLoading(true); setError(''); setData(null);
    try {
      const res = await fetch('/api/numero/pinnacles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthDate: date }),
      });
      if (!res.ok) throw new Error('API error');
      setData(await res.json());
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleReset = () => { setBirthDate(''); setData(null); setError(''); };

  const age = birthDate ? calcAge(birthDate) : null;
  const getActivePeriod = (age: number | null) => {
    if (age === null) return -1;
    if (age < 35) return 0;
    if (age < 44) return 1;
    if (age < 53) return 2;
    return 3;
  };
  const activePeriod = getActivePeriod(age);

  return (
    <SiteLayout>
      <div className="max-w-2xl mx-auto px-4">

        <section className="text-center mb-10 space-y-3">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-200">Pinnacles &amp; Challenges</h1>
          <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Your four life phases — what each cycle demands, what it offers, and how to navigate it.
          </p>
          <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#c6a85b] to-transparent opacity-40" />
        </section>

        <div className="bg-[#16181d] border border-zinc-800 rounded-xl p-6 mb-8 space-y-4 overflow-hidden">

          <ProfileBanner onEditChange={editing => setShowFields(editing)} />

          {showFields && (
            <div>
              <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Date of birth</label>
              <input type="date" value={birthDate} max={todayISO()}
                onChange={e => setBirthDate(e.target.value)} className={inputCls} />
            </div>
          )}

          <div className="flex gap-3">
            <button onClick={() => triggerAnalyze(birthDate)} disabled={!birthDate || loading}
              className="flex-1 min-h-[48px] bg-[#c6a85b] hover:bg-[#b8964a] disabled:opacity-40
                         disabled:cursor-not-allowed text-[#0b0c10] font-semibold rounded-lg transition-colors text-sm">
              {loading ? 'Calculating…' : 'Calculate Pinnacles'}
            </button>
            {(data || birthDate) && (
              <button onClick={handleReset}
                className="px-5 min-h-[48px] border border-zinc-700 hover:border-zinc-500
                           text-zinc-400 rounded-lg transition-colors text-sm">
                Reset
              </button>
            )}
          </div>

          {error && <p className="text-red-400 text-[12px]">{error}</p>}
        </div>

        {data && (
          <div className="space-y-6">
            <div className="bg-[#16181d] border border-zinc-800 rounded-xl p-5">
              <p className="text-[10px] uppercase tracking-widest text-zinc-600 mb-4">Your four pinnacles</p>
              <div className="flex justify-around">
                {data.pinnacles.map((p, i) => (
                  <div key={i} className="flex flex-col items-center gap-1">
                    <NumberBadge n={p} size={i === activePeriod ? 'lg' : 'sm'} />
                    <span className="text-[9px] text-zinc-600 uppercase tracking-widest text-center">
                      {['P1', 'P2', 'P3', 'P4'][i]}
                    </span>
                    {i === activePeriod && (
                      <span className="text-[9px]" style={{ color: NUM_COLORS[p] ?? '#c6a85b' }}>now</span>
                    )}
                  </div>
                ))}
              </div>
              {age !== null && (
                <p className="text-center text-zinc-600 text-[10px] mt-4">
                  Age {age} · Period {activePeriod + 1} active
                </p>
              )}
            </div>

            {data.pinnacles.map((pinn, i) => (
              <PinnacleBlock key={i} index={i} pinnacle={pinn} challenge={data.challenges[i]}
                age={age} isActive={i === activePeriod} isPast={age !== null && i < activePeriod} />
            ))}

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