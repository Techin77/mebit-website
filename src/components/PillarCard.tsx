import { Box, ButtonBase, Typography, useMediaQuery } from '@mui/material';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { motion, useReducedMotion } from 'framer-motion';
import { useState, type ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { springs, tokens } from '../theme';

/**
 * Service card as a full-width navy row; the three cards stack top to bottom on the white home stage.
 * Pointer devices: eyebrow + title at rest; on hover or keyboard focus the card lifts and the
 * description slides in (its space is reserved, so nothing below jumps).
 * Touch devices: description always visible.
 */
export function PillarCard({
  to,
  eyebrow,
  title,
  desc,
  cta,
  art,
}: {
  to: string;
  eyebrow: string;
  title: string;
  desc: string;
  cta: string;
  /** The service page's hero image, shown as the card's backdrop. */
  art?: ReactNode;
}) {
  const canHover = useMediaQuery('(hover: hover) and (pointer: fine)', { noSsr: true });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(false);
  const show = !canHover || active;
  const lit = active && canHover;

  return (
    <motion.div
      whileHover={reduce || !canHover ? undefined : { x: 8 }}
      transition={springs.snappy}
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
    >
      <ButtonBase
        component={RouterLink}
        to={to}
        onFocus={() => setActive(true)}
        onBlur={() => setActive(false)}
        aria-label={`${title}: ${desc}`}
        sx={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'minmax(0, 1fr) minmax(0, 1.15fr)' },
          gridTemplateAreas: { xs: '"head" "body"', md: '"head body"' },
          alignItems: 'center',
          columnGap: { xs: 2, md: 6 },
          rowGap: 2,
          textAlign: 'left',
          borderRadius: `${tokens.radius.lg}px`,
          bgcolor: lit ? '#0A3A5E' : tokens.navy,
          border: `1px solid ${tokens.navy}`,
          color: tokens.white,
          boxShadow: lit ? tokens.shadow.raised : tokens.shadow.rest,
          transition: 'background-color 360ms cubic-bezier(.22,1,.36,1), color 360ms, border-color 360ms, box-shadow 360ms',
          px: { xs: 3, md: 5 },
          py: { xs: 3, md: 4.5 },
          minHeight: { md: 232 },
          position: 'relative',
          overflow: 'hidden',
          isolation: 'isolate',
        }}
      >
        {/* Backdrop: the service's hero image, tilted, on the right. Pointer: fades away on hover so the
            description takes over. Touch: stays, toned down, so it never competes with the text. */}
        {art && (
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              zIndex: 0,
              top: 0,
              bottom: 0,
              right: { xs: '-8%', md: 0 },
              width: { xs: '62%', md: '46%' },
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
              opacity: canHover ? (lit ? 0 : 1) : 0.16,
              transform: lit ? 'perspective(900px) rotateY(0deg) rotate(0deg) scale(0.96)' : 'perspective(900px) rotateY(-16deg) rotate(-5deg)',
              transition: 'opacity 420ms cubic-bezier(.22,1,.36,1), transform 600ms cubic-bezier(.22,1,.36,1)',
              maskImage: 'linear-gradient(to right, transparent 0%, #000 38%)',
              WebkitMaskImage: 'linear-gradient(to right, transparent 0%, #000 38%)',
            }}
          >
            {art}
          </Box>
        )}

        <Box sx={{ gridArea: 'head', minWidth: 0, position: 'relative', zIndex: 1 }}>
          <Typography variant="overline" component="p" sx={{ color: tokens.gold }}>
            {eyebrow}
          </Typography>
          <Typography variant="h3" component="h3" sx={{ mt: 0.5, fontSize: { xs: '1.5rem', md: '2rem' }, lineHeight: 1.25, color: 'inherit' }}>
            {title}
          </Typography>
        </Box>

        <Box sx={{ gridArea: 'body', minWidth: 0, position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={false}
            animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: -12 }}
            transition={reduce ? { duration: 0 } : springs.soft}
          >
            <Typography sx={{ color: tokens.softGrey, maxWidth: 520 }}>{desc}</Typography>
            <Box sx={{ mt: 2, display: 'inline-flex', alignItems: 'center', gap: 1, fontWeight: 600, fontSize: 15, color: tokens.gold }}>
              {cta}
              <ArrowForwardRoundedIcon fontSize="small" />
            </Box>
          </motion.div>
        </Box>

      </ButtonBase>
    </motion.div>
  );
}
