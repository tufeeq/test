// OWNER: B4. Finger signature pad (pointer events, HiDPI canvas, smooth quadratic strokes).
//   <SignaturePad ref={ref} onChange={(hasInk)=>…} />   ref.current.toDataURL() → trimmed PNG data URL | null; .clear()
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

const INK = '#062A2B';

const SignaturePad = forwardRef(function SignaturePad({ onChange, height = 220, className }, ref) {
  const canvasRef = useRef(null);
  const state = useRef({ drawing: false, pts: [], ink: false, bounds: null });

  const ctx = () => canvasRef.current?.getContext('2d');

  const setup = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = Math.max(1, Math.min(3, window.devicePixelRatio || 1));
    const rect = c.getBoundingClientRect();
    // Keep existing ink across resizes (rotation): copy, resize, paste.
    let snapshot = null;
    if (state.current.ink && c.width && c.height) {
      snapshot = document.createElement('canvas');
      snapshot.width = c.width; snapshot.height = c.height;
      snapshot.getContext('2d').drawImage(c, 0, 0);
    }
    c.width = Math.round(rect.width * dpr);
    c.height = Math.round(rect.height * dpr);
    const g = c.getContext('2d');
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    g.lineCap = 'round';
    g.lineJoin = 'round';
    g.strokeStyle = INK;
    g.lineWidth = 2.6;
    if (snapshot) g.drawImage(snapshot, 0, 0, snapshot.width / dpr, snapshot.height / dpr);
  }, []);

  useEffect(() => {
    setup();
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => setup()) : null;
    ro?.observe(canvasRef.current);
    return () => ro?.disconnect();
  }, [setup]);

  const pos = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top, p: e.pressure || 0.5 };
  };
  const grow = (p) => {
    const b = state.current.bounds || { x0: p.x, y0: p.y, x1: p.x, y1: p.y };
    state.current.bounds = { x0: Math.min(b.x0, p.x), y0: Math.min(b.y0, p.y), x1: Math.max(b.x1, p.x), y1: Math.max(b.y1, p.y) };
  };

  const down = (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();
    canvasRef.current.setPointerCapture?.(e.pointerId);
    const p = pos(e);
    state.current.drawing = true;
    state.current.pts = [p];
    grow(p);
    const g = ctx();
    g.beginPath();
    g.arc(p.x, p.y, 1.3, 0, Math.PI * 2);
    g.fillStyle = INK;
    g.fill();
  };
  const move = (e) => {
    if (!state.current.drawing) return;
    e.preventDefault();
    const events = e.getCoalescedEvents ? e.getCoalescedEvents() : [e];
    const g = ctx();
    for (const ev of events.length ? events : [e]) {
      const p = pos(ev);
      const pts = state.current.pts;
      pts.push(p);
      grow(p);
      if (pts.length < 3) continue;
      const [a, b, c] = pts.slice(-3);
      const m1 = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const m2 = { x: (b.x + c.x) / 2, y: (b.y + c.y) / 2 };
      g.lineWidth = 1.8 + 1.8 * Math.min(1, c.p * 1.4);
      g.beginPath();
      g.moveTo(m1.x, m1.y);
      g.quadraticCurveTo(b.x, b.y, m2.x, m2.y);
      g.stroke();
    }
    if (!state.current.ink) { state.current.ink = true; onChange?.(true); }
  };
  const up = (e) => {
    if (!state.current.drawing) return;
    state.current.drawing = false;
    canvasRef.current.releasePointerCapture?.(e.pointerId);
    if (!state.current.ink && state.current.pts.length) { state.current.ink = true; onChange?.(true); }
  };

  useImperativeHandle(ref, () => ({
    clear() {
      const c = canvasRef.current;
      ctx().clearRect(0, 0, c.width, c.height);
      state.current = { drawing: false, pts: [], ink: false, bounds: null };
      onChange?.(false);
    },
    isEmpty: () => !state.current.ink,
    /** Trimmed, white-backed PNG (small enough for the 500 KB API limit). */
    toDataURL() {
      if (!state.current.ink || !state.current.bounds) return null;
      const c = canvasRef.current;
      const dpr = c.width / c.getBoundingClientRect().width || 1;
      const pad = 12;
      const b = state.current.bounds;
      const sx = Math.max(0, (b.x0 - pad) * dpr), sy = Math.max(0, (b.y0 - pad) * dpr);
      const sw = Math.min(c.width - sx, (b.x1 - b.x0 + pad * 2) * dpr), sh = Math.min(c.height - sy, (b.y1 - b.y0 + pad * 2) * dpr);
      const scale = Math.min(1, 600 / sw);
      const out = document.createElement('canvas');
      out.width = Math.max(1, Math.round(sw * scale));
      out.height = Math.max(1, Math.round(sh * scale));
      const g = out.getContext('2d');
      g.fillStyle = '#fff';
      g.fillRect(0, 0, out.width, out.height);
      g.drawImage(c, sx, sy, sw, sh, 0, 0, out.width, out.height);
      return out.toDataURL('image/png');
    },
  }), [onChange]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: '100%', height, touchAction: 'none', display: 'block' }}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      onPointerLeave={(e) => e.pointerType === 'mouse' && up(e)}
    />
  );
});

export default SignaturePad;
