'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Job, Application, CandidateProfile, FilterState, UserRole, ApplicationStatus, JobStatus } from '@/types';
import { INITIAL_JOBS, INITIAL_CANDIDATE, INITIAL_APPLICATIONS } from '@/data/mockData';
import { generateAiScreening } from '@/lib/aiAgent';

interface ToastState {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface JobContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  jobs: Job[];
  applications: Application[];
  candidateProfile: CandidateProfile;
  savedJobIds: string[];
  filters: FilterState;
  toasts: ToastState[];
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  applyForJob: (jobId: string, coverLetter: string, customResumeName?: string) => boolean;
  toggleSaveJob: (jobId: string) => void;
  postJob: (jobData: Omit<Job, 'id' | 'postedDate' | 'applicantsCount' | 'status'>) => void;
  updateJobStatus: (jobId: string, status: JobStatus) => void;
  deleteJob: (jobId: string) => void;
  updateApplicationStatus: (appId: string, newStatus: ApplicationStatus, notes?: string, interviewDate?: string) => void;
  updateCandidateProfile: (updated: Partial<CandidateProfile>) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: number) => void;
  filteredJobs: Job[];
}

const DEFAULT_FILTERS: FilterState = {
  query: '',
  category: 'All',
  locationType: 'All',
  jobType: 'All',
  experienceLevel: 'All',
  salaryMin: 0
};

