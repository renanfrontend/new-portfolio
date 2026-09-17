import type { PortfolioRepository } from '@/domain/repository';
import { staticPortfolioRepository } from './static-repository';

/**
 * Ponto único de composição. Trocar a fonte de conteúdo do site inteiro é
 * trocar a linha abaixo.
 */
export const portfolioRepository: PortfolioRepository = staticPortfolioRepository;
