import { Box } from '@mui/material';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform, type MotionValue } from 'framer-motion';
import { useEffect, type ReactNode } from 'react';
import { springs, tokens } from '../theme';
import logoReverse from '../assets/mebit-logo-reverse.svg';
import logoNavy from '../assets/mebit-logo-navy.svg';
import logoPrimary from '../assets/mebit-logo-primary.svg';

type OrbitTone = 'navy' | 'gold';

/**
 * The Mercury Orbit graphic device, drawn AROUND a centred subject and never across it.
 * Coordinates are in a 600×600 box centred on 0,0. Every ring stays outside the subject's bounds.
 *  - rings draw in on load,
 *  - a dashed ring turns slowly (continuity, long-term view),
 *  - a point travels the orbit around the subject (Mercury: movement, service),
 *  - the outer rings drift with the pointer on spring physics; the orbit itself stays put.
 */
export function OrbitFrame({
  size,
  tone = 'navy',
  orbit,
  dashR,
  outerR,
  children,
}: {
  size: number;
  tone?: OrbitTone;
  orbit: { rx: number; ry: number };
  dashR: number;
  outerR: number;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, springs.drift);
  const sy = useSpring(py, springs.drift);

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: PointerEvent) => {
      px.set((e.clientX / window.innerWidth - 0.5) * 2);
      py.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [px, py, reduce]);

  const far = { x: useTransform(sx, (v) => v * 10), y: useTransform(sy, (v) => v * 10) };
  const mid = { x: useTransform(sx, (v) => v * 5), y: useTransform(sy, (v) => v * 5) };

  const ring = tone === 'navy' ? tokens.softGrey : tokens.navy;
  const accent = tone === 'navy' ? tokens.gold : tokens.navy;
  const k = tone === 'navy' ? 1 : 0.9; // ring opacity scale per ground

  const { rx, ry } = orbit;
  const orbitPath = `M ${-rx} 0 A ${rx} ${ry} 0 1 1 ${rx} 0 A ${rx} ${ry} 0 1 1 ${-rx} 0`;
  const draw = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { pathLength: { duration: 1.6, ease: [0.22, 1, 0.36, 1], delay }, opacity: { duration: 0.4, delay } },
        };

  return (
    <Box sx={{ position: 'relative', width: size, maxWidth: '100%', aspectRatio: '1 / 1', mx: 'auto' }}>
      {children}
      <svg
        aria-hidden
        viewBox="-300 -300 600 600"
        width="100%"
        height="100%"
        style={{ position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none' }}
      >
        <Layer mv={far}>
          <motion.circle r={outerR} fill="none" stroke={ring} strokeOpacity={0.14 * k} strokeWidth={1} {...draw(0.1)} />
        </Layer>
        <Layer mv={mid}>
          <motion.g animate={reduce ? undefined : { rotate: 360 }} transition={{ duration: 120, ease: 'linear', repeat: Infinity }}>
            <motion.circle r={dashR} fill="none" stroke={ring} strokeOpacity={0.3 * k} strokeWidth={1.25} strokeDasharray="2 10" {...draw(0.25)} />
          </motion.g>
        </Layer>
        <motion.path d={orbitPath} fill="none" stroke={accent} strokeOpacity={0.55} strokeWidth={1.25} {...draw(0.45)} />
        {!reduce && (
          <g>
            <circle r={16} fill={accent} opacity={0.16}>
              <animateMotion dur="16s" repeatCount="indefinite" path={orbitPath} />
            </circle>
            <circle r={7} fill={accent}>
              <animateMotion dur="16s" repeatCount="indefinite" path={orbitPath} />
            </circle>
          </g>
        )}
        {reduce && <circle cx={rx * Math.cos(-0.6)} cy={ry * Math.sin(-0.6)} r={7} fill={accent} />}
      </svg>
    </Box>
  );
}

/** Home hero: the full stacked master logo, large and upright. `primary` = the original full-colour master for white grounds. `navy` = the one-colour master in Orbit Navy (brand book p.13), for the yellow ground. */
export function HeroLogo({ alt = 'MEBIT Bitcoin Saving Company', navy = false, primary = false }: { alt?: string; navy?: boolean; primary?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { scale: 0.94, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ ...springs.soft, delay: 0.1 }}
    >
      {/* Official artwork, unmodified: no shadow, glow, outline or rotation (brand book, "Protect the mark"). */}
      <img src={primary ? logoPrimary : navy ? logoNavy : logoReverse} alt={alt} draggable={false} style={{ width: '100%', height: 'auto', display: 'block' }} />
    </motion.div>
  );
}

function Layer({ mv, children }: { mv: { x: MotionValue<number>; y: MotionValue<number> }; children: ReactNode }) {
  return <motion.g style={{ x: mv.x, y: mv.y }}>{children}</motion.g>;
}
