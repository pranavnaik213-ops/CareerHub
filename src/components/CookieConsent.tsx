'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, Shield, Check, X, Sliders, ChevronDown, ChevronUp } from 'lucide-react';
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
        setAnalyticsAllowed(Boolean(parsed.analytics));
        setMarketingAllowed(Boolean(parsed.marketing));
      }
    } catch {
      setIsOpen(true);
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
    const prefs: CookiePreferences = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString(),
    };
    setAnalyticsAllowed(true);
    setMarketingAllowed(true);
    savePreferences(prefs);
  };

  const handleDeclineNonEssential = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString(),
    };
    setAnalyticsAllowed(false);
    setMarketingAllowed(false);
    savePreferences(prefs);
  };

  const handleSaveCustom = () => {
    const prefs: CookiePreferences = {
      essential: true,
      analytics: analyticsAllowed,
      marketing: marketingAllowed,
      timestamp: new Date().toISOString(),
    };
    savePreferences(prefs);
  };

  if (!isOpen) return null;

  return (
    <div
      role="region"
      aria-label="Cookie Consent Preferences"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-xl z-50 animate-slide-up"
    >
      <div className="bg-slate-900/95 border border-slate-700/80 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-2xl text-slate-100 space-y-5 ring-1 ring-white/10">
        
        {/* Banner Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 flex-shrink-0">
              <Cookie className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">Your Privacy Choices</h3>
              <p className="text-[11px] text-slate-400">CareerHub values your digital privacy and data sovereignty</p>
            </div>
          </div>
          <button
            onClick={handleDeclineNonEssential}
            className="p-1.5 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition-colors"
            title="Dismiss / Necessary only"
            aria-label="Dismiss non-essential cookies"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Notice description */}
        <p className="text-xs text-slate-300 leading-relaxed">
          We use strictly necessary cookies to ensure our job board and ATS pipeline function securely. With your consent, we also collect anonymized analytics to measure platform performance and search discoverability. Read our{' '}
          <Link href="/privacy" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
            Privacy Policy
          </Link>{' '}
          and{' '}
          <Link href="/terms" className="text-indigo-400 hover:text-indigo-300 underline underline-offset-2">
            Terms of Service
          </Link>.
        </p>

        {/* Detailed Preferences Accordion */}
        {showCustomize && (
          <div className="space-y-3 pt-3 border-t border-slate-800 animate-fade-in text-xs">
            {/* Essential */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div>
                <div className="flex items-center gap-1.5 font-bold text-slate-200">
                  <span>Strictly Necessary Cookies</span>
                  <span className="text-[9px] uppercase font-extrabold bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded">Always Active</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">Required for user sessions, role state, and security.</p>
              </div>
              <input type="checkbox" checked disabled className="accent-indigo-500 h-4 w-4 rounded opacity-75 cursor-not-allowed" />
            </div>

            {/* Analytics */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
              <div>
                <div className="font-bold text-slate-200">Anonymized Performance & Telemetry</div>
                <p className="text-[11px] text-slate-400 mt-0.5">Helps us gauge job listing reach without harvesting personal identity.</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={analyticsAllowed}
                  onChange={(e) => setAnalyticsAllowed(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-2 border-t border-slate-800/80">
          <button
            onClick={() => setShowCustomize(!showCustomize)}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-300 font-semibold transition-colors py-1.5 px-2 rounded-lg hover:bg-slate-800/50"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{showCustomize ? 'Hide Settings' : 'Customize Preferences'}</span>
            {showCustomize ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          <div className="flex items-center gap-2">
            {showCustomize ? (
              <button
                onClick={handleSaveCustom}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                Save Selected
              </button>
            ) : (
              <button
                onClick={handleDeclineNonEssential}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800/80 hover:bg-slate-800 text-slate-300 hover:text-white transition-colors"
              >
                Reject Non-Essential
              </button>
            )}

            <button
              onClick={handleAcceptAll}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-indigo-600 to-violet-600 hover:brightness-110 text-white shadow-md shadow-indigo-600/25 transition-all"
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
