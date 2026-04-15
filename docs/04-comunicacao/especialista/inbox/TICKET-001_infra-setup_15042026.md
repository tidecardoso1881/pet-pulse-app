# TICKET-001: Setup de Infraestrutura — GitHub + Gitflow

- **Épico:** EP-00 · **Feature:** Infraestrutura
- **Status:** [R] READY
- **Prioridade:** Alta
- **Estimativa:** 1h
- **Branch:** N/A (trabalho na main/develop diretamente)

---

## Descrição

Configurar o repositório GitHub do PetPulse do zero, com gitflow correto.
O repositório antigo foi deletado e um novo foi criado vazio.
URL do repo: `https://github.com/tidecardoso1881/pet-pulse-app.git`

---

## Critérios de Aceite

- [ ] Remote `origin` aponta para `https://github.com/tidecardoso1881/pet-pulse-app.git`
- [ ] Branch `main` existe no GitHub com todo o código atual
- [ ] Branch `develop` existe no GitHub criada a partir da `main`
- [ ] Commit inicial feito com mensagem `chore: initial project setup`
- [ ] `.gitignore` está correto (sem `node_modules`, `.env.local` etc.)
- [ ] Relatório escrito em `docs/04-comunicacao/gerente/inbox/`

---

## Notas Técnicas

### Passo a passo

```bash
# 1. Verificar autenticação do gh CLI
gh auth status

# 2. Confirmar que o repo existe (deve estar vazio ou recém criado)
gh repo view tidecardoso1881/pet-pulse-app

# 3. Dentro do projeto, configurar o remote
cd /caminho/do/projeto
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/tidecardoso1881/pet-pulse-app.git

# 4. Garantir que estamos na branch main
git checkout -b main 2>/dev/null || git checkout main

# 5. Verificar o .gitignore (já deve existir no projeto)
cat .gitignore

# 6. Fazer o commit inicial se necessário
git add .
git commit -m "chore: initial project setup

- Next.js 14 App Router + TypeScript
- Tailwind CSS com design tokens PetPulse
- Supabase client configurado
- Estrutura de documentação completa
- Sistema de comunicação multi-agente (AGENTS.md)"

# 7. Push da main
git push -u origin main

# 8. Criar e fazer push da branch develop
git checkout -b develop
git push -u origin develop

# 9. Voltar para develop (branch de trabalho)
git checkout develop
```

### Verificação final

```bash
# Confirmar branches no remoto
git branch -a

# Confirmar remote
git remote -v
```

### .gitignore mínimo esperado

```
node_modules/
.next/
.env.local
.env.*.local
*.log
.DS_Store
```

---

## ⚠️ Atenção

- **Não faça push de `.env.local`** — ele contém chaves secretas do Supabase
- Se o `gh auth status` falhar, pare e reporte no relatório — o Tide precisará reautenticar
- O Tide (usuário) já criou o repositório vazio no GitHub. Você só precisa fazer o push.

---

## Arquivos Principais

- `.gitignore` — verificar se está correto
- `AGENTS.md` — deve ir no commit inicial
- `docs/` — toda a documentação vai junto
- `src/` — código atual do projeto
