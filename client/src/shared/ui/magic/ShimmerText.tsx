import type { HTMLAttributes } from 'react';
import { cn } from '@utils/cn';

export function ShimmerText({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-block animate-magic-shimmer bg-[linear-gradient(110deg,hsl(var(--foreground))_0%,hsl(var(--primary))_35%,hsl(var(--accent))_50%,hsl(var(--foreground))_65%)] bg-[length:250%_100%] bg-clip-text text-transparent',
        className,
      )}
      {...props}
    />
  );
}
