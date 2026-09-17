import type { Accent } from '@/domain/entities';
import { getAccent } from '@/lib/accent';
import { cn } from '@/lib/cn';

type SectionHeadingProps = {
  /** Rótulo pequeno acima do título (kicker). */
  eyebrow: string;
  title: string;
  /** Parte do título que recebe o gradiente. */
  emphasis?: string;
  description?: string;
  accent?: Accent;
  align?: 'start' | 'center';
  /** Nível semântico real. O tamanho visual é independente da hierarquia. */
  as?: 'h2' | 'h3';
  id?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  emphasis,
  description,
  accent = 'ember',
  align = 'start',
  as: Tag = 'h2',
  id,
  className,
}: SectionHeadingProps) {
  const tone = getAccent(accent);

  return (
    <div
      data-reveal
      className={cn(
        'flex flex-col gap-3',
        align === 'center' && 'mx-auto max-w-3xl items-center text-center',
        className,
      )}
    >
      <p
        className={cn(
          'flex items-center gap-2 font-mono text-xs tracking-[0.25em] uppercase',
          tone.text,
        )}
      >
        <span aria-hidden="true" className={cn('h-2 w-2', tone.dot)} />
        {eyebrow}
      </p>

      <Tag
        id={id}
        className="font-display text-ink text-5xl leading-[0.95] tracking-wide uppercase sm:text-6xl lg:text-7xl"
      >
        {title}
        {emphasis ? <span className="text-gradient-sunset"> {emphasis}</span> : null}
      </Tag>

      {description ? (
        <p className={cn('max-w-2xl text-sm leading-relaxed text-mist sm:text-base')}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
