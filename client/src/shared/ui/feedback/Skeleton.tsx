import { cn } from '@utils/cn';

export function Skeleton({ className }: Readonly<{ className?: string }>) {
  return <div className={cn('animate-pulse rounded-xl bg-muted', className)} />;
}
