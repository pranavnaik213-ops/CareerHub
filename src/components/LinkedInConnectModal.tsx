'use client';

import React, { useState } from 'react';
import { useJobContext } from '@/context/JobContext';
import { X, CheckCircle2, ShieldCheck, ExternalLink, Link2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface LinkedInConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LinkedInConnectModal: React.FC<LinkedInConnectModalProps> = ({ isOpen, onClose }) => {
  const { candidateProfile, updateCandidateProfile, showToast } = useJobContext();

  const [profileUrl, setProfileUrl] = useState(candidateProfile.linkedinUrl || 'https://www.linkedin.com/in/pranav-naik');
  const [headline, setHeadline] = useState(candidateProfile.headline);
  const [isSyncing, setIsSyncing] = useState(false);

  if (!isOpen) return null;

  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();

    if (!profileUrl.includes('linkedin.com/in/')) {
      showToast('Please enter a valid LinkedIn Profile URL (e.g. https://www.linkedin.com/in/username)', 'error');
      return;
    }

    setIsSyncing(true);

    setTimeout(() => {
      updateCandidateProfile({
        linkedinUrl: profileUrl.trim(),
        headline: headline.trim(),
        linkedInConnected: true,
        linkedInVerified: true,
        linkedInSyncDate: new Date().toISOString().split('T')[0],
      });

      trackEvent('linkedin_connected', {
        profileUrl,
      });

      setIsSyncing(false);
      showToast('LinkedIn profile connected & verified successfully!', 'success');
      onClose();
    }, 600);
  };

  const handleDisconnect = () => {
    updateCandidateProfile({
      linkedInConnected: false,
      linkedInVerified: false,
    });
    showToast('Disconnected LinkedIn profile.', 'info');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="linkedin-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-lg bg-[#11141c] border border-slate-800 rounded-xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-5 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0A66C2] text-white flex items-center justify-center font-bold text-sm shadow-sm">
              in
            </div>
            <div>
              <h2 id="linkedin-modal-title" className="text-base font-bold text-white font-heading">
                Connect LinkedIn Profile
              </h2>
              <p className="text-xs text-slate-400">Sync verified credentials & 1-click apply</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg bg-slate-800/80 hover:bg-slate-800 transition-colors"
            aria-label="Close LinkedIn modal"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleConnect} className="p-5 sm:p-6 space-y-4 text-xs">
          
          <div className="p-3.5 rounded-lg bg-blue-950/30 border border-blue-800/40 text-blue-200 space-y-1">
            <p className="font-semibold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" aria-hidden="true" />
              Verified Candidate Fast-Track
            </p>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Connecting your LinkedIn profile attaches a verified identity badge to your applications, increasing recruiter response rates by up to 3.2x.
            </p>
          </div>

          <div>
            <label htmlFor="linkedin-url-input" className="block text-slate-300 font-medium mb-1.5">
              Your LinkedIn Profile URL *
            </label>
            <div className="relative">
              <Link2 className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" aria-hidden="true" />
              <input
                id="linkedin-url-input"
                type="url"
                required
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                placeholder="https://www.linkedin.com/in/username"
                className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-100 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="linkedin-headline-input" className="block text-slate-300 font-medium mb-1.5">
              LinkedIn Headline
            </label>
            <input
              id="linkedin-headline-input"
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. Senior Full Stack Engineer at Tech Corp"
              className="w-full bg-slate-900 border border-slate-800 focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-slate-100 outline-none"
            />
          </div>

          {candidateProfile.linkedInConnected && (
            <div className="p-3 bg-emerald-950/20 border border-emerald-800/40 rounded-lg flex items-center justify-between text-emerald-300 text-xs">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Profile currently connected & active
              </span>
              <button
                type="button"
                onClick={handleDisconnect}
                className="text-xs text-rose-400 hover:underline"
              >
                Disconnect
              </button>
            </div>
          )}

          {/* Action Footer */}
          <div className="pt-3 border-t border-slate-800 flex items-center justify-between gap-3">
            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-slate-200 flex items-center gap-1 text-[11px]"
            >
              <span>Visit LinkedIn</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSyncing}
                className="px-4 py-2 rounded-lg font-semibold bg-[#0A66C2] hover:bg-[#004182] text-white transition-colors flex items-center gap-1.5"
              >
                {isSyncing ? 'Connecting...' : candidateProfile.linkedInConnected ? 'Update LinkedIn' : 'Connect LinkedIn'}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
