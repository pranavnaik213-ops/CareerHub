'use client';

import React from 'react';
import { Job } from '@/types';
import { useJobContext } from '@/context/JobContext';
import { MapPin, DollarSign, Clock, Bookmark, ArrowRight, Users, CheckCircle2, ShieldCheck, ExternalLink } from 'lucide-react';
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
        return 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50';
      case 'Hybrid':
        return 'bg-slate-800 text-slate-300 border-slate-700';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
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
      className="group relative rounded-xl p-5 sm:p-6 bg-[#11141c] border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between cursor-pointer"
    >
      {/* Top Header: Company logo, Title, Actions */}
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          
          <div className="flex items-center gap-3">
            <CompanyLogo company={job.company} size="md" />

            <div>
              <h3 className="text-base font-semibold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-1">
                {job.title}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs font-medium text-slate-300 flex items-center gap-1">
                  {job.company}
                  <span title="Verified Tech Employer" className="inline-flex items-center">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                  </span>
                </span>
                <span className="text-slate-600" aria-hidden="true">•</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                  {job.location}
                </span>
              </div>
            </div>
          </div>

          {/* Action Icons: Bookmark + External Career Page Link */}
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            {job.applyUrl && (
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                title={`Visit ${job.company} Careers Page`}
                aria-label={`Visit ${job.company} Careers Page`}
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}

            <button
              onClick={handleToggleSave}
              className={`p-2 rounded-lg border transition-colors ${
                isSaved
                  ? 'bg-blue-950/40 border-blue-800/60 text-blue-400'
                  : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
              }`}
              title={isSaved ? 'Remove from saved' : 'Save job'}
              aria-label={isSaved ? `Remove ${job.title} from bookmarks` : `Bookmark ${job.title}`}
            >
              <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-blue-400 text-blue-400' : ''}`} aria-hidden="true" />
            </button>
          </div>

        </div>

        {/* Work Setup & Level Chips */}
        <div className="flex flex-wrap items-center gap-1.5 mb-3">
          <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${getLocationBadge(job.locationType)}`}>
            {job.locationType}
          </span>

          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60">
            {job.jobType}
          </span>

          <span className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60">
            {job.experienceLevel}
          </span>
        </div>

        {/* Salary Range */}
        <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400 mb-3 bg-emerald-950/20 px-2.5 py-1 rounded-md border border-emerald-900/40 w-fit">
          <DollarSign className="w-3.5 h-3.5" aria-hidden="true" />
          <span>{formatSalary(job.salaryMin)} - {formatSalary(job.salaryMax)} <span className="text-[11px] font-normal text-emerald-400/80">/ year</span></span>
        </div>

        {/* Short description */}
        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
          {job.description}
        </p>

        {/* Key Skills Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.skills.slice(0, 4).map((skill, idx) => (
            <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700/50">
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800/40 text-slate-400">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>

      </div>

      {/* Footer Action Bar */}
      <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
        
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span className="flex items-center gap-1 text-[11px]">
            <Clock className="w-3 h-3 text-slate-500" aria-hidden="true" />
            {job.postedDate}
          </span>
          <span aria-hidden="true">•</span>
          <span className="flex items-center gap-1 text-[11px] text-slate-400">
            <Users className="w-3 h-3 text-slate-500" aria-hidden="true" />
            {job.applicantsCount} applicants
          </span>
        </div>

        {hasApplied ? (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-950/40 text-emerald-400 border border-emerald-800/50">
            <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
            {appliedApp?.status}
          </span>
        ) : (
          <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleSelectJob}
              className="px-3 py-1.5 rounded-md text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            >
              Details
            </button>
            <button
              onClick={() => onApplyClick(job)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              Apply
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </button>
          </div>
        )}

      </div>

    </div>
  );
};
