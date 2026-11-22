import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ATS Candidate Pipeline & Metrics',
  description: 'Manage candidate job applications across hiring stages, review resumes, leave evaluation notes, and schedule candidate interviews.',
  alternates: {
    canonical: '/recruiter/dashboard',
  },
};

export default function RecruiterDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
