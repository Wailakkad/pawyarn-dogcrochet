import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}

export const PawIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <ellipse cx="7" cy="7.5" rx="2.1" ry="2.7" transform="rotate(-18 7 7.5)" fill="currentColor" />
    <ellipse cx="11.8" cy="5.8" rx="2" ry="2.6" transform="rotate(-5 11.8 5.8)" fill="currentColor" />
    <ellipse cx="16.6" cy="7.2" rx="2" ry="2.6" transform="rotate(14 16.6 7.2)" fill="currentColor" />
    <ellipse cx="19.2" cy="11.5" rx="1.8" ry="2.4" transform="rotate(30 19.2 11.5)" fill="currentColor" />
    <path
      d="M12.2 10.5C9.6 10.5 7.2 12.6 6.6 15.1C6.1 17.2 7.5 19.2 9.6 19.2C10.7 19.2 11.5 18.7 12.4 18.7C13.3 18.7 14.1 19.2 15.2 19.2C17.3 19.2 18.7 17.2 18.2 15.1C17.6 12.6 14.8 10.5 12.2 10.5Z"
      fill="currentColor"
    />
  </svg>
);

export const YarnIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <circle cx="11.5" cy="12.5" r="7.5" />
    <path d="M6.2 9.2C8.8 7.5 12.5 7.8 15.8 10.5" />
    <path d="M5.2 13.2C8.5 11.2 12.8 11.8 16.5 15" />
    <path d="M11.5 5C13.8 7.5 14.5 11.5 13.2 15.5" />
    <path d="M8.5 18.2C10.5 15.8 14.2 14.2 18.2 14.5" />
    <path d="M16.8 17.8C18.5 19.2 20.5 19.5 21.8 18.2" />
  </svg>
);

export const BoneIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M17.2 6.8C18.5 5.5 20.5 5.5 21.5 6.5C22.5 7.5 22.5 9.5 21.2 10.8C20.6 11.4 19.8 11.7 19 11.7C19.8 12.3 20.1 13.4 19.7 14.4C19.2 15.7 17.6 16.3 16.3 15.8C15.5 15.5 14.9 14.9 14.6 14.1L9.9 16.6C10.2 17.4 10 18.3 9.4 19C8.3 20.2 6.4 20.3 5.2 19.2C4 18.1 3.9 16.2 5 15C5.6 14.4 6.4 14.1 7.2 14.1C6.4 13.5 6.1 12.4 6.5 11.4C7 10.1 8.6 9.5 9.9 10C10.7 10.3 11.3 10.9 11.6 11.7L16.3 9.2C16 8.4 16.2 7.5 16.8 6.8" />
  </svg>
);

export const CrochetHookIcon: React.FC<IconProps> = ({ size = 24, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M4.5 19.5L16.5 7.5" />
    <path d="M16.5 7.5L19.2 4.8C19.9 4.1 21 4.1 21.5 4.8C22 5.4 21.8 6.4 21.1 7.1L19.5 8.7L18.2 7.8" />
    <circle cx="8" cy="16" r="1" fill="currentColor" />
  </svg>
);

export const StarIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M12 2.5L14.4 9.1L21 11.5L14.4 13.9L12 20.5L9.6 13.9L3 11.5L9.6 9.1L12 2.5Z" />
  </svg>
);

export const PinterestIcon: React.FC<IconProps> = ({ size = 20, className = '', ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    className={className}
    {...props}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12C2 16.24 4.64 19.86 8.38 21.31C8.3 20.52 8.21 19.3 8.42 18.43L9.66 13.18C9.66 13.18 9.35 12.55 9.35 11.62C9.35 10.15 10.2 9.05 11.26 9.05C12.16 9.05 12.6 9.73 12.6 10.54C12.6 11.45 12.02 12.81 11.72 14.07C11.47 15.13 12.25 15.99 13.3 15.99C15.2 15.99 16.66 13.99 16.66 11.1C16.66 8.54 14.82 6.75 12.2 6.75C9.16 6.75 7.38 9.03 7.38 11.39C7.38 12.31 7.73 13.3 8.18 13.84C8.27 13.95 8.28 14.04 8.25 14.16L7.95 15.38C7.9 15.58 7.79 15.63 7.58 15.53C6.2 14.89 5.34 12.88 5.34 11.27C5.34 7.8 7.86 4.61 12.61 4.61C16.43 4.61 19.4 7.33 19.4 10.97C19.4 14.77 17.01 17.83 13.69 17.83C12.57 17.83 11.52 17.25 11.16 16.57L10.47 19.2C10.22 20.16 9.55 21.36 9.1 22.09C10.03 22.36 11 22.5 12 22.5C17.52 22.5 22 18.02 22 12.5C22 6.98 17.52 2 12 2Z" />
  </svg>
);
