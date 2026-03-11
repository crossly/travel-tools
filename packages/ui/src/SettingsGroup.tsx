import type { PropsWithChildren, ReactNode } from 'react';
import { Panel } from './Panel';
import { SectionHeader } from './SectionHeader';

export function SettingsGroup({
  title,
  description,
  action,
  children,
  className,
}: PropsWithChildren<{
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}>) {
  return (
    <Panel className={className}>
      <SectionHeader title={title} description={description} action={action} />
      {children}
    </Panel>
  );
}
