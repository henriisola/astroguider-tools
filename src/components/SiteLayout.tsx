'use client';

import React from 'react';
import Link from 'next/link';
import ProfileIndicator from '@/components/ProfileIndicator';
import ModeToggle from '@/components/ModeToggle';

// Add to your global CSS or _app.tsx:
// import { Cormorant_Garamond, DM_Mono, Outfit } from 'next/font/google'

interface SiteLayoutProps {
  children: React.ReactNode;
  showBackToHome?: boolean;
}

export default function SiteLayout({ children, showBackToHome = true }: SiteLayoutProps) {
  return (
    <div className="min-h-screen bg-[#080a0e] text-zinc-300" style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* Starfield */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `radial-gradient(1px 1px at 10% 15%, rgba(255,255,255,0.15) 0%, transparent 100%),
                            radial-gradient(1px 1px at 30% 45%, rgba(255,255,255,0.1) 0%, transparent 100%),
                            radial-gradient(1.5px 1.5px at 55% 20%, rgba(255,255,255,0.12) 0%, transparent 100%),
                            radial-gradient(1px 1px at 75% 60%, rgba(255,255,255,0.08) 0%, transparent 100%),
                            radial-gradient(1px 1px at 90% 10%, rgba(255,255,255,0.1) 0%, transparent 100%),
                            radial-gradient(1.5px 1.5px at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 100%),
                            radial-gradient(1px 1px at 45% 70%, rgba(255,255,255,0.08) 0%, transparent 100%),
                            radial-gradient(1px 1px at 65% 90%, rgba(255,255,255,0.06) 0%, transparent 100%),
                            radial-gradient(1.5px 1.5px at 85% 35%, rgba(255,255,255,0.12) 0%, transparent 100%),
                            radial-gradient(1px 1px at 5% 55%, rgba(255,255,255,0.09) 0%, transparent 100%)`,
        }} />
        {/* Subtle gold orb top right */}
        <div style={{
          position: 'absolute', top: -200, right: -200,
          width: 600, height: 600, borderRadius: '50%',
          background: 'rgba(198,168,91,0.03)',
          filter: 'blur(80px)',
        }} />
        {/* Subtle teal orb bottom left */}
        <div style={{
          position: 'absolute', bottom: -100, left: -150,
          width: 400, height: 400, borderRadius: '50%',
          background: 'rgba(84,171,140,0.04)',
          filter: 'blur(80px)',
        }} />
      </div>

      {/* Header */}
      <header className="border-b border-zinc-800/60 bg-[#080a0e]/90 backdrop-blur-md sticky top-0 z-50 print:static print:backdrop-blur-none">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
          <div className="flex items-center justify-between">

            {/* Typographic logo */}
            <Link href="/" className="group inline-flex items-center gap-0.5 py-1 no-underline print:hidden">
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.3rem',
                fontWeight: 600,
                color: '#c6a85b',
                letterSpacing: '0.04em',
                lineHeight: 1.15,
                transition: 'color 0.2s',
              }}
              className="group-hover:text-[#e8cc8a]"
              >
                Astroguider
              </span>
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: '1.3rem',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#4a4a52',
                letterSpacing: '0.04em',
                lineHeight: 1.15,
                transition: 'color 0.2s',
              }}
              className="group-hover:text-zinc-500"
              >
                .app
              </span>
            </Link>

            {/* Print logo (text only, no interactivity needed) */}
            <div className="hidden print:block" style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '1.3rem',
              fontWeight: 600,
              color: '#c6a85b',
            }}>
              Astroguider.app
            </div>

            {/* Right side nav */}
            <div className="flex items-center gap-3">
              
              <ProfileIndicator />
              {showBackToHome && (
                <Link
                  href="/"
                  className="text-[12px] text-zinc-600 hover:text-[#c6a85b] transition-colors"
                  style={{ fontFamily: "'DM Mono', monospace", letterSpacing: '0.08em' }}
                >
                  ← home
                </Link>
              )}
            </div>

          </div>

          {/* Gold gradient line */}
          <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[#c6a85b] to-transparent opacity-20 print:hidden" />
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 relative z-10">
        {children}
      </main>

      {/* Footer */}
      <footer className="mt-16 py-8 border-t border-zinc-800/60 bg-[#080a0e] relative z-10 print:hidden">
        <div className="max-w-6xl mx-auto px-4 py-6 text-center space-y-4">
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: '1.1rem',
            fontWeight: 600,
            color: '#c6a85b',
            opacity: 0.6,
          }}>
            Astroguider<span style={{ fontWeight: 300, fontStyle: 'italic' }}>.app</span>
          </div>
          
          <p style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#3a3a42',
          }}>
            © 2026 Henri I Consulting LTD · All rights reserved
          </p>
        </div>
      </footer>

    </div>
  );
}