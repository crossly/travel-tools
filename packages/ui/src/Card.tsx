import type { PropsWithChildren } from 'react';
import { Panel } from './Panel';

export function Card({ className, children }: PropsWithChildren<{ className?: string }>) {
  return (
    <Panel className={className}>
      {children}
    </Panel>
  );
}
