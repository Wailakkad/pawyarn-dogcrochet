import { getAppsScriptSecret, getAppsScriptUrl } from './env';

export interface AppsScriptSubscriberPayload {
  email: string;
  timestamp: string;
  source: string;
  leadMagnet: string;
  status: string;
  utmCampaign: string;
  utmContent: string;
  consent: string;
  tokenHash: string;
  tokenExpiresAt: string;
}

export interface AppsScriptSubscribeResult {
  ok: boolean;
  duplicate?: boolean;
  error?: string;
}

export interface AppsScriptConsumeResult {
  ok: boolean;
  valid?: boolean;
  reason?: string;
  error?: string;
}

const REQUEST_TIMEOUT_MS = 10_000;

async function postToAppsScript(action: string, payload: unknown): Promise<unknown> {
  const url = getAppsScriptUrl();
  const secret = getAppsScriptSecret();
  if (!url || !secret) {
    throw new Error('Apps Script integration is not configured.');
  }

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      method: 'POST',
      // text/plain avoids a CORS preflight on the Apps Script side; the payload
      // itself is authenticated with the shared secret and includes no PII
      // beyond what the backend already validated.
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action, secret, payload }),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Apps Script responded with status ${response.status}.`);
    }

    return await response.json();
  } finally {
    clearTimeout(timer);
  }
}

export async function registerSubscriber(
  payload: AppsScriptSubscriberPayload,
): Promise<AppsScriptSubscribeResult> {
  const result = (await postToAppsScript('registerSubscriber', payload)) as AppsScriptSubscribeResult;
  if (typeof result !== 'object' || result === null || typeof result.ok !== 'boolean') {
    return { ok: false, error: 'Unexpected response from subscriber store.' };
  }
  return result;
}

export async function consumeDownloadToken(tokenHash: string): Promise<AppsScriptConsumeResult> {
  const result = (await postToAppsScript('consumeDownloadToken', { tokenHash })) as AppsScriptConsumeResult;
  if (typeof result !== 'object' || result === null || typeof result.ok !== 'boolean') {
    return { ok: false, error: 'Unexpected response from token store.' };
  }
  return result;
}
