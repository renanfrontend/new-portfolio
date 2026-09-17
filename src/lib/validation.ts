/**
 * Validador mínimo e tipado.
 *
 * Por que não Zod aqui: medido no bundle, Zod custava ~32 kB gzip para validar
 * quatro campos de um formulário. Num projeto com muitos schemas isso se paga
 * na hora; num portfólio de página única, não. Estas ~70 linhas entregam o que
 * este site precisa — inferência de tipo a partir do schema, erro por campo e a
 * mesma definição reaproveitável no servidor.
 *
 * Se o projeto crescer a ponto de justificar, trocar por Zod é reescrever só
 * `contact-schema.ts`: o restante do código conhece apenas `ValidationResult`.
 */

export type FieldResult<T> = { ok: true; value: T } | { ok: false; message: string };
export type FieldValidator<T> = (raw: unknown) => FieldResult<T>;

export type Shape = Record<string, FieldValidator<unknown>>;

/** Extrai o tipo de saída a partir da forma do schema. */
export type Infer<S extends Record<string, FieldValidator<unknown>>> = {
  [K in keyof S]: S[K] extends FieldValidator<infer T> ? T : never;
};

export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: Partial<Record<keyof T, string>> };

const asString = (raw: unknown): string => (typeof raw === 'string' ? raw.trim() : '');

type TextRules = {
  min?: number;
  max?: number;
  required?: string;
  tooShort?: string;
  tooLong?: string;
};

export const text = (rules: TextRules = {}): FieldValidator<string> => {
  const { min = 1, max = 5000 } = rules;
  return (raw) => {
    const value = asString(raw);
    if (value.length === 0) {
      return { ok: false, message: rules.required ?? 'Campo obrigatório.' };
    }
    if (value.length < min) {
      return { ok: false, message: rules.tooShort ?? `Use pelo menos ${min} caracteres.` };
    }
    if (value.length > max) {
      return { ok: false, message: rules.tooLong ?? `Use no máximo ${max} caracteres.` };
    }
    return { ok: true, value };
  };
};

/**
 * Regra de e-mail deliberadamente permissiva.
 * Regex "completa" de e-mail rejeita endereços válidos e não prova entregabilidade.
 * A verificação que importa é o envio real; aqui basta barrar erro de digitação.
 */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const email = (message = 'E-mail inválido.'): FieldValidator<string> => {
  const base = text({ required: 'Informe um e-mail para retorno.', max: 320 });
  return (raw) => {
    const result = base(raw);
    if (!result.ok) return result;
    return EMAIL_PATTERN.test(result.value) ? result : { ok: false, message };
  };
};

export const oneOf = <const T extends readonly string[]>(
  options: T,
  message = 'Selecione uma opção válida.',
): FieldValidator<T[number]> => {
  return (raw) => {
    const value = asString(raw);
    return options.includes(value)
      ? { ok: true, value: value as T[number] }
      : { ok: false, message };
  };
};

/** Combina validadores de campo num schema de objeto com inferência de tipo. */
export const object = <S extends Record<string, FieldValidator<unknown>>>(shape: S) => ({
  shape,
  parse(input: Record<string, unknown>): ValidationResult<Infer<S>> {
    const data: Record<string, unknown> = {};
    const errors: Record<string, string> = {};

    for (const key of Object.keys(shape)) {
      const validator = shape[key];
      if (!validator) continue;
      const result = validator(input[key]);
      if (result.ok) data[key] = result.value;
      else errors[key] = result.message;
    }

    return Object.keys(errors).length > 0
      ? { success: false, errors: errors as Partial<Record<keyof Infer<S>, string>> }
      : { success: true, data: data as Infer<S> };
  },
});
