'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useJobContext } from '@/context/JobContext';
import { Briefcase, Bookmark, PlusCircle, User, Building2, Menu, X, Calculator } from 'lucide-react';

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { role, setRole, savedJobIds, candidateProfile } = useJobContext();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-[#090a0f]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo - Clean, Professional */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
          aria-label="CareerHub Homepage"
        >
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm">
            <Briefcase className="w-4 h-4" aria-hidden="true" />
          </div>
          <div>
            <span className="text-lg font-bold font-heading tracking-tight text-white">
              CareerHub
            </span>
          </div>
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-900 border border-slate-800 p-1 rounded-lg" aria-label="Desktop Navigation">
          <Link
            href="/"
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
              pathname === '/'
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Find Jobs
          </Link>

          {role === 'seeker' ? (
            <Link
              href="/seeker/dashboard"
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                pathname.startsWith('/seeker')
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              My Applications
            </Link>
          ) : (
            <Link
              href="/recruiter/dashboard"
              className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                pathname.startsWith('/recruiter') && pathname !== '/recruiter/post-job'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              ATS Pipeline
            </Link>
          )}

          {role === 'recruiter' && (
            <Link
              href="/recruiter/post-job"
              className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
                pathname === '/recruiter/post-job'
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-400 hover:text-blue-300 hover:bg-blue-950/40'
              }`}
            >
              <PlusCircle className="w-3.5 h-3.5" aria-hidden="true" />
              Post a Job
            </Link>
          )}

          <Link
            href="/salary-calculator"
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
              pathname === '/salary-calculator'
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Salaries
          </Link>

          <Link
            href="/pricing"
            className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors ${
              pathname === '/pricing'
                ? 'bg-slate-800 text-white'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Pricing
          </Link>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Role Switcher Pill */}
          <div className="flex items-center bg-slate-900 border border-slate-800 p-0.5 rounded-lg">
            <button
              onClick={() => setRole('seeker')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                role === 'seeker'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Job Seeker View"
              aria-label="Job Seeker View"
            >
              <User className="w-3.5 h-3.5" aria-hidden="true" />
              <span className="hidden sm:inline">Job Seeker</span>
            </button>
            <button
              onClick={() => setRole('recruiter')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${
                role === 'recruiter'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              title="Recruiter View"
              aria-label="Recruiter View"
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
              className="relative p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition-colors flex items-center justify-center min-w-[36px] min-h-[36px]"
              title="View Bookmarked Jobs"
              aria-label={`View ${savedJobIds.length} bookmarked jobs`}
            >
              <Bookmark className="w-4 h-4 text-slate-300" aria-hidden="true" />
              {savedJobIds.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
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
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5" aria-hidden="true" />
              Post Job
            </Link>
          )}

          {/* Profile Quick Pill */}
          <Link
            href="/seeker/dashboard?tab=profile"
            onClick={closeMobileMenu}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            aria-label={`Profile for ${candidateProfile.name}`}
          >
            <div className="w-6 h-6 rounded-md bg-slate-800 text-white font-semibold text-xs flex items-center justify-center">
              {candidateProfile.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-medium text-slate-200 leading-tight">{candidateProfile.name}</p>
            </div>
          </Link>

          {/* Mobile Hamburger Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label={isMobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-200" aria-hidden="true" />
            ) : (
              <Menu className="w-5 h-5 text-slate-200" aria-hidden="true" />
            )}
          </button>

        </div>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-slate-950 border-b border-slate-800 px-4 pt-3 pb-6 space-y-2 animate-fade-in">
          <Link
            href="/"
            onClick={closeMobileMenu}
            className={`block px-3 py-2 rounded-md text-xs font-medium ${
              pathname === '/' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Find Jobs
          </Link>

          {role === 'seeker' ? (
            <Link
              href="/seeker/dashboard"
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-md text-xs font-medium ${
                pathname.startsWith('/seeker') ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              My Applications
            </Link>
          ) : (
            <Link
              href="/recruiter/dashboard"
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded-md text-xs font-medium ${
                pathname.startsWith('/recruiter') ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-900'
              }`}
            >
              ATS Pipeline
            </Link>
          )}

          <Link
            href="/salary-calculator"
            onClick={closeMobileMenu}
            className={`block px-3 py-2 rounded-md text-xs font-medium ${
              pathname === '/salary-calculator' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Tech Salaries
          </Link>

          <Link
            href="/pricing"
            onClick={closeMobileMenu}
            className={`block px-3 py-2 rounded-md text-xs font-medium ${
              pathname === '/pricing' ? 'bg-slate-800 text-white' : 'text-slate-300 hover:bg-slate-900'
            }`}
          >
            Pricing
          </Link>

          <Link
            href="/privacy"
            onClick={closeMobileMenu}
            className="block px-3 py-2 text-xs text-slate-400 hover:text-white"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            onClick={closeMobileMenu}
            className="block px-3 py-2 text-xs text-slate-400 hover:text-white"
          >
            Terms of Service
          </Link>
        </div>
      )}
    </header>
  );
};
