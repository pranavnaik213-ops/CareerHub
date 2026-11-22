'use client';

import React from 'react';
import { Building2 } from 'lucide-react';

interface CompanyLogoProps {
  company?: string;
  companyName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const CompanyLogo: React.FC<CompanyLogoProps> = ({ company, companyName, size = 'md', className = '' }) => {
  const name = company || companyName || 'Company';
  const lowerName = name.toLowerCase();

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg text-xs',
    md: 'w-11 h-11 rounded-xl text-sm',
    lg: 'w-14 h-14 rounded-2xl text-base',
    xl: 'w-16 h-16 rounded-2xl text-lg',
  };

  const svgSizes = {
    sm: 18,
    md: 24,
    lg: 32,
    xl: 36,
  };

  const iconPx = svgSizes[size];

  // Real, recognizable tech company SVG brand badges
  if (lowerName.includes('google')) {
    return (
      <div
        role="img"
        aria-label="Google logo"
        className={`bg-white border border-slate-200 shadow-sm flex items-center justify-center flex-shrink-0 ${sizeClasses[size]} ${className}`}
      >
        <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27A7.18 7.18 0 0 1 4.9 12c0-.79.14-1.57.38-2.27V6.58H1.24A11.96 11.96 0 0 0 0 12c0 1.92.45 3.74 1.24 5.42l4.04-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
      </div>
    );
  }

  if (lowerName.includes('microsoft')) {
    return (
      <div
        role="img"
        aria-label="Microsoft logo"
        className={`bg-slate-900 border border-slate-700 shadow-sm flex items-center justify-center flex-shrink-0 ${sizeClasses[size]} ${className}`}
      >
        <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" aria-hidden="true">
          <rect x="1" y="1" width="10" height="10" fill="#F25022" />
          <rect x="13" y="1" width="10" height="10" fill="#7FBA00" />
          <rect x="1" y="13" width="10" height="10" fill="#00A4EF" />
          <rect x="13" y="13" width="10" height="10" fill="#FFB900" />
        </svg>
      </div>
    );
  }

  if (lowerName.includes('stripe')) {
    return (
      <div
        role="img"
        aria-label="Stripe logo"
        className={`bg-[#635BFF] text-white font-extrabold shadow-sm flex items-center justify-center flex-shrink-0 ${sizeClasses[size]} ${className}`}
      >
        <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.922 15.917.43 13.064.43c-6.84 0-11.486 3.535-11.486 9.479 0 5.488 4.298 7.37 9.123 9.07 2.378.835 3.197 1.482 3.197 2.454 0 .973-.865 1.468-2.348 1.468-2.477 0-5.32-1.127-7.228-2.222l-.946 5.617c1.942.846 4.793 1.385 7.647 1.385 7.15 0 11.83-3.356 11.83-9.426 0-5.59-4.22-7.398-8.875-9.105z" />
        </svg>
      </div>
    );
  }

  if (lowerName.includes('meta')) {
    return (
      <div
        role="img"
        aria-label="Meta logo"
        className={`bg-[#0081FB] text-white shadow-sm flex items-center justify-center flex-shrink-0 ${sizeClasses[size]} ${className}`}
      >
        <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 6.5C8.5 6.5 6.2 8.7 4.7 10.9 3.2 13 2 15 2 16.5c0 1.5.8 2.5 2 2.5 1.5 0 3-1.5 4.5-3.8 1.5-2.2 2.7-4.2 3.5-5.2.8 1 2 3 3.5 5.2 1.5 2.3 3 3.8 4.5 3.8 1.2 0 2-1 2-2.5 0-1.5-1.2-3.5-2.7-5.6C17.8 8.7 15.5 6.5 12 6.5zm0 2.2c2.8 0 4.8 1.8 6.1 3.7 1.2 1.8 2.1 3.4 2.1 4.1 0 .4-.2.7-.6.7-.8 0-2-1.2-3.3-3.1-1.4-2.1-2.9-4.5-4.3-5.4zm-4.3 5.4C6.4 16 5.2 17.2 4.4 17.2c-.4 0-.6-.3-.6-.7 0-.7.9-2.3 2.1-4.1 1.3-1.9 3.3-3.7 6.1-3.7-1.4.9-2.9 3.3-4.3 5.4z" />
        </svg>
      </div>
    );
  }

