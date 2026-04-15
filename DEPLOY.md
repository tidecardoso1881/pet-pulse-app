# 🚀 DEPLOY.md — Guia de Deploy PetPulse

---

## Ambientes

| Ambiente | URL | Branch | Trigger |
|---|---|---|---|
| Preview | Automático Vercel | Qualquer PR | Push |
| Produção | petpulse.app (futuro) | `main` | Merge para main |

---

## Pré-requisitos

1. Conta no [Vercel](https://vercel.com)
2. Conta no [Supabase](https://supabase.com)
3. Repositório no GitHub

---

## Setup inicial (primeira vez)

### 1. Supabase

```bash
# 1. Crie um projeto em supabase.com
# 2. Acesse Settings → API
# 3. Copie: Project URL e anon public key
# 4. Cole no .env.local:
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxxx...
```

### 2. Banco de dados

Execute as migrations em ordem na aba SQL do Supabase:
```
SDD - Especificações/migrations/001_initial_schema.sql
SDD - Especificações/migrations/002_rls_policies.sql
```

### 3. Vercel

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Conectar projeto
vercel link

# Adicionar variáveis de ambiente
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Deploy
vercel --prod
```

---

## Deploy contínuo

Após o setup inicial, todo push para `main` faz deploy automático.

```bash
git add .
git commit -m "feat: descrição"
git push origin main
# Vercel deploy automático ✓
```

---

## Checklist pré-deploy

- [ ] Testes passando (`npm run test`)
- [ ] Build sem erros (`npm run build`)
- [ ] Variáveis de ambiente configuradas no Vercel
- [ ] Migrations executadas no Supabase
- [ ] Sprint atual atualizado em `05-gestao/backlog/SPRINT-ATUAL.md`
