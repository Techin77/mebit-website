import { Box } from '@mui/material';
import type { ReactNode } from 'react';
import { tokens } from '../theme';

import wallets from '../assets/app/01-wallets.webp';
import keys from '../assets/app/02-keys.webp';
import hardware from '../assets/app/03a-hardware-connect.webp';
import exportDescriptor from '../assets/app/04-export-descriptor.webp';
import txCreate from '../assets/app/05-tx-create.webp';
import txReview from '../assets/app/06-tx-review.webp';
import txSignatures from '../assets/app/07-tx-signatures.webp';
import txSlip from '../assets/app/08b-tx-slip.webp';

/** Real MEBIT app screenshots (testnet4), exported from the app to app-screenshot/. */
export const shots = { wallets, keys, hardware, exportDescriptor, txCreate, txReview, txSignatures, txSlip };

/** Phone bezel around a real 1080×2400 app screenshot. */
export function ScreenshotFrame({ width = 300, label, children }: { width?: number; label?: string; children: ReactNode }) {
  return (
    <Box
      role="img"
      aria-label={label}
      sx={{ width: '100%', maxWidth: width, mx: 'auto', borderRadius: '44px', p: '10px', bgcolor: '#0B1620', boxShadow: tokens.shadow.device }}
    >
      <Box sx={{ position: 'relative', aspectRatio: '1080 / 2400', borderRadius: '34px', overflow: 'hidden', bgcolor: '#F6F7F9' }}>
        {children}
      </Box>
    </Box>
  );
}

export function Shot({ src }: { src: string }) {
  return (
    <Box
      component="img"
      src={src}
      alt=""
      loading="lazy"
      draggable={false}
      sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
    />
  );
}

export function ScreenshotPhone({ src, width, label }: { src: string; width?: number; label?: string }) {
  return (
    <ScreenshotFrame width={width} label={label}>
      <Shot src={src} />
    </ScreenshotFrame>
  );
}
