import { AppShell } from '@/components/app/app-shell'
import { PageState } from '@/components/app/page-state'
import { useI18n } from '@/lib/i18n'
import { Route } from './index'

export function TippingHomeRouteComponent() {
  const { locale } = Route.useLoaderData()
  const { t } = useI18n()

  return (
    <AppShell locale={locale} title={t('tool.tipping.name')} description={t('tipping.description')} activeTool="tipping">
      <PageState
        title={t('tool.tipping.name')}
        description={t('tipping.countryDescription', { country: t('common.home') })}
      />
    </AppShell>
  )
}
