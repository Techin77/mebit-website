import {
  AppBar,
  Box,
  Button,
  ButtonBase,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import MailOutlineRoundedIcon from '@mui/icons-material/MailOutlineRounded';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { common, links, routes } from '../content/common';
import { useCopy, useLang, type Lang } from '../i18n';
import { springs, tokens } from '../theme';
import { Logo } from './primitives';

function LangToggle() {
  const { lang, setLang } = useLang();
  const t = useCopy(common);
  const opts: Lang[] = ['th', 'en'];
  return (
    <Box
      role="group"
      aria-label={t.langSwitch}
      sx={{ position: 'relative', display: 'inline-flex', p: '3px', borderRadius: 999, bgcolor: tokens.softGrey }}
    >
      {opts.map((l) => {
        const active = l === lang;
        return (
          <ButtonBase
            key={l}
            onClick={() => setLang(l)}
            aria-pressed={active}
            sx={{
              position: 'relative',
              px: 1.5,
              height: 30,
              borderRadius: 999,
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '0.08em',
              color: active ? tokens.white : tokens.slate,
              transition: 'color 200ms',
            }}
          >
            {active && (
              <motion.span
                layoutId="lang-pill"
                transition={springs.snappy}
                style={{ position: 'absolute', inset: 0, borderRadius: 999, background: tokens.navy }}
              />
            )}
            <span style={{ position: 'relative' }}>{l.toUpperCase()}</span>
          </ButtonBase>
        );
      })}
    </Box>
  );
}

export function NavBar() {
  const t = useCopy(common);
  const theme = useTheme();
  const desktop = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onHome = pathname === routes.home;
  const items = [
    { to: routes.wallet, label: t.nav.wallet },
    { to: routes.collateral, label: t.nav.collateral },
    { to: routes.multisig, label: t.nav.multisig },
  ];

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{
        // Home: solid white bar with a rule, sitting above the gold stage (its logo centres the orbits)
        bgcolor: onHome ? tokens.white : 'rgba(255,255,255,0.86)',
        backdropFilter: onHome ? undefined : 'saturate(180%) blur(14px)',
        borderBottom: `1px solid ${scrolled || onHome ? tokens.softGrey : 'transparent'}`,
        transition: 'border-color 240ms',
      }}
    >
      <Toolbar sx={{ maxWidth: tokens.pageMax + 128, width: '100%', mx: 'auto', px: { xs: 2, sm: 4, md: 8 }, minHeight: { xs: 64, md: 72 } }}>
        <ButtonBase component={NavLink} to={routes.home} aria-label={t.nav.home} sx={{ gap: 1.25, borderRadius: 1, mr: 'auto' }}>
          <Box data-orbit-anchor sx={{ display: 'flex' }}>
            <Logo size={40} alt="" />
          </Box>
          <Typography sx={{ fontFamily: 'Montserrat, sans-serif', fontWeight: 700, letterSpacing: '0.14em', fontSize: 15, color: tokens.navy }}>
            MEBIT
          </Typography>
        </ButtonBase>

        {desktop ? (
          <Stack direction="row" spacing={0.5} alignItems="center">
            {items.map((it) => (
              <Button
                key={it.to}
                component={NavLink}
                to={it.to}
                sx={{
                  color: tokens.charcoal,
                  minHeight: 40,
                  px: 2,
                  fontWeight: 500,
                  letterSpacing: 0,
                  position: 'relative',
                  '&.active': { color: tokens.navy, fontWeight: 600 },
                  '&.active::after': {
                    content: '""',
                    position: 'absolute',
                    left: 16,
                    right: 16,
                    bottom: 4,
                    height: 2,
                    bgcolor: tokens.gold,
                  },
                  '&:hover': { color: tokens.navy, bgcolor: 'transparent' },
                }}
              >
                {it.label}
              </Button>
            ))}
            <Button
              href={links.mailto}
              variant="outlined"
              startIcon={<MailOutlineRoundedIcon fontSize="small" />}
              sx={{ minHeight: 40, ml: 1.5, mr: 2, letterSpacing: 0 }}
            >
              {t.nav.contact}
            </Button>
            <LangToggle />
          </Stack>
        ) : (
          <Stack direction="row" spacing={1} alignItems="center">
            <LangToggle />
            <IconButton aria-label={t.nav.menu} onClick={() => setOpen(true)} sx={{ color: tokens.navy }}>
              <MenuRoundedIcon />
            </IconButton>
          </Stack>
        )}
      </Toolbar>

      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { width: 'min(88vw, 360px)', bgcolor: tokens.navy, color: tokens.white }, className: 'on-brand' }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 3, py: 2 }}>
          <Logo size={40} ground="dark" alt="MEBIT" />
          <IconButton aria-label="close" onClick={() => setOpen(false)} sx={{ color: tokens.white }}>
            <CloseRoundedIcon />
          </IconButton>
        </Stack>
        <List sx={{ px: 1 }}>
          {[{ to: routes.home, label: t.nav.home }, ...items].map((it, i) => (
            <motion.div key={it.to} initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ ...springs.soft, delay: 0.04 * i }}>
              <ListItemButton
                component={NavLink}
                to={it.to}
                end
                sx={{
                  py: 2,
                  borderRadius: 1,
                  fontSize: 20,
                  fontWeight: 600,
                  color: tokens.softGrey,
                  '&.active': { color: tokens.gold },
                }}
              >
                {it.label}
              </ListItemButton>
            </motion.div>
          ))}
        </List>
        <Box sx={{ mt: 'auto', p: 3 }}>
          <Button fullWidth href={links.mailto} variant="contained" color="secondary" startIcon={<MailOutlineRoundedIcon />}>
            {t.nav.contact}
          </Button>
          <Typography variant="body2" sx={{ mt: 1.5, color: tokens.softGrey, textAlign: 'center' }}>
            {links.email}
          </Typography>
        </Box>
      </Drawer>
    </AppBar>
  );
}
