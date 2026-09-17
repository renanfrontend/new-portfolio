'use client';

import { useCallback, useState } from 'react';
import type { Project } from '@/domain/entities';
import { getAccent } from '@/lib/accent';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { Dialog } from '@/components/ui/dialog';
import { ArrowUpRightIcon } from '@/components/ui/icons';
import { MetricList, TagList } from '@/components/ui/metric-list';
import { SectionHeading } from '@/components/ui/section-heading';

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (id: string) => void }) {
  const tone = getAccent(project.accent);

  return (
    <article
      data-reveal
      className={cn(
        'group chamfer-md bg-dusk-900/80 relative flex flex-col border p-6 backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-300 sm:p-8',
        tone.border,
        tone.borderHover,
        tone.glow,
      )}
    >
      <header className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <span
          className={cn(
            'chamfer-sm border px-2.5 py-1 font-mono text-[0.68rem] font-bold tracking-[0.18em] uppercase',
            tone.border,
            tone.bgSoft,
            tone.text,
          )}
        >
          {project.codename}
        </span>
        <span className="font-mono text-xs text-haze">{project.period}</span>
      </header>

      <h3 className="font-display text-3xl tracking-wide text-ink sm:text-4xl">{project.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-mist">{project.tagline}</p>

      <p className="mt-4 font-mono text-[0.7rem] leading-relaxed tracking-wide text-haze uppercase">
        Atuação: <span className="text-mist normal-case">{project.role}</span>
      </p>

      <MetricList metrics={project.metrics} className="my-6" />

      <TagList items={project.stack} className="mb-6" />

      <div className="mt-auto flex items-center gap-3 pt-2">
        <Button
          variant="primary"
          size="sm"
          className="flex-1"
          onClick={() => onOpen(project.id)}
          aria-haspopup="dialog"
        >
          Ver detalhes
          <span className="sr-only"> do projeto {project.title}</span>
        </Button>

        {project.links.map((link) => (
          <a
            key={`${link.kind}-${link.href}`}
            href={link.href}
            {...(link.href.startsWith('http')
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {})}
            className="chamfer-sm hover:border-solar-500 hover:text-solar-500 flex min-h-11 items-center gap-1.5 border border-white/15 bg-white/5 px-3.5 font-mono text-xs text-mist transition-colors"
          >
            {link.label}
            <ArrowUpRightIcon className="h-3.5 w-3.5" />
            {link.href.startsWith('http') ? (
              <span className="sr-only">(abre em nova aba)</span>
            ) : null}
          </a>
        ))}
      </div>
    </article>
  );
}

export function ProjectsSection({ projects }: { projects: readonly Project[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const active = projects.find((project) => project.id === openId) ?? null;

  const close = useCallback(() => setOpenId(null), []);

  return (
    <section
      id="projetos"
      aria-labelledby="projetos-title"
      className="relative z-20 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28"
    >
      <SectionHeading
        id="projetos-title"
        eyebrow="Missões — projetos"
        title="Trabalho"
        emphasis="selecionado"
        description="Projetos onde a decisão técnica tinha consequência mensurável. Cada card abre um detalhamento com as escolhas de arquitetura e o que elas resolveram."
        accent="ember"
        className="mb-14 border-b border-white/10 pb-8"
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={setOpenId} />
        ))}
      </div>

      <Dialog
        open={active !== null}
        onClose={close}
        title={active?.title ?? ''}
        describedById="project-dialog-summary"
      >
        {active ? (
          <div className="space-y-6">
            <p className="font-mono text-xs tracking-[0.18em] text-haze uppercase">
              {active.codename} · {active.period}
            </p>

            <p id="project-dialog-summary" className="text-sm leading-relaxed text-mist sm:text-base">
              {active.summary}
            </p>

            <div className="chamfer-sm border-l-2 border-aqua-500 bg-white/5 p-4">
              <p className="font-mono text-[0.68rem] tracking-[0.18em] text-haze uppercase">
                Minha atuação
              </p>
              <p className="mt-1.5 text-sm text-ink">{active.role}</p>
            </div>

            <div>
              <h3 className="font-display text-aqua-500 mb-3 text-xl tracking-wide uppercase">
                Decisões técnicas
              </h3>
              <ul className="space-y-2.5">
                {active.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-mist">
                    <span aria-hidden="true" className="text-solar-500 mt-0.5 shrink-0">
                      ▸
                    </span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            <MetricList metrics={active.metrics} />

            <div className="border-t border-white/10 pt-4">
              <h3 className="sr-only">Tecnologias utilizadas</h3>
              <TagList items={active.stack} />
            </div>
          </div>
        ) : null}
      </Dialog>
    </section>
  );
}
