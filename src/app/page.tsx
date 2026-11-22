'use client';

import React, { useState, useEffect } from 'react';
import { useJobContext } from '@/context/JobContext';
import { Job } from '@/types';
import { JobCard } from '@/components/JobCard';
import { JobFilterSidebar } from '@/components/JobFilterSidebar';
import { JobDetailsModal } from '@/components/JobDetailsModal';
import { ApplyModal } from '@/components/ApplyModal';
import { Search, Sparkles, Briefcase, Building2, Users, ArrowRight, ShieldCheck, FilterX, SlidersHorizontal, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
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
      
      {/* Hero Header Banner */}
      <section className="relative rounded-3xl overflow-hidden p-8 sm:p-14 border border-slate-800 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 shadow-2xl">
        
        {/* Glowing Orbs background graphics */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
            <span>Over 1,200+ Verified Tech Companies Hiring Now</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Find Your Dream Career or <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">Hire Top Tech Talent</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            CareerHub simplifies hiring with centralized candidate application tracking, direct recruiter pipelines, and verified job matching for software engineers, designers, and tech leaders.
          </p>

          {/* TASK 20: ONE CLEAR CALL TO ACTION BUTTON */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={scrollToDirectory}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-sm font-bold bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:brightness-110 text-white shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all min-h-[48px]"
            >
              <span>Explore {activeJobsCount}+ Verified Openings</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <Link
              href="/recruiter/post-job"
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 transition-all min-h-[48px]"
            >
              <Building2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
              <span>Post a Job for Free</span>
            </Link>
          </div>

          {/* Quick Category Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-semibold text-slate-400 mr-1">Popular Searches:</span>
            {['Software Engineering', 'UI/UX Design', 'Data & AI', 'Remote', 'Marketing'].map((tag, i) => (
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

          {/* Stats Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg">
            <div>
              <div className="text-2xl font-bold text-white">{activeJobsCount}</div>
              <div className="text-xs text-slate-400 font-medium">Active Positions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-400">100%</div>
              <div className="text-xs text-slate-400 font-medium">Verified Listings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">&lt; 48 hrs</div>
              <div className="text-xs text-slate-400 font-medium">Avg First Response</div>
            </div>
          </div>

        </div>

      </section>

      {/* Recruiter Notice Bar if in Recruiter Mode */}
      {role === 'recruiter' && (
        <div className="p-4 rounded-2xl bg-violet-950/40 border border-violet-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-violet-400 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs font-bold text-violet-200">You are currently in Recruiter Mode</p>
              <p className="text-[11px] text-violet-300">
                You can inspect candidate applications in your ATS Dashboard or post a new job position.
              </p>
            </div>
          </div>
          <Link
            href="/recruiter/dashboard"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-md flex-shrink-0 transition-colors min-h-[38px] flex items-center justify-center"
          >
            Go to ATS Dashboard
          </Link>
        </div>
      )}

      {/* Mobile Filter Drawer Button (Visible on mobile screens) */}
      <div className="lg:hidden flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-indigo-400" aria-hidden="true" />
          <span className="text-xs font-bold text-slate-200">Filters</span>
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
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
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

      {/* TASK 20: DEDICATED HIGH-CONVERTING BOTTOM CALL TO ACTION BANNER */}
      <section className="relative rounded-3xl overflow-hidden p-8 sm:p-12 border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/50 to-slate-900 shadow-2xl text-center space-y-6">
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
