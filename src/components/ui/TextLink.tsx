import type { AnchorHTMLAttributes } from 'react';

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  children: string;
}

/**
 * An inline accent-colored monospace link with uppercase tracking.
 * Hover transitions to text-primary. Zero border-radius (no underline style).
 *
 * Usage:
 *   <TextLink href="/sentinel/email">DNS & Email deep scan →</TextLink>
 */
export function TextLink({ href, children, className = '', ...rest }: TextLinkProps) {
  return (
    <a
      href={href}
      className={[
        'inline-flex items-center gap-2',
        'font-mono text-xs text-accent uppercase tracking-widest',
        'hover:text-text-primary transition-colors duration-150',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </a>
  );
}
