import type { InputHTMLAttributes } from 'react';
import { cn } from '@utils/cn';

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'w-full rounded-xl border border-border bg-card px-4 py-2 text-sm outline-none transition placeholder:text-foreground/45 focus:border-primary focus:ring-2 focus:ring-primary/20',
        className,
      )}
      {...props}
    />
  );
}
