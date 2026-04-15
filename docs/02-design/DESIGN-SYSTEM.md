# Design System — PetPulse

> **Fonte canônica:** `PetPulse-Documento-de-Requisitos` (Seção 2 — Identidade Visual)
> Empresa: Vital Biometry · 2026

---

## 1. Paleta de Cores

| Token Tailwind | Hex | Uso |
|---|---|---|
| `brand-dark` | `#1a4d35` | Títulos principais, textos de destaque |
| `brand` | `#2d7a57` | Botões primários, links, ícones ativos |
| `brand-accent` | `#43a87a` | Badges, hovers, gradientes |
| `brand-light` | `#e8f5ef` | Fundo de alertas positivos |
| `surface-page` | `#f5f2ec` | Fundo geral da página (bege) |
| `surface-card` | `#ffffff` | Cards, modais |
| `status-success` | `#2d7a57` | Resolvido / Em dia |
| `status-warning` | `#f59e0b` | Atenção / Medicações |
| `status-danger` | `#c62828` | Crítico / Alergias / Atrasadas |
| `status-info` | `#1565c0` | Informativo |
| `notify` | `#f59e0b` | Badge de notificações no header |

### Cores SOAP (Prontuário)
| Quadrante | Fundo | Borda |
|---|---|---|
| S — Subjetivo | `#e8f4fd` | `#1976d2` (azul) |
| O — Objetivo | `#e8f5e9` | `#388e3c` (verde) |
| A — Avaliação | `#fff8e1` | `#f9a825` (âmbar) |
| P — Plano | `#f3e5f5` | `#7b1fa2` (roxo) |

---

## 2. Tipografia

| Uso | Classe | Tamanho |
|---|---|---|
| Título H1 (Landing) | `text-h1-landing` | 3rem, bold |
| Título H2 (Seções) | `text-h2-section` | 2rem, bold |
| Título de tela (App) | `text-h1-app` / `.page-title` | 1.625rem, bold |
| Label de seção | `.section-label` | 0.75rem, uppercase, tracking |
| Corpo de texto | `text-body` | 0.9375rem |
| Label de formulário | `text-label` | 0.8125rem, semibold |

Fonte: **Geist Sans** (variável `--font-geist-sans`) carregada em `layout.tsx`.

---

## 3. Border Radius

| Token | Valor | Uso |
|---|---|---|
| `rounded-card` | 12px | Cards, modais |
| `rounded-btn` | 8px | Botões |
| `rounded-input` | 8px | Inputs, selects |
| `rounded-badge` | 20px | Badges, tags |
| `rounded-pill` | 9999px | Filter pills, busca global |

---

## 4. Sombras

| Token | Uso |
|---|---|
| `shadow-card` | Cards gerais |
| `shadow-card-sm` | Cards de status |
| `shadow-modal` | Modais |
| `shadow-header` | Header fixo |

---

## 5. Componentes

### Layout
| Componente | Arquivo | Descrição |
|---|---|---|
| `AppShell` | `layout/app-shell.tsx` | Wrapper do app logado (Sidebar + Header + main) |
| `Sidebar` | `layout/sidebar.tsx` | Menu lateral com navegação completa |
| `Header` | `layout/header.tsx` | Header global: busca + notificações + avatar |
| `PageHeader` | `layout/page-header.tsx` | Cabeçalho de cada página interna |

### UI Base
| Componente | Arquivo | Descrição |
|---|---|---|
| `Button` | `ui/button.tsx` | Variantes: primary, outline, ghost, danger, link |
| `Card` | `ui/card.tsx` | Card + CardHeader + CardTitle + CardContent + CardFooter |
| `Badge` | `ui/badge.tsx` | Variantes: green, orange, red, blue, gray, brand, notify |
| `Input` | `ui/input.tsx` | Input + Textarea + Label + FormField |
| `Select` | `ui/select.tsx` | Select baseado em Radix UI |

