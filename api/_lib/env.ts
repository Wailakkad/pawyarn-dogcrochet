import process from 'node:process';

export const DEFAULT_PDF_PRIVATE_PATH = 'private/granny-square-dog-sweater.pdf';

export function getAppsScriptUrl(): string | null {
  const url = process.env.GOOGLE_APPS_SCRIPT_URL?.trim();
  if (!url) return null;
  if (!/^https:\/\/script\.google\.com\//.test(url) && !/^https:\/\/script\.googleusercontent\.com\//.test(url)) {
    return null;
  }
  return url;
}

export function getAppsScriptSecret(): string | null {
  const secret = process.env.GOOGLE_APPS_SCRIPT_SECRET;
  if (!secret || secret.trim().length < 16) return null;
  return secret;
}

export function getPdfPrivatePath(): string {
  return process.env.PDF_PRIVATE_PATH?.trim() || DEFAULT_PDF_PRIVATE_PATH;
}

export function getPublicSiteUrl(): string {
  return process.env.PUBLIC_SITE_URL?.trim().replace(/\/+$/, '') || 'https://pawandyarn.com';
}
