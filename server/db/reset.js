// DEV ONLY: drops the public schema and re-runs migrations + seed.
import 'dotenv/config';
import { fileURLToPath } from 'node:url';
import { pool } from '../lib/db.js';
import { migrate } from './migrate.js';
import { seed } from './seed.js';

if (process.env.NODE_ENV === 'production') { console.error('refusing to reset in production'); process.exit(1); }
await pool.query('DROP SCHEMA public CASCADE; CREATE SCHEMA public;');
await migrate();
await seed();
await pool.end();
