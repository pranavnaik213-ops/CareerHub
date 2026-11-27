'use client';

import React, { useState, useEffect } from 'react';
import { useJobContext } from '@/context/JobContext';
import { Job } from '@/types';
import { JobCard } from '@/components/JobCard';
import { JobFilterSidebar } from '@/components/JobFilterSidebar';
import { JobDetailsModal } from '@/components/JobDetailsModal';
import { ApplyModal } from '@/components/ApplyModal';
import { AiAgentHub } from '@/components/AiAgentHub';
import {
  Briefcase,
  Building2,
  ArrowRight,
  FilterX,
  SlidersHorizontal,
  Search
} from 'lucide-react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

export default function HomePage() {
  const { filteredJobs, jobs, filters, setFilters, role, resetFilters } = useJobContext();
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
    <div className="space-y-10">

      <section className="border-b border-slate-800 pb-8 pt-2 sm:pb-10">
        <div className="max-w-3xl space-y-5">
          <p className="text-sm font-medium text-blue-400">CareerHub · Technology careers</p>
          <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Find work that moves your career forward.
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Explore current engineering, design, and data roles from technology companies. Compare details and apply directly.
          </p>

          <form
            className="flex max-w-2xl flex-col gap-2 rounded-xl border border-slate-700 bg-slate-900 p-2 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              scrollToDirectory();
            }}
            role="search"
          >
            <label className="flex min-h-11 flex-1 items-center gap-3 px-3">
              <Search className="h-4 w-4 shrink-0 text-slate-500" aria-hidden="true" />
              <span className="sr-only">Search jobs by title, company, or skill</span>
              <input
                value={filters.query}
                onChange={(event) => setFilters((previous) => ({ ...previous, query: event.target.value }))}
                placeholder="Job title, company, or skill"
                className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
              />
            </label>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
            >
              Search jobs <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1 text-sm text-slate-400">
            <span><span className="font-medium text-slate-200 tabular-nums">{activeJobsCount}</span> current openings</span>
            <span>Roles across engineering, design, and data</span>
            <Link href="/recruiter/post-job" className="inline-flex items-center gap-1 font-medium text-slate-200 transition-colors hover:text-blue-400">
              Hiring? Post a job <Building2 className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Recruiter Notice Bar if in Recruiter Mode */}
      {role === 'recruiter' && (
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Building2 className="w-5 h-5 text-blue-400 flex-shrink-0" aria-hidden="true" />
            <div>
              <p className="text-xs font-semibold text-slate-200">Recruiter Mode Enabled</p>
              <p className="text-xs text-slate-400">
                Manage applicant stages in your ATS Kanban board or publish verified job positions.
              </p>
            </div>
          </div>
          <Link
            href="/recruiter/dashboard"
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            Open Recruiter ATS
          </Link>
        </div>
      )}

      {/* Mobile Filter Drawer Button */}
      <div className="lg:hidden flex items-center justify-between bg-slate-900 p-3 rounded-xl border border-slate-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-300" aria-hidden="true" />
          <span className="text-xs font-medium text-slate-200">Filter Jobs</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">
              {activeFilterCount}
            </span>
          )}
        </div>
        <button
          onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 text-slate-200 hover:text-white border border-slate-700 transition-colors"
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

      {/* Autonomous AI Agent Real-Time Crawler & Hub */}
      <AiAgentHub />

      {/* Main Job Directory Grid */}
      <div id="jobs-directory" className="grid grid-cols-1 lg:grid-cols-4 gap-8 scroll-mt-20">

        {/* Left Filter Sidebar (Desktop) */}
        <div className="hidden lg:block lg:col-span-1">
          <JobFilterSidebar />
        </div>

        {/* Right Jobs Listing Grid */}
        <div className="lg:col-span-3 space-y-6">

          {/* Active Results Header */}
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
                Available Positions
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                  {filteredJobs.length} {filteredJobs.length === 1 ? 'Job' : 'Jobs'}
                </span>
              </h2>
            </div>

            {activeFilterCount > 0 && (
              <button
                onClick={resetFilters}
                className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium p-1"
              >
                <FilterX className="w-3.5 h-3.5" aria-hidden="true" />
                Clear Filters ({activeFilterCount})
              </button>
            )}
          </div>

          {/* Jobs List */}
          {filteredJobs.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400" aria-hidden="true">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-semibold text-slate-200">No jobs match your search criteria</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                Try adjusting your search keywords, location filters, or salary thresholds.
              </p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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

      {/* Clean Bottom Call to Action Banner */}
      <section className="rounded-2xl p-8 border border-slate-800 bg-slate-900 text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-white font-heading">
          Looking to Hire Top Software Talent?
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          Post job openings to our verified developer community, track applicants through an integrated ATS Kanban pipeline, and streamline technical recruitment.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/recruiter/post-job"
            className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            Post a Job Opening
          </Link>
          <Link
            href="/pricing"
            className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            View Employer Pricing
          </Link>
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
