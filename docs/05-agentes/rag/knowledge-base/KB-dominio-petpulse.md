# 🧠 KB — Domínio PetPulse

**Tipo:** Conhecimento de Domínio  
**Módulo:** Produto  
**Atualizado:** Abril 2026

---

## O que é o PetPulse?

PetPulse é uma plataforma web responsiva para gestão da saúde de pets.  
O produto conecta tutores de animais com informações centralizadas sobre seus pets:
consultas, vacinas, histórico médico e veterinários.

**Público-alvo:** Tutores de pets (cães, gatos, aves, coelhos) que querem organizar
a saúde dos seus animais de forma digital e centralizada.

---

## Entidades do Domínio

### Tutor (usuário autenticado)
- Pessoa física que possui um ou mais pets
- Cadastra e gerencia seus próprios pets
- Vê apenas seus próprios dados (RLS Supabase)

### Pet
- Animal cadastrado por um tutor
- Tem espécie, raça, sexo, data de nascimento, peso, foto
- Um tutor pode ter múltiplos pets
- Um pet pertence a um único tutor

### Consulta (Appointment)
- Visita ao veterinário, agendada ou passada
- Tipos: rotina, emergência, retorno, vacinação, exame
- Status: agendado, concluído, cancelado
- Pode ter diagnóstico e prescrição registrados

### Vacina
- Vacina aplicada em um pet
- Tem nome, data de aplicação, data da próxima dose, lote
- Gera alerta quando a próxima dose se aproxima

### Veterinário
- Profissional vinculado a consultas
- Cadastrado pelo tutor para reutilização
- Dados: nome, CRMV, especialidade, clínica, contato

---

## Regras de Negócio Principais

1. Um usuário só vê e edita seus próprios pets e dados
2. Consultas canceladas não podem ser reeditadas
3. A data de uma consulta não pode ser no passado ao criar
4. A próxima dose de vacina deve ser posterior à data de aplicação
5. Todo pet precisa ter nome e espécie obrigatoriamente
6. CRMV do veterinário é único no sistema

---

## Glossário

| Termo | Significado |
|---|---|
| Tutor | Dono do pet (usuário do sistema) |
| Consulta | Appointment — visita ao vet |
| Carteirinha | Histórico de vacinas do pet |
| CRMV | Registro profissional do veterinário |
| RLS | Row Level Security — isolamento de dados por usuário |
