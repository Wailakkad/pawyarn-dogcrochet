import React, { useState } from 'react';
import { ArrowRight, Check, Lock } from 'lucide-react';
import { Product, formatPriceShort } from '../data/products';
import { ProductArt } from './ProductArt';

interface ProductCardProps {
  product: Product;
  onNavigate: (path: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const [imgError, setImgError] = useState(false);
  const cover = product.images.find((image) => image.src) ?? null;
  const href = `/shop/${product.slug}`;

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(href);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-cream-200 bg-white shadow-xs transition-colors duration-150 hover:border-coral-500/50">
      <a
        href={href}
        onClick={handleClick}
        className="relative block w-full overflow-hidden bg-cream-100"
        aria-label={`View details for ${product.shortTitle}`}
      >
        {cover && !imgError ? (
          /* Natural image size: no fixed aspect ratio, no cropping. */
          <img
            src={cover.src}
            alt={cover.alt}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgError(true)}
            className="block h-auto w-full transition-transform duration-200 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="relative aspect-4/3 w-full">
            <ProductArt
              variant={product.art}
              title={`${product.shortTitle} pattern illustration`}
              className="h-full w-full transition-transform duration-200 group-hover:scale-[1.02]"
            />
          </div>
        )}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-cream-200 bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-brown-800 backdrop-blur-sm">
          <Lock className="h-3 w-3 text-coral-600" aria-hidden="true" />
          PDF Pattern
        </span>
      </a>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display text-xl font-semibold leading-snug text-brown-900">
              <a
                href={href}
                onClick={handleClick}
                className="transition-colors group-hover:text-coral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500"
              >
                {product.shortTitle}
              </a>
            </h3>
            <span className="shrink-0 font-display text-lg font-bold tabular-nums text-coral-600">
              {formatPriceShort(product.priceUSD)}
            </span>
          </div>

          <p className="mt-1 text-xs font-medium text-brown-600">
            {product.skillLevel} · Sizes {product.sizes.join(', ')}
          </p>

          <ul className="mt-4 space-y-2">
            {product.highlights.slice(0, 3).map((highlight) => (
              <li
                key={highlight}
                className="flex items-start gap-2 text-sm leading-relaxed text-brown-700"
              >
                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-mint-600" aria-hidden="true" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 border-t border-cream-200/70 pt-4">
          <a
            href={href}
            onClick={handleClick}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-coral-600 transition-colors group-hover:text-coral-700"
          >
            <span>View details</span>
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </article>
  );
};
