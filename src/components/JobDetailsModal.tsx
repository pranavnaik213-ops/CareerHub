'use client';

import React from 'react';
import { Job } from '@/types';
import { useJobContext } from '@/context/JobContext';
import { X, MapPin, Users, CheckCircle2, Bookmark, ArrowRight, ShieldCheck, Gift, ExternalLink, Globe, Sparkles, Share2 } from 'lucide-react';
import { CompanyLogo } from '@/components/CompanyLogo';
import { formatSalaryRange } from '@/lib/formatSalary';
import { calculateJobMatch } from '@/lib/aiAgent';
import { trackEvent } from '@/lib/analytics';

interface JobDetailsModalProps {
  job: Job | null;
  onClose: () => void;
  onApplyClick: (job: Job) => void;
}

export const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, onClose, onApplyClick }) => {
  const { savedJobIds, toggleSaveJob, applications, candidateProfile } = useJobContext();

  if (!job) return null;

  const isSaved = savedJobIds.includes(job.id);
  const hasApplied = applications.some((app) => app.jobId === job.id && app.candidateEmail === candidateProfile.email);
  const appliedApp = applications.find((app) => app.jobId === job.id && app.candidateEmail === candidateProfile.email);

  // Compute AI Match score
  const matchResult = calculateJobMatch(job, candidateProfile);

  const handleToggleSave = () => {
    toggleSaveJob(job.id);
    trackEvent(isSaved ? 'job_unsaved' : 'job_saved', {
      jobId: job.id,
      title: job.title,
    });
  };

  const handleShareToLinkedIn = () => {
    const shareUrl = encodeURIComponent(job.applyUrl || window.location.href);
    const title = encodeURIComponent(`Hiring: ${job.title} at ${job.company} (${formatSalaryRange(job.salaryMin, job.salaryMax, job.currency)})`);
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&summary=${title}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-job-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl bg-[#11141c] border border-slate-800 rounded-2xl shadow-xl overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col my-auto">
        
        {/* Top Header Banner */}
        <div className="p-6 sm:p-7 bg-slate-900 border-b border-slate-800">
          
          <div className="absolute top-5 right-5 flex items-center gap-2">
            <button
              onClick={handleShareToLinkedIn}
              className="p-2 text-slate-400 hover:text-[#0A66C2] rounded-lg bg-slate-800/80 hover:bg-slate-800 transition-colors"
              title="Share job to LinkedIn"
              aria-label="Share job to LinkedIn"
            >
              <Share2 className="w-4 h-4" aria-hidden="true" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-800 transition-colors"
              aria-label="Close job details modal"
            >
              <X className="w-5 h-5" aria-hidden="true" />
            </button>
          </div>

          <div className="flex items-start gap-4">
            <CompanyLogo company={job.company} size="lg" />

            <div className="pr-16">
              <h2 id="modal-job-title" className="text-xl sm:text-2xl font-bold text-slate-100 mb-1.5 font-heading">{job.title}</h2>
              
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300">
                <span className="font-semibold text-slate-200 flex items-center gap-1">
                  {job.company}
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-400" aria-hidden="true" />
                </span>
                <span aria-hidden="true" className="text-slate-600">•</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <MapPin className="w-3.5 h-3.5 text-slate-500" aria-hidden="true" />
                  {job.location} ({job.locationType})
                </span>
                <span aria-hidden="true" className="text-slate-600">•</span>
                <span className="text-emerald-400 font-bold text-sm">
                  {formatSalaryRange(job.salaryMin, job.salaryMax, job.currency)} / yr
                </span>
              </div>

              {job.companyUrl && (
                <div className="mt-2.5">
                  <a
                    href={job.companyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{job.companyUrl.replace('https://', '')}</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-slate-800/60">
            <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              {job.jobType}
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              {job.experienceLevel}
            </span>
            <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
              {job.category}
            </span>
            <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border flex items-center gap-1 ${
              matchResult.score >= 85
                ? 'bg-emerald-950/40 text-emerald-300 border-emerald-800/50'
                : 'bg-blue-950/40 text-blue-300 border-blue-800/50'
            }`}>
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              {matchResult.score}% Profile Match
            </span>
          </div>

        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-7 space-y-6 overflow-y-auto custom-scrollbar flex-1 text-slate-300">

          {/* Direct Official Company Career Portal Banner */}
          {job.applyUrl && (
            <div className="p-3.5 bg-blue-950/25 border border-blue-800/40 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-blue-400" aria-hidden="true" />
                  Verified Official Company Career Portal
                </p>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  This opening is directly hosted on {job.company}&apos;s verified corporate careers infrastructure.
                </p>
              </div>
              <a
                href={job.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackEvent('job_apply_external_clicked', {
                    jobId: job.id,
                    company: job.company,
                    title: job.title,
                  });
                }}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>Apply on {job.company}</span>
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>
          )}
          
          {/* AI Match Breakdown Card */}
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                AI Agent Compatibility Evaluation
              </span>
              <span className="text-xs font-bold text-emerald-400">{matchResult.score}% Fit</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">{matchResult.summary}</p>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {matchResult.matchingSkills.map((s, i) => (
                <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-emerald-950/50 text-emerald-300 border border-emerald-800/50">
                  ✓ {s}
                </span>
              ))}
              {matchResult.missingSkills.map((s, i) => (
                <span key={i} className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700">
                  + {s}
                </span>
              ))}
            </div>
          </div>

          {/* About Position */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">About the Role</h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{job.description}</p>
          </div>

          {/* Key Responsibilities */}
          {job.responsibilities.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                Key Responsibilities
              </h3>
              <ul className="space-y-1.5">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 flex-shrink-0" aria-hidden="true" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements.length > 0 && (
            <div>
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2 flex items-center gap-2">
                Requirements & Qualifications
              </h3>
              <ul className="space-y-1.5">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 flex-shrink-0" aria-hidden="true" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Skills */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2">Required Skills & Tech Stack</h3>
            <div className="flex flex-wrap gap-1.5">
              {job.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits & Perks */}
          {job.benefits.length > 0 && (
            <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
              <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <Gift className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                Benefits & Perks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {job.benefits.map((ben, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                    <span>{ben}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom CTA Footer */}
        <div className="p-4 sm:p-5 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={handleToggleSave}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg border text-xs font-medium transition-colors ${
              isSaved
                ? 'bg-blue-950/40 border-blue-800/60 text-blue-400'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
            }`}
            aria-label={isSaved ? 'Remove from bookmarks' : 'Save job'}
          >
            <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-blue-400 text-blue-400' : ''}`} aria-hidden="true" />
            {isSaved ? 'Saved' : 'Save Job'}
          </button>

          {hasApplied ? (
            <div className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-950/40 border border-emerald-800/50 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              Applied ({appliedApp?.status})
            </div>
          ) : (
            <div className="flex items-center gap-2 ml-auto">
              {job.applyUrl && (
                <a
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent('job_apply_external_clicked', {
                      jobId: job.id,
                      company: job.company,
                      title: job.title,
                    });
                  }}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  <span>Apply on Official {job.company} Site</span>
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                </a>
              )}

              <button
                onClick={() => {
                  onClose();
                  onApplyClick(job);
                }}
                className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
              >
                1-Click ATS Fast-Track
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
