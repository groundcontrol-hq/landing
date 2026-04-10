import type { ReactNode } from 'react';

interface CardHeaderProps {
  /** Left-side content — typically StatusDot + mono label */
  children: ReactNode;
  /** Right-side content — timestamp, badge, or menu */
  actions?: ReactNode;
  className?: string;
}

/**
 * Panel header for cards and mock dashboards.
 * Dark overlay background, border-b, flex row with left/right slots.
 *
 * Usage:
 *   <CardHeader actions={<span className="font-mono text-xs text-text-dim">2m ago</span>}>
 *     <StatusDot color="pass" blink />
 *     <span className="font-mono text-xs text-text-muted uppercase tracking-widest">
 *       yourcompany.com
 *     </span>
 *   </CardHeader>
 */
export function CardHeader({ children, actions, className = '' }: CardHeaderProps) {
  return (
    <div
      className={[
        'flex items-center justify-between px-5 py-3',
        'border-b border-border-base bg-bg-overlay',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex items-center gap-2 min-w-0">{children}</div>
      {actions !== undefined && (
        <div className="flex items-center gap-2 shrink-0 ml-4">{actions}</div>
      )}
    </div>
  );
}
