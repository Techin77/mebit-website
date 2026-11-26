import { Box, Stack, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { wallet } from '../content/wallet';
import { useCopy } from '../i18n';
import { tokens } from '../theme';
import { Logo } from './primitives';

/**
 * MEBIT app screens, rebuilt in code from the app source
 * (Compose UI in Krittanai2933/mebit — palette from ui/theme/Color.kt).
 * Figures are samples for layout only.
 */
export const app = {
  navy: '#042C49',
  ink: '#0E1116',
  eyebrow: '#C2700F',
  gold: '#FBB552',
  body: '#5B6472',
  page: '#F6F7F9',
  border: '#E4E8EE',
  chip: '#EEF1F5',
  wash: '#FDEFDD',
  success: '#1B7A4B',
  greenWash: '#E4F2EA',
  btc: '#F7931A',
};

const SAMPLE = { addr: 'tb1q…7k2m', amount: '0.0500 BTC', change: '0.7919 BTC', fee: '0.00012 BTC' };

export function PhoneFrame({ children, width = 300, label }: { children: ReactNode; width?: number; label?: string }) {
  return (
    <Box
      role="img"
      aria-label={label}
      sx={{
        width: '100%',
        maxWidth: width,
        mx: 'auto',
        aspectRatio: '9 / 19',
        borderRadius: '44px',
        p: '10px',
        bgcolor: '#0B1620',
        boxShadow: tokens.shadow.device,
      }}
    >
      <Box sx={{ position: 'relative', height: '100%', borderRadius: '34px', overflow: 'hidden', bgcolor: app.page, display: 'flex', flexDirection: 'column', color: app.ink }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ px: 3, pt: 1.5, height: 36, fontSize: 12, fontWeight: 600, flexShrink: 0 }}>
          <span className="num">9:41</span>
          <Box sx={{ width: 84, height: 24, borderRadius: 999, bgcolor: '#0B1620', position: 'absolute', left: '50%', top: 8, transform: 'translateX(-50%)' }} />
          <Box sx={{ width: 14, height: 8, borderRadius: '2px', border: `1.5px solid ${app.ink}` }} />
        </Stack>
        <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', px: 2.25, pt: 1.5, pb: 2.25, minHeight: 0 }}>{children}</Box>
      </Box>
    </Box>
  );
}

/* ---------- small building blocks, matching the app's components ---------- */

function Header({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <Box sx={{ mb: 1.75 }}>
      <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: 9, letterSpacing: '0.1em', color: app.eyebrow }}>{eyebrow}</Typography>
      <Typography sx={{ fontWeight: 700, fontSize: 19, lineHeight: 1.35, mt: 0.5 }}>{title}</Typography>
    </Box>
  );
}

function Card({ children, active, dark, sx }: { children: ReactNode; active?: boolean; dark?: boolean; sx?: object }) {
  return (
    <Box
      sx={{
        p: 1.5,
        borderRadius: '16px',
        bgcolor: dark ? app.navy : '#fff',
        color: dark ? '#fff' : app.ink,
        border: `1.5px solid ${active ? app.navy : dark ? app.navy : app.border}`,
        ...sx,
      }}
    >
      {children}
    </Box>
  );
}

function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ mt: 'auto', height: 42, borderRadius: 999, bgcolor: app.navy, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 12.5, fontWeight: 700 }}>
      {children}
    </Box>
  );
}

function Row({ k, v, strong }: { k: string; v: string; strong?: boolean }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="baseline" sx={{ py: 0.9, borderBottom: `1px solid ${app.border}`, '&:last-of-type': { borderBottom: 0 } }}>
      <Typography sx={{ fontSize: 10.5, color: app.body }}>{k}</Typography>
      <Typography className="num" sx={{ fontSize: 11.5, fontWeight: strong ? 700 : 600, fontFamily: 'Montserrat' }}>{v}</Typography>
    </Stack>
  );
}

function Radio({ on }: { on: boolean }) {
  return (
    <Box sx={{ width: 16, height: 16, borderRadius: 999, border: `1.5px solid ${on ? app.navy : '#B4BAC4'}`, display: 'grid', placeItems: 'center', flexShrink: 0 }}>
      {on && <Box sx={{ width: 8, height: 8, borderRadius: 999, bgcolor: app.navy }} />}
    </Box>
  );
}

