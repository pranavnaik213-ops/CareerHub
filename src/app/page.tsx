'use client';

import React, { useState, useEffect } from 'react';
import { useJobContext } from '@/context/JobContext';
import { Job } from '@/types';
import { JobCard } from '@/components/JobCard';
import { JobFilterSidebar } from '@/components/JobFilterSidebar';
import { JobDetailsModal } from '@/components/JobDetailsModal';
import { ApplyModal } from '@/components/ApplyModal';
import {
  Search,
  Sparkles,
  Briefcase,
  Building2,
  Users,
  ArrowRight,
  ShieldCheck,
  FilterX,
  SlidersHorizontal,
  CheckCircle2,
  ChevronRight,
  Zap,
  TrendingUp,
  Award,
  Layers
} from 'lucide-react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

export default function HomePage() {
  const { filteredJobs, jobs, filters, setFilters, role, setRole, resetFilters } = useJobContext();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyModalJob, setApplyModalJob] = useState<Job | null>(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    trackEvent('page_view', { page: 'home' });
  }, []);

  const activeJobsCount = jobs.filter((j) => j.status === 'Active').length;
  const activeFilterCount = [
    Boolean(filters.query),
    filters.category !== 'All',
    filters.locationType !== 'All',
    filters.jobType !== 'All',
    filters.experienceLevel !== 'All',
    filters.salaryMin > 0,
  ].filter(Boolean).length;

  const scrollToDirectory = () => {
    const el = document.getElementById('jobs-directory');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-12">
      
      {/* =========================================================================
          HERO BENTO GRID SECTION (UI/UX Pro Max Architecture)
          ========================================================================= */}
      <section className="space-y-6">
        
        {/* Main Hero Card (Bento Row 1) */}
        <div className="relative rounded-3xl overflow-hidden p-8 sm:p-14 border border-slate-800 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 shadow-2xl">
          
          {/* Ambient Lighting Orbs */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
          <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

          <div className="relative z-10 max-w-3xl space-y-6">
            
            {/* Live Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
              <span>Over 1,200+ Verified Tech Positions Hiring Now</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Find Your Dream Career or <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">Hire Top Tech Talent</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              CareerHub simplifies high-growth recruiting with centralized candidate ATS tracking, direct engineering pipelines, and verified compensation transparency.
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={scrollToDirectory}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:brightness-110 text-white shadow-xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[48px]"
              >
                <span>Explore {activeJobsCount}+ Verified Openings</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>

              <Link
                href="/recruiter/post-job"
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 transition-all min-h-[48px]"
              >
                <Building2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <span>Post a Job as Employer</span>
              </Link>
            </div>

            {/* Quick Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-xs font-semibold text-slate-400 mr-1">Popular Searches:</span>
              {['Software Engineering', 'UI/UX Design', 'Data & AI', 'Remote', 'Infrastructure'].map((tag, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setFilters((prev) => ({
                      ...prev,
                      query: tag === 'Remote' ? '' : tag,
                      locationType: tag === 'Remote' ? 'Remote' : prev.locationType,
                    }));
                    scrollToDirectory();
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-900/80 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-200 border border-slate-800 transition-all min-h-[32px]"
                >
                  {tag}
                </button>
              ))}
            </div>

          </div>

        </div>

        {/* Bento Metrics Row (4 Value Pillars) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="bento-card p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Live Openings</span>
              <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                <Briefcase className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-white tracking-tight">{activeJobsCount} Active</div>
              <p className="text-xs text-slate-400 mt-1">Verified roles with transparent salary</p>
            </div>
          </div>

          <div className="bento-card p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Verified Employers</span>
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-emerald-400 tracking-tight">100%</div>
              <p className="text-xs text-slate-400 mt-1">Zero spam or phantom listings</p>
            </div>
          </div>

          <div className="bento-card p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Turnaround SLA</span>
              <div className="p-2 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400">
                <Zap className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-violet-300 tracking-tight">&lt; 48 hrs</div>
              <p className="text-xs text-slate-400 mt-1">Average candidate first feedback</p>
            </div>
          </div>

          <div className="bento-card p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">ATS Efficiency</span>
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <TrendingUp className="w-4 h-4" aria-hidden="true" />
              </div>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-amber-300 tracking-tight">4.2x</div>
              <p className="text-xs text-slate-400 mt-1">Faster time-to-hire with Kanban</p>
            </div>
          </div>

        </div>

      </section>

      {/* Recruiter Notice Bar if in Recruiter Mode */}
      {role === 'recruiter' && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-violet-950/50 to-slate-900 border border-violet-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-violet-400 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold text-violet-200">Recruiter Mode Enabled</p>
              <p className="text-[11px] text-violet-300/80">
                Manage applicant stages in your ATS Kanban board or publish verified job positions.
              </p>
            </div>
          </div>
          <Link
            href="/recruiter/dashboard"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-md flex-shrink-0 transition-colors min-h-[38px] flex items-center justify-center"
          >
            Open Recruiter ATS
          </Link>
        </div>
      )}

      {/* Mobile Filter Drawer Button */}
      <div className="lg:hidden flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-indigo-400" aria-hidden="true" />
          <span className="text-xs font-bold text-slate-200">Filter Jobs</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-600 text-white">
              {activeFilterCount}
            </span>
          )}
        </div>
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 text-slate-200 hover:text-white border border-slate-700 transition-colors min-h-[36px]"
        >
          {isMobileFilterOpen ? 'Hide Filters' : 'Refine Search'}
        </button>
      </div>

      {/* Mobile filter expandable panel */}
      {isMobileFilterOpen && (
        <div className="lg:hidden animate-fade-in">
          <JobFilterSidebar onCloseMobile={() => setIsMobileFilterOpen(false)} />
        </div>
      )}

      {/* Main Job Directory Grid */}
      <div id="jobs-directory" className="grid grid-cols-1 lg:grid-cols-4 gap-8 scroll-mt-24">
        
        {/* Left Filter Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-1">
          <JobFilterSidebar />
        </div>

        {/* Right Jobs Listing Grid */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Active Results Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2.5">
                Available Positions
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'} Found
                </span>
              </h2>
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold p-1"
              >
                <FilterX className="w-3.5 h-3.5" aria-hidden="true" />
                Clear Active Filters ({activeFilterCount})
              </button>
            )}
          </div>

          {/* Jobs List */}
          {filteredJobs.length === 0 ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400" aria-hidden="true">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-200">No jobs match your search criteria</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Try adjusting your search keywords, work setup filters, or salary thresholds to discover more opportunities.
              </p>
              <button
                onClick={resetFilters}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-colors min-h-[40px]"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSelect={(j) => setSelectedJob(j)}
                  onApplyClick={(j) => setApplyModalJob(j)}
                />
              ))}
            </div>
          )}

        </div>

      </div>

      {/* DEDICATED HIGH-CONVERTING BOTTOM CALL TO ACTION BANNER */}
      <section className="relative rounded-3xl overflow-hidden p-8 sm:p-14 border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 shadow-2xl text-center space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-4">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Join 12,000+ Tech Professionals
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Ready to Take the Next Step in Your Career?
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Apply to top-tier companies with 1-click candidate profiles, track your interview pipeline in real time, or post open roles for your team.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={scrollToDirectory}
              className="px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-bold bg-gradient-to-r from-indigo-600 to-violet-600 hover:brightness-110 text-white shadow-xl shadow-indigo-600/30 transition-all min-h-[44px]"
            >
              Browse Open Positions
            </button>
            <Link
              href="/recruiter/post-job"
              className="px-8 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 transition-all min-h-[44px]"
            >
              Post a Job for Free
            </Link>
          </div>
        </div>
      </section>

      {/* Modals */}
      <JobDetailsModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onApplyClick={(j) => setApplyModalJob(j)}
      />

      <ApplyModal
        job={applyModalJob}
        onClose={() => setApplyModalJob(null)}
      />

    </div>
  );
}
