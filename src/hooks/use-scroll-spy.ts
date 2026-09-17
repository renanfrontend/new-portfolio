'use client';

import { useEffect, useState } from 'react';

/**
 * Marca no menu a seção visível.
 *
 * IntersectionObserver com `rootMargin` recortando a faixa superior (header fixo)
 * e a inferior, de modo que "ativo" signifique "ocupando o miolo da viewport" —
 * e não "encostou na borda". Sem listener de scroll, sem throttle manual.
 */
export function useScrollSpy(ids: readonly string[], fallback: string): string {
  const [activeId, setActiveId] = useState(fallback);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        // Mantém a ordem do documento: a primeira seção visível é a ativa.
        const next = ids.find((id) => visible.has(id));
        if (next) setActiveId(next);
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [ids]);

  return activeId;
}
