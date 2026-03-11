import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { replaceLocaleInPath, resolveLocaleFromPath } from '@travel-tools/shared/site';
import { readLocale, translate, translateError, writeLocale, type Locale, type TranslationKey } from '@travel-tools/i18n';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
  tError: (raw: string) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [locale, setLocaleState] = useState<Locale>(() => resolveLocaleFromPath(location.pathname).locale || readLocale());

  useEffect(() => {
    const nextLocale = resolveLocaleFromPath(location.pathname).locale;
    setLocaleState(nextLocale);
    writeLocale(nextLocale);
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.title = translate(locale, 'app.name');
  }, [locale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale: (next) => {
        writeLocale(next);
        navigate(`${replaceLocaleInPath(location.pathname, next)}${location.search}${location.hash}`, { replace: true });
      },
      t: (key, vars) => translate(locale, key, vars),
      tError: (raw) => translateError(locale, raw),
    }),
    [locale, location.hash, location.pathname, location.search, navigate],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
}
