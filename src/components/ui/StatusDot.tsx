type DotColor = 'pass' | 'critical' | 'warning' | 'info' | 'accent' | 'muted';

interface StatusDotProps {
  color?: DotColor;
  /** Animate with blink effect (for critical live indicators) */
  blink?: boolean;
  /** Size in Tailwind w/h units */
  size?: 'xs' | 'sm';
  className?: string;
}

const colorClasses: Record<DotColor, string> = {
  pass: 'bg-pass',
  critical: 'bg-critical',
  warning: 'bg-warning',
  info: 'bg-info',
  accent: 'bg-accent',
  muted: 'bg-text-muted',
};

const sizeClasses = {
  xs: 'w-1 h-1',
  sm: 'w-1.5 h-1.5',
};

export function StatusDot({ color = 'accent', blink = false, size = 'sm', className = '' }: StatusDotProps) {
  return (
    <span
      className={[
        'inline-block flex-shrink-0',
        sizeClasses[size],
        colorClasses[color],
        blink ? 'blink' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    />
  );
}
