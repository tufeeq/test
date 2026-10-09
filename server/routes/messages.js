// /api/messages — OWNER: B5. Notification log + manual sends. See docs/API.md § 13.
import { Router } from 'express';
import { requireRole } from '../lib/auth.js';
import { one, many, paging, audit } from '../lib/db.js';
import { ah, notFound, badRequest } from '../lib/errors.js';
import { validate, z, idParam } from '../lib/validate.js';
import { notify, whatsappConfigured } from '../lib/notify.js';

const router = Router();
router.use(requireRole('owner', 'dispatcher'));

const COLS = `m.id, m.customer_id, m.job_id, m.channel, m.direction, m.to_addr, m.body, m.status,
  m.event, m.template, m.provider_id, m.error, m.created_at,
  CASE WHEN c.id IS NULL THEN NULL ELSE json_build_object('id', c.id, 'name', c.name) END AS customer,
  CASE WHEN j.id IS NULL THEN NULL ELSE json_build_object('id', j.id, 'number', j.number, 'title', j.title) END AS job`;
const FROM = `FROM messages m
  LEFT JOIN customers c ON c.id = m.customer_id AND c.company_id = m.company_id
  LEFT JOIN jobs j ON j.id = m.job_id AND j.company_id = m.company_id`;

const ListQuery = z.object({
  job_id: z.string().uuid().optional(),
  customer_id: z.string().uuid().optional(),
  channel: z.enum(['whatsapp', 'sms', 'email', 'system']).optional(),
  status: z.enum(['queued', 'sent', 'failed', 'simulated']).optional(),
  event: z.string().max(60).optional(),
  from: z.string().datetime({ offset: true }).optional(),
  to: z.string().datetime({ offset: true }).optional(),
  q: z.string().optional(), limit: z.any().optional(), offset: z.any().optional(),
});

router.get('/', validate({ query: ListQuery }), ah(async (req, res) => {
  const f = req.validQuery;
  const { limit, offset, q } = paging(req.query);
  const where = ['m.company_id = $1'];
  const params = [req.user.company_id];
  const add = (sql, v) => { params.push(v); where.push(sql.replace('?', `$${params.length}`)); };
  if (f.job_id) add('m.job_id = ?', f.job_id);
  if (f.customer_id) add('m.customer_id = ?', f.customer_id);
  if (f.channel) add('m.channel = ?', f.channel);
  if (f.status) add('m.status = ?', f.status);
  if (f.event) add('m.event = ?', f.event);
  if (f.from) add('m.created_at >= ?', f.from);
  if (f.to) add('m.created_at < ?', f.to);
  if (q) { params.push(`%${q}%`); const n = params.length; where.push(`(m.body ILIKE $${n} OR m.to_addr ILIKE $${n} OR c.name ILIKE $${n})`); }
  const w = where.join(' AND ');
  const [{ total }] = await many(`SELECT count(*) AS total ${FROM} WHERE ${w}`, params);
  const items = await many(
    `SELECT ${COLS} ${FROM} WHERE ${w} ORDER BY m.created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`,
    [...params, limit, offset]
  );
  res.json({ items, total, limit, offset, provider: { whatsapp: whatsappConfigured() ? 'live' : 'simulated' } });
}));

router.get('/:id', validate({ params: idParam }), ah(async (req, res) => {
  const m = await one(`SELECT ${COLS}, m.params ${FROM} WHERE m.id = $1 AND m.company_id = $2`, [req.params.id, req.user.company_id]);
  if (!m) throw notFound('Message not found');
  res.json(m);
}));

const SendBody = z.object({
  customer_id: z.string().uuid().optional().nullable(),
  job_id: z.string().uuid().optional().nullable(),
  channel: z.enum(['whatsapp', 'sms']).optional().default('whatsapp'),
  to: z.string().trim().min(7).max(20).optional().nullable(),
  body: z.string().trim().min(1).max(4000),
});

router.post('/', validate({ body: SendBody }), ah(async (req, res) => {
  const cid = req.user.company_id;
  let { customer_id: customerId, job_id: jobId, to } = req.body;
  if (jobId) {
    const job = await one('SELECT id, customer_id FROM jobs WHERE id = $1 AND company_id = $2', [jobId, cid]);
    if (!job) throw notFound('Job not found');
    customerId = customerId || job.customer_id;
  }
  if (customerId) {
    const cu = await one('SELECT id, phone FROM customers WHERE id = $1 AND company_id = $2', [customerId, cid]);
    if (!cu) throw notFound('Customer not found');
    to = to || cu.phone;
  }
  if (!to) throw badRequest('Recipient phone is required (to, or a customer with a phone)');
  const msg = await notify({ companyId: cid, customerId, jobId, channel: req.body.channel, to, body: req.body.body, event: 'manual' });
  if (!msg) throw badRequest('Message could not be logged');
  audit(req.user, 'send', 'message', msg.id);
  res.status(201).json(msg);
}));

// Resend a logged message (same recipient, template + params when it was a template).
router.post('/:id/resend', validate({ params: idParam }), ah(async (req, res) => {
  const cid = req.user.company_id;
  const m = await one('SELECT * FROM messages WHERE id = $1 AND company_id = $2', [req.params.id, cid]);
  if (!m) throw notFound('Message not found');
  if (m.direction !== 'out') throw badRequest('Only outgoing messages can be resent');
  const msg = await notify({
    companyId: cid, customerId: m.customer_id, jobId: m.job_id, channel: m.channel, to: m.to_addr,
    body: m.body, template: m.template, params: m.params, event: m.event,
  });
  if (!msg) throw badRequest('Message could not be logged');
  audit(req.user, 'resend', 'message', msg.id);
  res.status(201).json(msg);
}));

export default router;
