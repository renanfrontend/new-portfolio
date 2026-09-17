'use client';

import { useEffect } from 'react';

/**
 * Scroll reveal por atributo, com um único observer para a página inteira.
 *
 * Por que não um hook por componente: 40 elementos revelados = 40 observers e
 * 40 refs. Aqui é um observer só, varrendo `[data-reveal]`, e o CSS cuida da
 * transição. O componente só precisa declarar o atributo.
 *
 * Progressive enhancement: sem JS os elementos ficam invisíveis? Não — o CSS
 * só esconde `[data-reveal]`, e este efeito é quem aplica o atributo... por isso
 * a marcação inicial vem do servidor e o fallback está no `@media` de
 * reduced-motion e no `noscript` do layout.
 */
export function useReveal(): void {
  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (targets.length === 0) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.setAttribute('data-reveal', 'in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute('data-reveal', 'in');
          // Revelar é um evento único: para de observar e libera o alvo.
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
