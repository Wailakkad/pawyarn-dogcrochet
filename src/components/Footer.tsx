import React from 'react';
import { Container } from './Container';
import { PawIcon, YarnIcon, BoneIcon } from './Icons';

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenNextjsBlueprint?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenNextjsBlueprint }) => {
  const handleNav = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    onNavigate(path);
  };

  return (
    <footer className="mt-20 border-t border-cream-200 bg-cream-100/70 text-brown-800">
      <Container className="py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          {/* Brand Column */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-coral-100 text-coral-600">
                <PawIcon size={18} />
              </span>
              <span className="font-display text-xl font-bold text-brown-900">
                Paw &amp; Yarn
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-brown-700">
              Crochet Dog Patterns — Beginner-friendly, comfort-first dog crochet guides, accurate measuring charts, and cozy seasonal makes for pups of every shape.
            </p>
            <div className="mt-5 flex items-center gap-3 text-brown-500">
              <YarnIcon size={18} />
              <span className="text-xs text-brown-600">Crafted for pet comfort and joyful stitching</span>
              <BoneIcon size={18} />
            </div>
          </div>

          {/* Site Navigation */}
          <div className="md:col-span-3">
            <h2 className="font-display text-sm font-semibold text-brown-900">Explore</h2>
            <ul className="mt-3 space-y-2.5 text-sm text-brown-700">
              <li>
                <a
                  href="/"
                  onClick={(e) => handleNav(e, '/')}
                  className="transition-colors hover:text-coral-600"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleNav(e, '/about')}
                  className="transition-colors hover:text-coral-600"
                >
                  About Paw &amp; Yarn
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  onClick={(e) => handleNav(e, '/blog')}
                  className="transition-colors hover:text-coral-600"
                >
                  All Crochet Guides
                </a>
              </li>
              <li>
                <a
                  href="/blog/crochet-dog-sweater-measuring-guide"
                  onClick={(e) => handleNav(e, '/blog/crochet-dog-sweater-measuring-guide')}
                  className="transition-colors hover:text-coral-600"
                >
                  Dog Sweater Size Chart
                </a>
              </li>
              <li>
                <a
                  href="/blog/crochet-dog-halloween-costume-ideas"
                  onClick={(e) => handleNav(e, '/blog/crochet-dog-halloween-costume-ideas')}
                  className="transition-colors hover:text-coral-600"
                >
                  Halloween Costume Ideas
                </a>
              </li>
            </ul>
          </div>

          {/* Feeds & Resources */}
          <div className="md:col-span-4">
            <h2 className="font-display text-sm font-semibold text-brown-900">
              SEO &amp; Syndication
            </h2>
            <ul className="mt-3 space-y-2.5 text-sm text-brown-700">
              <li>
                <a
                  href="/rss.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-coral-600"
                >
                  RSS Feed (/rss.xml)
                </a>
              </li>
              <li>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-coral-600"
                >
                  XML Sitemap (/sitemap.xml)
                </a>
              </li>
              <li>
                <a
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-coral-600"
                >
                  Robots Configuration (/robots.txt)
                </a>
              </li>
              {onOpenNextjsBlueprint && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenNextjsBlueprint}
                    className="text-left font-medium text-mint-700 underline underline-offset-4 transition-colors hover:text-coral-600"
                  >
                    View Full Next.js App Router Export &amp; Run Guide
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Pet Safety Disclaimer & Copyright */}
        <div className="mt-10 border-t border-cream-200 pt-8">
          <div className="rounded-2xl border border-cream-200 bg-cream-50/90 p-4 text-xs leading-relaxed text-brown-700">
            <strong className="font-semibold text-brown-900">Pet Safety Disclaimer:</strong>{' '}
            Always supervise pets while they are wearing handmade crochet sweaters, hoods, bandanas, or costume accessories. Ensure every garment allows full range of leg movement, unobstructed breathing, and at least two fingers of slack at the neck and chest. Never leave pets unattended in garments with ties, buttons, or small decorative parts.
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-4 text-xs text-brown-600 sm:flex-row sm:items-center">
            <p>&copy; {new Date().getFullYear()} Paw &amp; Yarn. All rights reserved.</p>
            <p>Contact: hello@pawandyarn.com</p>
          </div>
        </div>
      </Container>
    </footer>
  );
};
