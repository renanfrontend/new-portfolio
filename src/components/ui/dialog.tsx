'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/lib/cn';

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  /** Id do elemento que descreve o dialog, se houver. */
  describedById?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Wrapper sobre o `<dialog>` nativo.
 *
 * A versão anterior era uma `<div>` com `hidden`/`flex` alternados: sem trap de
 * foco, sem `aria-modal`, sem devolver o foco ao gatilho, e o conteúdo atrás
 * continuava navegável por Tab e visível para o leitor de tela.
 *
 * `showModal()` entrega tudo isso pronto pelo navegador — trap de foco, camada
 * superior, backdrop, inertização do resto da página e fechamento por Esc. É
 * menos código do que qualquer implementação manual e mais correto que a maioria
 * delas.
 */
export function Dialog({
  open,
  onClose,
  title,
  describedById,
  children,
  className,
}: DialogProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      previouslyFocused.current = document.activeElement as HTMLElement | null;
      dialog.showModal();
      // Trava o scroll do fundo — `<dialog>` não faz isso sozinho.
      document.body.style.overflow = 'hidden';
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;

    // `close` cobre Esc, `dialog.close()` e o botão de fechar: um caminho só.
    const handleClose = (): void => {
      document.body.style.overflow = '';
      previouslyFocused.current?.focus();
      onClose();
    };

    dialog.addEventListener('close', handleClose);
    return () => {
      dialog.removeEventListener('close', handleClose);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  /** Clique no backdrop: o alvo é o próprio <dialog> apenas fora do painel. */
  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>): void => {
    if (event.target === ref.current) ref.current?.close();
  };

  return (
    <dialog
      ref={ref}
      aria-labelledby="dialog-title"
      {...(describedById ? { 'aria-describedby': describedById } : {})}
      onClick={handleBackdropClick}
      className={cn(
        // `m-auto` é obrigatório: o preflight do Tailwind aplica `margin: 0` a
        // tudo e derruba o `margin: auto` que o user-agent usa para centralizar
        // o <dialog> em modo modal.
        'm-auto max-h-[88vh] w-[min(56rem,92vw)] overflow-visible bg-transparent p-0 text-ink',
        'backdrop:cursor-pointer',
      )}
    >
      <div
        className={cn(
          'chamfer-lg border-ember-500/60 bg-dusk-900/95 relative max-h-[88vh] overflow-y-auto border-2 p-6 sm:p-8',
          className,
        )}
      >
        <div className="mb-6 flex items-start justify-between gap-6">
          <h2 id="dialog-title" className="font-display text-ink text-3xl sm:text-4xl">
            {title}
          </h2>
          <button
            type="button"
            onClick={() => ref.current?.close()}
            className="chamfer-sm hover:border-ember-500 hover:text-ember-400 flex min-h-11 shrink-0 items-center border border-white/20 bg-black/50 px-3.5 font-mono text-xs text-mist transition-colors"
          >
            <span aria-hidden="true">Esc ✕</span>
            <span className="sr-only">Fechar</span>
          </button>
        </div>
        {children}
      </div>
    </dialog>
  );
}
