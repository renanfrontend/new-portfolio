import type { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/cn';

export type ButtonVariant = 'primary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const base =
  'relative inline-flex items-center justify-center gap-2 font-display uppercase tracking-[0.08em] ' +
  'chamfer-sm transition-[transform,filter,background-color,color,border-color] duration-200 ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50';

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-linear-100 from-ember-500 via-coral-500 to-solar-500 text-dusk-950 shadow-glow-ember hover:brightness-110',
  outline:
    'border border-aqua-500/60 bg-dusk-900/70 text-aqua-500 hover:bg-aqua-500 hover:text-dusk-950',
  ghost: 'border border-white/15 bg-white/5 text-ink hover:border-ember-500 hover:text-ember-400',
};

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-base',
  md: 'px-6 py-3 text-lg',
  lg: 'px-8 py-4 text-xl',
};

/**
 * Fábrica de classes exposta separadamente para que âncoras (`<Link>`) usem
 * exatamente o mesmo visual sem virar `<button>` — um link que navega deve ser
 * um link, inclusive para o leitor de tela e para o "abrir em nova aba".
 */
export const buttonStyles = ({
  variant = 'primary',
  size = 'md',
  className,
}: {
  variant?: ButtonVariant | undefined;
  size?: ButtonSize | undefined;
  className?: string | undefined;
} = {}): string => cn(base, variants[variant], sizes[size], className);

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}
