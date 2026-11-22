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
  Search,
  Briefcase,
  Building2,
  ArrowRight,
  ShieldCheck,
  FilterX,
  SlidersHorizontal,
  ExternalLink,
  DollarSign
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

      {/* Clean, Simple Hero Section */}
      <section className="pt-4 pb-8 border-b border-slate-800">
        <div className="max-w-4xl space-y-5">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium bg-slate-900 border border-slate-800 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            <span>Verified Tech Openings from Industry-Leading Companies</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight font-heading">
            Find Your Next Engineering Role at Top Tech Companies
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Explore authentic open positions from Google, Stripe, Microsoft, Meta, Vercel, OpenAI, and more. Features transparent compensation, real company career links, and candidate ATS tracking.
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={scrollToDirectory}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors min-h-[44px]"
            >
              <span>Explore {activeJobsCount} Verified Jobs</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <Link
              href="/recruiter/post-job"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs sm:text-sm font-medium bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors min-h-[44px]"
            >
              <Building2 className="w-4 h-4 text-slate-400" aria-hidden="true" />
              <span>Post a Job</span>
            </Link>
          </div>

          {/* Quick Filter Pills with Real Tech Companies & Keywords */}
          <div className="flex flex-wrap items-center gap-2 pt-2">
            <span className="text-xs text-slate-400 mr-1">Quick Search:</span>
            {['Google', 'Microsoft', 'PhonePe', 'Uber', 'Stripe', 'Razorpay', 'Apple', 'Remote'].map((term, i) => (
              <button
                key={i}
                onClick={() => {
                  setFilters((prev) => ({
                    ...prev,
                    query: term === 'Remote' ? '' : term,
                    locationType: term === 'Remote' ? 'Remote' : prev.locationType,
                  }));
                  scrollToDirectory();
                }}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors min-h-[28px]"
              >
                {term}
              </button>
            ))}
          </div>

        </div>

        {/* 3 Real Value Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 mt-8 border-t border-slate-800/60">
          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold mb-1">
              <Building2 className="w-4 h-4 text-blue-400" aria-hidden="true" />
              Top Employers
            </div>
            <p className="text-xl font-bold text-white font-heading">22+ Tech Leaders</p>
            <p className="text-xs text-slate-400 mt-0.5">Google, Microsoft, Apple, Stripe, Uber, PhonePe, Meta, Netflix</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold mb-1">
              <span className="font-bold text-emerald-400 text-sm">₹</span>
              Indian Tech Salaries
            </div>
            <p className="text-xl font-bold text-white font-heading">₹35 LPA – ₹1.4 Cr</p>
            <p className="text-xs text-slate-400 mt-0.5">Verified Indian Rupee compensation ranges</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-xl">
            <div className="flex items-center gap-2 text-slate-300 text-xs font-semibold mb-1">
              <ExternalLink className="w-4 h-4 text-slate-400" aria-hidden="true" />
              Direct Careers Portals
            </div>
            <p className="text-xl font-bold text-white font-heading">Direct Links</p>
            <p className="text-xs text-slate-400 mt-0.5">Apply on company site or via 1-click ATS application</p>
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
