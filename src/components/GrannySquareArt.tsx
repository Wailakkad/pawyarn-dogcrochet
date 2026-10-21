import React from 'react';

interface GrannySquareArtProps {
  className?: string;
  title?: string;
}

const PALETTE = [
  { ring: '#E06A4E', mid: '#F2C9CD', core: '#F7EFE4' },
  { ring: '#39836C', mid: '#FDF2EF', core: '#DEF1EA' },
  { ring: '#B55861', mid: '#F7EFE4', core: '#F2C9CD' },
  { ring: '#7B5D4E', mid: '#DEF1EA', core: '#FDF9F3' },
  { ring: '#E06A4E', mid: '#BFE4D7', core: '#FDF2EF' },
  { ring: '#39836C', mid: '#F2C9CD', core: '#F7EFE4' },
  { ring: '#B55861', mid: '#FDF2EF', core: '#DEF1EA' },
  { ring: '#967767', mid: '#FADFD8', core: '#FDF9F3' },
  { ring: '#E06A4E', mid: '#F7EFE4', core: '#BFE4D7' },
];

const GrannySquare: React.FC<{ colors: (typeof PALETTE)[number]; index: number }> = ({
  colors,
  index,
}) => (
  <svg
    viewBox="0 0 100 100"
    className="h-full w-full"
    role="presentation"
    aria-hidden="true"
    style={{ transform: `rotate(${(index % 3) - 1}deg)` }}
  >
    <rect x="0" y="0" width="100" height="100" rx="6" fill={colors.core} />
    <rect x="14" y="14" width="72" height="72" rx="5" fill={colors.mid} />
    <rect x="28" y="28" width="44" height="44" rx="4" fill={colors.ring} />
    <rect x="40" y="40" width="20" height="20" rx="3" fill={colors.core} />
    <circle cx="50" cy="50" r="5" fill={colors.ring} />
  </svg>
);

/**
 * Hand-drawn-style granny square grid used as an on-brand placeholder for the
 * guide's real granny-square close-up photography.
 */
export const GrannySquareArt: React.FC<GrannySquareArtProps> = ({
  className = '',
  title = 'Colorful floral granny squares used in the dog sweater pattern',
}) => (
  <div
    className={`grid grid-cols-3 gap-2.5 rounded-2xl border border-cream-200 bg-cream-100 p-4 shadow-sm sm:gap-3 sm:p-5 ${className}`}
    role="img"
    aria-label={title}
  >
    {PALETTE.map((colors, index) => (
      <GrannySquare key={index} colors={colors} index={index} />
    ))}
  </div>
);
