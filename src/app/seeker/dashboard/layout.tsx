import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Candidate Applications & Saved Jobs',
  description: 'Track the status of your submitted job applications, manage saved bookmarked jobs, and customize your candidate resume profile.',
  alternates: {
    canonical: '/seeker/dashboard',
  },
};

export default function SeekerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
