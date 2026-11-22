'use client';

import React from 'react';
import { useJobContext } from '@/context/JobContext';
import { Briefcase, Users, CalendarCheck, Award } from 'lucide-react';

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
    },
    {
      title: 'Total Applications',
      value: totalApps,
      subtitle: 'Across all active listings',
      icon: Users,
    },
    {
      title: 'Interviews Scheduled',
      value: interviewing,
      subtitle: 'Active candidate rounds',
      icon: CalendarCheck,
    },
    {
      title: 'Offers Extended',
      value: offersExtended,
      subtitle: 'Final candidate stage',
      icon: Award,
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {STATS.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <div
            key={i}
            className="p-5 rounded-xl bg-[#11141c] border border-slate-800 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-slate-300">{stat.title}</span>
              <div className="p-2 rounded-lg bg-slate-900 border border-slate-800">
                <Icon className="w-4 h-4 text-blue-400" aria-hidden="true" />
              </div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-heading mb-0.5">{stat.value}</div>
              <p className="text-[11px] text-slate-400">{stat.subtitle}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
