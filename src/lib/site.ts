export const siteConfig = {
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://renanaugusto.dev',
  title: 'Renan Augusto — Desenvolvedor Frontend Sênior',
  shortTitle: 'Renan Augusto',
  description:
    'Portfólio de Renan Augusto, desenvolvedor frontend sênior especializado em React, TypeScript e Next.js. Arquitetura de front-end, performance e acessibilidade.',
  locale: 'pt-BR',
  /** Vazio => formulário de contato cai para mailto:. Ver .env.example. */
  contactEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? '',
} as const;

export type SiteConfig = typeof siteConfig;
