import { Accordion as ArkAccordion } from '@ark-ui/react';
import type { ReactNode } from 'react';

export interface AccordionItem {
  value: string;
  question: ReactNode;
  answer: ReactNode;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className = '' }: AccordionProps) {
  return (
    <ArkAccordion.Root
      className={['border border-border-base divide-y divide-border-base', className]
        .filter(Boolean)
        .join(' ')}
    >
      {items.map((item) => (
        <ArkAccordion.Item key={item.value} value={item.value} className="group">
          <ArkAccordion.ItemTrigger
            className="
              flex items-center justify-between w-full
              px-6 py-5 cursor-pointer text-left
              hover:bg-bg-subtle
              transition-colors duration-150
              data-[state=open]:bg-bg-subtle
            "
          >
            <span className="font-body text-sm text-text-primary font-medium pr-8 leading-snug">
              {item.question}
            </span>
            {/* Plus / minus — square, not circle */}
            <div
              className="
                w-5 h-5 border border-border-base flex-shrink-0
                flex items-center justify-center
                group-data-[state=open]:border-accent
                transition-colors duration-150
              "
            >
              <span className="font-mono text-xs text-text-muted leading-none group-data-[state=open]:text-accent group-data-[state=open]:hidden">
                +
              </span>
              <span className="font-mono text-xs text-accent leading-none hidden group-data-[state=open]:inline">
                −
              </span>
            </div>
          </ArkAccordion.ItemTrigger>

          <ArkAccordion.ItemContent className="border-t border-border-dim">
            <div className="px-6 pb-6 pt-5">
              <p className="font-body text-sm text-text-muted leading-relaxed">
                {item.answer}
              </p>
            </div>
          </ArkAccordion.ItemContent>
        </ArkAccordion.Item>
      ))}
    </ArkAccordion.Root>
  );
}
