'use client';

import React, { useState } from 'react';
import { useJobContext } from '@/context/JobContext';
import { useRouter } from 'next/navigation';
import { LocationType, JobType, ExperienceLevel } from '@/types';
import { Briefcase, Building, MapPin, DollarSign, Plus, X, ArrowLeft, Send, Sparkles } from 'lucide-react';

const LOGO_ICONS = ['⚡', '🚀', '✨', '🧠', '🛡️', '🌐', '💼', '🎯', '🔥', '💎'];

export default function PostJobPage() {
  const { postJob, setRole } = useJobContext();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('CareerHub Recruiting Partner');
  const [logo, setLogo] = useState('⚡');
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
    'Collaborate across cross-functional engineering and design teams.'
  ]);
  const [newResp, setNewResp] = useState('');

  const [requirements, setRequirements] = useState<string[]>([
    '3+ years of experience with web development technologies.',
    'Strong communication skills and collaborative mindset.'
  ]);
  const [newReq, setNewReq] = useState('');

  const [skills, setSkills] = useState<string[]>(['TypeScript', 'React', 'Next.js', 'Node.js']);
  const [newSkill, setNewSkill] = useState('');

  const [benefits, setBenefits] = useState<string[]>([
    'Unlimited PTO',
    'Full Health Insurance',
    'Learning & Development Stipend'
  ]);
  const [newBen, setNewBen] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !company.trim() || !description.trim()) return;

    postJob({
      title,
      company,
      logo,
      location,
      locationType,
      jobType,
      experienceLevel,
      category,
      salaryMin: Number(salaryMin),
      salaryMax: Number(salaryMax),
      currency: '$',
      description,
      responsibilities,
      requirements,
      skills,
      benefits,
      featured
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
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="bg-slate-900/60 border border-slate-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl space-y-8">
        
        <div className="pb-6 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Publish New Job Listing</h1>
            <p className="text-xs text-slate-400 mt-1">Fill out the job parameters to broadcast your opening to top candidates.</p>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Active Recruiter Session
          </span>
        </div>

        {/* Basic Info */}
        <div className="space-y-6">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-400">Position Basics</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-300 mb-2">Job Title *</label>
              <input
                type="text"
                required
                placeholder="e.g. Senior Frontend Engineer (React & TypeScript)"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 focus:border-indigo-500 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Company Name *</label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Company Avatar Icon</label>
              <div className="flex flex-wrap gap-2">
                {LOGO_ICONS.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setLogo(icon)}
                    className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center border transition-all ${
                      logo === icon
                        ? 'bg-indigo-600/30 border-indigo-500 text-white shadow-md'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Location & Setup */}
        <div className="space-y-6 pt-4 border-t border-slate-800/80">
          <h2 className="text-xs font-bold uppercase tracking-wider text-violet-400">Work Environment & Salary</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Location Name</label>
              <input
                type="text"
                required
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. San Francisco, CA or Remote"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Location Type</label>
              <select
                value={locationType}
                onChange={(e) => setLocationType(e.target.value as LocationType)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100"
              >
                <option value="Remote">Remote</option>
                <option value="Hybrid">Hybrid</option>
                <option value="On-site">On-site</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Employment Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value as JobType)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Freelance">Freelance</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100"
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
              <label className="block text-xs font-semibold text-slate-300 mb-2">Min Salary (USD / yr)</label>
              <input
                type="number"
                step="5000"
                value={salaryMin}
                onChange={(e) => setSalaryMin(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">Max Salary (USD / yr)</label>
              <input
                type="number"
                step="5000"
                value={salaryMax}
                onChange={(e) => setSalaryMax(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100"
              />
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        <div className="space-y-6 pt-4 border-t border-slate-800/80">
          <h2 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Role Description & Skills</h2>
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Overview / Description *</label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the role responsibilities, team culture, and objectives..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-100 leading-relaxed outline-none focus:border-indigo-500"
            />
          </div>

          {/* Skills Adder */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Required Skills</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add skill tag (e.g. Next.js, AWS)..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-100"
              />
              <button
                type="button"
                onClick={() => {
                  if (newSkill.trim() && !skills.includes(newSkill.trim())) {
                    setSkills([...skills, newSkill.trim()]);
                    setNewSkill('');
                  }
                }}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold"
              >
                Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {skills.map((s, i) => (
                <span key={i} className="px-3 py-1 rounded-xl text-xs bg-slate-800 text-indigo-300 flex items-center gap-1.5">
                  {s}
                  <button type="button" onClick={() => setSkills(skills.filter((sk) => sk !== s))} className="text-slate-400 hover:text-rose-400">
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Featured toggle & Submit CTA */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between">
          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="accent-indigo-500 rounded"
            />
            <span>Highlight as Featured Job Listing</span>
          </label>

          <button
            type="submit"
            className="flex items-center gap-2 px-8 py-3 rounded-2xl text-xs font-bold bg-gradient-to-r from-emerald-500 via-teal-600 to-indigo-600 text-white shadow-xl shadow-emerald-500/20 hover:brightness-110 transition-all"
          >
            <Send className="w-4 h-4" />
            Publish Job Listing
          </button>
        </div>

      </form>

    </div>
  );
}
