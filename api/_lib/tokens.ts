import { createHash, randomBytes } from 'node:crypto';

export const DOWNLOAD_TOKEN_TTL_MS = 30 * 60 * 1000;

export function generateDownloadToken(): { token: string; tokenHash: string; expiresAt: string } {
  const token = randomBytes(32).toString('base64url');
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + DOWNLOAD_TOKEN_TTL_MS).toISOString();
  return { token, tokenHash, expiresAt };
}

export function hashToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export function isValidTokenFormat(token: string): boolean {
  return /^[A-Za-z0-9_-]{20,128}$/.test(token);
}
