'use client';

import React, { useState, useRef } from 'react';
import { useJobContext } from '@/context/JobContext';
import { useRouter } from 'next/navigation';
import { LocationType, JobType, ExperienceLevel } from '@/types';
import {
  Briefcase,
  Building,
  MapPin,
  DollarSign,
  Plus,
  X,
  ArrowLeft,
  Send,
  Sparkles,
  AlertCircle,
  ShieldAlert,
  Zap,
  Cpu,
  ShieldCheck,
  Layers,
  Globe,
  Building2,
  Flame,
  Code2,
  Gem
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const BRAND_ICONS = [
  { id: 'zap', name: 'Fast Energy', Icon: Zap, gradient: 'from-amber-500 to-orange-500' },
  { id: 'sparkles', name: 'Innovation', Icon: Sparkles, gradient: 'from-indigo-500 to-violet-500' },
  { id: 'cpu', name: 'AI & Data', Icon: Cpu, gradient: 'from-cyan-500 to-blue-500' },
  { id: 'shield', name: 'Security', Icon: ShieldCheck, gradient: 'from-emerald-500 to-teal-500' },
  { id: 'layers', name: 'Full Stack', Icon: Layers, gradient: 'from-purple-500 to-pink-500' },
  { id: 'globe', name: 'Distributed', Icon: Globe, gradient: 'from-blue-500 to-indigo-500' },
  { id: 'building', name: 'Enterprise', Icon: Building2, gradient: 'from-slate-600 to-slate-800' },
  { id: 'flame', name: 'High Growth', Icon: Flame, gradient: 'from-rose-500 to-red-500' },
  { id: 'code', name: 'Engineering', Icon: Code2, gradient: 'from-violet-500 to-indigo-500' },
  { id: 'gem', name: 'Premium Tier', Icon: Gem, gradient: 'from-teal-500 to-emerald-500' },
];

export default function PostJobPage() {
  const { postJob, setRole, showToast } = useJobContext();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('CareerHub Recruiting Partner');
  const [selectedIconId, setSelectedIconId] = useState('zap');
  const [location, setLocation] = useState('Remote (Worldwide)');
  const [locationType, setLocationType] = useState<LocationType>('Remote');
  const [jobType, setJobType] = useState<JobType>('Full-time');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>('Senior');
  const [category, setCategory] = useState('Engineering');
  const [salaryMin, setSalaryMin] = useState(120000);
  const [salaryMax, setSalaryMax] = useState(160000);
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(true);

  // Dynamic Lists
  const [responsibilities, setResponsibilities] = useState<string[]>([
    'Architect and implement scalable feature modules.',
    'Participate in code reviews and architectural discussions.',
    'Collaborate across cross-functional engineering and design teams.',
  ]);
  const [newResp, setNewResp] = useState('');

  const [requirements, setRequirements] = useState<string[]>([
    '3+ years of experience with modern web technologies.',
    'Strong communication skills and collaborative mindset.',
  ]);
  const [newReq, setNewReq] = useState('');

  const [skills, setSkills] = useState<string[]>(['TypeScript', 'React', 'Next.js', 'Node.js']);
  const [newSkill, setNewSkill] = useState('');

  const [benefits, setBenefits] = useState<string[]>([
    'Unlimited PTO',
    'Full Health, Dental & Vision Insurance',
    'Annual Learning & Development Stipend',
  ]);
  const [newBen, setNewBen] = useState('');

  // Form Validation & Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Spam / Bot Protection
  const [honeypotField, setHoneypotField] = useState('');
  const pageLoadedTimestamp = useRef<number>(Date.now());
  const lastSubmitTimestamp = useRef<number>(0);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};

    if (!title.trim() || title.trim().length < 5) {
      errs.title = 'Job title must be at least 5 characters long.';
    }

    if (!company.trim() || company.trim().length < 2) {
      errs.company = 'Company name must be at least 2 characters long.';
    }

    if (!location.trim()) {
      errs.location = 'Please specify a job location.';
    }

    if (salaryMin < 10000) {
      errs.salaryMin = 'Minimum salary must be at least $10,000.';
    }

    if (salaryMax < salaryMin) {
      errs.salaryMax = 'Maximum salary cannot be lower than minimum salary.';
    }

    if (!description.trim() || description.trim().length < 30) {
      errs.description = 'Please provide a comprehensive description (at least 30 characters).';
    }

    if (skills.length === 0) {
      errs.skills = 'Please add at least one required skill tag.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (honeypotField.trim().length > 0) {
      // eslint-disable-next-line no-console
      console.warn('[Security] Bot detected via job posting honeypot.');
      showToast('Automated listing rejected.', 'error');
      return;
    }

    // Speed check (at least 1.5 seconds)
    if (Date.now() - pageLoadedTimestamp.current < 1500) {
      showToast('Form submission too fast. Please verify listing parameters.', 'error');
      return;
    }

    // Double-submit debounce
    const now = Date.now();
    if (now - lastSubmitTimestamp.current < 4000) {
      return;
    }
    lastSubmitTimestamp.current = now;

    if (!validate()) {
      showToast('Please correct the highlighted issues in the form.', 'error');
      return;
    }

    postJob({
      title: title.trim(),
      company: company.trim(),
      logo: selectedIconId,
      location: location.trim(),
      locationType,
      jobType,
      experienceLevel,
      category,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      currency: '$',
      description: description.trim(),
      responsibilities,
      requirements,
      skills,
      benefits,
      featured,
    });

    trackEvent('job_posted', {
      title,
      company,
      category,
      locationType,
      salaryMin,
      salaryMax,
    });

    setRole('recruiter');
    router.push('/');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" aria-hidden="true" />
        Back to Dashboard
      </button>

      {/* Form Container */}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-10 backdrop-blur-xl shadow-2xl space-y-8"
      >
        {/* Anti-spam honeypot */}
        <div className="absolute left-[-9999px] top-[-9999px] opacity-0 pointer-events-none" aria-hidden="true">
          <label htmlFor="company_fax_number_hp">Leave blank if you are human</label>
          <input
            type="text"
            id="company_fax_number_hp"
            name="company_fax_number_hp"
            value={honeypotField}
            onChange={(e) => setHoneypotField(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="pb-6 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Publish New Job Listing</h1>
            <p className="text-xs text-slate-400 mt-1">Fill out the role parameters to broadcast your opening to verified candidates.</p>
          </div>
          <span className="px-3.5 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
            Active Recruiter Session
          </span>
        </div>

        {/* Basic Info */}
        <div className="space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Position Basics</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="job-title-input" className="block text-xs font-semibold text-slate-300 mb-2">Job Title *</label>
              <input
                id="job-title-input"
                type="text"
                placeholder="e.g. Senior Frontend Engineer (React & TypeScript)"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
                }}
                className={`w-full bg-slate-950 border ${
                  errors.title ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                } rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none`}
              />
              {errors.title && <p className="text-[11px] text-rose-400 mt-1">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="company-name-input" className="block text-xs font-semibold text-slate-300 mb-2">Company Name *</label>
              <input
                id="company-name-input"
                type="text"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  if (errors.company) setErrors((prev) => ({ ...prev, company: '' }));
                }}
                className={`w-full bg-slate-950 border ${
                  errors.company ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                } rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none`}
              />
              {errors.company && <p className="text-[11px] text-rose-400 mt-1">{errors.company}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Company Brand Icon</label>
              <div className="flex flex-wrap gap-2">
                {BRAND_ICONS.map((brand) => {
                  const Icon = brand.Icon;
                  const isSelected = selectedIconId === brand.id;
                  return (
                    <button
                      key={brand.id}
                      type="button"
                      onClick={() => setSelectedIconId(brand.id)}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${
                        isSelected
                          ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md shadow-indigo-600/25 ring-2 ring-indigo-500/40'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                      title={brand.name}
                      aria-label={`Select ${brand.name} icon`}
                    >
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Location & Setup */}
        <div className="space-y-6 pt-4 border-t border-slate-800/80">
          <h2 className="text-xs font-bold uppercase tracking-wider text-violet-400">Work Environment & Salary</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label htmlFor="location-input" className="block text-xs font-semibold text-slate-300 mb-2">Location Name *</label>
              <input
                id="location-input"
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
                }}
                placeholder="e.g. San Francisco, CA or Remote"
                className={`w-full bg-slate-950 border ${
                  errors.location ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                } rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none`}
              />
              {errors.location && <p className="text-[11px] text-rose-400 mt-1">{errors.location}</p>}
            </div>

            <div>
              <label htmlFor="location-type-select" className="block text-xs font-semibold text-slate-300 mb-2">Location Type</label>
              <select
                id="location-type-select"
                value={locationType}
                onChange={(e) => setLocationType(e.target.value as LocationType)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label htmlFor="job-type-select" className="block text-xs font-semibold text-slate-300 mb-2">Employment Type</label>
              <select
                id="job-type-select"
                value={jobType}
                onChange={(e) => setJobType(e.target.value as JobType)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div>
              <label htmlFor="category-select" className="block text-xs font-semibold text-slate-300 mb-2">Category</label>
              <select
                id="category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Data & AI">Data & AI</option>
                <option value="Marketing">Marketing</option>
                <option value="Infrastructure">Infrastructure</option>
                <option value="Product">Product</option>
              </select>
            </div>

            <div>
              <label htmlFor="salary-min-input" className="block text-xs font-semibold text-slate-300 mb-2">Min Salary (USD / yr) *</label>
              <input
                id="salary-min-input"
                type="number"
                step="5000"
                value={salaryMin}
                onChange={(e) => {
                  setSalaryMin(Number(e.target.value));
                  if (errors.salaryMin) setErrors((prev) => ({ ...prev, salaryMin: '' }));
                }}
                className={`w-full bg-slate-950 border ${
                  errors.salaryMin ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                } rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none`}
              />
              {errors.salaryMin && <p className="text-[11px] text-rose-400 mt-1">{errors.salaryMin}</p>}
            </div>

            <div>
              <label htmlFor="salary-max-input" className="block text-xs font-semibold text-slate-300 mb-2">Max Salary (USD / yr) *</label>
              <input
                id="salary-max-input"
                type="number"
                step="5000"
                value={salaryMax}
                onChange={(e) => {
                  setSalaryMax(Number(e.target.value));
                  if (errors.salaryMax) setErrors((prev) => ({ ...prev, salaryMax: '' }));
                }}
                className={`w-full bg-slate-950 border ${
                  errors.salaryMax ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                } rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none`}
              />
              {errors.salaryMax && <p className="text-[11px] text-rose-400 mt-1">{errors.salaryMax}</p>}
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-6 pt-4 border-t border-slate-800/80">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Role Description & Skills</h2>

          <div>
            <label htmlFor="description-input" className="block text-xs font-semibold text-slate-300 mb-2">Overview / Description *</label>
            <textarea
              id="description-input"
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
              }}
              placeholder="Describe the role responsibilities, team culture, and objectives (min 30 characters)..."
              className={`w-full bg-slate-950 border ${
                errors.description ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
              } rounded-xl p-4 text-xs text-slate-100 leading-relaxed outline-none`}
            />
            {errors.description && <p className="text-[11px] text-rose-400 mt-1">{errors.description}</p>}
          </div>

          {/* Skills Tag Adder */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Required Skills *</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill tag (e.g. Next.js, AWS)..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100 outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
                      setSkills([...skills, newSkill.trim()]);
                      setNewSkill('');
                      if (errors.skills) setErrors((prev) => ({ ...prev, skills: '' }));
                    }
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  if (newSkill.trim() && !skills.includes(newSkill.trim())) {
                    setSkills([...skills, newSkill.trim()]);
                    setNewSkill('');
                    if (errors.skills) setErrors((prev) => ({ ...prev, skills: '' }));
                  }
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-colors"
              >
                Add Skill
              </button>
            </div>
            {errors.skills && <p className="text-[11px] text-rose-400 mb-2">{errors.skills}</p>}
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="px-3 py-1 rounded-xl text-xs bg-slate-800 text-indigo-300 flex items-center gap-1.5 border border-slate-700">
                  {s}
                  <button
                    type="button"
                    onClick={() => setSkills(skills.filter((sk) => sk !== s))}
                    className="text-slate-400 hover:text-rose-400"
                    aria-label={`Remove skill ${s}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured toggle & Submit CTA */}
        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="accent-indigo-500 h-4 w-4 rounded cursor-pointer"
            />
            <span>Highlight as Featured Job Listing</span>
          </label>

          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 rounded-2xl text-xs font-bold bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 text-white shadow-xl shadow-emerald-500/20 hover:brightness-110 transition-all min-h-[44px]"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
            Publish Job Listing
          </button>
        </div>
      </form>
    </div>
  );
}
