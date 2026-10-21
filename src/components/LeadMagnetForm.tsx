import React from 'react';
import { Download, Loader2 } from 'lucide-react';
import { StarIcon } from './Icons';
import { trackEvent } from '../lib/analytics';

interface LeadMagnetFormProps {
  /** Unique per instance so both forms on the page have distinct labels/ids. */
  idPrefix: string;
  ctaLabel: string;
  email: string;
  consent: boolean;
  honeypot: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  errorMessage: string;
  downloadUrl: string | null;
  setEmail: (value: string) => void;
  setConsent: (value: boolean) => void;
  setHoneypot: (value: string) => void;
  submit: () => Promise<void>;
}

const inputClass =
  'w-full rounded-xl border border-cream-300 bg-white px-4 py-3.5 text-base text-brown-900 placeholder:text-brown-500 focus:border-coral-500 focus:outline-none focus:ring-2 focus:ring-coral-500/25';

const buttonClass =
  'inline-flex w-full items-center justify-center gap-2 rounded-xl bg-coral-500 px-6 py-3.5 text-sm font-bold tracking-wide text-white shadow-sm transition-colors duration-150 hover:bg-coral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto';

export const LeadMagnetForm: React.FC<LeadMagnetFormProps> = ({
  idPrefix,
  ctaLabel,
  email,
  consent,
  honeypot,
  status,
  errorMessage,
  downloadUrl,
  setEmail,
  setConsent,
  setHoneypot,
  submit,
}) => {
  const emailId = `${idPrefix}-email`;
  const consentId = `${idPrefix}-consent`;
  const errorId = `${idPrefix}-error`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    // Honeypot value is ignored by the server; bots that fill it get a 400.
    void submit();
  };

  if (status === 'success' && downloadUrl) {
    return (
      <div
        className="rounded-2xl border border-mint-200 bg-mint-50 p-5 sm:p-6"
        role="status"
        aria-live="polite"
      >
        <div className="flex items-center gap-2">
          <StarIcon size={18} className="text-mint-600" />
          <h3 className="font-display text-lg font-semibold text-brown-900">
            Your free crochet pattern is ready!
          </h3>
        </div>
        <p className="mt-1.5 text-sm leading-relaxed text-brown-700">
          Thanks for signing up. Download your PDF below.
        </p>
        <a
          href={downloadUrl}
          download
          onClick={() => trackEvent('pdf_download')}
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-coral-500 px-6 py-3.5 text-sm font-bold tracking-wide text-white shadow-sm transition-colors duration-150 hover:bg-coral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500 sm:w-auto"
        >
          <span>DOWNLOAD MY FREE PATTERN</span>
          <Download className="h-4 w-4" aria-hidden="true" />
        </a>
        <p className="mt-3 text-[11px] leading-relaxed text-brown-600">
          Your download link works once and expires after 30 minutes.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor={emailId} className="sr-only">
            Email address
          </label>
          <input
            id={emailId}
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            autoComplete="email"
            inputMode="email"
            required
            aria-invalid={status === 'error'}
            aria-describedby={status === 'error' ? errorId : undefined}
            className={inputClass}
          />
        </div>
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`${buttonClass} shrink-0`}
        >
          {status === 'loading' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              <span>Sending…</span>
            </>
          ) : (
            <span>{ctaLabel}</span>
          )}
        </button>
      </div>

      {/* Honeypot — hidden from humans and assistive tech; spam bots often fill it. */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor={`${idPrefix}-company`}>Company</label>
        <input
          id={`${idPrefix}-company`}
          type="text"
          name="company"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="mt-4">
        <label htmlFor={consentId} className="flex cursor-pointer items-start gap-2.5 text-xs leading-relaxed text-brown-700">
          <input
            id={consentId}
            type="checkbox"
            name="marketingConsent"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 rounded border-cream-300 accent-coral-500"
          />
          <span>
            Yes, I&rsquo;d also like to receive crochet tips, new patterns, and special offers by
            email.
          </span>
        </label>
      </div>

      {status === 'error' && errorMessage && (
        <p id={errorId} role="alert" className="mt-3 text-sm font-medium text-coral-600">
          {errorMessage}
        </p>
      )}

      <p className="mt-3 text-[11px] leading-relaxed text-brown-600">
        Free PDF after signup. Unsubscribe from marketing emails anytime. Submitting your email
        shares it with us to deliver the guide — it does not verify that you own the address.
      </p>
    </form>
  );
};