### Compostos
| Componente | Arquivo | Descrição |
|---|---|---|
| `Shelf` | `ui/shelf.tsx` | **Painel deslizante pelo lado direito** — substitui todos os popups/formulários |
| `Modal` | `ui/modal.tsx` | Dialog centralizado (uso reservado — preferir Shelf) |
| `StatusCard` | `ui/status-card.tsx` | Card de resumo numérico (topo de cada tela) |
| `EmptyState` | `ui/empty-state.tsx` | Estado vazio com ícone, texto e CTA |
| `FilterPills` | `ui/filter-pills.tsx` | Pills de filtro + ViewToggle (Lista/Calendário) |

---

## ⚠️ Regra: Todos os formulários usam Shelf

**Todos os formulários de criação/edição abrem como `Shelf` (painel pela direita), não como modal centralizado.**

Isso inclui: Adicionar Pet, Nova Consulta, Registrar Vacina, Novo Prontuário, Upload de Documento, Nova Tarefa, e qualquer outro formulário futuro.

### Como usar

```tsx
import { Shelf, ShelfTrigger, ShelfContent, ShelfHeader, ShelfTitle, ShelfBody, ShelfFooter, ShelfSubmit } from "@/components/ui";

<Shelf>
  <ShelfTrigger asChild>
    <Button>+ Adicionar Pet</Button>
  </ShelfTrigger>
  <ShelfContent size="md">
    <ShelfHeader>
      <ShelfTitle>Adicionar Pet</ShelfTitle>
    </ShelfHeader>
    <ShelfBody>
      {/* campos do formulário */}
    </ShelfBody>
    <ShelfFooter>
      <ShelfSubmit>Cadastrar Pet</ShelfSubmit>
    </ShelfFooter>
  </ShelfContent>
</Shelf>
```

### Tamanhos disponíveis
| `size` | Largura | Uso |
|---|---|---|
| `sm` | 400px | Formulários simples (ex: Nova Tarefa) |
| `md` | 480px | Padrão — maioria dos formulários |
| `lg` | 600px | Formulários com mais campos (ex: Prontuário SOAP) |
| `xl` | 720px | Formulários complexos ou com preview |

---

## 6. Padrões de UI

### Modal (formulários de criação)
Todos os formulários seguem este padrão:
1. `DialogHeader` com `DialogTitle`
2. `DialogBody` com campos `FormField` + `Input` / `Select`
3. `DialogFooter` com `DialogSubmit` (botão verde largura total)

### Estado vazio
Toda tela sem dados exibe `EmptyState` com:
- Ícone emoji (`🐾` para pets, `🛡️` para vacinas, etc.)
- Título e descrição conforme o protótipo
- Botão CTA de criação

### Cards de resumo
Telas com contadores usam `StatusCardGrid` com `StatusCard`:
- `variant="success"` → Em dia / Resolvidos
- `variant="warning"` → Próximas / Em tratamento
- `variant="danger"` → Atrasadas / Crítico

### Item ativo no Sidebar
```css
background: #e8f5ef;
color: #2d7a57;
```

---

## 7. Layout Global (App Logado)

```
┌─────────────────────────────────────────────────┐
│  Header (fixo, h=56px, left=240px)              │
├────────────┬────────────────────────────────────┤
│            │                                    │
│  Sidebar   │  main.app-main                     │
│  (240px,   │  (padding 2rem, min-h restante)     │
│   fixo)    │                                    │
│            │                                    │
└────────────┴────────────────────────────────────┘
```

Classe de uso:
```tsx
<AppShell user={user} notificationCount={4}>
  <PageHeader title="Meus Pets" subtitle="3 pets cadastrados" action={<Button>+ Adicionar</Button>} />
  {/* conteúdo */}
</AppShell>
```

---

## 8. Importações

```ts
// Componentes UI
import { Button, Card, Badge, Input, Modal, StatusCard, EmptyState, FilterPills } from "@/components/ui";

// Layout
import { AppShell, PageHeader } from "@/components/layout";
```
