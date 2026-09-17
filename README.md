# Portfólio — Renan Augusto

Portfólio pessoal em Next.js 15 (App Router), React 19, TypeScript estrito e Tailwind CSS v4.
Direção de arte autoral inspirada em synthwave de fim de tarde: gradiente de pôr do sol, grain,
tipografia condensada monumental e cantos chanfrados.

```bash
npm install
npm run dev      # http://localhost:3000
```

| Script               | O que faz                                          |
| -------------------- | -------------------------------------------------- |
| `npm run dev`        | Servidor de desenvolvimento                        |
| `npm run build`      | Build de produção                                  |
| `npm run start`      | Sobe o build de produção                           |
| `npm run export`     | Build 100% estático em `out/` (Netlify, S3, Pages) |
| `npm run typecheck`  | `tsc --noEmit`                                     |
| `npm run lint`       | ESLint                                             |
| `npm run verify`     | typecheck + lint + build — use no CI               |

---

## Antes de publicar

Três coisas precisam de você. Todas estão marcadas com `TODO` ou `⚠️` no código.

1. **`src/content/projects.ts`** — os quatro projetos são fictícios. Substitua por trabalho seu.
   As métricas estão marcadas como `status: 'placeholder'` e renderizam com borda tracejada e
   o texto "— definir": é impossível publicar sem perceber. Preencha com número que você
   consiga defender em entrevista (e preencha `source`), ou apague a métrica — o card funciona
   sem nenhuma.
2. **`src/content/profile.ts`** — handles de GitHub, LinkedIn e e-mail estão como placeholder.
3. **`src/content/skills.ts`** — os nomes de organização na trajetória são genéricos. Só troque
   por empregador real se você tiver autorização contratual para citá-lo nominalmente.

Opcional, mas recomendado: trocar a ilustração de pôr do sol por uma foto sua
(`src/components/sections/about-section.tsx`, componente `SunsetPortrait`). Portfólio com rosto
converte melhor.

---

## Arquitetura

Camadas com dependência apontando sempre para dentro:

```
src/
├── domain/          Entidades e contratos. Zero import de React, Next ou Tailwind.
│   ├── entities.ts      Project, Skill, Experience, Profile, Metric…
│   └── repository.ts    Interface PortfolioRepository
│
├── content/         Implementação do contrato + o conteúdo editorial.
│   ├── profile.ts | projects.ts | skills.ts
│   ├── static-repository.ts   implementa PortfolioRepository
│   └── index.ts               ponto único de composição
│
├── lib/             Utilitários puros: cn, tokens de acento, validação, config.
├── hooks/           Comportamento reutilizável de cliente.
├── components/
│   ├── ui/          Primitivas sem regra de negócio (Button, Dialog, Tabs…)
│   ├── layout/      Header, Footer, Logo
│   ├── sections/    Seções da página
│   └── effects/     Canvas, overlays, scroll reveal
└── app/             Rotas, metadata, fontes, CSS global
```

**O ganho concreto:** migrar o conteúdo para um CMS é escrever uma segunda classe que
satisfaça `PortfolioRepository` e trocar uma linha em `src/content/index.ts`. Nenhum componente
muda, porque nenhum componente conhece a origem dos dados.

---

## Decisões técnicas

**Tailwind CSS v4 com configuração CSS-first.** Tokens vivem em `@theme` dentro de
`globals.css` — não há `tailwind.config.js`. A paleta é autoral e teve contraste verificado:
todos os pares texto/fundo passam WCAG AA (o menor é 5,6:1). O mapa de acento → classe fica
em `src/lib/accent.ts` como objeto literal, porque template string (`` `border-${accent}-500` ``)
não sobrevive à varredura estática do Tailwind.

**Fontes auto-hospedadas via `next/font/local`.** Os `.woff2` estão em `src/fonts/` (Inter e
JetBrains Mono variáveis, Bebas Neue 400 — todos sob SIL Open Font License, licenças ao lado
dos arquivos). O build não depende de rede externa, não há requisição a terceiro em runtime
— o que também resolve o lado de privacidade de servir fonte a partir de domínio de terceiro —
e a versão fica travada no repositório. `next/font` continua entregando preload,
`font-display: swap` e métricas de fallback ajustadas.

**`<dialog>` nativo em vez de overlay manual.** `showModal()` entrega trap de foco, camada
superior, backdrop, inertização do resto da página e fechamento por Esc — tudo pelo navegador.
É menos código que qualquer implementação manual e mais correto que a maioria delas. Uma
pegadinha documentada no componente: o preflight do Tailwind aplica `margin: 0` a tudo e
derruba o `margin: auto` que o user-agent usa para centralizar o dialog; daí o `m-auto`
explícito.

