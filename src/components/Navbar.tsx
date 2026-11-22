'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useJobContext } from '@/context/JobContext';
import { Briefcase, Bookmark, PlusCircle, User, Building2, Menu, X, Sparkles, Calculator, DollarSign } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { role, setRole, savedJobIds, candidateProfile } = useJobContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-xl"
          aria-label="CareerHub Homepage"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-emerald-400 p-[2px] shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Briefcase className="w-5 h-5 text-indigo-400 group-hover:text-emerald-400 transition-colors" aria-hidden="true" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-100 to-indigo-200 bg-clip-text text-transparent">
                CareerHub
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-semibold tracking-wide uppercase bg-indigo-500/10 text-indigo-300 border border-indigo-500/30 rounded-md">
                PRO
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Next-Gen Recruitment Platform</p>
          </div>
        </Link>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900/60 p-1.5 rounded-full border border-slate-800/60" aria-label="Desktop Navigation">
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
              <PlusCircle className="w-3.5 h-3.5" aria-hidden="true" />
              Post a Job
            </Link>
          )}

          <Link
            href="/salary-calculator"
            className={`px-3.5 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
              pathname === '/salary-calculator'
                ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            Salary Tool
          </Link>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Role Switcher Pill */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setRole('seeker')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
                role === 'seeker'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Switch to Job Seeker View"
              aria-label="Switch to Job Seeker View"
            >
              <User className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Job Seeker</span>
            </button>
            <button
              onClick={() => setRole('recruiter')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold transition-all min-h-[36px] ${
                role === 'recruiter'
                  ? 'bg-violet-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Switch to Recruiter View"
              aria-label="Switch to Recruiter View"
            >
              <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Recruiter</span>
            </button>
          </div>

          {/* Bookmarked Jobs pill for Seeker */}
          {role === 'seeker' && (
            <Link
              href="/seeker/dashboard?tab=saved"
              onClick={closeMobileMenu}
              className="relative p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-all min-w-[40px] min-h-[40px] flex items-center justify-center"
              title="View Bookmarked Jobs"
              aria-label={`View ${savedJobIds.length} bookmarked jobs`}
            >
              <Bookmark className="w-4 h-4 text-indigo-400" aria-hidden="true" />
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
              onClick={closeMobileMenu}
              className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20 hover:brightness-110 transition-all min-h-[40px]"
            >
              <PlusCircle className="w-4 h-4" aria-hidden="true" />
              Post Job
            </Link>
          )}

          {/* Profile Quick Pill */}
          <Link
            href="/seeker/dashboard?tab=profile"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all min-h-[40px]"
            aria-label={`Profile for ${candidateProfile.name}`}
          >
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 text-white font-bold text-xs flex items-center justify-center shadow-inner" aria-hidden="true">
              {candidateProfile.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="hidden xl:block text-left">
              <p className="text-xs font-semibold text-slate-200 leading-tight">{candidateProfile.name}</p>
              <p className="text-[10px] text-slate-400 capitalize">{role}</p>
            </div>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-all min-w-[42px] min-h-[42px] flex items-center justify-center"
            aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-indigo-400" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5 text-slate-300" aria-hidden="true" />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-2xl">
          <div className="flex flex-col space-y-1">
            <Link
              href="/"
              onClick={closeMobileMenu}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                pathname === '/'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span>Find Verified Jobs</span>
              <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full">Explore</span>
            </Link>

            {role === 'seeker' ? (
              <Link
                href="/seeker/dashboard"
                onClick={closeMobileMenu}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  pathname.startsWith('/seeker')
                    ? 'bg-indigo-600 text-white'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <span>My Applications</span>
                <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">Candidate</span>
              </Link>
            ) : (
              <Link
                href="/recruiter/dashboard"
                onClick={closeMobileMenu}
                className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                  pathname.startsWith('/recruiter') && pathname !== '/recruiter/post-job'
                    ? 'bg-violet-600 text-white'
                    : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <span>Recruiter ATS Dashboard</span>
                <span className="text-[10px] bg-violet-500/20 text-violet-300 px-2 py-0.5 rounded-full">ATS</span>
              </Link>
            )}

            <Link
              href="/recruiter/post-job"
              onClick={closeMobileMenu}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                pathname === '/recruiter/post-job'
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-400 hover:bg-slate-900'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <PlusCircle className="w-3.5 h-3.5" aria-hidden="true" />
                Post a Job Opening
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">Free</span>
            </Link>

            <Link
              href="/salary-calculator"
              onClick={closeMobileMenu}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                pathname === '/salary-calculator'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span className="flex items-center gap-1.5">
                <Calculator className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
                Tech Salary Calculator
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">Tool</span>
            </Link>

            <Link
              href="/pricing"
              onClick={closeMobileMenu}
              className={`flex items-center justify-between px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                pathname === '/pricing'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-300 hover:bg-slate-900 hover:text-white'
              }`}
            >
              <span>Enterprise Pricing</span>
              <span className="text-[10px] bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">Plans</span>
            </Link>

            <Link
              href="/privacy"
              onClick={closeMobileMenu}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              onClick={closeMobileMenu}
              className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
