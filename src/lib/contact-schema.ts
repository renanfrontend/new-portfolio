import { email, object, oneOf, text, type Infer } from './validation';

/**
 * Schema único de contato.
 *
 * Roda no cliente (feedback imediato) e é o mesmo objeto que uma rota de API,
 * Server Action ou função serverless deve usar para validar do lado de fora.
 * Uma definição, dois pontos de execução — impossível divergirem.
 */

export const subjectOptions = [
  'Vaga efetiva (CLT/PJ)',
  'Projeto ou freelance',
  'Consultoria técnica',
  'Outro assunto',
] as const;

export const contactSchema = object({
  name: text({
    min: 2,
    max: 120,
    required: 'Informe seu nome.',
    tooShort: 'Informe seu nome completo.',
  }),
  email: email(),
  subject: oneOf(subjectOptions, 'Selecione um assunto.'),
  message: text({
    min: 20,
    max: 3000,
    required: 'Descreva o contexto da mensagem.',
    tooShort: 'Descreva o contexto com pelo menos 20 caracteres.',
    tooLong: 'Mensagem longa demais — resuma em até 3000 caracteres.',
  }),
});

export type ContactInput = Infer<typeof contactSchema.shape>;
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;
