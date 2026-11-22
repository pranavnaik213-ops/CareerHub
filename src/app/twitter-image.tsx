import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';
export const alt = 'CareerHub Twitter Card';
export const size = {
  width: 1200,
  height: 600,
};
export const contentType = 'image/png';

export default async function TwitterImage() {
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
          padding: '60px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              background: 'linear-gradient(135deg, #6366f1, #10b981)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
            }}
          >
            💼
          </div>
          <span style={{ fontSize: 28, fontWeight: 800, color: '#ffffff' }}>
            CareerHub
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <h1 style={{ fontSize: 52, fontWeight: 900, color: '#ffffff', margin: 0 }}>
            Find Your Next High-Impact Tech Role
          </h1>
          <p style={{ fontSize: 22, color: '#94a3b8', margin: 0 }}>
            Remote & Hybrid Software Engineering, Design, AI, and Product positions.
          </p>
        </div>

        <div style={{ fontSize: 16, color: '#818cf8', fontWeight: 700 }}>
          careerhub.example.com
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
