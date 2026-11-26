import { Box, Divider, Grid2 as Grid, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { common, links, routes } from '../content/common';
import { useCopy } from '../i18n';
import { tokens } from '../theme';
import { Logo, Section } from './primitives';

export function Footer() {
  const t = useCopy(common);
  const linkSx = { color: tokens.charcoal, textDecoration: 'none', '&:hover': { color: tokens.navy, textDecoration: 'underline' } };
  return (
    <Box component="footer" sx={{ borderTop: `1px solid ${tokens.softGrey}` }}>
      <Section sx={{ py: { xs: 8, md: 10 } }}>
        <Grid container spacing={{ xs: 6, md: 3 }}>
          <Grid size={{ xs: 12, md: 5 }}>
            <Logo variant="full" ground="light" size={200} alt="MEBIT Bitcoin Saving Company" />
            <Typography sx={{ mt: 3, color: tokens.charcoal, maxWidth: 360 }}>{t.footer.tagline}</Typography>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }} sx={{ ml: { md: 'auto' } }}>
            <Typography variant="overline" component="p" sx={{ color: tokens.slate, mb: 2 }}>
              {t.footer.services}
            </Typography>
            <Stack spacing={1.5}>
              <Link component={RouterLink} to={routes.wallet} sx={linkSx}>{t.nav.wallet}</Link>
              <Link component={RouterLink} to={routes.collateral} sx={linkSx}>{t.nav.collateral}</Link>
              <Link component={RouterLink} to={routes.multisig} sx={linkSx}>{t.nav.multisig}</Link>
            </Stack>
          </Grid>
          <Grid size={{ xs: 6, md: 3 }}>
            <Typography variant="overline" component="p" sx={{ color: tokens.slate, mb: 2 }}>
              {t.footer.contact}
            </Typography>
            <Stack spacing={1.5}>
              <Link href={links.mailto} sx={linkSx}>{links.email}</Link>
              <Typography variant="body2" sx={{ color: tokens.charcoal, fontWeight: 400 }}>{t.footer.hours}</Typography>
            </Stack>
          </Grid>
        </Grid>
        <Divider sx={{ my: 5, borderColor: tokens.softGrey }} />
        <Typography variant="body2" sx={{ color: tokens.charcoal, fontWeight: 400, maxWidth: 860 }}>
          {t.footer.legal}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2, color: tokens.charcoal, fontWeight: 400, opacity: 0.8 }}>
          {t.footer.rights}
        </Typography>
      </Section>
    </Box>
  );
}
