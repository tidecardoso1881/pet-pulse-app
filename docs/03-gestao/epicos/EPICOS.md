# 🗂️ Épicos — PetPulse

> Épicos são grandes áreas do produto. Cada épico agrupa features relacionadas.
> Baseado no protótipo: https://pet-pulse-care2.base44.app/
> Atualizado em: 14/04/2026

---

## Estrutura Geral

```
PetPulse
├── Páginas Públicas
│   └── EP-01 · Onboarding           /  e  /clinica-parceiro
├── Acesso
│   └── EP-00 · Autenticação         /login  /register  /reset-password
└── App (logado)
    ├── EP-02 · Painel Principal      /dashboard
    ├── EP-03 · Meus Pets             /pets
    ├── EP-04 · Prontuário Digital    /medical-records
    ├── EP-05 · Agenda de Cuidados    /appointments
    ├── EP-06 · Vacinas               /vaccines
    ├── EP-07 · Repositório de Exames /exams
    ├── EP-08 · Monitoramento Ativo   /health-monitoring
    ├── EP-09 · Localização GPS       /gps
    ├── EP-10 · Rotina e Alimentação  /routine
    ├── EP-11 · Marketplace           /marketplace
    ├── EP-12 · Notificações          /notifications
    ├── EP-13 · Configurações         /settings
    └── EP-14 · Gestão de Usuários    header → avatar
```

---

## EP-00 — Autenticação
**Objetivo:** Usuário consegue criar conta, acessar a plataforma e recuperar senha.
**Tipo:** Estrutural — pré-requisito para todos os épicos do app
**Status:** ⚪ Backlog

### Features
- FT-00-01 Cadastro com email e senha
- FT-00-02 Login / Logout
- FT-00-03 Recuperação de senha

---

## EP-01 — Onboarding
**Objetivo:** Visitante entende o produto, seus planos e decide se cadastrar (tutor) ou entrar em contato (clínica/parceiro).
**Tipo:** Páginas públicas — sem autenticação
**Status:** ⚪ Backlog

### Features
- FT-01-01 Landing Page Tutor (`/`) — Hero, Funcionalidades, Por que PetPulse, Planos, Depoimentos, Escolha seu Perfil, CTA Final, Footer
- FT-01-02 Landing Page Clínica-Parceiro (`/clinica-parceiro`) — Hero, Funcionalidades para Clínicas, Áreas de Produto, FAQ, CTA

---

## EP-02 — Painel Principal
**Objetivo:** Usuário tem visão geral consolidada da saúde dos seus pets ao fazer login.
**Rota:** `/dashboard`
**Status:** ⚪ Backlog

### Features
- FT-02-01 Cards de resumo (Próxima Consulta, Vacinas Pendentes, Medicações Ativas, Último Peso)
- FT-02-02 Ações rápidas (Agendar consulta, Novo prontuário, Upload de exame, Registrar vacina)
- FT-02-03 Banner de primeiro acesso (estado sem pets cadastrados)
- FT-02-04 Serviços próximos (mini-cards do marketplace)
- FT-02-05 Índice de saúde com barras de progresso
- FT-02-06 Gráfico de evolução de peso
- FT-02-07 Seção Meus Pets (miniaturas)
- FT-02-08 Próximos compromissos

---

## EP-03 — Meus Pets
**Objetivo:** Usuário cadastra, visualiza, edita e remove seus pets.
**Rota:** `/pets`
**Status:** ⚪ Backlog

### Features
- FT-03-01 Listagem de pets com busca e filtro por espécie
- FT-03-02 Estado vazio com CTA de cadastro
- FT-03-03 Modal — Adicionar Pet (Nome, Espécie, Sexo, Raça, Data de nascimento, Peso)
- FT-03-04 Editar dados do pet
- FT-03-05 Excluir pet
- FT-03-06 Upload de foto do pet

---

