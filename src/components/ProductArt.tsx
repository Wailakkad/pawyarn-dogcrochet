import React from 'react';
import type { ProductArtVariant } from '../data/products';

interface ProductArtProps {
  variant: ProductArtVariant;
  className?: string;
  title?: string;
}

/**
 * On-brand SVG placeholder art used until real product photography is added.
 * Replace product.images[] in src/data/products.ts with local paths to switch
 * to photos — ProductCard/ShopProductPage render photos when available.
 */
const RuffleCoatArt: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 400 300"
    className={className}
    role="presentation"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="400" height="300" fill="#F7EFE4" />
    <circle cx="330" cy="48" r="70" fill="#FADFD8" opacity="0.55" />
    <circle cx="60" cy="250" r="60" fill="#DEF1EA" opacity="0.6" />
    {/* Sweater body */}
    <path
      d="M130 90c0-28 24-46 70-46s70 18 70 46v98c0 8-6 14-14 14H144c-8 0-14-6-14-14V90Z"
      fill="#E06A4E"
    />
    {/* Collar */}
    <rect x="152" y="52" width="96" height="22" rx="11" fill="#A8432B" />
    {/* Stripes */}
    <rect x="130" y="104" width="140" height="16" fill="#F7EFE4" />
    <rect x="130" y="132" width="140" height="16" fill="#39836C" />
    <rect x="130" y="160" width="140" height="16" fill="#F7EFE4" />
    {/* Leg openings */}
    <ellipse cx="156" cy="196" rx="16" ry="12" fill="#F7EFE4" stroke="#A8432B" strokeWidth="4" />
    <ellipse cx="244" cy="196" rx="16" ry="12" fill="#F7EFE4" stroke="#A8432B" strokeWidth="4" />
    {/* Ruffle trim */}
    <path
      d="M126 202c8 0 8 12 16 12s8-12 16-12 8 12 16 12 8-12 16-12 8 12 16 12 8-12 16-12 8 12 16 12 8-12 16-12 8 12 16 12 8-12 16-12v18c0 6-4 10-10 10H136c-6 0-10-4-10-10v-18Z"
      fill="#B55861"
    />
    {/* Yarn ball + hook */}
    <circle cx="330" cy="210" r="26" fill="#F2C9CD" stroke="#B55861" strokeWidth="3" />
    <path d="M310 198c12 6 28 6 40 0M308 210c14 8 30 8 44 0M310 222c12 6 28 6 40 0" stroke="#B55861" strokeWidth="2.5" fill="none" />
    <path d="M60 80l90 60" stroke="#967767" strokeWidth="5" strokeLinecap="round" />
    <circle cx="64" cy="76" r="7" fill="#DFCDB4" stroke="#967767" strokeWidth="3" />
  </svg>
);

const ReindeerSnoodArt: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 400 300"
    className={className}
    role="presentation"
    aria-hidden="true"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="400" height="300" fill="#F7EFE4" />
    <circle cx="70" cy="54" r="64" fill="#DEF1EA" opacity="0.6" />
    <circle cx="340" cy="250" r="72" fill="#FADFD8" opacity="0.5" />
    {/* Antlers */}
    <path
      d="M150 118c-6-28-26-40-40-42m40 42c0-26-14-38-30-44m30 60c-10-18-28-26-42-24M250 118c6-28 26-40 40-42m-40 42c0-26 14-38 30-44m-30 60c10-18 28-26 42-24"
      stroke="#7B5D4E"
      strokeWidth="9"
      strokeLinecap="round"
      fill="none"
    />
    {/* Ears */}
    <ellipse cx="148" cy="140" rx="20" ry="13" transform="rotate(-25 148 140)" fill="#967767" />
    <ellipse cx="252" cy="140" rx="20" ry="13" transform="rotate(25 252 140)" fill="#967767" />
    <ellipse cx="148" cy="140" rx="10" ry="6" transform="rotate(-25 148 140)" fill="#F2C9CD" />
    <ellipse cx="252" cy="140" rx="10" ry="6" transform="rotate(25 252 140)" fill="#F2C9CD" />
    {/* Snood tube */}
    <path
      d="M130 150c0-24 32-40 70-40s70 16 70 40v52c0 22-32 36-70 36s-70-14-70-36v-52Z"
      fill="#E06A4E"
    />
    <rect x="130" y="168" width="140" height="14" fill="#F7EFE4" opacity="0.9" />
    <rect x="130" y="196" width="140" height="14" fill="#BFE4D7" />
    {/* Face opening */}
    <ellipse cx="200" cy="236" rx="34" ry="18" fill="#FDF9F3" stroke="#A8432B" strokeWidth="4" />
    {/* Nose */}
    <circle cx="200" cy="236" r="9" fill="#C8563B" />
    {/* Snowflakes */}
    <circle cx="66" cy="180" r="4" fill="#DFCDB4" />
    <circle cx="344" cy="120" r="4" fill="#DFCDB4" />
    <circle cx="92" cy="230" r="3" fill="#DFCDB4" />
    <circle cx="320" cy="180" r="3" fill="#DFCDB4" />
  </svg>
);

export const ProductArt: React.FC<ProductArtProps> = ({
  variant,
  className = '',
  title,
}) => {
  const art =
    variant === 'reindeer-snood' ? (
      <ReindeerSnoodArt className={className} />
    ) : (
      <RuffleCoatArt className={className} />
    );

  if (!title) return art;

  return (
    <div role="img" aria-label={title} className={className}>
      {art}
    </div>
  );
};
