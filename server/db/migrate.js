// Tiny migration runner: applies server/db/migrations/*.sql in filename order, once each.
// Runs on boot (server/index.js) and via `npm run migrate`.
import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pool } from '../lib/db.js';

const DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), 'migrations');

export async function migrate({ log = console.log } = {}) {
  const client = await pool.connect();
  try {
    await client.query('SELECT pg_advisory_lock(727272)'); // one booting instance at a time
    await client.query(`CREATE TABLE IF NOT EXISTS schema_migrations (
      name text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`);
    const done = new Set((await client.query('SELECT name FROM schema_migrations')).rows.map((r) => r.name));
    const files = (await fs.readdir(DIR)).filter((f) => f.endsWith('.sql')).sort();
    for (const f of files) {
      if (done.has(f)) continue;
      const sql = await fs.readFile(path.join(DIR, f), 'utf8');
      log(`[migrate] applying ${f}`);
      await client.query('BEGIN');
      try {
        await client.query(sql);
        await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [f]);
        await client.query('COMMIT');
      } catch (e) {
        await client.query('ROLLBACK');
        throw new Error(`Migration ${f} failed: ${e.message}`);
      }
    }
    log('[migrate] up to date');
  } finally {
    await client.query('SELECT pg_advisory_unlock(727272)').catch(() => {});
    client.release();
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  migrate().then(() => pool.end()).catch((e) => { console.error(e); process.exit(1); });
}