function Tick({ state }: { state: 'done' | 'skip' | 'todo' }) {
  const done = state === 'done';
  return (
    <Box
      sx={{
        width: 18,
        height: 18,
        borderRadius: 999,
        flexShrink: 0,
        display: 'grid',
        placeItems: 'center',
        bgcolor: done ? app.success : 'transparent',
        border: done ? 'none' : `1.5px solid ${state === 'skip' ? app.border : '#B4BAC4'}`,
        color: '#fff',
        fontSize: 11,
        fontWeight: 700,
      }}
    >
      {done ? '✓' : ''}
    </Box>
  );
}

/* ---------- screens ---------- */

export function HomeScreen() {
  const t = useCopy(wallet).mock;
  return (
    <>
      <Stack direction="row" spacing={0.75} alignItems="center" sx={{ mb: 2.5 }}>
        <Logo size={18} alt="" />
        <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: 11, letterSpacing: '0.14em' }}>MEBIT</Typography>
      </Stack>
      <Typography sx={{ fontWeight: 700, fontSize: 22, lineHeight: 1.3 }}>{t.heading}</Typography>
      <Stack direction="row" spacing={1} alignItems="baseline" sx={{ mt: 1 }}>
        <Typography sx={{ fontSize: 11, color: app.body }}>{t.total}</Typography>
        <Typography className="num" sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: 14 }}>{t.totalValue}</Typography>
      </Stack>
      <Typography sx={{ fontSize: 9.5, color: app.body }}>{t.sub}</Typography>
      {[
        { d: t.spending, dark: false },
        { d: t.family, dark: true },
      ].map(({ d, dark }) => (
        <Card key={d.name} dark={dark} sx={{ mt: 1.5, p: 1.75, borderRadius: '18px' }}>
          <Stack direction="row" spacing={0.75} alignItems="center">
            <Box sx={{ width: 6, height: 6, borderRadius: 999, bgcolor: dark ? app.gold : app.ink }} />
            <Typography sx={{ fontSize: 8.5, fontWeight: 700, letterSpacing: '0.08em', fontFamily: 'Montserrat', opacity: 0.8 }}>{d.tag}</Typography>
          </Stack>
          <Typography sx={{ mt: 0.5, fontSize: 13.5, fontWeight: 700 }}>{d.name}</Typography>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
            <Typography sx={{ fontSize: 9, opacity: 0.7 }}>{d.meta}</Typography>
            <Typography className="num" sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: 16 }}>{d.amount}</Typography>
          </Stack>
        </Card>
      ))}
      <Stack direction="row" justifyContent="space-around" alignItems="flex-end" sx={{ mt: 'auto', mx: -2.25, mb: -2.25, bgcolor: '#fff', borderTop: `1px solid ${app.border}`, px: 2, pt: 1, pb: 2.25 }}>
        {t.nav.map((label, i) => (
          <Stack key={label} alignItems="center" spacing={0.25} sx={{ color: i === 0 ? app.eyebrow : app.body }}>
            {i === 1 ? (
              <Box sx={{ width: 40, height: 40, mt: -3, borderRadius: 999, bgcolor: app.btc, color: '#fff', display: 'grid', placeItems: 'center', fontFamily: 'Montserrat', fontWeight: 700, fontSize: 18 }}>₿</Box>
            ) : (
              <Box sx={{ width: 18, height: 14, borderRadius: '4px', border: '1.5px solid currentColor' }} />
            )}
            <Typography sx={{ fontSize: 9, fontWeight: 600 }}>{label}</Typography>
          </Stack>
        ))}
      </Stack>
    </>
  );
}

