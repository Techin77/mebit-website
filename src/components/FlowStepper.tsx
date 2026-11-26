import { Box, ButtonBase, Grid2 as Grid, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { common } from '../content/common';
import { useCopy } from '../i18n';
import { springs, tokens } from '../theme';
import { ScreenshotFrame, Shot, shots } from './ScreenshotPhone';

/* Order follows the app: form → collect signatures → review → slip. */
const SHOTS = [shots.txCreate, shots.txSignatures, shots.txReview, shots.txSlip];
const AUTO_MS = 4200;

/**
 * Coconut-style walkthrough: a list of steps beside one phone.
 * Choosing a step swaps the screen with a spring slide. While the section is on screen
 * it advances on its own until the visitor picks a step.
 */
export function FlowStepper({ steps }: { steps: { title: string; text: string }[] }) {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const c = useCopy(common);

  useEffect(() => {
    if (touched || reduce || !inView) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % steps.length), AUTO_MS);
    return () => window.clearTimeout(id);
  }, [active, touched, reduce, inView, steps.length]);

  
  const theme = useTheme();
  const compact = useMediaQuery(theme.breakpoints.down('md'));
  const pick = (i: number) => {
    setTouched(true);
    setActive(i);
  };

  const phone = (width: number) => (
    <ScreenshotFrame width={width} label={`${c.sample}: ${steps[active].title}`}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={active}
          initial={reduce ? false : { opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reduce ? undefined : { opacity: 0, x: -24 }}
          transition={springs.snappy}
          style={{ position: 'absolute', inset: 0 }}
        >
          <Shot src={SHOTS[active]} />
        </motion.div>
      </AnimatePresence>
    </ScreenshotFrame>
  );

  /* Phone layout: the steps shrink to a small capsule directly above the phone, so the
     instruction and the screen it describes are on screen together. */
  if (compact) {
    return (
      <Box ref={ref} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box
          role="tablist"
          aria-label={steps.map((s) => s.title).join(' / ')}
          sx={{ display: 'inline-flex', p: '4px', gap: '2px', borderRadius: 999, bgcolor: tokens.white, boxShadow: tokens.shadow.rest, maxWidth: '100%' }}
        >
          {steps.map((s, i) => {
            const on = i === active;
            return (
              <ButtonBase
                key={s.title}
                role="tab"
                aria-selected={on}
                aria-label={s.title}
                onClick={() => pick(i)}
                sx={{ position: 'relative', height: 34, px: on ? 1.75 : 1.25, borderRadius: 999, minWidth: 34, flexShrink: on ? 1 : 0, minHeight: 0, overflow: 'hidden' }}
              >
                {on && (
                  <motion.span
                    layoutId="flow-pill"
                    transition={springs.snappy}
                    style={{ position: 'absolute', inset: 0, borderRadius: 999, background: tokens.navy }}
                  />
                )}
                <Box component="span" sx={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: 0.75, whiteSpace: 'nowrap', fontSize: 13, fontWeight: 600, color: on ? tokens.white : tokens.slate }}>
                  <Box component="span" sx={{ fontFamily: 'Montserrat', fontWeight: 700, color: on ? tokens.gold : tokens.slate }}>{i + 1}</Box>
                  {on && <Box component="span" sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.title}</Box>}
                </Box>
                {on && !touched && !reduce && inView && (
                  <motion.span
                    key={`p${active}`}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
                    style={{ position: 'absolute', left: 12, right: 12, bottom: 4, height: 2, background: tokens.gold, transformOrigin: 'left', borderRadius: 2 }}
                  />
                )}
              </ButtonBase>
            );
          })}
        </Box>
        <Typography variant="body2" sx={{ mt: 1.5, mb: 2.5, color: tokens.charcoal, fontWeight: 400, textAlign: 'center', maxWidth: 340, minHeight: '3em' }}>
          {steps[active].text}
        </Typography>
        <Box sx={{ width: '100%', maxWidth: 260 }}>{phone(260)}</Box>
      </Box>
    );
  }

  return (
    <Grid container spacing={{ xs: 5, md: 3 }} alignItems="center" ref={ref}>
      <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 2, md: 1 } }}>
        <Stack component="ol" role="tablist" aria-orientation="vertical" spacing={1} sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {steps.map((s, i) => {
            const on = i === active;
            return (
              <li key={s.title}>
                <ButtonBase
                  role="tab"
                  aria-selected={on}
                  onClick={() => pick(i)}
                  sx={{
                    width: '100%',
                    textAlign: 'left',
                    display: 'block',
                    p: { xs: 2, md: 2.5 },
                    borderRadius: `${tokens.radius.md}px`,
                    position: 'relative',
                    overflow: 'hidden',
                    bgcolor: on ? tokens.white : 'transparent',
                    boxShadow: on ? tokens.shadow.raised : 'none',
                    transition: 'background-color 300ms, box-shadow 300ms',
                    '&:hover': { bgcolor: on ? tokens.white : 'rgba(255,255,255,0.6)' },
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="flex-start">
                    <Typography
                      className="num"
                      sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: 14, letterSpacing: '0.12em', color: on ? tokens.navy : tokens.slate, pt: '3px', minWidth: 22 }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </Typography>
                    <Box>
                      <Typography variant="h4" component="h3" sx={{ color: on ? tokens.navy : tokens.charcoal }}>
                        {s.title}
                      </Typography>
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={springs.soft}
                            style={{ overflow: 'hidden' }}
                          >
                            <Typography sx={{ mt: 0.75, color: tokens.charcoal }}>{s.text}</Typography>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </Box>
                  </Stack>
                  {/* auto-advance progress line */}
                  {on && !touched && !reduce && inView && (
                    <motion.span
                      key={`p${active}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: AUTO_MS / 1000, ease: 'linear' }}
                      style={{ position: 'absolute', left: 0, bottom: 0, height: 2, width: '100%', background: tokens.gold, transformOrigin: 'left' }}
                    />
                  )}
                </ButtonBase>
              </li>
            );
          })}
        </Stack>
      </Grid>

      <Grid size={{ xs: 12, md: 6 }} sx={{ order: { xs: 1, md: 2 } }}>
        <Box sx={{ maxWidth: 300, mx: 'auto' }}>
          {phone(300)}
          <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, color: tokens.charcoal, fontWeight: 400 }}>
            {c.sample}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
}
