import type { Metric } from '@/domain/entities';
import { cn } from '@/lib/cn';

/**
 * Grade de métricas com estado de pendência explícito.
 *
 * Um item `placeholder` é renderizado com borda tracejada e rótulo "a definir":
 * fica óbvio no preview que o número não existe ainda, então é impossível
 * publicar sem perceber — e, se escapar, o visitante lê "a definir" em vez de
 * um número inventado. Prometer um número que não se sustenta em entrevista
 * custa mais caro do que não ter número nenhum.
 */
export function MetricList({ metrics, className }: { metrics: readonly Metric[]; className?: string }) {
  if (metrics.length === 0) return null;

  return (
    <dl className={cn('chamfer-sm grid grid-cols-3 gap-2 border border-white/5 bg-black/40 p-3', className)}>
      {metrics.map((metric) => {
        const isPending = metric.status === 'placeholder';
        return (
          <div
            key={metric.label}
            className={cn(
              'px-1 py-1.5 text-center',
              isPending && 'border border-dashed border-solar-500/50 bg-solar-500/5',
            )}
          >
            <dd
              className={cn(
                'font-display text-xl leading-none tracking-wide',
                isPending ? 'text-solar-500/80' : 'text-ink',
              )}
            >
              {metric.value}
              {isPending ? <span className="sr-only"> (pendente de preenchimento)</span> : null}
            </dd>
            <dt className="mt-1.5 font-mono text-[0.68rem] leading-tight tracking-wide text-haze uppercase">
              {metric.label}
            </dt>
            {metric.source ? (
              <p className="mt-1 font-mono text-[0.62rem] text-haze/80">{metric.source}</p>
            ) : null}
          </div>
        );
      })}
    </dl>
  );
}

export function TagList({ items, className }: { items: readonly string[]; className?: string }) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {items.map((item) => (
        <li
          key={item}
          className="rounded border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-xs text-mist"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
