/**
 * Camadas decorativas puramente estéticas: grain, vinheta e silhuetas de palmeira.
 *
 * Server Component — não há estado nem evento aqui, então nada disso precisa
 * chegar ao bundle do cliente. Tudo `pointer-events-none` e `aria-hidden`.
 */
const PALM_PATH =
  'M148 400c2-96 10-158 30-204 12-28 30-52 54-72-30 2-56 12-78 30 10-30 30-54 60-70-28-2-54 6-78 22 14-28 36-48 66-60-30-6-58 0-84 18 12-26 32-46 60-58-34-4-64 8-88 34 4-24 16-44 36-60-38 10-66 34-84 72-16 34-22 76-20 126 2 78 12 152 30 222h96Z';

export function AmbientOverlay() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-[5] select-none">
      {/* Vinheta: escurece topo e base para o texto sempre ter contraste. */}
      <div className="from-dusk-950/70 to-dusk-950 absolute inset-0 bg-gradient-to-b via-transparent" />

      {/* Grain procedural — data URI, zero requisição. */}
      <div className="grain absolute inset-0 opacity-60" />

      <svg
        viewBox="0 0 300 400"
        className="absolute -bottom-10 -left-12 h-auto w-56 fill-[#040109] opacity-30 sm:w-80"
      >
        <path d={PALM_PATH} />
      </svg>
      <svg
        viewBox="0 0 300 400"
        className="absolute -right-14 -bottom-14 h-auto w-64 -scale-x-100 fill-[#040109] opacity-30 sm:w-96"
      >
        <path d={PALM_PATH} />
      </svg>
    </div>
  );
}
