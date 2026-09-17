'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './use-media-query';

/**
 * Rádio synthwave gerado pela Web Audio API — zero arquivo de áudio na rede.
 *
 * Regras que o original quebrava e aqui são invioláveis:
 *  - Nunca toca sozinho. AudioContext só é criado dentro do gesto do usuário.
 *  - O agendamento usa o relógio do AudioContext, não `setInterval`. Timer de
 *    JS deriva e é estrangulado em aba de fundo; áudio agendado por
 *    `currentTime` não.
 *  - Para ao sair da aba e no unmount. Um oscilador vazado toca para sempre.
 *  - `prefers-reduced-motion` desliga o recurso inteiro: quem pede menos
 *    estímulo não quer som ambiente surgindo do nada.
 */

/** Ré menor — a progressão grave que sustenta o clima sem virar melodia. */
const SEQUENCE = [73.42, 82.41, 87.31, 98.0, 110.0, 98.0, 87.31, 73.42] as const;
const STEP_SECONDS = 0.26;
const LOOKAHEAD_MS = 100;
const SCHEDULE_AHEAD = 0.25;

type RadioState = 'off' | 'on' | 'unsupported';

export function useSynthRadio(): {
  state: RadioState;
  isOn: boolean;
  toggle: () => void;
} {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [state, setState] = useState<RadioState>('off');

  const contextRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const timerRef = useRef<number | null>(null);
  const stepRef = useRef(0);
  const nextNoteTimeRef = useRef(0);

  const stop = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    const master = masterRef.current;
    const context = contextRef.current;
    if (master && context) {
      // Fade de saída: cortar o ganho em degrau produz clique audível.
      master.gain.cancelScheduledValues(context.currentTime);
      master.gain.setValueAtTime(master.gain.value, context.currentTime);
      master.gain.linearRampToValueAtTime(0.0001, context.currentTime + 0.25);
    }
    setState('off');
  }, []);

  const start = useCallback(() => {
    const AudioContextCtor =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

    if (!AudioContextCtor) {
      setState('unsupported');
      return;
    }

    let context = contextRef.current;
    if (!context) {
      context = new AudioContextCtor();
      contextRef.current = context;
      const master = context.createGain();
      master.gain.value = 0.0001;
      master.connect(context.destination);
      masterRef.current = master;
    }

    void context.resume();

    const master = masterRef.current;
    if (!master) return;

    master.gain.cancelScheduledValues(context.currentTime);
    master.gain.setValueAtTime(0.0001, context.currentTime);
    master.gain.linearRampToValueAtTime(0.1, context.currentTime + 0.6);

    nextNoteTimeRef.current = context.currentTime + 0.05;

    // Scheduler com lookahead: o timer só decide *o quê* agendar; *quando* tocar
    // é responsabilidade do relógio do áudio.
    timerRef.current = window.setInterval(() => {
      const ctx = contextRef.current;
      const out = masterRef.current;
      if (!ctx || !out) return;

      while (nextNoteTimeRef.current < ctx.currentTime + SCHEDULE_AHEAD) {
        const time = nextNoteTimeRef.current;
        const frequency = SEQUENCE[stepRef.current % SEQUENCE.length] ?? SEQUENCE[0];

        const osc = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const envelope = ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(frequency, time);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(520, time);
        filter.frequency.exponentialRampToValueAtTime(150, time + 0.22);
        filter.Q.value = 6;

        envelope.gain.setValueAtTime(0.0001, time);
        envelope.gain.exponentialRampToValueAtTime(0.5, time + 0.02);
        envelope.gain.exponentialRampToValueAtTime(0.0001, time + STEP_SECONDS);

        osc.connect(filter).connect(envelope).connect(out);
        osc.start(time);
        osc.stop(time + STEP_SECONDS + 0.05);
        // Libera os nós assim que o som termina; sem isso o grafo cresce sem parar.
        osc.onended = () => {
          osc.disconnect();
          filter.disconnect();
          envelope.disconnect();
        };

        stepRef.current += 1;
        nextNoteTimeRef.current += STEP_SECONDS;
      }
    }, LOOKAHEAD_MS);

    setState('on');
  }, []);

  const toggle = useCallback(() => {
    if (state === 'on') stop();
    else start();
  }, [state, start, stop]);

  // Aba em segundo plano não deve continuar tocando.
  useEffect(() => {
    if (state !== 'on') return;
    const onVisibilityChange = (): void => {
      if (document.visibilityState === 'hidden') stop();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => document.removeEventListener('visibilitychange', onVisibilityChange);
  }, [state, stop]);

  // Quem pediu menos movimento também não quer som.
  useEffect(() => {
    if (prefersReducedMotion && state === 'on') stop();
  }, [prefersReducedMotion, state, stop]);

  // Fecha o AudioContext no unmount: recurso de sistema, não só memória de JS.
  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearInterval(timerRef.current);
      void contextRef.current?.close();
      contextRef.current = null;
      masterRef.current = null;
    };
  }, []);

  return { state, isOn: state === 'on', toggle };
}
