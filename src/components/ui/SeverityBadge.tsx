export type Severity = 'critical' | 'warning' | 'pass' | 'info';

interface SeverityBadgeProps {
  severity: Severity;
  label?: string;
  className?: string;
}

const config: Record<Severity, { text: string; classes: string; dotClass: string }> = {
  critical: {
    text: 'Critical',
    classes: 'bg-critical-bg text-critical border-critical/30',
    dotClass: 'bg-critical',
  },
  warning: {
    text: 'Warning',
    classes: 'bg-warning-bg text-warning border-warning/30',
    dotClass: 'bg-warning',
  },
  pass: {
    text: 'Pass',
    classes: 'bg-pass-bg text-pass border-pass/30',
    dotClass: 'bg-pass',
  },
  info: {
    text: 'Info',
    classes: 'bg-info-bg text-info border-info/30',
    dotClass: 'bg-info',
  },
};

export function SeverityBadge({ severity, label, className = '' }: SeverityBadgeProps) {
  const cfg = config[severity];
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-2 py-0.5',
        'font-mono text-xs uppercase tracking-wider border',
        cfg.classes,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {/* Square indicator — not a circle */}
      <span className={['inline-block w-1.5 h-1.5 flex-shrink-0', cfg.dotClass].join(' ')} />
      {label ?? cfg.text}
    </span>
  );
}
