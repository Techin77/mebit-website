import { CssBaseline, ThemeProvider } from '@mui/material';
import { MotionConfig } from 'framer-motion';
import { useEffect, useMemo } from 'react';
import { HashRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { routes } from './content/common';
import { LangProvider, useLang } from './i18n';
import { buildTheme } from './theme';
import { NavBar } from './components/NavBar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Wallet } from './pages/Wallet';
import { Multisig } from './pages/Multisig';
import { Collateral } from './pages/Collateral';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Block body: some hosts (e.g. the artifact viewer) patch scrollTo to return a value,
    // which React would then try to call as a cleanup.
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Shell() {
  const { lang } = useLang();
  const theme = useMemo(() => buildTheme(lang), [lang]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MotionConfig reducedMotion="user">
        <ScrollToTop />
        <NavBar />
        <main>
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.wallet} element={<Wallet />} />
            <Route path={routes.multisig} element={<Multisig />} />
            <Route path={routes.collateral} element={<Collateral />} />
            <Route path="*" element={<Navigate to={routes.home} replace />} />
          </Routes>
        </main>
        <Footer />
      </MotionConfig>
    </ThemeProvider>
  );
}

/**
 * HashRouter so the build runs from any static host (or a file) with no rewrite rules.
 * Swap to BrowserRouter when deploying behind a server that rewrites to index.html.
 */
export default function App() {
  return (
    <LangProvider>
      <HashRouter>
        <Shell />
      </HashRouter>
    </LangProvider>
  );
}
