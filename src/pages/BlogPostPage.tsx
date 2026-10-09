import React, { useState, useEffect } from 'react';
import { ArrowLeft, Copy, Check } from 'lucide-react';
import { BlogPost, formatDisplayDate, getRelatedPosts } from '../lib/blog';
import { Container } from '../components/Container';
import { Callout } from '../components/Callout';
import { TOC } from '../components/TOC';
import { TagPill } from '../components/TagPill';
import { PostCard } from '../components/PostCard';
import { NewsletterCTA } from '../components/NewsletterCTA';
import { MarkdownRenderer } from '../components/MarkdownRenderer';
import { SizeCalculator } from '../components/SizeCalculator';
import { SEOHead } from '../components/SEOHead';
import { PawIcon, PinterestIcon } from '../components/Icons';

interface BlogPostPageProps {
  post: BlogPost;
  onNavigate: (path: string) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ post, onNavigate }) => {
  const [imgError, setImgError] = useState(false);
  const [copiedPinText, setCopiedPinText] = useState(false);

  useEffect(() => {
    setImgError(false);
    setCopiedPinText(false);
  }, [post.slug]);

  const relatedPosts = getRelatedPosts(post.slug, post.tags);

  const pinSummaryText = `${post.title} — ${post.description} Read the full guide at Paw & Yarn (${
    typeof window !== 'undefined' ? window.location.origin : 'https://pawandyarn.com'
  }/blog/${post.slug})`;

  const handleCopyPinText = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(pinSummaryText);
    }
    setCopiedPinText(true);
    setTimeout(() => setCopiedPinText(false), 2500);
  };

  return (
    <>
      <SEOHead
        title={`${post.title} — Paw & Yarn`}
        description={post.description}
        canonicalPath={`/blog/${post.slug}`}
        ogType="article"
        ogImage={post.coverImage}
        blogPost={post}
      />

      <Container as="article" className="py-10 sm:py-14">
        {/* Back link */}
        <div>
          <a
            href="/blog"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('/blog');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brown-600 transition-colors hover:text-coral-600"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to All Crochet Guides</span>
          </a>
        </div>

        {/* Post Header */}
        <header className="mt-6 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 text-xs text-brown-600 tabular-nums">
            <span className="font-semibold text-coral-600">{post.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>Published {formatDisplayDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>

          <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-brown-900 sm:text-4xl lg:text-[2.65rem]">
            {post.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-brown-700 sm:text-lg">
            {post.description}
          </p>
        </header>

        {/* Hero Cover Image */}
        <div className="mt-8 overflow-hidden rounded-3xl border border-cream-200 bg-white p-2.5 shadow-xs">
          <div className="relative aspect-16/9 max-h-[480px] w-full overflow-hidden rounded-2xl bg-cream-100">
            {!imgError ? (
              <img
                src={post.coverImage}
                alt={post.title}
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-cream-100 via-coral-50 to-mint-50 p-8 text-center">
                <PawIcon size={42} className="text-coral-500" />
                <span className="mt-2 font-display text-base font-semibold text-brown-900">
                  {post.title}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Two-Column Article Layout (TOC Sidebar + Main Content) */}
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Sticky Sidebar TOC on Desktop */}
          <aside className="lg:col-span-4 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-6">
              <TOC items={post.toc} />

              {/* Compact Pinterest Reminder in Sidebar */}
              <div className="rounded-2xl border border-blush-200 bg-blush-50/70 p-5">
                <div className="flex items-center gap-2 text-xs font-semibold text-blush-600">
                  <PinterestIcon size={16} />
                  <span>Save for Your Next Skein</span>
                </div>
                <p className="mt-2 text-xs leading-relaxed text-brown-700">
                  Bookmark this guide to your Crochet Dog Patterns board on Pinterest so you can reference the measurements beside your yarn basket.
                </p>
              </div>
            </div>
          </aside>

          {/* Main Article Column */}
          <div className="lg:col-span-8 lg:order-1">
            {/* Key Takeaways Callout Box */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <Callout title="Key Takeaways" variant="takeaways">
                <ul className="list-disc space-y-2 pl-5">
                  {post.keyTakeaways.map((item, idx) => (
                    <li key={idx} className="text-brown-800">
                      {item}
                    </li>
                  ))}
                </ul>
              </Callout>
            )}

            {/* Interactive Size Calculator for the Sweater Measuring Post */}
            {post.slug === 'crochet-dog-sweater-measuring-guide' && <SizeCalculator />}

            {/* Rendered Markdown Content */}
            <MarkdownRenderer content={post.content} onNavigate={onNavigate} />

            {/* Save to Pinterest Section (No external script needed) */}
            <Callout title="Save to Pinterest" variant="pinterest">
              <p className="text-sm text-brown-800">
                <strong>Create a pin from these steps:</strong> Use your browser&apos;s Pinterest Save button on the cover photo above, or copy the ready-made pin description below to save this tutorial to your <em>Crochet Dog Patterns</em> board for weekend stitching.
              </p>
              <div className="mt-4 flex flex-col items-start justify-between gap-3 rounded-xl border border-blush-200 bg-white p-3.5 sm:flex-row sm:items-center">
                <p className="line-clamp-2 text-xs italic text-brown-700">{pinSummaryText}</p>
                <button
                  type="button"
                  onClick={handleCopyPinText}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brown-900 px-3.5 py-2 text-xs font-semibold text-cream-50 transition-colors hover:bg-brown-800 whitespace-nowrap shrink-0"
                >
                  {copiedPinText ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-mint-200" />
                      <span>Pin Description Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copy Pin Description</span>
                    </>
                  )}
                </button>
              </div>
            </Callout>

            {/* Tags Footer */}
            <div className="mt-10 border-t border-cream-200 pt-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="mr-2 text-xs font-semibold text-brown-700">Filed under:</span>
                {post.tags.map((tag) => (
                  <TagPill
                    key={tag}
                    tag={tag}
                    onClick={(clickedTag) =>
                      onNavigate(`/blog?tag=${encodeURIComponent(clickedTag)}`)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter CTA */}
        <NewsletterCTA />

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section
            aria-labelledby="related-posts-heading"
            className="mt-14 border-t border-cream-200 pt-12"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-coral-600">Keep Stitching</p>
                <h2
                  id="related-posts-heading"
                  className="mt-1 font-display text-2xl font-bold text-brown-900"
                >
                  Related Crochet Guides
                </h2>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-2">
              {relatedPosts.map((related) => (
                <PostCard
                  key={related.slug}
                  post={related}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
};
