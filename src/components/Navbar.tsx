'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useJobContext } from '@/context/JobContext';
import { Briefcase, Bookmark, PlusCircle, User, Building2, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { role, setRole, savedJobIds, candidateProfile } = useJobContext();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-emerald-400 p-[2px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-indigo-400 group-hover:text-emerald-400 transition-colors" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                CareerHub
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-md">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Next-Gen Recruitment Platform</p>
          </div>
        </Link>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/60">
          <Link
            href="/"
            className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
              pathname === '/'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Find Jobs
          </Link>

          {role === 'seeker' ? (
            <Link
              href="/seeker/dashboard"
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                pathname.startsWith('/seeker')
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              My Applications
            </Link>
          ) : (
            <Link
              href="/recruiter/dashboard"
              className={`px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                pathname.startsWith('/recruiter') && pathname !== '/recruiter/post-job'
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Recruiter Dashboard & ATS
            </Link>
          )}

          {role === 'recruiter' && (
            <Link
              href="/recruiter/post-job"
              className={`flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
                pathname === '/recruiter/post-job'
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/25'
                  : 'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Post a Job
            </Link>
          )}
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          
          {/* Role Switcher Pill */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setRole('seeker')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'seeker'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Switch to Job Seeker View"
            >
              <User className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Job Seeker</span>
            </button>
            <button
              onClick={() => setRole('recruiter')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                role === 'recruiter'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Switch to Recruiter View"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Recruiter</span>
            </button>
          </div>

          {/* Bookmarked Jobs pill for Seeker */}
          {role === 'seeker' && (
            <Link
              href="/seeker/dashboard?tab=saved"
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all"
              title="View Bookmarked Jobs"
            >
              <Bookmark className="w-4 h-4 text-indigo-400" />
              {savedJobIds.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-indigo-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-950 shadow-md">
                  {savedJobIds.length}
                </span>
              )}
            </Link>
          )}

          {/* Recruiter Quick Post CTA button */}
          {role === 'recruiter' && (
            <Link
              href="/recruiter/post-job"
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              Post Job
            </Link>
          )}

          {/* Profile Quick Pill */}
          <Link
            href="/seeker/dashboard?tab=profile"
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all"
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-inner">
              {candidateProfile.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-semibold text-slate-200 leading-tight">{candidateProfile.name}</p>
              <p className="text-[10px] text-slate-400 capitalize">{role}</p>
            </div>
          </Link>

        </div>

      </div>
    </header>
  );
};
