'use client';

import React, { useState, useEffect } from 'react';
import SiteLayout from '@/components/SiteLayout';
import NumerologyLayout from '@/components/NumerologyLayout';
import { calculateFullNumerologyProfile } from '@/lib/numerology';
import NumerologyGuide from '@/components/NumerologyGuide';
import { SpiritualGiftCard } from '@/components/SpiritualGiftCard';
import KarmicNumbersSection from '@/components/KarmicNumbersSection';
import { getActiveProfile, ddmmyyyyToISO } from '@/hooks/useProfile';
import { getStoredMode } from '@/hooks/useMode';
import ProfileBanner from '@/components/ProfileBanner';

const inputCls =
  'block w-full box-border bg-[#0b0c10] border border-zinc-800 px-4 py-3 rounded-lg ' +
  'text-zinc-200 placeholder-zinc-600 focus:border-[#c6a85b] focus:outline-none ' +
  'transition-colors min-h-[48px] text-sm';

export default function PrivateNumerologyPage() {
  const [fullName, setFullName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [numero, setNumero] = useState<any | null>(null);
  const [aiInsights, setAIInsights] = useState<any | null>(null);
  const [show, setShow] = useState(false);
  const [name, setName] = useState('Anonymous');
  const [nameProfile, setNameProfile] = useState<{ vowels: any[]; consonants: any[] }>({ vowels: [], consonants: [] });
  const [profileLoaded, setProfileLoaded] = useState(false);
  const [showFields, setShowFields] = useState(false);

  // Auto-fill from profile (user mode only — admin gets blank)
  useEffect(() => {
    const mode = getStoredMode();
    const isAdmin = mode === 'admin';
    setShowFields(isAdmin); // admin always sees fields; user sees banner by default
    const p = getActiveProfile();
    if (p) {
      if (p.fullName && !fullName) setFullName(p.fullName);
      if (p.birthDate && !birthdate) setBirthdate(ddmmyyyyToISO(p.birthDate));
    }
    setProfileLoaded(true);
  }, []);

  const calculateAge = (birthdate: string) => {
    if (!birthdate) return null;
    const birth = new Date(birthdate);
    const today = new Date();
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
    return age;
  };

  const currentAge = birthdate ? calculateAge(birthdate) : null;

  const handleAnalyze = async () => {
    const n = fullName.trim();
    const birthDate = birthdate;

    const promises: Promise<any>[] = [];

    // Core numerology — needs birthdate, name optional
    if (birthDate || n) {
      promises.push(
        fetch('/api/numero/core', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: n || '', birthDate: birthDate || '' }),
        }).then(r => r.json()).catch(() => null)
      );
    } else {
      promises.push(Promise.resolve(null));
    }

    const [numData] = await Promise.all(promises);

    if (n) setNameProfile(calculateFullNumerologyProfile(n));
    setName(n || 'Anonymous');
    setNumero(numData);
    setShow(true);
  };

  const resetForm = () => {
    setFullName('');
    setBirthdate('');
    setNumero(null);
    setAIInsights(null);
    setShow(false);
  };

  return (
    <SiteLayout>
      <div className="max-w-2xl mx-auto px-4">

        <section className="text-center mb-8 space-y-4">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-200">
            Numerology
          </h1>
          <p className="text-sm text-zinc-400">
            Pythagorean numerology — Life Path, Expression, Soul Urge and more
          </p>
          <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#c6a85b] to-transparent opacity-40" />
        </section>

        <div className="print:hidden">
          <NumerologyGuide />
        </div>

        {/* Input card */}
        <div className="bg-[#16181d] border border-zinc-800 rounded-xl p-6 mb-8 space-y-4 overflow-hidden">

          <ProfileBanner onEditChange={editing => setShowFields(editing)} />

          {/* Fields — always shown in admin, toggled in user mode */}
          {showFields && (
            <>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                  Full birth name
                </label>
                <input
                  value={fullName}
                  onChange={e => setFullName(e.target.value)}
                  placeholder="As on birth certificate"
                  autoComplete="new-password"
                  autoCorrect="off"
                  spellCheck={false}
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
                    Date of birth
                  </label>
                  <input
                    type="date"
                    value={birthdate}
                    onChange={e => setBirthdate(e.target.value)}
                    className={inputCls}
                  />
                </div>
                
              </div>
            </>
          )}

          <div className="flex gap-3 pt-1">
            <button
              onClick={handleAnalyze}
              disabled={!fullName.trim() && !birthdate}
              className="flex-1 min-h-[48px] bg-[#c6a85b] hover:bg-[#b8964a] disabled:opacity-40
                         disabled:cursor-not-allowed text-[#0b0c10] font-semibold rounded-lg
                         transition-colors text-sm"
            >
              Analyze
            </button>
            <button
              onClick={resetForm}
              className="px-5 min-h-[48px] border border-zinc-700 hover:border-zinc-500
                         text-zinc-400 rounded-lg transition-colors text-sm"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Results */}
        {show && (
          <div className="space-y-6">

            <NumerologyLayout
              overviewProps={{
                phrase: name,
                currentAge,
                lifePath: numero.lifePath,
                lifePathRaw: numero.lifePathRaw,
                birthdayNumber: numero.birthdayNumber,
                soulUrge: numero?.soulUrge?.final,
                soulUrgeRaw: fullName.trim() ? numero?.soulUrge?.raw : undefined,
                personality: fullName.trim() ? (numero?.personality?.final ?? numero?.personality) : undefined,
                personalityRaw: fullName.trim() ? (numero?.personality?.raw ?? numero?.personality) : undefined,
                expression: fullName.trim() ? (numero?.expression?.final ?? numero?.expression) : undefined,
                expressionRaw: fullName.trim() ? (numero?.expression?.raw ?? numero?.expression) : undefined,
                vowels: fullName.trim() ? nameProfile.vowels : [],
                consonants: fullName.trim() ? nameProfile.consonants : [],
              }}
              
            />

            {numero?.birthdayNumber && (
              <SpiritualGiftCard birthdayNumber={numero.birthdayNumber} />
            )}

            {birthdate && (
              <KarmicNumbersSection birthDate={birthdate} fullName={fullName.trim() || undefined} />
            )}

            <div className="flex gap-3 pt-4 pb-10 print:hidden">
              <button
                onClick={() => window.print()}
                className="bg-[#c6a85b] border border-zinc-700 hover:border-[#c6a85b]
                           text-zinc-400 hover:text-[#c6a85b] px-5 py-2 rounded-lg
                           transition-colors text-[13px]"
              >
                📄 Print / Save as PDF
              </button>
             </div>
             </div>
        )}
      </div>
    </SiteLayout>
  );
}