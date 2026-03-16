import { HomePage } from '@/features/site/home-page'
import { I18nProvider } from '@/lib/i18n'
import { Route } from './index'

export function RootIndexRouteComponent() {
  const { locale, homePageStats } = Route.useLoaderData()

  return (
    <I18nProvider locale={locale} onLocaleChange={() => {}}>
      <HomePage locale={locale} stats={homePageStats} />
    </I18nProvider>
  )
}
