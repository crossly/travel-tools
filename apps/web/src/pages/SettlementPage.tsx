import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Layout } from '@travel-tools/ui';
import { fetchSettlement, fetchSnapshot } from '../lib/api';
import type { SettlementResponse, TripSnapshot } from '../lib/types';
import { useI18n } from '../hooks/useI18n';
import { useToast } from '../hooks/useToast';
import { useLocalizedPath } from '../lib/routes';
import { APP_VERSION, BUILD_DATE } from '../lib/version';

export function SettlementPage() {
  const { tripId = '' } = useParams();
  const { t, tError } = useI18n();
  const toLocalizedPath = useLocalizedPath();
  const { pushToast } = useToast();
  const buildInfo = t('common.buildInfo', { version: APP_VERSION, date: BUILD_DATE });
  const [snapshot, setSnapshot] = useState<TripSnapshot | null>(null);
  const [settlement, setSettlement] = useState<SettlementResponse | null>(null);

  useEffect(() => {
    Promise.all([fetchSnapshot(tripId), fetchSettlement(tripId)])
      .then(([snapshotData, settleData]) => {
        setSnapshot(snapshotData);
        setSettlement(settleData);
      })
      .catch((e) => pushToast({ type: 'error', title: tError((e as Error).message) }));
  }, [tripId, pushToast, tError]);

  const displayMember = (memberId: string) => {
    const match = /^p(\d+)$/.exec(memberId);
    if (match) {
      const index = Number(match[1]);
      const letter = String.fromCharCode(64 + Math.min(index, 26));
      if (index === 1) return t('common.youWithLetter', { letter });
      return t('common.memberWithLetter', { letter });
    }
    if (memberId === 'you') return t('common.you');
    if (memberId === 'others') return t('common.others');
    return t('common.unknown');
  };

  const onCopy = async () => {
    if (!settlement?.summaryText) return;
    await navigator.clipboard.writeText(settlement.summaryText);
    pushToast({ type: 'success', title: t('settlement.copySuccess') });
  };

  const onGenerateImage = () => {
    if (!settlement || !snapshot) return;
    const generatedDate = new Date().toISOString().slice(0, 10);

    const width = 1080;
    const padding = 48;
    const cardGap = 24;
    const cardRadius = 24;
    const rowHeight = 44;
    const transfers = settlement.transfers;
    const balances = settlement.balances;
    const fxRows = settlement.expenseConversions;
    const transfersHeight = 96 + Math.max(1, transfers.length) * rowHeight;
    const balancesHeight = 96 + Math.max(1, balances.length) * rowHeight;
    const fxHeight = 96 + Math.max(1, fxRows.length) * 76;
    const headerHeight = 170;
    const footerHeight = 80;
    const height =
      padding * 2 +
      headerHeight +
      transfersHeight +
      balancesHeight +
      fxHeight +
      footerHeight +
      cardGap * 3;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawRoundRect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.closePath();
    };

    const cardX = padding;
    const cardW = width - padding * 2;
    const drawCard = (y: number, h: number) => {
      drawRoundRect(cardX, y, cardW, h, cardRadius);
      ctx.fillStyle = '#ffffff';
      ctx.fill();
      ctx.strokeStyle = '#e7e5e4';
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const bg = ctx.createLinearGradient(0, 0, 0, height);
    bg.addColorStop(0, '#fff7ed');
    bg.addColorStop(1, '#fafaf9');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, height);

    let y = padding;
    ctx.fillStyle = '#f97316';
    ctx.font = '700 52px Inter';
    ctx.fillText(snapshot.trip.name, cardX, y + 56);

    ctx.fillStyle = '#78716c';
    ctx.font = '500 24px Inter';
    ctx.fillText(`${t('settlement.title')}  ·  ${generatedDate}`, cardX, y + 96);
    ctx.fillText(`${settlement.currencySummary.settlementCurrency}`, cardX, y + 132);
    y += headerHeight;

    drawCard(y, transfersHeight);
    ctx.fillStyle = '#1c1917';
    ctx.font = '700 30px Inter';
    ctx.fillText(t('settlement.transferSuggestion'), cardX + 24, y + 44);
    if (!transfers.length) {
      ctx.fillStyle = '#78716c';
      ctx.font = '500 24px Inter';
      ctx.fillText(t('settlement.noTransfer'), cardX + 24, y + 94);
    } else {
      transfers.forEach((transfer, idx) => {
        const rowY = y + 84 + idx * rowHeight;
        const from = displayMember(transfer.fromMemberId);
        const to = displayMember(transfer.toMemberId);
        ctx.fillStyle = '#1c1917';
        ctx.font = '500 24px Inter';
        ctx.fillText(`${from} -> ${to}`, cardX + 24, rowY);
        ctx.fillStyle = '#f97316';
        ctx.font = '700 24px "DM Mono"';
        ctx.fillText(`${transfer.amountBase.toFixed(2)}`, cardX + cardW - 240, rowY);
      });
    }
    y += transfersHeight + cardGap;

    drawCard(y, balancesHeight);
    ctx.fillStyle = '#1c1917';
    ctx.font = '700 30px Inter';
    ctx.fillText(t('settlement.netBalance'), cardX + 24, y + 44);
    balances.forEach((row, idx) => {
      const rowY = y + 84 + idx * rowHeight;
      ctx.fillStyle = '#1c1917';
      ctx.font = '500 24px Inter';
      ctx.fillText(displayMember(row.memberId), cardX + 24, rowY);
      ctx.fillStyle = row.net >= 0 ? '#f97316' : '#78716c';
      ctx.font = '700 24px "DM Mono"';
      ctx.fillText(`${row.net > 0 ? '+' : ''}${row.net.toFixed(2)}`, cardX + cardW - 240, rowY);
    });
    y += balancesHeight + cardGap;

    drawCard(y, fxHeight);
    ctx.fillStyle = '#1c1917';
    ctx.font = '700 30px Inter';
    ctx.fillText(t('settlement.fxDetails'), cardX + 24, y + 44);
    fxRows.forEach((row, idx) => {
      const rowY = y + 84 + idx * 76;
      ctx.fillStyle = '#1c1917';
      ctx.font = '600 22px Inter';
      ctx.fillText(row.title, cardX + 24, rowY);
      ctx.fillStyle = '#57534e';
      ctx.font = '500 20px "DM Mono"';
      ctx.fillText(
        `${row.originalAmount.toFixed(2)} ${row.originalCurrency} -> ${row.settlementAmount.toFixed(2)} ${settlement.currencySummary.settlementCurrency}`,
        cardX + 24,
        rowY + 30,
      );
      ctx.fillText(`${t('settlement.rateLabel')}: ${row.fxRateToSettlement.toFixed(6)}`, cardX + 24, rowY + 56);
    });
    y += fxHeight + cardGap;

    ctx.fillStyle = '#a8a29e';
    ctx.font = '500 18px Inter';
    ctx.fillText(t('app.name'), cardX, y + 24);
    ctx.fillText(t('settlement.generatedAt', { date: generatedDate }), cardX + 220, y + 24);

    const url = canvas.toDataURL('image/png');
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `settlement-${snapshot.trip.name}-${generatedDate}.png`;
    anchor.click();

    pushToast({ type: 'success', title: t('settlement.imageGenerated') });
  };

  return (
    <Layout
      appName={t('app.name')}
      eyebrow={t('site.eyebrow')}
      settingsLabel={t('common.settings')}
      homePath={toLocalizedPath('/')}
      settingsPath={toLocalizedPath('/settings')}
      buildInfo={buildInfo}
      title={t('settlement.title')}
    >
      <div className="mb-4">
        <Link to={toLocalizedPath(`/tools/split-bill/trip/${tripId}`)} className="text-sm text-texts">
          {t('settlement.backToTrip')}
        </Link>
      </div>

      <Card className="mb-4">
        <h2 className="text-sm font-medium">{t('settlement.currencySummary')}</h2>
        <p className="mt-2 text-sm text-texts">
          {t('settlement.expenseCurrency')}: <span className="font-display tabular-nums">{settlement?.currencySummary.expenseCurrency ?? '---'}</span>
        </p>
        <p className="mt-1 text-sm text-texts">
          {t('settlement.settlementCurrency')}: <span className="font-display tabular-nums">{settlement?.currencySummary.settlementCurrency ?? '---'}</span>
        </p>
      </Card>

      <Card className="mb-4">
        <h2 className="text-sm font-medium">{t('settlement.transferSuggestion')}</h2>
        <div className="mt-2 space-y-2">
          {settlement?.transfers.map((transfer, idx) => (
            <div key={`${transfer.fromMemberId}-${transfer.toMemberId}-${idx}`} className="rounded-card border border-borderc px-3 py-2 text-sm">
              {displayMember(transfer.fromMemberId)} {'->'} {displayMember(transfer.toMemberId)}
              <span className="ml-2 font-display tabular-nums">{transfer.amountBase.toFixed(2)}</span>
            </div>
          ))}
          {settlement && settlement.transfers.length === 0 ? <p className="text-sm text-texts">{t('settlement.noTransfer')}</p> : null}
        </div>
      </Card>

      <Card className="mb-4">
        <h2 className="text-sm font-medium">{t('settlement.netBalance')}</h2>
        <div className="mt-2 space-y-2 text-sm">
          {settlement?.balances.map((row) => (
            <div key={row.memberId} className="flex items-center justify-between rounded-card border border-borderc px-3 py-2">
              <span>{displayMember(row.memberId)}</span>
              <span className="font-display tabular-nums">{row.net.toFixed(2)}</span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mb-4">
        <h2 className="text-sm font-medium">{t('settlement.fxDetails')}</h2>
        <div className="mt-2 space-y-2">
          {settlement?.expenseConversions.map((row) => (
            <div key={row.expenseId} className="rounded-card border border-borderc px-3 py-2 text-xs text-texts">
              <p className="font-medium text-textp">{row.title}</p>
              <p className="mt-1">{row.spentAt.slice(0, 10)}</p>
              <p className="mt-1 font-display tabular-nums">
                {row.originalAmount.toFixed(2)} {row.originalCurrency} {'->'} {row.settlementAmount.toFixed(2)} {settlement?.currencySummary.settlementCurrency}
              </p>
              <p className="mt-1 font-display tabular-nums">{t('settlement.rateLabel')}: {row.fxRateToSettlement.toFixed(6)}</p>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-2">
        <button onClick={() => void onCopy()} className="rounded-card bg-accent px-4 py-3 text-sm font-semibold text-white">
          {t('settlement.copyText')}
        </button>
        <button onClick={onGenerateImage} className="rounded-card border border-accent px-4 py-3 text-sm font-semibold text-accent">
          {t('settlement.generateImage')}
        </button>
      </div>
    </Layout>
  );
}
