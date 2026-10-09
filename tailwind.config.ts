import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Plus Jakarta Sans', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        cream: {
          50: '#FDF9F3',
          100: '#F7EFE4',
          200: '#ECE0CE',
          300: '#DFCDB4',
        },
        brown: {
          500: '#967767',
          600: '#7B5D4E',
          700: '#63493C',
          800: '#4E382E',
          900: '#3B2A22',
        },
        coral: {
          50: '#FDF2EF',
          100: '#FADFD8',
          500: '#E06A4E',
          600: '#C8563B',
          700: '#A8432B',
        },
        mint: {
          50: '#F1F9F6',
          100: '#DEF1EA',
          200: '#BFE4D7',
          600: '#39836C',
          700: '#296653',
        },
        blush: {
          50: '#FDF4F5',
          100: '#F9E3E5',
          200: '#F2C9CD',
          600: '#B55861',
        },
      },
    },
  },
  plugins: [],
};

export default config;
