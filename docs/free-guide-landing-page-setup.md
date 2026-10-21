# Free Crochet Dog Sweater Guide — Landing Page Setup

Landing page: `/free-crochet-dog-sweater-pattern`
Conversion goal: email signups (Pinterest traffic) → token-gated PDF download.

Architecture:

```
Browser form
   ↓ POST JSON
Vercel Serverless Function   api/subscribe.ts   (validate, rate-limit, token)
   ↓ HTTPS + shared secret (in body)
Google Apps Script web app   integrations/google-apps-script/Code.gs
   ↓ LockService
Google Spreadsheet           tabs: Subscribers, DownloadTokens
```

Download flow: `api/subscribe.ts` mints a random token, stores only its
SHA-256 hash (via Apps Script) with a 30-minute expiry, and returns
`/api/download?token=…`. `api/download.ts` hashes the token, asks Apps Script
to atomically consume it (single-use, under `LockService`), then streams the
PDF from `PDF_PRIVATE_PATH` (outside `public/`, never at a public URL).

---

## 1. Create the Google Spreadsheet

1. Go to <https://sheets.new> and create a spreadsheet named
   **Paw & Yarn — Subscribers**.
2. You do **not** need to create tabs or headers manually — the Apps Script
   creates the `Subscribers` and `DownloadTokens` tabs with headers on first
   run.
3. Copy the spreadsheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/`**`<SPREADSHEET_ID>`**`/edit`

### Required columns (created automatically)

**Subscribers:** `Timestamp`, `Email`, `Source`, `Lead Magnet`, `Status`,
`UTM Campaign`, `UTM Content`, `Consent`

**DownloadTokens:** `TokenHash`, `Email`, `CreatedAt`, `ExpiresAt`, `UsedAt`

- `Consent` is `yes` only when the visitor ticked the optional marketing
  checkbox (unchecked by default). People who only want the PDF are stored with
  `Consent = no` — do not import them as marketing subscribers.
- `Status` is `new` for every signup. Email verification is **not** implemented:
  submitting an address does not verify ownership of it. (Documented on the
  page itself in the form's privacy note.)
- Only token **hashes** are stored — never raw download tokens.

## 2. Open Google Apps Script

1. With the spreadsheet open: **Extensions → Apps Script**.
2. Delete the default `myFunction` stub in `Code.gs`.

## 3. Paste Code.gs

1. Open `integrations/google-apps-script/Code.gs` in this repo.
2. Paste its entire contents into the Apps Script editor, replacing everything.
3. **File → Save**.

## 4. Configure Script Properties

1. In Apps Script: **Project Settings (gear icon) → Script Properties**.
2. Add two properties:

   | Property           | Value                                                    |
   | ------------------ | -------------------------------------------------------- |
   | `APPS_SCRIPT_SECRET` | A long random string you generate, e.g. `openssl rand -hex 32` |
   | `SPREADSHEET_ID`   | The spreadsheet ID from step 1.3 (optional if the script is container-bound to the sheet, but recommended.) |

3. Save. **Keep `APPS_SCRIPT_SECRET` secret** — it is the only thing stopping
   strangers from writing to your sheet. It never appears in frontend code; the
   backend reads its twin from the server-only env var
   `GOOGLE_APPS_SCRIPT_SECRET` and sends it in the POST body (Apps Script web
   apps do not reliably expose custom request headers, hence body-based auth).

## 5. Deploy the web app

1. **Deploy → New deployment →** select type **Web app**.
2. Configure:
   - Description: `subscriber-api-v1`
   - Execute as: **Me**
   - Who has access: **Anyone**
3. **Deploy** → authorize when prompted (grant the spreadsheet access scope).
4. Copy the **Web app URL** ending in `/exec`:
   `https://script.google.com/macros/s/AKfyy…/exec`
5. Every time you edit `Code.gs` later, you must **Deploy → Manage deployments
   → ✏️ → Version: New version → Deploy** to publish changes. The URL stays the
   same.

## 6. Environment variables (Vercel)

Set these in **Vercel → Project → Settings → Environment Variables** (Production
at minimum; add Preview too if you want staging signups to work):