export function PolicyScreen() {
  const t = useCopy(wallet).screens.policy;
  return (
    <>
      <Header eyebrow={t.eyebrow} title={t.title} />
      <Stack spacing={1}>
        {[
          { o: t.single, on: false },
          { o: t.multi, on: true },
        ].map(({ o, on }) => (
          <Card key={o.name} active={on}>
            <Stack direction="row" spacing={1.25} alignItems="flex-start">
              <Radio on={on} />
              <Box>
                <Typography sx={{ fontSize: 12.5, fontWeight: 700 }}>{o.name}</Typography>
                <Typography sx={{ fontSize: 10, color: app.body, lineHeight: 1.5 }}>{o.text}</Typography>
              </Box>
            </Stack>
            {on && (
              <Stack direction="row" spacing={0.75} sx={{ mt: 1.25, pl: 3.4 }}>
                {t.presets.map((p, i) => (
                  <Box key={p} sx={{ px: 1.25, py: 0.5, borderRadius: 999, fontSize: 10.5, fontWeight: 700, bgcolor: i === 0 ? app.navy : app.chip, color: i === 0 ? '#fff' : app.ink }}>
                    {p}
                  </Box>
                ))}
              </Stack>
            )}
          </Card>
        ))}
      </Stack>
      {/* 2-of-3 visual: three keys, two highlighted */}
      <Box sx={{ mt: 1.5, p: 1.5, borderRadius: '16px', bgcolor: app.wash }}>
        <Stack direction="row" spacing={0.75} sx={{ mb: 1 }}>
          {[0, 1, 2].map((i) => (
            <Box key={i} sx={{ width: 28, height: 28, borderRadius: 999, display: 'grid', placeItems: 'center', bgcolor: i < 2 ? app.navy : '#fff', border: `1.5px solid ${app.navy}` }}>
              <KeyGlyph color={i < 2 ? '#fff' : app.navy} />
            </Box>
          ))}
        </Stack>
        <Typography sx={{ fontSize: 11, fontWeight: 700 }}>{t.summary}</Typography>
        <Typography sx={{ fontSize: 10, color: app.body }}>{t.tolerance}</Typography>
      </Box>
      <PrimaryButton>{t.next}</PrimaryButton>
    </>
  );
}

