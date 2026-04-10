import type { ReactNode } from 'react';

interface CardSectionProps {
  children: ReactNode;
  /** Add border-b to visually separate sections within a card */
  divided?: boolean;
  /** Remove default horizontal padding — useful when content needs full bleed */
  flush?: boolean;
  className?: string;
}

/**
 * A padded interior region of a card.
 * Stack multiple CardSections inside a Card to build structured panels.
 *
 * Usage:
 *   <Card>
 *     <CardHeader>…</CardHeader>
 *     <CardSection divided>
 *       <ScoreBar />
 *     </CardSection>
 *     <CardSection className="flex-1">
 *       <List variant="divide">…</List>
 *     </CardSection>
 *     <CardFooter>…</CardFooter>
 *   </Card>
 */
export function CardSection({ children, divided = false, flush = false, className = '' }: CardSectionProps) {
  return (
    <div
      className={[
        !flush && 'px-5 py-4',
        divided && 'border-b border-border-dim',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </div>
  );
}
