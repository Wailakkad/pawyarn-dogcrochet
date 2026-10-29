import React, { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, ExternalLink, Lock, ShoppingBag } from 'lucide-react';
import { Container } from '../components/Container';
import { SEOHead } from '../components/SEOHead';
import { ProductBadges } from '../components/ProductBadges';
import { FeatureList } from '../components/FeatureList';
import { FAQAccordion, FAQItem } from '../components/FAQAccordion';
import { PatternPreviewGallery } from '../components/PatternPreviewGallery';
import { StickyBuyBar } from '../components/StickyBuyBar';
import { ProductArt } from '../components/ProductArt';
import { Product, formatPriceUSD, products } from '../data/products';
import { appendUtmToUrl, captureUtmParams } from '../lib/utm';

interface ShopProductPageProps {
  product: Product;
  onNavigate: (path: string) => void;
}

const sharedFaq: FAQItem[] = [
  {
    question: 'Is this a finished product?',
    answer:
      'No — this is a digital PDF crochet pattern only. You will receive instructions to crochet the item yourself; no physical finished item is shipped.',
  },
  {
    question: 'How do I download my pattern?',
    answer:
      'Checkout is handled securely by Payhip. Right after your purchase you will get an instant download link so you can save the PDF and start stitching right away.',
  },
  {
    question: 'Can I get a refund?',
    answer:
      'Because digital downloads are delivered instantly, there are no refunds after purchase or download. Please read the full description before buying.',
  },
];

