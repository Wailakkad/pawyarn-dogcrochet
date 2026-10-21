/**
 * Per-instance, in-memory sliding-window rate limiter.
 *
 * Limitation (documented in docs/free-guide-landing-page-setup.md):
 * Vercel serverless functions are stateless and scale across instances, so this
 * is a best-effort guard against casual abuse from a single warm instance — not
 * a global guarantee. Apps Script-side duplicate prevention and Google's own
 * quotas provide the second layer. For strict global limits, add Upstash Redis.
 */

interface Window {
  timestamps: number[];
}

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;

const buckets = new Map<string, Window>();

export function checkRateLimit(key: string, limit = MAX_REQUESTS, windowMs = WINDOW_MS): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket) {
    buckets.set(key, { timestamps: [now] });
    pruneIfNeeded(now, windowMs);
    return true;
  }
  bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);
  if (bucket.timestamps.length >= limit) return false;
  bucket.timestamps.push(now);
  return true;
}

function pruneIfNeeded(now: number, windowMs: number): void {
  if (buckets.size < 5000) return;
  for (const [key, bucket] of buckets) {
    bucket.timestamps = bucket.timestamps.filter((t) => now - t < windowMs);
    if (bucket.timestamps.length === 0) buckets.delete(key);
  }
}
