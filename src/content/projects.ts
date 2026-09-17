import type { Project } from '@/domain/entities';

/**
 * ⚠️ CONTEÚDO A PREENCHER.
 *
 * Os nomes de cliente abaixo são fictícios de propósito. Substitua por projetos
 * seus — open source, freelas, side projects ou trabalho corporativo que você
 * tenha autorização para citar nominalmente.
 *
 * Sobre `metrics[].status`:
 *   'verified'    -> número que você consegue defender numa entrevista, com `source` preenchido.
 *   'placeholder' -> renderiza com marcação visível de pendência. Preencha ou remova a métrica.
 *
 * Um card com zero métricas é válido e renderiza bem. Prefira nenhuma métrica
 * a uma métrica que você não consegue explicar de onde veio.
 */

export const projects: readonly Project[] = [
  {
    id: 'design-system',
    codename: 'Missão 01',
    title: 'Design System multiproduto',
    tagline: 'Biblioteca de componentes React consumida por várias squads em paralelo.',
    summary:
      'Biblioteca de componentes React distribuída como pacote versionado e consumida simultaneamente por vários produtos. O desafio central não era desenhar botão: era garantir que uma mudança de token chegasse a todas as aplicações sem quebrar nenhuma, e que o time de design conseguisse auditar a implementação contra o Figma sem abrir o código.',
    role: 'Responsável pela arquitetura da biblioteca, pipeline de release e adoção junto às squads',
    period: '2024 — 2025',
    accent: 'ember',
    stack: ['React', 'TypeScript', 'Radix UI', 'Tailwind CSS', 'Storybook', 'Changesets'],
    metrics: [
      {
        label: 'Componentes publicados',
        value: '— definir',
        status: 'placeholder',
      },
      {
        label: 'Produtos consumindo',
        value: '— definir',
        status: 'placeholder',
      },
      {
        label: 'Cobertura de testes',
        value: '— definir',
        status: 'placeholder',
      },
    ],
    highlights: [
      'Tokens de design como fonte única de verdade, exportados do Figma e compilados para CSS custom properties — tema claro e escuro sem duplicar folha de estilo.',
      'Primitivas headless (Radix) para que comportamento acessível — foco, ARIA, navegação por teclado — venha de graça e não dependa de disciplina de quem consome.',
      'Versionamento semântico automatizado com Changesets: cada PR declara o impacto e o changelog sai pronto, sem reunião de release.',
      'Testes de interação no Storybook rodando em CI, cobrindo os fluxos de teclado dos componentes compostos (combobox, dialog, menu).',
    ],
    links: [
      { kind: 'repository', href: 'https://github.com/', label: 'Código' },
      { kind: 'case-study', href: '#contato', label: 'Ver processo' },
    ],
  },
  {
    id: 'telemetria',
    codename: 'Missão 02',
    title: 'Console de telemetria em tempo real',
    tagline: 'Painel operacional com streaming contínuo e milhares de linhas em tela.',
    summary:
      'Interface de monitoramento que recebe eventos por WebSocket e precisa manter a tabela responsiva enquanto novos registros chegam continuamente. O problema é clássico e brutal: renderizar muita coisa, com frequência, sem derrubar o frame rate e sem tornar a tabela inutilizável para quem navega por teclado.',
    role: 'Desenvolvimento do front-end e das estratégias de renderização e estado',
    period: '2023 — 2024',
    accent: 'aqua',
    stack: ['Next.js', 'TypeScript', 'TanStack Virtual', 'Zustand', 'WebSocket', 'Recharts'],
    metrics: [
      { label: 'Linhas simultâneas', value: '— definir', status: 'placeholder' },
      { label: 'Frame rate sob carga', value: '— definir', status: 'placeholder' },
      { label: 'Latência evento→tela', value: '— definir', status: 'placeholder' },
    ],
    highlights: [
      'Virtualização de linhas para desacoplar o custo de render do tamanho do dataset — a tela renderiza o que cabe na viewport, não o que existe em memória.',
      'Buffer de eventos com flush em requestAnimationFrame: o WebSocket entrega no ritmo dele, o React recebe um lote por frame.',
      'Estado fatiado com seletores para que a chegada de um evento não invalide a árvore inteira de componentes.',
      'Tabela navegável por teclado com anúncio em live region — atualização contínua não pode significar leitor de tela falando sem parar.',
    ],
    links: [
      { kind: 'repository', href: 'https://github.com/', label: 'Código' },
      { kind: 'live', href: 'https://example.com/', label: 'Demo' },
    ],
  },
  {
    id: 'checkout',
    codename: 'Missão 03',
    title: 'Checkout headless de e-commerce',
    tagline: 'Fluxo de compra otimizado para Core Web Vitals com dado real de usuário.',
    summary:
      'Reconstrução do fluxo de checkout de uma loja headless, com meta explícita de performance percebida. O trabalho foi guiado por métricas de campo (CrUX/RUM), não por Lighthouse em máquina de desenvolvedor — a diferença entre as duas coisas é justamente onde mora a conversão.',
    role: 'Implementação do fluxo, orçamento de performance e instrumentação',
    period: '2023',
    accent: 'solar',
    stack: ['Next.js App Router', 'TypeScript', 'React Server Components', 'Zod', 'Playwright'],
    metrics: [
      { label: 'LCP (p75, campo)', value: '— definir', status: 'placeholder' },
      { label: 'INP (p75, campo)', value: '— definir', status: 'placeholder' },
      { label: 'Impacto em conversão', value: '— definir', status: 'placeholder' },
    ],
    highlights: [
      'Server Components para manter fora do bundle do cliente tudo que é apenas leitura — o JS que chega no celular é só o que precisa de interação.',
      'Validação com Zod compartilhada entre formulário e borda do servidor: um schema, dois pontos de execução, zero divergência de regra.',
      'Orçamento de performance verificado em CI — PR que estoura o limite de bundle não passa.',
      'Testes end-to-end do caminho crítico de compra com Playwright, incluindo percurso completo por teclado.',
    ],
    links: [
      { kind: 'case-study', href: '#contato', label: 'Ver processo' },
      { kind: 'live', href: 'https://example.com/', label: 'Demo' },
    ],
  },
  {
    id: 'migracao',
    codename: 'Missão 04',
    title: 'Migração de legado para Vite + React 19',
    tagline: 'Modernização incremental de uma SPA antiga, sem congelar o roadmap.',
    summary:
      'Aplicação legada em Create React App com build lento e dependências sem manutenção. A migração foi feita de forma incremental — padrão strangler fig — porque parar a entrega de produto por um trimestre para reescrever não era uma opção negociável com o negócio.',
    role: 'Planejamento da estratégia de migração e execução junto ao time',
    period: '2022 — 2023',
    accent: 'coral',
    stack: ['Vite', 'React 19', 'TypeScript', 'Vitest', 'Testing Library', 'ESLint'],
    metrics: [
      { label: 'Tempo de build', value: '— definir', status: 'placeholder' },
      { label: 'Cold start do dev server', value: '— definir', status: 'placeholder' },
      { label: 'Rotas migradas', value: '— definir', status: 'placeholder' },
    ],
    highlights: [
      'Migração rota a rota com as duas stacks convivendo atrás do mesmo roteador — nenhum big bang, nenhum freeze de feature.',
      'TypeScript ativado em modo estrito por diretório, com o compilador barrando regressão em vez de depender de revisão humana.',
      'Suíte de testes migrada de Jest para Vitest reaproveitando Testing Library: mesma semântica de teste, ordem de grandeza a menos de tempo.',
      'Camada de domínio isolada de framework durante a migração — a regra de negócio atravessou a troca de build tool sem reescrita.',
    ],
    links: [{ kind: 'repository', href: 'https://github.com/', label: 'Código' }],
  },
];
