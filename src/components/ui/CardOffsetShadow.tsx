/**
 * Decorative offset shadow that sits behind a card, creating depth.
 * Rendered as an absolutely-positioned sibling — wrap both the card and this
 * component in a `relative` container.
 *
 * Uses the same clip-path as the parent card so the corner cuts align.
 *
 * Usage:
 *   <div className="relative">
 *     <Card cut="md" bordered>…</Card>
 *     <CardOffsetShadow />
 *   </div>
 */

type Cut = 'sm' | 'md';

interface CardOffsetShadowProps {
  /** Must match the cut size of the Card it shadows */
  cut?: Cut;
}

const cutClass: Record<Cut, string> = {
  sm: 'card-cut-sm',
  md: 'card-cut',
};

export function CardOffsetShadow({ cut = 'md' }: CardOffsetShadowProps) {
  const cc = cutClass[cut];
  return (
    <div
      className={[cc, 'bg-border-dim absolute -bottom-3 -right-3 w-full h-full pointer-events-none p-px -z-10'].join(' ')}
      aria-hidden="true"
    >
      <div className={[cc, 'w-full h-full bg-bg-base'].join(' ')} />
    </div>
  );
}
