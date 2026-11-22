'use client';

import React from 'react';
import { useJobContext } from '@/context/JobContext';
import { Search, RotateCcw, SlidersHorizontal, Check, X } from 'lucide-react';
import { LocationType, JobType, ExperienceLevel } from '@/types';
import { trackEvent } from '@/lib/analytics';
import { formatSalaryLakhs } from '@/lib/formatSalary';

const CATEGORIES = ['All', 'Engineering', 'Design', 'Data & AI', 'Infrastructure'];
const LOCATION_TYPES: (LocationType | 'All')[] = ['All', 'Remote', 'Hybrid', 'On-site'];
const JOB_TYPES: (JobType | 'All')[] = ['All', 'Full-time', 'Part-time', 'Contract'];
const EXPERIENCE_LEVELS: (ExperienceLevel | 'All')[] = ['All', 'Entry-level', 'Mid-level', 'Senior', 'Lead / Executive'];

interface JobFilterSidebarProps {
  onCloseMobile?: () => void;
}

export const JobFilterSidebar: React.FC<JobFilterSidebarProps> = ({ onCloseMobile }) => {
  const { filters, setFilters, resetFilters } = useJobContext();

  const handleQueryChange = (val: string) => {
    setFilters((prev) => ({ ...prev, query: val }));
    if (val.length > 2) {
      trackEvent('job_search', { query: val });
    }
  };

  const handleCategoryChange = (cat: string) => {
    setFilters((prev) => ({ ...prev, category: cat }));
    trackEvent('job_filter_applied', { filter: 'category', value: cat });
  };

  const handleLocationTypeChange = (loc: LocationType | 'All') => {
    setFilters((prev) => ({ ...prev, locationType: loc }));
    trackEvent('job_filter_applied', { filter: 'locationType', value: loc });
  };

  const handleJobTypeChange = (type: JobType | 'All') => {
    setFilters((prev) => ({ ...prev, jobType: type }));
    trackEvent('job_filter_applied', { filter: 'jobType', value: type });
  };

  return (
    <div className="bg-[#11141c] border border-slate-800 rounded-xl p-5 space-y-5">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-slate-300" aria-hidden="true" />
          <h2 className="text-xs font-semibold text-slate-200 uppercase tracking-wider">Filter Jobs</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
            title="Reset all filters"
          >
            <RotateCcw className="w-3 h-3" aria-hidden="true" />
            Reset
          </button>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-slate-400 hover:text-white rounded bg-slate-800"
              aria-label="Close filters"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-5">
        
        {/* Search Query */}
        <div>
          <label htmlFor="filter-search-query" className="block text-xs font-medium text-slate-300 mb-1.5">Search Keywords</label>
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              id="filter-search-query"
              type="text"
              value={filters.query}
              onChange={(e) => handleQueryChange(e.target.value)}
              placeholder="Company, title, skill..."
              className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-400 outline-none"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Category</label>
          <div className="space-y-1">
            {CATEGORIES.map((cat) => {
              const active = filters.category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? 'bg-blue-950/60 border border-blue-800/60 text-blue-300'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>{cat}</span>
                  {active && <Check className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Location Type */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Work Setup</label>
          <div className="grid grid-cols-2 gap-1.5">
            {LOCATION_TYPES.map((loc) => {
              const active = filters.locationType === loc;
              return (
                <button
                  key={loc}
                  onClick={() => handleLocationTypeChange(loc)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-medium text-center transition-colors ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {loc}
                </button>
              );
            })}
          </div>
        </div>

        {/* Job Type */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Employment Type</label>
          <div className="flex flex-wrap gap-1.5">
            {JOB_TYPES.map((type) => {
              const active = filters.jobType === type;
              return (
                <button
                  key={type}
                  onClick={() => handleJobTypeChange(type)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <label htmlFor="filter-exp-level" className="block text-xs font-medium text-slate-300 mb-1.5">Experience Level</label>
          <select
            id="filter-exp-level"
            value={filters.experienceLevel}
            onChange={(e) => setFilters((prev) => ({ ...prev, experienceLevel: e.target.value as any }))}
            className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-2.5 py-2 text-xs text-slate-200 outline-none"
          >
            {EXPERIENCE_LEVELS.map((exp) => (
              <option key={exp} value={exp} className="bg-slate-900 text-slate-200">
                {exp}
              </option>
            ))}
          </select>
        </div>

        {/* Minimum Salary Range Slider */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label htmlFor="filter-salary-min" className="text-xs font-medium text-slate-300">Min Annual Salary</label>
            <span className="text-xs font-semibold text-emerald-400">
              {filters.salaryMin > 0 ? `${formatSalaryLakhs(filters.salaryMin)}+` : 'Any'}
            </span>
          </div>
          <input
            id="filter-salary-min"
            type="range"
            min="0"
            max="10000000"
            step="500000"
            value={filters.salaryMin}
            onChange={(e) => setFilters((prev) => ({ ...prev, salaryMin: Number(e.target.value) }))}
            className="w-full accent-blue-500 bg-slate-800 rounded-lg cursor-pointer h-2"
          />
          <div className="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>₹0</span>
            <span>₹50 LPA</span>
            <span>₹1 Cr+</span>
          </div>
        </div>

      </div>

    </div>
  );
};
