'use client';
import React from 'react';
import { NumerologyOverviewCard } from '@/components/ui/NumerologyOverviewCard';
import { CyclesCard } from '@/components/CyclesCard';
import { GematriaCardEnhanced } from '@/components/GematriaCardEnhanced';

type Props = {
  overviewProps: any;
  cyclesProps?: { cycles: any; birthdate: string };
  gematriaProps?: {
    phrase: string;
    value: number;
    reduced: number;
    parts: any[];
    aiInsight?: any;
    soulUrge: number;
    birthdate: string;
  };
  children?: React.ReactNode;
};

export default function NumerologyLayout({
  overviewProps,
  cyclesProps,
  gematriaProps,
  children,
}: Props) {
  return (
    <div className="w-full space-y-6">
      <NumerologyOverviewCard {...overviewProps} />
      {cyclesProps && <CyclesCard {...cyclesProps} />}
      {gematriaProps && <GematriaCardEnhanced {...gematriaProps} />}
      {children && <div className="space-y-6">{children}</div>}
    </div>
  );
}