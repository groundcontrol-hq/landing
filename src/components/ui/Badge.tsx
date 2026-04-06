import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

/** Generic mono uppercase badge — use SeverityBadge for status-colored variants */
export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-2 py-0.5',
        'font-mono text-[10px] uppercase tracking-wider',
        'border border-border-base text-text-muted',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}
