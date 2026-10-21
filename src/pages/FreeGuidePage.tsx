import React, { useEffect } from 'react';
import {
  BookOpen,
  Check,
  Flower2,
  ListChecks,
  Palette,
  Ruler,
  Scissors,
} from 'lucide-react';
import { Container } from '../components/Container';
import { SEOHead } from '../components/SEOHead';
import { SmartImage } from '../components/SmartImage';
import { GrannySquareArt } from '../components/GrannySquareArt';
import { LeadMagnetForm } from '../components/LeadMagnetForm';
import { PawIcon } from '../components/Icons';
import { trackEvent } from '../lib/analytics';
import { useLeadMagnet } from '../lib/useLeadMagnet';
import { guideImages, PINTEREST_PIN_IMAGE } from '../lib/guideImages';

interface FreeGuidePageProps {
  onNavigate: (path: string) => void;
}

const BENEFITS = [
  { icon: BookOpen, text: 'Step-by-step crochet instructions' },
  { icon: Flower2, text: 'Beautiful floral granny square pattern' },
  { icon: Palette, text: 'Three color combination ideas' },
  { icon: Ruler, text: 'Small, medium, and large sizing information' },
  { icon: ListChecks, text: 'Materials and tools checklist' },
  { icon: Scissors, text: 'Sweater assembly and finishing guidance' },
] as const;

const STEPS = [
  {
    number: '01',
    title: 'Crochet Your Granny Squares',
    description: 'Follow the pattern to create beautiful floral granny squares.',
  },
  {
    number: '02',
    title: 'Assemble the Sweater',
    description: 'Learn how to join the squares and build the sweater structure.',
  },
  {
    number: '03',
    title: 'Add the Finishing Touches',
    description: 'Complete the neck closure and finishing details.',
  },
] as const;

