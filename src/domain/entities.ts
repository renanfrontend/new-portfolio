/**
 * Camada de domínio — entidades puras.
 *
 * Nenhum import de React, Next ou Tailwind chega aqui. É o núcleo estável:
 * a UI depende deste arquivo, este arquivo não depende de ninguém. Trocar
 * conteúdo estático por um CMS significa reimplementar `PortfolioRepository`
 * (ver ./repository.ts) sem tocar em um único componente.
 */

/** Discriminante de acento visual. A UI mapeia isso para classes; o domínio não conhece CSS. */
export type Accent = 'ember' | 'solar' | 'aqua' | 'coral';

/**
 * Uma métrica exibida em card.
 *
 * `status` existe por uma razão específica: números de impacto sem origem
 * verificável são passivo, não ativo. Um item `'placeholder'` é renderizado
 * com marcação visível de pendência — impossível publicar por engano.
 */
export type Metric = Readonly<{
  label: string;
  value: string;
  status: 'verified' | 'placeholder';
  /** Como esse número foi apurado. Obrigatório quando `status === 'verified'`. */
  source?: string;
}>;

export type ProjectLink = Readonly<{
  kind: 'repository' | 'live' | 'case-study' | 'package';
  href: string;
  label: string;
}>;

export type Project = Readonly<{
  id: string;
  /** Rótulo lúdico exibido no card (ex.: "MISSÃO 01"). */
  codename: string;
  title: string;
  /** Uma linha. Aparece no card. */
  tagline: string;
  /** Parágrafo completo. Aparece no dialog de detalhe. */
  summary: string;
  /** Sua responsabilidade real no projeto — o que um entrevistador vai perguntar. */
  role: string;
  period: string;
  accent: Accent;
  stack: readonly string[];
  metrics: readonly Metric[];
  /** Decisões técnicas concretas, não adjetivos. */
  highlights: readonly string[];
  links: readonly ProjectLink[];
}>;

export type SkillGroupId = 'core' | 'ui' | 'quality' | 'workflow';

export type Skill = Readonly<{
  name: string;
  /** O que você faz com isso, em nível de detalhe que sustenta conversa técnica. */
  description: string;
  /** Anos de uso prático. Substitui a barra de "92% de proficiência", que não mede nada. */
  yearsOfUse: number;
}>;

export type SkillGroup = Readonly<{
  id: SkillGroupId;
  label: string;
  caption: string;
  accent: Accent;
  skills: readonly Skill[];
}>;

export type Experience = Readonly<{
  id: string;
  period: string;
  role: string;
  /** Nome fictício ou genérico. Nunca o empregador real sem autorização escrita. */
  organization: string;
  description: string;
  accent: Accent;
}>;

export type ContactChannel = Readonly<{
  id: string;
  label: string;
  value: string;
  href: string;
  icon: 'github' | 'linkedin' | 'mail' | 'whatsapp';
}>;

export type Profile = Readonly<{
  name: string;
  role: string;
  location: string;
  availability: string;
  headline: string;
  bio: readonly string[];
  yearsOfExperience: number;
  facts: readonly { label: string; value: string }[];
  channels: readonly ContactChannel[];
}>;

export type NavItem = Readonly<{
  /** Rótulo lúdico. */
  label: string;
  /** Tradução literal — para que ninguém precise adivinhar onde estão os projetos. */
  caption: string;
  href: `#${string}`;
}>;

export type Portfolio = Readonly<{
  profile: Profile;
  navigation: readonly NavItem[];
  projects: readonly Project[];
  skillGroups: readonly SkillGroup[];
  experience: readonly Experience[];
}>;

/** Type guard usado pela UI para destacar pendências de conteúdo. */
export const isPlaceholder = (metric: Metric): boolean => metric.status === 'placeholder';
