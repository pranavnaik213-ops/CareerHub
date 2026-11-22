import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Check, ShieldCheck, Zap, Building2, Sparkles, Star } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Enterprise Recruitment Pricing',
  description: 'Simple, transparent pricing for recruiters and hiring teams. Manage candidate pipelines, ATS integrations, and unlimited job postings.',
  alternates: {
    canonical: '/pricing',
  },
};

const TIERS = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever free',
    badge: 'Open Community',
    description: 'Perfect for startups and independent recruiters hiring their initial engineering squad.',
    features: [
      'Up to 3 Active Job Postings',
      'ATS Kanban Candidate Pipeline',
      'Direct Applicant Email Notifications',
      'Standard CareerHub Job Directory Placement',
      'Community Support Desk',
    ],
    cta: 'Start Free Today',
    featured: false,
    buttonStyle: 'bg-slate-800 hover:bg-slate-700 text-slate-200',
  },
  {
    name: 'Growth & Scale',
    price: '$149',
    period: 'per month',
    badge: 'Most Popular',
    description: 'For growing tech companies and agencies scaling their product, engineering, and design teams.',
    features: [
      'Unlimited Active Job Listings',
      'Highlighted "Featured" Listing Badges',
      'Advanced Candidate Stage Filtering & Notes',
      'Integrated Interview Scheduling',
      'Custom Screening Questions & Honeypot Spam Shield',
      'Priority Verified Employer Badge',
      '24/7 Dedicated Support',
    ],
    cta: 'Get Started with Growth',
    featured: true,
    buttonStyle: 'bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:brightness-110 text-white shadow-xl shadow-indigo-600/30',
  },
  {
    name: 'Enterprise ATS',
    price: '$499',
    period: 'per month',
    badge: 'Full Automation',
    description: 'For large tech organizations requiring custom ATS synchronization, SSO, and team roles.',
    features: [
      'Everything in Growth & Scale',
      'Full API Access & Webhooks Integration',
      'SAML 2.0 / Okta Single Sign-On (SSO)',
      'Multi-Recruiter Seat Collaboration',
      'Custom Retention Policies & GDPR Compliance SLA',
      'Dedicated Account Manager',
    ],
    cta: 'Contact Sales',
    featured: false,
    buttonStyle: 'bg-slate-800 hover:bg-slate-700 text-slate-200',
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-12 py-4">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to CareerHub
        </Link>
      </div>

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
          Transparent Employer Pricing
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Supercharge Your Tech Hiring Pipeline
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          Zero hidden listing fees. Full access to candidate applicant tracking, verified tech reach, and direct recruitment communications.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
              tier.featured
                ? 'bg-gradient-to-b from-indigo-950/70 via-slate-900/90 to-slate-950 border-2 border-indigo-500 shadow-2xl shadow-indigo-500/20 md:-translate-y-3'
                : 'bento-card'
            }`}
          >
            {tier.featured && (
              <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wide bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-md flex items-center gap-1">
                <Star className="w-3 h-3 fill-white" aria-hidden="true" />
                {tier.badge}
              </span>
            )}

            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-bold text-white">{tier.name}</h3>
                {!tier.featured && (
                  <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded-md bg-slate-800 border border-slate-700">
                    {tier.badge}
                  </span>
                )}
              </div>
              
              <p className="text-xs text-slate-300 mb-6 min-h-[36px] leading-relaxed">{tier.description}</p>
              
              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-800">
                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{tier.price}</span>
                <span className="text-xs text-slate-400 font-medium">/{tier.period}</span>
              </div>

              <ul className="space-y-3.5 mb-8">
                {tier.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/recruiter/post-job"
              className={`w-full py-3.5 rounded-2xl text-xs font-bold text-center transition-all min-h-[44px] flex items-center justify-center ${tier.buttonStyle}`}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
