'use client';

import { useCallback, useId, useRef, useState, type KeyboardEvent, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

export type TabItem<TId extends string> = {
  id: TId;
  label: string;
  caption?: string;
  panel: ReactNode;
};

type TabsProps<TId extends string> = {
  items: readonly TabItem<TId>[];
  label: string;
  className?: string;
};

/**
 * Tabs seguindo o padrão WAI-ARIA Authoring Practices.
 *
 * A versão anterior alternava `hidden` em `<div>`s e dependia da ordem do CSS
 * para decidir quem ganhava entre `hidden` e `grid` — funcionava por acidente.
 * Aqui só o painel ativo existe na árvore, e a navegação por teclado
 * (setas, Home, End) segue a especificação com roving tabindex.
 *
 * Genérico em `TId` para que o chamador receba autocompletar do próprio
 * conjunto de ids e erro de compilação ao renomear um deles.
 */
export function Tabs<TId extends string>({ items, label, className }: TabsProps<TId>) {
  const baseId = useId();
  const firstId = items[0]?.id;
  const [activeId, setActiveId] = useState<TId | undefined>(firstId);
  const tabRefs = useRef(new Map<TId, HTMLButtonElement>());

  const focusTab = useCallback((id: TId) => {
    setActiveId(id);
    tabRefs.current.get(id)?.focus();
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
      const lastIndex = items.length - 1;
      let nextIndex: number | null = null;

      switch (event.key) {
        case 'ArrowRight':
          nextIndex = index === lastIndex ? 0 : index + 1;
          break;
        case 'ArrowLeft':
          nextIndex = index === 0 ? lastIndex : index - 1;
          break;
        case 'Home':
          nextIndex = 0;
          break;
        case 'End':
          nextIndex = lastIndex;
          break;
        default:
          return;
      }

      event.preventDefault();
      const next = items[nextIndex]?.id;
      if (next) focusTab(next);
    },
    [items, focusTab],
  );

  const active = items.find((item) => item.id === activeId) ?? items[0];
  if (!active) return null;

  return (
    <div className={className}>
      <div
        role="tablist"
        aria-label={label}
        aria-orientation="horizontal"
        className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3"
      >
        {items.map((item, index) => {
          const isActive = item.id === active.id;
          return (
            <button
              key={item.id}
              ref={(node) => {
                if (node) tabRefs.current.set(item.id, node);
                else tabRefs.current.delete(item.id);
              }}
              type="button"
              role="tab"
              id={`${baseId}-tab-${item.id}`}
              aria-selected={isActive}
              aria-controls={`${baseId}-panel-${item.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveId(item.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                'chamfer-sm font-display px-5 py-2.5 text-lg tracking-[0.06em] uppercase transition-colors duration-200',
                isActive
                  ? 'bg-ember-500 text-dusk-950 shadow-glow-ember'
                  : 'border border-white/15 bg-dusk-800/70 text-mist hover:border-solar-500/70 hover:text-solar-500',
              )}
            >
              {item.label}
              {item.caption ? (
                <span className="ml-2 font-sans text-[0.7rem] font-semibold tracking-normal normal-case opacity-70">
                  {item.caption}
                </span>
              ) : null}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel-${active.id}`}
        aria-labelledby={`${baseId}-tab-${active.id}`}
        tabIndex={0}
        className="focus-visible:outline-solar-500"
      >
        {active.panel}
      </div>
    </div>
  );
}
