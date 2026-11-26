import { Box, Container, Typography, type BoxProps, type SxProps, type Theme } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { springs, tokens } from '../theme';
import logoPrimary from '../assets/mebit-logo-primary.svg';
import logoReverse from '../assets/mebit-logo-reverse.svg';
import symbolPrimary from '../assets/mebit-symbol-primary.svg';
import symbolReverse from '../assets/mebit-symbol-reverse.svg';

/** Official artwork only — never recoloured, rotated or redrawn. */
export function Logo({
  variant = 'symbol',
  ground = 'light',
  size,
  alt = 'MEBIT',
}: {
  variant?: 'full' | 'symbol';
  ground?: 'light' | 'dark';
  size: number | string;
  alt?: string;
}) {
  const src =
    variant === 'full'
      ? ground === 'light'
        ? logoPrimary
        : logoReverse
      : ground === 'light'
        ? symbolPrimary
        : symbolReverse;
  return <Box component="img" src={src} alt={alt} sx={{ width: size, height: 'auto', display: 'block' }} draggable={false} />;
}

type Tone = 'plain' | 'muted' | 'brand' | 'gold' | 'wash';

export function Section({
  tone = 'plain',
  children,
  sx,
  id,
  inner,
  ...rest
}: { tone?: Tone; children: ReactNode; inner?: SxProps<Theme> } & BoxProps) {
  const bg = { plain: tokens.white, muted: tokens.softGrey, brand: tokens.navy, gold: tokens.gold, wash: tokens.goldWash }[tone];
  return (
    <Box
      component="section"
      id={id}
      className={tone === 'brand' ? 'on-brand' : undefined}
      sx={{
        bgcolor: bg,
        color: tone === 'brand' ? tokens.white : tokens.navy,
        py: { xs: 8, md: 12 },
        ...sx,
      }}
      {...rest}
    >
      <Container maxWidth={false} sx={{ maxWidth: tokens.pageMax + 128, px: { xs: 2, sm: 4, md: 8 }, ...inner }}>
        {children}
      </Container>
    </Box>
  );
}

/** Uppercase, letter-spaced label. Slate on light, gold on navy. */
export function Eyebrow({ children, onBrand, sx }: { children: ReactNode; onBrand?: boolean; sx?: SxProps<Theme> }) {
  return (
    <Typography
      variant="overline"
      component="p"
      sx={{ color: onBrand ? tokens.gold : tokens.slate, display: 'block', mb: 2, ...sx }}
    >
      {children}
    </Typography>
  );
}

/** The thin accent line from the brand book: 2px gold, ~120px, under a hero title. */
export function AccentLine({ sx }: { sx?: SxProps<Theme> }) {
  return <Box aria-hidden sx={{ width: 120, height: 2, bgcolor: tokens.gold, ...sx }} />;
}

/** Fade-and-rise on first view, spring-driven. Disabled under reduced motion. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  as = 'div',
  style,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: 'div' | 'li';
  style?: React.CSSProperties;
}) {
  const reduce = useReducedMotion();
  const Comp = as === 'li' ? motion.li : motion.div;
  return (
    <Comp
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ ...springs.soft, delay }}
    >
      {children}
    </Comp>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  onBrand,
  align = 'left',
  mb = 6,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  onBrand?: boolean;
  align?: 'left' | 'center';
  mb?: number;
}) {
  return (
    <Box sx={{ mb, textAlign: align, mx: align === 'center' ? 'auto' : 0, maxWidth: 760 }}>
      <Reveal>
        <Eyebrow onBrand={onBrand}>{eyebrow}</Eyebrow>
        <Typography variant="h2" component="h2" sx={{ color: onBrand ? tokens.white : tokens.navy }}>
          <Phrases text={title} />
        </Typography>
        {lead && (
          <Typography variant="subtitle1" sx={{ mt: 2, color: onBrand ? tokens.softGrey : tokens.charcoal, maxWidth: tokens.measure }}>
            {lead}
          </Typography>
        )}
      </Reveal>
    </Box>
  );
}

/**
 * Thai has no spaces between words, so browsers may break a headline mid-word.
 * Thai copy uses spaces between phrases; keep each phrase on one line.
 */
export function Phrases({ text }: { text: string }) {
  // Separators (space, or U+200B = break with no visible gap) stay OUTSIDE the nowrap spans,
  // so they remain break opportunities.
  const tokens = text.split(/([ \u200b])/);
  return (
    <>
      {tokens.map((tok, i) =>
        i % 2 === 1 ? (
          tok
        ) : (
          <span key={i} style={{ whiteSpace: 'nowrap' }}>
            {tok}
          </span>
        ),
      )}
    </>
  );
}
