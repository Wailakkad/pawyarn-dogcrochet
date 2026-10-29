export interface ProductImage {
  /** Local image path (e.g. "/images/shop/ruffle-love-1.jpg"). Empty = use ProductArt placeholder. */
  src: string;
  alt: string;
}

export interface ProductPreviewPage {
  src: string;
  alt: string;
  /** Intrinsic dimensions — reserves space before load to avoid layout shift. */
  width?: number;
  height?: number;
}

export type ProductArtVariant = 'ruffle-coat' | 'reindeer-snood';

export interface Product {
  slug: string;
  title: string;
  shortTitle: string;
  priceUSD: number;
  skillLevel: string;
  skillLevelNote: string;
  sizes: string[];
  sizeNote: string;
  language: string;
  format: string;
  description: string;
  highlights: string[];
  included: string[];
  perfectFor: string[];
  materials: string[];
  importantNote: string;
  /** Direct Payhip product page URL. Empty string = checkout disabled until link is added. */
  payhipUrl: string;
  images: ProductImage[];
  /** Real PDF page previews shown in the "Inside the Pattern" section. */
  previewPages: ProductPreviewPage[];
  art: ProductArtVariant;
  seoTitle: string;
  seoDescription: string;
}

export const products: Product[] = [
  {
    slug: 'ruffle-love-crochet-dog-coat',
    title: 'Crochet Dog Sweater Pattern with Ruffle Trim – S–XL – PDF',
    shortTitle: 'Ruffle Love Crochet Dog Coat Pattern',
    priceUSD: 4.99,
    skillLevel: 'Easy to Intermediate',
    skillLevelNote: 'Basic shaping + simple repeats',
    sizes: ['S', 'M', 'L', 'XL'],
    sizeNote:
      'Choose a size based on chest girth and spine length. Notes are included for adjusting body length and fit — use our free Measuring Guide if you are unsure.',
    language: 'English (US crochet terms)',
    format: 'Digital PDF pattern (instant download)',
    description:
      'Make a statement winter outfit with the Ruffle Love Crochet Dog Coat Pattern—a cozy crochet dog coat/sweater design featuring bold stripes and a cute ruffle edge for extra charm. This is a great project for makers who want a practical dog sweater with a fashionable finish.',
    highlights: [
      'Warm, wearable design for colder months',
      'Easy stripe repeat (great for using stash yarn)',
      'Ruffle detail makes it giftable + photo-ready',
      'Works as a crochet dog sweater or coat-style fit depending on yarn and ease',
    ],
    included: [
      'Printable PDF pattern with clear row-by-row instructions',
      'Multiple sizes (S–XL) + notes to adjust length and fit',
      'Guidance for leg openings and comfortable chest shaping',
      'Materials list, stitch notes, and finishing tips',
    ],
    perfectFor: [
      'Crochet dog sweater pattern shoppers',
      'Winter dog clothes, handmade gifts, and trendy “Instagram dog” looks',
      'Adding a premium “upgrade” product to your Pinterest funnel',
    ],
    materials: [
      'Worsted/medium (#4) yarn in a main color + contrast stripe color(s)',
      'Crochet hook (size listed inside the pattern)',
      'Yarn needle, stitch marker, scissors',
    ],
    importantNote:
      'Digital PDF pattern only (not a finished item). No refunds after purchase/download.',
    payhipUrl: 'https://payhip.com/b/QoWTg',
    images: [
      {
        src: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1793269758/hero_preview_img_-_ruffle_crochet_dog.jpg',
        alt: 'Dog wearing a striped crochet sweater with ruffle trim — Ruffle Love Crochet Dog Coat pattern preview',
      },
    ],
    previewPages: [
      {
        src: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1793269757/ruffle_dog_crochet_-_preview_page_img_1.jpg',
        alt: 'Ruffle dog coat crochet pattern PDF preview page 1',
        width: 1414,
        height: 2000,
      },
      {
        src: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1793269757/ruffle_dog_crochet_-_preview_page_img_2.jpg',
        alt: 'Ruffle dog coat crochet pattern PDF preview page 2',
        width: 1414,
        height: 2000,
      },
      {
        src: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1793269757/ruffle_dog_crochet_-_preview_page_img_3.jpg',
        alt: 'Ruffle dog coat crochet pattern PDF preview page 3',
        width: 1414,
        height: 2000,
      },
    ],
    art: 'ruffle-coat',
    seoTitle: 'Ruffle Love Crochet Dog Coat Pattern (S–XL PDF) — Paw & Yarn',
    seoDescription:
      'Easy-to-intermediate crochet dog sweater pattern with bold stripes and ruffle trim. Instant PDF download in sizes S–XL, US crochet terms. $4.99 on Payhip.',
  },
  {
    slug: 'reindeer-snood-crochet-pattern',
    title: 'Crochet Dog Reindeer Snood Pattern (Antlers + Ears) – Easy PDF',
    shortTitle: 'Reindeer Snood Crochet Pattern for Dogs',
    priceUSD: 2.99,
    skillLevel: 'Easy',
    skillLevelNote: 'Confident beginner-friendly',
    sizes: ['XS', 'S', 'M', 'L'],
    sizeNote:
      'Fits a range of neck circumferences (XS–L). Size notes and fit adjustments are included inside the pattern.',
    language: 'English (US crochet terms)',
    format: 'Digital PDF pattern (instant download)',
    description:
      'Turn your pup into an adorable reindeer for the holidays with this Reindeer Snood Crochet Pattern for Dogs. This pattern creates a cozy neck snood with cute antlers + ears—perfect for Christmas photos, winter walks, and festive gifts.',
    highlights: [
      'Cozy neck snood with built-in antlers + ears',
      'Quick seasonal make — great for craft fairs',
      'Confident beginner-friendly with clear shaping tips',
      'Photo-ready holiday look for Christmas cards and walks',
    ],
    included: [
      'Printable PDF pattern with step-by-step instructions',
      'Size notes for XS–L + how to adjust fit',
      'Materials list + gauge guidance',
      'Tips for shaping antlers/ears and clean finishing',
    ],
    perfectFor: [
      'Christmas crochet dog accessories',
      'Holiday photo props + gifts for dog lovers',
      'Quick seasonal makes and craft fair prep',
    ],
    materials: [
      'Worsted/medium yarn in main color + accent color(s)',
      'Crochet hook (size listed in pattern)',
      'Yarn needle, stitch marker',
      'Fiberfill (for antlers) if you want extra structure',
    ],
    importantNote:
      'Digital PDF pattern only (not a finished item). No refunds after purchase/download.',
    payhipUrl: 'https://payhip.com/b/GzgnW',
    images: [
      {
        src: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1793269757/hero_preview_img_-_dog_snood_crochet.jpg',
        alt: 'Dog wearing a crochet reindeer snood with antlers and ears — holiday Reindeer Snood pattern preview',
      },
    ],
    previewPages: [
      {
        src: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1793269758/dog_snood_crochet_-_pages_pattern_preview_1.jpg',
        alt: 'Reindeer snood crochet pattern PDF preview page 1',
        width: 1792,
        height: 2400,
      },
      {
        src: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1793269758/dog_snood_crochet_-_pages_pattern_preview_2.jpg',
        alt: 'Reindeer snood crochet pattern PDF preview page 2',
        width: 1792,
        height: 2400,
      },
      {
        src: 'https://res.cloudinary.com/dhkyla1rv/image/upload/v1793269758/dog_snood_crochet_-_pages_pattern_preview_3.jpg',
        alt: 'Reindeer snood crochet pattern PDF preview page 3',
        width: 1792,
        height: 2400,
      },
    ],
    art: 'reindeer-snood',
    seoTitle: 'Crochet Dog Reindeer Snood Pattern — Antlers + Ears PDF — Paw & Yarn',
    seoDescription:
      'Easy crochet reindeer snood pattern for dogs with antlers + ears. Sizes XS–L, instant PDF download, US crochet terms. Perfect for Christmas photos. $2.99 on Payhip.',
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function formatPriceUSD(priceUSD: number): string {
  return `$${priceUSD.toFixed(2)} USD`;
}

export function formatPriceShort(priceUSD: number): string {
  return `$${priceUSD.toFixed(2)}`;
}
