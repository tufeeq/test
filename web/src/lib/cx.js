/** cx('a', cond && 'b', {c: true}) → 'a b c' */
export function cx(...args) {
  const out = [];
  for (const a of args) {
    if (!a) continue;
    if (typeof a === 'string') out.push(a);
    else if (typeof a === 'object') for (const [k, v] of Object.entries(a)) if (v) out.push(k);
  }
  return out.join(' ');
}
