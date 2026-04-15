# 🐾 PetPulse

> Plataforma web responsiva para gestão da saúde de pets.

---

## 🚀 Stack

| Camada | Tecnologia |
|---|---|
| Frontend | Next.js 14 (App Router) + TypeScript |
| Estilização | Tailwind CSS + Shadcn/ui |
| Banco de dados | Supabase (PostgreSQL) |
| Autenticação | Supabase Auth |
| Storage | Supabase Storage |
| Formulários | React Hook Form + Zod |
| Deploy | Vercel |

---

## 📁 Estrutura do Projeto

```
pet-pulse-app/
│
├── docs/                        # Toda documentação do projeto
│   ├── 01-produto/              # Visão, requisitos, SDD, insumos
│   │   ├── VISAO.md
│   │   ├── requisitos/          # Requisitos funcionais
│   │   ├── sdd/                 # Software Design Documents
│   │   └── insumos/             # Documentos brutos importados
│   ├── 02-arquitetura/          # Stack, decisões técnicas, diagramas
│   ├── 03-gestao/               # Épicos, features, backlog, sprints
│   │   ├── epicos/
│   │   ├── features/
│   │   ├── backlog/             # SPRINT-ATUAL.md + ROADMAP.md
│   │   └── sprints/             # Logs por sprint
│   ├── 04-qualidade/            # Planos e resultados de testes
│   └── 05-agentes/              # Protocolo e conhecimento dos agentes
│       ├── rag/                 # Knowledge base (RAG)
│       └── skills/              # Prompts e decisões
│
├── src/                         # Código-fonte da aplicação
│   ├── app/                     # Rotas Next.js (App Router)
│   ├── components/              # Componentes React
│   ├── lib/                     # Supabase, utils, validações
│   ├── types/                   # Tipos TypeScript
│   ├── hooks/                   # Custom hooks
│   ├── stores/                  # Estado global
│   └── constants/               # Constantes da aplicação
│
├── AGENTS.md                    # Protocolo de comunicação entre agentes
├── README.md
├── DEPLOY.md
└── MANUAL_USUARIO.md
```

---

## 🤝 Agentes

Este projeto é desenvolvido em colaboração por dois agentes:

- **Gerente (Claude Cowork)** — Produto, gestão, requisitos, sprints
- **Especialista (Claude Code)** — Implementação, testes, arquitetura

Ver `AGENTS.md` para o protocolo completo.

---

## ⚡ Como rodar localmente

```bash
npm install
cp .env.example .env.local
# Preencha as variáveis do Supabase no .env.local
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

---

## 📋 Sprint Atual → `docs/03-gestao/backlog/SPRINT-ATUAL.md`
## 🗺️ Roadmap → `docs/03-gestao/backlog/ROADMAP.md`
## 🧠 Knowledge Base → `docs/05-agentes/rag/indices/INDEX.md`
