import { Box, Button, Grid2 as Grid, Stack, Typography } from '@mui/material';
import ArrowDownwardRoundedIcon from '@mui/icons-material/ArrowDownwardRounded';
import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import { routes } from '../content/common';
import { home } from '../content/home';
import { useCopy } from '../i18n';
import { springs, tokens } from '../theme';
import { HeroLogo } from '../components/OrbitSymbol';
import { OrbitField } from '../components/OrbitField';
import { DotCoinCanvas } from '../components/DotCoin';
import { PillarCard } from '../components/PillarCard';
import { HomeScreen, PhoneFrame } from '../components/AppScreens';
import { HardwareTrio } from './Multisig';
import { AccentLine, Eyebrow, Phrases, Reveal, Section, SectionHead } from '../components/primitives';

/**
 * Home, v2: one minimal white "stage" (MEBIT Wallet style) holds the full-screen hero and the services.
 * Elements borrowed from the booth backdrop: concentric circle orbits with travelling planets,
 * a fine dot ground and a large dot-grid ₿. Service copy is v1's; cards stack top to bottom.
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
  const logoRef = useRef<HTMLDivElement>(null);
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
          bgcolor: tokens.white,
          color: tokens.navy,
          // fine dot ground, as on the backdrop
          backgroundImage: 'radial-gradient(rgba(0,43,73,0.06) 1px, transparent 1.3px)',
          backgroundSize: '18px 18px',
        }}
      >
        <OrbitField anchorRef={logoRef} parentRef={stageRef} tone="light" />

        {/* HERO — fills the first screen; logo centred, the promise below it */}
        <Section
          sx={{
            position: 'relative',
            zIndex: 1,
            bgcolor: 'transparent',
            minHeight: { xs: 'calc(100svh - 64px)', md: 'calc(100svh - 72px)' },
            display: 'flex',
            alignItems: 'center',
            py: { xs: 6, md: 8 },
          }}
          inner={{ textAlign: 'center' }}
        >
          <Box ref={logoRef} sx={{ width: { xs: 168, sm: 200, md: 'clamp(200px, 17vw, 250px)' }, mx: 'auto' }}>
            <HeroLogo primary />
          </Box>
          <motion.div {...rise(0.25)}>
            <Typography data-orbit-avoid variant="h1" component="h1" sx={{ mt: { xs: 5, md: 6 }, color: tokens.navy, maxWidth: 820, mx: 'auto', fontSize: { md: '3.75rem' } }}>
              <Phrases text={t.heroTitle} />
            </Typography>
            <AccentLine sx={{ mt: 3, mx: 'auto' }} />
          </motion.div>
          <motion.div {...rise(0.35)}>
            <Typography data-orbit-avoid variant="subtitle1" sx={{ mt: 3, color: tokens.charcoal, maxWidth: 560, mx: 'auto' }}>
              {t.heroLead}
            </Typography>
            <Button data-orbit-avoid onClick={toServices} variant="contained" color="secondary" size="large" endIcon={<ArrowDownwardRoundedIcon />} sx={{ mt: 5 }}>
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
          <DotCoinCanvas rgb="0,43,73" maxAlpha={0.06} still pitch={9} dot={6} />
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

      {/* ABOUT — one short paragraph */}
      <Section tone="muted" sx={{ py: { xs: 6, md: 8 } }}>
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
