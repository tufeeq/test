// /api/ai — OWNER: B5. See docs/API.md § 13.
import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { requireRole } from '../lib/auth.js';
import { one } from '../lib/db.js';
import { ah, notFound, badRequest } from '../lib/errors.js';
import { validate, z } from '../lib/validate.js';
import { triage, draftMessage, draftReply, CATEGORIES, DRAFT_INTENTS } from '../lib/ai.js';
import { baseUrl } from '../lib/notify.js';

const router = Router();
const staff = requireRole('owner', 'dispatcher');

// Per-company cap so a stuck UI loop can't burn the Anthropic budget.
const aiLimiter = rateLimit({
  windowMs: 60 * 1000, limit: 30, standardHeaders: true, legacyHeaders: false,
  keyGenerator: (req) => req.user?.company_id || 'anon',
  validate: { keyGeneratorIpFallback: false },
  handler: (_req, res) => res.status(429).json({ error: { code: 'rate_limited', message: 'Too many AI requests, try again in a minute' } }),
});

const TriageBody = z.object({
  text: z.string().trim().min(1).max(4000),
  category: z.enum(CATEGORIES).optional().nullable(),
  locale: z.enum(['ar', 'en']).optional(),
});

router.post('/triage', staff, aiLimiter, validate({ body: TriageBody }), ah(async (req, res) => {
  const { text, category, locale } = req.body;
  res.json(await triage({ text, category: category || undefined, locale: locale || req.user.locale, companyId: req.user.company_id }));
}));

const DraftBody = z.object({
  job_id: z.string().uuid().optional(),
  booking_request_id: z.string().uuid().optional(),
  intent: z.enum(DRAFT_INTENTS).optional().default('confirm'),
  locale: z.enum(['ar', 'en']).optional(),
}).refine((b) => b.job_id || b.booking_request_id, { message: 'job_id or booking_request_id is required' });

router.post('/draft-message', staff, aiLimiter, validate({ body: DraftBody }), ah(async (req, res) => {
  const cid = req.user.company_id;
  const locale = req.body.locale || 'ar';
  const company = await one('SELECT name, name_ar FROM companies WHERE id = $1', [cid]);

  if (req.body.booking_request_id) {
    const booking = await one(
      'SELECT id, name, phone, description, category, ai_triage FROM booking_requests WHERE id = $1 AND company_id = $2',
      [req.body.booking_request_id, cid]
    );
    if (!booking) throw notFound('Booking request not found');
    return res.json(await draftReply({ booking, company, locale }));
  }

  const job = await one(
    `SELECT j.id, j.title, j.scheduled_start, j.public_token,
            json_build_object('name', c.name) AS customer,
            CASE WHEN u.id IS NULL THEN NULL ELSE json_build_object('name', u.name) END AS technician
       FROM jobs j
       JOIN customers c ON c.id = j.customer_id AND c.company_id = j.company_id
       LEFT JOIN users u ON u.id = j.technician_id AND u.company_id = j.company_id
      WHERE j.id = $1 AND j.company_id = $2`,
    [req.body.job_id, cid]
  );
  if (!job) throw notFound('Job not found');
  job.tracking_url = `${baseUrl()}/t/${job.public_token}`;
  res.json(await draftMessage({ job, company, intent: req.body.intent, locale }));
}));

// Back-compat alias used by some UIs: POST /ai/draft-reply { booking_request_id }
router.post('/draft-reply', staff, aiLimiter, ah(async (req, res) => {
  const id = req.body?.booking_request_id;
  if (!id || !z.string().uuid().safeParse(id).success) throw badRequest('booking_request_id is required');
  const booking = await one(
    'SELECT id, name, phone, description, category, ai_triage FROM booking_requests WHERE id = $1 AND company_id = $2',
    [id, req.user.company_id]
  );
  if (!booking) throw notFound('Booking request not found');
  const company = await one('SELECT name, name_ar FROM companies WHERE id = $1', [req.user.company_id]);
  res.json(await draftReply({ booking, company, locale: req.body.locale || 'ar' }));
}));

export default router;
