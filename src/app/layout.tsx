import type { Metadata, Viewport } from 'next';
import { fontVariables } from './fonts';
import { siteConfig } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s · ${siteConfig.shortTitle}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.shortTitle,
  authors: [{ name: 'Renan Augusto', url: siteConfig.url }],
  creator: 'Renan Augusto',
  keywords: [
    'desenvolvedor frontend',
    'frontend sênior',
    'React',
    'TypeScript',
    'Next.js',
    'design system',
    'acessibilidade',
    'performance web',
    'São Paulo',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: siteConfig.url,
    siteName: siteConfig.shortTitle,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export const viewport: Viewport = {
  themeColor: '#07030f',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  // Nunca travar o zoom: bloquear pinch-zoom é falha de acessibilidade direta.
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={fontVariables}>
      <body className="antialiased">
        {/* Primeiro alvo de Tab da página: pula a navegação e vai ao conteúdo. */}
        <a
          href="#conteudo"
          className="focus:bg-solar-500 focus:text-dusk-950 focus:chamfer-sm sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:text-sm focus:font-bold"
        >
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
