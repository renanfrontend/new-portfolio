'use client';

import { useSyncExternalStore } from 'react';

/**
 * `useSyncExternalStore` em vez de `useState` + `useEffect`: o React lê o valor
 * no momento certo do commit, sem flash de estado errado e sem warning de
 * hidratação. `getServerSnapshot` devolve `false` porque no servidor não existe
 * viewport — o efeito padrão é sempre o mais conservador.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = (onChange: () => void): (() => void) => {
    if (typeof window === 'undefined') return () => {};
    const list = window.matchMedia(query);
    list.addEventListener('change', onChange);
    return () => list.removeEventListener('change', onChange);
  };

  const getSnapshot = (): boolean =>
    typeof window === 'undefined' ? false : window.matchMedia(query).matches;

  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

/**
 * Fonte única de verdade para motion no lado do JS.
 * O CSS já cobre transições declarativas; isto existe para o que é imperativo
 * (canvas, Web Audio, timers).
 */
export const usePrefersReducedMotion = (): boolean =>
  useMediaQuery('(prefers-reduced-motion: reduce)');
