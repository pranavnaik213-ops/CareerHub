'use client';

import React, { useState } from 'react';
import { Job } from '@/types';
import { useJobContext } from '@/context/JobContext';
import { X, Upload, FileText, Send, CheckCircle2, User, Mail, Phone } from 'lucide-react';

interface ApplyModalProps {
  job: Job | null;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ job, onClose }) => {
  const { candidateProfile, applyForJob } = useJobContext();
  const [coverLetter, setCoverLetter] = useState(
    `Dear Hiring Manager at ${job?.company || 'Company'},\n\nI am excited to submit my application for the ${job?.title || 'position'}. With my background in ${candidateProfile.skills.slice(0, 3).join(', ')}, I am confident I can make an immediate impact on your engineering and product goals.\n\nThank you for considering my application.\n\nBest regards,\n${candidateProfile.name}`
  );
  const [customResume, setCustomResume] = useState(candidateProfile.resumeName);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!job) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const success = applyForJob(job.id, coverLetter, customResume);
      setIsSubmitting(false);
      if (success) {
        onClose();
      }
    }, 600);
  };

  const handleSimulateResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCustomResume(e.target.files[0].name);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-100">Apply for Position</h2>
            <p className="text-xs text-indigo-400 font-semibold">{job.title} • {job.company}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
          
          {/* Pre-filled Candidate Contact Info */}
          <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Candidate Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-200">
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span className="font-semibold">{candidateProfile.name}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Mail className="w-3.5 h-3.5 text-indigo-400" />
                <span>{candidateProfile.email}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-200">
                <Phone className="w-3.5 h-3.5 text-indigo-400" />
                <span>{candidateProfile.phone}</span>
              </div>
              <div className="text-slate-400 truncate">
                <span>Headline: {candidateProfile.headline}</span>
              </div>
            </div>
          </div>

          {/* Resume Upload Section */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Resume / CV</label>
            <div className="flex items-center justify-between p-4 bg-slate-950/80 border border-slate-800 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-200">{customResume}</p>
                  <p className="text-[10px] text-slate-400">PDF, DOCX up to 5MB</p>
                </div>
              </div>
              <label className="cursor-pointer px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5" />
                Replace File
                <input
                  type="file"
                  accept=".pdf,.docx,.doc"
                  onChange={handleSimulateResumeUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Cover Letter */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-xs font-semibold text-slate-300">Cover Letter</label>
              <span className="text-[10px] text-slate-500">{coverLetter.length} chars</span>
            </div>
            <textarea
              required
              rows={5}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              className="w-full bg-slate-950/90 border border-slate-800 focus:border-indigo-500 rounded-2xl p-4 text-xs text-slate-200 placeholder-slate-500 outline-none leading-relaxed"
            />
          </div>

          {/* Screening Checkbox */}
          <div className="flex items-start gap-3 p-3 bg-indigo-950/20 border border-indigo-500/20 rounded-xl">
            <input
              type="checkbox"
              required
              defaultChecked
              id="authorize"
              className="mt-0.5 accent-indigo-500 rounded"
            />
            <label htmlFor="authorize" className="text-xs text-slate-300 leading-snug">
              I certify that the provided experience details and contact information are accurate and complete.
            </label>
          </div>

          {/* Submit CTA */}
          <div className="pt-3 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/30 hover:brightness-110 transition-all disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Submitting Application...</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  Submit Application
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
