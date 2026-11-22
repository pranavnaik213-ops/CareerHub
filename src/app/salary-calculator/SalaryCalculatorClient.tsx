'use client';

import React, { useState } from 'react';
import { DollarSign, TrendingUp, Briefcase, MapPin, Sparkles } from 'lucide-react';

const SALARY_BENCHMARKS: Record<string, Record<string, { median: number; range: [number, number] }>> = {
  Engineering: {
    'Entry-level': { median: 95000, range: [80000, 115000] },
    'Mid-level': { median: 140000, range: [120000, 165000] },
    Senior: { median: 185000, range: [160000, 220000] },
    'Lead / Executive': { median: 240000, range: [205000, 310000] },
  },
  'Data & AI': {
    'Entry-level': { median: 105000, range: [90000, 125000] },
    'Mid-level': { median: 155000, range: [130000, 180000] },
    Senior: { median: 205000, range: [175000, 245000] },
    'Lead / Executive': { median: 260000, range: [220000, 340000] },
  },
  Design: {
    'Entry-level': { median: 85000, range: [70000, 100000] },
    'Mid-level': { median: 125000, range: [105000, 145000] },
    Senior: { median: 165000, range: [140000, 195000] },
    'Lead / Executive': { median: 215000, range: [180000, 270000] },
  },
  Infrastructure: {
    'Entry-level': { median: 100000, range: [85000, 120000] },
    'Mid-level': { median: 145000, range: [125000, 170000] },
    Senior: { median: 190000, range: [165000, 230000] },
    'Lead / Executive': { median: 250000, range: [210000, 320000] },
  },
};

export const SalaryCalculatorClient: React.FC = () => {
  const [roleCategory, setRoleCategory] = useState('Engineering');
  const [expLevel, setExpLevel] = useState('Senior');
  const [locationType, setLocationType] = useState('Remote');

  const benchmark = SALARY_BENCHMARKS[roleCategory]?.[expLevel] || {
    median: 150000,
    range: [130000, 180000],
  };

  // Remote bonus adjustment
  const locationMultiplier = locationType === 'Remote' ? 1.05 : 1.0;
  const adjustedMedian = Math.round((benchmark.median * locationMultiplier) / 1000) * 1000;
  const minRange = Math.round((benchmark.range[0] * locationMultiplier) / 1000) * 1000;
  const maxRange = Math.round((benchmark.range[1] * locationMultiplier) / 1000) * 1000;

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-xl space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">Discipline / Category</label>
          <select
            value={roleCategory}
            onChange={(e) => setRoleCategory(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none"
          >
            {Object.keys(SALARY_BENCHMARKS).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">Seniority Level</label>
          <select
            value={expLevel}
            onChange={(e) => setExpLevel(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none"
          >
            <option value="Entry-level">Entry-level (0-2 yrs)</option>
            <option value="Mid-level">Mid-level (3-5 yrs)</option>
            <option value="Senior">Senior (5-8 yrs)</option>
            <option value="Lead / Executive">Lead / Principal (8+ yrs)</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-2">Work Setup</label>
          <select
            value={locationType}
            onChange={(e) => setLocationType(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none"
          >
            <option value="Remote">Remote (Global Benchmark)</option>
            <option value="Hybrid">Hybrid Office</option>
            <option value="On-site">On-site Hub</option>
          </select>
        </div>
      </div>

      {/* Result Card */}
      <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950/20 border border-emerald-500/30 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Estimated Annual Base Salary</span>
            <div className="text-4xl sm:text-5xl font-extrabold text-white mt-1">
              ${(adjustedMedian / 1000).toFixed(0)}k <span className="text-sm font-semibold text-slate-400">/ year</span>
            </div>
          </div>
          <div className="text-right sm:text-right">
            <span className="text-xs font-semibold text-slate-400">Market Range</span>
            <div className="text-lg font-bold text-slate-200 mt-1">
              ${(minRange / 1000).toFixed(0)}k – ${(maxRange / 1000).toFixed(0)}k
            </div>
          </div>
        </div>

        {/* Distribution Bar */}
        <div className="space-y-2">
          <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full"
              style={{ width: '68%' }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400">
            <span>25th Percentile (${(minRange / 1000).toFixed(0)}k)</span>
            <span className="font-bold text-emerald-300">50th Percentile Median</span>
            <span>90th Percentile (${(maxRange / 1000).toFixed(0)}k)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
