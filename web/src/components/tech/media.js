// OWNER: B4. Client-side photo compression + contact deep links.

const MAX_BYTES = 300 * 1024;

async function decode(file) {
  if (typeof createImageBitmap === 'function') {
    try {
      return await createImageBitmap(file, { imageOrientation: 'from-image' });
    } catch { /* fall back to <img> */ }
  }
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    await img.decode();
    return img;
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
}

/**
 * Compress a camera photo to a JPEG data URL whose length is ≤ maxBytes (default 300 KB).
 * Starts at ≤1280px / q0.72, lowers quality, then dimensions, until it fits.
 */
export async function compressImage(file, { maxBytes = MAX_BYTES, maxDim = 1280 } = {}) {
  const img = await decode(file);
  const w0 = img.width || img.naturalWidth;
  const h0 = img.height || img.naturalHeight;
  let scale = Math.min(1, maxDim / Math.max(w0, h0));
  let q = 0.72;
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  let out = '';
  for (let i = 0; i < 12; i++) {
    canvas.width = Math.max(1, Math.round(w0 * scale));
    canvas.height = Math.max(1, Math.round(h0 * scale));
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    out = canvas.toDataURL('image/jpeg', q);
    if (out.length <= maxBytes) break;
    if (q > 0.46) q = Math.round((q - 0.12) * 100) / 100;
    else scale *= 0.8;
  }
  img.close?.();
  return out;
}

/** Google Maps deep link (opens the app on Android/iOS). */
export function mapsUrl(site) {
  if (!site) return null;
  if (site.lat != null && site.lng != null) return `https://www.google.com/maps/dir/?api=1&destination=${site.lat},${site.lng}`;
  const q = [site.address, site.district, site.city].filter(Boolean).join('، ');
  return q ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}` : null;
}

/** 9665XXXXXXXX → tel:+9665XXXXXXXX */
export const telUrl = (phone) => (phone ? `tel:+${String(phone).replace(/[^\d]/g, '')}` : null);
export const waUrl = (phone, text) =>
  phone ? `https://wa.me/${String(phone).replace(/[^\d]/g, '')}${text ? `?text=${encodeURIComponent(text)}` : ''}` : null;

/** Display 9665XXXXXXXX as 05X XXX XXXX. */
export function displayPhone(p) {
  const d = String(p || '').replace(/[^\d]/g, '');
  if (/^9665\d{8}$/.test(d)) { const l = `0${d.slice(3)}`; return `${l.slice(0, 3)} ${l.slice(3, 6)} ${l.slice(6)}`; }
  return p || '';
}
