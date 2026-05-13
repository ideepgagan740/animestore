import type { CSSProperties, HTMLAttributes } from 'react';
import { cn } from '@utils/cn';

interface BorderBeamProps extends HTMLAttributes<HTMLDivElement> {
  duration?: number;
  delay?: number;
  colorFrom?: string;
  colorTo?: string;
}

export function BorderBeam({
  duration = 7,
  delay = 0,
  colorFrom = 'hsl(var(--primary))',
  colorTo = 'hsl(var(--accent))',
  className,
  style,
  ...props
}: BorderBeamProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent bg-[linear-gradient(hsl(var(--card)),hsl(var(--card)))_padding-box,conic-gradient(from_var(--magic-border-angle),transparent_0deg,transparent_255deg,var(--magic-color-from)_290deg,var(--magic-color-to)_330deg,transparent_360deg)_border-box] opacity-85 animate-magic-border',
        className,
      )}
      style={
        {
          '--magic-border-duration': `${duration}s`,
          '--magic-border-delay': `${delay}s`,
          '--magic-color-from': colorFrom,
          '--magic-color-to': colorTo,
          ...style,
        } as CSSProperties
      }
      {...props}
    />
  );
}
