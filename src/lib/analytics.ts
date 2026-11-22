/**
 * CareerHub Privacy-Friendly Analytics Client
 * 
 * Supports:
 * - Cookieless / consent-aware event tracking
 * - Safe telemetry with no personal identifiable info (PII)
 * - Custom event dispatching for job searches, applications, and role toggles
 */

export type AnalyticsEventName =
  | 'page_view'
  | 'job_search'
  | 'job_filter_applied'
  | 'job_card_viewed'
  | 'job_apply_initiated'
  | 'job_apply_submitted'
  | 'job_apply_external_clicked'
  | 'job_saved'
  | 'job_unsaved'
  | 'job_posted'
  | 'role_switched'
  | 'profile_updated'
  | 'cookie_consent_accepted'
  | 'cookie_consent_declined'
  | 'ai_agent_sync_triggered'
  | 'linkedin_connected'
  | 'resume_analyzed'
  | 'interview_prep_evaluated';

export interface AnalyticsEvent {
  name: AnalyticsEventName;
  properties?: Record<string, string | number | boolean | undefined>;
  timestamp: string;
}

const STORAGE_KEY = 'careerhub_analytics_events';
const CONSENT_KEY = 'careerhub_cookie_consent_v1';

/**
 * Checks if analytics cookies / tracking is consented to by the user
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed?.analytics);
  } catch {
    return false;
  }
}

/**
 * Records an analytics event if user consented or logs locally for debugging
 */
export function trackEvent(
  name: AnalyticsEventName,
  properties?: Record<string, string | number | boolean | undefined>
): void {
  if (typeof window === 'undefined') return;

  const eventPayload: AnalyticsEvent = {
    name,
    properties: {
      ...properties,
      path: window.location.pathname,
      referrer: document.referrer || 'direct',
    },
    timestamp: new Date().toISOString(),
  };

  // Only persist/dispatch if analytics consent has been granted
  if (hasAnalyticsConsent()) {
    try {
      const existing = localStorage.getItem(STORAGE_KEY);
      const list: AnalyticsEvent[] = existing ? JSON.parse(existing) : [];
      // Keep recent 50 events in client buffer
      list.unshift(eventPayload);
      if (list.length > 50) list.pop();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {
      // Storage unavailable or full
    }
  }

  // Developer logging in non-production or for verification
  if (process.env.NODE_ENV !== 'production' || process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true') {
    // eslint-disable-next-line no-console
    console.debug('[CareerHub Analytics]', name, eventPayload.properties);
  }
}

/**
 * Retrieves client recorded analytics events for diagnostics
 */
export function getStoredAnalyticsEvents(): AnalyticsEvent[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
