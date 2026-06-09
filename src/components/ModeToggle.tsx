'use client';

import { useMode } from '@/hooks/useMode';

interface ModeToggleProps {
  footer?: boolean;
}

export default function ModeToggle({ footer = false }: ModeToggleProps) {
  const { mode, isAdmin, toggle, loaded } = useMode();

  if (!loaded) return null;

  if (footer) {
    return (
      <button
        onClick={toggle}
        title={isAdmin ? 'Switch to User mode' : 'Switch to Admin mode'}
        className="flex items-center gap-1.5 px-2 py-1 rounded-md border transition-colors text-[10px] font-mono uppercase tracking-widest mx-auto"
        style={{
          borderColor: isAdmin ? '#c6a85b55' : '#3f3f4644',
          backgroundColor: isAdmin ? '#c6a85b11' : 'transparent',
          color: isAdmin ? '#c6a85b' : '#3f3f46',
        }}
      >
        {isAdmin ? (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-[#c6a85b]" />
            Admin
          </>
        ) : (
          <>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
            User
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      title={isAdmin ? 'Switch to User mode' : 'Switch to Admin mode'}
      className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-md border transition-colors text-[10px] font-mono uppercase tracking-widest"
      style={{
        borderColor: isAdmin ? '#c6a85b55' : '#3f3f46',
        backgroundColor: isAdmin ? '#c6a85b11' : 'transparent',
        color: isAdmin ? '#c6a85b' : '#52525b',
      }}
    >
      {isAdmin ? (
        <>
          <span className="w-1.5 h-1.5 rounded-full bg-[#c6a85b]" />
          Admin
        </>
      ) : (
        <>
          <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
          User
        </>
      )}
    </button>
  );
}