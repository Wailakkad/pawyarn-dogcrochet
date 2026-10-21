/**
 * Lightweight, dependency-free conversion tracking hooks.
 *
 * No third-party analytics SDK is installed in this project, so events are
 * emitted as DOM CustomEvents on `window`. To connect Pinterest Tag, GA4, or
 * any other provider later, add ONE listener — no form/page changes needed:
 *
 *   document.addEventListener('pawyarn:track', (e) => {
 *     const { event, params } = e.detail;
 *     if (typeof pintrk === 'function') {
 *       pintrk('track', event === 'lead_signup_success' ? 'lead' : event, params);
 *     }
 *   });
 *
 * Raw email addresses are never sent to this function.
 */

export type TrackableEvent =
  | 'landing_page_view'
  | 'lead_form_submit'
  | 'lead_signup_success'
  | 'pdf_download';

export function trackEvent(
  event: TrackableEvent,
  params: Record<string, string | number | boolean> = {},
): void {
  if (typeof window === 'undefined' || typeof window.dispatchEvent !== 'function') return;
  try {
    window.dispatchEvent(
      new CustomEvent('pawyarn:track', {
        detail: { event, params: { ...params, ts: Date.now() } },
      }),
    );
  } catch {
    // Tracking must never break the signup flow.
  }
}
