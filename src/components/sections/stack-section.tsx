'use client';

import type { SkillGroup, SkillGroupId } from '@/domain/entities';
import { getAccent } from '@/lib/accent';
import { cn } from '@/lib/cn';
import { SectionHeading } from '@/components/ui/section-heading';
import { Tabs, type TabItem } from '@/components/ui/tabs';

function SkillGrid({ group }: { group: SkillGroup }) {
  const tone = getAccent(group.accent);

  return (
    <ul className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
      {group.skills.map((skill) => (
        <li
          key={skill.name}
          data-reveal
          className={cn(
            'chamfer-md bg-dusk-900/70 flex flex-col border border-white/10 p-5 backdrop-blur-sm transition-colors duration-300',
            tone.borderHover,
          )}
        >
          <div className="mb-3 flex items-baseline justify-between gap-3">
            <h3 className="font-display text-xl tracking-wide text-ink">{skill.name}</h3>
            <span className={cn('shrink-0 font-mono text-[0.68rem] font-bold', tone.text)}>
              {skill.yearsOfUse}
              {' '}anos
            </span>
          </div>
          <p className="text-xs leading-relaxed text-mist">{skill.description}</p>
        </li>
      ))}
    </ul>
  );
}

export function StackSection({ skillGroups }: { skillGroups: readonly SkillGroup[] }) {
  const items: readonly TabItem<SkillGroupId>[] = skillGroups.map((group) => ({
    id: group.id,
    label: group.label,
    caption: group.caption,
    panel: <SkillGrid group={group} />,
  }));

  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="relative z-20 mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28"
    >
      <SectionHeading
        id="stack-title"
        eyebrow="Arsenal — stack"
        title="Ferramentas de"
        emphasis="trabalho"
        description="Sem barra de proficiência: um número como “TypeScript 96%” não é verificável nem comparável. No lugar, tempo real de uso e o que eu de fato resolvo com cada ferramenta."
        accent="aqua"
        align="center"
        className="mb-12"
      />

      <Tabs items={items} label="Categorias da stack" />
    </section>
  );
}