export function PairScreen() {
  const t = useCopy(wallet).screens.pair;
  return (
    <>
      <Header eyebrow={t.eyebrow} title={t.title} />
      <Stack direction="row" spacing={1} alignItems="center" sx={{ px: 1.25, py: 0.9, borderRadius: 999, bgcolor: app.greenWash, alignSelf: 'flex-start' }}>
        <Box sx={{ width: 7, height: 7, borderRadius: 999, bgcolor: app.success }} />
        <Typography sx={{ fontSize: 10, fontWeight: 600, color: app.success }}>{t.status}</Typography>
      </Stack>
      <Typography sx={{ mt: 1.75, mb: 0.75, fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', color: app.body }}>{t.nearby}</Typography>
      <Stack spacing={1}>
        {['Jade', 'Trezor Safe 7'].map((d, i) => (
          <Card key={d}>
            <Stack direction="row" alignItems="center" spacing={1.25}>
              <DeviceGlyph variant={i} />
              <Typography sx={{ fontSize: 12.5, fontWeight: 700, flex: 1 }}>{d}</Typography>
              <Box sx={{ px: 1.5, py: 0.5, borderRadius: 999, fontSize: 10.5, fontWeight: 700, bgcolor: i === 0 ? app.navy : app.chip, color: i === 0 ? '#fff' : app.ink }}>{t.connect}</Box>
            </Stack>
          </Card>
        ))}
      </Stack>
      <Stack spacing={1.1} sx={{ mt: 2 }}>
        {t.checklist.map((c, i) => (
          <Stack key={c} direction="row" spacing={1} alignItems="center">
            <Tick state={i === 0 ? 'done' : 'todo'} />
            <Typography sx={{ fontSize: 10.5, color: i === 0 ? app.ink : app.body }}>{c}</Typography>
          </Stack>
        ))}
      </Stack>
    </>
  );
}

export function PortableScreen() {
  const t = useCopy(wallet).screens.portable;
  return (
    <>
      <Header eyebrow={t.eyebrow} title={t.backupTitle} />
      <Typography sx={{ fontSize: 10.5, color: app.body, lineHeight: 1.55, mt: -0.75 }}>{t.backupText}</Typography>
      <Card sx={{ mt: 1.5, display: 'flex', alignItems: 'center', gap: 1.25 }}>
        <Box sx={{ width: 34, height: 40, borderRadius: '6px', bgcolor: app.wash, display: 'grid', placeItems: 'center', fontFamily: 'Montserrat', fontWeight: 700, fontSize: 8, color: app.eyebrow }}>BSMS</Box>
        <Box>
          <Typography sx={{ fontSize: 11.5, fontWeight: 700 }}>family-wallet.bsms</Typography>
          <Typography sx={{ fontSize: 9.5, color: app.body }}>2-of-3 · wsh(sortedmulti)</Typography>
        </Box>
      </Card>
      <Stack direction="row" spacing={0.75} sx={{ mt: 1 }}>
        <Box sx={{ flex: 1, height: 34, borderRadius: 999, bgcolor: app.navy, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 700 }}>{t.save}</Box>
        <Box sx={{ flex: 1, height: 34, borderRadius: 999, border: `1.5px solid ${app.navy}`, display: 'grid', placeItems: 'center', fontSize: 10, fontWeight: 700 }}>{t.share}</Box>
      </Stack>
      <Box sx={{ my: 2, height: '1px', bgcolor: app.border }} />
      <Typography sx={{ fontSize: 13, fontWeight: 700 }}>{t.importTitle}</Typography>
      <Typography sx={{ fontSize: 10, color: app.body }}>{t.importText}</Typography>
      <Stack direction="row" spacing={0.75} sx={{ mt: 1.25 }}>
        {t.sources.map((s) => (
          <Box key={s} sx={{ flex: 1, py: 1.25, borderRadius: '12px', bgcolor: '#fff', border: `1px solid ${app.border}`, textAlign: 'center', fontSize: 10, fontWeight: 600 }}>
            {s}
          </Box>
        ))}
      </Stack>
    </>
  );
}

export function SendScreen() {
  const t = useCopy(wallet).screens.send;
  return (
    <>
      <Header eyebrow={t.eyebrow} title={t.title} />
      <Stack spacing={1}>
        <Card>
          <Typography sx={{ fontSize: 9.5, color: app.body }}>{t.from}</Typography>
          <Typography sx={{ fontSize: 12, fontWeight: 700 }}>{t.fromValue}</Typography>
        </Card>
        <Card>
          <Typography sx={{ fontSize: 9.5, color: app.body }}>{t.to}</Typography>
          <Typography className="num" sx={{ fontSize: 12, fontWeight: 700, fontFamily: 'Montserrat' }}>{SAMPLE.addr}</Typography>
        </Card>
        <Card>
          <Typography sx={{ fontSize: 9.5, color: app.body }}>{t.amount}</Typography>
          <Typography className="num" sx={{ fontSize: 20, fontWeight: 700, fontFamily: 'Montserrat' }}>{SAMPLE.amount}</Typography>
        </Card>
      </Stack>
      <Typography sx={{ mt: 1.75, mb: 0.75, fontSize: 9.5, color: app.body }}>{t.fee}</Typography>
      <Stack direction="row" spacing={0.75}>
        {t.feeLevels.map((f, i) => (
          <Box key={f} sx={{ flex: 1, py: 0.9, borderRadius: 999, textAlign: 'center', fontSize: 10.5, fontWeight: 700, bgcolor: i === 1 ? app.navy : app.chip, color: i === 1 ? '#fff' : app.ink }}>
            {f}
          </Box>
        ))}
      </Stack>
      <PrimaryButton>{t.next}</PrimaryButton>
    </>
  );
}

export function ReviewScreen() {
  const t = useCopy(wallet).screens.review;
  return (
    <>
      <Header eyebrow={t.eyebrow} title={t.title} />
      <Card>
        <Typography sx={{ fontSize: 9.5, color: app.body }}>{t.dest}</Typography>
        <Typography className="num" sx={{ fontSize: 12, fontWeight: 700, fontFamily: 'Montserrat' }}>{SAMPLE.addr}</Typography>
        <Typography className="num" sx={{ fontSize: 20, fontWeight: 700, fontFamily: 'Montserrat', mt: 0.5 }}>{SAMPLE.amount}</Typography>
      </Card>
      <Card sx={{ mt: 1, py: 0.5 }}>
        <Row k={t.change} v={SAMPLE.change} />
        <Row k={t.fee} v={SAMPLE.fee} strong />
      </Card>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5, p: 1.25, borderRadius: '12px', bgcolor: app.wash }}>
        <KeyGlyph color={app.eyebrow} />
        <Typography sx={{ fontSize: 10.5, fontWeight: 600 }}>{t.rule}</Typography>
      </Stack>
      <PrimaryButton>{t.cta}</PrimaryButton>
    </>
  );
}

