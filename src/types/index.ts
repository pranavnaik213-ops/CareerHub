export type UserRole = 'seeker' | 'recruiter';

export type JobType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship' | 'Freelance';

export type LocationType = 'Remote' | 'Hybrid' | 'On-site';

export type ExperienceLevel = 'Entry-level' | 'Mid-level' | 'Senior' | 'Lead / Executive';

export type JobStatus = 'Active' | 'Closed' | 'Draft';

export type ApplicationStatus = 'Submitted' | 'Under Review' | 'Interview Scheduled' | 'Offer Extended' | 'Rejected';

export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string; // URL or company identifier
  companyUrl?: string; // Real company website
  applyUrl?: string; // Real company careers page / direct job application URL
  location: string;
  locationType: LocationType;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  category: string;
  salaryMin: number; // in INR (₹)
  salaryMax: number; // in INR (₹)
  currency: string; // '₹' | '$'
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  postedDate: string;
  status: JobStatus;
  applicantsCount: number;
  featured?: boolean;
  isAgentIngested?: boolean; // Autonomously crawled and ingested by AI Agent
  agentVerifiedDate?: string;
  matchScore?: number; // AI match score calculated for candidate
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone: string;
  candidateHeadline: string;
  skills: string[];
  resumeName: string;
  coverLetter: string;
  appliedDate: string;
  status: ApplicationStatus;
  recruiterNotes?: string;
  interviewDate?: string;
  aiScreeningScore?: number; // 0 - 100 AI ATS match evaluation
  aiEvaluationNotes?: string;
  aiRecommendedStage?: ApplicationStatus;
  linkedInVerified?: boolean;
}

export interface CandidateProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  headline: string;
  bio: string;
  location: string;
  skills: string[];
  experienceYears: number;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  linkedInConnected?: boolean;
  linkedInVerified?: boolean;
  linkedInSyncDate?: string;
  resumeName: string;
  resumeLastUpdated: string;
  experience: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  education: {
    degree: string;
    school: string;
    year: string;
  }[];
}

export interface FilterState {
  query: string;
  category: string;
  locationType: LocationType | 'All';
  jobType: JobType | 'All';
  experienceLevel: ExperienceLevel | 'All';
  salaryMin: number;
}