| Variable                    | Value                                                        | Where it comes from                  |
| --------------------------- | ------------------------------------------------------------ | ------------------------------------ |
| `GOOGLE_APPS_SCRIPT_URL`    | The `/exec` URL from step 5.                                 | Apps Script deployment               |
| `GOOGLE_APPS_SCRIPT_SECRET` | Same value as the `APPS_SCRIPT_SECRET` script property.      | You generated it in step 4           |
| `PDF_PRIVATE_PATH`          | `private/granny-square-dog-sweater.pdf` (this is also the default). | —                            |
| `PUBLIC_SITE_URL`           | `https://pawandyarn.com`                                     | Your production domain               |

These are **server-only**. Do not name them `VITE_*` — Vite would inline them
into the public JS bundle. `.env*` is already git-ignored (only `.env.example`
is committed). For local development, put them in `.env.local`.

## 7. Place the private PDF

Put the file at:

    private/granny-square-dog-sweater.pdf

It must **not** go in `public/`. `vercel.json` bundles `private/**` into the
download function only (`includeFiles`), so the file ships with the deployment
but has no public URL. See `private/README.md`.

## 8. Test a signup

**Local:** `npx vercel dev` (serves both the Vite app and `/api/*`; plain
`npm run dev` does not run serverless functions). Open
`http://localhost:3000/free-crochet-dog-sweater-pattern`, enter an email, click
**GET MY FREE PATTERN →**.

**Production:** open the live URL, submit a real email.

Expected: success panel with **DOWNLOAD MY FREE PATTERN ↓**.

## 9. Confirm the subscriber in Google Sheets

Open the spreadsheet → `Subscribers` tab. You should see a new row with your
email, `Source` (`Pinterest` if you arrived with Pinterest UTM params, otherwise
`direct`/`referral`/the utm_source value), `Lead Magnet` =
`Granny Square Dog Sweater`, `Status` = `new`, `Consent` = your checkbox choice,
and the UTM columns filled if present. The `DownloadTokens` tab should have a
64-char hash row with a `UsedAt` still empty.

## 10. Test duplicate signups

Submit the same email again (normalizing: `You@Example.com` counts as the same
as `you@example.com`).

Expected: the UI still shows success with a **fresh** download link (each
signup mints a new token), but the `Subscribers` tab gets **no second row** —
the API returns `duplicate: true` and Apps Script skips the append under
`LockService`.

## 11. Test invalid emails

Submit `not-an-email`, `a@b`, or an empty field.

Expected: inline error *“Please enter a valid email address.”* — validation
happens both client-side and again in `api/subscribe.ts`; nothing is written to
the sheet. You can verify with curl:

```bash
curl -i -X POST https://<your-domain>/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"not-an-email"}'
# → 400 {"ok":false,"error":"Please enter a valid email address."}
```

## 12. Verify the PDF is inaccessible before signup

```bash
curl -i https://<your-domain>/private/granny-square-dog-sweater.pdf
# → 404 (SPA rewrite; no static file exists at any public URL)

curl -i "https://<your-domain>/api/download"
# → 400 invalid/missing token
```

Only a valid, unexpired, unused token reaches the file.

## 13. Test download token expiration and reuse

1. Sign up, copy the `downloadUrl` from the success response (or just use the
   button within the flow).
2. **Reuse:** download once, then replay the same URL.
   → HTTP 403 *“This download link has already been used…”*
   (`DownloadTokens.UsedAt` is now set).
3. **Expiry:** sign up, wait 30+ minutes, then open the link.
   → HTTP 403 *“This download link has expired…”*
4. You can also force-expire a row by editing its `ExpiresAt` cell to a past
   date and re-testing.

## 14. Test UTM attribution

Visit with Pinterest-style parameters:

```
https://<your-domain>/free-crochet-dog-sweater-pattern
  ?utm_source=pinterest
  &utm_medium=social
  &utm_campaign=granny_square_launch
  &utm_content=pin_v1
```

