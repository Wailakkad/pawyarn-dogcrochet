# Private assets — not publicly served

Place your downloadable PDF here:

    private/granny-square-dog-sweater.pdf

This folder is intentionally OUTSIDE `public/`, so nothing inside it is served
as a static URL. The only way to fetch the PDF is through the token-gated
serverless endpoint `GET /api/download`, which:

1. verifies a short-lived, single-use token (hashes stored in Google Sheets),
2. rejects expired or reused tokens,
3. then streams the file from `PDF_PRIVATE_PATH`.

Do NOT move the PDF into `public/` — that would make it freely downloadable
without an email signup.

Commit the PDF to this folder. Vercel's `includeFiles: "private/**"` setting in
`vercel.json` bundles it into the download function only — it is never written
to the static output directory, so it has no public URL. (The document is free
content; the access gate exists to capture emails, not as DRM. Keep the repo
private if that matters to you.)

See `docs/free-guide-landing-page-setup.md` for the full setup walkthrough.
