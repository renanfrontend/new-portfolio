import type { Experience, SkillGroup } from '@/domain/entities';

/**
 * Nota de design: a versão anterior deste portfólio usava barras de progresso
 * ("TypeScript — 96%"). Um número desses não é verificável nem comparável, e
 * qualquer valor abaixo de 100% é um argumento contra você. Trocado por anos de
 * uso prático + uma frase que sustenta conversa técnica sobre o item.
 */

export const skillGroups: readonly SkillGroup[] = [
  {
    id: 'core',
    label: '01. Core',
    caption: 'Linguagem e frameworks',
    accent: 'ember',
    skills: [
      {
        name: 'TypeScript',
        description:
          'Tipagem estrita como ferramenta de design, não como imposto. Generics, tipos condicionais e inferência para que o compilador descreva a regra e o erro apareça no editor, não em produção.',
        yearsOfUse: 6,
      },
      {
        name: 'React',
        description:
          'Composição sobre configuração, estado no menor escopo possível, e render controlado deliberadamente. Server Components e Suspense onde reduzem bundle, não onde viram moda.',
        yearsOfUse: 7,
      },
      {
        name: 'Next.js',
        description:
          'App Router, estratégias de cache e streaming, Server Actions e metadata. Escolha consciente entre SSG, SSR e cliente conforme o custo real de cada rota.',
        yearsOfUse: 5,
      },
      {
        name: 'Vite',
        description:
          'Ambiente de desenvolvimento rápido para SPA e bibliotecas: HMR instantâneo, build em Rollup e configuração de saída para publicar pacote consumível.',
        yearsOfUse: 4,
      },
    ],
  },
  {
    id: 'ui',
    label: '02. Interface',
    caption: 'UI, UX e acessibilidade',
    accent: 'aqua',
    skills: [
      {
        name: 'Tailwind CSS',
        description:
          'Tokens no lugar de valores mágicos, variantes tipadas para componentes e disciplina de camadas. CSS que escala porque ninguém precisa adivinhar onde uma regra foi sobrescrita.',
        yearsOfUse: 5,
      },
      {
        name: 'Design Systems',
        description:
          'Da extração de tokens no Figma até o pacote versionado. Fidelidade estrita ao layout proposto, incluindo estados que costumam ficar de fora: foco, erro, vazio, carregando.',
        yearsOfUse: 4,
      },
      {
        name: 'Acessibilidade (WCAG)',
        description:
          'Semântica antes de ARIA, foco gerenciado em overlays, contraste verificado e percurso completo por teclado. Testado com leitor de tela, não só com plugin de auditoria.',
        yearsOfUse: 5,
      },
      {
        name: 'Animação e motion',
        description:
          'Transições que comunicam mudança de estado em vez de decorar. Composição de transform e opacity para não disparar layout, sempre com prefers-reduced-motion respeitado.',
        yearsOfUse: 4,
      },
    ],
  },
  {
    id: 'quality',
    label: '03. Qualidade',
    caption: 'Arquitetura, testes e performance',
    accent: 'solar',
    skills: [
      {
        name: 'Clean Architecture no front',
        description:
          'Domínio isolado de framework, dependências apontando para dentro e acesso a dados atrás de contrato. O objetivo prático: trocar API, CMS ou biblioteca sem abrir componente.',
        yearsOfUse: 5,
      },
      {
        name: 'Testes',
        description:
          'Vitest e Testing Library para comportamento observável pelo usuário; Playwright no caminho crítico. Teste que quebra em refactor legítimo é custo, não rede de segurança.',
        yearsOfUse: 5,
      },
      {
        name: 'Performance web',
        description:
          'Core Web Vitals com dado de campo, orçamento de bundle validado em CI, análise de long tasks e render. Otimização começa com medição, nunca com palpite.',
        yearsOfUse: 5,
      },
      {
        name: 'Code review',
        description:
          'Revisão que separa bloqueio real de preferência pessoal, aponta o porquê e deixa a decisão registrada. Mentoria de devs júnior e pleno como parte do trabalho, não como extra.',
        yearsOfUse: 4,
      },
    ],
  },
  {
    id: 'workflow',
    label: '04. Entrega',
    caption: 'Fluxo, automação e observabilidade',
    accent: 'coral',
    skills: [
      {
        name: 'Git e fluxo de trabalho',
        description:
          'Histórico legível, commits que contam a intenção e PRs pequenos o suficiente para serem revisados de verdade. Convenções automatizadas em vez de combinadas no verbal.',
        yearsOfUse: 7,
      },
      {
        name: 'CI/CD',
        description:
          'GitHub Actions com typecheck, lint, testes e verificação de bundle como portões de merge. Preview deploy por PR para revisar interface olhando a interface.',
        yearsOfUse: 5,
      },
      {
        name: 'Observabilidade de front-end',
        description:
          'Monitoramento de erro em produção com source maps, RUM de Web Vitals e rastreio de sessão. Saber que quebrou antes do usuário abrir chamado.',
        yearsOfUse: 3,
      },
      {
        name: 'Colaboração com design',
        description:
          'Leitura de arquivo do Figma como especificação: variantes, auto-layout, tokens e constraints. Divergência resolvida antes da implementação, não no code review.',
        yearsOfUse: 6,
      },
    ],
  },
];

/**
 * ⚠️ Nomes de organização fictícios/genéricos. Substitua apenas por empregadores
 * que você tenha autorização contratual para citar nominalmente; caso contrário,
 * mantenha a descrição do segmento (como está abaixo).
 */
export const experience: readonly Experience[] = [
  {
    id: 'exp-atual',
    period: '2022 — presente',
    role: 'Desenvolvedor Frontend Sênior',
    organization: 'Produto B2B de grande porte',
    description:
      'Arquitetura de front-end e design system de um produto com múltiplas squads. Definição de padrões de componentização, orçamento de performance e revisão técnica das entregas de interface.',
    accent: 'ember',
  },
  {
    id: 'exp-pleno',
    period: '2020 — 2022',
    role: 'Desenvolvedor Frontend Pleno',
    organization: 'Plataforma SaaS',
    description:
      'Desenvolvimento de features em React e TypeScript, migração incremental de legado e adoção de testes automatizados no fluxo do time.',
    accent: 'solar',
  },
  {
    id: 'exp-junior',
    period: '2018 — 2020',
    role: 'Desenvolvedor Front-end',
    organization: 'Agência digital',
    description:
      'Implementação de interfaces a partir de layouts do Figma para clientes de segmentos variados, com foco em responsividade e compatibilidade entre navegadores.',
    accent: 'aqua',
  },
];
