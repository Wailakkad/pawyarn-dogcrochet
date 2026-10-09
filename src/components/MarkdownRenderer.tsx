import React from 'react';
import { slugifyHeading } from '../lib/blog';

interface MarkdownRendererProps {
  content: string;
  onNavigate?: (path: string) => void;
}

function renderInlineFormatting(text: string, onNavigate?: (path: string) => void): React.ReactNode[] {
  // Match **bold**, *italic*, `code`, and [link](url)
  const tokenRegex = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-brown-900">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={index} className="italic">
          {part.slice(1, -1)}
        </em>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={index}
          className="rounded bg-cream-200/70 px-1.5 py-0.5 font-mono text-sm text-brown-900"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, href] = linkMatch;
      const isInternal = href.startsWith('/');
      return (
        <a
          key={index}
          href={href}
          onClick={(e) => {
            if (isInternal && onNavigate) {
              e.preventDefault();
              onNavigate(href);
            }
          }}
          className="font-medium text-coral-600 underline underline-offset-4 hover:text-coral-700"
        >
          {label}
        </a>
      );
    }
    return part;
  });
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, onNavigate }) => {
  const lines = content.split(/\r?\n/);
  const elements: React.ReactNode[] = [];

  let i = 0;
  while (i < lines.length) {
    const line = lines[i].trimEnd();

    if (!line.trim()) {
      i++;
      continue;
    }

    // H2
    if (line.startsWith('## ')) {
      const rawHeading = line.slice(3).trim();
      const id = slugifyHeading(rawHeading);
      elements.push(
        <h2 key={`h2-${i}`} id={id} className="group relative">
          {renderInlineFormatting(rawHeading, onNavigate)}
        </h2>
      );
      i++;
      continue;
    }

    // H3
    if (line.startsWith('### ')) {
      const rawHeading = line.slice(4).trim();
      const id = slugifyHeading(rawHeading);
      elements.push(
        <h3 key={`h3-${i}`} id={id}>
          {renderInlineFormatting(rawHeading, onNavigate)}
        </h3>
      );
      i++;
      continue;
    }

    // Standalone Markdown Image: ![alt](src)
    const imageMatch = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageMatch) {
      const [, altText, imageUrl] = imageMatch;
      elements.push(
        <figure key={`img-${i}`} className="my-5">
          <img
            src={imageUrl}
            alt={altText}
            referrerPolicy="no-referrer"
            loading="lazy"
            className="block h-auto max-w-full rounded-2xl border border-cream-200"
          />
        </figure>
      );
      i++;
      continue;
    }

    // Table block
    if (line.startsWith('|') && i + 1 < lines.length && lines[i + 1].trim().startsWith('|')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i].trim());
        i++;
      }

      if (tableLines.length >= 2) {
        const parseRow = (rowStr: string) =>
          rowStr
            .replace(/^\||\|$/g, '')
            .split('|')
            .map((cell) => cell.trim());

        const headers = parseRow(tableLines[0]);
        const bodyRows = tableLines.slice(2).map(parseRow);

        elements.push(
          <div
            key={`table-${i}`}
            className="my-8 overflow-x-auto rounded-2xl border border-cream-200 bg-white shadow-xs"
          >
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-cream-200 bg-cream-100/80 text-brown-900">
                  {headers.map((header, hIdx) => (
                    <th
                      key={hIdx}
                      className="px-4 py-3.5 font-display text-sm font-semibold tracking-tight whitespace-nowrap"
                    >
                      {renderInlineFormatting(header, onNavigate)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-cream-200/70 tabular-nums">
                {bodyRows.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className="transition-colors hover:bg-cream-50/90"
                  >
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className={`px-4 py-3.5 text-brown-800 ${
                          cIdx >= 1 && cIdx <= 4 ? 'font-mono text-xs sm:text-sm whitespace-nowrap' : ''
                        }`}
                      >
                        {renderInlineFormatting(cell, onNavigate)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Blockquote
    if (line.startsWith('> ')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i++;
      }
      elements.push(
        <blockquote key={`quote-${i}`}>
          {renderInlineFormatting(quoteLines.join(' '), onNavigate)}
        </blockquote>
      );
      continue;
    }

    // Unordered list
    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('- ')) {
        items.push(lines[i].trim().slice(2));
        i++;
      }
      elements.push(
        <ul key={`ul-${i}`}>
          {items.map((item, idx) => (
            <li key={idx}>{renderInlineFormatting(item, onNavigate)}</li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s+/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s+/, ''));
        i++;
      }
      elements.push(
        <ol key={`ol-${i}`}>
          {items.map((item, idx) => (
            <li key={idx}>{renderInlineFormatting(item, onNavigate)}</li>
          ))}
        </ol>
      );
      continue;
    }

    // Paragraph
    const paragraphLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('## ') &&
      !lines[i].startsWith('### ') &&
      !lines[i].trim().startsWith('![') &&
      !lines[i].startsWith('- ') &&
      !lines[i].startsWith('> ') &&
      !lines[i].startsWith('|') &&
      !/^\d+\.\s+/.test(lines[i].trim())
    ) {
      paragraphLines.push(lines[i].trim());
      i++;
    }

    if (paragraphLines.length > 0) {
      elements.push(
        <p key={`p-${i}`}>{renderInlineFormatting(paragraphLines.join(' '), onNavigate)}</p>
      );
    }
  }

  return <div className="prose-paw">{elements}</div>;
};