**Validação própria em vez de Zod.** Medido no bundle, Zod custava 32 kB gzip para validar
quatro campos. `src/lib/validation.ts` faz o mesmo em ~70 linhas, com inferência de tipo a
partir do schema. Em um projeto com muitos schemas a conta inverte — trocar de volta é
reescrever só `contact-schema.ts`.

**Canvas com orçamento de CPU.** O gradiente de fundo é estático entre resizes, então é pintado
uma vez num canvas fora de tela e copiado com um `drawImage` por frame. O buffer é escalado por
`devicePixelRatio` (limitado a 2). O loop cancela no unmount, pausa em `visibilitychange` e
pausa quando o canvas sai da viewport.

**Web Audio agendado pelo relógio do áudio.** O rádio synthwave usa scheduler com lookahead em
vez de `setInterval` disparando notas: timer de JS deriva e é estrangulado em aba de fundo.
Nunca toca sozinho, para ao sair da aba e desliga inteiro sob `prefers-reduced-motion`.

**Um observer por página, não um por elemento.** Scroll reveal e scroll spy usam
`IntersectionObserver` único varrendo por atributo/id. Quarenta elementos revelados não
significam quarenta observers.

---

## Acessibilidade

Verificado com Playwright em build de produção:

- Skip link é o primeiro alvo de `Tab`.
- Dialog: trap de foco nativo (`:modal`), `aria-labelledby`/`aria-describedby`, Esc fecha e o
  foco volta ao botão que abriu.
- Tabs seguem o padrão WAI-ARIA: `role="tablist"`, roving tabindex, setas + Home/End.
- Formulário: `<label>` real em todo campo, `aria-invalid`, `aria-describedby` no erro e
  resultado anunciado em live region — sem roubar o foco.
- Contraste medido no DOM renderizado: 18,4:1 (corpo), 9,9:1 (mono), 5,7:1 (métricas).
- `prefers-reduced-motion` desliga canvas, reveal, transições e o rádio.
- Alvos de toque com no mínimo 44 px de altura.
- Zoom não é bloqueado (`maximumScale: 5`).
- Sem overflow horizontal a partir de 360 px.

---

## Formulário de contato

Não existe backend. Dois caminhos reais, nenhum terceiro:

- `NEXT_PUBLIC_CONTACT_ENDPOINT` vazio → o formulário valida e abre o cliente de e-mail com o
  corpo preenchido. Funciona inclusive em export estático.
- `NEXT_PUBLIC_CONTACT_ENDPOINT` preenchido → `POST` JSON `{ name, email, subject, message }`
  para o endpoint (Formspree, uma Lambda, uma Route Handler sua).

Copie `.env.example` para `.env.local` para configurar.

Se você for para a Vercel e preferir Server Action, o schema em `src/lib/contact-schema.ts` já
está pronto para rodar do lado do servidor — é a mesma definição, sem duplicar regra.

---

## Deploy

**Vercel:** importe o repositório. Nenhuma configuração extra.

**Estático (Netlify, S3, GitHub Pages):** `npm run export` e publique `out/`. Os headers de
segurança definidos em `next.config.ts` não se aplicam em export — configure-os no host.

---

## O que saiu da versão anterior, e por quê

| Removido                                            | Motivo                                                                      |
| --------------------------------------------------- | --------------------------------------------------------------------------- |
| Logo `R*`, "Rockstar Rating", "Vice City", wanted level, rodapé citando GTA VI | Marca e identidade visual de terceiro. A estética synthwave é gênero e permanece; a marca, não. |
| Tailwind via CDN                                    | Sem purge, sem build, FOUC e ~3 MB de CSS no cliente.                        |
| `onclick` inline                                    | Impede CSP restritiva e espalha lógica no HTML.                              |
| Barras de proficiência ("TypeScript 96%")           | Não é verificável nem comparável, e qualquer valor abaixo de 100% argumenta contra você. |
| Métricas `1.5M req/s`, `$450M`, `+45 missões`       | Inverificáveis. Viraram placeholders marcados.                               |
| Cursor customizado                                  | Duplicava o cursor nativo e atrapalhava a leitura da interface.              |
| Som em todo clique                                  | Hostil. O rádio ambiente continua, opt-in e desligado por padrão.            |
| Formulário com sucesso simulado por `setTimeout`    | Mentia para o visitante: a mensagem não ia a lugar nenhum.                   |
| Texto em 7px e 9px                                  | Reprova em qualquer auditoria de legibilidade.                               |
| Posicionamento "Fullstack Architect, +10 anos, Golang/Kafka/Istio/Rust" | Portfólio que promete Kafka entrega entrevista sobre Kafka. Reposicionado para Frontend Sênior, 7+ anos. |
