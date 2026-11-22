'use client';

import React from 'react';
import { Job } from '@/types';
import { useJobContext } from '@/context/JobContext';
import { X, MapPin, DollarSign, Clock, Users, CheckCircle2, Bookmark, ArrowRight, ShieldCheck, Gift, ExternalLink, Globe } from 'lucide-react';
import { CompanyLogo } from '@/components/CompanyLogo';
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

  const formatSalary = (val: number) => (val >= 1000 ? `$${Math.round(val / 1000)}k` : `$${val}`);

  const handleToggleSave = () => {
    toggleSaveJob(job.id);
    trackEvent(isSaved ? 'job_unsaved' : 'job_saved', {
      jobId: job.id,
      title: job.title,
    });
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
          
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-800 transition-colors"
            aria-label="Close job details modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="flex items-start gap-4">
            <CompanyLogo company={job.company} size="lg" />

            <div className="pr-8">
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
                <span className="text-emerald-400 font-semibold">
                  {formatSalary(job.salaryMin)} - {formatSalary(job.salaryMax)} / yr
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
          </div>

        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-7 space-y-6 overflow-y-auto custom-scrollbar flex-1 text-slate-300">
          
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
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  <span>Apply on Official Portal</span>
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
                Quick Apply
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
