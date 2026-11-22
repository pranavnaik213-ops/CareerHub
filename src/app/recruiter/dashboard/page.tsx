'use client';

import React, { useState } from 'react';
import { useJobContext } from '@/context/JobContext';
import { RecruiterMetrics } from '@/components/RecruiterMetrics';
import { AtsKanbanBoard } from '@/components/AtsKanbanBoard';
import { Job, JobStatus } from '@/types';
import Link from 'next/link';
import {
  Briefcase,
  Users,
  PlusCircle,
  Kanban,
  Table,
  MapPin,
  Clock,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  Building2,
  Sparkles
} from 'lucide-react';
import { CompanyLogo } from '@/components/CompanyLogo';

export default function RecruiterDashboard() {
  const { jobs, updateJobStatus, deleteJob, applications } = useJobContext();
  const [activeTab, setActiveTab] = useState<'ats' | 'postings'>('ats');

  return (
    <div className="space-y-8">
      
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 rounded-xl bg-slate-900 border border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-slate-800 border border-slate-700 text-white flex items-center justify-center shadow-sm" aria-hidden="true">
            <Building2 className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white tracking-tight font-heading">Recruiter Control Hub</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
                Employer ATS
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Publish job openings, advance applicants across ATS stages, and track pipeline metrics.
            </p>
          </div>
        </div>

        <Link
          href="/recruiter/post-job"
          className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors min-h-[38px]"
        >
          <PlusCircle className="w-4 h-4" aria-hidden="true" />
          Post New Job
        </Link>
      </div>

      {/* Recruiter Metrics Statistics */}
      <RecruiterMetrics />

      {/* Navigation Tabs */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-1.5 bg-[#11141c] p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab('ats')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'ats'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Kanban className="w-3.5 h-3.5" aria-hidden="true" />
            ATS Candidate Pipeline ({applications.length})
          </button>

          <button
            onClick={() => setActiveTab('postings')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
              activeTab === 'postings'
                ? 'bg-blue-600 text-white'
                : 'text-slate-300 hover:text-white'
            }`}
          >
            <Table className="w-3.5 h-3.5" aria-hidden="true" />
            Manage Job Listings ({jobs.length})
          </button>
        </div>
      </div>

      {/* TAB 1: ATS KANBAN BOARD */}
      {activeTab === 'ats' && <AtsKanbanBoard />}

      {/* TAB 2: MANAGE JOB POSTINGS TABLE */}
      {activeTab === 'postings' && (
        <div className="bg-[#11141c] border border-slate-800 rounded-xl p-5 sm:p-6 space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h2 className="text-base font-bold text-slate-100 font-heading">Job Listings Directory</h2>
              <p className="text-xs text-slate-400">Manage status visibility or remove inactive job postings.</p>
            </div>
            <Link
              href="/recruiter/post-job"
              className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors w-fit min-h-[34px] flex items-center justify-center"
            >
              + Create Posting
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-200">
              <thead className="bg-slate-950 text-slate-300 uppercase text-[10px] tracking-wider border-b border-slate-800">
                <tr>
                  <th className="p-4">Position Title & Company</th>
                  <th className="p-4">Work Setup</th>
                  <th className="p-4">Salary Range</th>
                  <th className="p-4">Applicants</th>
                  <th className="p-4">Posted Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {jobs.map((job) => {
                  const jobApps = applications.filter((app) => app.jobId === job.id);

                  return (
                    <tr key={job.id} className="hover:bg-slate-950/40 transition-colors">
                      
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <CompanyLogo company={job.company} size="sm" />
                          <div>
                            <p className="font-bold text-slate-100">{job.title}</p>
                            <p className="text-[11px] text-slate-400">{job.company}</p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-slate-800 text-slate-200 border border-slate-700">
                          {job.locationType} • {job.jobType}
                        </span>
                      </td>

                      <td className="p-4 font-semibold text-emerald-400">
                        ${Math.round(job.salaryMin / 1000)}k - ${Math.round(job.salaryMax / 1000)}k
                      </td>

                      <td className="p-4">
                        <span className="font-bold text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                          {jobApps.length} candidates
                        </span>
                      </td>

                      <td className="p-4 text-slate-400">{job.postedDate}</td>

                      <td className="p-4">
                        <select
                          value={job.status}
                          onChange={(e) => updateJobStatus(job.id, e.target.value as JobStatus)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold outline-none border cursor-pointer ${
                            job.status === 'Active'
                              ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                              : job.status === 'Closed'
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                              : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                          }`}
                        >
                          <option value="Active" className="bg-slate-900 text-emerald-400">Active</option>
                          <option value="Closed" className="bg-slate-900 text-rose-400">Closed</option>
                          <option value="Draft" className="bg-slate-900 text-amber-400">Draft</option>
                        </select>
                      </td>

                      <td className="p-4 text-right">
                        <button
                          onClick={() => deleteJob(job.id)}
                          className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors min-w-[36px] min-h-[36px]"
                          title="Delete Job"
                          aria-label={`Delete job ${job.title}`}
                        >
                          <Trash2 className="w-4 h-4" aria-hidden="true" />
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}

    </div>
  );
}
