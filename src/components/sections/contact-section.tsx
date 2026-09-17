'use client';

import { useActionState, useId } from 'react';
import type { ContactChannel } from '@/domain/entities';
import { contactSchema, subjectOptions, type FieldErrors } from '@/lib/contact-schema';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/cn';
import { Button } from '@/components/ui/button';
import { ArrowUpRightIcon, iconByName } from '@/components/ui/icons';
import { SectionHeading } from '@/components/ui/section-heading';

type FormState = {
  status: 'idle' | 'success' | 'mailto' | 'error';
  message: string;
  errors: FieldErrors;
};

const initialState: FormState = { status: 'idle', message: '', errors: {} };

/**
 * Envio do formulário.
 *
 * A versão anterior fingia sucesso com `setTimeout` — o visitante achava que
 * tinha entrado em contato e a mensagem não ia a lugar nenhum. Aqui há dois
 * caminhos reais e nenhum terceiro:
 *
 *  1. `NEXT_PUBLIC_CONTACT_ENDPOINT` configurado -> POST de verdade, com o
 *     resultado do servidor refletido na interface.
 *  2. Não configurado -> abre o cliente de e-mail com o corpo preenchido.
 *     Funciona inclusive em export estático e não mente sobre o que aconteceu.
 */
async function submitContact(_prev: FormState, formData: FormData): Promise<FormState> {
  const parsed = contactSchema.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    subject: formData.get('subject'),
    message: formData.get('message'),
  });

  if (!parsed.success) {
    return {
      status: 'error',
      message: 'Revise os campos destacados.',
      errors: parsed.errors,
    };
  }

  const data = parsed.data;

  if (!siteConfig.contactEndpoint) {
    const body = `${data.message}\n\n—\n${data.name}\n${data.email}`;
    const href = `mailto:contato@renanaugusto.dev?subject=${encodeURIComponent(
      `[Portfólio] ${data.subject}`,
    )}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
    return {
      status: 'mailto',
      message: 'Abrimos seu cliente de e-mail com a mensagem pronta. Basta enviar.',
      errors: {},
    };
  }

  try {
    const response = await fetch(siteConfig.contactEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    return {
      status: 'success',
      message: 'Mensagem enviada. Retorno em até 2 dias úteis.',
      errors: {},
    };
  } catch {
    return {
      status: 'error',
      message:
        'Não foi possível enviar agora. Tente novamente ou use um dos canais diretos ao lado.',
      errors: {},
    };
  }
}

function FieldError({ id, message }: { id: string; message: string | undefined }) {
  if (!message) return null;
  return (
    <p id={id} className="text-ember-400 mt-1.5 font-mono text-xs">
      {message}
    </p>
  );
}

const fieldClasses =
  'chamfer-sm focus:border-ember-500 w-full border border-white/20 bg-black/60 px-4 py-3 text-sm text-ink transition-colors outline-none placeholder:text-haze/70';

export function ContactSection({ channels }: { channels: readonly ContactChannel[] }) {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);
  const formId = useId();

  const fieldId = (name: string): string => `${formId}-${name}`;
  const errorId = (name: string): string => `${formId}-${name}-error`;

  return (
    <section
      id="contato"
      aria-labelledby="contato-title"
      className="relative z-20 mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8 lg:py-28"
    >
      <div
        data-reveal
        className="chamfer-lg border-ember-500 bg-dusk-900/95 border-2 p-6 backdrop-blur-xl sm:p-10 lg:p-12"
      >
        <SectionHeading
          id="contato-title"
          eyebrow="Despacho — contato"
          title="Vamos"
          emphasis="conversar"
          description="Vaga, projeto ou consultoria: descreva o contexto e eu respondo em até dois dias úteis."
          accent="ember"
          className="mb-10 border-b border-white/10 pb-8"
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <form action={formAction} noValidate className="space-y-4 lg:col-span-7">
            <div>
              <label
                htmlFor={fieldId('name')}
                className="mb-1.5 block font-mono text-xs tracking-wider text-mist uppercase"
              >
                Nome
              </label>
              <input
                id={fieldId('name')}
                name="name"
                type="text"
                autoComplete="name"
                required
                aria-invalid={state.errors.name ? true : undefined}
                aria-describedby={state.errors.name ? errorId('name') : undefined}
                placeholder="Ana Ribeiro"
                className={cn(fieldClasses, state.errors.name && 'border-ember-500')}
              />
              <FieldError id={errorId('name')} message={state.errors.name} />
            </div>

            <div>
              <label
                htmlFor={fieldId('email')}
                className="mb-1.5 block font-mono text-xs tracking-wider text-mist uppercase"
              >
                E-mail para retorno
              </label>
              <input
                id={fieldId('email')}
                name="email"
                type="email"
                autoComplete="email"
                required
                aria-invalid={state.errors.email ? true : undefined}
                aria-describedby={state.errors.email ? errorId('email') : undefined}
                placeholder="ana.ribeiro@empresa.com.br"
                className={cn(fieldClasses, state.errors.email && 'border-ember-500')}
              />
              <FieldError id={errorId('email')} message={state.errors.email} />
            </div>

            <div>
              <label
                htmlFor={fieldId('subject')}
                className="mb-1.5 block font-mono text-xs tracking-wider text-mist uppercase"
              >
                Assunto
              </label>
              <select
                id={fieldId('subject')}
                name="subject"
                defaultValue={subjectOptions[0]}
                aria-invalid={state.errors.subject ? true : undefined}
                aria-describedby={state.errors.subject ? errorId('subject') : undefined}
                className={cn(fieldClasses, 'bg-dusk-800', state.errors.subject && 'border-ember-500')}
              >
                {subjectOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <FieldError id={errorId('subject')} message={state.errors.subject} />
            </div>

            <div>
              <label
                htmlFor={fieldId('message')}
                className="mb-1.5 block font-mono text-xs tracking-wider text-mist uppercase"
              >
                Contexto do projeto ou da vaga
              </label>
              <textarea
                id={fieldId('message')}
                name="message"
                rows={5}
                required
                aria-invalid={state.errors.message ? true : undefined}
                aria-describedby={state.errors.message ? errorId('message') : undefined}
                placeholder="Objetivo, stack atual, tamanho do time e prazo esperado."
                className={cn(fieldClasses, 'resize-y', state.errors.message && 'border-ember-500')}
              />
              <FieldError id={errorId('message')} message={state.errors.message} />
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={isPending}>
              {isPending ? 'Enviando…' : 'Enviar mensagem'}
            </Button>

            {/* Live region: o resultado é anunciado sem roubar o foco. */}
            <p
              role="status"
              aria-live="polite"
              className={cn(
                'min-h-6 font-mono text-xs',
                state.status === 'error' ? 'text-ember-400' : 'text-aqua-500',
              )}
            >
              {state.message}
            </p>
          </form>

          <div className="space-y-5 lg:col-span-5">
            <h3 className="font-display text-2xl tracking-wide text-ink uppercase">
              Canais diretos
            </h3>
            <p className="text-xs leading-relaxed text-mist">
              Prefere pular o formulário? Qualquer um destes chega em mim.
            </p>

            <ul className="space-y-3">
              {channels.map((channel) => {
                const Icon = iconByName[channel.icon];
                const isExternal = channel.href.startsWith('http');
                return (
                  <li key={channel.id}>
                    <a
                      href={channel.href}
                      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="chamfer-sm hover:border-ember-500 hover:bg-ember-500/10 group flex items-center gap-4 border border-white/10 bg-black/40 p-3.5 transition-colors"
                    >
                      <span className="group-hover:text-ember-400 flex h-10 w-10 shrink-0 items-center justify-center rounded bg-white/5 text-ink transition-colors">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="font-display block text-lg tracking-wide text-ink">
                          {channel.label}
                        </span>
                        <span className="block truncate font-mono text-[0.68rem] text-haze">
                          {channel.value}
                        </span>
                      </span>
                      <ArrowUpRightIcon className="h-4 w-4 shrink-0 text-haze" />
                      {isExternal ? <span className="sr-only">(abre em nova aba)</span> : null}
                    </a>
                  </li>
                );
              })}
            </ul>

            <p className="chamfer-sm border border-white/5 bg-black/40 p-4 font-mono text-[0.68rem] leading-relaxed text-haze">
              Resposta em até 2 dias úteis. Para vagas, envie junto o nome da empresa, o modelo de
              contratação e a faixa salarial — isso economiza uma rodada de conversa para os dois
              lados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
