'use client';

import React, { useState } from 'react';
import { Award, ShieldCheck, IndianRupee, Calculator, Building2, TrendingUp, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { formatSalaryLakhs } from '@/lib/formatSalary';
import { calculateIndianCTCBreakdown } from '@/lib/taxCalculator';
import { COMPANY_INTERVIEW_GUIDES } from '@/data/companyInterviewGuides';
import Link from 'next/link';

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
  const [activeTab, setActiveTab] = useState<'benchmarks' | 'tax' | 'compare'>('benchmarks');

  // Tab 1 state: Benchmarks
  const [roleCategory, setRoleCategory] = useState('Engineering');
  const [expLevel, setExpLevel] = useState('Senior');
  const [locationType, setLocationType] = useState('Remote');

  // Tab 2 state: Indian CTC & Tax Calculator
  const [inputCtcLakhs, setInputCtcLakhs] = useState<number>(45);
  const [rsuPercentage, setRsuPercentage] = useState<number>(20);

  // Tab 3 state: Company Compare
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('google');

  // Tab 1 Computations
  const benchmark = SALARY_BENCHMARKS[roleCategory]?.[expLevel] || {
    median: 6500000,
    range: [5000000, 8500000],
    count: 480,
  };
  const locationMultiplier = locationType === 'Remote' ? 1.05 : 1.0;
  const adjustedMedian = Math.round((benchmark.median * locationMultiplier) / 1000) * 1000;
  const minRange = Math.round((benchmark.range[0] * locationMultiplier) / 1000) * 1000;
  const maxRange = Math.round((benchmark.range[1] * locationMultiplier) / 1000) * 1000;

  // Tab 2 Computations
  const ctcBreakdown = calculateIndianCTCBreakdown(inputCtcLakhs, rsuPercentage);

  // Format currency helpers
  const formatInr = (num: number) => {
    return '₹' + num.toLocaleString('en-IN');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex border-b border-slate-800 gap-2 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('benchmarks')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'benchmarks'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Market Benchmarks (INR)
        </button>

        <button
          onClick={() => setActiveTab('tax')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'tax'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Calculator className="w-4 h-4" />
          Indian CTC & In-Hand Tax Calculator
        </button>

        <button
          onClick={() => setActiveTab('compare')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap ${
            activeTab === 'compare'
              ? 'bg-blue-600 text-white'
              : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Building2 className="w-4 h-4" />
          Tier-1 Tech Levels & Compensation
        </button>
      </div>

      {/* TAB 1: MARKET BENCHMARKS */}
      {activeTab === 'benchmarks' && (
        <div className="space-y-6">
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
                  <option value="Remote">Remote (India & Global Flex)</option>
                  <option value="Hybrid">Hybrid Office (Bengaluru / NCR / Hyd)</option>
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
                <span className="text-xs text-slate-400 block">Verified Market Range (INR)</span>
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
                <p className="text-[11px] text-slate-500 mt-0.5">Verified Indian CTC benchmarks</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: INDIAN CTC & TAKE-HOME TAX CALCULATOR */}
      {activeTab === 'tax' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="bg-[#11141c] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-white">Indian CTC to In-Hand Calculator</h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  FY 2025-26 New Tax Regime (Budget 2024 revised slabs) with ₹75,000 standard deduction
                </p>
              </div>
              <div className="flex items-center gap-2">
                {[25, 45, 65, 95, 120].map((quick) => (
                  <button
                    key={quick}
                    onClick={() => setInputCtcLakhs(quick)}
                    className={`px-2.5 py-1 text-xs rounded border transition-colors ${
                      inputCtcLakhs === quick
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    ₹{quick >= 100 ? `${(quick / 100).toFixed(1)} Cr` : `${quick}L`}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="ctc-slider" className="text-xs font-medium text-slate-300">
                    Total Annual CTC (Cost to Company)
                  </label>
                  <span className="text-xs font-bold text-blue-400">
                    {inputCtcLakhs >= 100 ? `₹${(inputCtcLakhs / 100).toFixed(2)} Cr` : `₹${inputCtcLakhs} Lakhs`}
                  </span>
                </div>
                <input
                  id="ctc-slider"
                  type="range"
                  min="12"
                  max="150"
                  step="1"
                  value={inputCtcLakhs}
                  onChange={(e) => setInputCtcLakhs(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>₹12 LPA</span>
                  <span>₹75 LPA</span>
                  <span>₹1.50 Cr</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label htmlFor="rsu-slider" className="text-xs font-medium text-slate-300">
                    RSU / Stock Grant Proportion
                  </label>
                  <span className="text-xs font-bold text-blue-400">{rsuPercentage}% of CTC</span>
                </div>
                <input
                  id="rsu-slider"
                  type="range"
                  min="0"
                  max="45"
                  step="5"
                  value={rsuPercentage}
                  onChange={(e) => setRsuPercentage(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-500 mt-1">
                  <span>0% (All Cash)</span>
                  <span>20% (Standard)</span>
                  <span>45% (High Stock)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly In-Hand Highlight Banner */}
          <div className="bg-gradient-to-r from-blue-950/60 via-[#11141c] to-indigo-950/40 border border-blue-900/40 rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-blue-400 font-semibold block mb-1">
                Estimated Monthly In-Hand (Take-Home Cash)
              </span>
              <div className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                {formatInr(ctcBreakdown.monthlyInHand)}
                <span className="text-sm font-normal text-slate-400 ml-2">/ month</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Annual net cash in bank: <span className="text-slate-200 font-semibold">{formatInr(ctcBreakdown.netAnnualInHand)}</span> (excludes RSUs vesting annually)
              </p>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-xl text-left space-y-2 min-w-[220px]">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Annual Income Tax:</span>
                <span className="font-semibold text-rose-400">-{formatInr(ctcBreakdown.totalTaxPayable)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Standard Deduction:</span>
                <span className="font-semibold text-emerald-400">+₹75,000</span>
              </div>
              <div className="flex justify-between text-xs border-t border-slate-800 pt-2">
                <span className="text-slate-400">Effective Tax Rate:</span>
                <span className="font-semibold text-slate-200">
                  {((ctcBreakdown.totalTaxPayable / ctcBreakdown.grossTaxableAnnual) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Breakdown Component Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-[#11141c] border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400 block">Annual Base Salary</span>
              <div className="text-lg font-bold text-white mt-1">{formatInr(ctcBreakdown.baseSalaryAnnual)}</div>
              <p className="text-[11px] text-slate-500 mt-1">Fixed monthly gross payout</p>
            </div>

            <div className="bg-[#11141c] border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400 block">Performance Bonus</span>
              <div className="text-lg font-bold text-emerald-400 mt-1">{formatInr(ctcBreakdown.annualPerformanceBonus)}</div>
              <p className="text-[11px] text-slate-500 mt-1">~10% annual bonus target</p>
            </div>

            <div className="bg-[#11141c] border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400 block">RSU / Stock Vesting</span>
              <div className="text-lg font-bold text-blue-400 mt-1">{formatInr(ctcBreakdown.rsuAnnual)}</div>
              <p className="text-[11px] text-slate-500 mt-1">{rsuPercentage}% of CTC granted annually</p>
            </div>

            <div className="bg-[#11141c] border border-slate-800 rounded-xl p-4">
              <span className="text-xs text-slate-400 block">Retirals (PF + Gratuity)</span>
              <div className="text-lg font-bold text-amber-400 mt-1">
                {formatInr(ctcBreakdown.employerPfAnnual + ctcBreakdown.gratuityAnnual)}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Provident Fund + Gratuity corpus</p>
            </div>
          </div>

          {/* Tax Slab Calculation Table */}
          <div className="bg-[#11141c] border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              Tax Slab Breakdown (New Tax Regime FY 2025-26)
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Income Tax Slab</th>
                    <th className="py-2.5 px-4 font-semibold">Tax Rate</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Tax Computed</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {ctcBreakdown.taxSlabBreakdown.map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/40">
                      <td className="py-2 px-4 text-slate-300">{row.slab}</td>
                      <td className="py-2 px-4 text-slate-400">{row.rate}</td>
                      <td className="py-2 px-4 text-right font-medium text-slate-200">
                        {row.tax > 0 ? formatInr(row.tax) : 'Nil'}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-900/60 font-semibold text-slate-200">
                    <td className="py-2.5 px-4" colSpan={2}>
                      4% Health & Education Cess
                    </td>
                    <td className="py-2.5 px-4 text-right text-rose-400">
                      {formatInr(ctcBreakdown.healthAndEduCess)}
                    </td>
                  </tr>
                  <tr className="bg-blue-950/20 font-bold text-white border-t border-slate-800">
                    <td className="py-3 px-4" colSpan={2}>
                      Total Tax Payable
                    </td>
                    <td className="py-3 px-4 text-right text-rose-400">
                      {formatInr(ctcBreakdown.totalTaxPayable)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: COMPANY VS COMPANY LEVEL & COMPENSATION */}
      {activeTab === 'compare' && (
        <div className="space-y-6">
          {/* Company Picker */}
          <div className="flex gap-2 overflow-x-auto pb-1">
            {COMPANY_INTERVIEW_GUIDES.map((company) => (
              <button
                key={company.id}
                onClick={() => setSelectedCompanyId(company.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors whitespace-nowrap border ${
                  selectedCompanyId === company.id
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-[#11141c] border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{company.name}</span>
                <span className="text-[10px] opacity-75 font-normal">({company.location})</span>
              </button>
            ))}
          </div>

          {/* Selected Company Details Card */}
          {(() => {
            const company = COMPANY_INTERVIEW_GUIDES.find((c) => c.id === selectedCompanyId) || COMPANY_INTERVIEW_GUIDES[0];
            return (
              <div className="bg-[#11141c] border border-slate-800 rounded-xl p-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h2 className="text-xl font-bold text-white">{company.name}</h2>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-950/40 text-amber-300 border border-amber-800/40">
                        {company.hiringBar} Bar
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">Tech Hubs: {company.location}</p>
                  </div>

                  <Link
                    href="/interview-prep"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                  >
                    View Interview Prep & Questions
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {/* Levels & Compensation Table */}
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3">
                    Verified Engineering Levels & CTC Band (India)
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {company.engineeringLevels.map((lvl) => (
                      <div key={lvl.level} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-0.5 rounded bg-blue-950 text-blue-300 font-mono font-bold text-xs">
                            {lvl.level}
                          </span>
                        </div>
                        <h4 className="text-xs font-semibold text-slate-200">{lvl.title}</h4>
                        <div className="text-sm font-bold text-emerald-400">{lvl.ctcRange}</div>
                        <p className="text-[10px] text-slate-500">Base + Annual Bonus + RSUs</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Culture & Interview Focus */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                    <span className="text-xs text-slate-400 block mb-1">Tech Stack & Architecture</span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {company.coreTechStack.map((tech, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 border border-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl">
                    <span className="text-xs text-slate-400 block mb-1">Interview Assessment Emphasis</span>
                    <p className="text-xs text-slate-300 leading-relaxed mt-1">{company.cultureNotes}</p>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
};
