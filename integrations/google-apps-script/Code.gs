/**
 * Paw & Yarn — Google Apps Script Web App
 *
 * Receives server-to-server POST requests from the Vercel backend and writes to
 * the connected Google Spreadsheet. The frontend never talks to this script
 * directly; the shared secret never leaves the backend environment and
 * PropertiesService.
 *
 * Required Script Properties (Project Settings → Script properties):
 *   APPS_SCRIPT_SECRET  — must match the backend's GOOGLE_APPS_SCRIPT_SECRET
 *   SPREADSHEET_ID      — optional; only needed if the script is not container-bound
 *
 * Spreadsheet tabs (created automatically if missing):
 *   Subscribers      — Timestamp, Email, Source, Lead Magnet, Status,
 *                      UTM Campaign, UTM Content, Consent
 *   DownloadTokens   — TokenHash, Email, CreatedAt, ExpiresAt, UsedAt
 *
 * Auth note: Apps Script web apps do not reliably expose custom request
 * headers, so the shared secret is sent inside the JSON body over HTTPS and
 * compared with a constant-time-safe check.
 */

var LOCK_WAIT_MS = 20000;

function doGet() {
  return jsonResponse_({ ok: false, error: 'Method not allowed. Use POST.' });
}

function doPost(e) {
  try {
    var body = parseBody_(e);
    if (!body) {
      return jsonResponse_({ ok: false, error: 'Invalid JSON body.' });
    }

    if (!verifySecret_(body.secret)) {
      return jsonResponse_({ ok: false, error: 'Unauthorized.' });
    }

    if (body.action === 'registerSubscriber') {
      return registerSubscriber_(body.payload);
    }
    if (body.action === 'consumeDownloadToken') {
      return consumeDownloadToken_(body.payload);
    }
    return jsonResponse_({ ok: false, error: 'Unknown action.' });
  } catch (err) {
    // Do not echo internals back to the caller.
    return jsonResponse_({ ok: false, error: 'Internal error.' });
  }
}

/* -------------------------------------------------------------------------- */
/* Auth                                                                        */
/* -------------------------------------------------------------------------- */

