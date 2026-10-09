// Shared DB helpers. Owner: architect (B1 may extend, never break signatures).
import pg from 'pg';

// Return numeric/bigint columns as JS numbers (money is numeric(12,2) → 150.00 → 150).
pg.types.setTypeParser(1700, (v) => (v === null ? null : Number(v))); // numeric
pg.types.setTypeParser(20, (v) => (v === null ? null : Number(v)));   // int8 (count(*))
// Keep `date` columns as 'YYYY-MM-DD' strings (no TZ shifting).
pg.types.setTypeParser(1082, (v) => v);

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.warn('[db] DATABASE_URL is not set — see docs/DEV.md');
}

const needsSsl =
  process.env.PGSSL === 'true' ||
  (connectionString && /sslmode=require/.test(connectionString));

export const pool = new pg.Pool({
  connectionString,
  max: Number(process.env.PG_POOL_MAX || 10),
  ssl: needsSsl ? { rejectUnauthorized: false } : undefined,
});

pool.on('error', (err) => console.error('[db] idle client error', err.message));

/** query(sql, params) → { rows, rowCount } */
export function query(text, params = []) {
  return pool.query(text, params);
}

/** one(sql, params) → first row or null */
export async function one(text, params = []) {
  const { rows } = await pool.query(text, params);
  return rows[0] ?? null;
}

/** many(sql, params) → rows[] */
export async function many(text, params = []) {
  const { rows } = await pool.query(text, params);
  return rows;
}

/**
 * tx(async (client) => {...}) — runs fn inside BEGIN/COMMIT, ROLLBACK on throw.
 * client has the same .query() API as pool.
 */
export async function tx(fn) {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await fn(client);
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {});
    throw err;
  } finally {
    client.release();
  }
}

/**
 * nextNumber(client, table, companyId) — per-company sequential number for
 * `jobs` or `invoices`. Call INSIDE tx(); takes an advisory xact lock so two
 * concurrent inserts can't collide.
 */
export async function nextNumber(client, table, companyId) {
  if (!['jobs', 'invoices'].includes(table)) throw new Error('nextNumber: bad table');
  await client.query('SELECT pg_advisory_xact_lock(hashtext($1 || $2))', [table, companyId]);
  const { rows } = await client.query(
    `SELECT COALESCE(MAX(number), 0) + 1 AS n FROM ${table} WHERE company_id = $1`,
    [companyId]
  );
  return rows[0].n;
}

/** Parse ?limit=&offset=&q= with sane bounds. */
export function paging(qs = {}, { defaultLimit = 50, maxLimit = 200 } = {}) {
  const limit = Math.min(Math.max(parseInt(qs.limit, 10) || defaultLimit, 1), maxLimit);
  const offset = Math.max(parseInt(qs.offset, 10) || 0, 0);
  const q = typeof qs.q === 'string' && qs.q.trim() ? qs.q.trim() : null;
  return { limit, offset, q };
}

/** Write a row to audit_log (fire-and-forget safe). */
export async function audit(user, action, entity, entityId = null) {
  try {
    await pool.query(
      'INSERT INTO audit_log (company_id, user_id, action, entity, entity_id) VALUES ($1,$2,$3,$4,$5)',
      [user.company_id, user.id ?? null, action, entity, entityId]
    );
  } catch (e) {
    console.error('[audit]', e.message);
  }
}

/** Round to 2 decimals (money). */
export const money = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;
