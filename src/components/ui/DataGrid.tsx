import type { ReactNode } from 'react';

/** Number of columns at md+ breakpoint. Mobile is always single-column. */
type Cols = 2 | 3 | 4;

interface DataGridProps {
  children: ReactNode;
  cols?: Cols;
  className?: string;
}

const colsClass: Record<Cols, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-3',
  4: 'md:grid-cols-4',
};

/**
 * Bordered grid container used across all sections.
 * Renders children in a 1-column grid on mobile, N-column on md+.
 * Adds 1px dividers between cells via CSS divide utilities.
 *
 * Usage:
 *   <DataGrid cols={3}>
 *     <div className="p-8">…</div>
 *     <div className="p-8">…</div>
 *     <div className="p-8">…</div>
 *   </DataGrid>
 */
export function DataGrid({ children, cols = 3, className = '' }: DataGridProps) {
  return (
    <div
      className={[
        'grid grid-cols-1 border border-border-base',
        'divide-y divide-border-base',
        colsClass[cols],
        'md:divide-y-0 md:divide-x md:divide-border-base',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
