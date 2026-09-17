import type { NavItem, Profile } from '@/domain/entities';

/**
 * ⚠️ ARQUIVO DE CONTEÚDO — revise antes de publicar.
 * Tudo aqui é texto editorial. Trocar uma frase não deveria exigir abrir um .tsx.
 */

export const profile: Profile = {
  name: 'Renan Augusto',
  role: 'Desenvolvedor Frontend Sênior',
  location: 'São Paulo, Brasil — remoto',
  availability: 'Aberto a novas oportunidades',
  headline:
    'Construo interfaces de produto em React e TypeScript: arquitetura de front-end que aguenta time grande, performance medida em campo e fidelidade ao design até o último pixel.',
  yearsOfExperience: 7,
  bio: [
    'Sou desenvolvedor frontend sênior com mais de 7 anos construindo produtos web. Meu trabalho vive na fronteira entre engenharia e design: transformo layouts do Figma em interfaces que carregam rápido, funcionam no teclado e no leitor de tela, e continuam manuteníveis depois que o time dobra de tamanho.',
    'Na prática isso é: modelar a camada de componentes para que regra de negócio não vaze para dentro de JSX, brigar por Core Web Vitals com dado real de usuário em vez de número de laboratório, e revisar código de forma que a barra suba para todo mundo — não só para o PR da vez.',
  ],
  facts: [
    { label: 'Base', value: 'São Paulo, BR (UTC−3)' },
    { label: 'Foco', value: 'React · TypeScript · Next.js' },
    { label: 'Método', value: 'Clean Architecture & testes' },
    { label: 'Idiomas', value: 'Português nativo · Inglês' },
  ],
  channels: [
    // TODO: trocar pelos seus handles reais antes de publicar.
    {
      id: 'github',
      label: 'GitHub',
      value: '@seu-usuario',
      href: 'https://github.com/',
      icon: 'github',
    },
    {
      id: 'linkedin',
      label: 'LinkedIn',
      value: '/in/seu-perfil',
      href: 'https://www.linkedin.com/',
      icon: 'linkedin',
    },
    {
      id: 'email',
      label: 'E-mail',
      value: 'contato@renanaugusto.dev',
      href: 'mailto:contato@renanaugusto.dev',
      icon: 'mail',
    },
  ],
};

export const navigation: readonly NavItem[] = [
  { label: 'Início', caption: 'Visão geral', href: '#inicio' },
  { label: 'Missões', caption: 'Projetos', href: '#projetos' },
  { label: 'Arsenal', caption: 'Stack', href: '#stack' },
  { label: 'Dossiê', caption: 'Sobre', href: '#sobre' },
  { label: 'Despacho', caption: 'Contato', href: '#contato' },
];
