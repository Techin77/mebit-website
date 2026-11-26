import { Typography } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { common } from '../content/common';
import { useCopy } from '../i18n';
import { springs, tokens } from '../theme';
import { ScreenshotPhone, shots } from './ScreenshotPhone';

/** Hero phone: the app's real Wallet screen, rising in on a spring. */
export function PhoneMockup() {
  const c = useCopy(common);
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ ...springs.soft, delay: 0.2 }}
      style={{ width: '100%', maxWidth: 320, margin: '0 auto' }}
    >
      <ScreenshotPhone width={320} label={c.sample} src={shots.wallets} />
      <Typography variant="body2" sx={{ textAlign: 'center', mt: 2, color: tokens.charcoal, fontWeight: 400 }}>
        {c.sample}
      </Typography>
    </motion.div>
  );
}
