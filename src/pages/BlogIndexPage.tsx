import React from 'react';
import { BlogPost, getAllTags } from '../lib/blog';
import { Container } from '../components/Container';
import { PostCard } from '../components/PostCard';
import { TagPill } from '../components/TagPill';
import { NewsletterCTA } from '../components/NewsletterCTA';
import { SEOHead } from '../components/SEOHead';
import { YarnIcon } from '../components/Icons';

interface BlogIndexPageProps {
  posts: BlogPost[];
  activeTag: string | null;
  onSelectTag: (tag: string | null) => void;
  onNavigate: (path: string) => void;
}

export const BlogIndexPage: React.FC<BlogIndexPageProps> = ({
  posts,
  activeTag,
  onSelectTag,
  onNavigate,
}) => {
  const allTags = getAllTags();

  const filteredPosts = activeTag
    ? posts.filter((post) => post.tags.includes(activeTag))
    : posts;

  const pageTitle = activeTag
    ? `#${activeTag.replace(/-/g, ' ')} Crochet Dog Guides — Paw & Yarn Blog`
    : 'Crochet Dog Patterns, Sizing Charts & DIY Guides — Paw & Yarn Blog';

  return (
    <>
      <SEOHead
        title={pageTitle}
        description="Browse all Paw & Yarn dog crochet tutorials, including our step-by-step crochet dog sweater measuring guide, size chart, and 15 DIY dog Halloween costume ideas."
        canonicalPath={activeTag ? `/blog?tag=${encodeURIComponent(activeTag)}` : '/blog'}
      />

      <Container as="main" className="py-12 sm:py-16">
        {/* Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-coral-600">
            <YarnIcon size={16} />
            <span>Pattern Library &amp; Tutorials</span>
          </div>
          <h1 className="mt-2 font-display text-3xl font-bold text-brown-900 sm:text-5xl">
            Crochet Dog Patterns &amp; Guides
          </h1>
          <p className="mt-3 text-base leading-relaxed text-brown-700">
            Practical measuring walkthroughs, breed sizing charts, and creative seasonal crochet ideas designed for pet comfort.
          </p>
        </div>

        {/* Interactive Tag Filter Bar */}
        <div
          role="region"
          aria-label="Filter posts by tag"
          className="mt-8 flex flex-wrap items-center gap-2 border-y border-cream-200 py-4"
        >
          <span className="mr-2 text-xs font-semibold text-brown-700">Filter by topic:</span>
          <button
            type="button"
            onClick={() => onSelectTag(null)}
            className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors duration-150 whitespace-nowrap shrink-0 ${
              activeTag === null
                ? 'bg-brown-900 text-cream-50 shadow-xs'
                : 'bg-cream-100 text-brown-700 hover:bg-cream-200/80 hover:text-brown-900'
            }`}
          >
            <span>All Guides</span>
            <span className="tabular-nums text-[11px] opacity-80">({posts.length})</span>
          </button>

          {allTags.map((tag) => {
            const count = posts.filter((p) => p.tags.includes(tag)).length;
            return (
              <TagPill
                key={tag}
                tag={tag}
                count={count}
                active={activeTag === tag}
                onClick={(clickedTag) =>
                  onSelectTag(activeTag === clickedTag ? null : clickedTag)
                }
              />
            );
          })}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-2">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.slug}
                post={post}
                onNavigate={onNavigate}
                onSelectTag={(tag) => onSelectTag(tag)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-cream-200 bg-white p-12 text-center">
            <p className="font-display text-lg font-semibold text-brown-900">
              No guides found matching #{activeTag}
            </p>
            <p className="mt-1 text-sm text-brown-600">
              Reset the tag filter to view all available crochet dog guides.
            </p>
            <button
              type="button"
              onClick={() => onSelectTag(null)}
              className="mt-4 inline-flex items-center rounded-xl bg-coral-500 px-4 py-2 text-xs font-semibold text-white hover:bg-coral-600"
            >
              Show All Guides
            </button>
          </div>
        )}

        {/* Newsletter CTA */}
        <div className="mt-16">
          <NewsletterCTA />
        </div>
      </Container>
    </>
  );
};
