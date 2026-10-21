import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import type { ApiRequest, ApiResponse } from './_lib/types';
import { consumeDownloadToken } from './_lib/appsScript';
import { getPdfPrivatePath } from './_lib/env';
import { checkRateLimit } from './_lib/rateLimit';
import { hashToken, isValidTokenFormat } from './_lib/tokens';
import { getClientIp } from './_lib/validate';

const PDF_FILENAME = 'paw-yarn-granny-square-dog-sweater-pattern.pdf';

function sendJson(res: ApiResponse, status: number, body: { ok: false; error: string }): void {
  res.status(status);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.json(body);
}

export default async function handler(req: ApiRequest, res: ApiResponse): Promise<void> {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    sendJson(res, 405, { ok: false, error: 'Method not allowed.' });
    return;
  }

  const ip = getClientIp(req);
  if (!checkRateLimit(`download:${ip}`, 10, 10 * 60 * 1000)) {
    sendJson(res, 429, { ok: false, error: 'Too many download attempts. Please try again later.' });
    return;
  }

  const tokenParam = req.query?.token;
  const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;
  if (!token || !isValidTokenFormat(token)) {
    sendJson(res, 400, { ok: false, error: 'This download link is invalid. Please sign up again.' });
    return;
  }

  let consumed;
  try {
    consumed = await consumeDownloadToken(hashToken(token));
  } catch {
    sendJson(res, 502, {
      ok: false,
      error: 'We could not verify your download link right now. Please try again in a moment.',
    });
    return;
  }

  if (!consumed.ok || consumed.valid !== true) {
    const message =
      consumed.reason === 'expired'
        ? 'This download link has expired. Please sign up again to get a fresh link.'
        : consumed.reason === 'used'
          ? 'This download link has already been used. Please sign up again if you need the PDF.'
          : 'This download link is invalid or has already been used. Please sign up again.';
    sendJson(res, 403, { ok: false, error: message });
    return;
  }

  const pdfPath = path.resolve(process.cwd(), getPdfPrivatePath());

  let fileStats;
  try {
    fileStats = await stat(pdfPath);
  } catch {
    sendJson(res, 404, {
      ok: false,
      error: 'The PDF is not available right now. Please try again later.',
    });
    return;
  }

  if (!fileStats.isFile() || fileStats.size === 0) {
    sendJson(res, 404, {
      ok: false,
      error: 'The PDF is not available right now. Please try again later.',
    });
    return;
  }

  // Vercel serverless responses are capped (4.5 MB on Hobby). Fail with an
  // accurate message rather than a truncated download if the file is too big.
  const MAX_PDF_BYTES = 4 * 1024 * 1024;
  if (fileStats.size > MAX_PDF_BYTES) {
    sendJson(res, 500, {
      ok: false,
      error: 'The PDF is too large to deliver right now. Please contact us.',
    });
    return;
  }

  let pdfBuffer: Buffer;
  try {
    pdfBuffer = await readFile(pdfPath);
  } catch {
    sendJson(res, 500, { ok: false, error: 'We could not deliver the PDF. Please try again.' });
    return;
  }

  res.status(200);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Length', String(pdfBuffer.byteLength));
  res.setHeader('Content-Disposition', `attachment; filename="${PDF_FILENAME}"`);
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.end(pdfBuffer);
}
