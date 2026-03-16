import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router'
import { translate } from '@/lib/i18n'
import { buildPrivatePageHead } from '@/lib/seo'
import { DEFAULT_LOCALE, resolveLocaleSegment } from '@/lib/site'

const SettingsRouteComponent = lazyRouteComponent(
  () => import('./-settings.route-component'),
  'SettingsRouteComponent',
)

export const Route = createFileRoute('/$locale/settings')({
  head: ({ params }) => {
    const locale = resolveLocaleSegment(params.locale) ?? DEFAULT_LOCALE
    return buildPrivatePageHead({
      locale,
      title: translate(locale, 'settings.title'),
      description: translate(locale, 'settings.title'),
    })
  },
  component: SettingsRouteComponent,
})
