import type { ApiRequest } from './types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeEmail(raw: unknown): string | null {
  if (typeof raw !== 'string') return null;
  const email = raw.trim().toLowerCase();
  if (email.length < 5 || email.length > 254) return null;
  if (email.includes('..')) return null;
  if (!EMAIL_PATTERN.test(email)) return null;
  return email;
}

export function sanitizeTrackingField(raw: unknown, maxLength = 200): string {
  if (typeof raw !== 'string') return '';
  return raw
    .replace(/[\u0000-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

export function getClientIp(req: ApiRequest): string {
  const forwarded = req.headers['x-forwarded-for'];
  const first = Array.isArray(forwarded) ? forwarded[0] : forwarded;
  if (first) {
    const ip = first.split(',')[0]?.trim();
    if (ip) return ip;
  }
  const realIp = req.headers['x-real-ip'];
  const single = Array.isArray(realIp) ? realIp[0] : realIp;
  if (single) return single.trim();
  return 'unknown';
}

export function isPinterestTraffic(utmSource: string, referrerHost: string): boolean {
  const source = utmSource.toLowerCase();
  const referrer = referrerHost.toLowerCase();
  return (
    source.includes('pinterest') ||
    source === 'pin' ||
    source === 'pintrk' ||
    referrer.includes('pinterest.') ||
    referrer === 'pin.it' ||
    referrer.includes('pinimg.com')
  );
}

export function deriveSource(utmSource: string, referrerHost: string): string {
  if (isPinterestTraffic(utmSource, referrerHost)) return 'Pinterest';
  if (utmSource) return sanitizeTrackingField(utmSource, 60) || 'unknown';
  if (referrerHost) return 'referral';
  return 'direct';
}

export function extractReferrerHost(req: ApiRequest): string {
  const raw = req.headers.referer ?? req.headers.referrer;
  const value = Array.isArray(raw) ? raw[0] : raw;
  if (!value) return '';
  try {
    return new URL(value).host;
  } catch {
    return '';
  }
}
