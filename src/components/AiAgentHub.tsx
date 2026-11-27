'use client';

import React, { useState, useEffect } from 'react';
import { useJobContext } from '@/context/JobContext';
import { fetchNextAgentJob, calculateJobMatch } from '@/lib/aiAgent';
import { Bot, RefreshCw, Sparkles, X, ShieldCheck, Zap } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export const AiAgentHub: React.FC = () => {
  const { jobs, postJob, candidateProfile, showToast } = useJobContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Just now');

  // Background auto-sync simulation: every 90 seconds, agent checks for new openings
  useEffect(() => {
    const timer = setInterval(() => {
      const newJob = fetchNextAgentJob(jobs);
      if (newJob) {
        postJob({
          title: newJob.title,
          company: newJob.company,
          logo: newJob.logo,
          companyUrl: newJob.companyUrl,
          applyUrl: newJob.applyUrl,
          location: newJob.location,
          locationType: newJob.locationType,
          jobType: newJob.jobType,
          experienceLevel: newJob.experienceLevel,
          category: newJob.category,
          salaryMin: newJob.salaryMin,
          salaryMax: newJob.salaryMax,
          currency: newJob.currency,
          description: newJob.description,
          responsibilities: newJob.responsibilities,
          requirements: newJob.requirements,
          skills: newJob.skills,
          benefits: newJob.benefits,
          featured: newJob.featured,
        });
        setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        showToast(`AI Agent auto-ingested new verified opening: ${newJob.company} (${newJob.title})`, 'info');
      }
    }, 90000);

    return () => clearInterval(timer);
  }, [jobs, postJob, showToast]);

  const handleManualSync = () => {
    setIsSyncing(true);
    trackEvent('ai_agent_sync_triggered', {});

    setTimeout(() => {
      const newJob = fetchNextAgentJob(jobs);
      setIsSyncing(false);

      if (newJob) {
        postJob({
          title: newJob.title,
          company: newJob.company,
          logo: newJob.logo,
          companyUrl: newJob.companyUrl,
          applyUrl: newJob.applyUrl,
          location: newJob.location,
          locationType: newJob.locationType,
          jobType: newJob.jobType,
          experienceLevel: newJob.experienceLevel,
          category: newJob.category,
          salaryMin: newJob.salaryMin,
          salaryMax: newJob.salaryMax,
          currency: newJob.currency,
          description: newJob.description,
          responsibilities: newJob.responsibilities,
          requirements: newJob.requirements,
          skills: newJob.skills,
          benefits: newJob.benefits,
          featured: newJob.featured,
        });
        setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        showToast(`AI Agent verified and synced new opening: ${newJob.company} - ${newJob.title}!`, 'success');
      } else {
        showToast('All 14 partner career portals are up-to-date. No new unlisted openings found.', 'info');
      }
    }, 800);
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3 border-y border-slate-800 py-3 text-sm">
        <div className="flex min-w-0 items-center gap-2 text-slate-400">
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
          <span className="truncate">Listings sync automatically</span>
          <span className="hidden text-slate-600 sm:inline" aria-hidden="true">·</span>
          <span className="hidden tabular-nums text-slate-500 sm:inline">{jobs.length} open roles</span>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={handleManualSync}
            disabled={isSyncing}
            className="flex items-center gap-1.5 rounded-md px-3 py-2 text-xs font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white disabled:opacity-60"
            title="Trigger AI Agent crawler to check for new tech openings"
          >
            <RefreshCw className={`h-3.5 w-3.5 text-slate-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Checking listings' : 'Sync listings'}</span>
          </button>

          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-1.5 rounded-md border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-slate-600 hover:bg-slate-800"
          >
            <Bot className="h-3.5 w-3.5 text-slate-400" />
            <span>Career assistant</span>
          </button>
        </div>
      </div>

      {/* AI Copilot Modal / Drawer */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
        >
          <div className="relative w-full max-w-xl bg-[#11141c] border border-slate-800 rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[88vh]">
            
            {/* Header */}
            <div className="p-4 sm:p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white font-heading">CareerHub AI Autonomous Agent</h3>
                  <p className="text-[11px] text-slate-400">Platform orchestration, candidate screening & job ingestion</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded bg-slate-800/80 transition-colors"
                aria-label="Close AI agent modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 space-y-4 overflow-y-auto custom-scrollbar text-xs">
              
              {/* Agent Status Card */}
              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    Agent Orchestration Engine Status
                  </span>
                  <span className="text-[10px] bg-emerald-950/40 text-emerald-400 border border-emerald-800/40 px-2 py-0.5 rounded font-medium">
                    100% Operational
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300 pt-1">
                  <div>
                    <span className="text-slate-500 block">Monitored Tech Hubs:</span>
                    <span>Google, Stripe, Meta, Vercel, Razorpay +9</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Compensation Engine:</span>
                    <span>Calibrated to INR (₹ LPA & Cr)</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Automated Sync:</span>
                    <span>Every 90s background cycle</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Last Verification:</span>
                    <span>{lastSyncTime}</span>
                  </div>
                </div>
              </div>

              {/* Candidate Matching Intelligence */}
              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    Your Candidate Profile Match Evaluation
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  Evaluating profile for <span className="text-white font-medium">{candidateProfile.name}</span> ({candidateProfile.headline}).
                </p>

                <div className="space-y-1.5 pt-1">
                  {jobs.slice(0, 3).map((job) => {
                    const match = calculateJobMatch(job, candidateProfile);
                    return (
                      <div key={job.id} className="p-2.5 rounded bg-slate-950 border border-slate-800 flex items-center justify-between gap-3">
                        <div>
                          <p className="font-semibold text-white">{job.title}</p>
                          <p className="text-[11px] text-slate-400">{job.company} • {job.location}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          match.score >= 85
                            ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/50'
                            : 'bg-blue-950/40 text-blue-300 border border-blue-800/50'
                        }`}>
                          {match.score}% Match
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Recruiter ATS Screener Features */}
              <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-lg space-y-1.5">
                <span className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  ATS AI Auto-Screening Capability
                </span>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  When job applications arrive, the AI Screener checks required skills, computes qualification scores, and drafts interview slots for recruiters in the ATS Kanban pipeline.
                </p>
              </div>

            </div>

            {/* Footer */}
            <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Agent running Next.js 16 AI orchestration
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs transition-colors"
              >
                Done
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