function verifySecret_(provided) {
  if (typeof provided !== 'string' || provided.length === 0) return false;
  var expected = PropertiesService.getScriptProperties().getProperty('APPS_SCRIPT_SECRET');
  if (!expected || expected.length === 0) {
    Logger.log('APPS_SCRIPT_SECRET is not set in Script Properties.');
    return false;
  }
  // Length-safe comparison (avoids early-return timing leaks on length).
  if (provided.length !== expected.length) return false;
  var mismatch = 0;
  for (var i = 0; i < expected.length; i++) {
    mismatch |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return mismatch === 0;
}

/* -------------------------------------------------------------------------- */
/* Actions                                                                     */
/* -------------------------------------------------------------------------- */

function registerSubscriber_(payload) {
  if (!payload || typeof payload !== 'object') {
    return jsonResponse_({ ok: false, error: 'Missing payload.' });
  }

  var email = normalizeEmail_(payload.email);
  if (!email) {
    return jsonResponse_({ ok: false, error: 'Invalid email.' });
  }

  var tokenHash = sanitizeCell_(payload.tokenHash);
  var tokenExpiresAt = parseDate_(payload.tokenExpiresAt);
  if (!/^[a-f0-9]{64}$/.test(tokenHash)) {
    return jsonResponse_({ ok: false, error: 'Invalid token hash.' });
  }
  if (!tokenExpiresAt) {
    return jsonResponse_({ ok: false, error: 'Invalid token expiry.' });
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(LOCK_WAIT_MS);
  try {
    var ss = getSpreadsheet_();
    var subs = getOrCreateSheet_(ss, 'Subscribers', [
      'Timestamp',
      'Email',
      'Source',
      'Lead Magnet',
      'Status',
      'UTM Campaign',
      'UTM Content',
      'Consent',
    ]);

    var duplicate = emailExists_(subs, email);
    if (!duplicate) {
      subs.appendRow([
        new Date(),
        email,
        sanitizeCell_(payload.source) || 'unknown',
        sanitizeCell_(payload.leadMagnet) || 'Granny Square Dog Sweater',
        sanitizeCell_(payload.status) || 'new',
        sanitizeCell_(payload.utmCampaign),
        sanitizeCell_(payload.utmContent),
        sanitizeCell_(payload.consent) === 'yes' ? 'yes' : 'no',
      ]);
    }

    var tokens = getOrCreateSheet_(ss, 'DownloadTokens', [
      'TokenHash',
      'Email',
      'CreatedAt',
      'ExpiresAt',
      'UsedAt',
    ]);
    tokens.appendRow([tokenHash, email, new Date(), tokenExpiresAt, '']);

    return jsonResponse_({ ok: true, duplicate: duplicate });
  } finally {
    lock.releaseLock();
  }
}

function consumeDownloadToken_(payload) {
  if (!payload || typeof payload !== 'object') {
    return jsonResponse_({ ok: false, error: 'Missing payload.' });
  }

  var tokenHash = String(payload.tokenHash || '');
  if (!/^[a-f0-9]{64}$/.test(tokenHash)) {
    return jsonResponse_({ ok: true, valid: false, reason: 'invalid' });
  }

  var lock = LockService.getScriptLock();
  lock.waitLock(LOCK_WAIT_MS);
  try {
    var ss = getSpreadsheet_();
    var tokens = getOrCreateSheet_(ss, 'DownloadTokens', [
      'TokenHash',
      'Email',
      'CreatedAt',
      'ExpiresAt',
      'UsedAt',
    ]);

    var lastRow = tokens.getLastRow();
    if (lastRow < 2) {
      return jsonResponse_({ ok: true, valid: false, reason: 'not_found' });
    }

    // Search from the bottom up — the most recent tokens are at the end.
    var hashes = tokens.getRange(2, 1, lastRow - 1, 1).getValues();
    for (var i = hashes.length - 1; i >= 0; i--) {
      if (String(hashes[i][0]) !== tokenHash) continue;

      var row = i + 2;
      var usedAt = tokens.getRange(row, 5).getValue();
      if (usedAt) {
        return jsonResponse_({ ok: true, valid: false, reason: 'used' });
      }

      var expiresAt = tokens.getRange(row, 4).getValue();
      if (expiresAt && new Date(expiresAt).getTime() < Date.now()) {
        return jsonResponse_({ ok: true, valid: false, reason: 'expired' });
      }

      tokens.getRange(row, 5).setValue(new Date());
      return jsonResponse_({ ok: true, valid: true });
    }

    return jsonResponse_({ ok: true, valid: false, reason: 'not_found' });
  } finally {
    lock.releaseLock();
  }
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function parseBody_(e) {
  if (!e || !e.postData || typeof e.postData.contents !== 'string') return null;
  try {
    return JSON.parse(e.postData.contents);
  } catch (err) {
    return null;
  }
}

function getSpreadsheet_() {
  var id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  if (id) {
    return SpreadsheetApp.openById(id);
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function getOrCreateSheet_(ss, name, headers) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

function emailExists_(sheet, email) {
  var lastRow = sheet.getLastRow();
  if (lastRow < 2) return false;
  var values = sheet.getRange(2, 2, lastRow - 1, 1).getValues();
  for (var i = 0; i < values.length; i++) {
    if (String(values[i][0]).toLowerCase() === email) return true;
  }
  return false;
}

function normalizeEmail_(raw) {
  if (typeof raw !== 'string') return null;
  var email = raw.replace(/^\s+|\s+$/g, '').toLowerCase();
  if (email.length < 5 || email.length > 254) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return null;
  return email;
}

/**
 * Spreadsheet formula-injection guard: any user-controlled string that begins
 * with =, +, -, @, tab, or CR is prefixed with an apostrophe so Sheets treats
 * it as plain text.
 */
function sanitizeCell_(value) {
  var s = value === null || value === undefined ? '' : String(value);
  s = s.substring(0, 500);
  if (/^[=+\-@\t\r]/.test(s)) {
    s = "'" + s;
  }
  return s;
}

function parseDate_(raw) {
  if (raw instanceof Date && !isNaN(raw.getTime())) return raw;
  if (typeof raw === 'string' && raw) {
    var parsed = new Date(raw);
    if (!isNaN(parsed.getTime())) return parsed;
  }
  return null;
}

function jsonResponse_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
