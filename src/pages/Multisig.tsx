import { Box, Button, Grid2 as Grid, Stack, Typography, type SxProps, type Theme } from '@mui/material';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { motion, useReducedMotion } from 'framer-motion';
import { links } from '../content/common';
import { multisig } from '../content/multisig';
import { useCopy } from '../i18n';
import { springs, tokens } from '../theme';
import { InfoCards, Steps } from '../components/Blocks';
import { AccentLine, Eyebrow, Phrases, Reveal, Section, SectionHead } from '../components/primitives';

/**
 * Three hardware wallets — one per key — joined by one dashed line: they act as one wallet.
 * Generic device silhouettes, not renders of any brand's product.
 */
/** Duration, location, format: a small three-column strip. */
function Facts({ facts, sx }: { facts: { label: string; value: string }[]; sx?: SxProps<Theme> }) {
  return (
    <Box sx={{ gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 2, maxWidth: 500, mx: { md: 'auto' }, ...sx }}>
      {facts.map((f) => (
        <Box key={f.label} sx={{ borderTop: '1px solid rgba(235,235,238,0.24)', pt: 1.25, minWidth: 0 }}>
          <Typography variant="overline" component="p" sx={{ color: tokens.gold, fontSize: 10.5, lineHeight: 1.6 }}>{f.label}</Typography>
          <Typography sx={{ fontWeight: 500, fontSize: 14, color: tokens.white, lineHeight: 1.45 }}>{f.value}</Typography>
        </Box>
      ))}
    </Box>
  );
}

export function HardwareTrio() {
  const reduce = useReducedMotion();
  const body = '#0D3D62';
  const edge = 'rgba(235,235,238,0.38)';
  const screen = '#071F33';
  const key = (x: number, y: number, c = tokens.gold) => (
    <g transform={`translate(${x - 11} ${y - 8})`} fill="none" stroke={c} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={6} cy={8} r={4.5} />
      <path d="M10.5 8h11M18 8v3.5M21.5 8v2.5" />
    </g>
  );
  const devices = [
    {
      x: 92, y: 182, r: -9, delay: 0.1,
      node: (
        <g>
          <rect x={-58} y={-58} width={116} height={116} rx={30} fill={body} stroke={edge} strokeWidth={1.25} />
          <rect x={-36} y={-30} width={72} height={46} rx={8} fill={screen} />
          {key(0, -7)}
          <circle cx={0} cy={36} r={8} fill="none" stroke={edge} strokeWidth={1.25} />
        </g>
      ),
    },
    {
      x: 240, y: 160, r: 0, delay: 0,
      node: (
        <g>
          <rect x={-62} y={-104} width={124} height={208} rx={22} fill={body} stroke={edge} strokeWidth={1.25} />
          <rect x={-46} y={-84} width={92} height={118} rx={10} fill={screen} />
          {key(0, -32)}
          <text x={0} y={6} textAnchor="middle" fill={tokens.softGrey} fontFamily="Montserrat" fontWeight={600} fontSize={11} opacity={0.75}>
            SIGN
          </text>
          <rect x={-40} y={54} width={34} height={22} rx={11} fill="none" stroke={edge} strokeWidth={1.25} />
          <rect x={6} y={54} width={34} height={22} rx={11} fill="none" stroke={edge} strokeWidth={1.25} />
        </g>
      ),
    },
    {
      x: 392, y: 186, r: 9, delay: 0.2,
      node: (
        <g>
          <rect x={-46} y={-80} width={92} height={160} rx={16} fill={body} stroke={edge} strokeWidth={1.25} />
          <rect x={-32} y={-62} width={64} height={64} rx={8} fill={screen} />
          {key(0, -30)}
          <circle cx={0} cy={40} r={16} fill="none" stroke={edge} strokeWidth={1.25} />
          <circle cx={0} cy={40} r={5} fill={edge} />
        </g>
      ),
    },
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 500, mx: 'auto' }} aria-hidden>
      <svg viewBox="0 0 480 360" width="100%" style={{ overflow: 'visible' }}>
        {/* the rule that binds them */}
        <motion.path
          d="M92 300 Q 240 352 392 300"
          fill="none"
          stroke={tokens.gold}
          strokeOpacity={0.6}
          strokeWidth={1.25}
          strokeDasharray="3 7"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
        {devices.map((d, i) => (
          <motion.g
            key={i}
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springs.soft, delay: d.delay + 0.1 }}
          >
            <motion.g
              animate={reduce ? undefined : { y: [0, -6, 0] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.7 }}
            >
              <g transform={`translate(${d.x} ${d.y}) rotate(${d.r})`}>{d.node}</g>
            </motion.g>
          </motion.g>
        ))}
      </svg>
    </Box>
  );
}

