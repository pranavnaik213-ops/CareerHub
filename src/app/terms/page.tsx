import { Metadata } from 'next';
import Link from 'next/link';
import { FileText, ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, Scale, Briefcase } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Read the terms of service governing candidate applications, recruiter job postings, and use of CareerHub.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsAndConditionsPage() {
  const lastUpdated = 'November 22, 2026';

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to CareerHub
        </Link>
      </div>

      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden p-8 sm:p-12 border border-slate-800 bg-gradient-to-br from-slate-900 via-indigo-950/40 to-slate-900 shadow-2xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">User Agreement</span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">Terms and Conditions</h1>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
          Welcome to CareerHub. These Terms and Conditions govern your access to and use of our recruitment platform, whether you are seeking employment or posting job listings as an employer.
        </p>
        <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-4 text-xs text-slate-400">
          <span>Effective Date: <strong>{lastUpdated}</strong></span>
          <span>•</span>
          <span>Applicable Jurisdiction: <strong>Global / Standard Commerce</strong></span>
        </div>
      </div>

      {/* Content Body */}
      <div className="space-y-8 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 sm:p-12 backdrop-blur-xl shadow-xl">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xs font-bold">1</span>
            Acceptance of Terms
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            By accessing or interacting with CareerHub (including browsing jobs, submitting candidate applications, or posting open positions), you agree to be bound by these Terms and our Privacy Policy. If you disagree with any portion of these terms, please discontinue your use of CareerHub immediately.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-6 border-t border-slate-800">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xs font-bold">2</span>
            Terms for Job Seekers & Candidates
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <li>
              <strong>Accuracy of Qualifications:</strong> You warrant that all information submitted in your profile, resume, work history, and cover letters is truthful and accurate.
            </li>
            <li>
              <strong>Application Submissions:</strong> When you submit an application, you authorize the prospective employer to review your resume, contact details, and screening responses for evaluating your candidacy.
            </li>
            <li>
              <strong>No Guarantee of Employment:</strong> CareerHub is a matchmaking and applicant tracking platform. We do not guarantee interview scheduling, job offers, or minimum compensation levels.
            </li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-6 border-t border-slate-800">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xs font-bold">3</span>
            Terms for Recruiters & Employers
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <li>
              <strong>Bona Fide Job Openings:</strong> Employers may only publish active, legitimate job openings with verifiable compensation and realistic job duties.
            </li>
            <li>
              <strong>Non-Discrimination:</strong> Listings must strictly comply with equal opportunity employment regulations. Discrimination based on race, gender, religion, age, disability, or sexual orientation is strictly prohibited and grounds for immediate listing termination.
            </li>
            <li>
              <strong>Data Confidentiality:</strong> Applicant resumes and personal contact details retrieved through CareerHub ATS may solely be used for recruiting evaluation and must not be sold or harvested.
            </li>
          </ul>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-6 border-t border-slate-800">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xs font-bold">4</span>
            Prohibited Activities
          </h2>
          <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/20 space-y-2 text-xs sm:text-sm text-rose-200">
            <p className="font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
              Users are strictly forbidden from:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-300 text-xs">
              <li>Scraping or extracting job listings or candidate data via automated scripts or crawlers without written authorization.</li>
              <li>Flooding forms with automated bot applications or deceptive spam submissions.</li>
              <li>Impersonating another person, employer, or company representative.</li>
              <li>Attempting to probe, exploit, or bypass security mechanisms, rate limiters, or authentication endpoints.</li>
            </ul>
          </div>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-6 border-t border-slate-800">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xs font-bold">5</span>
            Limitation of Liability & Disclaimers
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            CareerHub provides services on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without warranties of any kind. Under no circumstances shall CareerHub be liable for direct, indirect, incidental, or consequential damages resulting from employment outcomes, employer hiring decisions, or platform interruptions.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-3 pt-6 border-t border-slate-800">
          <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-indigo-600/20 text-indigo-400 flex items-center justify-center text-xs font-bold">6</span>
            Modifications & Legal Contact
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We reserve the right to modify these terms as platform capabilities expand. Significant updates will be highlighted via notice banners. For legal questions:
          </p>
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
            <strong>CareerHub Legal Operations</strong> — <span className="text-indigo-400">legal@careerhub.example.com</span>
          </div>
        </section>

      </div>
    </div>
  );
}
