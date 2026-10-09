import React, { useEffect } from 'react';
import { BlogPost } from '../lib/blog';

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  blogPost?: BlogPost;
}

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath,
  ogType = 'website',
  ogImage = '/images/measuring-dog.jpg',
  blogPost,
}) => {
  const baseUrl =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : 'https://pawandyarn.com';

  const fullCanonicalUrl = `${baseUrl}${canonicalPath}`;
  const fullImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;

  useEffect(() => {
    document.title = title;

    const setMetaTag = (selector: string, attrName: string, attrVal: string, content: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrName, attrVal);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMetaTag('meta[name="description"]', 'name', 'description', description);
    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title);
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType);
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', fullCanonicalUrl);
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', fullImageUrl);
    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title);
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description);
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', fullImageUrl);

    let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalEl) {
      canonicalEl = document.createElement('link');
      canonicalEl.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalEl);
    }
    canonicalEl.setAttribute('href', fullCanonicalUrl);
  }, [title, description, fullCanonicalUrl, ogType, fullImageUrl]);

  const jsonLd = blogPost
    ? {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: blogPost.title,
        description: blogPost.description,
        image: [fullImageUrl],
        datePublished: blogPost.date,
        dateModified: blogPost.date,
        author: {
          '@type': 'Organization',
          name: 'Paw & Yarn',
          url: baseUrl,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Paw & Yarn',
          logo: {
            '@type': 'ImageObject',
            url: `${baseUrl}/images/measuring-dog.jpg`,
          },
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': fullCanonicalUrl,
        },
        keywords: blogPost.keywords.join(', '),
        articleSection: blogPost.category,
      }
    : {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        name: 'Paw & Yarn — Crochet Dog Patterns',
        description:
          'Beginner-friendly, cute, practical dog crochet patterns, sweater sizing guides, and DIY dog costume tutorials.',
        url: fullCanonicalUrl,
        publisher: {
          '@type': 'Organization',
          name: 'Paw & Yarn',
        },
      };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
};
