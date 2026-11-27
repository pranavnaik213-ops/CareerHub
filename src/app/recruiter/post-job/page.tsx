'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useJobContext } from '@/context/JobContext';
import { useRouter } from 'next/navigation';
import { LocationType, JobType, ExperienceLevel } from '@/types';
import {
  ArrowLeft,
  Send,
  Zap,
  Cpu,
  ShieldCheck,
  Layers,
  Globe,
  Building2,
  Flame,
  Code2,
  Gem,
  X
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const BRAND_ICONS = [
  { id: 'zap', name: 'Fast Energy', Icon: Zap },
  { id: 'code', name: 'Engineering', Icon: Code2 },
  { id: 'cpu', name: 'AI & Data', Icon: Cpu },
  { id: 'shield', name: 'Security', Icon: ShieldCheck },
  { id: 'layers', name: 'Full Stack', Icon: Layers },
  { id: 'globe', name: 'Distributed', Icon: Globe },
  { id: 'building', name: 'Enterprise', Icon: Building2 },
  { id: 'flame', name: 'High Growth', Icon: Flame },
  { id: 'gem', name: 'Premium Tier', Icon: Gem },
];

export default function PostJobPage() {
  const { postJob, setRole, showToast } = useJobContext();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('CareerHub Recruiting Partner');
  const [selectedIconId, setSelectedIconId] = useState('zap');
  const [location, setLocation] = useState('Remote (India & Global)');
  const [locationType, setLocationType] = useState<LocationType>('Remote');
  const [jobType, setJobType] = useState<JobType>('Full-time');
  const [experienceLevel] = useState<ExperienceLevel>('Senior');
  const [category, setCategory] = useState('Engineering');
  const [salaryMin, setSalaryMin] = useState(3500000);
  const [salaryMax, setSalaryMax] = useState(6000000);
  const [description, setDescription] = useState('');
  const [featured, setFeatured] = useState(true);

  // Dynamic Lists
  const [responsibilities] = useState<string[]>([
    'Architect and implement scalable feature modules.',
    'Participate in code reviews and architectural discussions.',
    'Collaborate across cross-functional engineering and design squads.',
  ]);

  const [requirements] = useState<string[]>([
    '3+ years of experience with modern high-scale distributed systems.',
    'Strong communication skills and collaborative mindset.',
  ]);

  const [skills, setSkills] = useState<string[]>(['TypeScript', 'React', 'Next.js', 'Node.js']);
  const [newSkill, setNewSkill] = useState('');

  const [benefits] = useState<string[]>([
    'Competitive Base + Annual RSUs',
    'Comprehensive Family Health Insurance',
    'Annual Learning & Development Budget',
  ]);

  // Form Validation & Errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Spam / Bot Protection
  const [honeypotField, setHoneypotField] = useState('');
  const pageLoadedTimestamp = useRef<number>(0);
  const lastSubmitTimestamp = useRef<number>(0);

  useEffect(() => {
    pageLoadedTimestamp.current = Date.now();
  }, []);

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

    if (salaryMin < 300000) {
      errs.salaryMin = 'Minimum salary must be at least ₹3,00,000 (₹3 LPA).';
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
      showToast('Automated listing rejected.', 'error');
      return;
    }

    // Speed check (at least 1.5 seconds)
    if (pageLoadedTimestamp.current > 0 && Date.now() - pageLoadedTimestamp.current < 1500) {
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
      currency: '₹',
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
        className="bg-[#11141c] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6"
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
            <h1 className="text-2xl font-bold text-white tracking-tight font-heading">Publish Job Opening</h1>
            <p className="text-xs text-slate-400 mt-1">Broadcast an engineering position to verified software developers.</p>
          </div>
          <span className="px-3 py-1 rounded-md text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 w-fit">
            Active Recruiter Session
          </span>
        </div>

        {/* Basic Info */}
        <div className="space-y-6">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Position Basics</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label htmlFor="job-title-input" className="block text-xs font-semibold text-slate-300 mb-2">Job Title *</label>
              <input
                id="job-title-input"
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  if (errors.title) setErrors((prev) => ({ ...prev, title: '' }));
                }}
                placeholder="e.g. Senior Backend Engineer (Distributed Systems)"
                className={`w-full bg-slate-950 border rounded-lg px-4 py-2.5 text-xs text-slate-100 outline-none transition-colors ${
                  errors.title ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                }`}
              />
              {errors.title && <p className="text-[11px] text-rose-400 mt-1.5">{errors.title}</p>}
            </div>

            <div>
              <label htmlFor="job-company-input" className="block text-xs font-semibold text-slate-300 mb-2">Hiring Entity / Company *</label>
              <input
                id="job-company-input"
                type="text"
                value={company}
                onChange={(e) => {
                  setCompany(e.target.value);
                  if (errors.company) setErrors((prev) => ({ ...prev, company: '' }));
                }}
                className={`w-full bg-slate-950 border rounded-lg px-4 py-2.5 text-xs text-slate-100 outline-none transition-colors ${
                  errors.company ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                }`}
              />
              {errors.company && <p className="text-[11px] text-rose-400 mt-1.5">{errors.company}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Badge Symbol</label>
              <div className="flex flex-wrap gap-2">
                {BRAND_ICONS.map((brand) => {
                  const IconComp = brand.Icon;
                  const isSelected = selectedIconId === brand.id;
                  return (
                    <button
                      key={brand.id}
                      type="button"
                      onClick={() => setSelectedIconId(brand.id)}
                      className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                        isSelected
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                      }`}
                      title={brand.name}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline text-[11px]">{brand.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Work Environment & Salary */}
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Work Setup & Compensation (INR)</h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label htmlFor="job-location-input" className="block text-xs font-semibold text-slate-300 mb-2">Location String *</label>
              <input
                id="job-location-input"
                type="text"
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  if (errors.location) setErrors((prev) => ({ ...prev, location: '' }));
                }}
                className={`w-full bg-slate-950 border rounded-lg px-4 py-2.5 text-xs text-slate-100 outline-none transition-colors ${
                  errors.location ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                }`}
              />
              {errors.location && <p className="text-[11px] text-rose-400 mt-1.5">{errors.location}</p>}
            </div>

            <div>
              <label htmlFor="job-location-type" className="block text-xs font-semibold text-slate-300 mb-2">Work Setup</label>
              <select
                id="job-location-type"
                value={locationType}
                onChange={(e) => setLocationType(e.target.value as LocationType)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-2.5 text-xs text-slate-100 outline-none"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label htmlFor="job-type-select" className="block text-xs font-semibold text-slate-300 mb-2">Contract Type</label>
              <select
                id="job-type-select"
                value={jobType}
                onChange={(e) => setJobType(e.target.value as JobType)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-2.5 text-xs text-slate-100 outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            <div>
              <label htmlFor="job-category-select" className="block text-xs font-semibold text-slate-300 mb-2">Category</label>
              <select
                id="job-category-select"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-2.5 text-xs text-slate-100 outline-none"
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Data & AI">Data & AI</option>
                <option value="Infrastructure">Infrastructure</option>
              </select>
            </div>

            <div>
              <label htmlFor="job-salary-min" className="block text-xs font-semibold text-slate-300 mb-2">Min CTC (INR / year)</label>
              <input
                id="job-salary-min"
                type="number"
                step="100000"
                value={salaryMin}
                onChange={(e) => {
                  setSalaryMin(Number(e.target.value));
                  if (errors.salaryMin) setErrors((prev) => ({ ...prev, salaryMin: '' }));
                }}
                className={`w-full bg-slate-950 border rounded-lg px-4 py-2.5 text-xs text-slate-100 outline-none transition-colors font-mono ${
                  errors.salaryMin ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                }`}
              />
              {errors.salaryMin && <p className="text-[11px] text-rose-400 mt-1.5">{errors.salaryMin}</p>}
            </div>

            <div>
              <label htmlFor="job-salary-max" className="block text-xs font-semibold text-slate-300 mb-2">Max CTC (INR / year)</label>
              <input
                id="job-salary-max"
                type="number"
                step="100000"
                value={salaryMax}
                onChange={(e) => {
                  setSalaryMax(Number(e.target.value));
                  if (errors.salaryMax) setErrors((prev) => ({ ...prev, salaryMax: '' }));
                }}
                className={`w-full bg-slate-950 border rounded-lg px-4 py-2.5 text-xs text-slate-100 outline-none transition-colors font-mono ${
                  errors.salaryMax ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
                }`}
              />
              {errors.salaryMax && <p className="text-[11px] text-rose-400 mt-1.5">{errors.salaryMax}</p>}
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-6 pt-6 border-t border-slate-800">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-300">Description & Required Skills</h2>

          <div>
            <label htmlFor="job-desc-textarea" className="block text-xs font-semibold text-slate-300 mb-2">Job Overview & Impact *</label>
            <textarea
              id="job-desc-textarea"
              rows={4}
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                if (errors.description) setErrors((prev) => ({ ...prev, description: '' }));
              }}
              placeholder="Outline role objectives, high-throughput systems worked on, and team impact..."
              className={`w-full bg-slate-950 border rounded-lg p-4 text-xs text-slate-100 outline-none transition-colors ${
                errors.description ? 'border-rose-500' : 'border-slate-800 focus:border-blue-500'
              }`}
            />
            {errors.description && <p className="text-[11px] text-rose-400 mt-1.5">{errors.description}</p>}
          </div>

          <div>
            <label htmlFor="job-skill-input" className="block text-xs font-semibold text-slate-300 mb-2">Skill Badges *</label>
            <div className="flex gap-2 mb-2">
              <input
                id="job-skill-input"
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Type a skill and press Enter..."
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-lg px-4 py-2 text-xs text-slate-100 outline-none"
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
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
              >
                Add Skill
              </button>
            </div>
            {errors.skills && <p className="text-[11px] text-rose-400 mb-2">{errors.skills}</p>}
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="px-2.5 py-1 rounded-md text-xs bg-slate-900 text-slate-200 flex items-center gap-1.5 border border-slate-800">
                  {s}
                  <button
                    type="button"
                    onClick={() => setSkills(skills.filter((sk) => sk !== s))}
                    className="text-slate-400 hover:text-rose-400"
                    aria-label={`Remove skill ${s}`}
                  >
                    <X className="w-3 h-3" />
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
              className="accent-blue-600 h-4 w-4 rounded cursor-pointer"
            />
            <span>Highlight as Featured Opening</span>
          </label>

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors min-h-[40px]"
          >
            <Send className="w-4 h-4" aria-hidden="true" />
            Publish Job Listing
          </button>
        </div>
      </form>
    </div>
  );
}
