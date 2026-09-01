'use client';

import React from 'react';
import Link from 'next/link';
import { Briefcase, Heart, Shield, Terminal, Code2, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-800/80 bg-slate-950 text-slate-400 text-xs py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Briefcase className="w-4 h-4" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">CareerHub</span>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            Empowering top tech talent and hiring teams with modern recruitment automation, ATS candidate pipelines, and real-time job matching.
          </p>
        </div>

        <div>
          <h4 className="text-slate-200 font-bold mb-3 uppercase tracking-wider text-[11px]">For Job Seekers</h4>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-indigo-400 transition-colors">Browse Remote Jobs</Link></li>
            <li><Link href="/seeker/dashboard" className="hover:text-indigo-400 transition-colors">Track Applications</Link></li>
            <li><Link href="/seeker/dashboard?tab=profile" className="hover:text-indigo-400 transition-colors">Resume & Candidate Profile</Link></li>
            <li><Link href="/" className="hover:text-indigo-400 transition-colors">Salary Calculators</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-200 font-bold mb-3 uppercase tracking-wider text-[11px]">For Employers</h4>
          <ul className="space-y-2">
            <li><Link href="/recruiter/post-job" className="hover:text-indigo-400 transition-colors">Post a New Job</Link></li>
            <li><Link href="/recruiter/dashboard" className="hover:text-indigo-400 transition-colors">ATS Kanban Pipeline</Link></li>
            <li><Link href="/recruiter/dashboard" className="hover:text-indigo-400 transition-colors">Recruitment Metrics</Link></li>
            <li><Link href="/recruiter/dashboard" className="hover:text-indigo-400 transition-colors">Enterprise Pricing</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-slate-200 font-bold mb-3 uppercase tracking-wider text-[11px]">Technology Stack</h4>
          <div className="flex flex-wrap gap-1.5">
            {['Next.js 15', 'TypeScript', 'Tailwind CSS', 'PostgreSQL Ready', 'ATS Engine', 'Lucide Icons'].map((tech, i) => (
              <span key={i} className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-[10px] font-medium text-slate-300">
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-slate-500">© 2026 CareerHub Recruitment System. Built for CODSOFT Task 2.</p>
        <div className="flex items-center gap-4 text-slate-500">
          <span className="flex items-center gap-1 hover:text-slate-300 transition-colors">
            <Globe className="w-3.5 h-3.5" />
            Global Platform
          </span>
          <span className="flex items-center gap-1 hover:text-slate-300 transition-colors">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            Verified Employers
          </span>
        </div>
      </div>
    </footer>
  );
};
