import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { Panel } from './Panel';
import { InfoChip } from './InfoChip';

export function ToolFeatureCard({
  title,
  description,
  icon,
  href,
  tone = 'default',
  meta = [],
  ctaLabel,
  preview,
}: {
  title: ReactNode;
  description: ReactNode;
  icon: ReactNode;
  href: string;
  tone?: 'default' | 'accent' | 'hero';
  meta?: string[];
  ctaLabel: string;
  preview?: ReactNode;
}) {
  const panelTone = tone === 'hero' ? 'hero' : tone === 'accent' ? 'accent' : 'default';
  return (
    <Link to={href} className="block">
      <Panel tone={panelTone} padding="lg" interactive className="overflow-hidden">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-card bg-card text-2xl shadow-card">{icon}</div>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap gap-2">
              {meta.map((item) => (
                <InfoChip key={item} tone="accent">
                  {item}
                </InfoChip>
              ))}
            </div>
            <h2 className="mt-3 text-xl font-semibold text-textp">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-texts">{description}</p>
            {preview ? <div className="mt-4">{preview}</div> : null}
            <div className="mt-5 inline-flex items-center rounded-card bg-accent px-4 py-2 text-sm font-semibold text-white">
              {ctaLabel}
            </div>
          </div>
        </div>
      </Panel>
    </Link>
  );
}
