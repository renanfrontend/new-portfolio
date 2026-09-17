import type { Portfolio, Project } from './entities';

/**
 * Contrato de acesso a conteúdo.
 *
 * A UI consome esta interface, nunca o módulo de dados diretamente. Hoje existe
 * uma implementação estática (`src/content/static-repository.ts`). Trocar por
 * Contentful/Sanity/MDX é escrever uma segunda implementação e mudar um import
 * em `src/content/index.ts` — zero alteração em componentes.
 *
 * Assinaturas assíncronas de propósito: quando a fonte virar rede, nada muda.
 */
export interface PortfolioRepository {
  getPortfolio(): Promise<Portfolio>;
  getProjectById(id: string): Promise<Project | null>;
}
