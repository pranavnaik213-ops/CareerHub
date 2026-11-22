import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, FileText, ArrowLeft, Eye, Database, Bell, UserCheck, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how CareerHub protects your personal information, candidate resumes, and hiring data in compliance with GDPR and CCPA.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Legal Transparency</span>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">Privacy Policy</h1>
          </div>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
          At CareerHub, we believe your personal career journey and recruitment communications belong to you. This Privacy Policy details our data collection, processing standards, and security measures in strict adherence with GDPR, CCPA, and global privacy standards.
        </p>
        <div className="mt-6 pt-6 border-t border-slate-800 flex items-center gap-4 text-xs text-slate-400">
          <span>Effective Date: <strong>{lastUpdated}</strong></span>
          <span>•</span>
          <span>Version: <strong>2.4.0</strong></span>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 sm:p-12 backdrop-blur-xl shadow-xl">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
            <Eye className="w-5 h-5 flex-shrink-0" />
            <h2>1. Information We Collect</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We collect only the minimum required information necessary to provide seamless recruitment matching, candidate tracking, and communication services:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <li>
              <strong className="text-white">Candidate Information:</strong> Name, contact email, phone number, headline, resume files, portfolio links, and customized application cover letters.
            </li>
            <li>
              <strong className="text-white">Recruiter & Employer Details:</strong> Company name, verified organization email, job requirements, salary ranges, and hiring pipeline notes.
            </li>
            <li>
              <strong className="text-white">Device & Usage Telemetry:</strong> Anonymized browser type, screen resolution, referral path, and interaction events with job filters to optimize search performance.
            </li>
            <li>
              <strong className="text-white">Cookies & Storage:</strong> Strictly necessary session tokens and user preference flags (such as saved bookmarks and role selections) stored in your local browser storage.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
            <Database className="w-5 h-5 flex-shrink-0" />
            <h2>2. How We Utilize Your Data</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Your information is strictly leveraged to power the CareerHub recruitment platform:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <li>Facilitating direct job applications between candidates and hiring recruiters.</li>
            <li>Powering the Recruiter ATS (Applicant Tracking System) Kanban board to transition applicant stages.</li>
            <li>Notifying applicants of interview scheduling, status transitions, or hiring outcomes.</li>
            <li>Preventing automated spam, malicious job postings, and fraudulent impersonation.</li>
            <li><strong className="text-emerald-400">We do NOT sell, lease, or monetize your resume or personal data to advertising networks.</strong></li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
            <Lock className="w-5 h-5 flex-shrink-0" />
            <h2>3. Data Protection & Security Controls</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            CareerHub implements enterprise-grade security protocols:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-200 mb-1">End-to-End HTTPS Encryption</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                All data transmission between your browser and our servers is protected using TLS 1.3 with Strict Transport Security (HSTS).
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-200 mb-1">Zero Secrets on the Front-End</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Client builds contain zero database credentials or API secrets. All privileged operations execute in secure server-side environments.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-200 mb-1">Role-Based Access Controls</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Applicant resumes and notes are visible exclusively to authorized recruiters managing that specific position.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <h4 className="text-xs font-bold text-slate-200 mb-1">Automated Anti-Spam</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Honeypot protection and submission rate limiting protect applicant inboxes from bot floods.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
            <UserCheck className="w-5 h-5 flex-shrink-0" />
            <h2>4. Your Rights Under GDPR & CCPA</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Regardless of your geographic location, you enjoy complete sovereignty over your data:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <li><strong>Right of Access:</strong> Request a complete export of your candidate profile, applications, and uploaded files.</li>
            <li><strong>Right to Rectification:</strong> Edit or update any outdated profile information directly in your Candidate Dashboard.</li>
            <li><strong>Right to Erasure ("Right to Be Forgotten"):</strong> Request immediate permanent deletion of your applications, resume, and contact logs.</li>
            <li><strong>Right to Withdraw Consent:</strong> Update your cookie preferences at any time via the Cookie Settings banner in the footer.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2 text-indigo-400 font-bold text-lg">
            <Mail className="w-5 h-5 flex-shrink-0" />
            <h2>5. Contact Our Privacy Officer</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            If you have questions regarding this Privacy Policy, wish to exercise your data protection rights, or have a security concern, reach out to our dedicated privacy desk:
          </p>
          <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold text-white">CareerHub Data Protection Office</p>
              <p className="text-xs text-indigo-300">privacy@careerhub.example.com</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Response window: Within 24-48 business hours</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors w-fit"
            >
              Back to Home
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
