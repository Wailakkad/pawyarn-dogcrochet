import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { BlogPost } from '../lib/blog';
import { Container } from '../components/Container';
import { PostCard } from '../components/PostCard';
import { SEOHead } from '../components/SEOHead';
import {
  PawIcon,
  YarnIcon,
  BoneIcon,
  CrochetHookIcon,
  StarIcon,
  PinterestIcon,
} from '../components/Icons';

interface HomePageProps {
  posts: BlogPost[];
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ posts, onNavigate }) => {
  const [heroImgError, setHeroImgError] = useState(false);
  const [pinterestSaved, setPinterestSaved] = useState(false);

  const featuredPosts = posts.slice(0, 2);

  const categories = [
    {
      title: 'Crochet Dog Sweaters',
      description:
        'Step-by-step measuring guides, ribbed turtlenecks, and custom chest-fit tips for toy to large breeds.',
      status: 'Available Now',
      available: true,
      href: '/blog?tag=sweaters',
      icon: <YarnIcon size={22} />,
      accentClass: 'bg-coral-50 border-coral-100 text-coral-600',
    },
    {
      title: 'Crochet Dog Halloween Costumes',
      description:
        '15 modular, lightweight DIY costume pieces including pumpkin snoods, bat wings, and ruffled collars.',
      status: 'Available Now',
      available: true,
      href: '/blog?tag=halloween',
      icon: <StarIcon size={20} />,
      accentClass: 'bg-mint-50 border-mint-100 text-mint-700',
    },
    {
      title: 'Crochet Dog Hats & Snoods',
      description:
        'Ear-friendly winter warmers and stay-put ribbed snoods with comfortable ear openings.',
      status: 'Coming Soon',
      available: false,
      href: '/blog',
      icon: <CrochetHookIcon size={22} />,
      accentClass: 'bg-blush-50 border-blush-100 text-blush-600',
    },
    {
      title: 'Crochet Dog Bandanas',
      description:
        'Quick one-skein collar slide bandanas and reversible granny-stitch neck kerchiefs.',
      status: 'Coming Soon',
      available: false,
      href: '/blog',
      icon: <BoneIcon size={22} />,
      accentClass: 'bg-cream-100 border-cream-200 text-brown-700',
    },
  ];

  const whyPoints = [
    {
      number: '01.',
      title: 'Simple, Stress-Free Sizing Tips',
      description:
        'No confusing garment math. Every guide uses three standing measurements—neck, chest girth, and spine length—so you can adapt patterns to Dachshunds, Frenchies, or mixed rescues.',
    },
    {
      number: '02.',
      title: 'Comfort-First Pet Construction',
      description:
        'We design with generous front leg openings, stretchy ribbed necklines, and breathable stitch textures so your dog can walk, nap, and play naturally.',
    },
    {
      number: '03.',
      title: 'Photo-Friendly Seasonal Makes',
      description:
        'From autumn pumpkin patches to cozy living room portraits, our color palettes and textured stitches look crisp and charming in photos and Pinterest boards.',
    },
    {
      number: '04.',
      title: 'Practical, Washable Yarn Advice',
      description:
        'Dogs roll in leaves and puddles. We focus on soft, machine-washable cotton and anti-pilling acrylic yarns that hold their shape wash after wash.',
    },
  ];

  return (
    <>
      <SEOHead
        title="Paw & Yarn — Crochet Dog Patterns, Sweater Sizing & DIY Ideas"
        description="Beginner-friendly, cute, practical dog crochet ideas. Learn how to measure your dog for a crochet sweater and explore 15 DIY crochet dog Halloween costumes."
        canonicalPath="/"
      />

      {/* 1) Hero Section */}
      <section className="relative overflow-hidden border-b border-cream-200/80 pt-10 pb-16 sm:pt-16 sm:pb-24">
        {/* Soft organic SVG background blob */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-coral-100/45 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 -left-20 h-80 w-80 rounded-full bg-mint-100/50 blur-3xl"
        />

        <Container>
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-coral-600">
                <PawIcon size={16} />
                <span>Cozy Patterns &amp; Practical Pet Fit Guides</span>
              </div>

              <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-brown-900 sm:text-5xl lg:text-[3.35rem] lg:leading-[1.12]">
                Crochet Dog Patterns
              </h1>

              <p className="mt-5 max-w-xl text-base leading-relaxed text-brown-700 sm:text-lg">
                Beginner-friendly, cute, practical dog crochet ideas designed around real canine proportions, soft washable yarns, and stress-free sizing.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a
                  href="/blog"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blog');
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-coral-500 px-6 py-3.5 text-sm font-semibold text-white shadow-xs transition-colors duration-150 hover:bg-coral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500 whitespace-nowrap"
                >
                  <span>Explore Blog</span>
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href="/blog/crochet-dog-sweater-measuring-guide"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/blog/crochet-dog-sweater-measuring-guide');
                  }}
                  className="inline-flex items-center gap-2 rounded-xl border border-brown-800/20 bg-white px-6 py-3.5 text-sm font-semibold text-brown-900 transition-colors duration-150 hover:border-brown-800/40 hover:bg-cream-100/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500 whitespace-nowrap"
                >
                  <CrochetHookIcon size={18} className="text-coral-600" />
                  <span>Start Here (Measuring Guide)</span>
                </a>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-6 border-t border-cream-200 pt-6 text-xs text-brown-600">
                <div className="flex items-center gap-2">
                  <YarnIcon size={16} className="text-mint-600" />
                  <span>Toy to Large Breed Sizing</span>
                </div>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-2">
                  <BoneIcon size={16} className="text-coral-500" />
                  <span>Tested for Leg Mobility</span>
                </div>
                <span aria-hidden="true">·</span>
                <div className="flex items-center gap-2">
                  <StarIcon size={14} className="text-blush-600" />
                  <span>Step-by-Step Beginner Guides</span>
                </div>
              </div>
            </div>

            {/* Hero Image with Organic Rounded Shape */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="overflow-hidden rounded-[2rem] border border-cream-200 bg-white p-3 shadow-xs">
                  <div className="relative aspect-4/3 overflow-hidden rounded-[1.5rem] bg-cream-100">
                    {!heroImgError ? (
                      <img
                        src="/images/hero-crochet-dog.jpg"
                        alt="Happy small dog wearing a handmade cream and coral crochet dog sweater beside soft yarn balls and a wooden crochet hook"
                        referrerPolicy="no-referrer"
                        onError={() => setHeroImgError(true)}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-cream-100 via-coral-50 to-mint-50 p-8 text-center">
                        <PawIcon size={44} className="text-coral-500" />
                        <p className="mt-3 font-display text-base font-semibold text-brown-900">
                          Paw &amp; Yarn Studio
                        </p>
                      </div>
                    )}
                  </div>
                  <div className="mt-3 flex items-center justify-between px-2 py-1 text-xs text-brown-600">
                    <span className="font-medium text-brown-800">
                      Featured Make: Ribbed Collar Pullover
                    </span>
                    <span className="font-mono tabular-nums text-coral-600">
                      Worsted #4 Yarn
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2) Featured Posts Section */}
      <section className="py-16 sm:py-20" aria-labelledby="featured-posts-heading">
        <Container>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold text-coral-600">Starter Pattern Guides</p>
              <h2
                id="featured-posts-heading"
                className="mt-1 font-display text-3xl font-bold text-brown-900"
              >
                Featured Posts
              </h2>
            </div>
            <a
              href="/blog"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/blog');
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-brown-800 transition-colors hover:text-coral-600 whitespace-nowrap"
            >
              <span>View all guides</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} onNavigate={onNavigate} />
            ))}
          </div>
        </Container>
      </section>

      {/* 3) Categories / Topics Section */}
      <section
        className="border-y border-cream-200/80 bg-cream-100/50 py-16 sm:py-20"
        aria-labelledby="categories-heading"
      >
        <Container>
          <div className="max-w-2xl">
            <p className="text-xs font-semibold text-mint-700">Browse by Topic</p>
            <h2
              id="categories-heading"
              className="mt-1 font-display text-3xl font-bold text-brown-900"
            >
              Categories &amp; Pattern Topics
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-brown-700">
              Start with our foundational dog sweater measuring guide or explore seasonal costume pieces you can crochet in a single evening.
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((cat) => (
              <div
                key={cat.title}
                className="flex flex-col justify-between rounded-2xl border border-cream-200 bg-white p-6 transition-colors hover:border-coral-500/40"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border ${cat.accentClass}`}
                    >
                      {cat.icon}
                    </span>
                    <span
                      className={`text-xs font-medium ${
                        cat.available ? 'text-mint-700' : 'text-brown-500'
                      }`}
                    >
                      {cat.status}
                    </span>
                  </div>

                  <h3 className="mt-5 font-display text-lg font-semibold text-brown-900">
                    {cat.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-brown-700">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-cream-100">
                  {cat.available ? (
                    <a
                      href={cat.href}
                      onClick={(e) => {
                        e.preventDefault();
                        onNavigate(cat.href);
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-coral-600 transition-colors hover:text-coral-700"
                    >
                      <span>Explore Topic</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  ) : (
                    <span className="text-xs font-medium text-brown-500">
                      Pattern testing in progress
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* 4) Why Paw & Yarn Section */}
      <section className="py-16 sm:py-20" aria-labelledby="why-paw-yarn-heading">
        <Container>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-coral-600">
                <BoneIcon size={16} />
                <span>Our Design Philosophy</span>
              </div>
              <h2
                id="why-paw-yarn-heading"
                className="mt-2 font-display text-3xl font-bold text-brown-900"
              >
                Why Paw &amp; Yarn
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-brown-700">
                Every tutorial on Paw &amp; Yarn is written to solve the biggest frustration in pet crochet: sweaters that twist, sag, or pinch your dog&apos;s front legs.
              </p>
              <div className="mt-6">
                <a
                  href="/about"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate('/about');
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-brown-900 underline underline-offset-4 hover:text-coral-600"
                >
                  <span>Read our full brand story &amp; safety standards</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:col-span-8">
              {whyPoints.map((point) => (
                <div
                  key={point.number}
                  className="rounded-2xl border border-cream-200 bg-white p-6"
                >
                  <span className="font-mono text-xs font-semibold text-coral-600 tabular-nums">
                    {point.number}
                  </span>
                  <h3 className="mt-2 font-display text-lg font-semibold text-brown-900">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-brown-700">
                    {point.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* 5) Pinterest Growth CTA Section */}
      <section className="pb-8" aria-labelledby="pinterest-cta-heading">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-blush-200 bg-gradient-to-r from-blush-50 via-cream-100 to-coral-50 p-8 sm:p-12">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-blush-600">
                  <PinterestIcon size={18} />
                  <span>Pinterest Pattern Community</span>
                </div>
                <h2
                  id="pinterest-cta-heading"
                  className="mt-2 font-display text-2xl font-bold text-brown-900 sm:text-3xl"
                >
                  Save ideas for later — new pins weekly
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-brown-700">
                  Building a crochet queue for chilly walks or autumn pet parades? Pin our size charts and 15 DIY Halloween costume ideas directly to your crochet boards.
                </p>
              </div>

              <div className="flex flex-col items-start gap-2 sm:items-end">
                <a
                  href="#follow-pinterest"
                  onClick={(e) => {
                    e.preventDefault();
                    setPinterestSaved(true);
                  }}
                  className="inline-flex items-center gap-2.5 rounded-xl bg-brown-900 px-6 py-3.5 text-sm font-semibold text-cream-50 transition-colors hover:bg-brown-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brown-900 whitespace-nowrap shrink-0"
                >
                  {pinterestSaved ? (
                    <>
                      <Check className="h-4 w-4 text-mint-200" />
                      <span>Pinterest Board Handle: @pawandyarn</span>
                    </>
                  ) : (
                    <>
                      <PinterestIcon size={18} />
                      <span>Follow on Pinterest</span>
                    </>
                  )}
                </a>
                <span className="text-xs text-brown-600">
                  {pinterestSaved
                    ? 'Tip: Open any blog guide below to grab ready-to-pin step summaries.'
                    : 'Fresh sizing charts, stitch swatches, and seasonal dog patterns every week.'}
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
