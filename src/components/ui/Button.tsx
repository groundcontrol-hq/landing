import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'outline';
type Size = 'sm' | 'md';

interface BaseProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps &
  ({ href: string } & AnchorHTMLAttributes<HTMLAnchorElement>) |
  (BaseProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>);

const baseClasses =
  'inline-flex items-center gap-2 font-mono uppercase tracking-widest border transition-all duration-150 rounded-none shrink-0';

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-1.5 text-[10px]',
  md: 'px-5 py-2.5 text-xs',
};

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent text-bg-base border-accent hover:bg-transparent hover:text-accent',
  ghost:
    'bg-transparent text-text-muted border-border-base hover:border-accent hover:text-accent',
  outline:
    'bg-transparent text-accent border-accent hover:bg-accent hover:text-bg-base',
};

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'md', className = '', children } = props;
  const classes = [baseClasses, sizeClasses[size], variantClasses[variant], className]
    .filter(Boolean)
    .join(' ');

  if ('href' in props && props.href !== undefined) {
    const { href, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as BaseProps & { href: string } & AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, href: _h, ...rest } = props as BaseProps & { href?: undefined } & ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
