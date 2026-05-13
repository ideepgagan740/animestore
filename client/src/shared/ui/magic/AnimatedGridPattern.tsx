import type { CSSProperties, HTMLAttributes } from 'react';
import { cn } from '@utils/cn';

interface AnimatedGridPatternProps extends HTMLAttributes<HTMLDivElement> {
  cellSize?: number;
  opacity?: number;
}

export function AnimatedGridPattern({
  cellSize = 36,
  opacity = 0.5,
  className,
  style,
  ...props
}: AnimatedGridPatternProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] [mask-image:linear-gradient(to_bottom,black,transparent_78%)]',
        className,
      )}
      style={
        {
          '--grid-cell-size': `${cellSize}px`,
          '--grid-opacity': opacity,
          ...style,
        } as CSSProperties
      }
      {...props}
    >
      <div className="absolute inset-[-20%] animate-magic-grid bg-[linear-gradient(to_right,hsl(var(--foreground)/0.12)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--foreground)/0.12)_1px,transparent_1px)] bg-[length:var(--grid-cell-size)_var(--grid-cell-size)] opacity-[var(--grid-opacity)]" />
    </div>
  );
}
