'use client';

import { useReveal } from '@/hooks/use-reveal';

/**
 * Liga o observer de scroll reveal para a página inteira.
 * Não renderiza nada — existe apenas para que o efeito rode no cliente sem
 * transformar a página inteira em Client Component.
 */
export function RevealProvider() {
  useReveal();
  return null;
}
