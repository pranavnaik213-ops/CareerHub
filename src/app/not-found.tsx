import Link from 'next/link';
import { Search, Home, ArrowRight, FileQuestion } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The requested page was not found on CareerHub. Browse active engineering job openings or return to the platform homepage.',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
      <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto mb-6 shadow-sm">
        <FileQuestion className="w-8 h-8 text-blue-500" />
      </div>

      <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900 text-slate-300 border border-slate-800 mb-3 font-mono">
        HTTP 404
      </span>

      <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mb-3 font-heading">
        Page Not Found
      </h1>

      <p className="text-xs sm:text-sm text-slate-400 max-w-md mb-8 leading-relaxed">
        The link you followed may have expired, the position was archived, or the URL address was typed incorrectly.
      </p>

      {/* Primary Actions */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Homepage
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors"
        >
          <Search className="w-4 h-4 text-slate-400" />
          Explore Openings
        </Link>
      </div>

      {/* Popular destinations card */}
      <div className="w-full max-w-md p-5 bg-[#0f131f] border border-slate-800 rounded-xl text-left">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
          Popular Destinations
        </h3>
        <div className="space-y-1.5 text-xs">
          <Link
            href="/seeker/dashboard"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-900 text-slate-300 hover:text-white transition-colors"
          >
            <span>Candidate Applications Tracker</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>
          <Link
            href="/resume-analyzer"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-900 text-slate-300 hover:text-white transition-colors"
          >
            <span>AI Resume ATS Scanner</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>
          <Link
            href="/salary-calculator"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-900 text-slate-300 hover:text-white transition-colors"
          >
            <span>Tech CTC & Tax Calculator</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>
          <Link
            href="/recruiter/dashboard"
            className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-900 text-slate-300 hover:text-white transition-colors"
          >
            <span>Recruiter ATS Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          </Link>
        </div>
      </div>
    </div>
  );
}
