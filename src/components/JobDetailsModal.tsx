'use client';

import React from 'react';
import { Job } from '@/types';
import { useJobContext } from '@/context/JobContext';
import { X, MapPin, DollarSign, Clock, Users, Building, CheckCircle2, Bookmark, ArrowRight, ShieldCheck, Gift } from 'lucide-react';
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in overflow-y-auto"
    >
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col my-auto">
        
        {/* Top Header Banner */}
        <div className="relative p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border-b border-slate-800">
          
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/60 hover:bg-slate-800 transition-colors min-w-[40px] min-h-[40px] flex items-center justify-center"
            aria-label="Close job details modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>

          <div className="flex items-start gap-4">
            <CompanyLogo company={job.company} size="lg" />

            <div className="pr-8">
              <h2 id="modal-job-title" className="text-xl sm:text-2xl font-bold text-slate-100 mb-1">{job.title}</h2>
              
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-300">
                <span className="font-semibold text-indigo-400 flex items-center gap-1">
                  {job.company}
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" aria-hidden="true" />
                </span>
                <span aria-hidden="true">•</span>
                <span className="flex items-center gap-1 text-slate-300">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
                  {job.location} ({job.locationType})
                </span>
                <span aria-hidden="true">•</span>
                <span className="text-emerald-400 font-bold">
                  {formatSalary(job.salaryMin)} - {formatSalary(job.salaryMax)} / yr
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mt-5">
            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 border border-slate-700">
              {job.jobType}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-violet-500/10 text-violet-300 border border-violet-500/20">
              {job.experienceLevel}
            </span>
            <span className="px-3 py-1 rounded-lg text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {job.category}
            </span>
          </div>

        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 sm:p-8 space-y-8 overflow-y-auto custom-scrollbar flex-1">
          
          {/* About Position */}
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">About the Role</h3>
            <p className="text-sm text-slate-300 leading-relaxed">{job.description}</p>
          </div>

          {/* Key Responsibilities */}
          {job.responsibilities.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-indigo-400" aria-hidden="true" />
                Key Responsibilities
              </h3>
              <ul className="space-y-2">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 flex-shrink-0" aria-hidden="true" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Requirements */}
          {job.requirements.length > 0 && (
            <div>
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-violet-400" aria-hidden="true" />
                Requirements & Qualifications
              </h3>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" aria-hidden="true" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Required Skills */}
          <div>
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3">Required Skills & Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl text-xs font-semibold bg-slate-800 text-indigo-200 border border-slate-700/80"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Benefits & Perks */}
          {job.benefits.length > 0 && (
            <div className="bg-slate-950/60 p-5 rounded-2xl border border-slate-800">
              <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider mb-3 flex items-center gap-2">
                <Gift className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                Benefits & Perks
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {job.benefits.map((ben, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-medium text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                    <span>{ben}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom CTA Footer */}
        <div className="p-6 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={handleToggleSave}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold transition-all min-h-[44px] ${
              isSaved
                ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
            aria-label={isSaved ? 'Remove from bookmarks' : 'Save job'}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-indigo-400 text-indigo-400' : ''}`} aria-hidden="true" />
            {isSaved ? 'Saved to Bookmarks' : 'Save Job'}
          </button>

          {hasApplied ? (
            <div className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold min-h-[44px]">
              <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
              Applied ({appliedApp?.status})
            </div>
          ) : (
            <button
              onClick={() => {
                onClose();
                onApplyClick(job);
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/25 transition-all min-h-[44px]"
            >
              Apply for Position
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
