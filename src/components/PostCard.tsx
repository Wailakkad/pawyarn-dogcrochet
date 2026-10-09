import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BlogPost, formatDisplayDate } from '../lib/blog';
import { YarnIcon } from './Icons';

interface PostCardProps {
  post: BlogPost;
  onNavigate: (path: string) => void;
  onSelectTag?: (tag: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onNavigate, onSelectTag }) => {
  const [imgError, setImgError] = useState(false);

  const handlePostClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(`/blog/${post.slug}`);
  };

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-cream-200 bg-white transition-colors duration-150 hover:border-coral-500/50">
      {/* Cover Image with Zero-Broken-Image Fallback */}
      <a
        href={`/blog/${post.slug}`}
        onClick={handlePostClick}
        className="relative block aspect-4/3 w-full overflow-hidden bg-cream-100"
      >
        {!imgError ? (
          <img
            src={post.coverImage}
            alt={post.title}
            referrerPolicy="no-referrer"
            loading="lazy"
            onError={() => setImgError(true)}
            className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-cream-100 via-coral-50 to-mint-50 p-6 text-center">
            <YarnIcon size={36} className="text-coral-500" />
            <span className="mt-2 font-display text-sm font-medium text-brown-800">
              {post.category}
            </span>
          </div>
        )}
      </a>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          {/* Clean Unboxed Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-brown-600 tabular-nums">
            <span className="font-medium text-coral-600">{post.category}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.date}>{formatDisplayDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>

          {/* Title */}
          <h3 className="mt-2.5 font-display text-xl font-semibold leading-snug text-brown-900">
            <a
              href={`/blog/${post.slug}`}
              onClick={handlePostClick}
              className="transition-colors group-hover:text-coral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-coral-500"
            >
              {post.title}
            </a>
          </h3>

          {/* Excerpt */}
          <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-brown-700">
            {post.description}
          </p>
        </div>

        <div className="mt-6 border-t border-cream-200/70 pt-4 flex items-center justify-between gap-4">
          {/* Interactive Tag Filter Links */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-brown-600">
            {post.tags.slice(0, 3).map((tag, idx) => (
              <React.Fragment key={tag}>
                {idx > 0 && <span aria-hidden="true">·</span>}
                <button
                  type="button"
                  onClick={() => {
                    if (onSelectTag) {
                      onSelectTag(tag);
                    } else {
                      onNavigate(`/blog?tag=${encodeURIComponent(tag)}`);
                    }
                  }}
                  className="text-brown-600 transition-colors hover:text-coral-600 hover:underline whitespace-nowrap"
                >
                  #{tag}
                </button>
              </React.Fragment>
            ))}
          </div>

          <a
            href={`/blog/${post.slug}`}
            onClick={handlePostClick}
            className="inline-flex items-center gap-1 text-xs font-semibold text-coral-600 transition-colors group-hover:text-coral-700 whitespace-nowrap shrink-0"
          >
            <span>Read Guide</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
          </a>
        </div>
      </div>
    </article>
  );
};