## EP-04 — Prontuário Digital
**Objetivo:** Usuário registra e acompanha o histórico clínico completo dos seus pets com formato SOAP.
**Rota:** `/medical-records`
**Status:** ⚪ Backlog

### Features
- FT-04-01 Cards de resumo (Total, Em Tratamento, Resolvidos, Em Aberto)
- FT-04-02 Card de alerta — Alergias Conhecidas
- FT-04-03 Card de alerta — Medicação Contínua
- FT-04-04 Filtros por pet e por status
- FT-04-05 Timeline de registros organizada por data
- FT-04-06 Expandir registro — visualização SOAP completa (S, O, A, P)
- FT-04-07 Modal — Novo Registro (Motivo, Veterinário, Clínica, Data, Status, Diagnóstico, Tratamento)

---

## EP-05 — Agenda de Cuidados
**Objetivo:** Usuário agenda e acompanha consultas e compromissos dos seus pets.
**Rota:** `/appointments`
**Status:** ⚪ Backlog

### Features
- FT-05-01 Alternância de visualização Lista / Calendário
- FT-05-02 Calendário mensal com eventos
- FT-05-03 Estado vazio
- FT-05-04 Modal — Nova Consulta (Pet, Tipo, Data, Horário, Clínica, Veterinário)
- FT-05-05 Editar agendamento
- FT-05-06 Cancelar agendamento

---

## EP-06 — Vacinas
**Objetivo:** Usuário mantém a carteira de vacinação digital dos seus pets.
**Rota:** `/vaccines`
**Status:** ⚪ Backlog

### Features
- FT-06-01 Cards de resumo (Em dia, Próximas, Atrasadas)
- FT-06-02 Listagem com filtro por status
- FT-06-03 Estado vazio
- FT-06-04 Modal — Registrar Vacina (Nome, Pet, Data de aplicação, Próxima dose, Fabricante, Clínica)
- FT-06-05 Editar / excluir registro de vacina

---

## EP-07 — Repositório de Exames
**Objetivo:** Usuário armazena, visualiza e baixa documentos e exames dos seus pets.
**Rota:** `/exams`
**Status:** ⚪ Backlog

### Features
- FT-07-01 Grid de documentos com busca e filtro por tipo (Hemograma, Imagem, Prescrição, Certificado, Recibo, Outro)
- FT-07-02 Card de documento (ícone por tipo, título, pet, data, descrição)
- FT-07-03 Visualizar documento
- FT-07-04 Baixar documento
- FT-07-05 Modal — Upload de Documento (Título, Pet, Tipo, Arquivo drag & drop, Observações)

---

## EP-08 — Monitoramento Ativo
**Objetivo:** Usuário acompanha o bem-estar diário dos seus pets com indicadores e gráficos.
**Rota:** `/health-monitoring`
**Status:** ⚪ Backlog

### Features
- FT-08-01 Seletor de pet (pills com foto)
- FT-08-02 Cards de status atual (Peso, Hidratação, Humor, Atividade, Sono, Apetite)
- FT-08-03 Gráfico — Evolução de Peso (área suave, linha verde)
- FT-08-04 Gráfico — Nível de Atividade (linha laranja)
- FT-08-05 Gráfico — Qualidade do Sono (linha verde)
- FT-08-06 Registrar novo monitoramento

---

## EP-09 — Localização GPS
**Objetivo:** Usuário rastreia a localização do pet em tempo real, define zonas seguras e recebe alertas.
**Rota:** `/gps`
**Status:** ⚪ Backlog

### Features
- FT-09-01 Mapa de localização em tempo real
- FT-09-02 Status de movimento (em movimento / parado)
- FT-09-03 Configuração de zona segura
- FT-09-04 Alerta de fuga / fora da zona segura
- FT-09-05 Histórico de rotas
- FT-09-06 Compartilhar rota

---