  if (lowerName.includes('vercel')) {
    return (
      <div
        role="img"
        aria-label="Vercel logo"
        className={`bg-black text-white border border-slate-800 shadow-sm flex items-center justify-center flex-shrink-0 ${sizeClasses[size]} ${className}`}
      >
        <svg width={iconPx * 0.75} height={iconPx * 0.75} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 1L24 22H0L12 1Z" />
        </svg>
      </div>
    );
  }

  if (lowerName.includes('amazon') || lowerName.includes('aws')) {
    return (
      <div
        role="img"
        aria-label="Amazon Web Services logo"
        className={`bg-[#232F3E] text-[#FF9900] border border-slate-700 shadow-sm flex items-center justify-center flex-shrink-0 ${sizeClasses[size]} ${className}`}
      >
        <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.9 14.5c-2.4 1.8-5.9 2.7-8.9 2.7-4.2 0-8-1.5-10.9-4.1-.2-.2-.2-.5 0-.7.1-.1.3-.2.5-.2.1 0 .2.1.3.2 2.7 2.4 6.2 3.8 10.1 3.8 2.7 0 5.8-.8 8-2.4.3-.2.6-.1.8.2.1.2.1.5-.1.7zm1.6-1.5c-.3-.4-2-.2-3-.1-.3 0-.4-.2-.3-.5.9-1.5 2.3-2.1 3.6-2 .4 0 .7.3.7.6-.1 1.1-.5 2.5-1 3.7-.1.3-.4.3-.5.1-.1 0-.1-.1-.1-.2-.1-.4-.3-1.1-.4-1.6z" />
        </svg>
      </div>
    );
  }

  if (lowerName.includes('openai')) {
    return (
      <div
        role="img"
        aria-label="OpenAI logo"
        className={`bg-black text-white border border-slate-700 shadow-sm flex items-center justify-center flex-shrink-0 ${sizeClasses[size]} ${className}`}
      >
        <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M22.28 9.9a5.99 5.99 0 0 0-.53-5.11 6.09 6.09 0 0 0-6.51-2.9A6.07 6.07 0 0 0 10.66.75a6.03 6.03 0 0 0-5.77 4.19 6.01 6.01 0 0 0-3.9 2.82 6.08 6.08 0 0 0 .74 7.15 6 6 0 0 0 .53 5.11 6.09 6.09 0 0 0 6.51 2.9A6.07 6.07 0 0 0 13.34 24a6.03 6.03 0 0 0 5.77-4.19 6.01 6.01 0 0 0 3.9-2.82 6.08 6.08 0 0 0-.73-7.09zm-8.94 12.6a4.54 4.54 0 0 1-3-.72l.14-.08 4.93-2.85a.79.79 0 0 0 .4-.68v-6.94l2.21 1.28a.07.07 0 0 1 .04.05v5.82a4.57 4.57 0 0 1-4.72 4.12zM3.46 17.5a4.53 4.53 0 0 1-.58-3.05l.14.09 4.93 2.85a.78.78 0 0 0 .78 0l6-3.48v2.55a.07.07 0 0 1-.03.06l-5.04 2.91a4.56 4.56 0 0 1-6.2-1.93zm-1.1-9.92a4.53 4.53 0 0 1 2.37-2.34V11a.78.78 0 0 0 .39.68l6 3.47-2.2 1.27a.08.08 0 0 1-.07 0l-5.05-2.91a4.56 4.56 0 0 1-1.44-5.93zm16.82 4.09l-6-3.47 2.21-1.28a.07.07 0 0 1 .07 0l5.05 2.92a4.56 4.56 0 0 1-1.33 1.83zm2.5-3.32a4.53 4.53 0 0 1 .58 3.05l-.14-.09-4.93-2.85a.78.78 0 0 0-.78 0l-6 3.48V9.44a.07.07 0 0 1 .03-.06l5.04-2.91a4.56 4.56 0 0 1 6.2 1.93zM10.74 13.5l-2.43-1.4 2.43-1.4 2.43 1.4-2.43 1.4z" />
        </svg>
      </div>
    );
  }

