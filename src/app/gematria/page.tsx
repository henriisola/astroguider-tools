'use client';

import { useState, useEffect, Fragment } from 'react';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import { analyzeWord } from '@/lib/gematria/gematriaEngine';
import { storeWord, getResonances } from '@/lib/gematria/numberMemory';

export default function GematriaPage() {
  const [input, setInput] = useState('');
  const [analysis, setAnalysis] = useState<any>(null);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!input) { setAnalysis(null); return; }
    const result = analyzeWord(input);
    result.results.forEach((r: any) => { storeWord(r.cipher, r.total, input); });
    setAnalysis(result);
  }, [input]);

  const handleClear = () => { setInput(''); setAnalysis(null); setExpanded({}); };

  return (
    <SiteLayout>
      <section className="text-center space-y-3 mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-200">
        Multi-Cipher Word Analysis
        </h1>
        <p className="text-sm text-zinc-400">
          Pythagorean, Chaldean, Hebrew, Greek &amp; English cipher analysis
        </p>
        <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#5a4b8c] to-transparent opacity-50" />
      </section>

      <div className="flex justify-end mb-6">
        <Link href="/gematria/research"
          className="text-[13px] text-zinc-400 hover:text-[#c6a85b] transition-colors">
          Multi-Cipher Comparison →
        </Link>
      </div>

      <div className="bg-[#16181d] border border-zinc-800 rounded-xl p-6 mb-6 overflow-hidden">
        <div className="flex gap-3">
          <input
            className="block flex-1 box-border bg-[#0b0c10] border border-zinc-800 text-zinc-200 px-4 py-3 rounded-lg placeholder-zinc-600 focus:border-[#5a4b8c] focus:outline-none transition-colors text-sm min-h-[48px]"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="English, Hebrew or Greek text"
            autoComplete="new-password"
            autoCorrect="off"
            spellCheck={false}
          />
          <button
            onClick={handleClear}
            className="px-5 min-h-[48px] border border-zinc-700 hover:border-zinc-500 text-zinc-400 rounded-lg transition-colors text-sm flex-shrink-0">
            Clear
          </button>
        </div>
      </div>

      {analysis && analysis.results.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-zinc-800 bg-[#16181d]">
          <table className="min-w-full table-auto">
            <thead className="bg-[#0b0c10] text-left text-[12px] border-b border-zinc-800">
              <tr>
                {['Cipher','Group','Sum','Root','Breakdown','Cross'].map(h => (
                  <th key={h} className="px-4 py-3 text-zinc-400 font-medium uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {analysis.results.map((row: any) => {
                const resonances = getResonances(row.cipher, row.total);
                return (
                  <Fragment key={row.cipher}>
                    <tr className="hover:bg-zinc-800/30 transition-colors">
                      <td className="px-4 py-3 text-zinc-200 font-medium text-sm">{row.cipher}</td>
                      <td className="px-4 py-3 text-zinc-400 text-sm">{row.group}</td>
                      <td className="px-4 py-3 text-zinc-200 text-sm font-mono">{row.total}</td>
                      <td className="px-4 py-3 text-zinc-400 text-sm font-mono">{row.digitalRoot}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => setExpanded(e => ({ ...e, [row.cipher]: !e[row.cipher] }))}
                          className="rounded-lg border border-zinc-700 hover:border-[#5a4b8c] px-2 py-1 text-[11px] text-zinc-400 hover:text-zinc-200 transition-colors">
                          {expanded[row.cipher] ? 'Hide' : 'Show'}
                        </button>
                        {expanded[row.cipher] && (
                          <div className="mt-2 flex flex-wrap gap-1.5 text-[11px]">
                            {row.breakdown.map((b: any, i: number) => (
                              <span key={i}
                                className="inline-flex items-center gap-1 rounded border border-zinc-700 px-2 py-1 text-zinc-400">
                                <span className="font-medium text-zinc-300">{b.char}</span>
                                <span className="opacity-60">{b.value}</span>
                              </span>
                            ))}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm">{row.crossMatch ? '⚡' : ''}</td>
                    </tr>
                    {resonances.length > 1 && (
                      <tr className="bg-[#0b0c10]">
                        <td colSpan={5} className="px-4 py-2 text-[11px]">
                          <span className="font-semibold text-zinc-400">
                            Resonances ({resonances.length - 1}):
                          </span>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {resonances
                              .filter((r: any) => r.word !== input)
                              .map((r: any, i: number) => (
                                <span key={i}
                                  className="border border-zinc-700 px-2 py-1 rounded text-zinc-500 text-[11px]">
                                  {r.word}
                                </span>
                              ))}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </SiteLayout>
  );
}