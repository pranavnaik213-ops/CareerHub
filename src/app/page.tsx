'use client';

import React, { useState } from 'react';
import { useJobContext } from '@/context/JobContext';
import { Job } from '@/types';
import { JobCard } from '@/components/JobCard';
import { JobFilterSidebar } from '@/components/JobFilterSidebar';
import { JobDetailsModal } from '@/components/JobDetailsModal';
import { ApplyModal } from '@/components/ApplyModal';
import { Search, Sparkles, Briefcase, Building2, Users, ArrowRight, ShieldCheck, FilterX } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const { filteredJobs, jobs, filters, setFilters, role, resetFilters } = useJobContext();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyModalJob, setApplyModalJob] = useState<Job | null>(null);

  const activeJobsCount = jobs.filter((j) => j.status === 'Active').length;

  return (
    <div className="space-y-12">
      
      {/* Hero Header Banner */}
      <section className="relative rounded-3xl overflow-hidden p-8 sm:p-12 border border-slate-800 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 shadow-2xl">
        
        {/* Glowing Orbs background graphics */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-6">
          
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Over 1,200+ Verified Companies Hiring Now</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Find Your Dream Career or <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">Hire Top Tech Talent</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            CareerHub simplifies hiring with centralized candidate application tracking, direct recruiter pipelines, and smart job matching.
          </p>

          {/* Quick Category Tags */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs font-medium text-slate-400 mr-1">Popular Searches:</span>
            {['Software Engineering', 'UI/UX Design', 'Data & AI', 'Remote', 'Marketing'].map((tag, i) => (
              <button
                key={i}
                onClick={() => setFilters((prev) => ({ ...prev, query: tag === 'Remote' ? '' : tag, locationType: tag === 'Remote' ? 'Remote' : prev.locationType }))}
                className="px-3 py-1 rounded-xl text-xs font-medium bg-slate-900/80 hover:bg-indigo-600/30 text-slate-300 hover:text-indigo-200 border border-slate-800 transition-all"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Stats Badges */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 max-w-lg">
            <div>
              <div className="text-2xl font-bold text-white">{activeJobsCount}</div>
              <div className="text-xs text-slate-400">Active Positions</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-indigo-400">100%</div>
              <div className="text-xs text-slate-400">Verified Listings</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-emerald-400">&lt; 48 hrs</div>
              <div className="text-xs text-slate-400">Avg First Response</div>
            </div>
          </div>

        </div>

      </section>

      {/* Recruiter Notice Bar if in Recruiter Mode */}
      {role === 'recruiter' && (
        <div className="p-4 rounded-2xl bg-violet-950/30 border border-violet-500/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-violet-400 flex-shrink-0" />
            <div>
              <p className="text-xs font-bold text-violet-200">You are currently in Recruiter Mode</p>
              <p className="text-[11px] text-violet-300/80">
                You can inspect candidate applications in your ATS Dashboard or post a new job position.
              </p>
            </div>
          </div>
          <Link
            href="/recruiter/dashboard"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-violet-600 hover:bg-violet-500 text-white shadow-md flex-shrink-0 transition-colors"
          >
            Go to ATS Dashboard
          </Link>
        </div>
      )}

      {/* Main Job Directory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Filter Sidebar */}
        <div className="lg:col-span-1">
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

            {(filters.query || filters.category !== 'All' || filters.locationType !== 'All' || filters.jobType !== 'All' || filters.salaryMin > 0) && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 font-semibold"
              >
                <FilterX className="w-3.5 h-3.5" />
                Clear Active Filters
              </button>
            )}
          </div>

          {/* Jobs List */}
          {filteredJobs.length === 0 ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Briefcase className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-slate-200">No jobs match your search criteria</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Try adjusting your search keywords, work setup filters, or salary thresholds to discover more opportunities.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition-colors"
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
