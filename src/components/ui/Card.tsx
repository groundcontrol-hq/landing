import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Use 'sm' for 8px cut, 'md' (default) for 12px cut */
  cut?: 'sm' | 'md';
  /** Wraps in a 1px border frame for the raised border effect */
  bordered?: boolean;
}

export function Card({ children, className = '', cut = 'md', bordered = false }: CardProps) {
  const cutClass = cut === 'sm' ? 'card-cut-sm' : 'card-cut';
  const inner = (
    <div className={['bg-bg-raised', cutClass, className].filter(Boolean).join(' ')}>
      {children}
    </div>
  );

  if (bordered) {
    return (
      <div className={['bg-border-base p-px', cutClass].join(' ')}>
        {inner}
      </div>
    );
  }

  return inner;
}
