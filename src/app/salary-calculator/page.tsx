import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calculator, DollarSign, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import { SalaryCalculatorClient } from './SalaryCalculatorClient';

export const metadata: Metadata = {
  title: 'Tech Salary Calculator 2026',
  description: 'Explore tech salary benchmarks, percentile distributions, and compensation ranges by role, experience level, and location.',
  alternates: {
    canonical: '/salary-calculator',
  },
};

export default function SalaryCalculatorPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to CareerHub
        </Link>
      </div>

      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 border border-slate-800 bg-gradient-to-br from-slate-900 via-emerald-950/30 to-slate-900 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Market Intelligence</span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">Tech Salary Calculator</h1>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
          Benchmark current software engineering, design, and AI salary brackets based on real market compensation data across verified listings on CareerHub.
        </p>
      </div>

      <SalaryCalculatorClient />
    </div>
  );
}
