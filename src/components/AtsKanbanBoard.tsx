'use client';

import React, { useState } from 'react';
import { useJobContext } from '@/context/JobContext';
import { Application, ApplicationStatus } from '@/types';
import { FileText, Calendar, Clock, Search, ChevronRight, Filter, Mail, Phone, Sparkles, Bot, Video, Layers, X } from 'lucide-react';
import { CandidateComparisonModal } from '@/components/CandidateComparisonModal';
import { InterviewScheduleModal } from '@/components/InterviewScheduleModal';

const STAGES: { id: ApplicationStatus; title: string; color: string; border: string; dotColor: string }[] = [
  { id: 'Submitted', title: 'Submitted', color: 'bg-blue-950/40 text-blue-300', border: 'border-blue-800/50', dotColor: 'bg-blue-400' },
  { id: 'Under Review', title: 'Under Review', color: 'bg-amber-950/40 text-amber-300', border: 'border-amber-800/50', dotColor: 'bg-amber-400' },
  { id: 'Interview Scheduled', title: 'Interview Scheduled', color: 'bg-blue-950/40 text-blue-300', border: 'border-blue-800/50', dotColor: 'bg-blue-400' },
  { id: 'Offer Extended', title: 'Offer Extended', color: 'bg-emerald-950/40 text-emerald-300', border: 'border-emerald-800/50', dotColor: 'bg-emerald-400' },
  { id: 'Rejected', title: 'Rejected', color: 'bg-rose-950/40 text-rose-300', border: 'border-rose-800/50', dotColor: 'bg-rose-400' }
];

