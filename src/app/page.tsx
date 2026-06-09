'use client';

import React from 'react';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';

const PAGES = [
  {
    title: 'Numerology',
    description: 'Pythagorean numerology — Life Path, Expression, Soul Urge, Birthday number and personal cycles',
    href: '/numerology',
    accent: '#c6a85b'
  },
  {
    title: 'Numerology and Astrology Calendar',
    description: 'Numerological and astrological annual, monthly and daily cycles at a glance',
    href: '/calendar',
    accent: '#54ab8c'
  },
  {
    title: 'Your Personal Cycles',
    description: 'Your personal numerological annual, monthly and daily cycle',
    href: '/numerology/cycles',
    accent: '#54ab8c'
  },
  {
    title: 'Pinnacles & Challenges',
    description: 'A deep dive into your four life phases — what each cycle demands and what it offers',
    href: '/pinnacles',
    accent: '#c6a85b'
  },
  {
    title: 'Multi-Cipher Word Analysis',
    description: 'Pythagorean, Hebrew, Greek & English cipher analysis',
    href: '/gematria',
    accent: '#7b9ec9'
  },
];

export default function HomePage() {
  return (
    <SiteLayout showBackToHome={false}>

      {/* Hero */}
      <section className="text-center mb-8 space-y-4">
        <h1 className="text-2xl md:text-3xl font-serif font-bold text-zinc-200 leading-snug">
          Explore the patterns<br className="hidden sm:block" /> beneath your life
        </h1>
        <p className="text-sm text-zinc-500 max-w-md mx-auto leading-relaxed">
          Numerology, astrology and symbolic systems — integrated into one analytical platform.
        </p>
        <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#c6a85b] to-transparent opacity-40 mt-2" />
      </section>

      {/* Cards */}
      <section className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PAGES.map((page) => (
            <PageCard key={page.href} page={page} />
          ))}
        </div>
      </section>

    </SiteLayout>
  );
}

function PageCard({ page }: {
  page: { title: string; description: string; href: string; accent: string };
}) {
  return (
    <Link
      href={page.href}
      className="group bg-[#16181d] border border-zinc-800 rounded-xl p-5 hover:border-zinc-600 transition-colors duration-200 relative"
      style={{ ['--accent' as any]: page.accent }}
    >
      <div className="flex items-start gap-3 mb-3">
        <div>
          <h3
            className="text-sm font-semibold leading-snug mb-1 transition-colors"
            style={{ color: '#c6a85b' }}
          >
            {page.title}
          </h3>
          <div
            className="h-px w-8 opacity-40 mb-2"
            style={{ backgroundColor: page.accent }}
          />
          <p className="text-zinc-500 text-[11px] leading-relaxed">
            {page.description}
          </p>
        </div>
      </div>
      <div
        className="text-[11px] ml-8 opacity-0 group-hover:opacity-100 transition-opacity"
        style={{ color: page.accent }}
      >
        Explore →
      </div>
    </Link>
  );
}