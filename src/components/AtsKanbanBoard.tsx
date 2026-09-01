'use client';

import React, { useState } from 'react';
import { useJobContext } from '@/context/JobContext';
import { Application, ApplicationStatus } from '@/types';
import { User, FileText, Calendar, CheckCircle2, XCircle, Clock, Search, MessageSquare, ChevronRight, Filter } from 'lucide-react';

const STAGES: { id: ApplicationStatus; title: string; color: string; border: string }[] = [
  { id: 'Submitted', title: 'Submitted', color: 'bg-blue-500/10 text-blue-400', border: 'border-blue-500/30' },
  { id: 'Under Review', title: 'Under Review', color: 'bg-amber-500/10 text-amber-400', border: 'border-amber-500/30' },
  { id: 'Interview Scheduled', title: 'Interview Scheduled', color: 'bg-violet-500/10 text-violet-300', border: 'border-violet-500/30' },
  { id: 'Offer Extended', title: 'Offer Extended', color: 'bg-emerald-500/10 text-emerald-400', border: 'border-emerald-500/30' },
  { id: 'Rejected', title: 'Rejected', color: 'bg-rose-500/10 text-rose-400', border: 'border-rose-500/30' }
];

export const AtsKanbanBoard: React.FC = () => {
  const { applications, updateApplicationStatus, jobs } = useJobContext();
  const [selectedJobIdFilter, setSelectedJobIdFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCandidateModal, setActiveCandidateModal] = useState<Application | null>(null);
  const [editingNotes, setEditingNotes] = useState<string>('');
  const [interviewTime, setInterviewTime] = useState<string>('');

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
  };

  const handleSaveNotes = () => {
    if (activeCandidateModal) {
      updateApplicationStatus(activeCandidateModal.id, activeCandidateModal.status, editingNotes, interviewTime);
      setActiveCandidateModal((prev) => (prev ? { ...prev, recruiterNotes: editingNotes, interviewDate: interviewTime } : null));
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top ATS Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800 backdrop-blur-xl">
        
        {/* Search Candidate */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidates by name, job, or skill..."
            className="w-full bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none"
          />
        </div>

        {/* Filter by Specific Job Posting */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
          <select
            value={selectedJobIdFilter}
            onChange={(e) => setSelectedJobIdFilter(e.target.value)}
            className="bg-slate-950/80 border border-slate-800 focus:border-indigo-500 rounded-xl px-3 py-2 text-xs text-slate-200 outline-none"
          >
            <option value="All">All Posted Jobs ({jobs.length})</option>
            {jobs.map((job) => (
              <option key={job.id} value={job.id}>
                {job.title} ({job.company})
              </option>
            ))}
          </select>
        </div>

      </div>

      {/* Kanban Board Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageApps = filteredApps.filter((app) => app.status === stage.id);

          return (
            <div
              key={stage.id}
              className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 min-w-[260px] flex flex-col h-full shadow-lg"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold border ${stage.color} ${stage.border}`}>
                  {stage.title}
                </span>
                <span className="text-xs font-bold text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                  {stageApps.length}
                </span>
              </div>

              {/* Column Cards */}
              <div className="space-y-3 flex-1">
                {stageApps.length === 0 ? (
                  <div className="p-4 text-center border border-dashed border-slate-800/60 rounded-xl text-[11px] text-slate-500">
                    No candidates in this stage
                  </div>
                ) : (
                  stageApps.map((app) => (
                    <div
                      key={app.id}
                      onClick={() => openCandidateDetails(app)}
                      className="group bg-slate-900 border border-slate-800/90 hover:border-indigo-500/50 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer"
                    >
                      {/* Candidate Name & Job Title */}
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-xs font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                            {app.candidateName}
                          </h4>
                          <p className="text-[11px] font-medium text-slate-400 line-clamp-1">{app.jobTitle}</p>
                        </div>
                        <div className="w-6 h-6 rounded-md bg-indigo-600/20 text-indigo-300 font-bold text-[10px] flex items-center justify-center">
                          {app.candidateName[0]}
                        </div>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {app.skills.slice(0, 3).map((s, i) => (
                          <span key={i} className="px-1.5 py-0.5 rounded text-[9px] bg-slate-800 text-slate-300">
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Applied Date & Quick Stage Change */}
                      <div className="flex items-center justify-between text-[10px] text-slate-500 pt-2 border-t border-slate-800/50">
                        <span>Applied: {app.appliedDate}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-100">{activeCandidateModal.candidateName}</h3>
                <p className="text-xs text-indigo-400 font-medium">Applied for: {activeCandidateModal.jobTitle}</p>
              </div>
              <button
                onClick={() => setActiveCandidateModal(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
              
              {/* Candidate Info */}
              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div>
                  <span className="text-slate-500 block">Email:</span>
                  <span className="font-semibold text-slate-200">{activeCandidateModal.candidateEmail}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Phone:</span>
                  <span className="font-semibold text-slate-200">{activeCandidateModal.candidatePhone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Resume File:</span>
                  <span className="font-semibold text-indigo-300 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5" />
                    {activeCandidateModal.resumeName}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Applied Date:</span>
                  <span className="font-semibold text-slate-200">{activeCandidateModal.appliedDate}</span>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Cover Letter</h4>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">
                  {activeCandidateModal.coverLetter}
                </div>
              </div>

              {/* Stage Transition Selector */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Update Stage</h4>
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
                          ? `${s.color} ${s.border} ring-2 ring-indigo-500/40`
                          : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recruiter Notes & Interview Scheduler */}
              <div className="space-y-3 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Schedule Interview Date / Time</label>
                  <input
                    type="text"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    placeholder="e.g. 2026-09-05 at 14:00 EST"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Recruiter Notes</label>
                  <textarea
                    rows={3}
                    value={editingNotes}
                    onChange={(e) => setEditingNotes(e.target.value)}
                    placeholder="Add feedback, interview observations, or rating notes..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200"
                  />
                </div>
              </div>

            </div>

            <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setActiveCandidateModal(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={handleSaveNotes}
                className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-md"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
