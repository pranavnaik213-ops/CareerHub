import type { Metadata, Viewport } from 'next';
import './globals.css';
import { JobProvider } from '../context/JobContext';
import { Navbar } from '../components/Navbar';
import { ToastContainer } from '../components/Toast';
import { Footer } from '../components/Footer';
import { CookieConsent } from '../components/CookieConsent';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://careerhub.example.com';

export const viewport: Viewport = {
  themeColor: '#090d16',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'CareerHub | Modern Tech Recruitment & Job Platform',
    template: '%s | CareerHub',
  },
  description:
    'Find high-impact tech jobs or streamline your hiring process. Centralized ATS candidate tracking, verified software engineering listings, and smart job matching.',
  keywords: [
    'Tech Jobs',
    'Software Engineer Careers',
    'Recruitment Platform',
    'ATS Candidate Pipeline',
    'Remote Developer Jobs',
    'Hire Tech Talent',
    'Full Stack Jobs',
    'Frontend Developer',
    'Next.js Jobs',
  ],
  authors: [{ name: 'CareerHub Engineering Team', url: siteUrl }],
  creator: 'CareerHub',
  publisher: 'CareerHub Inc.',
  applicationName: 'CareerHub',
  category: 'Recruitment & Employment',
  manifest: '/site.webmanifest',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'CareerHub',
    title: 'CareerHub | Modern Tech Recruitment & Job Platform',
    description:
      'Connecting top engineering candidates and companies with real-time job listings, ATS candidate pipelines, and fast recruiter workflows.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CareerHub | Modern Tech Recruitment & Job Platform',
    description:
      'Explore verified tech openings or post positions to reach top software engineers and designers.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        {/* Preconnect to speed up font and image rendering */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#090d16] text-slate-100 min-h-screen flex flex-col selection:bg-indigo-500 selection:text-white antialiased">
        <JobProvider>
          {/* Skip link for accessibility / keyboard navigation */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-indigo-600 focus:text-white focus:top-2 focus:left-2 focus:rounded-xl"
          >
            Skip to main content
          </a>

          <Navbar />

          <main id="main-content" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>

          <Footer />
          <ToastContainer />
          <CookieConsent />
        </JobProvider>
      </body>
    </html>
  );
}
