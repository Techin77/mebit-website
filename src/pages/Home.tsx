import { Box, Button, Grid2 as Grid, Stack, Typography } from '@mui/material';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { routes } from '../content/common';
import { home } from '../content/home';
import { useCopy } from '../i18n';
import { springs, tokens } from '../theme';
import { OrbitField } from '../components/OrbitField';
import { DotCoinCanvas } from '../components/DotCoin';
import { PillarCard } from '../components/PillarCard';
import { HomeScreen, PhoneFrame } from '../components/AppScreens';
import { HardwareTrio } from './Multisig';
import { AccentLine, Eyebrow, Phrases, Reveal, Section, SectionHead } from '../components/primitives';

/**
 * Home, v3 (mockups/home-gold-orbit.html): one Mercury Gold "stage" under the white header holds the
 * hero and the services. Elements borrowed from the booth backdrop: concentric circle orbits centred
 * on the header logo with travelling planets, a fine navy dot ground and a large dot-grid ₿.
 * Text comes from content/home.ts (and website-text/Home.md); cards stack top to bottom.
 */
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
  const stageRef = useRef<HTMLDivElement>(null);
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springs.soft, delay },
  });
  const toServices = () => document.getElementById('services')?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });

  return (
    <>
      <Box
        ref={stageRef}
        sx={{
          position: 'relative',
          overflow: 'hidden',
          bgcolor: tokens.gold,
          color: tokens.navy,
          // fine navy dot ground, as on the backdrop
          backgroundImage: 'radial-gradient(rgba(0,43,73,0.09) 1px, transparent 1.3px)',
          backgroundSize: '18px 18px',
        }}
      >
        <OrbitField anchorSelector="[data-orbit-anchor]" parentRef={stageRef} tone="gold" />

        {/* HERO — no logo here: the rings circle the header mark instead */}
        <Section
          sx={{ position: 'relative', zIndex: 1, bgcolor: 'transparent', pt: { xs: 10, md: 16 }, pb: { xs: 8, md: 12 } }}
          inner={{ textAlign: 'center' }}
        >
          <motion.div {...rise(0.25)}>
            <Typography
              data-orbit-avoid
              variant="h1"
              component="h1"
              sx={{ color: tokens.navy, maxWidth: 860, width: 'fit-content', mx: 'auto', fontSize: 'clamp(2.25rem, 5.2vw, 4.25rem)' }}
            >
              <Phrases text={t.heroTitle} />
            </Typography>
            <AccentLine sx={{ mt: 3, mx: 'auto', bgcolor: tokens.navy }} />
          </motion.div>
          <motion.div {...rise(0.35)}>
            <Typography data-orbit-avoid variant="subtitle1" sx={{ mt: 3, color: tokens.slate, maxWidth: 560, width: 'fit-content', mx: 'auto' }}>
              {t.heroLead}
            </Typography>
            <Button
              data-orbit-avoid
              onClick={toServices}
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
        </Section>

        {/* SERVICES — the orbits carry on behind them; a large dot-grid ₿ sits in the ground */}
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
          <Box data-orbit-avoid sx={{ width: 'fit-content', maxWidth: '100%' }}>
            <SectionHead eyebrow={t.pillarsEyebrow} title={t.pillarsTitle} />
          </Box>
          <Stack spacing={2.5} data-orbit-avoid>
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
