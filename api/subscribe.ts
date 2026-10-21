import type { ApiRequest, ApiResponse, SubscribeResponse } from './_lib/types';
import { registerSubscriber } from './_lib/appsScript';
import { checkRateLimit } from './_lib/rateLimit';
import { generateDownloadToken } from './_lib/tokens';
import {
  deriveSource,
  extractReferrerHost,
  getClientIp,
  normalizeEmail,
  sanitizeTrackingField,
} from './_lib/validate';

const LEAD_MAGNET = 'Granny Square Dog Sweater';
const MAX_BODY_BYTES = 8 * 1024;

function sendJson(res: ApiResponse, status: number, body: SubscribeResponse): void {
  res.status(status);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.json(body);
}

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    sendJson(res, 405, { ok: false, error: 'Method not allowed.' });
    return;
  }

  const rawBody = req.body;
  if (rawBody === undefined || rawBody === null || typeof rawBody !== 'object' || Array.isArray(rawBody)) {
    sendJson(res, 400, { ok: false, error: 'Invalid request body.' });
    return;
  }

  const body = rawBody as Record<string, unknown>;
  if (JSON.stringify(body).length > MAX_BODY_BYTES) {
    sendJson(res, 413, { ok: false, error: 'Request too large.' });
    return;
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(`subscribe:${ip}`)) {
    sendJson(res, 429, {
      ok: false,
      error: 'Too many attempts. Please wait a few minutes and try again.',
    });
    return;
  }

  // Honeypot: hidden field humans never fill. Bots that do are rejected.
  if (typeof body.company === 'string' && body.company.trim() !== '') {
    sendJson(res, 400, { ok: false, error: 'Invalid request.' });
    return;
  }

  const email = normalizeEmail(body.email);
  if (!email) {
    sendJson(res, 400, { ok: false, error: 'Please enter a valid email address.' });
    return;
  }

  const consent = body.consent === true || body.consent === 'true';
  const utmSource = sanitizeTrackingField(body.utmSource);
  const utmCampaign = sanitizeTrackingField(body.utmCampaign);
  const utmContent = sanitizeTrackingField(body.utmContent);
  const referrerHost = extractReferrerHost(req);
  const source = deriveSource(utmSource, referrerHost);

  const { token, tokenHash, expiresAt } = generateDownloadToken();

  let result;
  try {
    result = await registerSubscriber({
      email,
      timestamp: new Date().toISOString(),
      source,
      leadMagnet: LEAD_MAGNET,
      status: 'new',
      utmCampaign,
      utmContent,
      consent: consent ? 'yes' : 'no',
      tokenHash,
      tokenExpiresAt: expiresAt,
    });
  } catch {
    sendJson(res, 502, {
      ok: false,
      error: 'We could not save your signup right now. Please try again in a moment.',
    });
    return;
  }

  if (!result.ok) {
    sendJson(res, 502, {
      ok: false,
      error: 'We could not save your signup right now. Please try again in a moment.',
    });
    return;
  }

  const downloadUrl = `/api/download?token=${encodeURIComponent(token)}`;
  sendJson(res, 200, {
    ok: true,
    downloadUrl,
    expiresInSeconds: 30 * 60,
    duplicate: result.duplicate === true,
  });
}
