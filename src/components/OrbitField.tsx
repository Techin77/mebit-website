import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useId, useState, type RefObject } from 'react';
import { tokens } from '../theme';

type Box4 = { x: number; y: number; w: number; h: number };
const GAP = 28; // clear space kept between any orbit line and a block of text

/**
 * Page-wide orbit field, from the booth backdrop: true circles (never ovals), thin lines,
 * a few "planet" points with a halo ring travelling on them, plus two off-centre arcs.
 * The circles share one centre: the middle of the anchor (the hero logo). The smallest ring
 * clears the logo's corners, so no line ever crosses the mark. The field covers the whole
 * parent, so the rings carry on past the hero into the next section.
 *
 * Text stays clear the way the booth backdrop does it: lines simply stop short of every text block
 * (any element in the parent marked `data-orbit-avoid`), leaving a soft-edged gap around it.
 */
export function OrbitField({
  anchorRef,
  anchorSelector,
  parentRef,
  tone = 'dark',
}: {
  anchorRef?: RefObject<HTMLElement>;
  /** Centre on an element in the sticky page header instead (e.g. `[data-orbit-anchor]`). */
  anchorSelector?: string;
  parentRef: RefObject<HTMLElement>;
  /** dark: light lines on navy · light: navy on white · gold: navy on Mercury Gold, centred on the header logo */
  tone?: 'dark' | 'light' | 'gold';
}) {
  const gold = tone === 'gold';
  const line = tone === 'dark' ? tokens.softGrey : tokens.navy;
  const k = tone === 'light' ? 0.6 : 1; // navy lines on white read stronger, so scale them down
  const reduce = useReducedMotion();
  const [g, setG] = useState({ W: 0, H: 0, cx: 0, cy: 0, r0: 0 });
  const [holes, setHoles] = useState<Box4[]>([]);
  const maskId = `orbit-mask-${useId().replace(/:/g, '')}`;

  useEffect(() => {
    const parent = parentRef.current;
    const anchor = anchorSelector ? document.querySelector<HTMLElement>(anchorSelector) : anchorRef?.current;
    if (!parent || !anchor) return;
    const header = anchorSelector ? anchor.closest('header') : null;
    const measure = () => {
      const p = parent.getBoundingClientRect();
      const a = anchor.getBoundingClientRect();
      const cx = a.left - p.left + a.width / 2;
      // A sticky header moves with the viewport, so place the anchor where it sits at the top of the
      // page (the header starts the document) rather than where it is stuck right now.
      const cy = header
        ? a.top - header.getBoundingClientRect().top + a.height / 2 - (p.top + window.scrollY)
        : a.top - p.top + a.height / 2;
      const r0 = gold ? Math.max(150, p.height * 0.14) : Math.hypot(a.width, a.height) / 2 + 36;
      setG({ W: p.width, H: p.height, cx, cy, r0 });
      setHoles(
        Array.from(parent.querySelectorAll<HTMLElement>('[data-orbit-avoid]')).map((el) => {
          const r = el.getBoundingClientRect();
          return { x: r.left - p.left - GAP, y: r.top - p.top - GAP, w: r.width + GAP * 2, h: r.height + GAP * 2 };
        }),
      );
    };
    measure();
    // text settles after fonts load and the entrance animation ends
    const late = window.setTimeout(measure, 1200);
    document.fonts?.ready.then(measure, () => undefined);
    const ro = new ResizeObserver(measure);
    ro.observe(parent);
    ro.observe(anchor);
    window.addEventListener('resize', measure);
    return () => {
      window.clearTimeout(late);
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [anchorRef, anchorSelector, parentRef, gold]);

  const { W, H, cx, cy, r0 } = g;
  if (!W || !H) return null;

  const maxR = Math.max(Math.hypot(cx, cy), Math.hypot(W - cx, cy), Math.hypot(cx, H - cy), Math.hypot(W - cx, H - cy));
  const radii: number[] = [];
  for (let r = r0; r < maxR * 1.05; r *= gold ? 1.3 : 1.42) radii.push(r);

  const planets = (
    gold
      ? [
          { ring: 0, dur: 50, start: 60, color: tokens.navy, size: 4 },
          { ring: 2, dur: 90, start: 35, color: tokens.white, size: 5.5 },
          { ring: 4, dur: 140, start: 70, color: tokens.navy, size: 5 },
          { ring: 6, dur: 200, start: 25, color: tokens.white, size: 6 },
          { ring: 8, dur: 260, start: 50, color: tokens.navy, size: 5 },
        ]
      : [
          { ring: 1, dur: 48, start: -35, color: tokens.gold, size: 5 },
          { ring: 3, dur: 90, start: 150, color: tone === 'light' ? tokens.navy : tokens.white, size: 4.5 },
          { ring: 4, dur: 140, start: 30, color: tokens.gold, size: 5.5 },
        ]
  ).filter((p) => p.ring < radii.length);
  // gold ground: navy rings carry more weight and the innermost circles the header mark in navy
  const ringOpacity = (i: number) => (gold ? Math.max(0.1, 0.3 - i * 0.022) : Math.max(0.07, 0.24 - i * 0.025));
  const firstRing = gold ? { stroke: tokens.navy, opacity: 0.4, width: 1.25 } : { stroke: tokens.gold, opacity: 0.7, width: 1 };
  const dashExtra = gold ? 0.08 : 0.06;

  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { pathLength: { duration: 2.2, ease: [0.22, 1, 0.36, 1], delay }, opacity: { duration: 0.6, delay } },
        };

  return (
    <svg
      aria-hidden
      width={W}
      height={H}
      viewBox={`0 0 ${W} ${H}`}
      style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', display: 'block' }}
    >
      <defs>
        <filter id={`${maskId}-soft`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <mask id={maskId} maskUnits="userSpaceOnUse" x={0} y={0} width={W} height={H}>
          <rect x={0} y={0} width={W} height={H} fill="#fff" />
          <g filter={`url(#${maskId}-soft)`}>
            {holes.map((b, i) => (
              <rect key={i} x={b.x} y={b.y} width={b.w} height={b.h} rx={GAP} fill="#000" />
            ))}
          </g>
        </mask>
      </defs>
      <g mask={`url(#${maskId})`}>
      {/* off-centre arcs, as on the backdrop */}
      {gold ? (
        <>
          <motion.circle cx={W * 0.98} cy={H * 0.62} r={Math.max(W, 700) * 0.5} fill="none" stroke={line} strokeOpacity={0.08} strokeWidth={1} {...draw(0.6)} />
          <motion.circle cx={W * 0.1} cy={H * 1.02} r={Math.max(W, 700) * 0.36} fill="none" stroke={line} strokeOpacity={0.07} strokeWidth={1} {...draw(0.8)} />
        </>
      ) : (
        <>
          <motion.circle cx={W * 0.96} cy={cy + H * 0.3} r={Math.max(W, 700) * 0.55} fill="none" stroke={line} strokeOpacity={0.08 * k} strokeWidth={1} {...draw(0.6)} />
          <motion.circle cx={W * 0.02} cy={H * 0.98} r={Math.max(W, 700) * 0.42} fill="none" stroke={line} strokeOpacity={0.07 * k} strokeWidth={1} {...draw(0.8)} />
        </>
      )}

      {radii.map((r, i) => {
        const op = ringOpacity(i);
        const dashed = i % 3 === 1;
        return dashed ? (
          <g key={r}>
            <motion.circle cx={cx} cy={cy} r={r} fill="none" stroke={line} strokeOpacity={(op + dashExtra) * k} strokeWidth={1.25} strokeDasharray="2 11" {...draw(0.1 + i * 0.12)} />
            {!reduce && <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="200s" repeatCount="indefinite" />}
          </g>
        ) : (
          <motion.circle key={r} cx={cx} cy={cy} r={r} fill="none" stroke={i === 0 ? firstRing.stroke : line} strokeOpacity={i === 0 ? firstRing.opacity : op * k} strokeWidth={i === 0 ? firstRing.width : 1} {...draw(0.1 + i * 0.12)} />
        );
      })}

      {planets.map((p) => {
        const r = radii[p.ring];
        return (
          <g key={p.ring} transform={`rotate(${p.start} ${cx} ${cy})`}>
            <g>
              <circle cx={cx + r} cy={cy} r={p.size * 2.8} fill="none" stroke={p.color} strokeOpacity={gold ? 0.6 : 0.55} strokeWidth={1} />
              <circle cx={cx + r} cy={cy} r={p.size} fill={p.color} />
              {!reduce && (
                <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur={`${p.dur}s`} repeatCount="indefinite" />
              )}
            </g>
          </g>
        );
      })}
      </g>
    </svg>
  );
}
