'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Job } from '@/types';
import { useJobContext } from '@/context/JobContext';
import { X, Upload, FileText, Send, CheckCircle2, User, Mail, Phone, AlertCircle, ShieldAlert, ShieldCheck, Sparkles, ExternalLink } from 'lucide-react';
import { CompanyLogo } from '@/components/CompanyLogo';
import { trackEvent } from '@/lib/analytics';
import { generateTailoredCoverLetter } from '@/lib/aiAgent';

interface ApplyModalProps {
  job: Job | null;
  onClose: () => void;
}

export const ApplyModal: React.FC<ApplyModalProps> = ({ job, onClose }) => {
  const { candidateProfile, applyForJob, showToast } = useJobContext();
  
  const [candidateName, setCandidateName] = useState(candidateProfile.name);
  const [candidateEmail, setCandidateEmail] = useState(candidateProfile.email);
  const [candidatePhone, setCandidatePhone] = useState(candidateProfile.phone);
  const [coverLetter, setCoverLetter] = useState(
    `Dear Hiring Team at ${job?.company || 'Company'},\n\nI am thrilled to submit my candidacy for the ${job?.title || 'position'}. With my experience in ${candidateProfile.skills.slice(0, 3).join(', ')}, I am confident in delivering high impact across your engineering workflows.\n\nThank you for reviewing my application.\n\nBest regards,\n${candidateProfile.name}`
  );
  const [customResume, setCustomResume] = useState(candidateProfile.resumeName);
  const [authorized, setAuthorized] = useState(true);

  const handleAutoTailorCoverLetter = () => {
    if (!job) return;
    const tailored = generateTailoredCoverLetter(job, candidateProfile);
    setCoverLetter(tailored);
    showToast('AI Agent generated a tailored cover letter matching your credentials & job requirements!', 'success');
  };
  
  // Validation error states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Spam / Bot Protection
  const [honeypotValue, setHoneypotValue] = useState(''); // Invisible to real users
  const formOpenedTimestamp = useRef<number>(Date.now());
  const lastSubmitAttempt = useRef<number>(0);

  useEffect(() => {
    if (job) {
      formOpenedTimestamp.current = Date.now();
      trackEvent('job_apply_initiated', {
        jobId: job.id,
        title: job.title,
        company: job.company,
      });
    }
  }, [job]);

  if (!job) return null;

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!candidateName.trim() || candidateName.trim().length < 2) {
      newErrors.name = 'Full name must be at least 2 characters long.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!candidateEmail.trim() || !emailRegex.test(candidateEmail.trim())) {
      newErrors.email = 'Please provide a valid email address (e.g. name@domain.com).';
    }

    // Phone validation
    const digitsOnly = candidatePhone.replace(/\D/g, '');
    if (!candidatePhone.trim() || digitsOnly.length < 7) {
      newErrors.phone = 'Please enter a valid phone number (at least 7 digits).';
    }

    // Cover letter validation
    if (!coverLetter.trim() || coverLetter.trim().length < 25) {
      newErrors.coverLetter = 'Cover letter must be at least 25 characters long.';
    } else if (coverLetter.length > 3000) {
      newErrors.coverLetter = 'Cover letter cannot exceed 3,000 characters.';
    }

    // Authorization checkbox
    if (!authorized) {
      newErrors.authorized = 'You must certify that your application details are accurate.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Bot Honeypot Check: If the hidden honeypot input contains any text, it was filled by a spam bot
    if (honeypotValue.trim().length > 0) {
      // eslint-disable-next-line no-console
      console.warn('[Security] Bot submission caught by honeypot.');
      showToast('Automated bot submission detected.', 'error');
      onClose();
      return;
    }

    // 2. Speed Bot Check: Real humans cannot read and submit this form in under 1.2 seconds
    const elapsedMs = Date.now() - formOpenedTimestamp.current;
    if (elapsedMs < 1200) {
      showToast('Submission too fast. Please take a moment to review your application.', 'error');
      return;
    }

    // 3. Rate-Limiting Cooldown Check: Prevent double-click spamming
    const now = Date.now();
    if (now - lastSubmitAttempt.current < 3000) {
      showToast('Please wait a moment before resubmitting.', 'info');
      return;
    }
    lastSubmitAttempt.current = now;

    // 4. Form Validation
    if (!validateForm()) {
      showToast('Please fix the errors in the form before submitting.', 'error');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const success = applyForJob(job.id, coverLetter, customResume);
      setIsSubmitting(false);
      if (success) {
        trackEvent('job_apply_submitted', {
          jobId: job.id,
          title: job.title,
          company: job.company,
        });
        onClose();
      }
    }, 600);
  };

  const handleSimulateResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validExtensions = ['.pdf', '.docx', '.doc'];
      const fileExt = '.' + file.name.split('.').pop()?.toLowerCase();

      if (!validExtensions.includes(fileExt)) {
        showToast('Invalid file format. Please upload a PDF or Word document (.pdf, .docx).', 'error');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showToast('File size exceeds the 5MB maximum limit.', 'error');
        return;
      }

      setCustomResume(file.name);
      showToast(`Attached resume: ${file.name}`, 'success');
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-apply-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-2xl bg-[#11141c] border border-slate-800 rounded-xl shadow-xl overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col">
        
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CompanyLogo companyName={job.company} size="md" />
            <div>
              <h2 id="modal-apply-title" className="text-base sm:text-lg font-bold text-slate-100 font-heading">Apply for Position</h2>
              <p className="text-xs text-slate-300 font-medium">{job.title} • {job.company}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-800 transition-colors"
            aria-label="Close application modal"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} noValidate className="p-6 space-y-6 overflow-y-auto custom-scrollbar flex-1">
          
          {/* Direct Official Website Application Alert */}
          {job.applyUrl && (
            <div className="p-3.5 bg-blue-950/30 border border-blue-800/50 rounded-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div>
                <p className="font-semibold text-white flex items-center gap-1.5">
                  <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
                  Official Company Careers Portal
                </p>
                <p className="text-[11px] text-slate-300 mt-0.5">
                  Prefer to apply directly? You can submit your resume on {job.company}&apos;s verified careers site.
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
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
          
          {/* Honeypot Anti-Spam Field (Completely hidden from human visitors) */}
          <div className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none" aria-hidden="true">
            <label htmlFor="user_website_hp">Do not fill this field if you are human</label>
            <input
              type="text"
              id="user_website_hp"
              name="user_website_hp"
              value={honeypotValue}
              onChange={(e) => setHoneypotValue(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {/* Candidate Contact Information */}
          <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Candidate Information</h3>
              <span className="text-[10px] text-slate-400">Editable for this application</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => {
                      setCandidateName(e.target.value);
                      if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
                    }}
                    className={`w-full bg-slate-900 border ${
                      errors.name ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                    } rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 outline-none`}
                    placeholder="Jane Doe"
                  />
                </div>
                {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">Email Address *</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                  <input
                    type="email"
                    value={candidateEmail}
                    onChange={(e) => {
                      setCandidateEmail(e.target.value);
                      if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
                    }}
                    className={`w-full bg-slate-900 border ${
                      errors.email ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                    } rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 outline-none`}
                    placeholder="jane@example.com"
                  />
                </div>
                {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-300 mb-1">Phone Number *</label>
                <div className="relative">
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
                  <input
                    type="tel"
                    value={candidatePhone}
                    onChange={(e) => {
                      setCandidatePhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: '' }));
                    }}
                    className={`w-full bg-slate-900 border ${
                      errors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                    } rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 outline-none`}
                    placeholder="+1 (555) 234-5678"
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* LinkedIn Verified Fast-Track Card */}
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-950/20 border border-blue-800/40 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-sm bg-[#0A66C2] text-white flex items-center justify-center font-bold text-xs">in</span>
                <div>
                  <span className="text-slate-200 font-medium">
                    {candidateProfile.linkedInConnected ? 'Verified LinkedIn Profile Attached' : 'Fast-Track with LinkedIn'}
                  </span>
                  <span className="text-[11px] text-slate-400 block">
                    {candidateProfile.linkedInConnected
                      ? candidateProfile.linkedinUrl
                      : 'Connecting LinkedIn adds a verified credential badge to your application'}
                  </span>
                </div>
              </div>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                candidateProfile.linkedInConnected
                  ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/50'
                  : 'bg-slate-800 text-slate-300'
              }`}>
                {candidateProfile.linkedInConnected ? 'Verified' : 'Unconnected'}
              </span>
            </div>
          </div>

          {/* Resume Upload Section */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Resume / CV Document *</label>
            <div className="flex items-center justify-between p-4 bg-slate-950/80 border border-slate-800 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20" aria-hidden="true">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-200">{customResume}</p>
                  <p className="text-[11px] text-slate-400">PDF, DOCX up to 5MB</p>
                </div>
              </div>
              <label className="cursor-pointer px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition-colors flex items-center gap-1.5 min-h-[38px]">
                <Upload className="w-3.5 h-3.5" aria-hidden="true" />
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
              <div className="flex items-center gap-2">
                <label className="text-xs font-semibold text-slate-300">Cover Letter *</label>
                <button
                  type="button"
                  onClick={handleAutoTailorCoverLetter}
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-medium bg-blue-950/40 text-blue-300 border border-blue-800/50 hover:bg-blue-900/50 hover:text-white transition-colors"
                  title="Use CareerHub AI Agent to draft a tailored cover letter"
                >
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  <span>AI Auto-Tailor</span>
                </button>
              </div>
              <span className={`text-[11px] ${coverLetter.length > 2500 ? 'text-amber-400 font-bold' : 'text-slate-400'}`}>
                {coverLetter.length} / 3000 chars
              </span>
            </div>
            <textarea
              rows={5}
              value={coverLetter}
              onChange={(e) => {
                setCoverLetter(e.target.value);
                if (errors.coverLetter) setErrors((prev) => ({ ...prev, coverLetter: '' }));
              }}
              className={`w-full bg-slate-950 border ${
                errors.coverLetter ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
              } rounded-2xl p-4 text-xs text-slate-200 placeholder-slate-400 outline-none leading-relaxed`}
              placeholder="Introduce yourself and explain why you're a great fit for this position..."
            />
            {errors.coverLetter && <p className="text-[11px] text-rose-400 mt-1">{errors.coverLetter}</p>}
          </div>

          {/* Screening Checkbox */}
          <div className="space-y-1">
            <div className="flex items-start gap-3 p-3.5 bg-indigo-950/20 border border-indigo-500/20 rounded-xl">
              <input
                type="checkbox"
                id="authorize"
                checked={authorized}
                onChange={(e) => {
                  setAuthorized(e.target.checked);
                  if (errors.authorized) setErrors((prev) => ({ ...prev, authorized: '' }));
                }}
                className="mt-0.5 accent-indigo-500 h-4 w-4 rounded cursor-pointer"
              />
              <label htmlFor="authorize" className="text-xs text-slate-300 leading-snug cursor-pointer">
                I certify that the provided experience details, contact information, and resume are truthful and accurate.
              </label>
            </div>
            {errors.authorized && <p className="text-[11px] text-rose-400 pl-1">{errors.authorized}</p>}
          </div>

          {/* Submit CTA */}
          <div className="pt-3 flex items-center justify-between gap-3 border-t border-slate-800">
            <span className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400 inline" aria-hidden="true" />
              Protected with spam & verification check
            </span>

            <div className="flex items-center gap-3 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-5 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors disabled:opacity-50 min-h-[38px]"
              >
                {isSubmitting ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" aria-hidden="true" />
                    Submit Application
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
