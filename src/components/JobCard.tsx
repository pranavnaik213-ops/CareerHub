'use client';

import React from 'react';
import { Job } from '@/types';
import { useJobContext } from '@/context/JobContext';
import { MapPin, Clock, Bookmark, ArrowRight, Users, CheckCircle2, ShieldCheck, ExternalLink, Sparkles, Share2 } from 'lucide-react';
import { CompanyLogo } from '@/components/CompanyLogo';
import { formatSalaryRange } from '@/lib/formatSalary';
import { calculateJobMatch } from '@/lib/aiAgent';
import { trackEvent } from '@/lib/analytics';
import { sanitizeSafeUrl } from '@/lib/sanitizeUrl';

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

  // Compute AI Match Score for this job based on candidate profile
  const matchResult = calculateJobMatch(job, candidateProfile);

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

  const handleShareToLinkedIn = (e: React.MouseEvent) => {
    e.stopPropagation();
    const safeUrl = sanitizeSafeUrl(job.applyUrl);
    const shareUrl = encodeURIComponent(safeUrl !== '#' ? safeUrl : window.location.href);
    const title = encodeURIComponent(`Hiring: ${job.title} at ${job.company} (${formatSalaryRange(job.salaryMin, job.salaryMax, job.currency)})`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&summary=${title}`, '_blank', 'noopener,noreferrer');
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

          {/* Action Icons: Bookmark + LinkedIn Share + External Link */}
          <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={handleShareToLinkedIn}
              className="p-1.5 rounded-lg text-slate-400 hover:text-[#0A66C2] hover:bg-slate-800 transition-colors"
              title="Share job to LinkedIn"
              aria-label="Share job to LinkedIn"
            >
              <Share2 className="w-4 h-4" aria-hidden="true" />
            </button>

            {job.applyUrl && (
              <a
                href={sanitizeSafeUrl(job.applyUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                title={`Visit ${job.company} Careers Portal`}
                aria-label={`Visit ${job.company} Careers Portal`}
              >
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            )}

            <button
              onClick={handleToggleSave}
              className={`p-1.5 rounded-lg border transition-colors ${
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

        {/* Badges: Setup, Level, AI Match & Agent Tag */}
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

          {/* AI Match Score Pill */}
          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border flex items-center gap-1 ${
            matchResult.score >= 85
              ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50'
              : 'bg-blue-950/40 text-blue-300 border-blue-800/50'
          }`}>
            <Sparkles className="w-3 h-3 text-emerald-400" />
            {matchResult.score}% AI Match
          </span>

          {job.isAgentIngested && (
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-800 text-slate-400 border border-slate-700/60">
              ● AI Agent Synced
            </span>
          )}
        </div>

        {/* Salary Range in Rupees (₹) */}
        <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 mb-3 bg-emerald-950/20 px-2.5 py-1 rounded-md border border-emerald-900/40 w-fit">
          <span className="font-bold text-sm">
            {formatSalaryRange(job.salaryMin, job.salaryMax, job.currency)}
          </span>
          <span className="text-[11px] font-normal text-emerald-400/80">/ year</span>
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
              className="px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="View full role details and AI match evaluation"
            >
              Details
            </button>
            {job.applyUrl ? (
              <a
                href={sanitizeSafeUrl(job.applyUrl)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent('job_apply_external_clicked', {
                    jobId: job.id,
                    company: job.company,
                    title: job.title,
                  });
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors shadow-sm"
                title={`Apply directly on official ${job.company} Careers Portal`}
              >
                <span>Apply on {job.company}</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            ) : (
              <button
                onClick={() => onApplyClick(job)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
              >
                Apply
                <ArrowRight className="w-3 h-3" aria-hidden="true" />
              </button>
            )}
          </div>
        )}

      </div>

    </div>
  );
};