Sign up → the sheet row shows `Source = Pinterest`,
`UTM Campaign = granny_square_launch`, `UTM Content = pin_v1`. UTM values are
persisted in `sessionStorage`, so they survive client-side navigation and are
attached even if the visitor scrolls before submitting. A plain visit with no
parameters stores `Source = direct` (or `referral` when a referrer host exists).

---

## Conversion tracking

The page emits these DOM CustomEvents (see `src/lib/analytics.ts`) — no
analytics vendor is installed, and no raw email is ever included:

| Event                   | When                                 |
| ----------------------- | ------------------------------------ |
| `landing_page_view`     | Page mount                           |
| `lead_form_submit`      | Form submit starts                   |
| `lead_signup_success`   | Backend confirms the signup          |
| `pdf_download`          | Download button clicked              |

To connect **Pinterest Tag** later, add one listener (e.g. in `index.html` or a
small effect in `main.tsx`):

```html
<script>
  document.addEventListener('pawyarn:track', function (e) {
    var event = e.detail.event;
    var params = e.detail.params;
    if (typeof pintrk === 'function') {
      // Map to your Pinterest conversion events + add the tag's event_id for
      // deduplication if you also use an API integration.
      if (event === 'lead_signup_success') pintrk('track', 'lead', params);
      if (event === 'pdf_download') pintrk('track', 'custom', params);
    }
  });
</script>
```

Also add the Pinterest base tag (`pintrk('load', '<tag_id>')`) per Pinterest's
docs. To verify: Pinterest Ads Manager → Conversions → check that `lead`
events arrive after a test signup.

---

## Operational limitations (read this)

- **Google Sheets is not a transactional database.** It is fine for hobby/small
  business volume (hundreds of signups/day). Apps Script web apps have daily
  quotas (~30 min execution/day, concurrent-execution limits) and each request
  costs ~1–2 s of cold-start latency. If you outgrow it, migrate the two tabs
  to a real datastore — the backend calls are isolated in
  `api/_lib/appsScript.ts` for exactly that swap.
- **Rate limiting is per-instance.** `api/_lib/rateLimit.ts` is an in-memory
  sliding window (5 signups / 10 min / IP). Serverless instances don't share
  memory, so this is best-effort anti-abuse, not a hard global cap. Duplicate
  prevention and Google's own quotas are the hard backstop. For strict global
  limits, add Upstash Redis.
- **Tokens are single-use and expire after 30 minutes.** That's deliberate: a
  leaked link dies quickly. The success panel tells users the link works once.
- **No email verification is performed** (per the MVP decision). Submitting an
  email grants the download; it does not prove the submitter owns the address,
  and no delivery email is sent. The UI never claims otherwise.
- **No privacy policy page exists** in this project, so the form does not link
  to one (I will not invent legal text). When you add a `/privacy` page,
  link it in the consent area of `src/components/LeadMagnetForm.tsx` (the
  privacy-note paragraph) and in the site `Footer`.

## Files reference

| Path                                              | Role                                      |
| ------------------------------------------------- | ----------------------------------------- |
| `src/pages/FreeGuidePage.tsx`                     | The landing page (3 sections)             |
| `src/components/LeadMagnetForm.tsx`               | Shared signup form (used twice)           |
| `src/components/SmartImage.tsx`                   | Image with graceful brand-photo fallback  |
| `src/components/GrannySquareArt.tsx`              | On-brand granny-square placeholder art    |
| `src/lib/useLeadMagnet.ts`                        | Shared signup state + submit logic        |
| `src/lib/utm.ts`                                  | UTM capture/persistence                   |
| `src/lib/analytics.ts`                            | Conversion event hooks                    |
| `src/lib/guideImages.ts`                          | Image paths + fallbacks                   |
| `api/subscribe.ts`                                | Signup endpoint (POST)                    |
| `api/download.ts`                                 | Token-gated PDF endpoint (GET)            |
| `api/_lib/*`                                      | Validation, rate limit, tokens, Apps Script client |
| `integrations/google-apps-script/Code.gs`         | Sheets backend (deploy this)              |
| `private/granny-square-dog-sweater.pdf`           | The PDF (you add this file)               |
| `public/images/free-guide/`                       | Guide photography (you add these)         |
