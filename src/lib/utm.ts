const STORAGE_KEY = 'pawYarnUtmParams';

export interface UtmParams {
  utmSource: string;
  utmCampaign: string;
  utmContent: string;
}

function isBrowser(): boolean {
  return typeof window !== 'undefined';
}

function readFromUrl(): UtmParams {
  if (!isBrowser()) return { utmSource: '', utmCampaign: '', utmContent: '' };
  const params = new URLSearchParams(window.location.search);
  return {
    utmSource: params.get('utm_source') ?? '',
    utmCampaign: params.get('utm_campaign') ?? '',
    utmContent: params.get('utm_content') ?? '',
  };
}

/**
 * Captures Pinterest/other UTM parameters from the landing URL and persists
 * them in sessionStorage so they survive client-side navigation and can be
 * attached to the signup request.
 */
export function captureUtmParams(): UtmParams {
  if (!isBrowser()) return { utmSource: '', utmCampaign: '', utmContent: '' };

  const fromUrl = readFromUrl();
  const hasAny = fromUrl.utmSource || fromUrl.utmCampaign || fromUrl.utmContent;

  if (hasAny) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fromUrl));
    } catch {
      // Storage may be unavailable in some in-app browsers; ignore.
    }
    return fromUrl;
  }

  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as Partial<UtmParams>;
      return {
        utmSource: typeof parsed.utmSource === 'string' ? parsed.utmSource : '',
        utmCampaign: typeof parsed.utmCampaign === 'string' ? parsed.utmCampaign : '',
        utmContent: typeof parsed.utmContent === 'string' ? parsed.utmContent : '',
      };
    }
  } catch {
    // Ignore malformed stored values.
  }

  return { utmSource: '', utmCampaign: '', utmContent: '' };
}

/**
 * Appends UTM attribution (from the current URL and/or the persisted session
 * copy) onto an external checkout URL such as a Payhip product link, so
 * Pinterest/traffic attribution survives the offsite redirect.
 */
export function appendUtmToUrl(targetUrl: string): string {
  if (!targetUrl) return '';
  if (!isBrowser()) return targetUrl;

  try {
    const url = new URL(targetUrl);
    const utm = captureUtmParams();

    const known: Array<[string, string]> = [
      ['utm_source', utm.utmSource],
      ['utm_campaign', utm.utmCampaign],
      ['utm_content', utm.utmContent],
    ];
    for (const [key, value] of known) {
      if (value && !url.searchParams.has(key)) {
        url.searchParams.set(key, value);
      }
    }

    const currentParams = new URLSearchParams(window.location.search);
    currentParams.forEach((value, key) => {
      if (key.startsWith('utm_') && value && !url.searchParams.has(key)) {
        url.searchParams.set(key, value);
      }
    });

    return url.toString();
  } catch {
    return targetUrl;
  }
}
