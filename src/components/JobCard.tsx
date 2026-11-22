'use client';

import React from 'react';
import { Job } from '@/types';
import { useJobContext } from '@/context/JobContext';
import { MapPin, DollarSign, Clock, Bookmark, Sparkles, ArrowRight, Users, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CompanyLogo } from '@/components/CompanyLogo';
import { trackEvent } from '@/lib/analytics';

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
        return 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30';
      case 'Hybrid':
        return 'bg-amber-500/10 text-amber-300 border-amber-500/30';
      default:
        return 'bg-slate-800 text-slate-200 border-slate-700/80';
    }
  };

  const handleSelectJob = () => {
    trackEvent('job_card_viewed', {
      jobId: job.id,
      title: job.title,
      company: job.company,
    });
    onSelect(job);
  };

  const handleToggleSave = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveJob(job.id);
    trackEvent(isSaved ? 'job_unsaved' : 'job_saved', {
      jobId: job.id,
      title: job.title,
    });
  };

  return (
    <div
      onClick={handleSelectJob}
      className="group relative rounded-3xl p-6 sm:p-7 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/90 border border-slate-800 hover:border-indigo-500/50 backdrop-blur-xl transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/15 flex flex-col justify-between cursor-pointer hover:-translate-y-1"
    >
      {/* Top Header: Company logo, Title, Saved button */}
      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          
          <div className="flex items-center gap-3.5">
            {/* Professional SVG Company Logo (No raw emojis per UI-UX Pro Max) */}
            <CompanyLogo company={job.company} size="md" />

            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-1">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-semibold text-slate-200 flex items-center gap-1">
                  {job.company}
                  <span title="Verified Employer" className="inline-flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                  </span>
                </span>
                <span className="text-slate-600" aria-hidden="true">•</span>
                <span className="text-xs text-slate-300 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  {job.location}
                </span>
              </div>
            </div>
          </div>

          {/* Bookmark Button */}
          <button
            onClick={handleToggleSave}
            className={`p-2.5 rounded-2xl border transition-all min-w-[42px] min-h-[42px] flex items-center justify-center ${
              isSaved
                ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-400'
                : 'bg-slate-900/90 border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700'
            }`}
            title={isSaved ? 'Remove from saved' : 'Save job'}
            aria-label={isSaved ? `Remove ${job.title} from bookmarks` : `Bookmark ${job.title}`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-indigo-400 text-indigo-400' : ''}`} aria-hidden="true" />
          </button>

        </div>

        {/* Featured Tag & Work Setup Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {job.featured && (
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-lg text-[11px] font-bold bg-gradient-to-r from-amber-500/15 to-orange-500/15 text-amber-300 border border-amber-500/30">
              <Sparkles className="w-3 h-3 text-amber-400" aria-hidden="true" />
              Featured
            </span>
          )}

          <span className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold border ${getLocationBadge(job.locationType)}`}>
            {job.locationType}
          </span>

          <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-slate-800/80 text-slate-200 border border-slate-700/60">
            {job.jobType}
          </span>

          <span className="px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/25">
            {job.experienceLevel}
          </span>
        </div>

        {/* Salary Range */}
        <div className="flex items-center gap-1.5 text-sm font-bold text-emerald-400 mb-4 bg-emerald-950/30 px-3 py-1.5 rounded-xl border border-emerald-500/20 w-fit">
          <DollarSign className="w-4 h-4 text-emerald-400" aria-hidden="true" />
          <span>{formatSalary(job.salaryMin)} - {formatSalary(job.salaryMax)} <span className="text-xs font-medium text-emerald-300/80">/ year</span></span>
        </div>

        {/* Short snippet */}
        <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed mb-4">
          {job.description}
        </p>

        {/* Key Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {job.skills.slice(0, 4).map((skill, idx) => (
            <span key={idx} className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-800/90 text-slate-200 border border-slate-700/60">
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="px-2.5 py-1 rounded-lg text-[10px] font-medium bg-slate-800/40 text-slate-300">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>

      </div>

      {/* Footer Action Bar */}
      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
        
        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
            {job.postedDate}
          </span>
          <span aria-hidden="true">•</span>
          <span className="flex items-center gap-1 text-slate-300">
            <Users className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
            {job.applicantsCount} applicants
          </span>
        </div>

        {hasApplied ? (
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" aria-hidden="true" />
            {appliedApp?.status}
          </span>
        ) : (
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleSelectJob}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 hover:text-white hover:bg-slate-800 transition-colors min-h-[40px]"
            >
              Details
            </button>
            <button
              onClick={() => onApplyClick(job)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/25 transition-all group-hover:translate-x-0.5 min-h-[40px]"
            >
              Apply
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
