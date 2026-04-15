# 🌿 Gitflow — PetPulse

> Estratégia de branches para não conflitar a main e garantir entregas seguras.

---

## Estrutura de Branches

```
main          → produção (Vercel deploy automático)
develop       → integração / preview (Vercel preview automático)
  └── feature/ep-XX-nome   → desenvolvimento de cada épico/feature
  └── hotfix/descricao     → correções urgentes em produção
```

---

## Regras

| Branch | Quem cria | Merge para | Proteção |
|---|---|---|---|
| `main` | — | — | ✅ Protegida — só via PR |
| `develop` | — | — | ✅ Protegida — só via PR |
| `feature/ep-XX-*` | Especialista | `develop` | Livre |
| `hotfix/*` | Especialista | `main` + `develop` | Livre |

---

## Nomenclatura de Branches

```
feature/ep-00-auth
feature/ep-01-onboarding
feature/ep-02-dashboard
feature/ep-03-pets
feature/ep-04-medical-records
feature/ep-05-appointments
feature/ep-06-vaccines
feature/ep-07-exams
feature/ep-08-health-monitoring
feature/ep-09-gps
feature/ep-10-routine
feature/ep-11-marketplace
feature/ep-12-notifications
feature/ep-13-settings
feature/ep-14-user-management

hotfix/descricao-curta
```

---

## Fluxo de Entrega

```
1. Especialista cria feature/ep-XX-nome a partir de develop
2. Implementa e faz commits
3. Abre PR: feature/ep-XX → develop
4. Vercel gera preview automático da PR
5. Tide revisa o preview
6. Gerente aprova o ticket (DONE)
7. Tide mergeia PR → develop
8. Quando épico completo: PR develop → main → produção
```

---

## Commits

Padrão **Conventional Commits**:

```
feat(ep-00): adicionar página de login
feat(ep-03): criar modal de cadastro de pet
fix(ep-05): corrigir validação de data no agendamento
chore: atualizar dependências
docs: atualizar AGENTS.md
```

---

## Deploy Automático (Vercel)

| Branch | Ambiente | URL |
|---|---|---|
| `main` | Produção | `pet-pulse-app.vercel.app` |
| `develop` | Staging | `pet-pulse-app-develop.vercel.app` |
| `feature/*` (PR) | Preview | URL único por PR |
