import { StatusDot } from './StatusDot';

type DotColor = 'pass' | 'critical' | 'warning' | 'info' | 'accent' | 'muted';

/**
 * 'default' — neutral border, bg-raised, muted text. For general status announcements.
 * 'accent'  — accent border + glow bg, accent text. For highlights like "Most popular".
 */
type Variant = 'default' | 'accent';

interface StatusPillProps {
  children: string;
  color?: DotColor;
  blink?: boolean;
  variant?: Variant;
  className?: string;
}

const variantClasses: Record<Variant, { wrapper: string; text: string }> = {
  default: {
    wrapper: 'border-border-base bg-bg-raised',
    text: 'text-text-muted',
  },
  accent: {
    wrapper: 'border-accent/40 bg-accent-glow',
    text: 'text-accent',
  },
};

/**
 * Inline pill combining a StatusDot with a short label.
 * Used for "Now available — Sentinel free tier" banners and "Most popular" callouts.
 *
 * Usage:
 *   <StatusPill color="pass" blink>Now available — Sentinel free tier</StatusPill>
 *   <StatusPill variant="accent" color="accent">Most popular</StatusPill>
 */
export function StatusPill({
  children,
  color = 'accent',
  blink = false,
  variant = 'default',
  className = '',
}: StatusPillProps) {
  const { wrapper, text } = variantClasses[variant];
  return (
    <div
      className={[
        'inline-flex items-center gap-2 border px-3 py-1.5',
        wrapper,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <StatusDot color={color} blink={blink} size="xs" />
      <span className={['font-mono text-[10px] uppercase tracking-widest', text].join(' ')}>
        {children}
      </span>
    </div>
  );
}
