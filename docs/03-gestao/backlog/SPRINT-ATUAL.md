# ⚡ Sprint 00 — Setup & Fundação

**Período:** Abril 2026  
**Objetivo:** Estrutura completa do projeto pronta para desenvolvimento  
**Sprint Master:** Gerente (Claude Cowork)  
**Desenvolvedor:** Especialista (Claude Code)

---

## 📊 Progresso

| Total | Done | In Progress | Blocked |
|---|---|---|---|
| 8 | 3 | 0 | 0 |

---

## ✅ Tasks

### Infraestrutura & Setup

---

**TASK-001: Estrutura do projeto Next.js**
- **Épico:** Setup
- **Status:** [✓] DONE
- **Estimativa:** 2h
- **Descrição:** Criar projeto Next.js 14 com TypeScript, Tailwind, Shadcn/ui e Supabase
- **Critérios de aceite:**
  - [x] Next.js 14 App Router instalado
  - [x] Tailwind CSS configurado
  - [x] Supabase client/server configurados
  - [x] Estrutura de pastas criada
  - [x] Tipos TypeScript definidos

---

**TASK-002: Ambiente de gestão e RAG**
- **Épico:** Setup
- **Status:** [✓] DONE
- **Estimativa:** 1h
- **Descrição:** Criar estrutura de sprints, gestão, knowledge base e AGENTS.md
- **Critérios de aceite:**
  - [x] Pasta 05-gestao com épicos e backlog
  - [x] AGENTS.md com protocolo de comunicação
  - [x] RAG knowledge base inicial
  - [x] Templates de sprint

---

**TASK-003: Importar documento de requisitos**
- **Épico:** Setup
- **Status:** [P] PLANNED
- **Estimativa:** 1h
- **Descrição:** Colar o documento de requisitos do Claude Web em `importacao/bruto/` e processar para `02-requisitos/`
- **Critérios de aceite:**
  - [ ] Documento importado em `importacao/bruto/requisitos-v1.md`
  - [ ] Processado e organizado em `02-requisitos/`
  - [ ] Épicos atualizados com base nos requisitos
  - [ ] Backlog do Sprint 01 refinado
- **Responsável:** Gerente

---

**TASK-004: Criar projeto no Supabase**
- **Épico:** Setup
- **Status:** [P] PLANNED
- **Estimativa:** 2h
- **Descrição:** Criar projeto no Supabase, executar migrations iniciais e configurar RLS
- **Critérios de aceite:**
  - [ ] Projeto criado em supabase.com
  - [ ] Tabelas criadas (profiles, pets, vets, appointments, vaccines)
  - [ ] RLS habilitado e políticas configuradas
  - [ ] Variáveis de ambiente preenchidas no .env.local
- **Notas técnicas:** Schema em `requisitos/banco-de-dados.md`
- **Responsável:** Especialista (após TASK-003)

---

**TASK-005: Deploy inicial no Vercel**
- **Épico:** Setup
- **Status:** [P] PLANNED
- **Estimativa:** 1h
- **Descrição:** Conectar repositório ao Vercel e fazer primeiro deploy
- **Critérios de aceite:**
  - [ ] Repositório no GitHub criado
  - [ ] Projeto conectado no Vercel
  - [ ] Variáveis de ambiente configuradas no Vercel
  - [ ] URL de preview funcionando
- **Responsável:** Especialista

---

**TASK-006: Configurar autenticação base Supabase**
- **Épico:** EP-01
- **Status:** [P] PLANNED
- **Estimativa:** 2h
- **Descrição:** Configurar Supabase Auth com email/senha e callback de autenticação
- **Critérios de aceite:**
  - [ ] Auth habilitado no Supabase
  - [ ] Trigger de criação de profile ao signup
  - [ ] Redirect URLs configurados
- **Responsável:** Especialista (após TASK-004)

---

## 📝 Notas do Sprint

- Aguardando: documento de requisitos do Claude Web
- Próximo passo do Gerente: colar requisitos em `importacao/bruto/`
- Próximo passo do Especialista: aguardar TASK-003 para TASK-004

---

## 🔄 Protocolo de atualização

O **Especialista** deve:
1. Mudar status de `[P] PLANNED` para `[→] IN PROG` ao começar
2. Mudar para `[?] REVIEW` ao terminar
3. Registrar o que foi feito em `04-sprints/sprint-00-setup/LOG.md`

O **Gerente** deve:
1. Validar tasks `[?] REVIEW`
2. Mudar para `[✓] DONE` ou detalhar ajustes necessários
