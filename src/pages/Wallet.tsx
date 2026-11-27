import { Box, Button, Chip, Grid2 as Grid, Stack, Typography } from '@mui/material';
import AppleIcon from '@mui/icons-material/Apple';
import ShopIcon from '@mui/icons-material/Shop';
import GitHubIcon from '@mui/icons-material/GitHub';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import { motion, useReducedMotion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
import { links, routes } from '../content/common';
import { wallet } from '../content/wallet';
import { useCopy } from '../i18n';
import { springs, tokens } from '../theme';
import { Notice } from '../components/Blocks';
import { FlowStepper } from '../components/FlowStepper';
import { ScreenshotPhone, shots } from '../components/ScreenshotPhone';
import { PhoneMockup } from '../components/PhoneMockup';
import { AccentLine, Eyebrow, Reveal, Section, SectionHead , Phrases } from '../components/primitives';

const featureShots = [shots.keys, shots.hardware, shots.exportDescriptor];

function StoreButton({ icon, store, note, href }: { icon: React.ReactNode; store: string; note: string; href: string | null }) {
  return (
    <Button
      variant="outlined"
      {...(href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {})}
      disabled={!href}
      startIcon={icon}
      sx={{
        minHeight: 56,
        justifyContent: 'flex-start',
        borderColor: tokens.slate,
        color: tokens.navy,
        '&.Mui-disabled': { borderColor: tokens.softGrey, color: tokens.charcoal },
        '& .MuiButton-startIcon svg': { fontSize: 26 },
      }}
    >
      <Box sx={{ textAlign: 'left', lineHeight: 1.2 }}>
        <Box component="span" sx={{ display: 'block', fontSize: 11, fontWeight: 500, letterSpacing: '0.04em' }}>{note}</Box>
        <Box component="span" sx={{ display: 'block', fontSize: 16, fontWeight: 700 }}>{store}</Box>
      </Box>
    </Button>
  );
}

export function Wallet() {
  const t = useCopy(wallet);
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { ...springs.soft, delay },
  });

  return (
    <>
      {/* HERO */}
      <Section sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 8, md: 12 } }}>
        <Grid container spacing={{ xs: 6, md: 3 }} alignItems="center">
          <Grid size={{ xs: 12, md: 7 }} sx={{ order: { xs: 2, md: 1 } }}>
            <motion.div {...rise(0.05)}>
              <Eyebrow>{t.eyebrow}</Eyebrow>
              <Typography variant="h1" component="h1" sx={{ maxWidth: 620 }}><Phrases text={t.title} /></Typography>
              <AccentLine sx={{ mt: 3 }} />
            </motion.div>
            <motion.div {...rise(0.15)}>
              <Typography variant="subtitle1" sx={{ mt: 3, color: tokens.charcoal, maxWidth: 520 }}>{t.lead}</Typography>
              <Chip
                label={t.status}
                sx={{ mt: 3, bgcolor: tokens.softGrey, color: tokens.navy, fontWeight: 600, height: 32, '& .MuiChip-label': { px: 1.5 } }}
                icon={<Box component="span" sx={{ width: 8, height: 8, borderRadius: 999, bgcolor: tokens.gold, ml: '10px !important' }} />}
              />
            </motion.div>
            <motion.div {...rise(0.25)}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} sx={{ mt: 5 }}>
                <StoreButton icon={<AppleIcon />} store={t.testFlight} note={t.iosBeta} href={links.appStore} />
                <StoreButton icon={<ShopIcon />} store={t.googlePlay} note={t.comingSoon} href={links.googlePlay} />
              </Stack>
            </motion.div>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }} sx={{ order: { xs: 1, md: 2 } }}>
            <PhoneMockup />
          </Grid>
        </Grid>
      </Section>

      {/* CORE FEATURES — each with the matching app screen */}
      <Section tone="muted" id="features">
        <SectionHead eyebrow={t.featuresEyebrow} title={t.featuresTitle} />
        <Stack spacing={{ xs: 10, md: 14 }}>
          {t.features.map((f, i) => {
            const shot = featureShots[i];
            const flip = i % 2 === 1;
            return (
              <Grid key={f.title} container spacing={{ xs: 5, md: 3 }} alignItems="center">
                <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: flip ? 2 : 1 } }}>
                  <Reveal>
                    <Eyebrow>{f.eyebrow}</Eyebrow>
                    <Typography variant="h2" component="h3" sx={{ fontSize: { xs: '1.625rem', md: '2rem' } }}>
                      <Phrases text={f.title} />
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mt: 2, color: tokens.charcoal, maxWidth: 520 }}>{f.text}</Typography>
                    <Stack component="ul" spacing={1.5} sx={{ listStyle: 'none', p: 0, m: 0, mt: 3 }}>
                      {f.points.map((pt) => (
                        <Stack key={pt} component="li" direction="row" spacing={1.5} alignItems="flex-start">
                          <CheckRoundedIcon sx={{ fontSize: 20, mt: '3px', color: tokens.navy }} />
                          <Typography>{pt}</Typography>
                        </Stack>
                      ))}
                    </Stack>
                  </Reveal>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: flip ? 1 : 2 } }}>
                  <Reveal delay={0.1} y={40}>
                    <motion.div whileHover={reduce ? undefined : { y: -6, rotate: flip ? -1 : 1 }} transition={springs.snappy}>
                      <ScreenshotPhone width={290} label={f.title} src={shot} />
                    </motion.div>
                  </Reveal>
                </Grid>
              </Grid>
            );
          })}
        </Stack>
      </Section>

      {/* SEND FLOW — interactive */}
      <Section>
        <SectionHead eyebrow={t.flowEyebrow} title={t.flowTitle} lead={t.flowLead} />
        <Box sx={{ bgcolor: tokens.softGrey, borderRadius: `${tokens.radius.lg}px`, p: { xs: 2, sm: 4, md: 6 } }}>
          <FlowStepper steps={t.flow} />
        </Box>
      </Section>

      {/* OPEN SOURCE */}
      <Section tone="brand">
        <Grid container spacing={{ xs: 4, md: 3 }} alignItems="flex-end">
          <Grid size={{ xs: 12, md: 7 }}>
            <Reveal>
              <Eyebrow onBrand>{t.ossEyebrow}</Eyebrow>
              <Typography variant="h2" component="h2" sx={{ color: tokens.white }}><Phrases text={t.ossTitle} /></Typography>
              <Typography variant="subtitle1" sx={{ mt: 2, color: tokens.softGrey, maxWidth: 560 }}>{t.ossText}</Typography>
            </Reveal>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }} sx={{ display: 'flex', justifyContent: { md: 'flex-end' } }}>
            <Reveal delay={0.1}>
              <Button
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<GitHubIcon />}
              >
                {t.ossCta}
              </Button>
            </Reveal>
          </Grid>
        </Grid>
      </Section>

      {/* NOTICE + HAND-OFF */}
      <Section>
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Reveal>
              <Notice title={t.noticeTitle} items={t.notice} />
            </Reveal>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }}>
            <Reveal delay={0.08} style={{ height: '100%' }}>
              <Box sx={{ height: '100%', p: { xs: 3, md: 4 }, borderRadius: `${tokens.radius.md}px`, bgcolor: tokens.softGrey, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h3" component="h3">{t.helpTitle}</Typography>
                <Typography sx={{ mt: 1, color: tokens.charcoal }}>{t.helpText}</Typography>
                <Box sx={{ mt: 'auto', pt: 3 }}>
                  <Button component={RouterLink} to={routes.multisig} variant="outlined" endIcon={<ArrowForwardRoundedIcon />}>
                    {t.helpCta}
                  </Button>
                </Box>
              </Box>
            </Reveal>
          </Grid>
        </Grid>
      </Section>
    </>
  );
}
