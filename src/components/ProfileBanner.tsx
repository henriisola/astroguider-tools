'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getStoredMode } from '@/hooks/useMode';
import { getStoredProfile, type UserProfile } from '@/hooks/useProfile';

interface Props {
  // Called when edit mode opens — parent can show/hide fields
  onEditChange: (editing: boolean) => void;
}

export default function ProfileBanner({ onEditChange }: Props) {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [editing, setEditing] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mode = getStoredMode();
    const p = getStoredProfile();
    setIsAdmin(mode === 'admin');
    setProfile(mode === 'admin' ? null : p);
    setLoaded(true);
  }, []);

  // Admin mode — no banner, fields always shown
  if (!loaded || isAdmin) return null;

  // User mode — no profile saved yet
  if (!profile) {
    return (
      <div className="flex items-center justify-between px-4 py-3 rounded-lg border border-zinc-800 bg-[#0b0c10] mb-2">
        <p className="text-zinc-600 text-[11px]">No profile saved</p>
        <Link
          href="/profile"
          className="text-[11px] transition-colors"
          style={{ color: '#c6a85b' }}
        >
          Set up profile →
        </Link>
      </div>
    );
  }

  // User mode — profile loaded
  const toggleEdit = () => {
    const next = !editing;
    setEditing(next);
    onEditChange(next);
  };

  const birthFormatted = profile.birthDate || null;

  return (
    <div
      className="flex items-center justify-between px-4 py-3 rounded-lg border mb-2"
      style={{ borderColor: '#c6a85b33', backgroundColor: '#c6a85b08' }}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="text-[10px]" style={{ color: '#c6a85b' }}>✓</span>
        <p className="text-zinc-300 text-[11px] truncate">
          {profile.fullName}
          {birthFormatted && (
            <span className="text-zinc-600"> · {birthFormatted}</span>
          )}
          {profile.birthTime && (
            <span className="text-zinc-600"> · {profile.birthTime}</span>
          )}
        </p>
      </div>
      <button
        onClick={toggleEdit}
        className="text-[11px] flex-shrink-0 ml-3 transition-colors"
        style={{ color: editing ? '#c6a85b' : '#52525b' }}
      >
        {editing ? 'Done ✕' : 'Edit ▾'}
      </button>
    </div>
  );
}