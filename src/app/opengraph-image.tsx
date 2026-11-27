import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'CareerHub - Next-Gen Tech Recruitment & Job Board';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          backgroundColor: '#090d16',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Brand Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: '#2563eb',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 10,
                backgroundColor: '#090d16',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#60a5fa',
                fontSize: 26,
              }}
            >
              💼
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.02em',
              }}
            >
              CareerHub
            </span>
            <span style={{ fontSize: 14, color: '#94a3b8', fontWeight: 600 }}>
              Next-Gen Tech Recruitment Platform
            </span>
          </div>
        </div>

        {/* Main Value Proposition Title */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 900 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 16px',
              borderRadius: 9999,
              backgroundColor: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: '#c7d2fe',
              fontSize: 16,
              fontWeight: 700,
              width: 'auto',
            }}
          >
            ✨ Over 1,200+ Verified Hiring Companies
          </div>
          <h1
            style={{
              fontSize: 60,
              fontWeight: 900,
              color: '#ffffff',
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: '-0.03em',
            }}
          >
            Find Your Dream Career or Hire Top Tech Talent
          </h1>
          <p
            style={{
              fontSize: 24,
              color: '#cbd5e1',
              margin: 0,
              lineHeight: 1.4,
            }}
          >
            Centralized candidate ATS pipelines, verified engineering listings, and direct recruiter messaging.
          </p>
        </div>

        {/* Footer Feature Badges */}
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              borderRadius: 14,
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              color: '#f8fafc',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            🎯 ATS Kanban Tracking
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              borderRadius: 14,
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              color: '#f8fafc',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            🛡️ 100% Verified Openings
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 20px',
              borderRadius: 14,
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
              color: '#34d399',
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            ⚡ Fast 48h Response Time
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
