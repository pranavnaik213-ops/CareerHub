'use client';

import React, { useState } from 'react';
import { Application } from '@/types';
import { X, Sparkles, Bot, Calendar, Check } from 'lucide-react';

interface CandidateComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  applications: Application[];
  onScheduleInterview: (app: Application) => void;
  onUpdateStatus: (id: string, status: Application['status']) => void;
}

export const CandidateComparisonModal: React.FC<CandidateComparisonModalProps> = ({
  isOpen,
  onClose,
  applications,
  onScheduleInterview,
  onUpdateStatus,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>(() => {
    return applications.slice(0, 2).map((a) => a.id);
  });

  if (!isOpen) return null;

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      if (selectedIds.length > 1) {
        setSelectedIds(selectedIds.filter((item) => item !== id));
      }
    } else {
      if (selectedIds.length < 3) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds([selectedIds[1], selectedIds[2], id]);
      }
    }
  };

  const selectedCandidates = applications.filter((app) => selectedIds.includes(app.id));

  // Collect all unique skills across compared candidates
  const allSkills = Array.from(
    new Set(selectedCandidates.flatMap((c) => c.skills))
  ).slice(0, 8);

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              Recruiter ATS Candidate Comparison Matrix
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Compare AI screening scores, technical skills, and qualifications side-by-side (Select up to 3 candidates)
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Close candidate comparison modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Candidate Selector Badges */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs text-slate-400 whitespace-nowrap font-medium">Select candidates:</span>
          {applications.map((app) => {
            const isSelected = selectedIds.includes(app.id);
            return (
              <button
                key={app.id}
                onClick={() => toggleSelect(app.id)}
                className={`px-3 py-1 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span>{app.candidateName}</span>
                {isSelected && <Check className="w-3 h-3 text-white" />}
              </button>
            );
          })}
        </div>

        {/* Comparison Grid */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-6">
          <div className={`grid grid-cols-1 md:grid-cols-${selectedCandidates.length} gap-4`}>
            {selectedCandidates.map((candidate) => (
              <div
                key={candidate.id}
                className="bg-[#11141c] border border-slate-800 rounded-2xl p-5 space-y-5 flex flex-col justify-between"
              >
                {/* Header Profile */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-blue-950 border border-blue-800 text-white font-bold text-sm flex items-center justify-center">
                        {candidate.candidateName.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-white">{candidate.candidateName}</h3>
                        <p className="text-xs text-slate-400">{candidate.jobTitle}</p>
                      </div>
                    </div>
                    {candidate.linkedInVerified && (
                      <span className="w-5 h-5 rounded bg-[#0A66C2] text-white flex items-center justify-center font-bold text-[10px]" title="LinkedIn Verified">
                        in
                      </span>
                    )}
                  </div>

                  {/* AI Match Score Card */}
                  <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-semibold text-slate-300">AI Match Score</span>
                    </div>
                    <span className="text-sm font-extrabold text-emerald-400">
                      {candidate.aiScreeningScore || 85}%
                    </span>
                  </div>

                  {/* AI Evaluation */}
                  {candidate.aiEvaluationNotes && (
                    <div className="p-3 bg-slate-950 border border-slate-800/80 rounded-xl">
                      <span className="text-[10px] uppercase font-semibold text-slate-400 block mb-1">
                        AI Screening Assessment
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                        {candidate.aiEvaluationNotes}
                      </p>
                    </div>
                  )}

                  {/* Technical Skills Overlap */}
                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-300 block">Technical Skills</span>
                    <div className="flex flex-wrap gap-1.5">
                      {allSkills.map((skill) => {
                        const hasSkill = candidate.skills.includes(skill);
                        return (
                          <span
                            key={skill}
                            className={`px-2 py-0.5 rounded text-[10px] font-medium border flex items-center gap-1 ${
                              hasSkill
                                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-800/60'
                                : 'bg-slate-900/60 text-slate-500 border-slate-800'
                            }`}
                          >
                            {hasSkill ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <span className="opacity-40">–</span>}
                            <span>{skill}</span>
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Current ATS Stage */}
                  <div className="space-y-1 pt-1">
                    <span className="text-xs text-slate-400 block">Current Stage</span>
                    <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-slate-900 border border-slate-800 text-slate-200">
                      {candidate.status}
                    </span>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="space-y-2 pt-4 border-t border-slate-800/80">
                  <button
                    onClick={() => {
                      onScheduleInterview(candidate);
                      onClose();
                    }}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Schedule Interview
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onUpdateStatus(candidate.id, 'Interview Scheduled')}
                      className="py-1.5 px-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300 text-[11px] font-medium border border-slate-800 transition-colors"
                    >
                      Advance Round
                    </button>
                    <button
                      onClick={() => onUpdateStatus(candidate.id, 'Offer Extended')}
                      className="py-1.5 px-2 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/40 text-emerald-300 text-[11px] font-medium border border-emerald-800/40 transition-colors"
                    >
                      Extend Offer
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors"
          >
            Done Comparing
          </button>
        </div>
      </div>
    </div>
  );
};
