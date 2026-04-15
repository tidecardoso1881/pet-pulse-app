# 🗄️ Banco de Dados — PetPulse (Supabase)

> Schema inicial baseado nos requisitos do MVP. Será atualizado conforme o documento de requisitos for importado.

---

## Tabelas

### `profiles` (extensão do auth.users)
| Coluna | Tipo | Descrição |
|---|---|---|
| id | uuid (PK, FK auth.users) | ID do usuário |
| full_name | text | Nome completo |
| phone | text | Telefone |
| avatar_url | text | URL da foto |
| created_at | timestamptz | Criado em |
| updated_at | timestamptz | Atualizado em |

### `pets`
| Coluna | Tipo | Descrição |
|---|---|---|
| id | uuid (PK) | ID do pet |
| owner_id | uuid (FK profiles) | Dono do pet |
| name | text | Nome |
| species | text | dog, cat, bird, rabbit, other |
| breed | text | Raça |
| gender | text | male, female |
| birth_date | date | Data de nascimento |
| weight | numeric | Peso em kg |
| avatar_url | text | Foto do pet |
| notes | text | Observações |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `vets`
| Coluna | Tipo | Descrição |
|---|---|---|
| id | uuid (PK) | |
| full_name | text | Nome do veterinário |
| crmv | text | Registro CRMV |
| specialty | text | Especialidade |
| clinic_name | text | Nome da clínica |
| phone | text | |
| email | text | |
| address | text | |
| created_at | timestamptz | |

### `appointments`
| Coluna | Tipo | Descrição |
|---|---|---|
| id | uuid (PK) | |
| pet_id | uuid (FK pets) | |
| owner_id | uuid (FK profiles) | |
| vet_id | uuid (FK vets, nullable) | |
| type | text | routine, emergency, follow_up, vaccination, exam |
| status | text | scheduled, completed, cancelled |
| scheduled_at | timestamptz | Data/hora da consulta |
| notes | text | Observações |
| diagnosis | text | Diagnóstico |
| prescription | text | Prescrição |
| created_at | timestamptz | |
| updated_at | timestamptz | |

### `vaccines`
| Coluna | Tipo | Descrição |
|---|---|---|
| id | uuid (PK) | |
| pet_id | uuid (FK pets) | |
| vet_id | uuid (FK vets, nullable) | |
| name | text | Nome da vacina |
| administered_at | date | Data de aplicação |
| next_dose_at | date | Próxima dose |
| batch_number | text | Número do lote |
| notes | text | |
| created_at | timestamptz | |

---

## Row Level Security (RLS)

Todas as tabelas devem ter RLS habilitado. Regra base:
- Usuário só acessa dados onde `owner_id = auth.uid()`
- Vets são visíveis para todos os usuários autenticados
