# 🧠 KB — Next.js 14 Patterns no PetPulse

**Tipo:** Conhecimento Técnico  
**Módulo:** Frontend / Arquitetura  
**Atualizado:** Abril 2026

---

## Estrutura de Rotas (App Router)

```
src/app/
├── (auth)/          ← Grupo sem layout compartilhado (login, register)
│   ├── login/page.tsx
│   └── register/page.tsx
├── (dashboard)/     ← Grupo com layout do dashboard
│   ├── layout.tsx   ← Sidebar + Header compartilhados
│   ├── pets/page.tsx
│   ├── appointments/page.tsx
│   ├── vaccines/page.tsx
│   ├── vets/page.tsx
│   └── settings/page.tsx
└── page.tsx         ← Landing page (rota raiz "/")
```

## Server vs Client Components

| Situação | Usar |
|---|---|
| Busca dados do Supabase | Server Component |
| Formulário com estado | Client Component |
| Componente só visual | Server Component |
| Hook (useState, useEffect) | Client Component |
| onClick, onChange | Client Component |

Regra: **comece com Server Component, adicione `"use client"` só quando necessário.**

## Padrão de página com dados

```typescript
// Server Component — sem "use client"
import { createClient } from "@/lib/supabase/server"

export default async function PetsPage() {
  const supabase = await createClient()
  const { data: pets } = await supabase.from("pets").select("*")
  
  return <PetList pets={pets ?? []} />
}
```

## Padrão de formulário

```typescript
"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { petSchema } from "@/lib/validations/pet"

export function PetForm() {
  const form = useForm({ resolver: zodResolver(petSchema) })
  // ...
}
```

## Convenções de arquivos

- `page.tsx` → rota navegável
- `layout.tsx` → layout compartilhado
- `loading.tsx` → skeleton de loading
- `error.tsx` → boundary de erro
- `not-found.tsx` → 404
- `actions.ts` → Server Actions do módulo

## Shadcn/ui

Import direto de `@/components/ui/[componente]`
```typescript
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
```

## cn() helper

```typescript
import { cn } from "@/lib/utils/cn"

<div className={cn("base-class", condition && "conditional-class")} />
```
