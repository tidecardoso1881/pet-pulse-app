# 🤝 AGENTS.md — Canal de Comunicação PetPulse
> Protocolo oficial entre Gerente (Cowork) e Especialista (Code).
> **Este arquivo é lido automaticamente pelo Claude Code ao abrir o projeto.**

---

## ⚡ REGRA #1 — STARTUP OBRIGATÓRIO (sem exceção)

### Ao iniciar qualquer sessão, AMBOS os agentes devem:

**Especialista (Claude Code) — faça SEMPRE ao abrir o projeto:**
```
1. Leia docs/04-comunicacao/especialista/inbox/
2. Execute todos os tickets pendentes (status ≠ [✓] DONE)
3. Só então siga o comando do usuário
```

**Gerente (Claude Cowork) — faça SEMPRE ao iniciar uma sessão:**
```
1. Leia docs/04-comunicacao/gerente/inbox/
2. Processe todas as mensagens (mova lidas para gerente/lidas/)
3. Atualize o KANBAN.md
4. Só então siga o comando do usuário
```

> ⚠️ Nenhum agente deve executar tarefas novas antes de processar o inbox.

---

## 👥 Papéis

| Agente | Ferramenta | Papel |
|---|---|---|
| **Gerente (GM)** | Claude Cowork | Produto, gestão, tickets, revisão, KANBAN |
| **Especialista (E1)** | Claude Code | Implementação, testes, PRs, arquitetura técnica |

---

## 📁 Estrutura de Comunicação

```
docs/04-comunicacao/
├── KANBAN.md                    ← quadro geral do projeto
├── especialista/
│   └── inbox/                   ← Gerente escreve tickets aqui para o E1
│       └── TICKET-[id]_[desc]_[data].md
└── gerente/
    ├── inbox/                   ← E1 deixa relatórios aqui para o Gerente
    │   └── RELATORIO-[id]_[desc]_[data].md
    └── lidas/                   ← Gerente move aqui após processar
```

---

## 🔄 Fluxo de Trabalho

```
Gerente cria ticket
      ↓
Escreve em especialista/inbox/
      ↓
Avisa o Tide → Tide aciona o E1
      ↓
E1 lê inbox → implementa → abre PR
      ↓
E1 escreve relatório em gerente/inbox/
      ↓
Na próxima sessão, Gerente lê inbox automaticamente
      ↓
Gerente revisa PR → atualiza KANBAN → cria próximo ticket
```

---

## 📄 Formato de Ticket (Gerente → Especialista)

**Nome do arquivo:** `TICKET-[ID]_[descricao-curta]_[DDMMAAAA].md`

**Conteúdo:**
```markdown
# TICKET-[ID]: [Título]

- **Épico:** EP-XX · **Feature:** FT-XX-XX
- **Status:** [R] READY
- **Prioridade:** Alta / Média / Baixa
- **Estimativa:** Xh
- **Branch:** feat/ep-XX-[nome]

## Descrição
O que precisa ser feito.

## Critérios de Aceite
- [ ] Critério 1
- [ ] Critério 2

## Notas Técnicas
Detalhes de implementação, arquivos afetados, dependências.

## Arquivos Principais
- `src/app/...`
- `src/components/...`
```

---

## 📄 Formato de Relatório (Especialista → Gerente)

**Nome do arquivo:** `RELATORIO-[ID]_[descricao-curta]_[DDMMAAAA].md`

**Conteúdo:**
```markdown
# RELATÓRIO-[ID]: [Título do Ticket]

- **Ticket:** TICKET-[ID]
- **Status:** [✓] DONE / [?] REVIEW / [✗] BLOCKED
- **PR:** #[número] · Branch: feat/ep-XX-[nome]
- **Tempo real:** Xh

## O que foi feito
Resumo da implementação.

## Arquivos modificados
- `src/...`

## Observações / Bloqueios
Se houver algum problema ou dúvida.
```

---

## 📊 Status de Tickets

| Código | Significado |
|---|---|
| `[ ]` | BACKLOG — catalogado, não priorizado |
| `[P]` | PLANNED — planejado para o sprint |
| `[R]` | READY — refinado, pronto para dev |
| `[→]` | IN PROGRESS — em desenvolvimento |
| `[?]` | REVIEW — aguardando revisão do Gerente |
| `[✓]` | DONE — concluído e validado |
| `[✗]` | BLOCKED — bloqueado (motivo no ticket) |

---

## 🔧 Regras do Especialista (Claude Code)

1. **SEMPRE** leia `docs/04-comunicacao/especialista/inbox/` ao iniciar
2. Execute os tickets na ordem em que estão na fila
3. **Nunca implemente** sem ticket `[R] READY` correspondente
4. Ao terminar: abra PR, escreva relatório em `gerente/inbox/`
5. Se bloqueado: atualize o ticket para `[✗]` e explique no relatório
6. **Nunca modifique** arquivos em `docs/01-produto/` ou `docs/03-gestao/epicos/`
7. Siga o design system em `docs/02-design/DESIGN-SYSTEM.md`
8. Consulte `docs/05-agentes/rag/knowledge-base/` antes de implementar

---

## 🔧 Regras do Gerente (Claude Cowork)

1. **SEMPRE** leia `docs/04-comunicacao/gerente/inbox/` ao iniciar
2. Mova mensagens processadas para `gerente/lidas/`
3. Mantenha o `KANBAN.md` sempre atualizado
4. **Nunca modifique** código em `src/` — delegue ao Especialista
5. Refine bem o ticket antes de marcar como `[R] READY`
6. Valide PRs e feche o ciclo no KANBAN

---

## 🚀 Stack (referência rápida)

```
Next.js 14 (App Router) + TypeScript
Tailwind CSS + Radix UI
Supabase (DB + Auth + Storage)
React Hook Form + Zod
Vercel (deploy)
Design System: docs/02-design/DESIGN-SYSTEM.md
```

---

## 📍 Onde encontrar o quê

| O quê | Onde |
|---|---|
| Épicos e Features | `docs/03-gestao/epicos/EPICOS.md` |
| KANBAN | `docs/04-comunicacao/KANBAN.md` |
| Inbox do Especialista | `docs/04-comunicacao/especialista/inbox/` |
| Inbox do Gerente | `docs/04-comunicacao/gerente/inbox/` |
| Design System | `docs/02-design/DESIGN-SYSTEM.md` |
| Requisitos | `docs/01-produto/insumos/wireframes/PetPulse-Documento-de-Requisitos.md` |
| Screenshots | `docs/01-produto/insumos/images/` |
| Knowledge Base | `docs/05-agentes/rag/knowledge-base/` |

---

*Versão 2.0 — Abril 2026 · Gerente: Claude Cowork · Especialista: Claude Code*
