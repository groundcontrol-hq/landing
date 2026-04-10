import { StatusDot } from './StatusDot';

type DotColor = 'pass' | 'critical' | 'warning' | 'info' | 'accent' | 'muted';

interface FeatureItemProps {
  children: string;
  /** Dot color — use 'pass' for confirmed checks, 'muted' for neutral lists */
  color?: DotColor;
  /** Use font-mono for data/technical items, font-body (default) for prose */
  mono?: boolean;
  className?: string;
}

/**
 * A single check/feature list item: small square dot + text.
 * Used inside product cards, attack surface panels, and any feature list.
 *
 * Usage:
 *   <FeatureItem color="pass">DMARC policy enforcement</FeatureItem>
 *   <FeatureItem>SSL certificate expiry monitoring</FeatureItem>
 */
export function FeatureItem({ children, color = 'muted', mono = false, className = '' }: FeatureItemProps) {
  return (
    <div className={['flex items-start gap-3', className].filter(Boolean).join(' ')}>
      <StatusDot color={color} size="xs" className="mt-1.5 shrink-0" />
      <span
        className={[
          'text-sm text-text-muted leading-snug',
          mono ? 'font-mono' : 'font-body',
        ].join(' ')}
      >
        {children}
      </span>
    </div>
  );
}
