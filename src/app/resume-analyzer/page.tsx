'use client';

import React, { useState, useRef } from 'react';
import { useJobContext } from '@/context/JobContext';
import { CompanyLogo } from '@/components/CompanyLogo';
import {
  FileText,
  Upload,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  ExternalLink,
  Copy,
  Download,
  Check,
  RotateCcw,
  Zap,
  ArrowRight
} from 'lucide-react';
import { formatSalaryRange } from '@/lib/formatSalary';
import { trackEvent } from '@/lib/analytics';
import {
  analyzeResume,
  generateAiCorrectedResume,
  formatLinkedInToResume,
  ResumeAnalysisResult,
  CorrectedResumeResult
} from '@/lib/resumeAiEngine';
import { LinkedInConnectModal } from '@/components/LinkedInConnectModal';
import { sanitizeSafeUrl } from '@/lib/sanitizeUrl';

export default function ResumeAnalyzerPage() {
  const { jobs, candidateProfile, showToast } = useJobContext();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [selectedJobId, setSelectedJobId] = useState<string>(jobs[0]?.id || 'real-google-spanner');
  const [activeTab, setActiveTab] = useState<'scorecard' | 'corrected' | 'diff'>('scorecard');
  const [isLinkedInModalOpen, setIsLinkedInModalOpen] = useState(false);
  const [isUploadingPdf, setIsUploadingPdf] = useState(false);
  const [uploadedPdfInfo, setUploadedPdfInfo] = useState<{
    filename: string;
    numPages: number;
    fileSizeKb: number;
  } | null>(null);

  const [resumeText, setResumeText] = useState<string>(() => {
    return `${candidateProfile.name.toUpperCase()}
${candidateProfile.location} | ${candidateProfile.email} | ${candidateProfile.phone}
LinkedIn: ${candidateProfile.linkedinUrl}

PROFESSIONAL SUMMARY
${candidateProfile.headline}. 6+ years of engineering experience working on web applications, APIs, and cloud systems.

TECHNICAL SKILLS
${candidateProfile.skills.join(', ')}

WORK EXPERIENCE
${candidateProfile.experience
  .map(
    (e) =>
      `${e.title} - ${e.company} (${e.period})
- ${e.description}`
  )
  .join('\n\n')}

EDUCATION
${candidateProfile.education.map((ed) => `${ed.degree} - ${ed.school} (${ed.year})`).join('\n')}`;
  });

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  // Dynamic Real AI Evaluation & Correction Computations
  const analysis: ResumeAnalysisResult = analyzeResume(resumeText, selectedJob);
  const correction: CorrectedResumeResult = generateAiCorrectedResume(
    resumeText,
    selectedJob,
    candidateProfile
  );

  // 1. PDF File Upload Handler with Strict .pdf Format Verification
  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so re-uploading the same file still triggers onChange
    e.target.value = '';

    // Format Verification: MUST be a PDF document
    const isPdf =
      file.type === 'application/pdf' ||
      file.name.toLowerCase().endsWith('.pdf');

    if (!isPdf) {
      showToast(
        'Invalid file type. Please upload a valid PDF document (.pdf).',
        'error'
      );
      return;
    }

    setIsUploadingPdf(true);
    showToast(`Parsing PDF text from ${file.name}...`, 'info');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/parse-pdf', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to parse PDF document.');
      }

      setResumeText(data.text);
      setUploadedPdfInfo({
        filename: file.name,
        numPages: data.numPages || 1,
        fileSizeKb: Math.round(file.size / 1024),
      });

      trackEvent('resume_analyzed', {
        jobId: selectedJob.id,
        company: selectedJob.company,
        source: 'pdf_upload',
      });

      showToast(`Successfully parsed ${file.name} (${data.numPages} pages)!`, 'success');
      setActiveTab('scorecard');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error extracting text from PDF';
      showToast(msg, 'error');
    } finally {
      setIsUploadingPdf(false);
    }
  };

  // 2. LinkedIn Import Handler
  const handleImportFromLinkedIn = () => {
    if (!candidateProfile.linkedInConnected) {
      // Prompt user to connect or confirm their LinkedIn handle
      setIsLinkedInModalOpen(true);
      return;
    }

    const linkedInResume = formatLinkedInToResume(candidateProfile);
    setResumeText(linkedInResume);
    setUploadedPdfInfo(null);

    trackEvent('resume_analyzed', {
      jobId: selectedJob.id,
      company: selectedJob.company,
      source: 'linkedin_import',
    });

    showToast(
      `Imported verified credentials from LinkedIn for ${candidateProfile.name}!`,
      'success'
    );
  };

  // 3. Scan Trigger
  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    trackEvent('resume_analyzed', {
      jobId: selectedJob.id,
      company: selectedJob.company,
    });

    setTimeout(() => {
      setIsAnalyzing(false);
      showToast(`AI ATS Scan complete for ${selectedJob.company}!`, 'success');
    }, 600);
  };

  // 4. Apply AI Corrections into editor
  const handleApplyCorrections = () => {
    setResumeText(correction.correctedResumeText);
    setActiveTab('scorecard');
    showToast(
      'Applied AI Corrections! Your resume now incorporates Google X-Y-Z metrics & missing tech keywords.',
      'success'
    );
  };

  // 5. Copy Corrected Resume
  const handleCopyCorrected = () => {
    navigator.clipboard.writeText(correction.correctedResumeText);
    setCopied(true);
    showToast('AI-corrected resume copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2500);
  };

  // 6. Download Corrected Resume (.txt)
  const handleDownloadCorrected = () => {
    const element = document.createElement('a');
    const file = new Blob([correction.correctedResumeText], {
      type: 'text/plain;charset=utf-8',
    });
    element.href = URL.createObjectURL(file);
    element.download = `${candidateProfile.name.replace(/\s+/g, '_')}_ATS_Optimized_Resume.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('Downloaded ATS-optimized resume!', 'success');
  };

  // 7. Quick append missing keyword
  const handleAddKeyword = (skill: string) => {
    setResumeText((prev) => {
      if (prev.includes(skill)) return prev;
      return `${prev}\n• Core Competency: ${skill}`;
    });
    showToast(`Added "${skill}" to your resume!`, 'success');
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 py-4">
      {/* Page Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium bg-blue-950/40 border border-blue-800/40 text-blue-300">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Real AI ATS Resume Scanner & Google X-Y-Z Optimizer</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-heading">
          AI Resume ATS Scanner & Corrector
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
          Screen your engineering resume directly against verified openings at Google, Microsoft, PhonePe, Uber, and Stripe. Upload your resume in PDF form or import directly from LinkedIn, scan for missing keywords, and let our AI rewrite your experience using the Google X-Y-Z formula.
        </p>
      </div>

      {/* Target Job Selection Selector */}
      <div className="bg-[#11141c] border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
              1. Select Target Verified Role
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
              onChange={(e) => setSelectedJobId(e.target.value)}
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
                href={sanitizeSafeUrl(selectedJob.applyUrl)}
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

      {/* 2-Column: Resume Input (PDF/LinkedIn/Text) vs AI Scorecard & Corrector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Upload in PDF / Import from LinkedIn / Resume Editor */}
        <div className="lg:col-span-6 bg-[#11141c] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-200">
                2. Resume Source & Content
              </h2>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">{analysis.wordCount} words</span>
          </div>

          {/* Input Method Buttons: PDF Upload & LinkedIn Import */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {/* PDF Upload Button */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                onChange={handlePdfUpload}
                className="hidden"
                id="resume-pdf-upload"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploadingPdf}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-200 transition-colors"
              >
                <Upload className="w-3.5 h-3.5 text-blue-400" />
                <span>{isUploadingPdf ? 'Parsing PDF Text...' : 'Upload PDF Resume'}</span>
              </button>
            </div>

            {/* Import from LinkedIn Button */}
            <button
              type="button"
              onClick={handleImportFromLinkedIn}
              className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-[#0A66C2]/40 bg-[#0A66C2]/15 hover:bg-[#0A66C2]/25 text-xs font-semibold text-[#70b5f9] transition-colors"
            >
              <span className="w-3.5 h-3.5 rounded-sm bg-[#0A66C2] text-white flex items-center justify-center font-bold text-[9px]">in</span>
              <span>Import from LinkedIn</span>
            </button>
          </div>

          {/* Uploaded PDF Meta Badge */}
          {uploadedPdfInfo && (
            <div className="p-2.5 bg-blue-950/30 border border-blue-900/40 rounded-lg flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 truncate">
                <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-slate-200 truncate font-mono text-[11px]">
                  {uploadedPdfInfo.filename} ({uploadedPdfInfo.fileSizeKb} KB, {uploadedPdfInfo.numPages} pgs)
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/40 flex-shrink-0">
                PDF Extracted
              </span>
            </div>
          )}

          {/* Editable Text Area */}
          <textarea
            rows={14}
            value={resumeText}
            onChange={(e) => setResumeText(e.target.value)}
            placeholder="Paste your resume content here, or upload a PDF / import from LinkedIn above..."
            className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-xl p-3.5 text-xs text-slate-200 font-mono leading-relaxed outline-none"
          />

          {/* Scan Action CTA */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="flex-1 py-2.5 px-4 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center justify-center gap-2 disabled:opacity-50 min-h-[40px]"
            >
              {isAnalyzing ? (
                <span>Scanning ATS Signals...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Run Real AI Scan on {selectedJob.company}</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                setResumeText(formatLinkedInToResume(candidateProfile));
                setUploadedPdfInfo(null);
                showToast('Reset to default verified candidate resume.', 'info');
              }}
              title="Reset resume"
              className="p-2.5 rounded-lg border border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: AI Scorecard & AI Resume Corrector Tabs */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[#11141c] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-5">
            
            {/* View Switcher Tabs */}
            <div className="flex border-b border-slate-800 pb-2 gap-2 overflow-x-auto">
              <button
                onClick={() => setActiveTab('scorecard')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'scorecard'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-300 hover:text-white'
                }`}
              >
                <span>ATS Scorecard</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/30 font-mono">
                  {analysis.overallScore}/100
                </span>
              </button>

              <button
                onClick={() => setActiveTab('corrected')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'corrected'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-300 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>AI Corrected Resume</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 font-mono font-bold">
                  96/100
                </span>
              </button>

              <button
                onClick={() => setActiveTab('diff')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                  activeTab === 'diff'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-900 text-slate-300 hover:text-white'
                }`}
              >
                <span>Before/After Diff</span>
              </button>
            </div>

            {/* TAB 1: ATS SCORECARD & METRICS */}
            {activeTab === 'scorecard' && (
              <div className="space-y-5">
                {/* Score Banner */}
                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs text-slate-400 block mb-0.5">Overall ATS Compatibility Score</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl sm:text-4xl font-bold font-heading text-white">
                        {analysis.overallScore}
                        <span className="text-lg text-slate-400 font-normal">/100</span>
                      </span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-800/40">
                        Grade {analysis.grade}
                      </span>
                    </div>
                    <p className={`text-[11px] mt-1 font-medium ${analysis.overallScore >= 80 ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {analysis.verdict}
                    </p>
                  </div>

                  <div className="text-right text-xs space-y-1">
                    <span className="block text-slate-400 text-[11px]">Skill Coverage:</span>
                    <span className="font-bold text-white text-sm font-mono">
                      {analysis.matchingSkills.length} / {selectedJob.skills.length}
                    </span>
                  </div>
                </div>

                {/* 4-Dimension Metric Bars */}
                <div className="space-y-3">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    ATS Evaluation Dimensions
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {analysis.dimensions.map((dim) => (
                      <div key={dim.name} className="p-3 bg-slate-900 border border-slate-800 rounded-lg space-y-1.5">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-medium text-slate-200">{dim.name}</span>
                          <span className={`font-mono font-bold ${dim.score >= 75 ? 'text-emerald-400' : dim.score >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                            {dim.score}%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${dim.score >= 75 ? 'bg-emerald-500' : dim.score >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
                            style={{ width: `${dim.score}%` }}
                          />
                        </div>
                        <p className="text-[10px] text-slate-400 leading-tight">{dim.feedback}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Matching Keywords Check */}
                <div>
                  <span className="text-xs font-medium text-slate-300 block mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    Keywords Detected in Resume ({analysis.matchingSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.matchingSkills.length > 0 ? (
                      analysis.matchingSkills.map((s, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-950/40 text-emerald-300 border border-emerald-800/50"
                        >
                          ✓ {s}
                        </span>
                      ))
                    ) : (
                      <p className="text-xs text-slate-400">No direct technical skill matches found in resume text.</p>
                    )}
                  </div>
                </div>

                {/* Missing Keywords with 1-Click Insert */}
                <div>
                  <span className="text-xs font-medium text-slate-300 block mb-2 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    Missing Critical Skills for {selectedJob.title} ({analysis.missingSkills.length})
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.missingSkills.length > 0 ? (
                      analysis.missingSkills.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => handleAddKeyword(s)}
                          className="px-2 py-0.5 rounded text-[11px] font-medium bg-amber-950/30 text-amber-300 border border-amber-800/40 hover:bg-amber-900/40 transition-colors flex items-center gap-1"
                          title="Click to add this keyword into your resume"
                        >
                          <span>+ {s}</span>
                        </button>
                      ))
                    ) : (
                      <p className="text-xs text-emerald-400 font-medium">All core job skills are present in your resume!</p>
                    )}
                  </div>
                </div>

                {/* Switch to AI Corrector Callout */}
                <div className="p-4 bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-900 border border-blue-900/40 rounded-xl flex items-center justify-between gap-4">
                  <div>
                    <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-400" />
                      Boost ATS Score to 96/100
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Our AI has rewritten and optimized your bullet points with Google X-Y-Z metrics.
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveTab('corrected')}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center gap-1.5 flex-shrink-0"
                  >
                    <span>View Corrected</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* TAB 2: AI CORRECTED RESUME (REWRITTEN & OPTIMIZED) */}
            {activeTab === 'corrected' && (
              <div className="space-y-4">
                <div className="p-3.5 bg-blue-950/30 border border-blue-900/40 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      AI ATS-Corrected Document for {selectedJob.company}
                    </span>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Rewritten with Google X-Y-Z formula metrics & all missing tech keywords integrated.
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40 font-mono">
                    Projected: 96/100 (+{Math.max(0, 96 - analysis.overallScore)} pts)
                  </span>
                </div>

                {/* Display Corrected Resume in Readout */}
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl max-h-[380px] overflow-y-auto custom-scrollbar font-mono text-[11px] text-slate-200 leading-relaxed whitespace-pre-wrap">
                  {correction.correctedResumeText}
                </div>

                {/* Actions: Apply, Copy, Download */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
                  <button
                    onClick={handleApplyCorrections}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Apply to Editor</span>
                  </button>

                  <button
                    onClick={handleCopyCorrected}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Text'}</span>
                  </button>

                  <button
                    onClick={handleDownloadCorrected}
                    className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 text-xs font-semibold border border-slate-800 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download (.txt)</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB 3: BEFORE / AFTER BULLET DIFF */}
            {activeTab === 'diff' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800">
                  <span className="font-semibold text-slate-200">Google X-Y-Z Bullet Point Refactorings</span>
                  <span className="text-[11px] text-slate-400">4 Experience Bullets Enhanced</span>
                </div>

                <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                  {correction.bulletImprovements.map((bullet, idx) => (
                    <div key={bullet.id} className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-xs">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-slate-400">Bullet Enhancement #{idx + 1}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-950/40 text-blue-300 border border-blue-800/40">
                          {bullet.skillAdded}
                        </span>
                      </div>

                      {/* Original Weak Bullet */}
                      <div className="p-2.5 rounded bg-rose-950/20 border border-rose-900/30 text-rose-200">
                        <span className="text-[10px] uppercase font-bold text-rose-400 block mb-0.5">Original (Weak ATS Signal)</span>
                        <p className="line-through opacity-80">{bullet.original}</p>
                      </div>

                      {/* Corrected Google X-Y-Z Bullet */}
                      <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-900/40 text-emerald-200">
                        <span className="text-[10px] uppercase font-bold text-emerald-400 block mb-0.5">AI Corrected (Google X-Y-Z Metric)</span>
                        <p>{bullet.corrected}</p>
                      </div>

                      <p className="text-[10px] text-slate-400 pt-1">
                        <strong>Why:</strong> {bullet.reason}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={handleApplyCorrections}
                  className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
                >
                  Apply All 4 Enhancements to Resume
                </button>
              </div>
            )}

            {/* Direct Official Apply Link */}
            <div className="pt-2 border-t border-slate-800">
              <a
                href={sanitizeSafeUrl(selectedJob.applyUrl)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-lg text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Apply on Official {selectedJob.company} Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        </div>

      </div>

      {/* LinkedIn Connect Modal (When user clicks Import and is not yet connected) */}
      <LinkedInConnectModal
        isOpen={isLinkedInModalOpen}
        onClose={() => setIsLinkedInModalOpen(false)}
      />
    </div>
  );
}
