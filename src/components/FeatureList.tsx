import React from 'react';
import { Check } from 'lucide-react';

interface FeatureListProps {
  items: string[];
  className?: string;
}

export const FeatureList: React.FC<FeatureListProps> = ({ items, className = '' }) => {
  if (items.length === 0) return null;

  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-brown-800">
          <span
            aria-hidden="true"
            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mint-100 text-mint-700"
          >
            <Check className="h-3 w-3" />
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
};
