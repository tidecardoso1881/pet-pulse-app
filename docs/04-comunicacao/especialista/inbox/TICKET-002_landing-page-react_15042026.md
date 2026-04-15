# TICKET-002: Implementação Landing Page — React/Next.js

- **Épico:** EP-LANDING · **Feature:** Landing Pages (Tutor + Clínicas)
- **Status:** [R] READY
- **Prioridade:** Alta
- **Branch:** `feature/ep-landing-page` (criada a partir de `develop`)
- **Estimativa:** 4–6h

---

## 🎯 Objetivo

Implementar as duas landing pages do PetPulse em Next.js/React, fiéis ao protótipo HTML aprovado.
O protótipo HTML é a **referência visual absoluta** — qualquer dúvida de layout, consulte-o primeiro.

**Protótipo aprovado:** `docs/01-produto/prototipos/EP-LANDING-prototipo.html`
**Imagens de referência:** `docs/01-produto/insumos/images/00_Epico 1/`

---

## 📐 Skills recomendadas

Antes de iniciar, carregar as seguintes skills (em ordem):

1. `react-nextjs-development` — padrões App Router, Server Components, Tailwind
2. `nextjs-best-practices` — boas práticas de roteamento, metadata, otimização
3. `mobile-responsiveness` — breakpoints e layout responsivo

---

## 📁 Estrutura de arquivos a criar

```
src/app/
├── page.tsx                          ← Landing Tutor (/)
├── clinica-parceiro/
│   └── page.tsx                      ← Landing Clínicas (/clinica-parceiro)
│
src/components/landing/
├── Header.tsx                        ← Header sticky compartilhado (tutor)
├── Hero.tsx                          ← Seção hero empilhada
├── Features.tsx                      ← Grid 6 cards funcionalidades
├── WhyPetPulse.tsx                   ← Checklist + metrics card
├── Plans.tsx                         ← 4 cards de planos
├── Testimonials.tsx                  ← 3 depoimentos
├── ProfileChooser.tsx                ← 2 cards de perfil
├── CtaFinal.tsx                      ← CTA final
├── Footer.tsx                        ← Footer compartilhado
│
├── clinic/
│   ├── HeaderClinic.tsx              ← Header da página clínicas (← Voltar)
│   ├── HeroClinic.tsx                ← Hero claro centrado
│   ├── FeaturesClinic.tsx            ← 3 cards funcionalidades
│   ├── Included.tsx                  ← 3 colunas checklists
│   ├── Faq.tsx                       ← Accordion FAQ
│   └── CtaClinic.tsx                 ← CTA light green
```

---

## 🎨 Design Tokens (Tailwind config)

Adicionar em `tailwind.config.ts`:

```ts
colors: {
  brand: {
    DEFAULT: '#2d7a57',
    dark:    '#1a4d35',
    accent:  '#43a87a',
    light:   '#edf7f1',
    ultra:   '#f4fbf7',
  },
  surface: '#FAF9F7',   // seções alternadas (mais escuro)
  // fundo base da página usa '#FDFDFC' (substituir o white padrão)
  text: {
    DEFAULT: '#111827',
    2:       '#374151',
    muted:   '#6b7280',
  },
  border: '#e5e7eb',
},
borderRadius: {
  sm:  '8px',
  DEFAULT: '12px',
  lg:  '20px',
},
fontFamily: {
  sans: ['Inter', 'system-ui', 'sans-serif'],
},
```

---

## 📄 Página 1 — Landing Tutor (`/`)

### Header (sticky)
- Fundo branco com `backdrop-blur`, borda inferior `border-b border-border`
- Logo: ícone SVG verde-escuro + "PetPulse" bold
- Direita: link "Para clínicas" → `/clinica-parceiro` | botão ghost "Entrar" | botão primário verde "Começar agora"

### Hero (empilhado — NÃO split)
- Badge: dot pulsante + "Plataforma de Saúde Pet"
- H1: `Toda a saúde do seu pet <span className="text-brand-accent">em um só lugar</span>`
- Subtítulo: ~17px, cor muted, max-width 500px
- 2 CTAs: `btn-primary` "Começar gratuitamente →" | `btn-outline` "Sua clínica ou parceiro"
- Imagem hero: `<Image>` com `src="/images/hero-dog.png"` width full, height 380, object-cover, border-radius 20px
  - Arquivo original: `docs/01-produto/insumos/images/00_Epico 1/01_1_hero-dog.png` → copiar para `public/images/hero-dog.png`

