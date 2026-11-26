import {
  Box,
  Chip,
  Grid2 as Grid,
  InputAdornment,
  Slider,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { motion, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { useEffect, useMemo, useState } from 'react';
import { collateral, loanRules as R } from '../content/collateral';
import { fmt, useCopy, useLang, type Lang } from '../i18n';
import { springs, tokens } from '../theme';

/** Pure loan maths — kept separate so it can be unit-tested and reused. */
export function computeLoan(loan: number, price: number, ltvPct: number, termMonths: number) {
  const ltv = ltvPct / 100;
  const collateralValue = loan / ltv;
  const btc = collateralValue / price;
  const headroom = 1 - ltv; // fraction the price can fall before collateral = debt
  const days = R.termDays[termMonths];
  return {
    btc,
    collateralValue,
    receive: Math.max(0, loan - R.originationFee),
    interest: (loan * R.apr * days) / 365,
    days,
    // Booth brief: alert at 1/4 of the way to liquidation, margin call at 1/2, liquidation at LTV 100%.
    warn: { price: price * (1 - headroom / 4), drop: (headroom / 4) * 100 },
    call: { price: price * (1 - headroom / 2), drop: (headroom / 2) * 100 },
    seize: { price: price * ltv, drop: headroom * 100 },
  };
}

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));
const digits = (s: string) => Number(s.replace(/[^\d]/g, '')) || 0;

/** A figure that glides to its new value on spring physics. */
function SpringNumber({ value, format }: { value: number; format: (n: number) => string }) {
  const reduce = useReducedMotion();
  const mv = useSpring(value, { stiffness: 140, damping: 22, mass: 0.6 });
  const text = useTransform(mv, (v) => format(v));
  useEffect(() => {
    if (reduce) mv.jump(value);
    else mv.set(value);
  }, [value, mv, reduce]);
  return <motion.span className="num">{text}</motion.span>;
}

function MoneyField({
  label,
  help,
  value,
  onCommit,
  min,
  max,
  lang,
}: {
  label: string;
  help: string;
  value: number;
  onCommit: (n: number) => void;
  min: number;
  max: number;
  lang: Lang;
}) {
  const [draft, setDraft] = useState(fmt.int(lang, value));
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    if (!focused) setDraft(fmt.int(lang, value));
  }, [value, lang, focused]);
  return (
    <TextField
      fullWidth
      label={label}
      helperText={help}
      value={draft}
      inputMode="numeric"
      onFocus={() => setFocused(true)}
      onChange={(e) => {
        setDraft(e.target.value);
        const n = digits(e.target.value);
        if (n >= min && n <= max) onCommit(n);
      }}
      onBlur={() => {
        setFocused(false);
        const n = clamp(digits(draft), min, max);
        onCommit(n);
        setDraft(fmt.int(lang, n));
      }}
      slotProps={{
        input: {
          startAdornment: <InputAdornment position="start">฿</InputAdornment>,
          sx: { fontFamily: 'Montserrat', fontWeight: 600, fontSize: 20, fontVariantNumeric: 'tabular-nums' },
        },
        htmlInput: { 'aria-describedby': undefined },
      }}
      sx={{ '& .MuiOutlinedInput-notchedOutline': { borderColor: tokens.slate } }}
    />
  );
}

