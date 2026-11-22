'use client';

import React, { useState } from 'react';
import { Application } from '@/types';
import { X, Calendar, Video, Clock, Check, Copy, UserCheck, Sparkles, Building2 } from 'lucide-react';

interface InterviewScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidate: Application | null;
  onConfirmSchedule: (candidateId: string, interviewDate: string, notes: string) => void;
}

export const InterviewScheduleModal: React.FC<InterviewScheduleModalProps> = ({
  isOpen,
  onClose,
  candidate,
  onConfirmSchedule,
}) => {
  const [roundType, setRoundType] = useState('Round 2: Low-Level Machine Coding & Concurrency');
  const [interviewDate, setInterviewDate] = useState('2026-11-28');
  const [interviewTime, setInterviewTime] = useState('15:00');
  const [interviewer, setInterviewer] = useState('Siddharth Sharma (Principal Architect)');
  const [platform, setPlatform] = useState<'Google Meet' | 'Microsoft Teams' | 'Zoom'>('Google Meet');
  const [agenda, setAgenda] = useState('Live coding session in IDE covering distributed cache concurrency, idempotency keys, and clean modular design.');
  const [copied, setCopied] = useState(false);

  if (!isOpen || !candidate) return null;

  const meetingLink = platform === 'Google Meet' 
    ? 'https://meet.google.com/crh-tech-sync'
    : platform === 'Microsoft Teams'
    ? 'https://teams.microsoft.com/l/meetup-join/careerhub-interview'
    : 'https://zoom.us/j/8492049281';

  const fullInterviewString = `${interviewDate} at ${interviewTime} IST (${roundType})`;

  const inviteText = `CareerHub Technical Interview Invitation
Candidate: ${candidate.candidateName}
Role: ${candidate.jobTitle}
Round: ${roundType}
Date & Time: ${interviewDate} at ${interviewTime} IST
Interviewer: ${interviewer}
Meeting Platform: ${platform}
Meeting Link: ${meetingLink}

Agenda & Format:
${agenda}

Please join 5 minutes before scheduled start time with a stable internet connection and development IDE ready.`;

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(inviteText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleConfirm = () => {
    const updatedNotes = `${candidate.recruiterNotes ? candidate.recruiterNotes + '\n' : ''}[Scheduled on ${new Date().toLocaleDateString()}]: ${roundType} with ${interviewer} via ${platform}. Link: ${meetingLink}`;
    onConfirmSchedule(candidate.id, fullInterviewString, updatedNotes);
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in"
    >
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Schedule Technical Interview</h2>
              <p className="text-xs text-slate-400">
                {candidate.candidateName} — {candidate.jobTitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
            aria-label="Close interview scheduling modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4">
          {/* Round Selector */}
          <div>
            <label htmlFor="round-type-select" className="block text-xs font-semibold text-slate-300 mb-1.5">Interview Round</label>
            <select
              id="round-type-select"
              value={roundType}
              onChange={(e) => setRoundType(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-200 outline-none focus:border-blue-500"
            >
              <option value="Round 1: DSA & Algorithmic Problem Solving (45m)">
                Round 1: DSA & Algorithmic Problem Solving (45m)
              </option>
              <option value="Round 2: Low-Level Machine Coding & Concurrency (90m)">
                Round 2: Low-Level Machine Coding & Concurrency (90m)
              </option>
              <option value="Round 3: High-Level System Architecture & Scale (60m)">
                Round 3: High-Level System Architecture & Scale (60m)
              </option>
              <option value="Round 4: Bar Raiser & Values Alignment (45m)">
                Round 4: Bar Raiser & Values Alignment (45m)
              </option>
            </select>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="schedule-date-input" className="block text-xs font-semibold text-slate-300 mb-1.5">Interview Date</label>
              <input
                id="schedule-date-input"
                type="date"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="schedule-time-input" className="block text-xs font-semibold text-slate-300 mb-1.5">Time (IST)</label>
              <input
                id="schedule-time-input"
                type="time"
                value={interviewTime}
                onChange={(e) => setInterviewTime(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* Interviewer & Platform */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="interviewer-name-input" className="block text-xs font-semibold text-slate-300 mb-1.5">Assigned Interviewer</label>
              <input
                id="interviewer-name-input"
                type="text"
                value={interviewer}
                onChange={(e) => setInterviewer(e.target.value)}
                placeholder="Name & Title"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="platform-select" className="block text-xs font-semibold text-slate-300 mb-1.5">Video Platform</label>
              <select
                id="platform-select"
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-xs text-slate-200 outline-none focus:border-blue-500"
              >
                <option value="Google Meet">Google Meet</option>
                <option value="Microsoft Teams">Microsoft Teams</option>
                <option value="Zoom">Zoom Meetings</option>
              </select>
            </div>
          </div>

          {/* Meeting Link Preview */}
          <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <Video className="w-4 h-4 text-blue-400" />
              <span className="text-slate-400">Meeting Room:</span>
              <a href={meetingLink} target="_blank" rel="noopener noreferrer" className="font-mono text-blue-400 hover:underline">
                {meetingLink}
              </a>
            </div>
            <button
              onClick={handleCopyInvite}
              className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 text-[11px] text-slate-300 border border-slate-800 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Invite'}</span>
            </button>
          </div>

          {/* Agenda */}
          <div>
            <label htmlFor="agenda-textarea" className="block text-xs font-semibold text-slate-300 mb-1.5">Round Agenda & Instructions</label>
            <textarea
              id="agenda-textarea"
              rows={2}
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs text-slate-400 hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-5 py-2 text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-colors flex items-center gap-1.5"
          >
            <UserCheck className="w-3.5 h-3.5" />
            Confirm & Save Schedule
          </button>
        </div>
      </div>
    </div>
  );
};