export function Multisig() {
  const t = useCopy(multisig);
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springs.soft, delay },
  });

  return (
    <>
      {/* HERO */}
      <Section tone="brand" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 } }}>
        <Grid container spacing={{ xs: 6, md: 3 }} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 } }}>
            <motion.div {...rise(0.05)}>
              <Eyebrow onBrand>{t.eyebrow}</Eyebrow>
              <Typography variant="h1" component="h1" sx={{ color: tokens.white, maxWidth: 640 }}><Phrases text={t.title} /></Typography>
              <AccentLine sx={{ mt: 3 }} />
            </motion.div>
            <motion.div {...rise(0.15)}>
              <Typography variant="subtitle1" sx={{ mt: 3, color: tokens.softGrey, maxWidth: 560 }}>{t.lead}</Typography>
              {/* Phone: session facts right under the description */}
              <Facts facts={t.facts} sx={{ display: { xs: 'grid', md: 'none' }, mt: 3 }} />
            </motion.div>
            <motion.div {...rise(0.25)}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 5 }}>
                <Button
                  href={links.multisigForm}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  color="secondary"
                  size="large"
                  endIcon={<ArrowOutwardRoundedIcon />}
                >
                  {t.cta}
                </Button>
                <Button
                  onClick={() => document.getElementById('how')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' })}
                  variant="outlined"
                  size="large"
                  endIcon={<ArrowDownwardRoundedIcon />}
                  sx={{ color: tokens.white, borderColor: 'rgba(235,235,238,0.5)', '&:hover': { borderColor: tokens.white, bgcolor: 'rgba(255,255,255,0.06)' } }}
                >
                  {t.howCta}
                </Button>
              </Stack>
              <Typography variant="body2" sx={{ mt: 2, color: tokens.softGrey, fontWeight: 400 }}>{t.ctaNote}</Typography>
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 1, md: 2 } }}>
            <HardwareTrio />
            {/* Desktop: session facts small, directly under the image */}
            <Facts facts={t.facts} sx={{ display: { xs: 'none', md: 'grid' }, mt: 4 }} />
          </Grid>
        </Grid>
      </Section>

      {/* HOW IT WORKS — its own section */}
      <Section id="how" sx={{ scrollMarginTop: 72 }}>
        <SectionHead eyebrow={t.stepsEyebrow} title={t.stepsTitle} />
        <Steps steps={t.steps} />
      </Section>

      {/* WHAT TO KNOW */}
      <Section tone="muted">
        <SectionHead eyebrow={t.cardsEyebrow} title={t.cardsTitle} />
        <InfoCards cards={t.cards} />
      </Section>

      {/* CLOSING CTA */}
      <Section>
        <Reveal>
          <Box sx={{ textAlign: 'center', maxWidth: 640, mx: 'auto' }}>
            <Typography variant="h2" component="h2"><Phrases text={t.closingTitle} /></Typography>
            <Typography variant="subtitle1" sx={{ mt: 2, color: tokens.charcoal }}>{t.closingText}</Typography>
            <Button
              href={links.multisigForm}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="primary"
              size="large"
              endIcon={<ArrowOutwardRoundedIcon />}
              sx={{ mt: 4 }}
            >
              {t.cta}
            </Button>
            <Typography variant="body2" sx={{ mt: 3, color: tokens.charcoal, fontWeight: 400 }}>{t.disclaimer}</Typography>
          </Box>
        </Reveal>
      </Section>
    </>
  );
}
