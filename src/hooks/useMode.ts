'use client';

import { useState, useEffect } from 'react';

export type AppMode = 'user' | 'admin';

const MODE_KEY = 'astroguider_mode';

export function getStoredMode(): AppMode {
  if (typeof window === 'undefined') return 'user';
  try {
    const raw = localStorage.getItem(MODE_KEY);
    return raw === 'admin' ? 'admin' : 'user';
  } catch {
    return 'user';
  }
}

export function setStoredMode(mode: AppMode): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(MODE_KEY, mode);
}

export function useMode() {
  const [mode, setMode] = useState<AppMode>('user');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setMode(getStoredMode());
    setLoaded(true);
  }, []);

  const toggle = () => {
    const next: AppMode = mode === 'user' ? 'admin' : 'user';
    setStoredMode(next);
    setMode(next);
  };

  const isAdmin = mode === 'admin';
  const isUser = mode === 'user';

  return { mode, isAdmin, isUser, toggle, loaded };
}