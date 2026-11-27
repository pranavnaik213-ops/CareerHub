import { Metadata } from 'next';
import Link from 'next/link';
import { ShieldCheck, Lock, ArrowLeft, Eye, Database, UserCheck, Mail } from 'lucide-react';

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
    <div className="max-w-4xl mx-auto space-y-8 py-4">
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
      <div className="relative rounded-2xl overflow-hidden p-6 sm:p-10 border border-slate-800 bg-[#0f131f] shadow-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-400">Legal Compliance</span>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-heading">Privacy Policy</h1>
          </div>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl">
          At CareerHub, we treat your professional journey and recruitment records with strict confidentiality. This policy outlines our data stewardship, security standards, and user rights under GDPR, CCPA, and global privacy benchmarks.
        </p>
        <div className="mt-5 pt-5 border-t border-slate-800 flex items-center gap-3 text-xs text-slate-400">
          <span>Effective Date: <strong className="text-slate-300">{lastUpdated}</strong></span>
          <span>•</span>
          <span>Version: <strong className="text-slate-300">2.4.0</strong></span>
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-8 bg-[#0f131f] border border-slate-800 rounded-2xl p-6 sm:p-10 shadow-lg">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-base">
            <Eye className="w-4 h-4 flex-shrink-0" />
            <h2>1. Information We Collect</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            We collect only the essential information needed to support recruitment matching and candidate communication:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <li>
              <strong className="text-white">Candidate Information:</strong> Name, contact email, phone number, headline, resume details, portfolio links, and application cover letters.
            </li>
            <li>
              <strong className="text-white">Recruiter & Employer Details:</strong> Company name, verified organization email, job specifications, CTC ranges, and hiring pipeline evaluation notes.
            </li>
            <li>
              <strong className="text-white">Technical Telemetry:</strong> Anonymized browser type, screen resolution, referral path, and interaction events with job filters to optimize search latency.
            </li>
            <li>
              <strong className="text-white">Storage Tokens:</strong> Strictly necessary session tokens and preference flags (such as saved bookmarks and role selections) stored in local browser storage.
            </li>
          </ul>
        </section>

        {/* Section 2 */}
        <section className="space-y-3 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-base">
            <Database className="w-4 h-4 flex-shrink-0" />
            <h2>2. How We Leverage Your Data</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Your data is strictly utilized to power core platform capabilities:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <li>Facilitating direct job applications with hiring teams and official career portals.</li>
            <li>Powering the Recruiter ATS Kanban board to advance candidate interview stages.</li>
            <li>Notifying applicants of interview scheduling and stage status updates.</li>
            <li>Preventing automated spam, malicious job postings, and fraudulent submissions.</li>
            <li><strong className="text-emerald-400">We do NOT sell, lease, or monetize your resume or personal data to advertising networks.</strong></li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-3 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-base">
            <Lock className="w-4 h-4 flex-shrink-0" />
            <h2>3. Security Controls & Infrastructure</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            CareerHub implements defense-in-depth security standards:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-200 mb-1">End-to-End HTTPS Encryption</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                All data transmission between your browser and our servers is protected using TLS 1.3 with Strict Transport Security (HSTS).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-200 mb-1">Zero Secrets on the Front-End</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Client builds contain zero database credentials or API secrets. All privileged operations execute in secure server-side environments.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-200 mb-1">Role-Based Access Controls</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Applicant resumes and notes are visible exclusively to authorized recruiters managing that specific position.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800">
              <h4 className="text-xs font-semibold text-slate-200 mb-1">Automated Anti-Spam</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Honeypot protection and submission rate limiting protect applicant inboxes from bot floods.
              </p>
            </div>
          </div>
        </section>

        {/* Section 4 */}
        <section className="space-y-3 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-base">
            <UserCheck className="w-4 h-4 flex-shrink-0" />
            <h2>4. Your Rights Under GDPR & CCPA</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Regardless of your geographic location, you enjoy complete sovereignty over your data:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <li><strong>Right of Access:</strong> Request a complete export of your candidate profile, applications, and uploaded files.</li>
            <li><strong>Right to Rectification:</strong> Edit or update any profile information directly in your Candidate Dashboard.</li>
            <li><strong>Right to Erasure (&quot;Right to Be Forgotten&quot;):</strong> Request immediate permanent deletion of your applications, resume, and contact records.</li>
            <li><strong>Right to Withdraw Consent:</strong> Update your cookie preferences at any time via the Cookie Settings trigger in the footer.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-3 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-2 text-blue-400 font-semibold text-base">
            <Mail className="w-4 h-4 flex-shrink-0" />
            <h2>5. Contact Our Privacy Desk</h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            If you have questions regarding this Privacy Policy or wish to exercise your data rights, contact our privacy desk:
          </p>
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold text-white">CareerHub Data Protection Office</p>
              <p className="text-xs text-blue-400">privacy@careerhub.example.com</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Response SLA: Within 24–48 business hours</p>
            </div>
            <Link
              href="/"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors inline-block text-center"
            >
              Return Home
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}
