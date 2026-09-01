import type { Metadata } from 'next';
import './globals.css';
import { JobProvider } from '../context/JobContext';
import { Navbar } from '../components/Navbar';
import { ToastContainer } from '../components/Toast';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: 'CareerHub | Modern Recruitment & Job Platform',
  description: 'Connecting top candidates and companies with job listings, ATS candidate pipelines, and interactive recruitment dashboards.',
  keywords: ['Jobs', 'Careers', 'Recruitment', 'ATS', 'Next.js', 'Job Portal', 'Hire Talent'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090d16] text-slate-100 min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white antialiased">
        <JobProvider>
          <Navbar />
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
          <Footer />
          <ToastContainer />
        </JobProvider>
      </body>
    </html>
  );
}
