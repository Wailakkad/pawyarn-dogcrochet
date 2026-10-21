# Free Guide Photography — Asset Checklist

Add guide-specific photos to this folder (`public/images/free-guide/`). Until
each file exists, the landing page automatically falls back to an existing brand
photo (see `src/lib/guideImages.ts`), so nothing ever shows a broken image.

| File                              | Used in                    | Recommended spec                          |
| --------------------------------- | -------------------------- | ----------------------------------------- |
| `granny-square-dog-sweater.jpg`   | Hero (Section 1, right)    | ≥ 1600×1200, 4:3, dog wearing the granny square sweater from the PDF |
| `granny-squares-closeup.jpg`*     | Step 1 (Section 2)         | ≥ 1200×1200, square, close-up of the floral granny squares |
| `sweater-assembly.jpg`            | Step 2 (Section 2)         | ≥ 1200×1200, square, joining/assembly in progress |
| `finishing-touches.jpg`           | Step 3 (Section 2)         | ≥ 1200×1200, square, neck closure / finishing details |
| `pdf-cover.jpg`                   | PDF mockup (Section 3)     | ≥ 1200×1500, 4:5, first page of the guide |
| `pinterest-pin.jpg` (optional)    | Social/Pinterest preview   | 1000×1500, 2:3 portrait pin graphic       |

\* Step 1 currently uses an on-brand SVG granny-square illustration
(`src/components/GrannySquareArt.tsx`) as a placeholder. Once
`granny-squares-closeup.jpg` exists, swap the `GrannySquareArt` usage in
`src/pages/FreeGuidePage.tsx` for a `SmartImage` pointing at that file — or keep
the illustration, which many craft brands prefer for step graphics.

After adding `pinterest-pin.jpg`, update `PINTEREST_PIN_IMAGE` in
`src/lib/guideImages.ts` to point at it (line is pre-annotated).
