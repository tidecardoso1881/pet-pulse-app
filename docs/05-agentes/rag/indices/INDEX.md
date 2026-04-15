# 📑 Índice do Knowledge Base — PetPulse RAG

> Use este índice para encontrar o arquivo de conhecimento correto antes de implementar.

---

## Por Módulo

| Módulo | Arquivo | Conteúdo |
|---|---|---|
| Produto / Domínio | `KB-dominio-petpulse.md` | Entidades, regras de negócio, glossário |
| Supabase | `KB-supabase.md` | Conexão, auth, RLS, storage, convenções |
| Next.js / Arquitetura | `KB-nextjs-patterns.md` | App Router, Server/Client, formulários |
| Requisitos Funcionais | `../../../01-produto/requisitos/` | Requisitos detalhados por módulo |
| Schema do Banco | `../../../01-produto/requisitos/banco-de-dados.md` | Tabelas e relações |

---

## Por Tema

| Tema | Onde buscar |
|---|---|
| Como conectar ao Supabase | `KB-supabase.md` |
| Como proteger uma rota | `KB-supabase.md` → Middleware |
| Como criar um formulário | `KB-nextjs-patterns.md` → Padrão de formulário |
| Regras de validação | `KB-dominio-petpulse.md` → Regras de Negócio |
| Nomenclatura de banco | `KB-supabase.md` → Convenções |
| Estrutura de pastas | `KB-nextjs-patterns.md` → Estrutura de Rotas |

---

## Como adicionar ao Knowledge Base

1. Crie um arquivo `KB-[módulo]-[tema].md` em `docs/05-agentes/rag/knowledge-base/`
2. Use o cabeçalho padrão (Tipo, Módulo, Atualizado)
3. Adicione uma linha neste índice
4. Referencie no `AGENTS.md` se necessário

---

*Índice mantido pelo Gerente (Claude Cowork)*
