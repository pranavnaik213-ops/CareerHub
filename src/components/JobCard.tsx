'use client';

import React from 'react';
import { Job } from '@/types';
import { useJobContext } from '@/context/JobContext';
import { MapPin, DollarSign, Clock, Bookmark, Sparkles, ArrowRight, Users, CheckCircle2 } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onSelect: (job: Job) => void;
  onApplyClick: (job: Job) => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onSelect, onApplyClick }) => {
  const { savedJobIds, toggleSaveJob, applications, candidateProfile } = useJobContext();
  const isSaved = savedJobIds.includes(job.id);
  const hasApplied = applications.some((app) => app.jobId === job.id && app.candidateEmail === candidateProfile.email);
  const appliedApp = applications.find((app) => app.jobId === job.id && app.candidateEmail === candidateProfile.email);

  const formatSalary = (val: number) => {
    return val >= 1000 ? `$${Math.round(val / 1000)}k` : `$${val}`;
  };

  const getLocationBadge = (type: string) => {
    switch (type) {
      case 'Remote':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Hybrid':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="group relative bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/80 hover:border-indigo-500/40 rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col justify-between">
      
      {/* Top Header: Company logo, Title, Saved button */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          
          <div className="flex items-center gap-3.5">
            {/* Company Logo Icon Container */}
            <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700/60 flex items-center justify-center text-2xl shadow-inner group-hover:scale-105 transition-transform">
              {job.logo}
            </div>

            <div>
              <h3
                onClick={() => onSelect(job)}
                className="text-base font-bold text-slate-100 group-hover:text-indigo-300 transition-colors cursor-pointer line-clamp-1"
              >
                {job.title}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-medium text-slate-400">{job.company}</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {job.location}
                </span>
              </div>
            </div>
          </div>

          {/* Save / Bookmark Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveJob(job.id);
            }}
            className={`p-2.5 rounded-xl border transition-all ${
              isSaved
                ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-400'
                : 'bg-slate-800/50 border-slate-700/50 text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save job'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-indigo-400' : ''}`} />
          </button>

        </div>

        {/* Featured Tag & Specs */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          
          {job.featured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}

          <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold border ${getLocationBadge(job.locationType)}`}>
            {job.locationType}
          </span>

          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-slate-800/80 text-slate-300 border border-slate-700/60">
            {job.jobType}
          </span>

          <span className="px-2.5 py-1 rounded-md text-[11px] font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
            {job.experienceLevel}
          </span>

        </div>

        {/* Salary Range */}
        <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-400 mb-4 bg-emerald-950/30 px-3 py-1.5 rounded-xl border border-emerald-500/15 w-fit">
          <DollarSign className="w-4 h-4 text-emerald-400" />
          <span>{formatSalary(job.salaryMin)} - {formatSalary(job.salaryMax)} / yr</span>
        </div>

        {/* Short snippet */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {job.description}
        </p>

        {/* Key Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {job.skills.slice(0, 4).map((skill, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800/60 text-slate-300 border border-slate-700/40">
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-800/40 text-slate-400">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>

      </div>

      {/* Footer Action Bar */}
      <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between">
        
        <div className="flex items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-slate-500" />
            {job.postedDate}
          </span>
          <span>•</span>
          <span className="flex items-center gap-1 text-slate-400">
            <Users className="w-3 h-3 text-indigo-400" />
            {job.applicantsCount} applicants
          </span>
        </div>

        {hasApplied ? (
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5" />
            {appliedApp?.status}
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelect(job)}
              className="px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Details
            </button>
            <button
              onClick={() => onApplyClick(job)}
              className="flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition-all group-hover:translate-x-0.5"
            >
              Apply
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
