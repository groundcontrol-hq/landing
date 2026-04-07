interface SectionMarkerProps {
  label: string;
  className?: string;
}

export function SectionMarker({ label, className = '' }: SectionMarkerProps) {
  return (
    <div className={['flex items-center gap-3 mb-10', className].filter(Boolean).join(' ')}>
      <div className="w-8 h-px bg-accent" />
      <span className="font-mono text-xs text-accent uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}
