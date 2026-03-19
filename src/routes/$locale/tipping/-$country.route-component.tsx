import { Link } from '@tanstack/react-router'
import { AppShell } from '@/components/app/app-shell'
import { Button } from '@/components/ui/button'
import { PageState } from '@/components/app/page-state'
import { useI18n } from '@/lib/i18n'
import { DEFAULT_LOCALE, getLocalizedPath, resolveLocaleSegment } from '@/lib/site'
import { Route } from './$country'

export function TippingCountryRouteComponent() {
  const { locale, country } = Route.useLoaderData()
  const { t } = useI18n()

  return (
    <AppShell locale={locale} title={`${country} · ${t('tool.tipping.name')}`} description={t('tipping.countryDescription', { country })} activeTool="tipping">
      <PageState
        title={country}
        description={t('tipping.countryDescription', { country })}
        action={
          <Button asChild variant="secondary">
            <Link to={getLocalizedPath(resolveLocaleSegment(locale) ?? DEFAULT_LOCALE, '/tipping')}>
              {t('common.back')}
            </Link>
          </Button>
        }
      />
    </AppShell>
  )
}
