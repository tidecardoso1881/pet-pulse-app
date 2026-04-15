# 🧠 KB — Supabase no PetPulse

**Tipo:** Conhecimento Técnico  
**Módulo:** Banco de Dados / Auth / Storage  
**Atualizado:** Abril 2026

---

## Conexão

- Client-side: `src/lib/supabase/client.ts` → `createBrowserClient`
- Server-side: `src/lib/supabase/server.ts` → `createServerClient`
- Middleware: `src/middleware.ts` → protege rotas autenticadas

## Variáveis de ambiente

```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY  (somente servidor)
```

## Padrão de query (Server Component)

```typescript
import { createClient } from "@/lib/supabase/server"

export default async function Page() {
  const supabase = await createClient()
  const { data, error } = await supabase.from("pets").select("*")
}
```

## Padrão de query (Client Component)

```typescript
"use client"
import { createClient } from "@/lib/supabase/client"

const supabase = createClient()
const { data } = await supabase.from("pets").select("*")
```

## Auth

- Login: `supabase.auth.signInWithPassword({ email, password })`
- Cadastro: `supabase.auth.signUp({ email, password })`
- Logout: `supabase.auth.signOut()`
- Sessão: `supabase.auth.getUser()`

## RLS — Row Level Security

Todas as tabelas têm RLS ativo. Padrão:
```sql
-- Tutor só vê seus próprios dados
CREATE POLICY "owner_only" ON pets
  FOR ALL USING (owner_id = auth.uid());
```

## Storage

- Bucket `avatars` → fotos de perfil e pets
- Bucket `documents` → exames e laudos
- Acesso público para avatars, privado para documents

## Convenções

- Sempre use `snake_case` nos nomes de colunas
- Timestamps sempre `timestamptz` (com timezone)
- PKs sempre `uuid` com `gen_random_uuid()` como default
- Soft delete com coluna `deleted_at` quando necessário
