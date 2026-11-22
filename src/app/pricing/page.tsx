import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Check } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Recruitment Pricing Plans',
  description: 'Simple, transparent pricing for technical recruiters and engineering hiring teams. Post jobs, manage candidate ATS pipelines, and hire top developers.',
  alternates: {
    canonical: '/pricing',
  },
};

const TIERS = [
  {
    name: 'Starter',
    price: '₹0',
    period: 'forever free',
    badge: 'Free Tier',
    description: 'Ideal for early-stage startups and engineering teams hiring their first developers in India.',
    features: [
      'Up to 3 Active Job Postings',
      'ATS Kanban Candidate Pipeline',
      'Direct Applicant Email Notifications',
      'Standard CareerHub Directory Placement',
      'Community Support',
    ],
    cta: 'Start Free Today',
    featured: false,
    buttonStyle: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700',
  },
  {
    name: 'Growth',
    price: '₹9,999',
    period: 'per month',
    badge: 'Recommended',
    description: 'For growing tech companies actively expanding engineering, product, and infrastructure squads.',
    features: [
      'Unlimited Active Job Listings',
      'Featured Placement in Search Results',
      'Candidate Pipeline Notes & Status Tracking',
      'Direct External Career Portal URL Linking',
      'Spam & Bot Protection Screening',
      'Verified Employer Profile Badge',
      'Priority Email Support',
    ],
    cta: 'Choose Growth Plan',
    featured: true,
    buttonStyle: 'bg-blue-600 hover:bg-blue-500 text-white',
  },
  {
    name: 'Enterprise',
    price: '₹24,999',
    period: 'per month',
    badge: 'High Volume',
    description: 'For organizations with multi-team hiring needs, dedicated account coordination, and custom ATS workflows.',
    features: [
      'Everything in Growth',
      'Multi-Recruiter Seat Access',
      'Custom Webhook & ATS Ingestion Sync',
      'Dedicated Account Manager',
      'Custom Data Retention & Privacy SLA',
      'Custom GST Invoicing & Procurement Support',
    ],
    cta: 'Contact Sales',
    featured: false,
    buttonStyle: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700',
  },
];

export default function PricingPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-10 py-6">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          Back to CareerHub
        </Link>
      </div>

      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-heading">
          Transparent Employer Pricing
        </h1>
        <p className="text-sm text-slate-300 leading-relaxed">
          Transparent plans for technical hiring teams. Access candidate tracking, direct applicant communication, and verified company visibility.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        {TIERS.map((tier) => (
          <div
            key={tier.name}
            className={`rounded-xl p-6 sm:p-7 flex flex-col justify-between transition-colors bg-[#11141c] border ${
              tier.featured
                ? 'border-blue-500 ring-1 ring-blue-500/20'
                : 'border-slate-800'
            }`}
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-bold text-white font-heading">{tier.name}</h3>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                  tier.featured
                    ? 'bg-blue-950/60 text-blue-300 border border-blue-800/60'
                    : 'bg-slate-800 text-slate-400 border border-slate-700'
                }`}>
                  {tier.badge}
                </span>
              </div>

              <p className="text-xs text-slate-400 mb-6 min-h-[32px] leading-relaxed">{tier.description}</p>

              <div className="flex items-baseline gap-1 mb-6 pb-6 border-b border-slate-800">
                <span className="text-4xl font-bold text-white tracking-tight font-heading">{tier.price}</span>
                <span className="text-xs text-slate-400 font-normal">/{tier.period}</span>
              </div>

              <ul className="space-y-2.5 mb-8">
                {tier.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/recruiter/post-job"
              className={`w-full py-2.5 px-4 rounded-lg text-xs font-semibold text-center transition-colors min-h-[40px] flex items-center justify-center ${tier.buttonStyle}`}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>

      {/* Enterprise Contact Box */}
      <div className="rounded-xl p-6 bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-white">Need a custom enterprise hiring setup?</h3>
          <p className="text-xs text-slate-400 mt-0.5">
            We support custom ATS integrations (Greenhouse, Lever, Ashby), custom billing, and bulk hiring packages.
          </p>
        </div>
        <Link
          href="/recruiter/post-job"
          className="px-4 py-2 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors whitespace-nowrap"
        >
          Talk to Recruitment Team
        </Link>
      </div>

    </div>
  );
}
