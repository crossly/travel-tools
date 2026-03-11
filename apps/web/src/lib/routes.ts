import { useNavigate } from 'react-router-dom';
import { getLocalizedPath } from '@travel-tools/shared/site';
import { useI18n } from '../hooks/useI18n';

export function useLocalizedPath(): (path: string) => string {
  const { locale } = useI18n();
  return (path: string) => getLocalizedPath(locale, path);
}

export function useLocalizedNavigate(): (path: string) => void {
  const navigate = useNavigate();
  const toLocalizedPath = useLocalizedPath();
  return (path: string) => navigate(toLocalizedPath(path));
}
