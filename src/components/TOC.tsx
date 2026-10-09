import React from 'react';
import { TOCItem } from '../lib/blog';
import { CrochetHookIcon } from './Icons';

interface TOCProps {
  items: TOCItem[];
}

export const TOC: React.FC<TOCProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  const handleJump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <nav
      aria-label="Table of Contents"
      className="rounded-2xl border border-cream-200 bg-cream-100/60 p-5"
    >
      <div className="flex items-center gap-2.5 border-b border-cream-200 pb-3">
        <span className="text-coral-600">
          <CrochetHookIcon size={18} />
        </span>
        <h2 className="font-display text-sm font-semibold text-brown-900">
          In This Guide
        </h2>
      </div>
      <ol className="mt-3.5 space-y-2 text-xs sm:text-sm">
        {items.map((item) => (
          <li
            key={item.id}
            className={item.level === 3 ? 'pl-4 text-brown-600' : 'font-medium text-brown-800'}
          >
            <a
              href={`#${item.id}`}
              onClick={(e) => handleJump(e, item.id)}
              className="block py-0.5 transition-colors hover:text-coral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500"
            >
              {item.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
};
