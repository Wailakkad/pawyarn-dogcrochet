import React, { useState } from 'react';
import { YarnIcon, StarIcon } from './Icons';

export const NewsletterCTA: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  return (
    <section
      aria-label="Newsletter Signup"
      className="my-12 rounded-3xl border border-cream-200 bg-cream-100/90 p-7 sm:p-10"
    >
      <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="max-w-xl">
          <div className="flex items-center gap-2 text-xs font-medium text-coral-600">
            <YarnIcon size={16} />
            <span>Free Printable Pattern Notes &amp; Sizing Worksheets</span>
          </div>
          <h2 className="mt-2 font-display text-2xl font-semibold text-brown-900">
            Get Cozy Dog Crochet Ideas in Your Inbox
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-brown-700">
            Join fellow dog-loving crocheters for new step-by-step pattern releases, seasonal costume roundups, and printable PDF gauge checklists.
          </p>
        </div>

        <div className="w-full lg:max-w-md">
          {submitted ? (
            <div className="rounded-2xl border border-mint-200 bg-mint-50 p-4 text-sm text-mint-700">
              <div className="flex items-center gap-2 font-semibold text-brown-900">
                <StarIcon size={16} className="text-mint-600" />
                <span>You are on the list!</span>
              </div>
              <p className="mt-1 text-xs text-brown-700">
                Thank you for subscribing with <span className="font-medium">{email}</span>. Watch your inbox for our next free dog sweater pattern release.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-2.5 sm:flex-row">
              <div className="flex-1">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-cream-300 bg-white px-4 py-2.5 text-sm text-brown-900 placeholder:text-brown-500 focus:border-coral-500 focus:outline-none"
                />
                {error && <p className="mt-1 text-xs text-coral-600">{error}</p>}
              </div>
              <button
                type="submit"
                className="rounded-xl bg-brown-900 px-5 py-2.5 text-xs font-semibold text-cream-50 transition-colors hover:bg-brown-800 whitespace-nowrap shrink-0"
              >
                Join Free List
              </button>
            </form>
          )}
          <p className="mt-2 text-[11px] text-brown-500">
            No spam, ever. Unsubscribe anytime with one click.
          </p>
        </div>
      </div>
    </section>
  );
};
