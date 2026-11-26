import { Box, Grid2 as Grid, Stack, Typography } from '@mui/material';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { motion, useReducedMotion } from 'framer-motion';
import type { InfoCard } from '../content/multisig';
import { springs, tokens } from '../theme';
import { Reveal } from './primitives';

/** Numbered steps on a 12-col grid. Horizontal on desktop, stacked on phones. */
export function Steps({ steps, onBrand, cols = 4 }: { steps: { title: string; text: string }[]; onBrand?: boolean; cols?: 3 | 4 | 6 }) {
  const md = 12 / Math.min(cols, 4);
  return (
    <Grid container spacing={{ xs: 3, md: 3 }} component="ol" sx={{ listStyle: 'none', p: 0, m: 0 }}>
      {steps.map((s, i) => (
        <Grid key={s.title} size={{ xs: 12, sm: 6, md: cols === 6 ? 4 : md }} component="li">
          <Reveal delay={i * 0.06}>
            <Box sx={{ borderTop: `1px solid ${onBrand ? 'rgba(235,235,238,0.24)' : tokens.softGrey}`, pt: 3 }}>
              <Typography
                className="num"
                sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: 14, letterSpacing: '0.12em', color: onBrand ? tokens.gold : tokens.slate }}
              >
                {String(i + 1).padStart(2, '0')}
              </Typography>
              <Typography variant="h4" component="h3" sx={{ mt: 1.5, color: onBrand ? tokens.white : tokens.navy }}>
                {s.title}
              </Typography>
              <Typography sx={{ mt: 1, color: onBrand ? tokens.softGrey : tokens.charcoal }}>{s.text}</Typography>
            </Box>
          </Reveal>
        </Grid>
      ))}
    </Grid>
  );
}

/** "What to know" cards. Tone: default (soft grey), brand (navy), caution (outlined). */
export function InfoCards({ cards }: { cards: InfoCard[] }) {
  const reduce = useReducedMotion();
  return (
    <Grid container spacing={3}>
      {cards.map((c, i) => {
        const brand = c.tone === 'brand';
        const caution = c.tone === 'caution';
        return (
          <Grid key={c.title} size={{ xs: 12, sm: 6, lg: 4 }}>
            <Reveal delay={(i % 3) * 0.07} style={{ height: '100%' }}>
              <motion.div whileHover={reduce ? undefined : { y: -4 }} transition={springs.snappy} style={{ height: '100%' }}>
                <Box
                  className={brand ? 'on-brand' : undefined}
                  sx={{
                    height: '100%',
                    p: { xs: 3, md: 4 },
                    borderRadius: `${tokens.radius.lg}px`,
                    bgcolor: brand ? tokens.navy : tokens.white,
                    border: caution ? `1px solid ${tokens.slate}` : '1px solid transparent',
                    color: brand ? tokens.white : tokens.navy,
                    boxShadow: tokens.shadow.rest,
                    transition: 'box-shadow 300ms',
                    '&:hover': { boxShadow: tokens.shadow.raised },
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                    {caution && <InfoOutlinedIcon sx={{ fontSize: 18, color: tokens.slate }} />}
                    <Typography variant="overline" sx={{ color: brand ? tokens.gold : tokens.slate }}>
                      {c.eyebrow}
                    </Typography>
                  </Stack>
                  <Typography variant="h3" component="h3" sx={{ mb: 2.5 }}>
                    {c.title}
                  </Typography>
                  <Stack component="ul" spacing={1.5} sx={{ listStyle: 'none', p: 0, m: 0 }}>
                    {c.items.map((it) => (
                      <Stack key={it} component="li" direction="row" spacing={1.5} alignItems="flex-start">
                        {caution ? (
                          <Box aria-hidden sx={{ width: 6, height: 6, mt: '11px', borderRadius: 999, flexShrink: 0, bgcolor: tokens.slate }} />
                        ) : (
                          <CheckRoundedIcon
                            aria-hidden
                            sx={{ fontSize: 18, mt: '4px', flexShrink: 0, color: brand ? tokens.gold : tokens.navy }}
                          />
                        )}
                        <Typography sx={{ color: brand ? tokens.softGrey : tokens.charcoal, fontSize: 15 }}>{it}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </motion.div>
            </Reveal>
          </Grid>
        );
      })}
    </Grid>
  );
}

/** A quiet notice box. Used only where the frame carries meaning (risk, disclosure). */
export function Notice({ title, items }: { title: string; items: string[] }) {
  return (
    <Box sx={{ p: { xs: 3, md: 4 }, borderRadius: `${tokens.radius.md}px`, border: `1px solid ${tokens.slate}`, bgcolor: tokens.white }}>
      <Stack direction="row" spacing={1.25} alignItems="center" sx={{ mb: 2 }}>
        <InfoOutlinedIcon sx={{ color: tokens.slate, fontSize: 20 }} />
        <Typography variant="h4" component="h3">{title}</Typography>
      </Stack>
      <Stack component="ul" spacing={1} sx={{ m: 0, pl: 3.5, color: tokens.charcoal }}>
        {items.map((it) => (
          <Typography component="li" key={it} sx={{ fontSize: 15 }}>
            {it}
          </Typography>
        ))}
      </Stack>
    </Box>
  );
}
