import type { Accent } from '@/domain/entities';

/**
 * Mapa acento → classes utilitárias.
 *
 * Objeto literal completo em vez de template string (`border-${accent}-500`):
 * o Tailwind faz varredura estática do código-fonte e nunca geraria a classe
 * montada em runtime. Este arquivo é o único lugar que conhece a correspondência.
 */
type AccentClasses = Readonly<{
  text: string;
  border: string;
  borderHover: string;
  bgSoft: string;
  glow: string;
  gradient: string;
  dot: string;
}>;

export const accentClasses: Readonly<Record<Accent, AccentClasses>> = {
  ember: {
    text: 'text-ember-500',
    border: 'border-ember-500/40',
    borderHover: 'group-hover:border-ember-500 hover:border-ember-500',
    bgSoft: 'bg-ember-500/10',
    glow: 'group-hover:shadow-glow-ember',
    gradient: 'from-ember-500 to-coral-500',
    dot: 'bg-ember-500',
  },
  solar: {
    text: 'text-solar-500',
    border: 'border-solar-500/40',
    borderHover: 'group-hover:border-solar-500 hover:border-solar-500',
    bgSoft: 'bg-solar-500/10',
    glow: 'group-hover:shadow-glow-solar',
    gradient: 'from-solar-500 to-coral-500',
    dot: 'bg-solar-500',
  },
  aqua: {
    text: 'text-aqua-500',
    border: 'border-aqua-500/40',
    borderHover: 'group-hover:border-aqua-500 hover:border-aqua-500',
    bgSoft: 'bg-aqua-500/10',
    glow: 'group-hover:shadow-glow-aqua',
    gradient: 'from-aqua-500 to-ember-500',
    dot: 'bg-aqua-500',
  },
  coral: {
    text: 'text-coral-500',
    border: 'border-coral-500/40',
    borderHover: 'group-hover:border-coral-500 hover:border-coral-500',
    bgSoft: 'bg-coral-500/10',
    glow: 'group-hover:shadow-glow-ember',
    gradient: 'from-coral-500 to-solar-500',
    dot: 'bg-coral-500',
  },
};

export const getAccent = (accent: Accent): AccentClasses => accentClasses[accent];
