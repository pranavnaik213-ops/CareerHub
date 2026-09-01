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
  logo: string; // URL or icon identifier
  location: string;
  locationType: LocationType;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  category: string;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  skills: string[];
  benefits: string[];
  postedDate: string;
  status: JobStatus;
  applicantsCount: number;
  featured?: boolean;
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
