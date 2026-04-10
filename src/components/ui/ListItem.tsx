import type { ReactNode } from 'react';

interface ListItemProps {
  children: ReactNode;
  /** Left slot — StatusDot, step number, icon, label tag */
  leading?: ReactNode;
  /** Right slot — SeverityBadge, value, action */
  trailing?: ReactNode;
  /**
   * 'start'  — items-start, for multi-line bullet items (default).
   * 'center' — items-center, for single-line row items in divide lists.
   */
  align?: 'start' | 'center';
  /** Add px-5 py-3 horizontal padding — for items inside a divide list. */
  padded?: boolean;
  className?: string;
}

/**
 * Generic list item with optional leading and trailing slots.
 * Works in both 'space' and 'divide' List variants.
 *
 * Bullet-style (space list, no padding):
 *   <ListItem leading={<StatusDot color="accent" size="xs" className="mt-1" />}>
 *     <p className="font-mono text-sm text-text-primary">Checks run every 6 hours</p>
 *     <p className="font-body text-xs text-text-muted">SPF, DKIM, DMARC, SSL, M365</p>
 *   </ListItem>
 *
 * Row-style (divide list, padded):
 *   <ListItem
 *     align="center"
 *     padded
 *     leading={<span className="font-mono text-xs text-text-dim w-10 shrink-0">DMARC</span>}
 *     trailing={<SeverityBadge severity="critical" />}
 *   >
 *     <span className="font-mono text-xs text-text-muted truncate">Policy set to p=none</span>
 *   </ListItem>
 */
export function ListItem({
  children,
  leading,
  trailing,
  align = 'start',
  padded = false,
  className = '',
}: ListItemProps) {
  return (
    <div
      className={[
        'flex gap-3',
        align === 'start'  ? 'items-start' : 'items-center',
        padded             ? 'px-5 py-3'   : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {leading  !== undefined && <div className="shrink-0">{leading}</div>}
      <div className="flex-1 min-w-0">{children}</div>
      {trailing !== undefined && <div className="shrink-0">{trailing}</div>}
    </div>
  );
}