## EP-10 — Rotina e Alimentação
**Objetivo:** Usuário gerencia a rotina diária e a alimentação dos seus pets.
**Rota:** `/routine`
**Status:** ⚪ Backlog

### Features
- FT-10-01 Checklist de tarefas diárias por pet
- FT-10-02 Modal — Nova Tarefa
- FT-10-03 Marcar tarefa como concluída
- FT-10-04 Gestão de rotina de alimentação

---

## EP-11 — Marketplace
**Objetivo:** Usuário encontra e agenda serviços pet (clínicas, passeadores, banho e tosa, hospedagem, cuidadores, produtos).
**Rota:** `/marketplace`
**Status:** ⚪ Backlog

### Features
- FT-11-01 Grid de serviços com busca e filtros por categoria
- FT-11-02 Cards de serviço (nome, avaliação, distância, preço)
- FT-11-03 Tela de detalhes do serviço / clínica
- FT-11-04 Agendar serviço via marketplace

---

## EP-12 — Notificações
**Objetivo:** Usuário visualiza e gerencia suas notificações do sistema.
**Rota:** `/notifications`
**Status:** ⚪ Backlog

### Features
- FT-12-01 Lista de notificações por tipo (vacinas, medicações, consultas, exames)
- FT-12-02 Badge numérico no ícone do header
- FT-12-03 Marcar notificação como lida
- FT-12-04 Marcar todas como lidas

---

## EP-13 — Configurações
**Objetivo:** Usuário ajusta preferências de notificação, privacidade, dados e plano de assinatura.
**Rota:** `/settings`
**Status:** ⚪ Backlog

### Features
- FT-13-01 Seção Perfil do Usuário com link para edição
- FT-13-02 Preferências de notificação (Vacinas, Medicações, Consultas, Exames, Novidades)
- FT-13-03 Compartilhar dados com veterinários (toggle)
- FT-13-04 Privacidade e dados (configurar / exportar)
- FT-13-05 Gestão de plano e assinatura (ver planos, upgrade)
- FT-13-06 Sair da conta

---

## EP-14 — Gestão de Usuários
**Objetivo:** Usuário gerencia seus dados pessoais e foto de perfil pelo avatar no header.
**Acesso:** Header → avatar (iniciais / foto do usuário)
**Status:** ⚪ Backlog

### Features
- FT-14-01 Visualização do perfil (nome, email, avatar)
- FT-14-02 Upload e troca de foto de perfil
- FT-14-03 Edição de dados pessoais (nome, email)
- FT-14-04 Acesso rápido às Configurações

---

## Legenda de Status
- ⚪ Backlog — não iniciado
- 🟡 Planejado — definido para sprint
- 🔵 Em andamento
- 🟢 Concluído
- 🔴 Bloqueado

---

## Resumo

| # | Épico | Tipo | Status |
|---|---|---|---|
| EP-00 | Autenticação | Estrutural | ⚪ Backlog |
| EP-01 | Onboarding | Páginas públicas | ⚪ Backlog |
| EP-02 | Painel Principal | App | ⚪ Backlog |
| EP-03 | Meus Pets | App | ⚪ Backlog |
| EP-04 | Prontuário Digital | App | ⚪ Backlog |
| EP-05 | Agenda de Cuidados | App | ⚪ Backlog |
| EP-06 | Vacinas | App | ⚪ Backlog |
| EP-07 | Repositório de Exames | App | ⚪ Backlog |
| EP-08 | Monitoramento Ativo | App | ⚪ Backlog |
| EP-09 | Localização GPS | App | ⚪ Backlog |
| EP-10 | Rotina e Alimentação | App | ⚪ Backlog |
| EP-11 | Marketplace | App | ⚪ Backlog |
| EP-12 | Notificações | App | ⚪ Backlog |
| EP-13 | Configurações | App | ⚪ Backlog |
| EP-14 | Gestão de Usuários | App | ⚪ Backlog |