export const AtsKanbanBoard: React.FC = () => {
  const { applications, updateApplicationStatus, jobs } = useJobContext();
  const [selectedJobIdFilter, setSelectedJobIdFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCandidateModal, setActiveCandidateModal] = useState<Application | null>(null);
  const [editingNotes, setEditingNotes] = useState<string>('');
  const [interviewTime, setInterviewTime] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'resume' | 'schedule'>('overview');

  // Modals
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [scheduleCandidate, setScheduleCandidate] = useState<Application | null>(null);

  const filteredApps = applications.filter((app) => {
    if (selectedJobIdFilter !== 'All' && app.jobId !== selectedJobIdFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = app.candidateName.toLowerCase().includes(q);
      const matchJob = app.jobTitle.toLowerCase().includes(q);
      const matchSkills = app.skills.some((s) => s.toLowerCase().includes(q));
      if (!matchName && !matchJob && !matchSkills) return false;
    }
    return true;
  });

  const openCandidateDetails = (app: Application) => {
    setActiveCandidateModal(app);
    setEditingNotes(app.recruiterNotes || '');
    setInterviewTime(app.interviewDate || '');
    setActiveTab('overview');
  };

  const handleSaveNotes = () => {
    if (activeCandidateModal) {
      updateApplicationStatus(activeCandidateModal.id, activeCandidateModal.status, editingNotes, interviewTime);
      setActiveCandidateModal((prev) => (prev ? { ...prev, recruiterNotes: editingNotes, interviewDate: interviewTime } : null));
    }
  };

  const handleOpenScheduler = (app: Application) => {
    setScheduleCandidate(app);
  };

  const handleConfirmSchedule = (candidateId: string, interviewDate: string, notes: string) => {
    updateApplicationStatus(candidateId, 'Interview Scheduled', notes, interviewDate);
    if (activeCandidateModal && activeCandidateModal.id === candidateId) {
      setActiveCandidateModal((prev) => (prev ? { ...prev, status: 'Interview Scheduled', interviewDate, recruiterNotes: notes } : null));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top ATS Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
        
        {/* Search Candidate */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate name, position, or skill..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-400 outline-none"
          />
        </div>

        {/* Filter by Specific Job Posting & Compare Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2">
            <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block" aria-hidden="true" />
            <select
              value={selectedJobIdFilter}
              onChange={(e) => setSelectedJobIdFilter(e.target.value)}
              className="bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-slate-200 outline-none w-full sm:w-auto"
            >
              <option value="All">All Real Tech Openings ({jobs.length})</option>
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.title} ({job.company})
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => setIsCompareModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            Compare Candidates
          </button>
        </div>

      </div>

      {/* Kanban Board Columns with smooth horizontal scroll */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {STAGES.map((stage) => {
          const stageApps = filteredApps.filter((app) => app.status === stage.id);

          return (
            <div
              key={stage.id}
              className="bg-[#11141c] border border-slate-800 rounded-xl p-3.5 min-w-[260px] flex flex-col h-full"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${stage.dotColor}`} aria-hidden="true" />
                  <span className="text-xs font-bold text-slate-200">
                    {stage.title}
                  </span>
                </div>
                <span className="text-xs font-bold text-slate-300 bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-700/60">
                  {stageApps.length}
                </span>
              </div>

              {/* Column Cards */}
              <div className="space-y-3 flex-1">
                {stageApps.length === 0 ? (
                  <div className="p-8 text-center border border-dashed border-slate-800/80 rounded-2xl text-xs text-slate-400">
                    No candidates in this stage
                  </div>
                ) : (
                  stageApps.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => openCandidateDetails(app)}
                      className="group bg-slate-900/90 border border-slate-800/90 hover:border-blue-500/50 p-4 rounded-xl shadow-sm transition-colors cursor-pointer"
                    >
                      {/* Candidate Avatar & Job Title */}
                      <div className="flex justify-between items-start mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 text-white font-bold text-xs flex items-center justify-center flex-shrink-0">
                            {app.candidateName.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-slate-100 group-hover:text-blue-300 transition-colors">
                              {app.candidateName}
                            </h4>
                            <p className="text-[11px] font-medium text-slate-400 line-clamp-1">{app.jobTitle}</p>
                          </div>
                        </div>

                        {app.linkedInVerified && (
                          <span className="w-4 h-4 rounded-sm bg-[#0A66C2] text-white flex items-center justify-center font-bold text-[9px] flex-shrink-0" title="Verified LinkedIn Profile">
                            in
                          </span>
                        )}
                      </div>

                      {/* AI Screening Score Pill */}
                      {app.aiScreeningScore !== undefined && (
                        <div className="mb-2.5 flex items-center justify-between text-[11px] bg-slate-950 px-2 py-1 rounded border border-slate-800">
                          <span className="text-slate-400 flex items-center gap-1 text-[10px]">
                            <Sparkles className="w-3 h-3 text-blue-400" />
                            AI Screen:
                          </span>
                          <span className={`font-semibold text-[10px] ${
                            app.aiScreeningScore >= 80 ? 'text-emerald-400' : 'text-blue-400'
                          }`}>
                            {app.aiScreeningScore}% Match
                          </span>
                        </div>
                      )}

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {app.skills.slice(0, 3).map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md text-[9px] bg-slate-800 text-slate-200 border border-slate-700/60">
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Quick Schedule or Interview Notice */}
                      {app.interviewDate ? (
                        <div className="mb-2 text-[10px] text-blue-300 bg-blue-950/40 border border-blue-800/40 px-2 py-1 rounded flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span className="truncate">{app.interviewDate}</span>
                        </div>
                      ) : null}

                      {/* Applied Date & Chevron */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/50">
                        <span>Applied: {app.appliedDate}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                      </div>
                    </div>
                  ))
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Candidate Inspector Modal */}
      {activeCandidateModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
        >
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col">
            
            <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md">
                  {activeCandidateModal.candidateName.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">{activeCandidateModal.candidateName}</h3>
                  <p className="text-xs text-blue-400 font-medium">Applied for: {activeCandidateModal.jobTitle}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveCandidateModal(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Close candidate modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-slate-800 bg-slate-950/60 px-6 gap-4">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-3 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Profile & AI Assessment
              </button>
              <button
                onClick={() => setActiveTab('resume')}
                className={`py-3 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'resume'
                    ? 'border-blue-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Resume Document ({activeCandidateModal.resumeName})
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`py-3 text-xs font-semibold border-b-2 transition-colors ${
                  activeTab === 'schedule'
                    ? 'border-blue-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                Interview Scheduling & Notes
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
              
              {activeTab === 'overview' && (
                <>
                  {/* Candidate Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-950 p-5 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <span className="text-slate-400 block text-[10px]">Email Address</span>
                        <span className="font-semibold text-slate-200">{activeCandidateModal.candidateEmail}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <span className="text-slate-400 block text-[10px]">Phone Number</span>
                        <span className="font-semibold text-slate-200">{activeCandidateModal.candidatePhone}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <span className="text-slate-400 block text-[10px]">Resume File</span>
                        <span className="font-semibold text-blue-300">{activeCandidateModal.resumeName}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-400 flex-shrink-0" aria-hidden="true" />
                      <div>
                        <span className="text-slate-400 block text-[10px]">Date Applied</span>
                        <span className="font-semibold text-slate-200">{activeCandidateModal.appliedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* AI Screener Intelligence Box */}
                  {activeCandidateModal.aiScreeningScore !== undefined && (
                    <div className="p-4 bg-slate-950 border border-blue-900/40 rounded-xl space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
                          <Bot className="w-4 h-4 text-blue-400" />
                          AI ATS Candidate Screening & Matching
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-950/60 text-blue-300 border border-blue-800/60">
                          {activeCandidateModal.aiScreeningScore}/100 Match Score
                        </span>
                      </div>
                      {activeCandidateModal.aiEvaluationNotes && (
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {activeCandidateModal.aiEvaluationNotes}
                        </p>
                      )}
                      {activeCandidateModal.aiRecommendedStage && (
                        <div className="pt-1 flex items-center gap-2 text-[11px]">
                          <span className="text-slate-400">Agent Recommendation:</span>
                          <button
                            type="button"
                            onClick={() => {
                              if (activeCandidateModal.aiRecommendedStage) {
                                updateApplicationStatus(activeCandidateModal.id, activeCandidateModal.aiRecommendedStage);
                                setActiveCandidateModal((prev) => (prev ? { ...prev, status: activeCandidateModal.aiRecommendedStage! } : null));
                              }
                            }}
                            className="px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-300 border border-emerald-800/50 hover:bg-emerald-900/40 transition-colors font-semibold"
                          >
                            Advance to {activeCandidateModal.aiRecommendedStage}
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Skills Tag Cloud */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Verified Technical Skills</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {activeCandidateModal.skills.map((s, idx) => (
                        <span key={idx} className="px-2.5 py-1 rounded-md text-xs bg-slate-950 text-slate-200 border border-slate-800">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Cover Letter */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Cover Letter & Pitch</h4>
                    <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                      {activeCandidateModal.coverLetter}
                    </div>
                  </div>
                </>
              )}

              {activeTab === 'resume' && (
                <div className="p-5 bg-slate-950 border border-slate-800 rounded-2xl space-y-4 font-sans text-xs">
                  <div className="border-b border-slate-800 pb-3">
                    <h4 className="text-sm font-bold text-white">{activeCandidateModal.candidateName}</h4>
                    <p className="text-slate-400">{activeCandidateModal.jobTitle} • {activeCandidateModal.candidateEmail} • {activeCandidateModal.candidatePhone}</p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-300 mb-1">Executive Summary</h5>
                    <p className="text-slate-300 leading-relaxed">
                      High-impact senior software engineer with 6+ years designing and operating high-throughput distributed microservices, low-latency API architectures, and resilient cloud systems. Proven track record scaling backend systems to tens of thousands of requests per second with 99.99% availability.
                    </p>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-300 mb-1">Core Competencies & Technologies</h5>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {activeCandidateModal.skills.map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 rounded text-[11px] bg-slate-900 border border-slate-800 text-slate-200">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-300 mb-1">Professional Experience</h5>
                    <div className="space-y-2 mt-2">
                      <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                        <div className="flex justify-between font-semibold text-slate-200">
                          <span>Senior Backend Engineer — High-Scale Cloud Platform</span>
                          <span className="text-slate-400">2022 — Present</span>
                        </div>
                        <ul className="list-disc pl-4 mt-1.5 space-y-1 text-slate-400">
                          <li>Architected distributed ledger and reconciliation pipelines handling 2.5B+ transactions per month with idempotency and zero double-spend anomalies.</li>
                          <li>Implemented multi-region active-active read replicas with Redis cluster caching, reducing p99 latency from 180ms to 24ms.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="space-y-4">
                  {/* Stage Transition Selector */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Update Stage</h4>
                    <div className="flex flex-wrap gap-2">
                      {STAGES.map((s) => (
                        <button
                          key={s.id}
                          onClick={() => {
                            updateApplicationStatus(activeCandidateModal.id, s.id);
                            setActiveCandidateModal((prev) => (prev ? { ...prev, status: s.id } : null));
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all ${
                            activeCandidateModal.status === s.id
                              ? `${s.color} ${s.border} ring-2 ring-blue-500/40`
                              : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                          }`}
                        >
                          {s.title}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Schedule Action Button */}
                  <div className="p-4 bg-slate-950 border border-blue-900/40 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-white">Interview Automation</h4>
                      <p className="text-xs text-slate-400">Generate Google Meet invite & calendar scheduling payload</p>
                    </div>
                    <button
                      onClick={() => handleOpenScheduler(activeCandidateModal)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5"
                    >
                      <Video className="w-3.5 h-3.5" />
                      Open Scheduler
                    </button>
                  </div>

                  {/* Recruiter Notes & Interview Scheduler */}
                  <div className="space-y-4 pt-2">
                    <div>
                      <label htmlFor="interview-date-input" className="block text-xs font-semibold text-slate-300 mb-1">Current Scheduled Time</label>
                      <input
                        id="interview-date-input"
                        type="text"
                        value={interviewTime}
                        onChange={(e) => setInterviewTime(e.target.value)}
                        placeholder="e.g. 2026-11-28 at 15:00 IST (Round 2: Machine Coding)"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="recruiter-notes-input" className="block text-xs font-semibold text-slate-300 mb-1">Recruiter Notes & Rating</label>
                      <textarea
                        id="recruiter-notes-input"
                        rows={3}
                        value={editingNotes}
                        onChange={(e) => setEditingNotes(e.target.value)}
                        placeholder="Add feedback, interview ratings, or evaluation notes..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setActiveCandidateModal(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors min-h-[36px]"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Candidate Comparison Modal */}
      <CandidateComparisonModal
        isOpen={isCompareModalOpen}
        onClose={() => setIsCompareModalOpen(false)}
        applications={filteredApps.length > 0 ? filteredApps : applications}
        onScheduleInterview={handleOpenScheduler}
        onUpdateStatus={(id, status) => updateApplicationStatus(id, status)}
      />

      {/* Interview Scheduling Modal */}
      <InterviewScheduleModal
        isOpen={!!scheduleCandidate}
        onClose={() => setScheduleCandidate(null)}
        candidate={scheduleCandidate}
        onConfirmSchedule={handleConfirmSchedule}
      />

    </div>
  );
};
