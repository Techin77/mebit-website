import { Box } from '@mui/material';
import { useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { OrbitFrame } from './OrbitSymbol';

/**
 * A Bitcoin coin rendered as a dot grid (the treatment used on loan.mebit.co.th),
 * in navy on the gold hero. The coin turns slowly on its vertical axis; dots near the
 * pointer brighten; a tap gives it a quick spin. Static, face-on when reduced motion is set.
 *
 * The coin is drawn once per frame into a tiny offscreen canvas (one pixel per grid cell),
 * and each cell's coverage picks one of a few opacity buckets, so a frame is ~20 fills.
 */
const PITCH = 5; // grid spacing, CSS px (fine enough for a legible ₿)
const DOT = 4; // square size, CSS px
const BUCKETS = 18;
const MAX_ALPHA = 0.9;
const RGB = '0,43,73'; // brand navy
const REV_MS = 12000; // one turn

export function DotCoinCanvas({
  rgb = RGB,
  maxAlpha = MAX_ALPHA,
  still = false,
  pitch = PITCH,
  dot = DOT,
}: { rgb?: string; maxAlpha?: number; still?: boolean; pitch?: number; dot?: number } = {}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduceMotion = !!useReducedMotion();
  const reduce = reduceMotion || still;

  useEffect(() => {
    const cv = ref.current;
    const ctx = cv?.getContext('2d');
    if (!cv || !ctx) return;
    const off = document.createElement('canvas');
    const o = off.getContext('2d', { willReadFrequently: true });
    if (!o) return;

    const fills = Array.from({ length: BUCKETS }, (_, i) => `rgba(${rgb},${(((i + 1) / BUCKETS) * maxAlpha).toFixed(3)})`);
    let w = 0;
    let h = 0;
    let dpr = 1;
    let cols = 0;
    let rows = 0;
    let angle = 0;
    let boost = 0;
    let fade = reduce ? 1 : 0;
    let raf = 0;
    let last = 0;
    let visible = true;
    let pX = -1e4;
    let pY = -1e4;
    // what the coin shows: Bitcoin, or a Thai baht banknote after a tap
    let shape: 'btc' | 'note' = 'btc';
    let pending = false;
    let prevCos = 1;

    const glyph = (size: number, kind: 'btc' | 'baht' = 'btc') => {
      // ₿: a bold B plus two short strokes above and below. ฿: a bold B with one stroke through it.
      o.font = `800 ${size}px Montserrat, Arial Black, Arial, sans-serif`;
      o.textAlign = 'center';
      o.textBaseline = 'middle';
      o.fillText('B', 0, size * 0.05);
      const bw = size * 0.1;
      const bh = size * 0.2;
      if (kind === 'baht') {
        o.fillRect(-size * 0.05, -size * 0.6, bw, bh);
        o.fillRect(-size * 0.05, size * 0.42, bw, bh);
        return;
      }
      for (const bx of [-size * 0.15, size * 0.04]) {
        o.fillRect(bx, -size * 0.6, bw, bh);
        o.fillRect(bx, size * 0.42, bw, bh);
      }
    };

    const roundRect = (x: number, y: number, rw: number, rh: number, r: number) => {
      o.beginPath();
      o.moveTo(x + r, y);
      o.arcTo(x + rw, y, x + rw, y + rh, r);
      o.arcTo(x + rw, y + rh, x, y + rh, r);
      o.arcTo(x, y + rh, x, y, r);
      o.arcTo(x, y, x + rw, y, r);
      o.closePath();
    };

    /** A Thai baht banknote: border, ฿ in the middle, two round marks; turns like the coin. */
    const note = (cx: number, cy: number, R: number, s: number, edge: number) => {
      const nw = R * 2.3;
      const nh = R * 1.25;
      o.fillStyle = 'rgba(0,0,0,0.45)';
      roundRect(cx + edge - (nw * s) / 2, cy - nh / 2, nw * s, nh, R * 0.08);
      o.fill();
      o.save();
      o.translate(cx, cy);
      o.scale(s, 1);
      o.fillStyle = 'rgba(0,0,0,0.82)';
      roundRect(-nw / 2, -nh / 2, nw, nh, R * 0.1);
      o.fill();
      o.lineWidth = R * 0.05;
      o.strokeStyle = 'rgba(0,0,0,1)';
      roundRect(-nw / 2 + R * 0.12, -nh / 2 + R * 0.12, nw - R * 0.24, nh - R * 0.24, R * 0.06);
      o.stroke();
      o.globalCompositeOperation = 'destination-out';
      o.fillStyle = '#000';
      glyph(R * 0.95, 'baht');
      for (const x of [-nw * 0.33, nw * 0.33]) {
        o.beginPath();
        o.arc(x, 0, R * 0.17, 0, Math.PI * 2);
        o.fill();
      }
      o.restore();
      o.globalCompositeOperation = 'source-over';
    };

    const coin = () => {
      off.width = cols;
      off.height = rows;
      o.clearRect(0, 0, cols, rows);
      const cx = cols / 2;
      const cy = rows / 2;
      const R = Math.min(cols, rows) * 0.3;
      const s = Math.max(0.04, Math.abs(Math.cos(angle)));
      const edge = R * 0.1 * Math.sin(angle);
      if (shape === 'note') {
        note(cx, cy, R, s, edge);
        return o.getImageData(0, 0, cols, rows).data;
      }
      // rim seen edge-on as the coin turns
      o.globalCompositeOperation = 'source-over';
      o.fillStyle = 'rgba(0,0,0,0.5)';
      o.beginPath();
      o.ellipse(cx + edge, cy, R * s, R, 0, 0, Math.PI * 2);
      o.fill();
      o.save();
      o.translate(cx, cy);
      o.scale(s, 1);
      o.fillStyle = 'rgba(0,0,0,0.82)';
      o.beginPath();
      o.arc(0, 0, R, 0, Math.PI * 2);
      o.fill();
      o.lineWidth = R * 0.05;
      o.strokeStyle = 'rgba(0,0,0,1)';
      o.beginPath();
      o.arc(0, 0, R * 0.9, 0, Math.PI * 2);
      o.stroke();
      o.globalCompositeOperation = 'destination-out';
      o.fillStyle = '#000';
      glyph(R * 1.2);
      o.restore();
      o.globalCompositeOperation = 'source-over';
      return o.getImageData(0, 0, cols, rows).data;
    };

    const render = () => {
      if (!cols || !rows) return;
      const data = coin();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const paths = fills.map(() => new Path2D());
      const ox = (w - cols * pitch) / 2 + (pitch - dot) / 2;
      const oy = (h - rows * pitch) / 2 + (pitch - dot) / 2;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) / 2;
      const R = Math.min(cols, rows) * 0.3;
      for (let y = 0; y < rows; y++) {
        // light from above: the coin's lower half sits a little lighter
        const shade = 1 - 0.12 * Math.min(1, Math.max(0, (y - (rows / 2 - R)) / (2 * R)));
        for (let x = 0; x < cols; x++) {
          const gx = ox + x * pitch;
          const gy = oy + y * pitch;
          const dx = gx + dot / 2 - cx;
          const dy = gy + dot / 2 - cy;
          const r = Math.sqrt(dx * dx + dy * dy) / maxR;
          const ambient = r < 1 ? 0.1 * Math.pow(1 - r, 1.3) : 0;
          let v = Math.max(ambient, (data[(y * cols + x) * 4 + 3] / 255) * shade * fade);
          if (pX > -1e3) {
            const ex = gx - pX;
            const ey = gy - pY;
            const d2 = ex * ex + ey * ey;
            if (d2 < 9000) v += 0.22 * Math.exp(-d2 / 2400);
          }
          const b = Math.round(Math.min(1, v) * BUCKETS);
          if (b > 0) paths[b - 1].rect(gx, gy, dot, dot);
        }
      }
      for (let i = 0; i < BUCKETS; i++) {
        ctx.fillStyle = fills[i];
        ctx.fill(paths[i]);
      }
    };

    const resize = () => {
      const rect = cv.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      w = rect.width;
      h = rect.height;
      dpr = Math.min(2, Math.max(1, window.devicePixelRatio || 1));
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      cols = Math.floor(w / pitch);
      rows = Math.floor(h / pitch);
      render();
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if (!visible || t - last < 33) return;
      const dt = last ? Math.min(100, t - last) : 33;
      last = t;
      fade = Math.min(1, fade + dt / 1200);
      angle += ((dt * Math.PI * 2) / REV_MS) * (1 + boost);
      boost *= 0.9;
      // swap coin ↔ banknote at the moment it is edge-on, so the change hides inside the spin
      const c = Math.cos(angle);
      if (pending && Math.sign(c) !== Math.sign(prevCos)) {
        shape = shape === 'btc' ? 'note' : 'btc';
        pending = false;
      }
      prevCos = c;
      render();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(cv);
    resize();
    document.fonts?.load('700 40px Montserrat').then(render, () => undefined);

    const onMove = (e: PointerEvent) => {
      const rect = cv.getBoundingClientRect();
      pX = e.clientX - rect.left;
      pY = e.clientY - rect.top;
      if (reduce) render();
    };
    const onLeave = () => {
      pX = pY = -1e4;
      if (reduce) render();
    };
    const onDown = () => {
      // swap at once, then a fast spin that eases out
      shape = shape === 'btc' ? 'note' : 'btc';
      if (reduceMotion) {
        render();
        return;
      }
      boost = 16;
    };
    cv.addEventListener('pointermove', onMove);
    cv.addEventListener('pointerleave', onLeave);
    if (!still) cv.addEventListener('pointerdown', onDown);
    if (!reduce) raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      cv.removeEventListener('pointermove', onMove);
      cv.removeEventListener('pointerleave', onLeave);
      cv.removeEventListener('pointerdown', onDown);
    };
  }, [reduce, reduceMotion, still, rgb, maxAlpha, pitch, dot]);

  return (
    <Box
      component="canvas"
      ref={ref}
      aria-hidden
      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', cursor: still ? 'default' : 'pointer', touchAction: 'pan-y', pointerEvents: still ? 'none' : 'auto' }}
    />
  );
}

/** The coin inside the same orbit device as the home hero, in navy on gold. Coin radius = 180 of 600 units. */
export function CoinOrbit({ size = 480 }: { size?: number }) {
  return (
    <OrbitFrame size={size} tone="gold" orbit={{ rx: 232, ry: 232 }} dashR={262} outerR={296}>
      <DotCoinCanvas />
    </OrbitFrame>
  );
}
