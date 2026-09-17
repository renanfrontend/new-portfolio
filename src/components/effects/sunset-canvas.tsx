'use client';

import { useEffect, useRef } from 'react';
import { usePrefersReducedMotion } from '@/hooks/use-media-query';

/**
 * Fundo animado: horizonte em gradiente + brasas à deriva.
 *
 * O que a versão anterior fazia de errado, e o que mudou:
 *  - `requestAnimationFrame` sem `cancelAnimationFrame`: o loop sobrevivia ao
 *    componente. Aqui o id é guardado e cancelado no cleanup.
 *  - Canvas dimensionado em pixels CSS: borrado em tela retina. Agora o buffer é
 *    escalado por `devicePixelRatio` (limitado a 2 — acima disso o custo de
 *    preenchimento cresce sem ganho visível).
 *  - Gradiente recriado a cada frame. O fundo é estático entre resizes, então é
 *    pintado uma vez num canvas fora de tela e copiado com um `drawImage`.
 *  - Rodava em aba escondida e fora da viewport. Agora pausa nos dois casos.
 *  - Ignorava `prefers-reduced-motion`. Agora pinta um único frame e para.
 */

type Ember = {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  alpha: number;
  hue: string;
};

const EMBER_HUES = ['#ff2e88', '#ffb020', '#2de2c5'] as const;
const DENSITY = 1 / 26_000; // brasas por pixel CSS — mantém o peso constante em qualquer viewport
const MAX_EMBERS = 64;

const createEmbers = (width: number, height: number): Ember[] => {
  const count = Math.min(MAX_EMBERS, Math.round(width * height * DENSITY));
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.9 + 0.6,
    speedY: Math.random() * 0.34 + 0.12,
    speedX: (Math.random() - 0.5) * 0.18,
    alpha: Math.random() * 0.5 + 0.18,
    hue: EMBER_HUES[Math.floor(Math.random() * EMBER_HUES.length)] ?? EMBER_HUES[0],
  }));
};

const paintBackdrop = (ctx: CanvasRenderingContext2D, width: number, height: number): void => {
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, '#07030f');
  sky.addColorStop(0.38, '#160a2c');
  sky.addColorStop(0.68, '#3d1147');
  sky.addColorStop(0.88, '#8d1a55');
  sky.addColorStop(1, '#07030f');
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  const sun = ctx.createRadialGradient(
    width * 0.5,
    height * 0.78,
    8,
    width * 0.5,
    height * 0.78,
    Math.max(width, height) * 0.55,
  );
  sun.addColorStop(0, 'rgba(255, 176, 32, 0.26)');
  sun.addColorStop(0.35, 'rgba(255, 46, 136, 0.16)');
  sun.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.fillStyle = sun;
  ctx.fillRect(0, 0, width, height);
};

export function SunsetCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let embers: Ember[] = [];
    let frameId: number | null = null;
    let isVisible = true;

    // Fundo pintado uma vez por resize e copiado a cada frame.
    const backdrop = document.createElement('canvas');
    const backdropCtx = backdrop.getContext('2d');
    if (!backdropCtx) return;

    const resize = (): void => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      if (width === 0 || height === 0) return;

      for (const surface of [canvas, backdrop]) {
        surface.width = Math.round(width * dpr);
        surface.height = Math.round(height * dpr);
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      backdropCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

      paintBackdrop(backdropCtx, width, height);
      embers = createEmbers(width, height);
    };

    const drawFrame = (): void => {
      ctx.drawImage(backdrop, 0, 0, width, height);

      for (const ember of embers) {
        ember.y -= ember.speedY;
        ember.x += ember.speedX;

        if (ember.y < -8) {
          ember.y = height + 8;
          ember.x = Math.random() * width;
        }
        if (ember.x < -8) ember.x = width + 8;
        else if (ember.x > width + 8) ember.x = -8;

        ctx.globalAlpha = ember.alpha;
        ctx.fillStyle = ember.hue;
        ctx.beginPath();
        ctx.arc(ember.x, ember.y, ember.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const loop = (): void => {
      drawFrame();
      frameId = window.requestAnimationFrame(loop);
    };

    const start = (): void => {
      if (frameId !== null || prefersReducedMotion) return;
      frameId = window.requestAnimationFrame(loop);
    };

    const stop = (): void => {
      if (frameId === null) return;
      window.cancelAnimationFrame(frameId);
      frameId = null;
    };

    resize();

    if (prefersReducedMotion) {
      // Um frame estático: a identidade visual permanece, o movimento não.
      drawFrame();
    } else {
      start();
    }

    const resizeObserver = new ResizeObserver(() => {
      resize();
      if (prefersReducedMotion) drawFrame();
    });
    resizeObserver.observe(canvas);

    // Fora da viewport não precisa desenhar.
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry?.isIntersecting ?? true;
        if (isVisible && document.visibilityState === 'visible') start();
        else stop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(canvas);

    const onVisibilityChange = (): void => {
      if (document.visibilityState === 'visible' && isVisible) start();
      else stop();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      // Decorativo: fica fora da árvore de acessibilidade.
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 h-full w-full"
    />
  );
}
