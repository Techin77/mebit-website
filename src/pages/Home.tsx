import { Box, Button, Grid2 as Grid, Stack, Typography } from '@mui/material';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { motion, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { routes } from '../content/common';
import { home } from '../content/home';
import { useCopy } from '../i18n';
import { springs, tokens } from '../theme';
import { createSpray, type Spray } from '../components/spray';
import { DotCoinCanvas } from '../components/DotCoin';
import { PillarCard } from '../components/PillarCard';
import { HomeScreen, PhoneFrame } from '../components/AppScreens';
import { HardwareTrio } from './Multisig';
import { Eyebrow, Reveal, Section, SectionHead } from '../components/primitives';

/**
 * Home: the hero follows site-old (gold ground, morphing dot field, typed headline cycling through
 * the three services); the services sit on white with a faint dot-grid ₿ behind them.
 * Text comes from content/home.ts (and website-text/Home.md); cards stack top to bottom.
 */
/** The old site's (mebit.co.th) deeper hero gold: its white dot field barely shows on the lighter brand gold. */
const HERO_GOLD = '#EEB42A';

/** Each service card's backdrop is that page's hero image. */
const cardArt = {
  wallet: (
    <Box sx={{ width: 200, alignSelf: 'flex-start', mt: 3 }}>
      <PhoneFrame width={200}>
        <HomeScreen />
      </PhoneFrame>
    </Box>
  ),
  collateral: (
    <Box sx={{ position: 'relative', width: 260, aspectRatio: '1 / 1' }}>
      <DotCoinCanvas rgb="255,189,89" maxAlpha={0.95} still />
    </Box>
  ),
  multisig: (
    <Box sx={{ width: 360 }}>
      <HardwareTrio />
    </Box>
  ),
};

export function Home() {
  const t = useCopy(home);
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sprayRef = useRef<Spray | null>(null);
  const headlineRef = useRef<HTMLSpanElement | null>(null);

  // The dot field starts with the hero and stops when it leaves. Start and stop live in one effect,
  // so React's dev-mode double mount (StrictMode) restarts it instead of leaving it stopped.
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const spray = createSpray(el, { top: 30 }); // shapes sit as on mebit.co.th, below our solid header
    sprayRef.current = spray;
    return () => {
      spray?.destroy();
      sprayRef.current = null;
    };
  }, []);

  // Types each hero line, holds it, deletes it, then moves to the next (from site-old).
  const linesKey = t.heroLines.join('\n');
  useEffect(() => {
    const lines = linesKey.split('\n');
    const el = headlineRef.current;
    if (!el) return;
    if (reduce) {
      el.textContent = lines[0];
      return;
    }
    let li = 0;
    let ci = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;
    const step = () => {
      const chars = Array.from(lines[li % lines.length]);
      ci = deleting ? ci - 1 : ci + 1;
      el.textContent = chars.slice(0, Math.max(0, ci)).join('');
      let delay = deleting ? 34 : 78;
      if (!deleting && ci >= chars.length) {
        deleting = true;
        delay = 2200;
      } else if (deleting && ci <= 0) {
        deleting = false;
        li++;
        delay = 420;
      }
      timer = setTimeout(step, delay);
    };
    step();
    return () => {
      clearTimeout(timer);
      el.textContent = '';
    };
  }, [linesKey, reduce]);
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springs.soft, delay },
  });
  const toServices = () => document.getElementById('services')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });

  return (
    <>
      {/* HERO — ported from site-old: gold ground, morphing dot field, typed headline */}
      <Box
        component="section"
        onMouseMove={(e: React.MouseEvent<HTMLElement>) => {
          const c = canvasRef.current;
          if (!c || !sprayRef.current) return;
          const r = c.getBoundingClientRect();
          sprayRef.current.seed(e.clientX - r.left, e.clientY - r.top);
        }}
        onClick={() => sprayRef.current?.cycle()}
        sx={{ position: 'relative', overflow: 'hidden', bgcolor: HERO_GOLD, color: tokens.navy }}
      >
        <Box
          component="canvas"
          ref={canvasRef}
          aria-hidden
          sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', pointerEvents: 'none' }}
        />
        <Stack
          alignItems="center"
          spacing={3.25}
          sx={{
            position: 'relative',
            textAlign: 'center',
            px: { xs: 2, sm: 4 },
            pt: 'clamp(96px, 13vw, 150px)',
            pb: 'clamp(72px, 10vw, 108px)',
          }}
        >
          <motion.div {...rise(0.15)}>
            <Typography sx={{ fontSize: 13, fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: tokens.navy }}>
              {t.heroEyebrow}
            </Typography>
          </motion.div>
          <motion.div {...rise(0.25)}>
            <Typography
              variant="h1"
              component="h1"
              aria-label={t.heroLines.join(' · ')}
              sx={{
                maxWidth: 960,
                mx: 'auto',
                minHeight: '2.1em', // room for two lines, so the page doesn't jump while typing
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'clamp(34px, 5.6vw, 80px)',
                lineHeight: 1.04,
                letterSpacing: '-0.035em',
                color: tokens.navy,
              }}
            >
              <Box component="span" sx={{ display: 'block' }}>
              <span ref={headlineRef} aria-hidden />
              <Box
                component="span"
                aria-hidden
                sx={{
                  display: 'inline-block',
                  width: '0.06em',
                  height: '0.92em',
                  ml: '2px',
                  verticalAlign: '-0.1em',
                  bgcolor: tokens.navy,
                  borderRadius: '2px',
                  animation: 'mbCaret 1s step-end infinite',
                  '@keyframes mbCaret': { '50%': { opacity: 0 } },
                }}
              />
              </Box>
            </Typography>
          </motion.div>
          <motion.div {...rise(0.35)}>
            <Typography variant="subtitle1" sx={{ color: tokens.navy, maxWidth: 560, mx: 'auto' }}>
              {t.heroLead}
            </Typography>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                toServices();
              }}
              variant="contained"
              size="large"
              endIcon={<ArrowDownwardRoundedIcon />}
              sx={{
                mt: 5,
                minHeight: 52,
                px: 3.5,
                bgcolor: tokens.navy,
                color: tokens.gold,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                boxShadow: tokens.shadow.rest,
                transition: 'background-color 250ms, box-shadow 250ms, transform 400ms cubic-bezier(.22,1,.36,1)',
                '&:hover': { bgcolor: '#0A3A5E', boxShadow: tokens.shadow.raised, transform: 'translateY(-2px)' },
              }}
            >
              {t.heroCta}
            </Button>
          </motion.div>
        </Stack>
      </Box>

      <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: tokens.white, color: tokens.navy }}>
        {/* SERVICES — on white; a large, faint dot-grid ₿ sits in the ground */}
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            zIndex: 0,
            width: { xs: 520, md: 860 },
            aspectRatio: '1 / 1',
            left: { xs: -220, md: -260 },
            bottom: { xs: 120, md: -120 },
            pointerEvents: 'none',
          }}
        >
          <DotCoinCanvas rgb="0,43,73" maxAlpha={0.07} still pitch={9} dot={6} />
        </Box>
        <Section id="services" sx={{ position: 'relative', zIndex: 1, bgcolor: 'transparent', scrollMarginTop: 72, pt: { xs: 6, md: 10 }, pb: { xs: 10, md: 16 } }}>
          <Box sx={{ width: 'fit-content', maxWidth: '100%' }}>
            <SectionHead eyebrow={t.pillarsEyebrow} title={t.pillarsTitle} />
          </Box>
          <Stack spacing={2.5}>
            {t.pillars.map((p, i) => (
              <Reveal key={p.key} delay={i * 0.08}>
                <PillarCard to={routes[p.key]} eyebrow={p.eyebrow} title={p.title} desc={p.desc} cta={p.cta} art={cardArt[p.key]} />
              </Reveal>
            ))}
          </Stack>
        </Section>
      </Box>

      {/* ABOUT — one short paragraph, on the light gold wash */}
      <Section tone="wash" sx={{ py: { xs: 6, md: 8 } }}>
        <Reveal>
          <Grid container spacing={{ xs: 1, md: 3 }} alignItems="baseline">
            <Grid size={{ xs: 12, md: 3 }}>
              <Eyebrow sx={{ mb: 0 }}>{t.aboutEyebrow}</Eyebrow>
            </Grid>
            <Grid size={{ xs: 12, md: 9 }}>
              <Typography variant="subtitle1" sx={{ color: tokens.charcoal, maxWidth: tokens.measure }}>
                {t.about}
              </Typography>
            </Grid>
          </Grid>
        </Reveal>
      </Section>
    </>
  );
}
