'use client';

import { useState, useEffect } from 'react';
import SiteLayout from '@/components/SiteLayout';
import { useProfile, isoToDDMMYYYY, ddmmyyyyToISO } from '@/hooks/useProfile';

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

const inputCls =
  'block w-full box-border bg-[#0b0c10] border border-zinc-800 px-4 py-3 rounded-lg ' +
  'text-zinc-200 placeholder-zinc-600 focus:border-[#c6a85b] focus:outline-none ' +
  'transition-colors min-h-[48px] text-sm';

export default function ProfilePage() {
  const { profile, loaded, save, clear } = useProfile();

  const [fullName, setFullName] = useState('');
  // Local form state for the <input type="date"> uses ISO; storage uses DD/MM/YYYY.
  const [birthDateISO, setBirthDateISO] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setFullName(profile.fullName);
      setBirthDateISO(ddmmyyyyToISO(profile.birthDate));
      setBirthTime(profile.birthTime ?? '');
    }
  }, [profile]);

  const handleSave = () => {
    if (!fullName.trim() || !birthDateISO) return;
    save({
      fullName: fullName.trim(),
      birthDate: isoToDDMMYYYY(birthDateISO),
      birthTime,
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleClear = () => {
    clear();
    setFullName('');
    setBirthDateISO('');
    setBirthTime('');
  };

  if (!loaded) return null;

  return (
    <SiteLayout>
      <div className="max-w-lg mx-auto px-4">

        {/* Header */}
        <section className="text-center mb-10 space-y-3">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-200">
            Your Profile
          </h1>
          <p className="text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
            Save your details once — every tool fills in automatically.
          </p>
          <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#c6a85b] to-transparent opacity-40" />
        </section>

        {/* Form */}
        <div className="bg-[#16181d] border border-zinc-800 rounded-xl p-6 space-y-5 overflow-hidden">

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
            <p className="text-zinc-700 text-[10px] mt-1">
              Include all names — first, middle and last.
            </p>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
              Date of birth
            </label>
            <input
              type="date"
              value={birthDateISO}
              max={todayISO()}
              onChange={e => setBirthDateISO(e.target.value)}
              className={inputCls}
            />
            <p className="text-zinc-700 text-[10px] mt-1">
              Stored as DD/MM/YYYY.
            </p>
          </div>

          <div>
            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">
              Birth time{' '}
              <span className="text-zinc-700 normal-case tracking-normal">(optional)</span>
            </label>
            <input
              type="time"
              value={birthTime}
              onChange={e => setBirthTime(e.target.value)}
              className={inputCls}
            />
            <p className="text-zinc-700 text-[10px] mt-1">
              Used for Chinese Zodiac hour sign. Leave blank if unknown.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              onClick={handleSave}
              disabled={!fullName.trim() || !birthDateISO}
              className="flex-1 min-h-[48px] bg-[#c6a85b] hover:bg-[#b8964a] disabled:opacity-40
                         disabled:cursor-not-allowed text-[#0b0c10] font-semibold rounded-lg
                         transition-colors text-sm"
            >
              {saved ? '✓ Saved' : 'Save profile'}
            </button>
            {profile && (
              <button
                onClick={handleClear}
                className="px-5 min-h-[48px] border border-zinc-700 hover:border-zinc-500
                           text-zinc-400 rounded-lg transition-colors text-sm"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Status */}
        {profile && (
          <div className="mt-6 bg-[#16181d] border border-zinc-800 rounded-xl p-5 space-y-3">
            <p className="text-[10px] uppercase tracking-widest text-zinc-600">
              Currently saved
            </p>
            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-zinc-600 text-[11px] w-12 flex-shrink-0">Name:</span>
                <span className="text-zinc-200 text-[11px]">{profile.fullName}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-zinc-600 text-[11px] w-12 flex-shrink-0">Born:</span>
                <span className="text-zinc-200 text-[11px]">
                  {profile.birthDate}
                  {profile.birthTime && ` at ${profile.birthTime}`}
                </span>
              </div>
            </div>
            <p className="text-zinc-600 text-[10px] pt-1">
              ✓ All tools will use these details automatically.
            </p>
          </div>
        )}

      </div>
    </SiteLayout>
  );
}