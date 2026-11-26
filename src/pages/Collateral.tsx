import { Box, Button, Grid2 as Grid, Stack, Typography } from '@mui/material';
import ArrowOutwardRoundedIcon from '@mui/icons-material/ArrowOutwardRounded';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import { motion, useReducedMotion } from 'framer-motion';
import { links } from '../content/common';
import { collateral } from '../content/collateral';
import { useCopy, useLang } from '../i18n';
import { springs, tokens } from '../theme';
import { InfoCards, Steps } from '../components/Blocks';
import { LoanCalculator } from '../components/LoanCalculator';
import { DotCoinCanvas } from '../components/DotCoin';
import { AccentLine, Eyebrow, Reveal, Section, SectionHead , Phrases } from '../components/primitives';

export function Collateral() {
  const t = useCopy(collateral);
  const { lang } = useLang();
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springs.soft, delay },
  });
  const trustIcons = [VerifiedOutlinedIcon, LockOutlinedIcon, EventAvailableOutlinedIcon];

  return (
    <>
      {/* HERO — Mercury Gold ground with Orbit Navy text: the loan page stands apart from the wallet services. */}
      <Section tone="gold" sx={{ pt: { xs: 6, md: 8 }, pb: { xs: 8, md: 10 }, overflow: 'hidden' }}>
        <Grid container spacing={{ xs: 2, md: 3 }} alignItems="center">
          <Grid size={{ xs: 12, md: 5 }} sx={{ order: 1 }}>
            {/* Dot-grid coin on its own: no orbit */}
            <Box sx={{ position: 'relative', width: { xs: 'min(100%, 340px)', md: '100%' }, maxWidth: 460, aspectRatio: '1 / 1', mx: 'auto' }}>
              <DotCoinCanvas />
            </Box>
            <Typography variant="body2" sx={{ textAlign: 'center', mt: 1, color: tokens.navy, fontWeight: 500 }}>
              {lang === 'th' ? 'แตะที่เหรียญ เพื่อพลิกเป็นเงินบาท' : 'Tap the coin to turn it into baht'}
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 7 }} sx={{ order: 2 }}>
            <motion.div {...rise(0.05)}>
              <Eyebrow sx={{ color: tokens.navy }}>{t.eyebrow}</Eyebrow>
              <Typography variant="h1" component="h1" sx={{ color: tokens.navy, maxWidth: 680 }}><Phrases text={t.title} /></Typography>
              <AccentLine sx={{ mt: 3, bgcolor: tokens.navy }} />
            </motion.div>
            <motion.div {...rise(0.15)}>
              <Typography variant="subtitle1" sx={{ mt: 3, color: tokens.navy, maxWidth: 540 }}>{t.lead}</Typography>
            </motion.div>
            <motion.div {...rise(0.25)}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems={{ sm: 'center' }} sx={{ mt: 5 }}>
                <Button
                  href={links.loanRegister}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="contained"
                  color="primary"
                  size="large"
                  endIcon={<ArrowOutwardRoundedIcon />}
                >
                  {t.cta}
                </Button>
                <Typography variant="body2" sx={{ color: tokens.navy, fontWeight: 500 }}>{t.ctaNote}</Typography>
              </Stack>
            </motion.div>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mt: { xs: 4, md: 6 }, pt: { xs: 4, md: 5 }, borderTop: '1px solid rgba(0,43,73,0.2)' }}>
          {t.trust.map((s, i) => {
            const Icon = trustIcons[i];
            return (
              <Grid key={s} size={{ xs: 12, sm: 4 }}>
                <Reveal delay={i * 0.06}>
                  <Stack direction="row" spacing={1.5} alignItems="center">
                    <Icon sx={{ color: tokens.navy, fontSize: 22 }} />
                    <Typography sx={{ color: tokens.navy, fontWeight: 500 }}>{s}</Typography>
                  </Stack>
                </Reveal>
              </Grid>
            );
          })}
        </Grid>
      </Section>

      {/* CALCULATOR */}
      <Section tone="muted" id="calculator">
        <SectionHead eyebrow={t.calc.eyebrow} title={t.calc.title} lead={t.calc.lead} />
        <Reveal>
          <LoanCalculator />
        </Reveal>
      </Section>

      {/* PROCESS */}
      <Section>
        <SectionHead eyebrow={t.cardsEyebrow} title={t.processTitle} />
        <Steps steps={t.process} cols={6} />
      </Section>

      {/* CONDITIONS */}
      <Section tone="muted">
        <SectionHead eyebrow={t.cardsEyebrow} title={t.cardsTitle} />
        <InfoCards cards={t.cards} />
      </Section>

      {/* CLOSING CTA + legal line */}
      <Section>
        <Reveal>
          <Box sx={{ textAlign: 'center', maxWidth: 680, mx: 'auto' }}>
            <Typography variant="h2" component="h2"><Phrases text={t.closingTitle} /></Typography>
            <Typography variant="subtitle1" sx={{ mt: 2, color: tokens.charcoal }}>{t.closingText}</Typography>
            <Button
              href={links.loanRegister}
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
            <Typography variant="body2" sx={{ mt: 4, color: tokens.charcoal, fontWeight: 400 }}>{t.legal}</Typography>
          </Box>
        </Reveal>
      </Section>
    </>
  );
}
