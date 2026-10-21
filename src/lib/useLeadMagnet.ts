import { useCallback, useEffect, useRef, useState } from 'react';
import { trackEvent } from './analytics';
import { captureUtmParams, type UtmParams } from './utm';

export type LeadMagnetStatus = 'idle' | 'loading' | 'success' | 'error';

export interface LeadMagnetState {
  email: string;
  consent: boolean;
  status: LeadMagnetStatus;
  errorMessage: string;
  downloadUrl: string;
}

export interface LeadMagnetFormBinding extends LeadMagnetState {
  setEmail: (value: string) => void;
  setConsent: (value: boolean) => void;
  honeypot: string;
  setHoneypot: (value: string) => void;
  submit: () => Promise<void>;
  trackedDownloadUrl: string | null;
}

function isValidEmail(value: string): boolean {
  const email = value.trim();
  return email.length >= 5 && email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

/**
 * Shared signup state so the hero form and the final CTA form stay in sync:
 * a visitor who signs up at the top of the page sees the success state (and a
 * working download button) in both places.
 */
export function useLeadMagnet(): LeadMagnetFormBinding {
  const [email, setEmailState] = useState('');
  const [consent, setConsentState] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<LeadMagnetStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const utmRef = useRef<UtmParams | null>(null);

  useEffect(() => {
    utmRef.current = captureUtmParams();
  }, []);

  const setEmail = useCallback((value: string) => {
    setEmailState(value);
    setErrorMessage((prev) => (prev ? '' : prev));
  }, []);

  const setConsent = useCallback((value: boolean) => {
    setConsentState(value);
  }, []);

  const submit = useCallback(async () => {
    const trimmed = email.trim();

    if (!isValidEmail(trimmed)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    const utm = utmRef.current ?? captureUtmParams();
    trackEvent('lead_form_submit', {
      utm_source: utm.utmSource,
      utm_campaign: utm.utmCampaign,
    });

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          consent,
          company: honeypot,
          utmSource: utm.utmSource,
          utmCampaign: utm.utmCampaign,
          utmContent: utm.utmContent,
        }),
      });

      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        downloadUrl?: string;
        error?: string;
      } | null;

      if (response.ok && data?.ok && typeof data.downloadUrl === 'string') {
        setDownloadUrl(data.downloadUrl);
        setStatus('success');
        setErrorMessage('');
        setEmailState(trimmed);
        trackEvent('lead_signup_success', {
          utm_source: utm.utmSource,
          utm_campaign: utm.utmCampaign,
        });
        return;
      }

      setStatus('error');
      setErrorMessage(
        typeof data?.error === 'string' && data.error
          ? data.error
          : 'Something went wrong. Please try again.',
      );
    } catch {
      setStatus('error');
      setErrorMessage(
        'We could not reach the server. Please check your connection and try again.',
      );
    }
  }, [email, consent, honeypot]);

  return {
    email,
    consent,
    status,
    errorMessage,
    downloadUrl,
    setEmail,
    setConsent,
    honeypot,
    setHoneypot,
    submit,
    trackedDownloadUrl: downloadUrl || null,
  };
}
