import Link from 'next/link';
import { Briefcase, Search, Home, ArrowRight, FileQuestion } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist on CareerHub. Explore thousands of active tech job postings or return to the homepage.',
};

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16 animate-fade-in">
      {/* Visual glowing orb */}
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full blur-3xl opacity-20 w-48 h-48 mx-auto -translate-y-6" />
        
        <div className="relative w-28 h-28 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto shadow-2xl">
          <FileQuestion className="w-14 h-14 text-indigo-400 animate-pulse" />
        </div>
      </div>

      {/* 404 badge */}
      <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 mb-4 uppercase tracking-wider">
        Error 404 • Page Not Found
      </span>

      <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
        We Couldn&apos;t Find That Page
      </h1>

      <p className="text-sm sm:text-base text-slate-400 max-w-lg mb-8 leading-relaxed">
        The link you followed may be outdated, the position may have closed, or the URL address was typed incorrectly.
      </p>

      {/* Primary Actions */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 hover:brightness-110 transition-all"
        >
          <Home className="w-4 h-4" />
          Back to Homepage
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-all"
        >
          <Search className="w-4 h-4 text-indigo-400" />
          Explore Available Jobs
        </Link>
      </div>

      {/* Helpful links card */}
      <div className="w-full max-w-md p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl text-left backdrop-blur-xl">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Popular Destinations</h3>
        <div className="space-y-2 text-xs">
          <Link
            href="/seeker/dashboard"
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <span>Candidate Applications Tracker</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          </Link>
          <Link
            href="/recruiter/dashboard"
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <span>Recruiter ATS Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          </Link>
          <Link
            href="/recruiter/post-job"
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <span>Post a New Job Opening</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          </Link>
          <Link
            href="/privacy"
            className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
          >
            <span>Privacy Policy & Compliance</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
