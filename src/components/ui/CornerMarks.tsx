/**
 * Four decorative corner bracket marks, absolutely positioned inside a
 * `position: relative; overflow: hidden` container (section or card).
 *
 * Matches the HUD / mission control aesthetic — not functional, purely visual.
 * Requires the parent to have `relative` positioning.
 *
 * Usage:
 *   <section className="relative overflow-hidden …">
 *     <CornerMarks />
 *     …content…
 *   </section>
 *
 * Variants:
 *   size="sm"  → w-4 h-4  (tight, for cards)
 *   size="md"  → w-6 h-6  (default, for sections)
 *   opacity="dim"   → opacity-30
 *   opacity="base"  → opacity-40 (default)
 */

type Size    = 'sm' | 'md';
type Opacity = 'dim' | 'base';

interface CornerMarksProps {
  size?:    Size;
  opacity?: Opacity;
  className?: string;
}

const sizeClass:    Record<Size,    string> = { sm: 'w-4 h-4', md: 'w-6 h-6' };
const opacityClass: Record<Opacity, string> = { dim: 'opacity-30', base: 'opacity-40' };

export function CornerMarks({ size = 'md', opacity = 'base', className = '' }: CornerMarksProps) {
  const sc = sizeClass[size];
  const oc = opacityClass[opacity];
  const base = ['absolute pointer-events-none border-border-focus', sc, oc, className]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <div className={`${base} top-8 left-8 border-l border-t`}   aria-hidden="true" />
      <div className={`${base} top-8 right-8 border-r border-t`}  aria-hidden="true" />
      <div className={`${base} bottom-8 left-8 border-l border-b`} aria-hidden="true" />
      <div className={`${base} bottom-8 right-8 border-r border-b`} aria-hidden="true" />
    </>
  );
}
