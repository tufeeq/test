// Error helpers. Every error response is { error: { code, message, details? } }.
export class HttpError extends Error {
  constructor(status, code, message, details) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
  }
}
export const badRequest   = (msg = 'Bad request', details) => new HttpError(400, 'bad_request', msg, details);
export const unauthorized = (msg = 'Not signed in')        => new HttpError(401, 'unauthorized', msg);
export const forbidden    = (msg = 'Not allowed')          => new HttpError(403, 'forbidden', msg);
export const notFound     = (msg = 'Not found')            => new HttpError(404, 'not_found', msg);
export const conflict     = (msg = 'Conflict')             => new HttpError(409, 'conflict', msg);
export const paymentRequired = (msg = 'Plan limit reached') => new HttpError(402, 'plan_limit', msg);

/** Wrap async route handlers so thrown errors reach the error middleware. */
export const ah = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

/** Express error middleware — mount last. */
export function errorHandler(err, req, res, _next) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: { code: err.code, message: err.message, details: err.details } });
  }
  // pg unique violation / FK violation → friendly codes
  if (err?.code === '23505') return res.status(409).json({ error: { code: 'conflict', message: err.detail || 'Already exists' } });
  if (err?.code === '23503') return res.status(400).json({ error: { code: 'bad_reference', message: err.detail || 'Referenced record not found' } });
  if (err?.code === '22P02') return res.status(400).json({ error: { code: 'bad_request', message: 'Invalid id or value' } });
  if (err?.type === 'entity.parse.failed') return res.status(400).json({ error: { code: 'bad_json', message: 'Malformed JSON body' } });
  if (err?.type === 'entity.too.large') return res.status(413).json({ error: { code: 'too_large', message: 'Payload too large' } });
  console.error('[error]', req.method, req.originalUrl, err);
  res.status(500).json({ error: { code: 'internal', message: 'Internal server error' } });
}
