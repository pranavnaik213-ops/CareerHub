'use client';

import React, { useState } from 'react';
import { useJobContext } from '@/context/JobContext';
import { JobCard } from '@/components/JobCard';
import { JobDetailsModal } from '@/components/JobDetailsModal';
import { ApplyModal } from '@/components/ApplyModal';
import { CompanyLogo } from '@/components/CompanyLogo';
import { ApplicationStatus, Job } from '@/types';
import {
  User,
  FileText,
  Bookmark,
  CheckCircle2,
  Clock,
  Calendar,
  Building,
  MapPin,
  ExternalLink,
  Plus,
  Trash2,
  Save,
  Briefcase,
  AlertCircle
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const APPLICATION_STAGES: ApplicationStatus[] = [
  'Submitted',
  'Under Review',
  'Interview Scheduled',
  'Offer Extended'
];

export default function CandidateDashboard() {
  const {
    applications,
    jobs,
    candidateProfile,
    savedJobIds,
    updateCandidateProfile,
    showToast,
    role
  } = useJobContext();

  const [activeTab, setActiveTab] = useState<'applications' | 'saved' | 'profile'>('applications');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [applyJobModal, setApplyJobModal] = useState<Job | null>(null);

  // Profile Form State & Validation
  const [profileForm, setProfileForm] = useState(candidateProfile);
  const [newSkill, setNewSkill] = useState('');
  const [profileErrors, setProfileErrors] = useState<Record<string, string>>({});

  const savedJobs = jobs.filter((j) => savedJobIds.includes(j.id));
  const candidateApps = applications.filter((app) => app.candidateEmail === candidateProfile.email);

  const validateProfile = (): boolean => {
    const errs: Record<string, string> = {};

    if (!profileForm.name.trim() || profileForm.name.trim().length < 2) {
      errs.name = 'Full name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!profileForm.email.trim() || !emailRegex.test(profileForm.email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    const digitsOnly = profileForm.phone.replace(/\D/g, '');
    if (!profileForm.phone.trim() || digitsOnly.length < 7) {
      errs.phone = 'Please enter a valid phone number with area code.';
    }

    if (!profileForm.headline.trim()) {
      errs.headline = 'Please specify your professional headline.';
    }

    setProfileErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateProfile()) {
      showToast('Please fix the errors in your profile.', 'error');
      return;
    }

    updateCandidateProfile(profileForm);
    trackEvent('profile_updated', {
      name: profileForm.name,
      headline: profileForm.headline,
      skillsCount: profileForm.skills.length,
    });
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !profileForm.skills.includes(newSkill.trim())) {
      setProfileForm((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfileForm((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skillToRemove) }));
  };

  const getStageStep = (currentStatus: ApplicationStatus) => {
    if (currentStatus === 'Rejected') return -1;
    return APPLICATION_STAGES.indexOf(currentStatus);
  };

  return (
    <div className="space-y-8">
      
      {/* Dashboard Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg" aria-hidden="true">
            {candidateProfile.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">{candidateProfile.name}</h1>
            <p className="text-xs text-indigo-300 font-medium">{candidateProfile.headline}</p>
            <p className="text-xs text-slate-300 mt-1 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400" aria-hidden="true" />
              {candidateProfile.location}
            </p>
          </div>
        </div>

        {/* Tab Selection Navigation */}
        <div className="flex items-center bg-slate-950 p-1.5 rounded-2xl border border-slate-800 w-full sm:w-auto">
          <button
            onClick={() => setActiveTab('applications')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all min-h-[38px] ${
              activeTab === 'applications'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
            My Applications ({candidateApps.length})
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all min-h-[38px] ${
              activeTab === 'saved'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" aria-hidden="true" />
            Saved Jobs ({savedJobs.length})
          </button>

          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all min-h-[38px] ${
              activeTab === 'profile'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" aria-hidden="true" />
            Resume & Profile
          </button>
        </div>
      </div>

      {/* TAB 1: MY APPLICATIONS */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <h2 className="text-base font-bold text-slate-100">Application Pipeline Status</h2>
            <span className="text-xs text-slate-400">Total Applied: {candidateApps.length}</span>
          </div>

          {candidateApps.length === 0 ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
              <Clock className="w-10 h-10 text-slate-400 mx-auto" aria-hidden="true" />
              <h3 className="text-sm font-bold text-slate-200">No active job applications yet</h3>
              <p className="text-xs text-slate-400">Explore open positions on the home directory and submit your resume.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {candidateApps.map((app) => {
                const stepIdx = getStageStep(app.status);
                const isRejected = app.status === 'Rejected';

                return (
                  <div
                    key={app.id}
                    className="bento-card p-6 rounded-2xl space-y-6"
                  >
                    {/* App Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800/80">
                      <div className="flex items-center gap-3.5">
                        <CompanyLogo companyName={app.companyName} size="md" />
                        <div>
                          <h3 className="text-base font-bold text-white font-heading">{app.jobTitle}</h3>
                          <p className="text-xs font-semibold text-indigo-400">{app.companyName}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400">Applied on {app.appliedDate}</span>
                        <span
                          className={`px-3 py-1 rounded-xl text-xs font-bold border ${
                            isRejected
                              ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                              : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                          }`}
                        >
                          {app.status}
                        </span>
                      </div>
                    </div>

                    {/* Progress Timeline Steps */}
                    {!isRejected ? (
                      <div className="relative py-2">
                        <div className="grid grid-cols-4 gap-2">
                          {APPLICATION_STAGES.map((stageTitle, idx) => {
                            const isCompleted = stepIdx >= idx;
                            const isCurrent = stepIdx === idx;

                            return (
                              <div key={idx} className="flex flex-col items-center text-center space-y-2">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                                    isCompleted
                                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                                      : 'bg-slate-950 border-slate-800 text-slate-500'
                                  }`}
                                >
                                  {isCompleted ? <CheckCircle2 className="w-4 h-4" aria-hidden="true" /> : idx + 1}
                                </div>
                                <span
                                  className={`text-[11px] font-medium leading-tight ${
                                    isCurrent
                                      ? 'text-indigo-300 font-bold'
                                      : isCompleted
                                      ? 'text-slate-200'
                                      : 'text-slate-500'
                                  }`}
                                >
                                  {stageTitle}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-500/20 text-xs text-rose-300">
                        This application has been closed by the recruiter.
                      </div>
                    )}

                    {/* Recruiter Interview Details or Notes */}
                    {app.interviewDate && (
                      <div className="p-4 rounded-xl bg-violet-950/30 border border-violet-500/30 flex items-center gap-3">
                        <Calendar className="w-5 h-5 text-violet-400 flex-shrink-0" aria-hidden="true" />
                        <div>
                          <p className="text-xs font-bold text-violet-200">Interview Scheduled!</p>
                          <p className="text-xs text-violet-300">{app.interviewDate}</p>
                        </div>
                      </div>
                    )}

                    {app.recruiterNotes && (
                      <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1">
                        <span className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">Recruiter Feedback:</span>
                        <p className="text-slate-300 leading-relaxed">{app.recruiterNotes}</p>
                      </div>
                    )}

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: SAVED JOBS */}
      {activeTab === 'saved' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center pb-2 border-b border-slate-800">
            <h2 className="text-base font-bold text-slate-100">Bookmarked Job Postings</h2>
            <span className="text-xs text-slate-400">{savedJobs.length} Saved</span>
          </div>

          {savedJobs.length === 0 ? (
            <div className="bg-slate-900/40 border border-slate-800 rounded-3xl p-12 text-center space-y-3">
              <Bookmark className="w-10 h-10 text-slate-400 mx-auto" aria-hidden="true" />
              <h3 className="text-sm font-bold text-slate-200">No saved jobs yet</h3>
              <p className="text-xs text-slate-400">Click the bookmark icon on any job card to save it for later review.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedJobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                  onSelect={(j) => setSelectedJob(j)}
                  onApplyClick={(j) => setApplyJobModal(j)}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: RESUME & PROFILE EDITOR */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSaveProfile} noValidate className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-100">Candidate Profile & Resume</h2>
              <p className="text-xs text-slate-400">Keep your information up-to-date for fast 1-click job applications.</p>
            </div>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-600/25 hover:brightness-110 transition-all min-h-[40px] w-fit"
            >
              <Save className="w-4 h-4" aria-hidden="true" />
              Save Profile Changes
            </button>
          </div>

          {/* Basic Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="profile-name" className="block text-xs font-semibold text-slate-300 mb-2">Full Name *</label>
              <input
                id="profile-name"
                type="text"
                value={profileForm.name}
                onChange={(e) => {
                  setProfileForm({ ...profileForm, name: e.target.value });
                  if (profileErrors.name) setProfileErrors((prev) => ({ ...prev, name: '' }));
                }}
                className={`w-full bg-slate-950 border ${
                  profileErrors.name ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                } rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none`}
              />
              {profileErrors.name && <p className="text-[11px] text-rose-400 mt-1">{profileErrors.name}</p>}
            </div>

            <div>
              <label htmlFor="profile-email" className="block text-xs font-semibold text-slate-300 mb-2">Email Address *</label>
              <input
                id="profile-email"
                type="email"
                value={profileForm.email}
                onChange={(e) => {
                  setProfileForm({ ...profileForm, email: e.target.value });
                  if (profileErrors.email) setProfileErrors((prev) => ({ ...prev, email: '' }));
                }}
                className={`w-full bg-slate-950 border ${
                  profileErrors.email ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                } rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none`}
              />
              {profileErrors.email && <p className="text-[11px] text-rose-400 mt-1">{profileErrors.email}</p>}
            </div>

            <div>
              <label htmlFor="profile-phone" className="block text-xs font-semibold text-slate-300 mb-2">Phone Number *</label>
              <input
                id="profile-phone"
                type="tel"
                value={profileForm.phone}
                onChange={(e) => {
                  setProfileForm({ ...profileForm, phone: e.target.value });
                  if (profileErrors.phone) setProfileErrors((prev) => ({ ...prev, phone: '' }));
                }}
                className={`w-full bg-slate-950 border ${
                  profileErrors.phone ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                } rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none`}
              />
              {profileErrors.phone && <p className="text-[11px] text-rose-400 mt-1">{profileErrors.phone}</p>}
            </div>

            <div>
              <label htmlFor="profile-headline" className="block text-xs font-semibold text-slate-300 mb-2">Headline / Job Title *</label>
              <input
                id="profile-headline"
                type="text"
                value={profileForm.headline}
                onChange={(e) => {
                  setProfileForm({ ...profileForm, headline: e.target.value });
                  if (profileErrors.headline) setProfileErrors((prev) => ({ ...prev, headline: '' }));
                }}
                className={`w-full bg-slate-950 border ${
                  profileErrors.headline ? 'border-rose-500' : 'border-slate-800 focus:border-indigo-500'
                } rounded-xl px-4 py-2.5 text-xs text-slate-200 outline-none`}
              />
              {profileErrors.headline && <p className="text-[11px] text-rose-400 mt-1">{profileErrors.headline}</p>}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="profile-bio" className="block text-xs font-semibold text-slate-300 mb-2">Professional Summary</label>
            <textarea
              id="profile-bio"
              rows={3}
              value={profileForm.bio}
              onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-xs text-slate-200 leading-relaxed outline-none focus:border-indigo-500"
            />
          </div>

          {/* Skills Tag Editor */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Skills & Tech Stack</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a new skill (e.g. Next.js, Python)..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-slate-200 outline-none focus:border-indigo-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" aria-hidden="true" />
                Add Skill
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {profileForm.skills.map((skill, i) => (
                <span
                  key={i}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-slate-800 text-indigo-300 border border-slate-700"
                >
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-slate-400 hover:text-rose-400"
                    aria-label={`Remove skill ${skill}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Resume Upload Simulation */}
          <div className="p-6 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-400 border border-indigo-500/20" aria-hidden="true">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-200">{profileForm.resumeName}</p>
                <p className="text-[11px] text-slate-400">Last updated: {profileForm.resumeLastUpdated}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
              Resume Active
            </span>
          </div>

        </form>
      )}

      {/* Modals */}
      <JobDetailsModal
        job={selectedJob}
        onClose={() => setSelectedJob(null)}
        onApplyClick={(j) => setApplyJobModal(j)}
      />

      <ApplyModal
        job={applyJobModal}
        onClose={() => setApplyJobModal(null)}
      />

    </div>
  );
}
