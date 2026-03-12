import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, ReceiptText, WalletCards } from 'lucide-react'
import { AppShell } from '@/components/app/app-shell'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getLocalizedPath } from '@/lib/site'
import { readLastTool } from '@/lib/storage'
import { useI18n } from '@/lib/i18n'
import type { Locale } from '@/lib/types'

export function HomePage({ locale }: { locale: Locale }) {
  const { t } = useI18n()
  const [lastTool, setLastTool] = useState<string | null>(null)

  useEffect(() => {
    setLastTool(readLastTool())
  }, [])

  return (
    <AppShell locale={locale} title={t('site.homeTitle')} description={t('site.homeDescription')}>
      <Card className="overflow-hidden">
        <CardHeader className="gap-4">
          <Badge variant="outline" className="w-fit">
            {t('site.tagline')}
          </Badge>
          <CardTitle className="max-w-3xl text-4xl leading-tight">{t('site.heroTitle')}</CardTitle>
          <CardDescription className="max-w-2xl text-base leading-7">{t('site.heroDescription')}</CardDescription>
          <div className="flex flex-wrap gap-3">
            {lastTool ? (
              <Button asChild size="lg" className="min-w-40 justify-between">
                <Link to={getLocalizedPath(locale, lastTool === 'currency' ? '/tools/currency' : '/tools/split-bill')}>
                  {t('site.openRecentTool')}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : null}
            <Button asChild variant="secondary" size="lg" className="min-w-40 justify-between">
              <Link to={getLocalizedPath(locale, '/tools/currency')}>
                {t('site.exploreTools')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <WalletCards className="h-6 w-6 text-primary" />
              <Badge variant="outline">FX</Badge>
            </div>
            <CardTitle>{t('tool.currency.name')}</CardTitle>
            <CardDescription>{t('site.currencyPreview')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border bg-muted p-4">
              <p className="mono text-2xl font-medium">100 USD → 728.42 CNY</p>
            </div>
            <Button asChild variant="secondary" size="lg" className="w-full justify-between">
              <Link to={getLocalizedPath(locale, '/tools/currency')}>
                {t('tool.currency.name')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <ReceiptText className="h-6 w-6 text-primary" />
              <Badge variant="outline">Trip</Badge>
            </div>
            <CardTitle>{t('tool.splitBill.name')}</CardTitle>
            <CardDescription>{t('site.splitPreview')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-2xl border border-border bg-muted p-4">
              <p className="mono text-2xl font-medium">6 people · 2 currencies</p>
            </div>
            <Button asChild variant="secondary" size="lg" className="w-full justify-between">
              <Link to={getLocalizedPath(locale, '/tools/split-bill')}>
                {t('tool.splitBill.name')}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{t('site.nextTitle')}</CardTitle>
          <CardDescription>{t('site.nextBody')}</CardDescription>
        </CardHeader>
      </Card>
    </AppShell>
  )
}
