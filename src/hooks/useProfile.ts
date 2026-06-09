'use client';

import { useState, useEffect } from 'react';
import { getStoredMode } from '@/hooks/useMode';

// birthDate is stored as DD/MM/YYYY (e.g. "09/06/2025")
export interface UserProfile {
  fullName: string;
  birthDate: string;
}

const PROFILE_KEY = 'astroguider_profile_v1';
const ISO_RE = /^(\d{4})-(\d{2})-(\d{2})$/;
const DDMM_RE = /^(\d{2})\/(\d{2})\/(\d{4})$/;

// "2025-06-09" → "09/06/2025"
export function isoToDDMMYYYY(iso: string): string {
  if (!iso) return '';
  const m = ISO_RE.exec(iso);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : iso;
}

// "09/06/2025" → "2025-06-09"
export function ddmmyyyyToISO(d: string): string {
  if (!d) return '';
  const m = DDMM_RE.exec(d);
  return m ? `${m[3]}-${m[2]}-${m[1]}` : d;
}

export function getStoredProfile(): UserProfile | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UserProfile;
    if (parsed.birthDate && ISO_RE.test(parsed.birthDate)) {
      parsed.birthDate = isoToDDMMYYYY(parsed.birthDate);
      localStorage.setItem(PROFILE_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return null;
  }
}

// Returns profile only in user mode — admin always gets null (no autofill)
export function getActiveProfile(): UserProfile | null {
  const mode = getStoredMode();
  if (mode === 'admin') return null;
  return getStoredProfile();
}

export function saveProfile(profile: UserProfile): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
}

export function clearProfile(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROFILE_KEY);
}

export function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mode = getStoredMode();
    setProfile(mode === 'admin' ? null : getStoredProfile());
    setLoaded(true);
  }, []);

  const save = (p: UserProfile) => {
    saveProfile(p);
    setProfile(p);
  };

  const clear = () => {
    clearProfile();
    setProfile(null);
  };

  return { profile, loaded, save, clear };
}
