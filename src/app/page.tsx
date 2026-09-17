import { portfolioRepository } from '@/content';
import { siteConfig } from '@/lib/site';
import { AmbientOverlay } from '@/components/effects/ambient-overlay';
import { RevealProvider } from '@/components/effects/reveal-provider';
import { SunsetCanvas } from '@/components/effects/sunset-canvas';
import { SiteFooter } from '@/components/layout/site-footer';
import { SiteHeader } from '@/components/layout/site-header';
import { AboutSection } from '@/components/sections/about-section';
import { ContactSection } from '@/components/sections/contact-section';
import { HeroSection } from '@/components/sections/hero-section';
import { ProjectsSection } from '@/components/sections/projects-section';
import { StackSection } from '@/components/sections/stack-section';

/**
 * Server Component: o conteúdo é resolvido no servidor e a página sai como HTML
 * estático. Só o que tem interação — header, tabs, dialogs, formulário e os
 * efeitos de canvas — atravessa a fronteira para o cliente.
 */
export default async function HomePage() {
  const { profile, navigation, projects, skillGroups, experience } =
    await portfolioRepository.getPortfolio();

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role,
    description: profile.headline,
    url: siteConfig.url,
    address: { '@type': 'PostalAddress', addressLocality: 'São Paulo', addressCountry: 'BR' },
    knowsAbout: ['React', 'TypeScript', 'Next.js', 'Design Systems', 'Acessibilidade web'],
    sameAs: profile.channels
      .filter((channel) => channel.href.startsWith('http'))
      .map((channel) => channel.href),
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Conteúdo estático definido em build time — nada vem de entrada do usuário.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <SunsetCanvas />
      <AmbientOverlay />
      <RevealProvider />

      <SiteHeader navigation={navigation} />

      <main id="conteudo">
        <HeroSection profile={profile} />
        <ProjectsSection projects={projects} />
        <StackSection skillGroups={skillGroups} />
        <AboutSection profile={profile} experience={experience} />
        <ContactSection channels={profile.channels} />
      </main>

      <SiteFooter navigation={navigation} />
    </>
  );
}
