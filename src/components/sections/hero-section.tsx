import type { Profile } from '@/domain/entities';
import { buttonStyles } from '@/components/ui/button';
import { cn } from '@/lib/cn';

/**
 * Hero.
 *
 * Mudanças de conteúdo em relação à versão anterior, todas deliberadas:
 *  - A grade de estatísticas ("1.5M req/s", "+45 missões") saiu. Número que não
 *    se sustenta em entrevista é passivo. No lugar entra a proposta de valor e
 *    dois caminhos de ação.
 *  - O selo de classificação saiu — imitava um selo de avaliação de terceiro.
 *  - `<h1>` único na página, com o nome e o cargo real.
 */
export function HeroSection({ profile }: { profile: Profile }) {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-4 pt-28 pb-20 sm:px-6 lg:px-8"
    >
      {/* Marca d'água tipográfica — decorativa, fora da árvore de acessibilidade. */}
      <span
        aria-hidden="true"
        className="font-display text-ember-500/12 pointer-events-none absolute inset-0 flex items-center justify-center text-[28rem] leading-none tracking-tighter select-none sm:text-[38rem]"
      >
        RA
      </span>

      <div className="relative z-10 flex max-w-4xl flex-col items-center text-center">
        <p
          data-reveal
          className="border-aqua-500/35 bg-aqua-500/10 text-aqua-500 chamfer-sm mb-7 inline-flex items-center gap-2 border px-4 py-1.5 font-mono text-xs tracking-[0.2em] uppercase"
        >
          <span aria-hidden="true" className="bg-aqua-500 animate-breathe h-2 w-2 rounded-full" />
          {profile.availability}
        </p>

        <h1
          id="hero-title"
          data-reveal
          style={{ '--reveal-delay': '80ms' } as React.CSSProperties}
          className="font-display text-6xl leading-[0.86] tracking-wide uppercase sm:text-8xl lg:text-[8.5rem]"
        >
          <span className="block text-ink drop-shadow-[0_12px_28px_rgba(0,0,0,0.7)]">Renan</span>
          <span className="text-gradient-sunset block">Augusto</span>
        </h1>

        <p
          data-reveal
          style={{ '--reveal-delay': '160ms' } as React.CSSProperties}
          className="mt-5 max-w-2xl text-sm font-semibold tracking-[0.22em] text-ink uppercase sm:text-base"
        >
          {profile.role}
        </p>

        <p
          data-reveal
          style={{ '--reveal-delay': '220ms' } as React.CSSProperties}
          className="mt-6 max-w-2xl text-sm leading-relaxed text-mist sm:text-base"
        >
          {profile.headline}
        </p>

        <div
          data-reveal
          style={{ '--reveal-delay': '300ms' } as React.CSSProperties}
          className="mt-10 flex w-full max-w-md flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a href="#projetos" className={cn(buttonStyles({ size: 'lg' }), 'w-full sm:w-auto')}>
            Ver projetos
          </a>
          <a
            href="#contato"
            className={cn(buttonStyles({ variant: 'outline', size: 'lg' }), 'w-full sm:w-auto')}
          >
            Fale comigo
          </a>
        </div>

        <dl
          data-reveal
          style={{ '--reveal-delay': '380ms' } as React.CSSProperties}
          className="mt-14 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4"
        >
          {profile.facts.map((fact) => (
            <div
              key={fact.label}
              className="chamfer-sm border-ember-500/20 bg-dusk-900/60 border p-3.5 text-center backdrop-blur-sm"
            >
              <dt className="font-mono text-[0.62rem] tracking-[0.18em] text-haze uppercase">
                {fact.label}
              </dt>
              <dd className="mt-1.5 text-xs font-semibold text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
