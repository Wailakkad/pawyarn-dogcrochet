export interface TOCItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BlogPostFrontmatter {
  title: string;
  slug: string;
  date: string;
  description: string;
  keywords: string[];
  tags: string[];
  category: string;
  coverImage: string;
  keyTakeaways: string[];
}

export interface BlogPost extends BlogPostFrontmatter {
  content: string;
  readingTime: string;
  readingMinutes: number;
  toc: TOCItem[];
}

// Load all markdown files from /content/blog/*.md at build/bundle time
const rawMarkdownFiles = import.meta.glob('/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/\*\*|__/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function generateReadingTime(content: string): { text: string; minutes: number } {
  const cleanText = content
    .replace(/---[\s\S]*?---/, '')
    .replace(/[#*`>|_-]/g, ' ')
    .trim();
  const words = cleanText.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return {
    text: `${minutes} min read`,
    minutes,
  };
}

export function extractTOC(markdownContent: string): TOCItem[] {
  const lines = markdownContent.split('\n');
  const toc: TOCItem[] = [];

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)$/);
    if (h2Match) {
      const text = h2Match[1].replace(/\*\*/g, '').trim();
      toc.push({
        id: slugifyHeading(text),
        text,
        level: 2,
      });
      continue;
    }

    const h3Match = line.match(/^###\s+(.+)$/);
    if (h3Match) {
      const text = h3Match[1].replace(/\*\*/g, '').trim();
      toc.push({
        id: slugifyHeading(text),
        text,
        level: 3,
      });
    }
  }

  return toc;
}

function parseFrontmatter(raw: string): { frontmatter: BlogPostFrontmatter; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    throw new Error('Invalid markdown frontmatter format');
  }

  const yamlBlock = match[1];
  const content = match[2].trim();

  const meta: Record<string, string | string[]> = {};
  let currentArrayKey: string | null = null;

  for (const rawLine of yamlBlock.split(/\r?\n/)) {
    const line = rawLine.trimEnd();
    if (!line.trim()) continue;

    const arrayItemMatch = line.match(/^\s*-\s+(.+)$/);
    if (arrayItemMatch && currentArrayKey) {
      const val = arrayItemMatch[1].trim().replace(/^["']|["']$/g, '');
      (meta[currentArrayKey] as string[]).push(val);
      continue;
    }

    const keyValMatch = line.match(/^([a-zA-Z0-9_]+):\s*(.*)$/);
    if (keyValMatch) {
      const key = keyValMatch[1];
      const rawVal = keyValMatch[2].trim();
      if (!rawVal) {
        currentArrayKey = key;
        meta[key] = [];
      } else {
        currentArrayKey = null;
        meta[key] = rawVal.replace(/^["']|["']$/g, '');
      }
    }
  }

  const frontmatter: BlogPostFrontmatter = {
    title: (meta.title as string) || 'Untitled Pattern Guide',
    slug: (meta.slug as string) || '',
    date: (meta.date as string) || '2026-10-01',
    description: (meta.description as string) || '',
    keywords: Array.isArray(meta.keywords) ? meta.keywords : [],
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    category: (meta.category as string) || 'Crochet Dog Patterns',
    coverImage: (meta.coverImage as string) || '/images/measuring-dog.jpg',
    keyTakeaways: Array.isArray(meta.keyTakeaways) ? meta.keyTakeaways : [],
  };

  return { frontmatter, content };
}

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = Object.entries(rawMarkdownFiles).map(([filepath, rawContent]) => {
    const { frontmatter, content } = parseFrontmatter(rawContent);
    const fallbackSlug = filepath.split('/').pop()?.replace(/\.md$/, '') || '';
    const slug = frontmatter.slug || fallbackSlug;
    const reading = generateReadingTime(content);
    const toc = extractTOC(content);

    return {
      ...frontmatter,
      slug,
      content,
      readingTime: reading.text,
      readingMinutes: reading.minutes,
      toc,
    };
  });

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  const allPosts = getAllPosts();
  return allPosts.find((post) => post.slug === slug);
}

export function getAllTags(): string[] {
  const posts = getAllPosts();
  const tagSet = new Set<string>();
  for (const post of posts) {
    for (const tag of post.tags) {
      tagSet.add(tag);
    }
  }
  return Array.from(tagSet);
}

export function getRelatedPosts(currentSlug: string, tags: string[]): BlogPost[] {
  const allPosts = getAllPosts().filter((p) => p.slug !== currentSlug);
  const scored = allPosts.map((post) => {
    const sharedTags = post.tags.filter((t) => tags.includes(t)).length;
    return { post, score: sharedTags };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.map((item) => item.post);
}

export function formatDisplayDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  const dateObj = new Date(year, (month || 1) - 1, day || 1);
  return dateObj.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}
