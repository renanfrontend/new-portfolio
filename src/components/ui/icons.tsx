import type { SVGProps } from 'react';

/**
 * Ícones inline como componentes.
 *
 * Nenhum pacote de ícones: o site usa sete glifos e uma dependência traria
 * centenas. Todos são decorativos (`aria-hidden`) — o significado vem sempre do
 * texto ao lado ou de um `.sr-only` no elemento pai.
 */
type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  'aria-hidden': true,
  focusable: false,
} as const;

export const GithubIcon = (props: IconProps) => (
  <svg {...base} fill="currentColor" {...props}>
    <path d="M12 .5C5.73.5.9 5.33.9 11.6c0 4.9 3.17 9.06 7.57 10.53.55.1.76-.24.76-.53l-.02-2.06c-3.08.67-3.73-1.3-3.73-1.3-.5-1.29-1.23-1.63-1.23-1.63-1.01-.69.08-.67.08-.67 1.11.08 1.7 1.15 1.7 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.7-1.49-2.46-.28-5.04-1.23-5.04-5.48 0-1.21.43-2.2 1.14-2.98-.11-.28-.5-1.41.11-2.94 0 0 .93-.3 3.05 1.14a10.5 10.5 0 0 1 5.56 0c2.12-1.44 3.05-1.14 3.05-1.14.61 1.53.22 2.66.11 2.94.71.78 1.14 1.77 1.14 2.98 0 4.26-2.58 5.2-5.04 5.47.4.34.75 1.02.75 2.06l-.01 3.05c0 .3.2.64.76.53a11.11 11.11 0 0 0 7.57-10.53C23.1 5.33 18.27.5 12 .5Z" />
  </svg>
);

export const LinkedinIcon = (props: IconProps) => (
  <svg {...base} fill="currentColor" {...props}>
    <path d="M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5ZM8 19H5V8h3v11ZM6.5 6.73a1.77 1.77 0 1 1 0-3.53 1.77 1.77 0 0 1 0 3.53ZM20 19h-3v-5.6c0-3.37-4-3.11-4 0V19h-3V8h3v1.77C14.4 7.18 20 7 20 12.24V19Z" />
  </svg>
);

export const MailIcon = (props: IconProps) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2Z"
    />
  </svg>
);

export const WhatsappIcon = (props: IconProps) => (
  <svg {...base} fill="currentColor" {...props}>
    <path d="M.06 24l1.68-6.16A11.87 11.87 0 0 1 11.94 0C18.5 0 23.83 5.33 23.83 11.9c0 6.55-5.33 11.89-11.89 11.89-2 0-3.95-.5-5.69-1.45L.06 24Zm6.6-3.8c1.67 1 3.27 1.59 5.38 1.59 5.45 0 9.89-4.43 9.89-9.89S17.49 2 12.03 2a9.88 9.88 0 0 0-9.88 9.88c0 2.23.65 3.9 1.74 5.64l-1 3.65 3.74-.98Z" />
  </svg>
);

export const ArrowUpRightIcon = (props: IconProps) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const ArrowUpIcon = (props: IconProps) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 11l7-7 7 7M12 4v16" />
  </svg>
);

export const MenuIcon = (props: IconProps) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

export const CloseIcon = (props: IconProps) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={2} {...props}>
    <path strokeLinecap="round" d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const SoundIcon = (props: IconProps) => (
  <svg {...base} fill="none" stroke="currentColor" strokeWidth={1.8} {...props}>
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.54 8.46a5 5 0 0 1 0 7.07M5.59 15H4a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h1.59l4.7-4.7c.63-.63 1.71-.19 1.71.7v14c0 .89-1.08 1.34-1.71.71L5.59 15Z"
    />
  </svg>
);

export const iconByName = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  mail: MailIcon,
  whatsapp: WhatsappIcon,
} as const;
