export type Locale = 'zh-CN' | 'en-US';

export type ToolDefinition = {
  id: string;
  slug: 'currency' | 'split-bill';
  name: string;
  description: string;
  icon: string;
  enabled: boolean;
  entryPath: string;
};

export const SUPPORTED_LOCALES: Locale[] = ['zh-CN', 'en-US'];
export const DEFAULT_LOCALE: Locale = 'zh-CN';

export const TOOLS: ToolDefinition[] = [
  {
    id: 'tool_currency',
    slug: 'currency',
    name: 'Currency Converter',
    description: 'Quick exchange rates for travelers.',
    icon: '💱',
    enabled: true,
    entryPath: '/tools/currency',
  },
  {
    id: 'tool_split_bill',
    slug: 'split-bill',
    name: 'Split Bill',
    description: 'Track trip expenses and settle fairly.',
    icon: '🧾',
    enabled: true,
    entryPath: '/tools/split-bill',
  },
];

export function isLocale(value: string | undefined | null): value is Locale {
  return value === 'zh-CN' || value === 'en-US';
}

export function resolveLocaleFromPath(pathname: string): { locale: Locale; pathname: string } {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  const segments = normalized.split('/').filter(Boolean);
  const candidate = segments[0];
  if (isLocale(candidate)) {
    const rest = segments.slice(1).join('/');
    return {
      locale: candidate,
      pathname: rest ? `/${rest}` : '/',
    };
  }

  return {
    locale: DEFAULT_LOCALE,
    pathname: normalized === '' ? '/' : normalized,
  };
}

export function replaceLocaleInPath(pathname: string, locale: Locale): string {
  const { pathname: rest } = resolveLocaleFromPath(pathname);
  return getLocalizedPath(locale, rest);
}

export function getLocalizedPath(locale: Locale, pathname: string): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (normalized === '/') return `/${locale}`;
  return `/${locale}${normalized}`;
}

export function getEnabledTools(): ToolDefinition[] {
  return TOOLS.filter((tool) => tool.enabled);
}
