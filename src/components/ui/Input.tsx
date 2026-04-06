import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export function Input({ className = '', ...props }: InputProps) {
  return (
    <input
      className={[
        'bg-bg-raised px-5 py-4',
        'font-mono text-sm text-text-primary',
        'placeholder:text-text-dim',
        'border-none outline-none',
        'focus:bg-bg-overlay',
        'transition-colors duration-150',
        'rounded-none',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      autoComplete="off"
      spellCheck={false}
      {...props}
    />
  );
}
