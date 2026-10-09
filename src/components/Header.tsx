import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Container } from './Container';

interface HeaderProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Blog', path: '/blog' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigate(path);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-cream-200/90 bg-cream-50/95 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="/"
          onClick={(e) => handleNav(e, '/')}
          className="font-display text-xl font-bold tracking-tight text-brown-900 transition-colors hover:text-coral-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral-500"
        >
          Paw &amp; Yarn
        </a>

        {/* Zone 2: Clean navigation links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-brown-700"
        >
          {navItems.map((item) => {
            const active = isActive(item.path);
            return (
              <a
                key={item.path}
                href={item.path}
                onClick={(e) => handleNav(e, item.path)}
                aria-current={active ? 'page' : undefined}
                className={`relative py-1 transition-colors whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral-500 ${
                  active
                    ? 'font-semibold text-brown-900 after:absolute after:right-0 after:bottom-0 after:left-0 after:h-0.5 after:rounded-full after:bg-coral-500'
                    : 'hover:text-brown-900'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Primary action */}
        <div className="flex items-center gap-3">
          <a
            href="/blog/crochet-dog-sweater-measuring-guide"
            onClick={(e) => handleNav(e, '/blog/crochet-dog-sweater-measuring-guide')}
            className="hidden sm:inline-flex items-center justify-center rounded-xl bg-coral-500 px-4 py-2 text-xs font-semibold text-white transition-colors duration-150 hover:bg-coral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500 whitespace-nowrap shrink-0"
          >
            Measuring Guide
          </a>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-cream-200 text-brown-800 transition-colors hover:bg-cream-100 md:hidden"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="border-t border-cream-200 bg-cream-50 px-5 py-4 md:hidden">
          <nav aria-label="Mobile Navigation" className="flex flex-col gap-2">
            {navItems.map((item) => {
              const active = isActive(item.path);
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleNav(e, item.path)}
                  className={`rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-cream-100 font-semibold text-coral-600'
                      : 'text-brown-800 hover:bg-cream-100/60'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <a
              href="/blog/crochet-dog-sweater-measuring-guide"
              onClick={(e) => handleNav(e, '/blog/crochet-dog-sweater-measuring-guide')}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-coral-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral-600"
            >
              Start Here (Measuring Guide)
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
