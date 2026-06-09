'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getStoredProfile } from '@/hooks/useProfile';

export default function ProfileIndicator() {
  const [initials, setInitials] = useState<string | null>(null);
  const [firstName, setFirstName] = useState<string | null>(null);

  useEffect(() => {
    const load = () => {
      const p = getStoredProfile();
      if (p?.fullName) {
        const parts = p.fullName.trim().split(' ');
        setFirstName(parts[0]);
        setInitials(parts[0][0].toUpperCase());
      } else {
        setFirstName(null);
        setInitials(null);
      }
    };

    load();
    window.addEventListener('storage', load);
    return () => window.removeEventListener('storage', load);
  }, []);

  const hasProfile = !!initials;

  return (
    <Link
      href="/profile"
      className="flex items-center gap-2 group"
      title={firstName ? `Profile: ${firstName}` : 'Set up your profile'}
    >
      <div
        className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-[12px] font-bold transition-colors flex-shrink-0"
        style={{
          borderColor: hasProfile ? '#c6a85b' : '#3f3f46',
          backgroundColor: hasProfile ? '#c6a85b18' : '#16181d',
          color: hasProfile ? '#c6a85b' : '#52525b',
        }}
      >
        {hasProfile ? initials : '?'}
      </div>
      <span
        className="text-[12px] transition-colors hidden sm:block"
        style={{ color: hasProfile ? '#c6a85b' : '#52525b' }}
      >
        {firstName ?? 'Profile'}
      </span>
    </Link>
  );
}