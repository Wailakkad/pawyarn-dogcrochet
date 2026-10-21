export interface GuideImage {
  /** Preferred path — add this file to public/images/free-guide/ to replace the fallback. */
  src: string;
  /** Existing brand photo shown until the preferred file exists, so nothing ever breaks. */
  fallback: string;
  alt: string;
}

/**
 * Guide-specific photography lives in public/images/free-guide/.
 * Until those files are added, SmartImage renders the documented fallback photo.
 * See docs/free-guide-landing-page-setup.md for the full asset checklist.
 */
export const guideImages = {
  hero: {
    src: '/images/free-guide/granny-square-dog-sweater.jpg',
    fallback: '/images/hero-crochet-dog.jpg',
    alt: 'Dog wearing a colorful granny square crochet sweater, the finished project from the free PDF guide',
  },
  stepAssembly: {
    src: '/images/free-guide/sweater-assembly.jpg',
    fallback: '/images/hero-crochet-dog.jpg',
    alt: 'Joining crochet granny squares together to build the dog sweater structure',
  },
  stepFinishing: {
    src: '/images/free-guide/finishing-touches.jpg',
    fallback: '/images/dog-halloween-costume-ideas.jpg',
    alt: 'Adding the neck closure and finishing details to the crochet dog sweater',
  },
  pdfCover: {
    src: '/images/free-guide/pdf-cover.jpg',
    fallback: '/images/hero-crochet-dog.jpg',
    alt: 'Cover of the free granny square dog sweater crochet pattern PDF guide',
  },
} as const;

export const PINTEREST_PIN_IMAGE = '/images/hero-crochet-dog.jpg';
// When you create a 1000×1500 pin image, swap the line above to:
// export const PINTEREST_PIN_IMAGE = '/images/free-guide/pinterest-pin.jpg';
