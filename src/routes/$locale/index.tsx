import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/features/site/home-page'
import { buildDocumentTitle, translate } from '@/lib/i18n'

export const Route = createFileRoute('/$locale/')({
  head: ({ params }) => {
    const locale = params.locale as 'zh-CN' | 'en-US'
    return {
      meta: [
        { title: buildDocumentTitle(locale, translate(locale, 'site.homeTitle')) },
        { name: 'description', content: translate(locale, 'site.homeDescription') },
      ],
    }
  },
  component: HomeRoute,
})

function HomeRoute() {
  const { locale } = Route.useParams()
  return <HomePage locale={locale as 'zh-CN' | 'en-US'} />
}
