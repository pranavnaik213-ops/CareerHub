'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, Shield, Globe, Cookie } from 'lucide-react';

export const Footer: React.FC = () => {
  const handleOpenCookieSettings = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('open-cookie-settings'));
    }
  };

  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 text-slate-300 text-xs py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white" aria-hidden="true">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">CareerHub</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Tech job directory and candidate applicant tracking system for verified engineering, product, and AI positions.
          </p>
          <div className="pt-1">
            <a
              href="https://github.com/pranavnaik213-ops/CareerHub"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 font-medium"
            >
              <span>GitHub: pranavnaik213-ops/CareerHub</span>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-slate-200 font-semibold mb-3 uppercase tracking-wider text-[11px]">For Job Seekers</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="text-slate-400 hover:text-blue-400 transition-colors">Browse Verified Jobs</Link></li>
            <li><Link href="/resume-analyzer" className="text-slate-400 hover:text-blue-400 transition-colors">AI Resume ATS Scanner</Link></li>
            <li><Link href="/interview-prep" className="text-slate-400 hover:text-blue-400 transition-colors">Technical Interview Prep</Link></li>
            <li><Link href="/salary-calculator" className="text-slate-400 hover:text-blue-400 transition-colors">Tech Salary & Tax Calculator</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-200 font-semibold mb-3 uppercase tracking-wider text-[11px]">For Employers</h4>
          <ul className="space-y-2">
            <li><Link href="/recruiter/post-job" className="text-slate-400 hover:text-blue-400 transition-colors">Post a New Job</Link></li>
            <li><Link href="/recruiter/dashboard" className="text-slate-400 hover:text-blue-400 transition-colors">ATS Kanban Pipeline</Link></li>
            <li><Link href="/pricing" className="text-slate-400 hover:text-blue-400 transition-colors">Enterprise Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-200 font-semibold mb-3 uppercase tracking-wider text-[11px]">Technology & Trust</h4>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {['Next.js 16', 'TypeScript', 'Tailwind CSS', 'PostgreSQL Ready', 'ATS Engine', 'Lucide Icons'].map((tech, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-medium text-slate-300">
                {tech}
              </span>
            ))}
          </div>
          <div className="flex flex-col gap-1.5 text-xs">
            <Link href="/privacy" className="text-slate-400 hover:text-slate-200 transition-colors">
              Privacy Policy (GDPR/CCPA)
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-slate-200 transition-colors">
              Terms & Conditions
            </Link>
            <button
              onClick={handleOpenCookieSettings}
              className="text-left text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
            >
              <Cookie className="w-3 h-3 text-blue-400" aria-hidden="true" />
              Cookie Preferences
            </button>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-400">© 2026 CareerHub Recruitment System. All rights reserved.</p>
        <div className="flex items-center gap-6 text-slate-400">
          <Link href="/privacy" className="hover:text-slate-200 transition-colors">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-slate-200 transition-colors">
            Terms
          </Link>
          <span className="flex items-center gap-1 text-slate-400">
            <Globe className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            Global Platform
          </span>
          <span className="flex items-center gap-1 text-slate-400">
            <Shield className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            Verified Employers
          </span>
        </div>
      </div>
    </footer>
  );
};