  if (lowerName.includes('airbnb')) {
    return (
      <div
        role="img"
        aria-label="Airbnb logo"
        className={`bg-[#FF5A5F] text-white shadow-sm flex items-center justify-center flex-shrink-0 ${sizeClasses[size]} ${className}`}
      >
        <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C6.9 0 3 4.8 3 9.4c0 3.3 1.8 6.5 3.9 9.5 1.5 2.2 3.4 4.3 4.7 5.1h.8c1.3-.8 3.2-2.9 4.7-5.1 2.1-3 3.9-6.2 3.9-9.5C21 4.8 17.1 0 12 0zm0 18.5c-1.8 0-3.3-2.2-3.3-4.5 0-2.3 1.5-4.5 3.3-4.5s3.3 2.2 3.3 4.5c0 2.3-1.5 4.5-3.3 4.5z" />
        </svg>
      </div>
    );
  }

  if (lowerName.includes('github')) {
    return (
      <div
        role="img"
        aria-label="GitHub logo"
        className={`bg-[#24292F] text-white border border-slate-700 shadow-sm flex items-center justify-center flex-shrink-0 ${sizeClasses[size]} ${className}`}
      >
        <svg width={iconPx} height={iconPx} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
      </div>
    );
  }

  if (lowerName.includes('razorpay')) {
    return (
      <div
        role="img"
        aria-label="Razorpay logo"
        className={`bg-[#0C2340] text-[#3395FF] border border-slate-700 shadow-sm flex items-center justify-center flex-shrink-0 font-black ${sizeClasses[size]} ${className}`}
      >
        <span className="text-sm font-black tracking-tight text-[#3395FF]">R</span>
      </div>
    );
  }

  if (lowerName.includes('swiggy')) {
    return (
      <div
        role="img"
        aria-label="Swiggy logo"
        className={`bg-[#FC8019] text-white shadow-sm flex items-center justify-center flex-shrink-0 font-bold ${sizeClasses[size]} ${className}`}
      >
        <span className="text-sm font-black tracking-tight">S</span>
      </div>
    );
  }

  if (lowerName.includes('flipkart')) {
    return (
      <div
        role="img"
        aria-label="Flipkart logo"
        className={`bg-[#2874F0] text-[#FFE500] shadow-sm flex items-center justify-center flex-shrink-0 font-bold ${sizeClasses[size]} ${className}`}
      >
        <span className="text-sm font-black italic">f</span>
      </div>
    );
  }

  if (lowerName.includes('datadog')) {
    return (
      <div
        role="img"
        aria-label="Datadog logo"
        className={`bg-[#632CA6] text-white shadow-sm flex items-center justify-center flex-shrink-0 ${sizeClasses[size]} ${className}`}
      >
        <span className="font-black tracking-tighter text-sm">DD</span>
      </div>
    );
  }

  // Fallback: Clean, restrained professional dark tile
  const initials = name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

  return (
    <div
      role="img"
      aria-label={`${name} logo`}
      className={`bg-slate-800 border border-slate-700/80 text-slate-100 font-bold flex items-center justify-center flex-shrink-0 ${sizeClasses[size]} ${className}`}
    >
      {initials || <Building2 className="w-5 h-5 text-slate-400" aria-hidden="true" />}
    </div>
  );
};
