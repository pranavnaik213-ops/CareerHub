import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Post a New Job Opening',
  description: 'Create and publish a verified tech job posting to reach thousands of experienced software engineers, designers, and tech professionals.',
  alternates: {
    canonical: '/recruiter/post-job',
  },
};

export default function PostJobLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