export const ShopProductPage: React.FC<ShopProductPageProps> = ({ product, onNavigate }) => {
  const [imgError, setImgError] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    setImgError(false);
    setActiveImageIndex(0);
    // Capture UTM params while they are still in the landing URL so they can
    // be forwarded to the Payhip checkout later.
    captureUtmParams();
  }, [product.slug]);

  const checkoutHref = useMemo(() => appendUtmToUrl(product.payhipUrl), [product.payhipUrl]);

  const otherProducts = products.filter((item) => item.slug !== product.slug);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image:
      product.images.filter((image) => image.src).length > 0
        ? product.images
            .filter((image) => image.src)
            .map((image) =>
              image.src.startsWith('http')
                ? image.src
                : `${typeof window !== 'undefined' ? window.location.origin : 'https://pawandyarn.com'}${image.src}`,
            )
        : [
            `${typeof window !== 'undefined' ? window.location.origin : 'https://pawandyarn.com'}/images/hero-crochet-dog.jpg`,
          ],
    brand: {
      '@type': 'Brand',
      name: 'Paw & Yarn',
    },
    url: `${
      typeof window !== 'undefined' ? window.location.origin : 'https://pawandyarn.com'
    }/shop/${product.slug}`,
    offers: {
      '@type': 'Offer',
      price: product.priceUSD.toFixed(2),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: product.payhipUrl || undefined,
    },
  };

  const badges = [
    { label: 'Skill', value: product.skillLevel },
    { label: 'Sizes', value: product.sizes.join(', ') },
    { label: 'Format', value: 'PDF — instant download' },
    { label: 'Language', value: product.language },
  ];

  const photoImages = product.images.filter((image) => image.src);
  const mainImage = photoImages[activeImageIndex] ?? null;

  return (
    <>
      <SEOHead
        title={product.seoTitle}
        description={product.seoDescription}
        canonicalPath={`/shop/${product.slug}`}
        ogType="website"
        ogImage={mainImage ? mainImage.src : '/images/hero-crochet-dog.jpg'}
        jsonLd={productJsonLd}
      />

      <Container as="article" className="pb-28 pt-10 sm:pb-16 sm:pt-14 lg:pb-14">
        {/* Back to shop */}
        <div>
          <a
            href="/shop"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/shop');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brown-600 transition-colors hover:text-coral-600"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to Shop</span>
          </a>
        </div>

        {/* Top hero: gallery + buy box */}
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Gallery */}
          <div>
            <div className="overflow-hidden rounded-3xl border border-cream-200 bg-white p-2.5 shadow-xs">
              {mainImage && !imgError ? (
                /* Natural image size: no fixed aspect ratio, no cropping —
                   the photo keeps its original proportions at full column width. */
                <img
                  src={mainImage.src}
                  alt={mainImage.alt}
                  referrerPolicy="no-referrer"
                  onError={() => setImgError(true)}
                  className="block h-auto w-full rounded-2xl"
                />
              ) : (
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-cream-100">
                  <ProductArt
                    variant={product.art}
                    title={`${product.shortTitle} pattern illustration`}
                    className="h-full w-full"
                  />
                </div>
              )}
            </div>

            {/* Thumbnails (only when real photos exist) */}
            {photoImages.length > 1 && (
              <div className="mt-3 flex gap-3" role="list" aria-label="Product photos">
                {photoImages.map((image, index) => (
                  <button
                    key={image.src}
                    type="button"
                    role="listitem"
                    aria-label={`Show photo ${index + 1}`}
                    aria-current={index === activeImageIndex}
                    onClick={() => setActiveImageIndex(index)}
                    className={`h-16 w-20 overflow-hidden rounded-xl border transition-colors ${
                      index === activeImageIndex
                        ? 'border-coral-500'
                        : 'border-cream-200 hover:border-cream-300'
                    }`}
                  >
                    <img
                      src={image.src}
                      alt=""
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {photoImages.length === 0 && (
              <p className="mt-3 text-center text-[11px] text-brown-500">
                {/* TODO: Add real product photos to product.images in src/data/products.ts */}
                Pattern preview illustration — product photography coming soon
              </p>
            )}
          </div>

          {/* Buy box */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-xs font-semibold text-coral-600">Digital PDF Pattern</p>

            <h1 className="mt-2 font-display text-3xl font-bold leading-tight text-brown-900 sm:text-4xl">
              {product.title}
            </h1>

            <p className="mt-4 font-display text-3xl font-bold tabular-nums text-brown-900">
              {formatPriceUSD(product.priceUSD)}
            </p>

            <ProductBadges items={badges} className="mt-5" />

            <p className="mt-5 text-sm leading-relaxed text-brown-700">{product.description}</p>

            {/* Primary CTA */}
            <div className="mt-7">
              {checkoutHref ? (
                <a
                  href={checkoutHref}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-coral-500 px-6 py-4 text-sm font-semibold text-white shadow-xs transition-colors duration-150 hover:bg-coral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500 sm:w-auto"
                >
                  <Lock className="h-4 w-4" aria-hidden="true" />
                  <span>Get the PDF (Payhip)</span>
                  <ExternalLink className="h-3.5 w-3.5 opacity-80" aria-hidden="true" />
                </a>
              ) : (
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  title="Checkout link coming soon"
                  className="inline-flex w-full cursor-not-allowed items-center justify-center gap-2.5 rounded-xl bg-brown-500/60 px-6 py-4 text-sm font-semibold text-white sm:w-auto"
                >
                  <Lock className="h-4 w-4" aria-hidden="true" />
                  <span>Checkout Link Coming Soon</span>
                </button>
              )}

              <p className="mt-3 flex items-center gap-1.5 text-xs text-brown-600">
                <ShoppingBag className="h-3.5 w-3.5 text-mint-600" aria-hidden="true" />
                <span>Secure checkout on Payhip · Instant download</span>
              </p>
            </div>

            {/* Important note */}
            <div className="mt-6 rounded-2xl border border-coral-100 bg-coral-50/75 p-4">
              <p className="text-xs leading-relaxed text-brown-800">
                <strong className="font-semibold text-brown-900">Important:</strong>{' '}
                {product.importantNote}
              </p>
            </div>
          </div>
        </div>

        {/* Sections below hero */}
        <div className="mt-14 max-w-3xl space-y-12 sm:mt-16">
          {/* What you'll get */}
          <section aria-labelledby="whats-included-heading">
            <p className="text-xs font-semibold text-mint-700">What You&apos;ll Get</p>
            <h2
              id="whats-included-heading"
              className="mt-1 font-display text-2xl font-bold text-brown-900"
            >
              Inside the Pattern
            </h2>
            <div className="mt-5 rounded-2xl border border-cream-200 bg-white p-6">
              <FeatureList items={product.included} />
            </div>

            {/* Real PDF page previews with click-to-zoom */}
            <PatternPreviewGallery pages={product.previewPages} />
          </section>

          {/* Sizes + Fit */}
          <section aria-labelledby="sizes-fit-heading">
            <p className="text-xs font-semibold text-mint-700">Sizes + Fit</p>
            <h2
              id="sizes-fit-heading"
              className="mt-1 font-display text-2xl font-bold text-brown-900"
            >
              Find the Right Size
            </h2>
            <div className="mt-5 flex flex-wrap gap-3" role="list" aria-label="Available sizes">
              {product.sizes.map((size) => (
                <span
                  key={size}
                  role="listitem"
                  className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cream-200 bg-white font-display text-lg font-bold text-brown-900"
                >
                  {size}
                </span>
              ))}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-brown-700">{product.sizeNote}</p>
            <a
              href="/blog/crochet-dog-sweater-measuring-guide"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('/blog/crochet-dog-sweater-measuring-guide');
              }}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-coral-600 transition-colors hover:text-coral-700"
            >
              <span>Open the free Measuring Guide</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
          </section>

          {/* Skill level */}
          <section aria-labelledby="skill-heading">
            <p className="text-xs font-semibold text-mint-700">Skill Level</p>
            <h2
              id="skill-heading"
              className="mt-1 font-display text-2xl font-bold text-brown-900"
            >
              Who Is It For?
            </h2>
            <div className="mt-5 rounded-2xl border border-cream-200 bg-white p-6">
              <p className="font-display text-lg font-semibold text-brown-900">
                {product.skillLevel}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-brown-700">
                {product.skillLevelNote}
              </p>
            </div>
          </section>

          {/* Materials */}
          {product.materials.length > 0 && (
            <section aria-labelledby="materials-heading">
              <p className="text-xs font-semibold text-mint-700">Materials</p>
              <h2
                id="materials-heading"
                className="mt-1 font-display text-2xl font-bold text-brown-900"
              >
                What You&apos;ll Need
              </h2>
              <div className="mt-5 rounded-2xl border border-cream-200 bg-white p-6">
                <FeatureList items={product.materials} />
              </div>
            </section>
          )}

          {/* Perfect for */}
          <section aria-labelledby="perfect-for-heading">
            <p className="text-xs font-semibold text-mint-700">Perfect For</p>
            <h2
              id="perfect-for-heading"
              className="mt-1 font-display text-2xl font-bold text-brown-900"
            >
              Made for Makers Like You
            </h2>
            <div className="mt-5 rounded-2xl border border-cream-200 bg-white p-6">
              <FeatureList items={product.perfectFor} />
            </div>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq-heading">
            <p className="text-xs font-semibold text-mint-700">FAQ</p>
            <h2 id="faq-heading" className="mt-1 font-display text-2xl font-bold text-brown-900">
              Common Questions
            </h2>
            <FAQAccordion items={sharedFaq} className="mt-5" />
          </section>

          {/* More patterns */}
          <section
            aria-labelledby="more-patterns-heading"
            className="border-t border-cream-200 pt-12"
          >
            <p className="text-xs font-semibold text-coral-600">Keep Stitching</p>
            <h2
              id="more-patterns-heading"
              className="mt-1 font-display text-2xl font-bold text-brown-900"
            >
              More Patterns
            </h2>

            <div className="mt-6 space-y-4">
              {otherProducts.map((other) => (
                <a
                  key={other.slug}
                  href={`/shop/${other.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(`/shop/${other.slug}`);
                  }}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-cream-200 bg-white p-5 transition-colors hover:border-coral-500/50"
                >
                  <div className="min-w-0">
                    <p className="truncate font-display text-base font-semibold text-brown-900 group-hover:text-coral-600">
                      {other.shortTitle}
                    </p>
                    <p className="mt-0.5 text-xs tabular-nums text-brown-600">
                      {formatPriceUSD(other.priceUSD)}
                    </p>
                  </div>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 text-coral-600 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </a>
              ))}

              <a
                href="/shop"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/shop');
                }}
                className="group flex items-center justify-between gap-4 rounded-2xl border border-cream-200 bg-white p-5 transition-colors hover:border-coral-500/50"
              >
                <div>
                  <p className="font-display text-base font-semibold text-brown-900 group-hover:text-coral-600">
                    Browse the full shop
                  </p>
                  <p className="mt-0.5 text-xs text-brown-600">
                    All printable PDF crochet dog patterns
                  </p>
                </div>
                <ArrowRight
                  className="h-4 w-4 shrink-0 text-coral-600 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </section>
        </div>
      </Container>

      {/* Sticky mobile purchase bar */}
      <StickyBuyBar
        shortTitle={product.shortTitle}
        priceUSD={product.priceUSD}
        checkoutHref={checkoutHref}
      />
    </>
  );
};
