import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Concatena classes resolvendo conflitos do Tailwind (a última vence de verdade).
 * Sem isso, `cn('p-4', props.className)` com `className="p-8"` gera as duas
 * regras e o resultado depende da ordem no CSS compilado.
 */
export const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));
