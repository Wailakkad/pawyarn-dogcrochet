# Google Apps Script — Subscriber + Download-Token Backend

This folder contains the Google Apps Script web app that sits between the
Paw & Yarn Vercel backend and your Google Spreadsheet. The browser never calls
this script directly.

## Files

| File       | Purpose                                                        |
| ---------- | -------------------------------------------------------------- |
| `Code.gs`  | The `doPost` web app: registers subscribers, consumes tokens.  |

## Authentication model

Apps Script web apps do not reliably expose custom request headers, so the
shared secret is sent **inside the JSON POST body over HTTPS**:

```json
{
  "action": "registerSubscriber",
  "secret": "<APPS_SCRIPT_SECRET>",
  "payload": { "...": "..." }
}
```

- The backend stores the secret in the server-only env var
  `GOOGLE_APPS_SCRIPT_SECRET`.
- This script stores its copy in the Script Property `APPS_SCRIPT_SECRET`.
- The frontend never sees or sends the secret.
- `doGet` is blocked; only `doPost` with a valid secret can write.

## Actions

### `registerSubscriber`

Appends a row to the `Subscribers` tab (unless the email already exists) and a
hash-only row to the `DownloadTokens` tab.

### `consumeDownloadToken`

Atomically (under `LockService`) checks a SHA-256 token hash: unused, unexpired
→ marks `UsedAt` and returns `{ ok: true, valid: true }`. Otherwise returns
`{ ok: true, valid: false, reason: "used" | "expired" | "not_found" }`.

## Spreadsheet tabs (auto-created)

**Subscribers:** `Timestamp`, `Email`, `Source`, `Lead Magnet`, `Status`,
`UTM Campaign`, `UTM Content`, `Consent`

**DownloadTokens:** `TokenHash`, `Email`, `CreatedAt`, `ExpiresAt`, `UsedAt`

Only token **hashes** are stored — never the raw download token.

## Known platform limitations (by design, documented)

- **Not a transactional database.** Google Sheets + Apps Script have daily
  quotas and ~6-minute execution limits. At hobby-site volume this is fine; if
  you grow past a few thousand signups/day, migrate to a real datastore.
- **Locks are per-script, not global.** `LockService` serializes concurrent
  executions of *this* script, which prevents duplicate rows for a given email
  at practical traffic levels.
- **Web apps are stateless.** There is no in-memory state between calls — all
  durable state lives in the spreadsheet.
- **`doPost` body auth, not header auth**, because Apps Script web apps may
  strip or redirect custom headers.
