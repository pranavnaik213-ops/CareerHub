'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, Check, X, Sliders, ChevronDown, ChevronUp } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface CookiePreferences {
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = 'careerhub_cookie_consent_v1';

export const CookieConsent: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analyticsAllowed, setAnalyticsAllowed] = useState(true);
  const [marketingAllowed, setMarketingAllowed] = useState(false);

  useEffect(() => {
    // Check if consent has already been recorded
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Small delay so it animates in smoothly after page load
        const timer = setTimeout(() => setIsOpen(true), 1200);
        return () => clearTimeout(timer);
      } else {
        const parsed = JSON.parse(stored);
        const analytics = Boolean(parsed.analytics);
        const marketing = Boolean(parsed.marketing);
        queueMicrotask(() => {
          setAnalyticsAllowed(analytics);
          setMarketingAllowed(marketing);
        });
      }
    } catch {
      queueMicrotask(() => setIsOpen(true));
    }

    // Listen for manual re-open trigger (e.g. from footer)
    const handleReopen = () => {
      setShowCustomize(true);
      setIsOpen(true);
    };

    window.addEventListener('open-cookie-settings', handleReopen);
    return () => window.removeEventListener('open-cookie-settings', handleReopen);
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Storage unavailable
    }
    setIsOpen(false);
    setShowCustomize(false);
    trackEvent(prefs.analytics ? 'cookie_consent_accepted' : 'cookie_consent_declined', {
      analytics: prefs.analytics,
      marketing: prefs.marketing,
    });
  };

  const handleAcceptAll = () => {
    savePreferences({
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    });
  };

  const handleDeclineNonEssential = () => {
    savePreferences({
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    });
  };

  const handleSaveCustom = () => {
    savePreferences({
      essential: true,
      analytics: analyticsAllowed,
      marketing: marketingAllowed,
      timestamp: new Date().toISOString(),
    });
  };

  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Cookie Consent Preferences"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-50 animate-slide-up"
    >
      <div className="bg-[#0f131f] border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-2xl text-slate-100 space-y-4">
        
        {/* Banner Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center text-blue-400 flex-shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white tracking-tight">Cookie & Privacy Preferences</h3>
              <p className="text-[11px] text-slate-400">Manage data collection settings for your session</p>
            </div>
          </div>
          <button
            onClick={handleDeclineNonEssential}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            title="Dismiss / Necessary only"
            aria-label="Dismiss non-essential cookies"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notice description */}
        <p className="text-xs text-slate-300 leading-relaxed">
          We use strictly necessary cookies to ensure the job board and ATS pipeline function securely. With your consent, we collect anonymized analytics to measure platform performance and search discoverability. Review our{' '}
          <Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="/terms" className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
            Terms of Service
          </Link>.
        </p>

        {/* Detailed Preferences Accordion */}
        {showCustomize && (
          <div className="space-y-2.5 pt-3 border-t border-slate-800/80 animate-fade-in text-xs">
            {/* Essential */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <div>
                <div className="flex items-center gap-1.5 font-semibold text-slate-200">
                  <span>Strictly Necessary Cookies</span>
                  <span className="text-[9px] uppercase font-bold bg-blue-600/15 text-blue-400 px-1.5 py-0.5 rounded">Always Active</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Required for user sessions, role state, and security.</p>
              </div>
              <input type="checkbox" checked disabled className="accent-blue-600 h-4 w-4 rounded opacity-75 cursor-not-allowed" />
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800">
              <div>
                <div className="font-semibold text-slate-200">Anonymized Performance & Telemetry</div>
                <p className="text-[11px] text-slate-400 mt-0.5">Helps measure job listing discoverability without collecting personal data.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsAllowed}
                  onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-transform peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-800/80">
          <button
            onClick={() => setShowCustomize(!showCustomize)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-200 font-medium transition-colors py-1.5 px-2 rounded-lg hover:bg-slate-800/50"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showCustomize ? 'Hide Settings' : 'Customize Preferences'}</span>
            {showCustomize ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <div className="flex items-center gap-2">
            {showCustomize ? (
              <button
                onClick={handleSaveCustom}
                className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                Save Selected
              </button>
            ) : (
              <button
                onClick={handleDeclineNonEssential}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                Reject Non-Essential
              </button>
            )}

            <button
              onClick={handleAcceptAll}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              Accept All
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
