'use client';

import React, { useState } from 'react';
import { useJobContext } from '@/context/JobContext';
import { Application, ApplicationStatus } from '@/types';
import { User, FileText, Calendar, CheckCircle2, XCircle, Clock, Search, MessageSquare, ChevronRight, Filter, ShieldCheck, Mail, Phone, Tag } from 'lucide-react';

const STAGES: { id: ApplicationStatus; title: string; color: string; border: string; dotColor: string }[] = [
  { id: 'Submitted', title: 'Submitted', color: 'bg-blue-500/15 text-blue-300', border: 'border-blue-500/30', dotColor: 'bg-blue-400' },
  { id: 'Under Review', title: 'Under Review', color: 'bg-amber-500/15 text-amber-300', border: 'border-amber-500/30', dotColor: 'bg-amber-400' },
  { id: 'Interview Scheduled', title: 'Interview Scheduled', color: 'bg-violet-500/15 text-violet-300', border: 'border-violet-500/30', dotColor: 'bg-violet-400' },
  { id: 'Offer Extended', title: 'Offer Extended', color: 'bg-emerald-500/15 text-emerald-300', border: 'border-emerald-500/30', dotColor: 'bg-emerald-400' },
  { id: 'Rejected', title: 'Rejected', color: 'bg-rose-500/15 text-rose-300', border: 'border-rose-500/30', dotColor: 'bg-rose-400' }
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
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search candidate name, position, or skill..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-400 outline-none transition-all"
          />
        </div>

        {/* Filter by Specific Job Posting */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400 hidden sm:block" aria-hidden="true" />
          <select
            value={selectedJobIdFilter}
            onChange={(e) => setSelectedJobIdFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none w-full sm:w-auto"
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

      {/* Kanban Board Columns with smooth horizontal scroll */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {STAGES.map((stage) => {
          const stageApps = filteredApps.filter((app) => app.status === stage.id);

          return (
            <div
              key={stage.id}
              className="bg-slate-900/50 border border-slate-800/80 rounded-3xl p-4 min-w-[270px] flex flex-col h-full shadow-lg"
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
                      className="group bg-slate-900/90 border border-slate-800/90 hover:border-indigo-500/50 p-4 rounded-2xl shadow-md hover:shadow-xl transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                    >
                      {/* Candidate Avatar & Job Title */}
                      <div className="flex justify-between items-start mb-2.5">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                            {app.candidateName.split(' ').map((n) => n[0]).join('')}
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-slate-100 group-hover:text-indigo-300 transition-colors">
                              {app.candidateName}
                            </h4>
                            <p className="text-[11px] font-medium text-slate-400 line-clamp-1">{app.jobTitle}</p>
                          </div>
                        </div>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {app.skills.slice(0, 3).map((s, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-md text-[9px] bg-slate-800 text-slate-200 border border-slate-700/60">
                            {s}
                          </span>
                        ))}
                      </div>

                      {/* Applied Date & Chevron */}
                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-800/50">
                        <span>Applied: {app.appliedDate}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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
          <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col">
            
            <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-extrabold text-sm flex items-center justify-center shadow-md">
                  {activeCandidateModal.candidateName.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-100">{activeCandidateModal.candidateName}</h3>
                  <p className="text-xs text-indigo-400 font-medium">Applied for: {activeCandidateModal.jobTitle}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveCandidateModal(null)}
                className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
                aria-label="Close candidate modal"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
              
              {/* Candidate Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-slate-950 p-5 rounded-2xl border border-slate-800">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-indigo-400 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Email Address</span>
                    <span className="font-semibold text-slate-200">{activeCandidateModal.candidateEmail}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-indigo-400 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Phone Number</span>
                    <span className="font-semibold text-slate-200">{activeCandidateModal.candidatePhone}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Resume File</span>
                    <span className="font-semibold text-indigo-300">{activeCandidateModal.resumeName}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-indigo-400 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <span className="text-slate-400 block text-[10px]">Date Applied</span>
                    <span className="font-semibold text-slate-200">{activeCandidateModal.appliedDate}</span>
                  </div>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">Cover Letter</h4>
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-slate-200 whitespace-pre-wrap leading-relaxed">
                  {activeCandidateModal.coverLetter}
                </div>
              </div>

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
                          ? `${s.color} ${s.border} ring-2 ring-indigo-500/40`
                          : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
                      }`}
                    >
                      {s.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recruiter Notes & Interview Scheduler */}
              <div className="space-y-4 pt-2">
                <div>
                  <label htmlFor="interview-date-input" className="block text-xs font-semibold text-slate-300 mb-1">Schedule Interview Date / Time</label>
                  <input
                    id="interview-date-input"
                    type="text"
                    value={interviewTime}
                    onChange={(e) => setInterviewTime(e.target.value)}
                    placeholder="e.g. 2026-09-05 at 14:00 EST"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none focus:border-indigo-500"
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
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

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
                className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-md min-h-[38px]"
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
