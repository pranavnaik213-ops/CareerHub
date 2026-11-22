import { Job, CandidateProfile, Application, ApplicationStatus } from '@/types';
import { AI_AGENT_JOB_POOL } from '@/data/mockData';

/**
 * Autonomous AI Platform Agent Engine
 * Maintains platform accuracy, auto-matches jobs, evaluates candidates,
 * and auto-ingests verified real tech jobs into the board.
 */

// 1. Calculate matching score between candidate profile and a job
export function calculateJobMatch(job: Job, candidate: CandidateProfile): {
  score: number;
  matchingSkills: string[];
  missingSkills: string[];
  summary: string;
} {
  const candidateSkills = (candidate.skills || []).map((s) => s.toLowerCase());
  const jobSkills = (job.skills || []).map((s) => s.toLowerCase());

  const matching = job.skills.filter((s) => candidateSkills.includes(s.toLowerCase()));
  const missing = job.skills.filter((s) => !candidateSkills.includes(s.toLowerCase()));

  // Base score from skills overlap
  const skillRatio = jobSkills.length > 0 ? matching.length / jobSkills.length : 0.7;
  let score = Math.round(skillRatio * 75 + 20); // range 20 - 95

  // Experience level bonus
  if (candidate.experienceYears >= 4 && (job.experienceLevel === 'Senior' || job.experienceLevel === 'Mid-level')) {
    score = Math.min(99, score + 5);
  }

  let summary = '';
  if (score >= 85) {
    summary = `Exceptional fit (${score}%). Candidate possesses strong overlap in ${matching.slice(0, 3).join(', ')}.`;
  } else if (score >= 70) {
    summary = `Strong candidate (${score}%). Meets primary stack requirements. Missing: ${missing.slice(0, 2).join(', ')}.`;
  } else {
    summary = `Moderate match (${score}%). Consider upskilling in ${missing.slice(0, 2).join(', ')}.`;
  }

  return {
    score,
    matchingSkills: matching,
    missingSkills: missing,
    summary,
  };
}

// 2. AI Recruiter Automated Screening evaluation
export function generateAiScreening(job: Job, candidateOrApp: { skills?: string[] }): {
  score: number;
  notes: string;
  recommendedStage: ApplicationStatus;
} {
  const jobSkills = (job.skills || []).map((s) => s.toLowerCase());
  const appSkills = (candidateOrApp.skills || []).map((s) => s.toLowerCase());

  const matchCount = jobSkills.filter((s) => appSkills.includes(s)).length;
  const matchPercent = Math.min(98, Math.round((matchCount / Math.max(1, jobSkills.length)) * 70 + 25));

  let recommendedStage: ApplicationStatus = 'Under Review';
  let notes = '';

  if (matchPercent >= 88) {
    recommendedStage = 'Interview Scheduled';
    notes = `AI Screen: High-priority candidate (${matchPercent}%). Verified skills match in ${job.skills.slice(0, 3).join(', ')}. Automated suggestion: Advance to Technical Interview.`;
  } else if (matchPercent >= 65) {
    recommendedStage = 'Under Review';
    notes = `AI Screen: Solid candidate (${matchPercent}%). Meets core competencies. Recommend human recruiter review of portfolio and project links.`;
  } else {
    recommendedStage = 'Under Review';
    notes = `AI Screen: Moderate alignment (${matchPercent}%). Gaps detected in key qualifications.`;
  }

  return {
    score: matchPercent,
    notes,
    recommendedStage,
  };
}

// 3. Autonomous Job Ingestion Engine: Fetch next real tech opening from pool
export function fetchNextAgentJob(existingJobs: Job[]): Job | null {
  const existingTitles = existingJobs.map((j) => `${j.company}-${j.title}`);
  
  const candidateOpening = AI_AGENT_JOB_POOL.find((item) => {
    return !existingTitles.includes(`${item.company}-${item.title}`);
  });

  if (!candidateOpening) return null;

  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];

  return {
    ...candidateOpening,
    id: `job-agent-${Date.now()}`,
    postedDate: dateStr,
    applicantsCount: Math.floor(Math.random() * 12) + 3,
    status: 'Active',
    isAgentIngested: true,
    agentVerifiedDate: 'Auto-ingested just now by AI Agent',
  };
}

// 4. Generate AI Tailored Cover Letter
export function generateTailoredCoverLetter(job: Job, candidate: CandidateProfile): string {
  const topSkills = candidate.skills.slice(0, 3).join(', ');
  return `Dear Hiring Team at ${job.company},\n\nI am thrilled to submit my application for the ${job.title} position in ${job.location}.\n\nWith over ${candidate.experienceYears} years of engineering experience specializing in ${topSkills}, I have delivered high-throughput web systems, resilient cloud microservices, and accessible user interfaces. I have long admired ${job.company}'s engineering culture and would be excited to contribute directly to your team's technical milestones.\n\nYou can review my verified open-source work and full repository portfolio at ${candidate.githubUrl || 'https://github.com/pranavnaik213-ops'}.\n\nThank you for considering my candidacy.\n\nWarm regards,\n${candidate.name}\n${candidate.email} | ${candidate.phone}`;
}
