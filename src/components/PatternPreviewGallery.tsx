import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import type { ProductPreviewPage } from '../data/products';

interface PatternPreviewGalleryProps {
  pages: ProductPreviewPage[];
  title?: string;
  subtitle?: string;
}

/**
 * "Inside the Pattern" PDF page preview grid with an accessible click-to-zoom
 * lightbox (ESC / arrow keys, focus trap, focus restore, scroll lock).
 */
export const PatternPreviewGallery: React.FC<PatternPreviewGalleryProps> = ({
  pages,
  title = 'Inside the Pattern',
  subtitle = 'Preview the PDF pages (tap to zoom).',
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const close = () => setOpenIndex(null);
  const next = () => setOpenIndex((index) => (index === null ? index : (index + 1) % pages.length));
  const prev = () =>
    setOpenIndex((index) => (index === null ? index : (index - 1 + pages.length) % pages.length));

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === 'ArrowRight') {
        event.preventDefault();
        next();
        return;
      }
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        prev();
        return;
      }
      if (event.key === 'Tab') {
        const dialog = dialogRef.current;
        if (!dialog) return;
        const focusables = Array.from(
          dialog.querySelectorAll<HTMLElement>('button, [href], [tabindex]:not([tabindex="-1"])'),
        ).filter((el) => !el.hasAttribute('disabled'));
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement;
        if (event.shiftKey && (active === first || !dialog.contains(active))) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && (active === last || !dialog.contains(active))) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousBodyOverflow;
      // Return focus to the thumbnail that opened the lightbox.
      const returnTarget = previouslyFocused as HTMLElement | null;
      if (returnTarget && document.contains(returnTarget)) {
        returnTarget.focus();
      }
    };
  }, [isOpen]);

  if (pages.length === 0) return null;

  return (
    <>
      <p className="mt-6 text-sm text-brown-600">{subtitle}</p>

      <div
        className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        role="list"
        aria-label={title}
      >
        {pages.map((page, index) => (
          <div key={page.src} role="listitem">
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Zoom in: ${page.alt}`}
              className="group block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500"
            >
              <span className="relative block overflow-hidden rounded-xl border border-cream-200 bg-white shadow-xs transition-all duration-150 group-hover:-translate-y-0.5 group-hover:border-coral-500/40 group-hover:shadow-md">
                <img
                  src={page.src}
                  alt={page.alt}
                  width={page.width}
                  height={page.height}
                  loading="lazy"
                  decoding="async"
                  className="block h-auto w-full"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 flex items-center justify-center bg-brown-900/0 opacity-0 transition-all duration-150 group-hover:bg-brown-900/25 group-hover:opacity-100"
                />
              </span>
              <span className="mt-2 flex items-center justify-center gap-1.5 text-xs text-brown-600 transition-colors group-hover:text-coral-600">
                <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Preview page {index + 1}</span>
              </span>
            </button>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && openIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-brown-900/75 p-4 backdrop-blur-sm sm:p-6"
          onClick={close}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} — page preview zoom`}
            tabIndex={-1}
            onClick={(event) => event.stopPropagation()}
            className="flex w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-cream-200 bg-cream-50 shadow-xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 border-b border-cream-200 px-4 py-3 sm:px-6">
              <div className="min-w-0">
                <p className="truncate font-display text-sm font-semibold text-brown-900 sm:text-base">
                  {title}
                </p>
                <p className="text-xs tabular-nums text-brown-600">
                  Page {openIndex + 1} of {pages.length}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                aria-label="Close preview"
                className="shrink-0 rounded-xl p-2 text-brown-700 transition-colors hover:bg-cream-200/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {/* Image */}
            <div className="flex items-center justify-center overflow-auto bg-cream-100/60 p-3 sm:p-5">
              <img
                src={pages[openIndex].src}
                alt={pages[openIndex].alt}
                width={pages[openIndex].width}
                height={pages[openIndex].height}
                decoding="async"
                className="block max-h-[68vh] h-auto w-auto max-w-full rounded-xl bg-white shadow-sm"
              />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4 border-t border-cream-200 px-4 py-3 sm:px-6">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous preview page"
                className="inline-flex items-center gap-1.5 rounded-xl border border-cream-200 bg-white px-3.5 py-2 text-xs font-semibold text-brown-800 transition-colors hover:border-coral-500/50 hover:text-coral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <div className="flex items-center gap-1.5" aria-hidden="true">
                {pages.map((page, index) => (
                  <span
                    key={page.src}
                    className={`h-1.5 rounded-full transition-all duration-150 ${
                      index === openIndex ? 'w-5 bg-coral-500' : 'w-1.5 bg-cream-300'
                    }`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={next}
                aria-label="Next preview page"
                className="inline-flex items-center gap-1.5 rounded-xl border border-cream-200 bg-white px-3.5 py-2 text-xs font-semibold text-brown-800 transition-colors hover:border-coral-500/50 hover:text-coral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
