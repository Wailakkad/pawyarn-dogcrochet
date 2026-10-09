/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { getAllPosts, getPostBySlug } from './lib/blog';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { BlogIndexPage } from './pages/BlogIndexPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { NextjsBlueprintModal } from './components/NextjsBlueprintModal';
import { Container } from './components/Container';

function parseLocation() {
  if (typeof window === 'undefined') {
    return { pathname: '/', tag: null as string | null };
  }
  const url = new URL(window.location.href);
  return {
    pathname: url.pathname || '/',
    tag: url.searchParams.get('tag'),
  };
}

export default function App() {
  const [route, setRoute] = useState(parseLocation);
  const [blueprintOpen, setBlueprintOpen] = useState(false);

  const posts = useMemo(() => getAllPosts(), []);

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parseLocation());
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string) => {
    const targetUrl = new URL(path, window.location.origin);
    window.history.pushState({}, '', targetUrl.pathname + targetUrl.search);
    setRoute({
      pathname: targetUrl.pathname || '/',
      tag: targetUrl.searchParams.get('tag'),
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTag = (tag: string | null) => {
    if (tag) {
      navigate(`/blog?tag=${encodeURIComponent(tag)}`);
    } else {
      navigate('/blog');
    }
  };

  const renderPage = () => {
    const cleanPath = route.pathname.replace(/\/+$/, '') || '/';

    if (cleanPath === '/') {
      return <HomePage posts={posts} onNavigate={navigate} />;
    }

    if (cleanPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    if (cleanPath === '/blog') {
      return (
        <BlogIndexPage
          posts={posts}
          activeTag={route.tag}
          onSelectTag={handleSelectTag}
          onNavigate={navigate}
        />
      );
    }

    if (cleanPath.startsWith('/blog/')) {
      const slug = cleanPath.replace('/blog/', '');
      const post = getPostBySlug(slug);
      if (post) {
        return <BlogPostPage post={post} onNavigate={navigate} />;
      }

      return (
        <Container as="main" className="py-20 text-center">
          <h1 className="font-display text-3xl font-bold text-brown-900">
            Pattern Guide Not Found
          </h1>
          <p className="mt-3 text-sm text-brown-700">
            We could not find a crochet guide at <code className="font-mono">{cleanPath}</code>.
          </p>
          <button
            type="button"
            onClick={() => navigate('/blog')}
            className="mt-6 inline-flex items-center rounded-xl bg-coral-500 px-5 py-2.5 text-xs font-semibold text-white hover:bg-coral-600"
          >
            Browse All Crochet Dog Guides
          </button>
        </Container>
      );
    }

    return <HomePage posts={posts} onNavigate={navigate} />;
  };

  return (
    <div className="flex min-h-screen flex-col bg-cream-50 text-brown-900">
      <Header currentPath={route.pathname} onNavigate={navigate} />
      <div className="flex-1">{renderPage()}</div>
      <Footer
        onNavigate={navigate}
        onOpenNextjsBlueprint={() => setBlueprintOpen(true)}
      />
      <NextjsBlueprintModal
        isOpen={blueprintOpen}
        onClose={() => setBlueprintOpen(false)}
      />
    </div>
  );
}
