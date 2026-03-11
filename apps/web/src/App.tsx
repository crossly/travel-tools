import type { ReactElement } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';
import { DEFAULT_LOCALE, isLocale } from '@travel-tools/shared/site';
import { readLocale } from '@travel-tools/i18n';
import { HomePage } from './pages/HomePage';
import { CurrencyPage } from './pages/CurrencyPage';
import { SplitBillHomePage } from './pages/SplitBillHomePage';
import { TripPage } from './pages/TripPage';
import { AddExpensePage } from './pages/AddExpensePage';
import { SettlementPage } from './pages/SettlementPage';
import { SettingsPage } from './pages/SettingsPage';

function LocaleGuard({ children }: { children: ReactElement }) {
  const params = useParams();
  return isLocale(params.locale) ? children : <Navigate to={`/${DEFAULT_LOCALE}`} replace />;
}

export function App() {
  const initialLocale = readLocale();

  return (
    <Routes>
      <Route path="/" element={<Navigate to={`/${initialLocale}`} replace />} />
      <Route
        path="/:locale"
        element={
          <LocaleGuard>
            <HomePage />
          </LocaleGuard>
        }
      />
      <Route path="/:locale/tools/currency" element={<CurrencyPage />} />
      <Route path="/:locale/tools/split-bill" element={<SplitBillHomePage />} />
      <Route path="/:locale/tools/split-bill/trip/:tripId" element={<TripPage />} />
      <Route path="/:locale/tools/split-bill/trip/:tripId/add" element={<AddExpensePage />} />
      <Route path="/:locale/tools/split-bill/trip/:tripId/settlement" element={<SettlementPage />} />
      <Route path="/:locale/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to={`/${initialLocale}`} replace />} />
    </Routes>
  );
}
