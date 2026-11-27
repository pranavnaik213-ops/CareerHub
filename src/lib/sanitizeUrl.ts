/**
 * URL Sanitization Utility
 * Strictly enforces allowed URL protocols (https: and http:)
 * Defends against stored and reflected DOM XSS via 'javascript:', 'data:', 'vbscript:' URIs.
 */

const ALLOWED_PROTOCOLS = new Set(['https:', 'http:']);

/**
 * Returns a sanitized URL string safe to bind to <a href={...}> or window.open(...)
 * Returns '#' if the protocol is unsafe or unrecognized.
 */
export function sanitizeSafeUrl(rawUrl: string | undefined | null): string {
  if (!rawUrl) return '#';
  const trimmed = rawUrl.trim();

  // Block control characters and whitespace evasion
  if (/[\x00-\x1F\x7F]/.test(trimmed)) {
    return '#';
  }

  // Allow relative URLs starting with '/' but strictly block protocol-relative '//'
  if (trimmed.startsWith('/') && !trimmed.startsWith('//')) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed);
    if (ALLOWED_PROTOCOLS.has(parsed.protocol.toLowerCase())) {
      return parsed.href;
    }
  } catch {
    // Malformed URL, cannot be safely parsed
    return '#';
  }

  return '#';
}

/**
 * Returns true if the URL has an allowed http or https protocol
 */
export function isSafeUrl(rawUrl: string | undefined | null): boolean {
  if (!rawUrl) return false;
  const sanitized = sanitizeSafeUrl(rawUrl);
  return sanitized !== '#';
}
