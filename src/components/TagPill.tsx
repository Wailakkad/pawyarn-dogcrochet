import React from 'react';

interface TagPillProps {
  tag: string;
  active?: boolean;
  onClick?: (tag: string) => void;
  variant?: 'filter' | 'inline';
  count?: number;
}

export const TagPill: React.FC<TagPillProps> = ({
  tag,
  active = false,
  onClick,
  variant = 'filter',
  count,
}) => {
  const formattedLabel = tag.replace(/-/g, ' ');

  if (variant === 'inline' && !onClick) {
    return (
      <span className="text-xs font-medium text-brown-600 whitespace-nowrap">
        #{formattedLabel}
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onClick && onClick(tag)}
      className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500 ${
        active
          ? 'bg-brown-900 text-cream-50 shadow-xs'
          : 'bg-cream-100 text-brown-700 hover:bg-cream-200/80 hover:text-brown-900'
      }`}
    >
      <span>#{formattedLabel}</span>
      {typeof count === 'number' && (
        <span
          className={`tabular-nums text-[11px] ${
            active ? 'text-cream-200' : 'text-brown-500'
          }`}
        >
          ({count})
        </span>
      )}
    </button>
  );
};
