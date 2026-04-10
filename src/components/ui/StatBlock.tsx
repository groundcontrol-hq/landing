interface StatBlockProps {
  /** The large display number or value, e.g. "10,000" or "4.5h" */
  value: string;
  /** Supporting label below the value */
  label: string;
  className?: string;
}

/**
 * A large accent-colored stat number with a muted descriptor label.
 * Separated from content above by a top border.
 *
 * Usage:
 *   <StatBlock value="10,000" label="spoofed emails sent from one domain in a single attack" />
 */
export function StatBlock({ value, label, className = '' }: StatBlockProps) {
  return (
    <div className={['border-t border-border-dim pt-6', className].filter(Boolean).join(' ')}>
      <div className="font-display font-bold text-3xl text-accent mb-1">{value}</div>
      <div className="font-mono text-xs text-text-dim leading-relaxed">{label}</div>
    </div>
  );
}
