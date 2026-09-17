import type { Experience, Profile } from '@/domain/entities';
import { getAccent } from '@/lib/accent';
import { cn } from '@/lib/cn';
import { SectionHeading } from '@/components/ui/section-heading';

/**
 * Composição de pôr do sol usada como placeholder de retrato.
 *
 * TODO: substituir por uma foto sua (`next/image`, priority={false}, com
 * width/height explícitos para não causar layout shift). Um portfólio com rosto
 * converte melhor do que um com ilustração — isto aqui é o estado intermediário
 * honesto, não o destino.
 */
function SunsetPortrait() {
  return (
    <svg
      viewBox="0 0 320 400"
      role="img"
      aria-label="Ilustração abstrata de um pôr do sol sobre o horizonte"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id="portrait-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ffb020" />
          <stop offset="55%" stopColor="#ff6b3d" />
          <stop offset="100%" stopColor="#ff2e88" />
        </linearGradient>
        <linearGradient id="portrait-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#160a2c" />
          <stop offset="70%" stopColor="#3d1147" />
          <stop offset="100%" stopColor="#8d1a55" />
        </linearGradient>
        <clipPath id="portrait-sun-clip">
          <circle cx="160" cy="215" r="96" />
        </clipPath>
      </defs>

      <rect width="320" height="400" fill="url(#portrait-sky)" />

      {/* Sol com as faixas horizontais características do gênero. */}
      <g clipPath="url(#portrait-sun-clip)">
        <circle cx="160" cy="215" r="96" fill="url(#portrait-sun)" />
        {[168, 186, 202, 216, 228, 238, 246].map((y, index) => (
          <rect
            key={y}
            x="60"
            y={y}
            width="200"
            height={2 + index * 0.9}
            fill="#160a2c"
            opacity="0.85"
          />
        ))}
      </g>

      {/* Grade em perspectiva no chão. */}
      <g stroke="#2de2c5" strokeWidth="1" opacity="0.35">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <line key={`v-${i}`} x1={160} y1={300} x2={-120 + i * 80} y2={400} />
        ))}
        {[312, 328, 348, 372, 400].map((y) => (
          <line key={`h-${y}`} x1="0" y1={y} x2="320" y2={y} />
        ))}
      </g>

      <line x1="0" y1="300" x2="320" y2="300" stroke="#ff2e88" strokeWidth="2" opacity="0.8" />
    </svg>
  );
}

function Timeline({ experience }: { experience: readonly Experience[] }) {
  return (
    <ol className="border-ember-500/25 ml-2 space-y-5 border-l-2 pl-5">
      {experience.map((item) => {
        const tone = getAccent(item.accent);
        return (
          <li key={item.id} data-reveal className="relative">
            <span
              aria-hidden="true"
              className={cn('absolute top-1.5 -left-[26px] h-3 w-3 rounded-full', tone.dot)}
            />
            <p className={cn('font-mono text-xs font-bold tracking-wide', tone.text)}>
              {item.period}
            </p>
            <h4 className="mt-0.5 text-base font-bold text-ink">{item.role}</h4>
            <p className="font-mono text-xs text-haze">{item.organization}</p>
            <p className="mt-1.5 text-xs leading-relaxed text-mist">{item.description}</p>
          </li>
        );
      })}
    </ol>
  );
}

export function AboutSection({
  profile,
  experience,
}: {
  profile: Profile;
  experience: readonly Experience[];
}) {
  return (
    <section
      id="sobre"
      aria-labelledby="sobre-title"
      className="relative z-20 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28"
    >
      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <div data-reveal className="lg:col-span-5">
          <div className="chamfer-lg border-ember-500 bg-dusk-900/90 shadow-glow-ember border-2 p-3">
            <div className="chamfer-md relative aspect-4/5 overflow-hidden">
              <SunsetPortrait />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/75 to-transparent p-4 text-center">
                <p className="font-display text-2xl tracking-[0.15em] text-ink uppercase">
                  {profile.name}
                </p>
                <p className="text-aqua-500 font-mono text-[0.68rem] tracking-[0.18em] uppercase">
                  {profile.role}
                </p>
              </div>
            </div>

            <dl className="mt-4 grid grid-cols-2 gap-px border-t border-white/10 pt-3">
              <div className="px-2 py-1">
                <dt className="font-mono text-[0.62rem] tracking-[0.15em] text-haze uppercase">
                  Localização
                </dt>
                <dd className="mt-0.5 text-xs text-ink">{profile.location}</dd>
              </div>
              <div className="px-2 py-1">
                <dt className="font-mono text-[0.62rem] tracking-[0.15em] text-haze uppercase">
                  Experiência
                </dt>
                <dd className="mt-0.5 text-xs text-ink">{profile.yearsOfExperience}+ anos</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="space-y-7 lg:col-span-7">
          <SectionHeading
            id="sobre-title"
            eyebrow="Dossiê — sobre"
            title="Quem está"
            emphasis="do outro lado"
            accent="solar"
          />

          {profile.bio.map((paragraph, index) => (
            <p
              key={paragraph.slice(0, 32)}
              data-reveal
              style={{ '--reveal-delay': `${index * 80}ms` } as React.CSSProperties}
              className="text-sm leading-relaxed text-mist sm:text-base"
            >
              {paragraph}
            </p>
          ))}

          <div className="pt-4">
            <h3 className="font-display mb-4 flex items-center gap-2 text-2xl tracking-wide text-ink uppercase">
              <span aria-hidden="true" className="text-ember-500">
                #
              </span>
              Trajetória
            </h3>
            <Timeline experience={experience} />
          </div>
        </div>
      </div>
    </section>
  );
}
