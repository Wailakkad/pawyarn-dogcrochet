import React from 'react';
import { PawIcon, YarnIcon, PinterestIcon } from './Icons';

interface CalloutProps {
  title: string;
  children: React.ReactNode;
  variant?: 'takeaways' | 'pinterest' | 'safety';
}

export const Callout: React.FC<CalloutProps> = ({
  title,
  children,
  variant = 'takeaways',
}) => {
  const styles = {
    takeaways: {
      container: 'border-mint-200 bg-mint-50/80',
      iconWrap: 'bg-mint-100 text-mint-700',
      titleColor: 'text-brown-900',
      icon: <YarnIcon size={20} />,
    },
    pinterest: {
      container: 'border-blush-200 bg-blush-50/85',
      iconWrap: 'bg-blush-100 text-blush-600',
      titleColor: 'text-brown-900',
      icon: <PinterestIcon size={20} />,
    },
    safety: {
      container: 'border-coral-100 bg-coral-50/75',
      iconWrap: 'bg-coral-100 text-coral-600',
      titleColor: 'text-brown-900',
      icon: <PawIcon size={20} />,
    },
  }[variant];

  return (
    <aside
      aria-label={title}
      className={`my-8 rounded-2xl border p-6 ${styles.container}`}
    >
      <div className="flex items-center gap-3">
        <span
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${styles.iconWrap}`}
        >
          {styles.icon}
        </span>
        <h2 className={`font-display text-lg font-semibold ${styles.titleColor}`}>
          {title}
        </h2>
      </div>
      <div className="mt-4 text-sm leading-relaxed text-brown-800">{children}</div>
    </aside>
  );
};
