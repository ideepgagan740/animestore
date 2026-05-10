import type { HTMLAttributes } from 'react';
import { cn } from '@utils/cn';

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold text-accent-foreground',
        className,
      )}
      {...props}
    />
  );
}
