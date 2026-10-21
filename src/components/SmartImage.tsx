import React, { useState } from 'react';

interface SmartImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  /** Preferred image path (e.g. a new guide-specific photo once added). */
  src: string;
  /** Existing brand photo shown if `src` is missing, so the page never breaks. */
  fallbackSrc: string;
  alt: string;
}

/**
 * Responsive image that silently falls back to an existing brand photo if the
 * preferred asset has not been added yet, preventing broken-image placeholders
 * while the guide-specific photography is being prepared.
 */
export const SmartImage: React.FC<SmartImageProps> = ({ src, fallbackSrc, alt, ...props }) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <img
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
      {...props}
    />
  );
};
