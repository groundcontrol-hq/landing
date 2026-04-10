import type { ReactNode } from 'react';

type Variant  = 'space' | 'divide';
type SpaceGap = 2 | 3 | 4 | 6;

interface ListProps {
  children: ReactNode;
  /**
   * 'space'  — vertical gap between items (default). Use with FeatureItem, ListItem.
   * 'divide' — 1px dividers between items. Use with PricingRow, ListItem (padded).
   */
  variant?: Variant;
  /** Gap size for the 'space' variant. Default 3. */
  gap?: SpaceGap;
  className?: string;
}

const gapClass: Record<SpaceGap, string> = {
  2: 'space-y-2',
  3: 'space-y-3',
  4: 'space-y-4',
  6: 'space-y-6',
};

/**
 * Vertical list container. Two variants:
 *
 * 'space'  — adds consistent spacing between items.
 *   <List gap={3}>
 *     <FeatureItem>SSL certificate monitoring</FeatureItem>
 *     <FeatureItem color="pass">DMARC enforced</FeatureItem>
 *   </List>
 *
 * 'divide' — adds 1px dim dividers between items (row-table style).
 *   <List variant="divide">
 *     <PricingRow label="Domains" value="Unlimited" />
 *     <ListItem padded leading={<span className="…">DMARC</span>} trailing={<SeverityBadge … />}>
 *       Policy set to p=none
 *     </ListItem>
 *   </List>
 */
export function List({ children, variant = 'space', gap = 3, className = '' }: ListProps) {
  return (
    <div
      className={[
        variant === 'space'  && gapClass[gap],
        variant === 'divide' && 'divide-y divide-border-dim',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
