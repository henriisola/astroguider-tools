'use client';

import { useState } from 'react';
import Link from 'next/link';
import SiteLayout from '@/components/SiteLayout';
import { compareWords } from '@/lib/gematria/gematriaEngine';
import { symbolicSummary } from '@/lib/gematria/symbolicLayer';
import { storeWord, getResonances } from '@/lib/gematria/numberMemory';

export default function GematriaResearchPage() {
  const [inputA, setInputA] = useState('');
  const [inputB, setInputB] = useState('');
  const [result, setResult] = useState<any>(null);

  const handleCompare = () => {
    if (!inputA || !inputB) return;
    const comparison = compareWords(inputA, inputB);
    comparison.a.results.forEach((r: any) => { storeWord(r.cipher, r.total, inputA); });
    comparison.b.results.forEach((r: any) => { storeWord(r.cipher, r.total, inputB); });
    setResult(comparison);
  };

  const handleClear = () => { setInputA(''); setInputB(''); setResult(null); };

  const inputCls = "block w-full box-border bg-[#0b0c10] border border-zinc-800 text-zinc-200 px-4 py-3 rounded-lg placeholder-zinc-600 focus:border-[#5a4b8c] focus:outline-none transition-colors text-sm min-h-[48px]";

  return (
    <SiteLayout>
      <section className="text-center space-y-3 mb-8">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-zinc-200">
        Multi-Cipher Word Comparison
        </h1>
        <p className="text-sm text-zinc-400">
          Compare two words or concepts across multiple cipher
        </p>
        <div className="mx-auto w-24 h-px bg-gradient-to-r from-transparent via-[#5a4b8c] to-transparent opacity-50" />
      </section>

      <div className="flex justify-start mb-6">
        <Link href="/gematria"
          className="text-[13px] text-zinc-400 hover:text-[#c6a85b] transition-colors">
          ← Back to Multi-Cipher
        </Link>
      </div>

      <div className="bg-[#16181d] border border-zinc-800 rounded-xl p-6 mb-8 overflow-hidden space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Word / Concept A</label>
            <input className={inputCls} value={inputA}
              onChange={e => setInputA(e.target.value)}
              placeholder="e.g. Light"
              autoComplete="new-password" autoCorrect="off" spellCheck={false} />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-widest text-zinc-500 mb-2">Word / Concept B</label>
            <input className={inputCls} value={inputB}
              onChange={e => setInputB(e.target.value)}
              placeholder="e.g. Dark"
              autoComplete="new-password" autoCorrect="off" spellCheck={false} />
          </div>
        </div>

        <div className="flex gap-3">
          <button onClick={handleCompare} disabled={!inputA || !inputB}
            className="flex-1 min-h-[48px] bg-[#c6a85b] hover:bg-[#b8964a] disabled:opacity-40
                       disabled:cursor-not-allowed text-[#0b0c10] font-semibold rounded-lg transition-colors text-sm">
            Compare
          </button>
          <button onClick={handleClear}
            className="px-5 min-h-[48px] border border-zinc-700 hover:border-zinc-500 text-zinc-400 rounded-lg transition-colors text-sm">
            Clear
          </button>
        </div>
      </div>

      {result && (
        <div className="space-y-8">

          {/* Comparison table */}
          <div className="overflow-x-auto rounded-xl border border-zinc-800 bg-[#16181d]">
            <table className="min-w-full table-auto text-[12px]">
              <thead className="bg-[#0b0c10] border-b border-zinc-800">
                <tr>
                  {['Cipher','Group', inputA, 'Props A', inputB, 'Props B', 'Δ', 'Same', 'Same Root', 'Symbolic', 'Mirror', 'Cross', 'Shared Factors'].map(h => (
                    <th key={h} className="px-3 py-3 text-left text-[10px] uppercase tracking-widest text-zinc-500 font-medium whitespace-nowrap">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {result.comparison.map((row: any) => (
                  <tr key={row.cipher}
                    className={
                      row.sameValue ? 'bg-[#54ab8c]/10'
                      : row.mirror ? 'bg-[#5a4b8c]/10'
                      : row.sameReduction ? 'bg-[#c6a85b]/08'
                      : 'hover:bg-zinc-800/20'
                    }>
                    <td className="px-3 py-2 font-medium text-zinc-200 whitespace-nowrap">{row.cipher}</td>
                    <td className="px-3 py-2 text-zinc-500">{row.group}</td>
                    <td className="px-3 py-2 text-zinc-200 font-mono">{row.a}</td>
                    <td className="px-3 py-2">
                      <span className="inline-flex gap-1" title={`Prime: ${row.propertiesA?.prime ? 'Yes' : 'No'}`}>
                        {row.propertiesA?.prime && <span>🔵</span>}
                        {row.propertiesA?.square && <span>◼</span>}
                        {row.propertiesA?.triangular && <span>△</span>}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-zinc-200 font-mono">{row.b}</td>
                    <td className="px-3 py-2">
                      <span className="inline-flex gap-1">
                        {row.propertiesB?.prime && <span>🔵</span>}
                        {row.propertiesB?.square && <span>◼</span>}
                        {row.propertiesB?.triangular && <span>△</span>}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-zinc-400 font-mono">{row.difference}</td>
                    <td className="px-3 py-2">{row.sameValue ? '✅' : ''}</td>
                    <td className="px-3 py-2">{row.sameReduction ? '⚡' : ''}</td>
                    <td className="px-3 py-2 text-zinc-400 max-w-[160px]">
                      <span>{symbolicSummary(row.digitalRootA)}</span>
                      <span className="mx-1 opacity-40">↔</span>
                      <span>{symbolicSummary(row.digitalRootB)}</span>
                    </td>
                    <td className="px-3 py-2">{row.mirror ? '🪞' : ''}</td>
                    <td className="px-3 py-2">{row.crossMatch ? '⚡' : ''}</td>
                    <td className="px-3 py-2 text-zinc-500">{row.sharedFactors?.length > 0 ? row.sharedFactors.join(', ') : ''}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Breakdown A */}
          <div className="bg-[#16181d] border border-zinc-800 rounded-xl p-6">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4">Breakdown — {inputA}</p>
            {result.a.results.map((cipher: any) => (
              <div key={cipher.cipher} className="mb-5">
                <p className="text-xs font-semibold text-zinc-300 mb-2">
                  {cipher.cipher} <span className="font-mono text-[#c6a85b]">({cipher.total})</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cipher.breakdown.map((b: any, i: number) => (
                    <span key={i} className="border border-zinc-700 px-2 py-1 rounded text-[11px] text-zinc-400">
                      {b.char}={b.value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Breakdown B */}
          <div className="bg-[#16181d] border border-zinc-800 rounded-xl p-6">
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 mb-4">Breakdown — {inputB}</p>
            {result.b.results.map((cipher: any) => (
              <div key={cipher.cipher} className="mb-5">
                <p className="text-xs font-semibold text-zinc-300 mb-2">
                  {cipher.cipher} <span className="font-mono text-[#c6a85b]">({cipher.total})</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {cipher.breakdown.map((b: any, i: number) => (
                    <span key={i} className="border border-zinc-700 px-2 py-1 rounded text-[11px] text-zinc-400">
                      {b.char}={b.value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </SiteLayout>
  );
}