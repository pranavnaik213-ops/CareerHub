'use client';

import React from 'react';
import { useJobContext } from '@/context/JobContext';
import { Briefcase, Users, CalendarCheck, Award, TrendingUp, Clock } from 'lucide-react';

export const RecruiterMetrics: React.FC = () => {
  const { jobs, applications } = useJobContext();

  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((j) => j.status === 'Active').length;
  const totalApps = applications.length;
  const interviewing = applications.filter((app) => app.status === 'Interview Scheduled').length;
  const offersExtended = applications.filter((app) => app.status === 'Offer Extended').length;

  const STATS = [
    {
      title: 'Active Job Postings',
      value: activeJobs,
      subtitle: `Out of ${totalJobs} total postings`,
      icon: Briefcase,
      color: 'from-indigo-500/20 to-violet-500/20 text-indigo-400 border-indigo-500/30'
    },
    {
      title: 'Total Applications',
      value: totalApps,
      subtitle: 'Across all active listings',
      icon: Users,
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30'
    },
    {
      title: 'Interviews Scheduled',
      value: interviewing,
      subtitle: 'Upcoming candidate rounds',
      icon: CalendarCheck,
      color: 'from-violet-500/20 to-purple-500/20 text-violet-300 border-violet-500/30'
    },
    {
      title: 'Offers Extended',
      value: offersExtended,
      subtitle: 'Final candidate stage',
      icon: Award,
      color: 'from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className={`p-5 rounded-2xl bg-gradient-to-br border backdrop-blur-xl shadow-lg ${stat.color} bg-slate-900/80`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-slate-300">{stat.title}</span>
              <div className="p-2 rounded-xl bg-slate-950/60">
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight mb-1">{stat.value}</div>
            <p className="text-[11px] text-slate-400">{stat.subtitle}</p>
          </div>
        );
      })}
    </div>
  );
};
