import React from 'react';
import { Lock } from 'lucide-react';
import { formatPriceShort } from '../data/products';

interface StickyBuyBarProps {
  shortTitle: string;
  priceUSD: number;
  checkoutHref: string;
}

/**
 * Fixed bottom purchase bar for product pages on small screens.
 * Desktop uses the sticky buy box in the product hero instead.
 */
export const StickyBuyBar: React.FC<StickyBuyBarProps> = ({
  shortTitle,
  priceUSD,
  checkoutHref,
}) => {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-30 border-t border-cream-200 bg-cream-50/95 px-4 py-3 backdrop-blur-md lg:hidden"
      role="region"
      aria-label="Quick purchase"
    >
      <div className="mx-auto flex max-w-[1160px] items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold text-brown-900">{shortTitle}</p>
          <p className="text-xs tabular-nums text-brown-600">{formatPriceShort(priceUSD)}</p>
        </div>
        {checkoutHref ? (
          <a
            href={checkoutHref}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-coral-500 px-4 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-coral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500"
          >
            <Lock className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Get the PDF</span>
          </a>
        ) : (
          <button
            type="button"
            disabled
            aria-disabled="true"
            className="inline-flex shrink-0 cursor-not-allowed items-center gap-2 rounded-xl bg-brown-500/60 px-4 py-2.5 text-xs font-semibold text-white"
          >
            Coming Soon
          </button>
        )}
      </div>
    </div>
  );
};