export const FreeGuidePage: React.FC<FreeGuidePageProps> = ({ onNavigate }) => {
  const lead = useLeadMagnet();

  useEffect(() => {
    trackEvent('landing_page_view', {
      utm_source: new URLSearchParams(window.location.search).get('utm_source') ?? '',
      utm_campaign: new URLSearchParams(window.location.search).get('utm_campaign') ?? '',
    });
  }, []);

  const handleHomeNav = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate('/');
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Free Crochet Dog Sweater Pattern PDF',
    description:
      'Download a free crochet dog sweater pattern PDF featuring colorful granny squares, step-by-step instructions, and sizing guidance for three dog sizes.',
    url: 'https://pawandyarn.com/free-crochet-dog-sweater-pattern',
    image: PINTEREST_PIN_IMAGE,
    inLanguage: 'en',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Paw & Yarn',
      url: 'https://pawandyarn.com/',
    },
    mainEntity: {
      '@type': 'DigitalDocument',
      name: 'Granny Square Dog Sweater — Free Crochet Pattern PDF',
      description:
        'Illustrated crochet guide with floral granny squares, step-by-step instructions, three color ideas, and small, medium, and large sizing guidance.',
      fileFormat: 'application/pdf',
      encodingFormat: 'application/pdf',
    },
  };

  return (
    <>
      <SEOHead
        title="Free Crochet Dog Sweater Pattern PDF | Paw & Yarn"
        description="Download a free crochet dog sweater pattern PDF featuring colorful granny squares, step-by-step instructions, and sizing guidance for three dog sizes."
        canonicalPath="/free-crochet-dog-sweater-pattern"
        ogType="website"
        ogImage={PINTEREST_PIN_IMAGE}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Minimal branded header — no nav links to distract from the signup goal. */}
      <header className="border-b border-cream-200/90 bg-cream-50/95">
        <Container className="flex h-14 items-center justify-between sm:h-16">
          <a
            href="/"
            onClick={handleHomeNav}
            className="font-display text-lg font-bold tracking-tight text-brown-900 transition-colors hover:text-coral-600 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-coral-500 sm:text-xl"
          >
            Paw &amp; Yarn
          </a>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wide text-coral-600 sm:text-xs">
            <PawIcon size={14} />
            <span className="hidden sm:inline">Free Crochet Pattern</span>
            <span className="sm:hidden">Free Pattern</span>
          </span>
        </Container>
      </header>

      <main>
        {/* ============================================ */}
        {/* SECTION 1 — Hero + Email Signup              */}
        {/* ============================================ */}
        <section
          aria-labelledby="hero-heading"
          className="relative overflow-hidden border-b border-cream-200/80 pb-14 pt-10 sm:pb-20 sm:pt-14"
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-28 -right-24 h-96 w-96 rounded-full bg-coral-100/40 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-mint-100/45 blur-3xl"
          />

          <Container>
            <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-14">
              {/* Left column — copy + signup form */}
              <div className="lg:col-span-6 xl:col-span-6">
                <p className="inline-flex items-center rounded-full border border-blush-200 bg-blush-50 px-3.5 py-1.5 text-[11px] font-bold tracking-[0.14em] text-blush-600 uppercase">
                  Free Crochet Pattern PDF
                </p>

                <h1
                  id="hero-heading"
                  className="mt-5 font-display text-[2.35rem] leading-[1.1] font-bold tracking-tight text-brown-900 sm:text-5xl lg:text-[3.25rem]"
                >
                  Free Crochet Dog Sweater Pattern
                </h1>

                <p className="mt-4 font-display text-xl leading-snug text-coral-600 italic sm:text-2xl">
                  Make This Adorable Granny Square Sweater for Your Dog!
                </p>

                <p className="mt-4 max-w-xl text-base leading-relaxed text-brown-700 sm:text-lg">
                  Get our illustrated crochet guide featuring colorful granny squares,
                  step-by-step instructions, and sizing guidance for small, medium, and large
                  dogs.
                </p>

                <LeadMagnetForm
                  idPrefix="hero"
                  ctaLabel="GET MY FREE PATTERN →"
                  email={lead.email}
                  consent={lead.consent}
                  honeypot={lead.honeypot}
                  status={lead.status}
                  errorMessage={lead.errorMessage}
                  downloadUrl={lead.trackedDownloadUrl}
                  setEmail={lead.setEmail}
                  setConsent={lead.setConsent}
                  setHoneypot={lead.setHoneypot}
                  submit={lead.submit}
                />
              </div>

              {/* Right column — hero photography */}
              <div className="lg:col-span-6 xl:col-span-6">
                <div className="relative mx-auto max-w-lg lg:max-w-none">
                  <div className="overflow-hidden rounded-[1.75rem] border border-cream-200 bg-cream-100 shadow-[0_18px_50px_-24px_rgba(59,42,34,0.35)]">
                    <SmartImage
                      src={guideImages.hero.src}
                      fallbackSrc={guideImages.hero.fallback}
                      alt={guideImages.hero.alt}
                      width={1200}
                      height={900}
                      className="aspect-4/3 w-full object-cover"
                      loading="eager"
                      fetchPriority="high"
                    />
                  </div>
                  <div className="absolute -bottom-4 left-4 inline-flex items-center gap-2 rounded-full border border-cream-200 bg-white px-4 py-2 shadow-md sm:left-6">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-mint-100 text-mint-700">
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                    </span>
                    <span className="text-xs font-semibold text-brown-800">
                      3 sizes · S, M &amp; L
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        {/* ============================================ */}
        {/* SECTION 2 — Project Explanation              */}
        {/* ============================================ */}
        <section
          aria-labelledby="project-heading"
          className="border-b border-cream-200/80 bg-cream-100/50 py-16 sm:py-20"
        >
          <Container>
            <div className="mx-auto max-w-2xl text-center">
              <p className="text-xs font-bold tracking-[0.16em] text-mint-700 uppercase">
                Your Project, Step by Step
              </p>
              <h2
                id="project-heading"
                className="mt-3 font-display text-3xl leading-tight font-bold text-brown-900 sm:text-4xl"
              >
                A Beautiful Handmade Sweater, One Granny Square at a Time
              </h2>
              <p className="mt-4 text-base leading-relaxed text-brown-700 sm:text-lg">
                Discover how to turn colorful crochet granny squares into a cozy, handmade
                sweater for your furry friend.
              </p>
            </div>

            <ol className="mt-12 grid grid-cols-1 gap-10 sm:mt-14 sm:grid-cols-3 sm:gap-8">
              {STEPS.map((step, index) => (
                <li key={step.number} className="flex flex-col">
                  {index === 0 ? (
                    <GrannySquareArt className="aspect-square" />
                  ) : (
                    <div className="aspect-square overflow-hidden rounded-2xl border border-cream-200 bg-cream-100 shadow-sm">
                      <SmartImage
                        src={
                          index === 1 ? guideImages.stepAssembly.src : guideImages.stepFinishing.src
                        }
                        fallbackSrc={
                          index === 1
                            ? guideImages.stepAssembly.fallback
                            : guideImages.stepFinishing.fallback
                        }
                        alt={
                          index === 1 ? guideImages.stepAssembly.alt : guideImages.stepFinishing.alt
                        }
                        width={600}
                        height={600}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  )}

                  <div className="mt-5 flex items-baseline gap-3">
                    <span className="font-display text-2xl font-bold text-coral-500">
                      {step.number}
                    </span>
                    <h3 className="font-display text-lg leading-snug font-semibold text-brown-900 sm:text-xl">
                      {step.title}
                    </h3>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-brown-700 sm:text-base">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </Container>
        </section>

        {/* ============================================ */}
        {/* SECTION 3 — Guide Value + Final Signup      */}
        {/* ============================================ */}
        <section aria-labelledby="value-heading" className="py-16 sm:py-20">
          <Container>
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* PDF mockup */}
              <div className="order-2 lg:order-1">
                <div className="relative mx-auto max-w-sm">
                  <div
                    aria-hidden="true"
                    className="absolute top-6 -left-4 h-full w-full rounded-[1.5rem] border border-cream-200 bg-cream-200/60 shadow-sm"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute top-3 -left-2 h-full w-full rounded-[1.5rem] border border-cream-200 bg-cream-100 shadow-sm"
                  />
                  <div className="relative overflow-hidden rounded-[1.5rem] border border-cream-200 bg-white shadow-[0_20px_50px_-20px_rgba(59,42,34,0.35)]">
                    <SmartImage
                      src={guideImages.pdfCover.src}
                      fallbackSrc={guideImages.pdfCover.fallback}
                      alt={guideImages.pdfCover.alt}
                      width={600}
                      height={750}
                      className="aspect-4/5 w-full object-cover"
                      loading="lazy"
                    />
                    <div className="border-t border-cream-200 bg-white px-5 py-4">
                      <p className="text-[10px] font-bold tracking-[0.18em] text-coral-600 uppercase">
                        Paw &amp; Yarn · Free Guide
                      </p>
                      <p className="mt-1 font-display text-base leading-snug font-semibold text-brown-900">
                        Granny Square Dog Sweater Pattern
                      </p>
                      <p className="mt-1 text-xs text-brown-600">
                        Illustrated PDF · 3 sizes · Step-by-step
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div className="order-1 lg:order-2">
                <h2
                  id="value-heading"
                  className="font-display text-3xl leading-tight font-bold text-brown-900 sm:text-4xl"
                >
                  Everything You Need in One Free Crochet Guide
                </h2>

                <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {BENEFITS.map((benefit) => (
                    <li
                      key={benefit.text}
                      className="flex items-start gap-3 rounded-xl border border-cream-200 bg-cream-50 px-4 py-3.5"
                    >
                      <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-mint-100 text-mint-700">
                        <benefit.icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="text-sm leading-snug font-medium text-brown-800">
                        {benefit.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Final CTA block */}
            <div className="relative mt-16 overflow-hidden rounded-[1.75rem] border border-cream-200 bg-cream-100 px-6 py-12 sm:mt-20 sm:px-12 sm:py-14">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-24 -right-16 h-72 w-72 rounded-full bg-blush-100/60 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-mint-100/50 blur-3xl"
              />

              <div className="relative mx-auto max-w-xl text-center">
                <h2 className="font-display text-2xl leading-tight font-bold text-brown-900 sm:text-3xl">
                  Ready to Crochet Something Adorable?
                </h2>
                <p className="mt-3 text-base text-brown-700">
                  Get your free granny square dog sweater pattern PDF.
                </p>

                <div className="mt-7 text-left">
                  <LeadMagnetForm
                    idPrefix="final"
                    ctaLabel="SEND ME THE FREE PDF →"
                    email={lead.email}
                    consent={lead.consent}
                    honeypot={lead.honeypot}
                    status={lead.status}
                    errorMessage={lead.errorMessage}
                    downloadUrl={lead.trackedDownloadUrl}
                    setEmail={lead.setEmail}
                    setConsent={lead.setConsent}
                    setHoneypot={lead.setHoneypot}
                    submit={lead.submit}
                  />
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-cream-200 bg-cream-100/60">
        <Container className="flex flex-col items-center justify-between gap-3 py-8 sm:flex-row">
          <p className="font-display text-sm font-semibold text-brown-900">Paw &amp; Yarn</p>
          <p className="text-xs text-brown-600">
            © {new Date().getFullYear()} Paw &amp; Yarn. Crochet patterns made with love for
            every pup.
          </p>
        </Container>
      </footer>
    </>
  );
};
