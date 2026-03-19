import '@/lib/i18n/messages/visa-entry'
import { Link } from '@tanstack/react-router'
import { ArrowLeft, ExternalLink, ShieldAlert } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { PageState } from '@/components/app/page-state'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useI18n } from '@/lib/i18n'
import { getLocalizedPath } from '@/lib/site'
import type { Locale } from '@/lib/types'
import type { VisaEntryDestinationGuide } from '@/lib/visa-entry'

export function VisaEntryCountryPage({
  locale,
  guide,
}: {
  locale: Locale
  guide: VisaEntryDestinationGuide | null
}) {
  const { t } = useI18n()

  if (!guide) {
    return (
      <AppShell locale={locale} title={t('visaEntry.title')} description={t('visaEntry.description')} activeTool="visa-entry">
        <PageState
          tone="danger"
          title={t('visaEntry.searchEmptyTitle')}
          description={t('visaEntry.searchEmptyDescription')}
          action={(
            <Button asChild>
              <Link to={getLocalizedPath(locale, '/visa-entry')}>
                {t('visaEntry.backToHome')}
              </Link>
            </Button>
          )}
        />
      </AppShell>
    )
  }

  return (
    <AppShell locale={locale} title={guide.title} description={guide.description} activeTool="visa-entry">
      <Card>
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <Badge variant="outline" className="w-fit">
                {t('visaEntry.countryMetric', { country: guide.country, region: guide.region })}
              </Badge>
              <CardTitle className="flex items-center gap-3 text-2xl md:text-3xl">
                <span className="text-3xl" aria-hidden="true">{guide.flag}</span>
                {guide.country}
              </CardTitle>
              <CardDescription className="max-w-3xl text-pretty text-sm leading-6 md:text-base">
                {guide.summary}
              </CardDescription>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-sm text-muted-foreground">
                <span className="rounded-full border border-border bg-background px-3 py-1 font-medium text-foreground/80">
                  {guide.specialFlow}
                </span>
                <span>{locale === 'zh-CN' ? `最近核对 ${guide.lastReviewed}` : `Last reviewed ${guide.lastReviewed}`}</span>
              </div>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <Card>
          <CardHeader>
            <CardTitle>{t('visaEntry.commonEntryPathsTitle')}</CardTitle>
            <CardDescription>{guide.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {guide.commonEntryPaths.map((item) => (
              <div key={item} className="rounded-2xl border border-border/70 bg-muted p-4 text-sm leading-6 text-foreground/85">
                {item}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card tone="soft">
          <CardContent className="grid gap-3 pt-6">
            <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
              <p className="text-sm font-medium text-muted-foreground">{t('visaEntry.arrivalCardTitle')}</p>
              <p className="mt-2 text-sm leading-6 text-foreground/85">{guide.arrivalCard}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
              <p className="text-sm font-medium text-muted-foreground">{t('visaEntry.customsDeclarationTitle')}</p>
              <p className="mt-2 text-sm leading-6 text-foreground/85">{guide.customsDeclaration}</p>
            </div>
            <div className="rounded-2xl border border-border/70 bg-background/80 p-4">
              <p className="text-sm font-medium text-muted-foreground">{t('visaEntry.healthDeclarationTitle')}</p>
              <p className="mt-2 text-sm leading-6 text-foreground/85">{guide.healthDeclaration}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card tone="soft">
        <CardHeader>
          <CardTitle>{t('visaEntry.officialLinksTitle')}</CardTitle>
          <CardDescription>{t('visaEntry.verificationNoteBody')}</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {guide.officialLinks.map((link) => (
            <Button key={link.href} asChild variant="secondary" className="w-full justify-between">
              <a href={link.href} target="_blank" rel="noreferrer">
                <span>{link.label}</span>
                <ExternalLink className="size-4" />
              </a>
            </Button>
          ))}
          <div className="rounded-2xl border border-primary/20 bg-background/80 p-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <ShieldAlert className="size-4 text-primary" />
              {t('visaEntry.verificationNoteTitle')}
            </div>
            <p className="mt-2 text-sm leading-6 text-foreground/85">{guide.verificationNote}</p>
            <Button asChild variant="outline" className="mt-4 w-full justify-between">
              <Link to={getLocalizedPath(locale, '/visa-entry')}>
                <ArrowLeft className="size-4" />
                {t('visaEntry.backToHome')}
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </AppShell>
  )
}