### Features ("FUNCIONALIDADES GERAIS")
- Fundo `bg-surface`
- Grid `grid-cols-3 gap-5`
- 6 cards (fundo branco, border, border-radius 12px, hover lift):

| Ícone | Título | Texto |
|---|---|---|
| 📋 | Prontuário Digital Completo | Centralize todo o histórico médico do seu pet em um só lugar, com registros SOAP profissionais e veterinários. |
| 🔔 | Lembretes Inteligentes | Nunca mais perca uma vacina ou medicação. Alertas automáticos para todas as vacinas e lembretes automáticos. |
| 📈 | Monitoramento de Saúde | Acompanhe a saúde do seu pet com inteligência, com alertas de problemas de saúde com dados detalhados. |
| 📍 | Localização GPS em Tempo Real | Rastreamento com GPS, zonas de segurança e alertas de fuga. Sempre saiba onde seu pet está. |
| 👨‍👩‍👧 | Acesso Familiar Compartilhado | Toda a família conectada ao redor do pet, com visibilidade e rotinas sincronizadas. |
| 🧠 | Insights Preventivos | Alertas preventivos para antecipar problemas de saúde antes que ocorram. |

### Why PetPulse ("POR QUE PETPULSE?")
- Fundo branco
- Grid `grid-cols-2 gap-16`
- **Esquerda:** label + título "Cuidado preventivo, saúde preditiva" + subtítulo + checklist 8 itens com círculo verde ✓
- **Direita:** card branco (border + shadow) com 3 barras animadas:
  - "Vacinas em dia" → 94% verde `#43a87a`
  - "Consultas realizadas" → 87% laranja `#f59e0b`
  - "Rotina em dia" → 76% azul `#3b82f6`
  - ⚠️ Barras animam ao entrar no viewport (usar `IntersectionObserver` ou `framer-motion`)

### Planos ("OS PLANOS")
- Fundo `bg-surface`
- Grid `grid-cols-4 gap-4`
- ⚠️ **Preços corretos (confirmar nas imagens):**

| Plano | Preço | Badge | Estilo |
|---|---|---|---|
| Gratuito | R$0,00/mês | — | borda cinza simples |
| Essencial | **R$25,00**/mês | MAIS POPULAR (verde) | `border-brand` + borda espessa |
| Premium | **R$45,00**/mês | RECOMENDADO (laranja) | borda normal + badge laranja |
| Família | R$69,00/mês | MULTIPET (roxo) | borda normal + badge roxo |

### Depoimentos ("DEPOIMENTOS")
- Fundo `bg-surface`
- 3 cards com **fundo branco** (não bege!) + border + box-shadow leve
- Estrutura: estrelas ★★★★★ → texto → linha divisória → nome bold + cargo em `text-brand`

| Texto | Autor | Cargo |
|---|---|---|
| "Com o PetPulse, nunca mais esqueci uma vacina. Meus pets estão sempre com a saúde em dia!" | Mariana Costa | Tutora de 2 pets |
| "Revolucionou a forma como acompanho meus pacientes. Os prontuários digitais são impecáveis." | Dr. Rafael Souza | Veterinário |
| "A interface é linda e super intuitiva. Consigo gerenciar a rotina dos meus gatos facilmente." | Juliana Mendes | Tutora de 3 gatos |

### Escolha seu Perfil ("ESCOLHA SEU PERFIL")
- Fundo branco
- 2 cards centralizados (max-width 760px), hover com borda verde
- ⚠️ **Sem bullet list** — só ícone + título + parágrafo descritivo + link arrow

| Card | Ícone | Título | Descrição | Link |
|---|---|---|---|---|
| Tutor | 🐾 | Sou Tutor | Cadastre seus pets, acompanhe a saúde, vacinas, consultas e acesse o Marketplace de serviços. | Começar agora → |
| Clínica | 🏥 | Sou Clínica ou Parceiro | Gerencie atendimentos, prontuários digitais, conecte-se com tutores e acesse relatórios avançados. | Conhecer a plataforma → |

### CTA Final
- Fundo `bg-brand-ultra`
- Título: "Pronto para cuidar melhor?"
- Sub: "Junte-se a mais de 12.000 tutores que já transformaram o cuidado dos seus pets."
- Botão primário verde "Começar gratuitamente →"

