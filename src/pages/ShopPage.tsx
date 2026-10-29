import React from 'react';
import { ArrowRight, Download, ShieldCheck, Smartphone, Ruler } from 'lucide-react';
import { Container } from '../components/Container';
import { SEOHead } from '../components/SEOHead';
import { ProductCard } from '../components/ProductCard';
import { products } from '../data/products';
import { PawIcon } from '../components/Icons';

interface ShopPageProps {
  onNavigate: (path: string) => void;
}

const trustItems = [
  {
    icon: <Download className="h-5 w-5" aria-hidden="true" />,
    title: 'Instant PDF Download',
    description: 'Get your pattern right after checkout — no waiting, no shipping.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" aria-hidden="true" />,
    title: 'Secure Checkout (Payhip)',
    description: 'All payments are handled securely on Payhip’s trusted checkout.',
  },
  {
    icon: <Smartphone className="h-5 w-5" aria-hidden="true" />,
    title: 'Printable + Mobile-Friendly',
    description: 'Read on your phone at the hook or print the full PDF at home.',
  },
];

export const ShopPage: React.FC<ShopPageProps> = ({ onNavigate }) => {
  const shopJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Shop Crochet Dog Patterns — Paw & Yarn',
    description:
      'Printable PDF crochet dog patterns with easy sizing and instant download via Payhip.',
    url: typeof window !== 'undefined' ? `${window.location.origin}/shop` : 'https://pawandyarn.com/shop',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Paw & Yarn',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://pawandyarn.com',
    },
    hasPart: products.map((product) => ({
      '@type': 'Product',
      name: product.title,
      description: product.description,
      brand: { '@type': 'Brand', name: 'Paw & Yarn' },
      offers: {
        '@type': 'Offer',
        price: product.priceUSD.toFixed(2),
        priceCurrency: 'USD',
        availability: 'https://schema.org/InStock',
      },
    })),
  };

  return (
    <>
      <SEOHead
        title="Shop Crochet Dog Patterns — Printable PDFs | Paw & Yarn"
        description="Shop printable crochet dog patterns — instant PDF download via secure Payhip checkout. Easy sizing, beginner-friendly instructions, and cozy seasonal makes."
        canonicalPath="/shop"
        ogType="website"
        jsonLd={shopJsonLd}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-cream-200/80 pt-12 pb-14 sm:pt-16 sm:pb-20">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-coral-100/45 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 -left-20 h-80 w-80 rounded-full bg-mint-100/50 blur-3xl"
        />

        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-coral-600">
              <PawIcon size={16} />
              <span>Paw &amp; Yarn Pattern Shop</span>
            </div>

            <h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-brown-900 sm:text-5xl">
              Shop Crochet Dog Patterns
            </h1>

            <p className="mt-5 text-base leading-relaxed text-brown-700 sm:text-lg">
              Printable PDF patterns with easy sizing notes and clear row-by-row instructions.
              Instant download via secure Payhip checkout — stitch the same day.
            </p>
          </div>
        </Container>
      </section>

      {/* Product Grid */}
      <section className="py-14 sm:py-18" aria-labelledby="shop-products-heading">
        <Container>
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold text-mint-700">Digital Patterns</p>
              <h2
                id="shop-products-heading"
                className="mt-1 font-display text-2xl font-bold text-brown-900 sm:text-3xl"
              >
                Available Now
              </h2>
            </div>
            <p className="text-xs text-brown-600">
              All prices in USD · Instant download after checkout
            </p>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} onNavigate={onNavigate} />
            ))}
          </div>
        </Container>
      </section>

      {/* Trust Strip */}
      <section
        className="border-y border-cream-200/80 bg-cream-100/50 py-12 sm:py-14"
        aria-labelledby="shop-trust-heading"
      >
        <Container>
          <h2 id="shop-trust-heading" className="sr-only">
            Why shop with Paw &amp; Yarn
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {trustItems.map((item) => (
              <div key={item.title} className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-mint-100 bg-mint-50 text-mint-700">
                  {item.icon}
                </span>
                <div>
                  <h3 className="font-display text-base font-semibold text-brown-900">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-brown-700">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Start Here — Measuring Guide */}
      <section className="py-14 sm:py-16" aria-labelledby="shop-start-here-heading">
        <Container>
          <div className="relative overflow-hidden rounded-3xl border border-cream-200 bg-gradient-to-r from-cream-100 via-white to-mint-50 p-8 sm:p-10">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-mint-700">
                  <Ruler className="h-4 w-4" aria-hidden="true" />
                  <span>New to dog sweaters?</span>
                </div>
                <h2
                  id="shop-start-here-heading"
                  className="mt-2 font-display text-2xl font-bold text-brown-900"
                >
                  Start with the free Measuring Guide
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-brown-700">
                  Three simple measurements — neck, chest girth, and spine length — make sizing any
                  of our patterns stress-free, whether you crochet for a Dachshund, a Frenchie, or
                  a mixed rescue.
                </p>
              </div>

              <a
                href="/blog/crochet-dog-sweater-measuring-guide"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/blog/crochet-dog-sweater-measuring-guide');
                }}
                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-coral-500 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-coral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500"
              >
                <span>Open Measuring Guide</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
