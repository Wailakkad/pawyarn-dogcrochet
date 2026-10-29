import React from 'react';
import { Check } from 'lucide-react';

interface ProductBadgesItem {
  label: string;
  value: string;
}

interface ProductBadgesProps {
  items: ProductBadgesItem[];
  className?: string;
}

export const ProductBadges: React.FC<ProductBadgesProps> = ({ items, className = '' }) => {
  if (items.length === 0) return null;

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`} aria-label="Product details">
      {items.map((item) => (
        <li
          key={`${item.label}-${item.value}`}
          className="inline-flex items-center gap-1.5 rounded-full border border-cream-200 bg-cream-100/80 px-3 py-1.5 text-xs text-brown-800"
        >
          <Check className="h-3.5 w-3.5 shrink-0 text-mint-600" aria-hidden="true" />
          <span className="font-medium text-brown-900">{item.label}:</span>
          <span>{item.value}</span>
        </li>
      ))}
    </ul>
  );
};