export function LoanCalculator() {
  const t = useCopy(collateral).calc;
  const { lang } = useLang();
  const reduce = useReducedMotion();

  const [loan, setLoan] = useState(500_000);
  const [price, setPrice] = useState(R.sampleBtcPrice);
  const [ltv, setLtv] = useState(50);
  const [term, setTerm] = useState<number>(6);

  const r = useMemo(() => computeLoan(loan, price, ltv, term), [loan, price, ltv, term]);

  const thb = (n: number) => fmt.thb(lang, n);
  const pct = (n: number) => fmt.pct(lang, n, 1);

  const ladder = [
    // Each swatch matches the bar zone that begins at that price.
    { key: 'now', label: t.now, text: '', price, drop: 0, shade: '#FFE3B8' },
    { key: 'warn', label: t.warn, text: t.warnText, ...r.warn, shade: tokens.gold },
    { key: 'call', label: t.call, text: t.callText, ...r.call, shade: tokens.slate },
    { key: 'seize', label: t.seize, text: t.seizeText, ...r.seize, shade: tokens.navy },
  ];

  return (
    <Box>
      <Grid container spacing={{ xs: 3, md: 4 }}>
        {/* Inputs */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ p: { xs: 3, md: 4 }, borderRadius: `${tokens.radius.lg}px`, bgcolor: tokens.white, boxShadow: tokens.shadow.raised, height: '100%' }}>
            <Stack spacing={4}>
              <Box>
                <MoneyField label={t.amountLabel} help={t.amountHelp} value={loan} onCommit={setLoan} min={R.minLoan} max={R.maxLoan} lang={lang} />
                <Slider
                  aria-label={t.amountLabel}
                  value={loan}
                  min={R.minLoan}
                  max={R.maxLoan}
                  step={10_000}
                  onChange={(_, v) => setLoan(v as number)}
                  sx={{ mt: 1.5, color: tokens.navy }}
                />
                {loan > R.kyc1Cap && (
                  <Typography variant="body2" sx={{ color: tokens.slate, mt: 0.5 }}>
                    {t.kycHint}
                  </Typography>
                )}
              </Box>

              <Box>
                <Stack direction="row" justifyContent="space-between" alignItems="baseline" spacing={2} sx={{ mb: 1 }}>
                  <Typography component="label" id="ltv-label" sx={{ fontWeight: 600 }}>
                    {t.ltvLabel}
                  </Typography>
                  <Typography className="num" sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: 22 }}>
                    {ltv}%
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1} sx={{ mb: 1.5, flexWrap: 'wrap', rowGap: 1 }}>
                  {t.presets.map((p) => (
                    <Chip
                      key={p.ltv}
                      label={`${p.label} · ${p.ltv}%`}
                      onClick={() => setLtv(p.ltv)}
                      variant={ltv === p.ltv ? 'filled' : 'outlined'}
                      sx={{
                        fontWeight: 600,
                        bgcolor: ltv === p.ltv ? tokens.navy : 'transparent',
                        color: ltv === p.ltv ? tokens.white : tokens.navy,
                        borderColor: tokens.slate,
                        '&:hover': { bgcolor: ltv === p.ltv ? tokens.navy : 'rgba(0,43,73,0.06)' },
                      }}
                    />
                  ))}
                </Stack>
                <Slider
                  aria-labelledby="ltv-label"
                  value={ltv}
                  min={R.ltvMin}
                  max={R.ltvMax}
                  step={R.ltvStep}
                  marks
                  valueLabelDisplay="auto"
                  valueLabelFormat={(v) => `${v}%`}
                  onChange={(_, v) => setLtv(v as number)}
                  sx={{ color: tokens.navy }}
                />
                <Typography variant="body2" sx={{ color: tokens.charcoal, fontWeight: 400 }}>
                  {t.ltvHelp}
                </Typography>
              </Box>

              <Box>
                <Typography id="term-label" sx={{ fontWeight: 600, mb: 1 }}>
                  {t.termLabel}
                </Typography>
                <ToggleButtonGroup
                  exclusive
                  value={term}
                  onChange={(_, v) => v && setTerm(v)}
                  aria-labelledby="term-label"
                  fullWidth
                  sx={{ maxWidth: 440 }}
                >
                  {R.terms.map((m) => (
                    <ToggleButton
                      key={m}
                      value={m}
                      sx={{
                        px: { xs: 1, sm: 2.5 },
                        whiteSpace: 'nowrap',
                        textTransform: 'none',
                        fontWeight: 600,
                        color: tokens.navy,
                        borderColor: tokens.slate,
                        '&.Mui-selected, &.Mui-selected:hover': { bgcolor: tokens.navy, color: tokens.white },
                      }}
                    >
                      {t.months(m)}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Box>

              <MoneyField label={t.priceLabel} help={t.priceHelp} value={price} onCommit={setPrice} min={100_000} max={100_000_000} lang={lang} />
            </Stack>
          </Box>
        </Grid>

        {/* Results */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Box
            className="on-brand"
            aria-live="polite"
            sx={{ p: { xs: 3, md: 4 }, borderRadius: `${tokens.radius.lg}px`, bgcolor: tokens.navy, color: tokens.white, height: '100%', display: 'flex', flexDirection: 'column' }}
          >
            <Typography variant="overline" sx={{ color: tokens.gold }}>
              {t.resultEyebrow}
            </Typography>
            <Typography sx={{ mt: 2, color: tokens.softGrey }}>{t.btcNeeded}</Typography>
            <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: { xs: 30, md: 36 }, lineHeight: 1.2, color: tokens.gold, mt: 0.5, wordBreak: 'break-word' }}>
              <SpringNumber value={r.btc} format={(n) => fmt.btc(lang, n)} />
            </Typography>
            <Typography variant="body2" sx={{ color: tokens.softGrey, fontWeight: 400, mt: 0.5 }}>
              {t.collateralValue} <SpringNumber value={r.collateralValue} format={thb} />
            </Typography>

            <Box sx={{ my: 3, height: '1px', bgcolor: 'rgba(235,235,238,0.18)' }} />

            <Stack spacing={2.5}>
              <Row label={t.receive} note={t.receiveNote} value={<SpringNumber value={r.receive} format={thb} />} />
              <Row label={t.interest} note={t.interestNote(r.days)} value={<SpringNumber value={r.interest} format={thb} />} />
            </Stack>

            <Box sx={{ mt: 'auto', pt: 3 }}>
              <Typography variant="body2" sx={{ color: tokens.softGrey, fontWeight: 400, borderLeft: `2px solid ${tokens.gold}`, pl: 1.5 }}>
                {t.tip}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      {/* Price ladder */}
      <Box sx={{ mt: { xs: 3, md: 4 }, p: { xs: 3, md: 4 }, borderRadius: `${tokens.radius.lg}px`, bgcolor: tokens.white, boxShadow: tokens.shadow.rest }}>
        <Typography variant="h3" component="h3">
          {t.ladderTitle}
        </Typography>
        <Typography sx={{ mt: 1, color: tokens.charcoal, maxWidth: tokens.measure }}>{t.ladderLead}</Typography>

        {/* Proportional bar: 0 → price used. Each zone's width springs as LTV changes. */}
        <Box aria-hidden sx={{ mt: 4, mb: 1, position: 'relative', height: 14, borderRadius: 999, overflow: 'hidden', display: 'flex', bgcolor: tokens.navy }}>
          {[
            { w: r.seize.price / price, c: tokens.navy },
            { w: (r.call.price - r.seize.price) / price, c: tokens.slate },
            { w: (r.warn.price - r.call.price) / price, c: tokens.gold },
            { w: (price - r.warn.price) / price, c: '#FFE3B8' },
          ].map((z, i) => (
            <motion.div
              key={i}
              animate={{ flexBasis: `${z.w * 100}%` }}
              initial={false}
              transition={reduce ? { duration: 0 } : springs.soft}
              style={{ background: z.c, flexShrink: 0, flexGrow: 0 }}
            />
          ))}
        </Box>
        <Stack direction="row" justifyContent="space-between" sx={{ mb: 3 }}>
          <Typography variant="body2" className="num" sx={{ color: tokens.charcoal }}>฿0</Typography>
          <Typography variant="body2" className="num" sx={{ color: tokens.charcoal }}>{thb(price)}</Typography>
        </Stack>

        <Grid container spacing={2}>
          {ladder.map((s) => (
            <Grid key={s.key} size={{ xs: 12, sm: 6, md: 3 }}>
              <Box sx={{ height: '100%', p: 2.5, borderRadius: `${tokens.radius.md}px`, bgcolor: tokens.softGrey }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Box sx={{ width: 12, height: 12, borderRadius: 999, bgcolor: s.shade, border: `1px solid ${tokens.slate}` }} />
                  <Typography variant="overline" sx={{ color: tokens.slate, mb: 0 }}>
                    {s.label}
                  </Typography>
                </Stack>
                <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: 22, mt: 1 }}>
                  <SpringNumber value={s.price} format={thb} />
                </Typography>
                {s.key !== 'now' && (
                  <Typography variant="body2" className="num" sx={{ color: tokens.navy, mt: 0.25 }}>
                    {t.drop(pct(s.drop))}
                  </Typography>
                )}
                {s.text && (
                  <Typography variant="body2" sx={{ color: tokens.charcoal, fontWeight: 400, mt: 1 }}>
                    {s.text}
                  </Typography>
                )}
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Typography variant="body2" sx={{ mt: 2.5, color: tokens.charcoal, fontWeight: 400, maxWidth: 900 }}>
        {t.disclaimer}
      </Typography>
    </Box>
  );
}

function Row({ label, note, value }: { label: string; note: string; value: React.ReactNode }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
      <Box>
        <Typography sx={{ fontWeight: 600 }}>{label}</Typography>
        <Typography variant="body2" sx={{ color: tokens.softGrey, fontWeight: 400, opacity: 0.85 }}>
          {note}
        </Typography>
      </Box>
      <Typography sx={{ fontFamily: 'Montserrat', fontWeight: 700, fontSize: 18, whiteSpace: 'nowrap' }}>{value}</Typography>
    </Stack>
  );
}
