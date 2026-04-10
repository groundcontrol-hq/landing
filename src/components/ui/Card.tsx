import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  /** Use 'sm' for 8px cut, 'md' (default) for 12px cut */
  cut?: 'sm' | 'md';
  /** Wraps in a 1px border frame for the raised border effect */
  bordered?: boolean;
}

/**
 * Base card container with the angular clip-path corner cut.
 *
 * Related sub-components (import separately):
 *   CardHeader       — `bg-bg-overlay border-b` panel header with left/right slots
 *   CardFooter       — `bg-bg-overlay border-t` panel footer with left/right slots
 *   CardSection      — padded interior region, optional `divided` border-b
 *   CardOffsetShadow — decorative depth shadow behind the card (needs `relative` wrapper)
 *
 * Full panel example:
 *   <div className="relative">
 *     <Card bordered>
 *       <CardHeader actions={<span>2m ago</span>}>
 *         <StatusDot color="pass" blink />
 *         <span className="font-mono text-xs …">yourcompany.com</span>
 *       </CardHeader>
 *       <CardSection divided>…score bar…</CardSection>
 *       <CardSection className="flex-1">
 *         <List variant="divide">…</List>
 *       </CardSection>
 *       <CardFooter>Next scan in 5h 47m</CardFooter>
 *     </Card>
 *     <CardOffsetShadow />
 *   </div>
 */
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
