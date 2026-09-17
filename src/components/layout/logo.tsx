import { cn } from '@/lib/cn';

/**
 * Marca própria: monograma "RA" em bloco chanfrado com o gradiente da paleta.
 * Desenhado do zero — nenhuma referência a logotipo de terceiro.
 */
export function Logo({ className, size = 'md' }: { className?: string; size?: 'md' | 'lg' }) {
  return (
    <span className={cn('flex items-center gap-3', className)}>
      <span
        aria-hidden="true"
        className={cn(
          'chamfer-sm from-ember-500 via-coral-500 to-solar-500 text-dusk-950 font-display flex shrink-0 items-center justify-center bg-linear-to-tr leading-none',
          size === 'lg' ? 'h-12 w-12 text-2xl' : 'h-9 w-9 text-lg sm:h-10 sm:w-10 sm:text-xl',
        )}
      >
        RA
      </span>
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={cn(
            'font-display truncate text-ink tracking-[0.1em] uppercase',
            size === 'lg' ? 'text-3xl' : 'text-lg sm:text-xl lg:text-2xl',
          )}
        >
          Renan Augusto
        </span>
        <span className="mt-0.5 truncate font-mono text-[0.58rem] tracking-[0.22em] text-haze uppercase sm:text-[0.62rem] sm:tracking-[0.3em]">
          Frontend Engineer
        </span>
      </span>
    </span>
  );
}
