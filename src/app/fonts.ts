import localFont from 'next/font/local';

/**
 * Fontes auto-hospedadas via `next/font/local`.
 *
 * Por que local e não `next/font/google`: o build deixa de depender de rede
 * externa (CI offline, sandbox e air-gap funcionam igual), não há requisição a
 * terceiro em runtime — o que também resolve o lado de privacidade/LGPD de
 * servir fonte a partir de domínio de terceiros — e a versão do arquivo fica
 * travada no repositório em vez de mudar sem aviso.
 *
 * Os `.woff2` em `src/fonts/` vieram dos pacotes @fontsource (Inter e
 * JetBrains Mono variáveis, Bebas Neue 400), todos sob SIL Open Font License.
 * As licenças estão ao lado dos arquivos.
 *
 * `next/font` ainda entrega o resto: preload, `font-display: swap` e métricas
 * de fallback ajustadas para reduzir layout shift durante o swap.
 */

export const displayFont = localFont({
  src: '../fonts/bebas-neue-latin-400-normal.woff2',
  weight: '400',
  style: 'normal',
  display: 'swap',
  variable: '--font-display-face',
  fallback: ['Arial Narrow', 'Haettenschweiler', 'sans-serif'],
  preload: true,
});

export const sansFont = localFont({
  src: '../fonts/inter-latin-wght-normal.woff2',
  weight: '100 900',
  style: 'normal',
  display: 'swap',
  variable: '--font-sans-face',
  fallback: ['system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'sans-serif'],
  preload: true,
});

export const monoFont = localFont({
  src: '../fonts/jetbrains-mono-latin-wght-normal.woff2',
  weight: '100 800',
  style: 'normal',
  display: 'swap',
  variable: '--font-mono-face',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
  // Mono aparece só abaixo da dobra — não compete por banda no carregamento inicial.
  preload: false,
});

export const fontVariables = `${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`;
