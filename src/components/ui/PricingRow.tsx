interface PricingRowProps {
  /** Feature label on the left */
  label: string;
  /**
   * Value on the right.
   * - '—' renders as dim/disabled
   * - Values starting with '✓' render in pass/green
   * - All other values render in text-primary
   */
  value: string;
}

/**
 * A single row in a pricing feature table: label on the left, value on the right.
 * Pair with a `divide-y divide-border-dim` wrapper for the full table.
 *
 * Usage:
 *   <div className="divide-y divide-border-dim">
 *     <PricingRow label="Domains" value="Unlimited" />
 *     <PricingRow label="NIS2 report" value="✓ Full PDF export" />
 *     <PricingRow label="API access" value="—" />
 *   </div>
 */
export function PricingRow({ label, value }: PricingRowProps) {
  const valueClass =
    value === '—'
      ? 'text-text-dim'
      : value.startsWith('✓')
        ? 'text-pass'
        : 'text-text-primary';

  return (
    <div className="flex items-center justify-between py-2.5">
      <span className="font-mono text-xs text-text-muted">{label}</span>
      <span className={['font-mono text-xs', valueClass].join(' ')}>{value}</span>
    </div>
  );
}
