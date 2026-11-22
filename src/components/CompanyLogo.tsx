'use client';

import React from 'react';
import { Building2, Zap, Sparkles, Cpu, ShieldCheck, Layers, Globe, Code2, Flame, Gem } from 'lucide-react';

interface CompanyLogoProps {
  company?: string;
  companyName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const GRADIENTS = [
  'from-indigo-600 to-violet-600',
  'from-blue-600 to-indigo-600',
  'from-violet-600 to-purple-600',
  'from-emerald-600 to-teal-600',
  'from-rose-600 to-pink-600',
  'from-amber-600 to-orange-600',
];

const ICONS = [Zap, Sparkles, Cpu, ShieldCheck, Layers, Globe, Code2, Flame, Gem, Building2];

export const CompanyLogo: React.FC<CompanyLogoProps> = ({ company, companyName, size = 'md', className = '' }) => {
  const name = company || companyName || 'Company';
  // Generate deterministic gradient & icon based on company name
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const gradientIdx = Math.abs(hash) % GRADIENTS.length;
  const iconIdx = Math.abs(hash) % ICONS.length;
  const gradient = GRADIENTS[gradientIdx];
  const IconComponent = ICONS[iconIdx];

  const sizeClasses = {
    sm: 'w-8 h-8 rounded-lg text-xs',
    md: 'w-12 h-12 rounded-xl text-sm',
    lg: 'w-16 h-16 rounded-2xl text-lg',
    xl: 'w-20 h-20 rounded-2xl text-xl',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  };

  // Get up to 2 uppercase initials
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
      className={`relative flex items-center justify-center font-extrabold text-white bg-gradient-to-tr ${gradient} shadow-lg shadow-indigo-950/40 border border-white/15 flex-shrink-0 group-hover:scale-105 transition-transform duration-300 ${sizeClasses[size]} ${className}`}
    >
      <div className="absolute inset-0 bg-slate-950/20 rounded-[inherit] pointer-events-none" />
      <span className="relative z-10 flex items-center justify-center gap-1">
        {initials || <IconComponent className={iconSizes[size]} aria-hidden="true" />}
      </span>
    </div>
  );
};
