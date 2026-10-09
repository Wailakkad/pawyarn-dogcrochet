import React, { useState } from 'react';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { Container } from '../components/Container';
import { SEOHead } from '../components/SEOHead';
import { Callout } from '../components/Callout';
import { PawIcon, YarnIcon, BoneIcon, CrochetHookIcon } from '../components/Icons';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const [copied, setCopied] = useState(false);
  const contactEmail = 'hello@pawandyarn.com';

  const handleCopyEmail = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(contactEmail);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <>
      <SEOHead
        title="About Paw & Yarn — Comfort-First Crochet Dog Patterns"
        description="Learn the story behind Paw & Yarn, our mission to create comfortable crochet dog sweaters and accessories, and our essential pet safety guidelines."
        canonicalPath="/about"
      />

      <Container as="main" className="py-12 sm:py-16">
        <div className="mx-auto max-w-3xl">
          {/* Header */}
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-coral-600">
            <PawIcon size={16} />
            <span>About the Brand</span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-bold text-brown-900 sm:text-5xl">
            Cozy Stitches Made for Real Dog Proportions
          </h1>
          <p className="mt-4 text-base leading-relaxed text-brown-700 sm:text-lg">
            Paw &amp; Yarn is a dedicated resource for dog-loving crocheters who want clear sizing charts, wearable stitch patterns, and pet-safe DIY ideas that dogs genuinely enjoy wearing.
          </p>

          {/* Brand Story */}
          <section className="mt-12 border-t border-cream-200 pt-10">
            <div className="flex items-center gap-2.5">
              <YarnIcon size={20} className="text-coral-600" />
              <h2 className="font-display text-2xl font-semibold text-brown-900">
                Who This Blog Is For
              </h2>
            </div>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-brown-800">
              <p>
                If you have ever bought a store-bought dog sweater that fit your pup&apos;s chest but hung four inches past their tail—or squeezed their front shoulders every time they took a step—you already know why custom crochet is special.
              </p>
              <p>
                We built <strong>Paw &amp; Yarn</strong> for beginner and intermediate crocheters who want to turn a single skein of washable yarn into something practical, adorable, and tailored to their dog&apos;s exact body shape. Whether you share your couch with a tiny 6-pound Chihuahua, a long-backed Dachshund, a barrel-chested French Bulldog, or a spirited rescue mutt, our tutorials show you where to add or subtract stitches so every make fits right the first time.
              </p>
            </div>
          </section>

          {/* Mission */}
          <section className="mt-12 border-t border-cream-200 pt-10">
            <div className="flex items-center gap-2.5">
              <CrochetHookIcon size={20} className="text-mint-700" />
              <h2 className="font-display text-2xl font-semibold text-brown-900">
                Our Mission: Dog Comfort + Cute Crochet
              </h2>
            </div>
            <p className="mt-4 text-base leading-relaxed text-brown-800">
              A handmade dog garment should never sacrifice your pet&apos;s comfort for a quick photo. Every pattern and roundup on Paw &amp; Yarn is guided by three core principles:
            </p>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-cream-200 bg-white p-5">
                <h3 className="font-display text-base font-semibold text-brown-900">
                  1. Natural Mobility
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-brown-700">
                  Generous armhole placement and stretchy rib stitches ensure front shoulders and hind legs move freely on walks.
                </p>
              </div>
              <div className="rounded-2xl border border-cream-200 bg-white p-5">
                <h3 className="font-display text-base font-semibold text-brown-900">
                  2. Soft, Breathable Fibers
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-brown-700">
                  We recommend smooth cotton blends and non-scratchy washable acrylics that prevent overheating indoors.
                </p>
              </div>
              <div className="rounded-2xl border border-cream-200 bg-white p-5">
                <h3 className="font-display text-base font-semibold text-brown-900">
                  3. Beginner Clarity
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-brown-700">
                  Step-by-step measuring guides, visual tables, and modular pieces that work up with basic stitches.
                </p>
              </div>
            </div>
          </section>

          {/* Safety Disclaimer */}
          <section className="mt-12 border-t border-cream-200 pt-10">
            <Callout title="Pet Comfort & Safety Guidelines" variant="safety">
              <ul className="list-disc space-y-2.5 pl-5 text-sm text-brown-800">
                <li>
                  <strong>Check Fit with the Two-Finger Rule:</strong> You should always be able to slide two flat fingers comfortably between your dog&apos;s neck, chest, and leg openings and the crocheted fabric.
                </li>
                <li>
                  <strong>Prioritize Unobstructed Movement &amp; Vision:</strong> Sweaters, capes, and seasonal snoods must never restrict shoulder stride, pinch ear canals, or cover your dog&apos;s eyes.
                </li>
                <li>
                  <strong>Always Supervise Pets:</strong> Never leave a dog unattended, crated, or sleeping unsupervised while wearing a handmade sweater, hood, bandana, or costume accessory.
                </li>
                <li>
                  <strong>Eliminate Choking Hazards:</strong> Avoid sewing small plastic buttons, metal bells, safety eyes, or loose pom-poms onto pet garments where a dog can chew and swallow them. Use crocheted bobbles and secure surface embroidery instead.
                </li>
                <li>
                  <strong>Watch for Signs of Warmth:</strong> Remove crochet layers promptly in heated indoor rooms or sunny weather if your dog pants or seems restless.
                </li>
              </ul>
            </Callout>
          </section>

          {/* Contact Section */}
          <section className="mt-12 rounded-2xl border border-cream-200 bg-white p-7 sm:p-8">
            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-coral-600">
                  <BoneIcon size={16} />
                  <span>Get in Touch</span>
                </div>
                <h2 className="mt-1 font-display text-xl font-semibold text-brown-900">
                  Questions, Pattern Requests, or Sizing Help?
                </h2>
                <p className="mt-1.5 text-sm text-brown-700">
                  Reach out anytime by email. We love hearing what breeds you are crocheting for next.
                </p>
              </div>

              <div className="flex flex-col items-start gap-2 sm:items-end">
                <div className="inline-flex items-center gap-2 rounded-xl border border-cream-200 bg-cream-50 px-4 py-2.5">
                  <span className="font-mono text-sm font-medium text-brown-900">
                    {contactEmail}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center gap-1 rounded-lg bg-brown-900 px-2.5 py-1 text-xs font-medium text-cream-50 transition-colors hover:bg-brown-800 whitespace-nowrap"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-mint-200" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 border-t border-cream-100 pt-5 flex flex-wrap items-center justify-between gap-4">
              <span className="text-xs text-brown-600">
                New to crocheting for dogs? Start with our foundational measuring tutorial.
              </span>
              <a
                href="/blog/crochet-dog-sweater-measuring-guide"
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate('/blog/crochet-dog-sweater-measuring-guide');
                }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-coral-600 hover:text-coral-700"
              >
                <span>Go to Measuring Guide</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </section>
        </div>
      </Container>
    </>
  );
};