const JobContext = createContext<JobContextType | undefined>(undefined);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>('seeker');
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [candidateProfile, setCandidateProfile] = useState<CandidateProfile>(INITIAL_CANDIDATE);
  const [savedJobIds, setSavedJobIds] = useState<string[]>(['job-1', 'job-3']);
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [toasts, setToasts] = useState<ToastState[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on initial render
  useEffect(() => {
    try {
      // 1. Purge legacy demo/fake localStorage data if present
      localStorage.removeItem('careerhub_jobs');
      localStorage.removeItem('careerhub_applications');
      localStorage.removeItem('careerhub_profile');
      localStorage.removeItem('careerhub_saved_jobs');

      const savedRole = localStorage.getItem('careerhub_role');
      if (savedRole === 'seeker' || savedRole === 'recruiter') setRoleState(savedRole);

      // 2. Load verified real INR tech jobs
      const savedJobs = localStorage.getItem('careerhub_real_inr_jobs_v1');
      if (savedJobs) {
        const parsed: Job[] = JSON.parse(savedJobs);
        const hasLegacyFakeJobs = parsed.some(
          (j) =>
            j.currency === '$' ||
            ['Vortex Tech', 'Lumina Design Lab', 'Cognitive AI', 'Pulse Digital', 'Quantum', 'Nexus'].includes(j.company) ||
            j.salaryMax < 1000000
        );
        if (!hasLegacyFakeJobs && parsed.length > 0) {
          setJobs(parsed);
        } else {
          setJobs(INITIAL_JOBS);
          localStorage.setItem('careerhub_real_inr_jobs_v1', JSON.stringify(INITIAL_JOBS));
        }
      } else {
        setJobs(INITIAL_JOBS);
      }

      // 3. Load verified applications
      const savedApps = localStorage.getItem('careerhub_real_inr_apps_v1');
      if (savedApps) {
        const parsedApps: Application[] = JSON.parse(savedApps);
        const hasLegacyFakeApps = parsedApps.some((a) =>
          ['Vortex Tech', 'Lumina Design Lab', 'Cognitive AI', 'Pulse Digital'].includes(a.companyName)
        );
        if (!hasLegacyFakeApps && parsedApps.length > 0) {
          setApplications(parsedApps);
        } else {
          setApplications(INITIAL_APPLICATIONS);
          localStorage.setItem('careerhub_real_inr_apps_v1', JSON.stringify(INITIAL_APPLICATIONS));
        }
      } else {
        setApplications(INITIAL_APPLICATIONS);
      }

      const savedProfile = localStorage.getItem('careerhub_real_inr_profile_v1');
      if (savedProfile) setCandidateProfile(JSON.parse(savedProfile));

      const savedBookmarks = localStorage.getItem('careerhub_real_inr_saved_v1');
      if (savedBookmarks) setSavedJobIds(JSON.parse(savedBookmarks));
    } catch (e) {
      console.error('Error loading data from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when state updates
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem('careerhub_role', role);
      localStorage.setItem('careerhub_real_inr_jobs_v1', JSON.stringify(jobs));
      localStorage.setItem('careerhub_real_inr_apps_v1', JSON.stringify(applications));
      localStorage.setItem('careerhub_real_inr_profile_v1', JSON.stringify(candidateProfile));
      localStorage.setItem('careerhub_real_inr_saved_v1', JSON.stringify(savedJobIds));
    } catch (e) {
      console.error('Error saving data to localStorage', e);
    }
  }, [role, jobs, applications, candidateProfile, savedJobIds, isLoaded]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    showToast(`Switched to ${newRole === 'seeker' ? 'Job Seeker' : 'Recruiter / Employer'} Portal`, 'info');
  };

  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
  };

  const toggleSaveJob = (jobId: string) => {
    const isAlreadySaved = savedJobIds.includes(jobId);
    if (isAlreadySaved) {
      setSavedJobIds((prev) => prev.filter((id) => id !== jobId));
      showToast('Removed job from your saved list', 'info');
    } else {
      setSavedJobIds((prev) => [...prev, jobId]);
      showToast('Saved job to your bookmarks', 'success');
    }
  };

  const applyForJob = (jobId: string, coverLetter: string, customResumeName?: string): boolean => {
    const targetJob = jobs.find((j) => j.id === jobId);
    if (!targetJob) return false;

    // Check if already applied
    const alreadyApplied = applications.some((app) => app.jobId === jobId && app.candidateEmail === candidateProfile.email);
    if (alreadyApplied) {
      showToast('You have already submitted an application for this position.', 'error');
      return false;
    }

    const screening = generateAiScreening(targetJob, { skills: candidateProfile.skills });

    const newApp: Application = {
      id: `app-${Date.now()}`,
      jobId,
      jobTitle: targetJob.title,
      companyName: targetJob.company,
      candidateName: candidateProfile.name,
      candidateEmail: candidateProfile.email,
      candidatePhone: candidateProfile.phone,
      candidateHeadline: candidateProfile.headline,
      skills: candidateProfile.skills,
      resumeName: customResumeName || candidateProfile.resumeName,
      coverLetter,
      appliedDate: new Date().toISOString().split('T')[0],
      status: 'Submitted',
      linkedInVerified: Boolean(candidateProfile.linkedInVerified),
      aiScreeningScore: screening.score,
      aiEvaluationNotes: screening.notes,
      aiRecommendedStage: screening.recommendedStage,
    };

    setApplications((prev) => [newApp, ...prev]);

    // Increment applicants count
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j))
    );

    showToast(`Successfully applied to ${targetJob.company} for ${targetJob.title}!`, 'success');
    return true;
  };

  const postJob = (jobData: Omit<Job, 'id' | 'postedDate' | 'applicantsCount' | 'status'>) => {
    const newJob: Job = {
      ...jobData,
      id: `job-${Date.now()}`,
      postedDate: new Date().toISOString().split('T')[0],
      applicantsCount: 0,
      currency: jobData.currency || '₹',
      status: 'Active'
    };

    setJobs((prev) => [newJob, ...prev]);
    showToast(`Published new job posting: ${newJob.title}`, 'success');
  };

  const updateJobStatus = (jobId: string, status: JobStatus) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status } : j)));
    showToast(`Job status updated to ${status}`, 'info');
  };

  const deleteJob = (jobId: string) => {
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
    setApplications((prev) => prev.filter((app) => app.jobId !== jobId));
    showToast('Job listing and related applications removed.', 'info');
  };

  const updateApplicationStatus = (
    appId: string,
    newStatus: ApplicationStatus,
    notes?: string,
    interviewDate?: string
  ) => {
    setApplications((prev) =>
      prev.map((app) => {
        if (app.id === appId) {
          return {
            ...app,
            status: newStatus,
            recruiterNotes: notes !== undefined ? notes : app.recruiterNotes,
            interviewDate: interviewDate !== undefined ? interviewDate : app.interviewDate
          };
        }
        return app;
      })
    );
    showToast(`Applicant status updated to: ${newStatus}`, 'success');
  };

  const updateCandidateProfile = (updated: Partial<CandidateProfile>) => {
    setCandidateProfile((prev) => ({ ...prev, ...updated }));
    showToast('Profile details updated successfully', 'success');
  };

  // Filtered jobs evaluation
  const filteredJobs = jobs.filter((job) => {
    // Only show active jobs to candidates (recruiter can see draft/closed in dashboard)
    if (role === 'seeker' && job.status !== 'Active') return false;

    // Keyword query filter (title, company, skills, description)
    if (filters.query.trim()) {
      const q = filters.query.toLowerCase();
      const matchTitle = job.title.toLowerCase().includes(q);
      const matchCompany = job.company.toLowerCase().includes(q);
      const matchLocation = job.location.toLowerCase().includes(q);
      const matchSkills = job.skills.some((s) => s.toLowerCase().includes(q));
      const matchCategory = job.category.toLowerCase().includes(q);
      if (!matchTitle && !matchCompany && !matchLocation && !matchSkills && !matchCategory) {
        return false;
      }
    }

    // Category
    if (filters.category !== 'All' && job.category !== filters.category) return false;

    // Location Type
    if (filters.locationType !== 'All' && job.locationType !== filters.locationType) return false;

    // Job Type
    if (filters.jobType !== 'All' && job.jobType !== filters.jobType) return false;

    // Experience Level
    if (filters.experienceLevel !== 'All' && job.experienceLevel !== filters.experienceLevel) return false;

    // Minimum Salary filter
    if (filters.salaryMin > 0 && job.salaryMax < filters.salaryMin) return false;

    return true;
  });

  return (
    <JobContext.Provider
      value={{
        role,
        setRole,
        jobs,
        applications,
        candidateProfile,
        savedJobIds,
        filters,
        toasts,
        setFilters,
        resetFilters,
        applyForJob,
        toggleSaveJob,
        postJob,
        updateJobStatus,
        deleteJob,
        updateApplicationStatus,
        updateCandidateProfile,
        showToast,
        removeToast,
        filteredJobs
      }}
    >
      {children}
    </JobContext.Provider>
  );
};

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobContext must be used within a JobProvider');
  }
  return context;
};
