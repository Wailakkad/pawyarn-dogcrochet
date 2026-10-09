import React, { useState } from 'react';
import { X, Copy, Check } from 'lucide-react';

interface NextjsBlueprintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BLUEPRINT_SNIPPETS: Record<string, { title: string; code: string }> = {
  runGuide: {
    title: 'Local Setup & Run Commands',
    code: `# 1. Install dependencies
npm install

# 2. Start local development server (runs at http://localhost:3000)
npm run dev

# 3. Build production bundle (Static Generation + SEO assets)
npm run build

# 4. Preview production build locally
npm run preview`,
  },
  fileTree: {
    title: 'Project File Tree',
    code: `paw-and-yarn/
├── content/
│   └── blog/
│       ├── crochet-dog-sweater-measuring-guide.md
│       └── crochet-dog-halloween-costume-ideas.md
├── public/
│   ├── images/
│   │   ├── hero-crochet-dog.jpg
│   │   ├── measuring-dog.jpg
│   │   └── dog-halloween-costume-ideas.jpg
│   ├── robots.txt
│   ├── rss.xml
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Callout.tsx
│   │   ├── Container.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── Icons.tsx
│   │   ├── MarkdownRenderer.tsx
│   │   ├── NewsletterCTA.tsx
│   │   ├── PostCard.tsx
│   │   ├── SEOHead.tsx
│   │   ├── SizeCalculator.tsx
│   │   ├── TOC.tsx
│   │   └── TagPill.tsx
│   ├── lib/
│   │   └── blog.ts
│   ├── pages/
│   │   ├── AboutPage.tsx
│   │   ├── BlogIndexPage.tsx
│   │   ├── BlogPostPage.tsx
│   │   └── HomePage.tsx
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.ts
└── tsconfig.json`,
  },
  nextjsAppRouter: {
    title: 'Next.js App Router SSG Entry (app/blog/[slug]/page.tsx)',
    code: `import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getAllPosts, getPostBySlug } from '@/src/lib/blog';
import { BlogPostPage } from '@/src/pages/BlogPostPage';

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: \`\${post.title} — Paw & Yarn\`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: \`https://pawandyarn.com/blog/\${post.slug}\`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: \`https://pawandyarn.com/blog/\${post.slug}\`,
      images: [{ url: post.coverImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.coverImage],
    },
  };
}

export default async function PostRoute({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return <BlogPostPage post={post} onNavigate={(path) => (window.location.href = path)} />;
}`,
  },
};

export const NextjsBlueprintModal: React.FC<NextjsBlueprintModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<string>('runGuide');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const current = BLUEPRINT_SNIPPETS[activeTab];

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(current.code);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="blueprint-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-brown-900/60 p-4 backdrop-blur-xs"
    >
      <div className="flex max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-cream-200 bg-cream-50 shadow-xl">
        <div className="flex items-center justify-between border-b border-cream-200 px-6 py-4">
          <div>
            <h2
              id="blueprint-modal-title"
              className="font-display text-lg font-bold text-brown-900"
            >
              Paw &amp; Yarn — Architecture &amp; Local Run Guide
            </h2>
            <p className="text-xs text-brown-600">
              Complete file tree, local CLI commands, and Next.js App Router SSG route wrappers
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="rounded-xl p-2 text-brown-700 hover:bg-cream-200/70"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-cream-200 bg-cream-100/70 px-6 py-3">
          {Object.entries(BLUEPRINT_SNIPPETS).map(([key, item]) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveTab(key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                activeTab === key
                  ? 'bg-brown-900 text-cream-50'
                  : 'bg-white text-brown-700 hover:bg-cream-200/60'
              }`}
            >
              {item.title}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center justify-between pb-3">
            <span className="font-display text-sm font-semibold text-brown-900">
              {current.title}
            </span>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-lg border border-cream-300 bg-white px-3 py-1 text-xs font-medium text-brown-800 hover:bg-cream-100"
            >
              {copied ? (
                <>
                  <Check className="h-3.5 w-3.5 text-mint-700" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="h-3.5 w-3.5" />
                  <span>Copy Snippet</span>
                </>
              )}
            </button>
          </div>
          <pre className="overflow-x-auto rounded-2xl border border-cream-200 bg-brown-900 p-4 font-mono text-xs leading-relaxed text-cream-50">
            <code>{current.code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};
