'use client';

import { useEffect, useState } from 'react';
import type { NavItem } from '@/domain/entities';
import { useScrollSpy } from '@/hooks/use-scroll-spy';
import { useSynthRadio } from '@/hooks/use-synth-radio';
import { cn } from '@/lib/cn';
import { buttonStyles } from '@/components/ui/button';
import { CloseIcon, MenuIcon, SoundIcon } from '@/components/ui/icons';
import { Logo } from './logo';

export function SiteHeader({ navigation }: { navigation: readonly NavItem[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sectionIds = navigation.map((item) => item.href.slice(1));
  const activeId = useScrollSpy(sectionIds, sectionIds[0] ?? '');
  const radio = useSynthRadio();

  // Esc fecha o menu mobile — mesma expectativa de qualquer overlay.
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="border-ember-500/25 bg-dusk-950/85 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="shrink-0" aria-label="Renan Augusto — ir para o início">
          <Logo />
        </a>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navigation.map((item) => {
              const isActive = item.href.slice(1) === activeId;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? 'true' : undefined}
                    className={cn(
                      'chamfer-sm flex flex-col px-3 py-1.5 text-xs font-bold tracking-wider uppercase transition-colors',
                      isActive
                        ? 'bg-ember-500/15 text-ember-400'
                        : 'text-mist hover:bg-white/5 hover:text-solar-500',
                    )}
                  >
                    {item.label}
                    <span className="text-[0.62rem] font-medium tracking-normal normal-case opacity-65">
                      {item.caption}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {radio.state !== 'unsupported' ? (
            <button
              type="button"
              onClick={radio.toggle}
              aria-pressed={radio.isOn}
              className={cn(
                'chamfer-sm flex min-h-11 items-center gap-2 border px-3 py-2 font-mono text-[0.68rem] tracking-wider uppercase transition-colors',
                radio.isOn
                  ? 'border-solar-500 text-solar-500 shadow-glow-solar'
                  : 'border-white/20 text-mist hover:border-ember-500 hover:text-ember-400',
              )}
            >
              <SoundIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Rádio {radio.isOn ? 'on' : 'off'}</span>
              <span className="sr-only sm:hidden">
                {radio.isOn ? 'Desligar' : 'Ligar'} trilha sonora ambiente
              </span>
            </button>
          ) : null}

          <a href="#contato" className={cn(buttonStyles({ size: 'sm' }), 'hidden sm:inline-flex')}>
            Fale comigo
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
            className="chamfer-sm hover:text-ember-400 flex h-11 w-11 items-center justify-center border border-white/15 text-mist transition-colors lg:hidden"
          >
            {isMenuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            <span className="sr-only">{isMenuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
          </button>
        </div>
      </div>

      {/* Menu mobile: some da árvore quando fechado, em vez de ficar `hidden`
          e continuar alcançável por Tab. */}
      {isMenuOpen ? (
        <nav
          id="menu-mobile"
          aria-label="Navegação principal (mobile)"
          className="border-ember-500/25 bg-dusk-950/97 border-t px-4 py-5 lg:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:text-ember-400 flex items-baseline gap-2 py-2.5 text-sm font-bold tracking-wider text-ink uppercase transition-colors"
                >
                  {item.label}
                  <span className="text-xs font-medium tracking-normal normal-case text-haze">
                    {item.caption}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contato"
            onClick={() => setIsMenuOpen(false)}
            className={cn(buttonStyles({ size: 'sm' }), 'mt-4 w-full')}
          >
            Fale comigo
          </a>
          <button
            type="button"
            onClick={() => setIsMenuOpen(false)}
            className="mt-4 flex w-full items-center justify-center gap-2 py-2 font-mono text-xs text-haze uppercase"
          >
            <CloseIcon className="h-4 w-4" /> Fechar
          </button>
        </nav>
      ) : null}
    </header>
  );
}