### Footer
- Fundo branco, borda superior
- Esquerda: logo PetPulse
- Direita: `© 2026 PetPulse · Vital Biometry. Todos os direitos reservados.`
- ⚠️ **Vital Biometry** — não "Sinergia Soft"

---

## 📄 Página 2 — Landing Clínicas (`/clinica-parceiro`)

### Header Clínicas (diferente do tutor)
- Sem links de navegação
- Esquerda: `← Voltar` (link para `/`)
- Centro: logo PetPulse
- Direita: botão primário "Falar com a equipe →"

### Hero (fundo CLARO — NÃO escuro)
- Background: `linear-gradient(160deg, #f4fbf7 0%, #edf7f1 50%, #ddf0e8 100%)`
- Centrado, max-width 800px
- Badge: 🏥 SOLUÇÕES PARA CLÍNICAS E PARCEIROS
- H1: "PetPulse para Clínicas, Veterinários e Parceiros" — "Clínicas, Veterinários e Parceiros" em `text-brand-accent`
- 2 CTAs: "Quero conhecer a plataforma →" | "Ver demonstração"

### Features Clínicas (3 cards, sem grid 3×2)
- Label: "FUNCIONALIDADES" · Título: "Tudo que sua clínica precisa"
- Grid `grid-cols-3` com 3 cards: Prontuário Digital | Gestão de Atendimentos | Relacionamento com Tutores

### O que está incluído (3 colunas checklists)
- Fundo `bg-surface`
- 3 cards: Setup & Onboarding | SaaS & Ferramentas | Relatórios & Dados

### FAQ Accordion (4 perguntas)
- Max-width 800px, centralizado
- Animação de abertura/fechamento suave

### CTA Clínica + Footer (igual ao tutor)

---

## ⚙️ Considerações técnicas

### Imagens
```bash
# Copiar hero para public/
cp "docs/01-produto/insumos/images/00_Epico 1/01_1_hero-dog.png" public/images/hero-dog.png
```

Usar `next/image` com `priority` no hero e `loading="lazy"` nas demais.

### Acessibilidade
- `alt` em todas as imagens
- Botões com `aria-label` quando necessário
- FAQ accordion com `aria-expanded`

### Metadata (SEO)
```tsx
// app/page.tsx
export const metadata: Metadata = {
  title: 'PetPulse — Toda a saúde do seu pet em um só lugar',
  description: 'Plataforma completa para centralizar prontuários, vacinas, exames e o dia a dia do seu companheiro.',
}

// app/clinica-parceiro/page.tsx
export const metadata: Metadata = {
  title: 'PetPulse para Clínicas e Parceiros',
  description: 'Prontuários digitais, gestão de atendimentos e relatórios avançados para clínicas veterinárias.',
}
```

### Responsividade (mobile-first)
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` para features
- `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` para planos
- Hero text: `clamp()` para font-size
- Imagem hero: height `240px md:320px lg:380px`

---

## ✅ Critérios de Aceite

- [ ] Rota `/` renderiza landing tutor completa
- [ ] Rota `/clinica-parceiro` renderiza landing clínicas completa
- [ ] Preços: Essencial R$25 · Premium R$45 · Família R$69
- [ ] Footer: "Vital Biometry" (não Sinergia Soft)
- [ ] Cards de depoimento têm fundo branco
- [ ] Profile chooser sem bullet list — só texto descritivo
- [ ] Barras do gráfico animam ao entrar no viewport
- [ ] Imagem hero carrega corretamente
- [ ] Build sem erros TypeScript: `npm run build`
- [ ] Responsivo em 375px (mobile), 768px (tablet), 1280px (desktop)
- [ ] Relatório escrito em `docs/04-comunicacao/gerente/inbox/`

---

## ⚠️ Atenção

- **Referência visual absoluta:** `docs/01-produto/prototipos/EP-LANDING-prototipo.html`
- Ajustes finos de espaçamento/layout podem ser feitos durante a implementação
- Não usar nenhuma lib de componentes (ShadCN, Radix) para a landing — CSS/Tailwind puro
- Não conectar ao Supabase — essa página é completamente estática
- Branch: `feature/ep-landing-page` → PR para `develop` ao finalizar