export function SignScreen() {
  const t = useCopy(wallet).screens.sign;
  return (
    <>
      <Header eyebrow={t.eyebrow} title={t.title} />
      <Stack direction="row" justifyContent="space-between" alignItems="baseline">
        <Typography className="num" sx={{ fontSize: 15, fontWeight: 700, fontFamily: 'Montserrat' }}>{t.progress}</Typography>
        <Typography sx={{ fontSize: 9.5, color: app.body }}>{t.hint}</Typography>
      </Stack>
      <Box sx={{ mt: 0.75, mb: 1.5, height: 6, borderRadius: 999, bgcolor: app.success }} />
      <Stack spacing={1}>
        {t.keys.map((k, i) => (
          <Card key={k.name} sx={{ opacity: k.done === null ? 0.6 : 1 }}>
            <Stack direction="row" spacing={1.25} alignItems="center">
              {i === 0 ? <PhoneGlyph /> : <DeviceGlyph variant={i - 1} />}
              <Typography sx={{ fontSize: 12, fontWeight: 700, flex: 1 }}>{k.name}</Typography>
              <Typography sx={{ fontSize: 9.5, fontWeight: 600, color: k.done ? app.success : app.body }}>{k.state}</Typography>
            </Stack>
          </Card>
        ))}
      </Stack>
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1.5, p: 1.25, borderRadius: '12px', bgcolor: app.greenWash }}>
        <Tick state="done" />
        <Typography sx={{ fontSize: 11, fontWeight: 700, color: app.success }}>{t.ready}</Typography>
      </Stack>
      <PrimaryButton>{t.cta}</PrimaryButton>
    </>
  );
}

export function SlipScreen() {
  const t = useCopy(wallet).screens.slip;
  return (
    <>
      <Header eyebrow={t.eyebrow} title={t.title} />
      <Card sx={{ textAlign: 'center', py: 2.5 }}>
        <Box sx={{ width: 44, height: 44, mx: 'auto', borderRadius: 999, bgcolor: app.success, color: '#fff', display: 'grid', placeItems: 'center', fontSize: 22, fontWeight: 700 }}>✓</Box>
        <Typography sx={{ mt: 1.25, fontSize: 10.5, color: app.success, fontWeight: 600 }}>{t.status}</Typography>
        <Typography className="num" sx={{ fontSize: 22, fontWeight: 700, fontFamily: 'Montserrat', mt: 0.5 }}>{SAMPLE.amount}</Typography>
      </Card>
      <Card sx={{ mt: 1, py: 0.5 }}>
        <Row k={t.to} v={SAMPLE.addr} />
        <Row k={t.fee} v={SAMPLE.fee} />
      </Card>
      <PrimaryButton>{t.cta}</PrimaryButton>
    </>
  );
}

/* ---------- glyphs ---------- */

function KeyGlyph({ color }: { color: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <circle cx="7" cy="12" r="4" />
      <path d="M11 12h10M18 12v3M21 12v2" />
    </svg>
  );
}

function PhoneGlyph() {
  return (
    <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: app.chip, display: 'grid', placeItems: 'center' }}>
      <svg width="14" height="16" viewBox="0 0 14 18" fill="none" stroke={app.ink} strokeWidth="1.5" aria-hidden>
        <rect x="1.5" y="1" width="11" height="16" rx="2.5" />
      </svg>
    </Box>
  );
}

/** Generic device silhouettes (not product renders). */
export function DeviceGlyph({ variant }: { variant: number }) {
  return (
    <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: app.chip, display: 'grid', placeItems: 'center' }}>
      {variant === 0 ? (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke={app.ink} strokeWidth="1.5" aria-hidden>
          <rect x="1.5" y="3" width="13" height="10" rx="3" />
          <rect x="4.5" y="5.5" width="7" height="5" rx="1" />
        </svg>
      ) : (
        <svg width="12" height="18" viewBox="0 0 12 18" fill="none" stroke={app.ink} strokeWidth="1.5" aria-hidden>
          <rect x="1" y="1" width="10" height="16" rx="2" />
          <rect x="3" y="3.5" width="6" height="8" rx="1" />
        </svg>
      )}
    </Box>
  );
}
