import type { ReactNode } from 'react';

interface CardFooterProps {
  /** Left-side content — status line, metadata, next-scan countdown */
  children: ReactNode;
  /** Right-side content — action link, secondary label */
  actions?: ReactNode;
  className?: string;
}

/**
 * Panel footer for cards and mock dashboards.
 * Dark overlay background, border-t (dim), flex row with left/right slots.
 * Children are wrapped in mono text-dim styles automatically.
 *
 * Usage:
 *   <CardFooter actions={<TextLink href="#">View all →</TextLink>}>
 *     Next scan in 5h 47m · Alerts: email + Slack
 *   </CardFooter>
 */
export function CardFooter({ children, actions, className = '' }: CardFooterProps) {
  return (
    <div
      className={[
        'flex items-center justify-between px-5 py-3',
        'border-t border-border-dim bg-bg-overlay',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="font-mono text-xs text-text-dim min-w-0">{children}</div>
      {actions !== undefined && (
        <div className="flex items-center gap-2 shrink-0 ml-4">{actions}</div>
      )}
    </div>
  );
}
