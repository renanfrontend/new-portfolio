import type { NavItem } from '@/domain/entities';
import { ArrowUpIcon } from '@/components/ui/icons';
import { Logo } from './logo';

export function SiteFooter({ navigation }: { navigation: readonly NavItem[] }) {
  const year = new Date().getFullYear();

  return (
    <footer className="border-ember-500/20 relative z-20 border-t bg-[#05010b] px-4 pt-16 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 text-center">
        <Logo size="lg" className="flex-col gap-4 text-center sm:flex-row sm:text-left" />

        <nav aria-label="Navegação do rodapé">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-3 font-mono text-xs tracking-wider text-mist uppercase">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="hover:text-solar-500 transition-colors">
                  {item.caption}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="max-w-2xl text-xs leading-relaxed text-haze">
          © {year} Renan Augusto. Projeto autoral construído com Next.js, TypeScript e Tailwind CSS.
          A direção de arte é uma interpretação livre da estética synthwave de fim de tarde —
          nenhuma marca, personagem ou identidade visual de terceiros é utilizada.
        </p>

        <a
          href="#inicio"
          className="chamfer-sm border-ember-500/40 text-ember-400 hover:border-ember-500 font-display inline-flex items-center gap-2 border px-6 py-2.5 text-sm tracking-[0.15em] uppercase transition-colors hover:text-ink"
        >
          <ArrowUpIcon className="h-4 w-4" />
          Voltar ao topo
        </a>
      </div>
    </footer>
  );
}
