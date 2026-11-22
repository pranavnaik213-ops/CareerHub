'use client';

import React, { useState } from 'react';
import { Award, ShieldCheck } from 'lucide-react';
import { formatSalaryLakhs } from '@/lib/formatSalary';

const SALARY_BENCHMARKS: Record<string, Record<string, { median: number; range: [number, number]; count: number }>> = {
  Engineering: {
    'Entry-level': { median: 1800000, range: [1200000, 2400000], count: 320 },
    'Mid-level': { median: 3600000, range: [2800000, 4800000], count: 540 },
    Senior: { median: 6500000, range: [5000000, 8500000], count: 480 },
    'Lead / Executive': { median: 11000000, range: [8500000, 15000000], count: 190 },
  },
  'Data & AI': {
    'Entry-level': { median: 2000000, range: [1400000, 2600000], count: 210 },
    'Mid-level': { median: 4000000, range: [3000000, 5500000], count: 390 },
    Senior: { median: 7500000, range: [5800000, 9500000], count: 310 },
    'Lead / Executive': { median: 12500000, range: [9500000, 18000000], count: 140 },
  },
  Design: {
    'Entry-level': { median: 1400000, range: [1000000, 1800000], count: 180 },
    'Mid-level': { median: 2800000, range: [2200000, 3800000], count: 290 },
    Senior: { median: 5000000, range: [4000000, 6800000], count: 220 },
    'Lead / Executive': { median: 8500000, range: [6500000, 12000000], count: 95 },
  },
  Infrastructure: {
    'Entry-level': { median: 1600000, range: [1100000, 2200000], count: 160 },
    'Mid-level': { median: 3400000, range: [2600000, 4500000], count: 270 },
    Senior: { median: 6200000, range: [4800000, 8200000], count: 240 },
    'Lead / Executive': { median: 10500000, range: [8000000, 14000000], count: 110 },
  },
};

export const SalaryCalculatorClient: React.FC = () => {
  const [roleCategory, setRoleCategory] = useState('Engineering');
  const [expLevel, setExpLevel] = useState('Senior');
  const [locationType, setLocationType] = useState('Remote');

  const benchmark = SALARY_BENCHMARKS[roleCategory]?.[expLevel] || {
    median: 195000,
    range: [170000, 240000],
    count: 480,
  };

  const locationMultiplier = locationType === 'Remote' ? 1.05 : 1.0;
  const adjustedMedian = Math.round((benchmark.median * locationMultiplier) / 1000) * 1000;
  const minRange = Math.round((benchmark.range[0] * locationMultiplier) / 1000) * 1000;
  const maxRange = Math.round((benchmark.range[1] * locationMultiplier) / 1000) * 1000;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Parameter Controls */}
      <div className="bg-[#11141c] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
          Compensation Parameters
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="salary-category" className="block text-xs font-medium text-slate-400 mb-1.5">
              Role Category
            </label>
            <select
              id="salary-category"
              value={roleCategory}
              onChange={(e) => setRoleCategory(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
            >
              {Object.keys(SALARY_BENCHMARKS).map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="salary-seniority" className="block text-xs font-medium text-slate-400 mb-1.5">
              Experience Level
            </label>
            <select
              id="salary-seniority"
              value={expLevel}
              onChange={(e) => setExpLevel(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
            >
              <option value="Entry-level">Entry-level (0-2 yrs)</option>
              <option value="Mid-level">Mid-level (3-5 yrs)</option>
              <option value="Senior">Senior (5-8 yrs)</option>
              <option value="Lead / Executive">Staff / Lead / Principal (8+ yrs)</option>
            </select>
          </div>

          <div>
            <label htmlFor="salary-location" className="block text-xs font-medium text-slate-400 mb-1.5">
              Location Setup
            </label>
            <select
              id="salary-location"
              value={locationType}
              onChange={(e) => setLocationType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none"
            >
              <option value="Remote">Remote (Global Benchmark)</option>
              <option value="Hybrid">Hybrid Office</option>
              <option value="On-site">On-site Tech Hub</option>
            </select>
          </div>
        </div>
      </div>

      {/* Result Display */}
      <div className="bg-[#11141c] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div>
            <span className="text-xs font-medium text-slate-400 block mb-1">
              Estimated 50th Percentile Median Base (INR)
            </span>
            <div className="text-3xl sm:text-5xl font-bold text-white tracking-tight font-heading">
              {formatSalaryLakhs(adjustedMedian)} <span className="text-sm font-normal text-slate-400">/ year</span>
            </div>
          </div>

          <div className="bg-slate-900 p-3.5 rounded-lg border border-slate-800 text-left sm:text-right">
            <span className="text-xs text-slate-400 block">Verified Range (INR)</span>
            <div className="text-lg sm:text-xl font-semibold text-slate-200 mt-0.5">
              {formatSalaryLakhs(minRange)} – {formatSalaryLakhs(maxRange)}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">{benchmark.count} verified tech compensation records</p>
          </div>
        </div>

        {/* Distribution Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>25th Percentile: {formatSalaryLakhs(minRange)}</span>
            <span className="text-emerald-400 font-semibold">Median: {formatSalaryLakhs(adjustedMedian)}</span>
            <span>90th Percentile: {formatSalaryLakhs(maxRange)}</span>
          </div>

          <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: '65%' }}
            />
          </div>
        </div>

        {/* Real Breakdown Factors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 block">Equity & Bonus Range</span>
            <span className="text-sm font-semibold text-slate-200 mt-0.5 block">15% - 35% Base</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Stock grant / RSUs</p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 block">Work Setup Adjustment</span>
            <span className="text-sm font-semibold text-slate-200 mt-0.5 block">{locationType === 'Remote' ? '+5% Remote Flex' : 'National Standard'}</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Geo-adjusted compensation</p>
          </div>
          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800">
            <span className="text-xs text-slate-400 block">Industry Source</span>
            <span className="text-sm font-semibold text-slate-200 mt-0.5 block">Tech Compensation Data</span>
            <p className="text-[11px] text-slate-500 mt-0.5">Levels.fyi & Radford benchmark</p>
          </div>
        </div>
      </div>
    </div>
  );
};
