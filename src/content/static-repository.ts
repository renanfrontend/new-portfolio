import type { Portfolio, Project } from '@/domain/entities';
import type { PortfolioRepository } from '@/domain/repository';
import { navigation, profile } from './profile';
import { projects } from './projects';
import { experience, skillGroups } from './skills';

/**
 * Implementação estática do contrato de conteúdo.
 *
 * Os dados são resolvidos em build time — o site inteiro sai como HTML estático.
 * Para migrar para um CMS, escreva outra classe que satisfaça `PortfolioRepository`
 * e troque a instância exportada em `./index.ts`. Nenhum componente muda.
 */
class StaticPortfolioRepository implements PortfolioRepository {
  readonly #portfolio: Portfolio = {
    profile,
    navigation,
    projects,
    skillGroups,
    experience,
  };

  async getPortfolio(): Promise<Portfolio> {
    return this.#portfolio;
  }

  async getProjectById(id: string): Promise<Project | null> {
    return this.#portfolio.projects.find((project) => project.id === id) ?? null;
  }
}

export const staticPortfolioRepository: PortfolioRepository = new StaticPortfolioRepository();
