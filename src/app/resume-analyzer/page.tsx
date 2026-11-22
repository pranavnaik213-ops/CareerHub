'use client';

import React, { useState } from 'react';
import { useJobContext } from '@/context/JobContext';
import { CompanyLogo } from '@/components/CompanyLogo';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Tag,
  ExternalLink
} from 'lucide-react';
import { formatSalaryRange } from '@/lib/formatSalary';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

export default function ResumeAnalyzerPage() {
  const { jobs, candidateProfile, showToast } = useJobContext();

  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || 'real-google-spanner');
  const [resumeText, setResumeText] = useState<string>(
    `${candidateProfile.name}\n${candidateProfile.headline}\n${candidateProfile.email} | ${candidateProfile.phone} | ${candidateProfile.location}\n\nEXPERIENCE:\n` +
    candidateProfile.experience.map((e) => `${e.title} at ${e.company} (${e.period})\n- ${e.description}`).join('\n\n') +
    `\n\nSKILLS:\n${candidateProfile.skills.join(', ')}\n\nEDUCATION:\n` +
    candidateProfile.education.map((ed) => `${ed.degree} - ${ed.school} (${ed.year})`).join('\n')
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    trackEvent('resume_analyzed', { jobId: selectedJob.id, company: selectedJob.company });

    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalyzed(true);
      showToast(`Resume ATS Analysis complete for ${selectedJob.company}!`, 'success');
    }, 700);
  };

  // Compute real ATS match criteria
  const lowerResume = resumeText.toLowerCase();
  const matchingSkills = (selectedJob?.skills || []).filter((s) => lowerResume.includes(s.toLowerCase()));
  const missingSkills = (selectedJob?.skills || []).filter((s) => !lowerResume.includes(s.toLowerCase()));
  
  const skillMatchRatio = (selectedJob?.skills?.length || 1) > 0
    ? matchingSkills.length / (selectedJob?.skills?.length || 1)
    : 0.8;
  const matchScore = Math.min(98, Math.round(skillMatchRatio * 65 + 30));

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium bg-blue-950/40 border border-blue-800/40 text-blue-300">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Real-Time Resume Keyword & ATS Compatibility Scorecard</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-heading">
          AI Resume ATS Scanner
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Screen your engineering resume directly against verified open tech roles at Google, Microsoft, PhonePe, Uber, Stripe, and more. Uncover missing keyword signals, check ATS parseability, and optimize your interview callback rate.
        </p>
      </div>

      {/* Target Job Selection Selector */}
      <div className="bg-[#11141c] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              1. Select Target Verified Opening
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Choose an active role from our verified tech directory</p>
          </div>
          <span className="text-xs font-semibold text-emerald-400">
            {formatSalaryRange(selectedJob.salaryMin, selectedJob.salaryMax, selectedJob.currency)}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label htmlFor="target-job-select" className="block text-xs font-medium text-slate-400 mb-1.5">
              Target Company & Position
            </label>
            <select
              id="target-job-select"
              value={selectedJobId}
              onChange={(e) => {
                setSelectedJobId(e.target.value);
                setAnalyzed(false);
              }}
              className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-2.5 text-xs text-slate-200 outline-none"
            >
              {jobs.map((job) => (
                <option key={job.id} value={job.id}>
                  {job.company} — {job.title} ({job.location})
                </option>
              ))}
            </select>
          </div>

          <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CompanyLogo company={selectedJob.company} size="sm" />
              <div>
                <p className="text-xs font-semibold text-slate-100">{selectedJob.company}</p>
                <p className="text-[11px] text-slate-400">{selectedJob.location} • {selectedJob.locationType}</p>
              </div>
            </div>
            {selectedJob.applyUrl && (
              <a
                href={selectedJob.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-400 hover:underline flex items-center gap-1 font-medium"
              >
                <span>Portal Link</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* 2-Column: Resume Content Input vs ATS Scorecard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Resume Text & Upload */}
        <div className="lg:col-span-6 bg-[#11141c] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                2. Resume Text & Content
              </h2>
            </div>
            <span className="text-[11px] text-slate-400">{resumeText.length} characters</span>
          </div>

          <textarea
            rows={15}
            value={resumeText}
            onChange={(e) => {
              setResumeText(e.target.value);
              setAnalyzed(false);
            }}
            placeholder="Paste your resume content or candidate summary here..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl p-3.5 text-xs text-slate-200 font-mono leading-relaxed outline-none"
          />

          <button
            onClick={handleRunAnalysis}
            disabled={isAnalyzing}
            className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-h-[40px]"
          >
            {isAnalyzing ? (
              <span>Analyzing Keywords & Match Signals...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Run ATS Match Scan against {selectedJob.company}</span>
              </>
            )}
          </button>
        </div>

        {/* Right: Real Scorecard Results */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#11141c] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                ATS Compatibility Scorecard
              </h2>
              <span className="text-xs text-slate-400">{selectedJob.company} Application Match</span>
            </div>

            {/* Score Ring / Bar */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-400 block mb-0.5">Overall ATS Match Score</span>
                <span className="text-3xl sm:text-4xl font-bold font-heading text-white">
                  {matchScore}<span className="text-lg text-slate-400 font-normal">/100</span>
                </span>
                <p className="text-[11px] text-emerald-400 mt-1 font-medium">
                  {matchScore >= 80 ? '✓ High Interview Likelihood' : '⚠ Optimize Keywords to Boost Callbacks'}
                </p>
              </div>

              <div className="text-right text-xs space-y-1">
                <span className="block text-slate-400 text-[11px]">Required Skills Overlap:</span>
                <span className="font-bold text-white text-sm">
                  {matchingSkills.length} of {selectedJob.skills.length} skills
                </span>
              </div>
            </div>

            {/* Matching Keywords Check */}
            <div>
              <span className="text-xs font-medium text-slate-300 block mb-2 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Found Keywords in Resume ({matchingSkills.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {matchingSkills.length > 0 ? (
                  matchingSkills.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded text-[11px] font-medium bg-emerald-950/40 text-emerald-300 border border-emerald-800/50"
                    >
                      ✓ {s}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-slate-400">No direct skill matches detected in text.</p>
                )}
              </div>
            </div>

            {/* Missing Keywords Check */}
            <div>
              <span className="text-xs font-medium text-slate-300 block mb-2 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                Missing Critical Skills for {selectedJob.title} ({missingSkills.length})
              </span>
              <div className="flex flex-wrap gap-1.5">
                {missingSkills.length > 0 ? (
                  missingSkills.map((s, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded text-[11px] font-medium bg-amber-950/30 text-amber-300 border border-amber-800/40"
                    >
                      + {s}
                    </span>
                  ))
                ) : (
                  <p className="text-xs text-emerald-400 font-medium">All core job skills are present in your resume!</p>
                )}
              </div>
            </div>

            {/* Actionable Improvement Checklist */}
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              <span className="font-semibold text-slate-200 block mb-1">ATS Optimization Action Items:</span>
              <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1.5 text-slate-300 text-[11px]">
                {missingSkills.length > 0 && (
                  <p className="flex items-start gap-1.5">
                    <span className="text-amber-400">•</span>
                    Add explicit mention of <strong className="text-white">{missingSkills.slice(0, 3).join(', ')}</strong> under your Experience or Project achievements.
                  </p>
                )}
                <p className="flex items-start gap-1.5">
                  <span className="text-emerald-400">•</span>
                  Include quantifiable impact metrics (e.g. &quot;reduced latency by 35%&quot;, &quot;scaled to 10k QPS&quot;).
                </p>
                <p className="flex items-start gap-1.5">
                  <span className="text-blue-400">•</span>
                  Ensure standard headers (EXPERIENCE, SKILLS, EDUCATION) for clean automated ATS parsing.
                </p>
              </div>
            </div>

            {/* Direct Apply Button */}
            <div className="pt-2">
              <a
                href={selectedJob.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Apply on Official {selectedJob.company} Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
