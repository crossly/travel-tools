import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { I18nProvider } from '@/lib/i18n'
import { DEFAULT_LOCALE, isLocale } from '@/lib/site'

export const Route = createFileRoute('/$locale')({
  beforeLoad: ({ params }) => {
    if (!isLocale(params.locale)) {
      throw redirect({ to: '/$locale', params: { locale: DEFAULT_LOCALE } })
    }
  },
  component: LocaleLayout,
})

function LocaleLayout() {
  const { locale } = Route.useParams()
  return (
    <I18nProvider locale={locale as 'zh-CN' | 'en-US'} onLocaleChange={() => {}}>
      <Outlet />
    </I18nProvider>
  )
}
