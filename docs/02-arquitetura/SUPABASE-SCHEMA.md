# 🗄️ Schema do Banco de Dados — PetPulse (Supabase)

> Baseado no documento de requisitos (Seção 20 — Entidades de Dados)
> Projeto Supabase: `pet-pulse-app` · Região: São Paulo (sa-east-1)

---

## Visão Geral

```
auth.users (Supabase nativo)
    └── profiles              ← dados do tutor
         └── pets             ← pets do tutor
              ├── medical_records     ← prontuários SOAP
              ├── appointments        ← consultas agendadas
              ├── vaccines            ← vacinas
              ├── exams               ← documentos/exames (+ Storage)
              ├── health_monitoring   ← monitoramento diário
              └── routine_tasks       ← rotina e alimentação

notifications                 ← notificações do sistema
```

---

## Tabelas

### 1. `profiles` — Perfil do Tutor
```sql
CREATE TABLE profiles (
  id          UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT,
  avatar_url  TEXT,
  plan        TEXT NOT NULL DEFAULT 'free'
              CHECK (plan IN ('free', 'essential', 'premium', 'family')),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 2. `pets` — Pets do Tutor
```sql
CREATE TABLE pets (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name          TEXT NOT NULL,
  species       TEXT NOT NULL CHECK (species IN ('dog', 'cat', 'other')),
  gender        TEXT CHECK (gender IN ('male', 'female')),
  breed         TEXT,
  birth_date    DATE,
  weight_kg     NUMERIC(5,2),
  photo_url     TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 3. `medical_records` — Prontuário Digital (SOAP)
```sql
CREATE TABLE medical_records (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id          UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  owner_id        UUID NOT NULL REFERENCES profiles(id),
  reason          TEXT NOT NULL,        -- motivo da consulta
  vet_name        TEXT,
  clinic_name     TEXT,
  date            DATE NOT NULL,
  status          TEXT NOT NULL DEFAULT 'open'
                  CHECK (status IN ('open', 'in_treatment', 'resolved')),
  -- SOAP
  subjective      TEXT,                 -- S: relato do tutor
  objective       TEXT,                 -- O: achados clínicos
  assessment      TEXT,                 -- A: diagnóstico
  plan            TEXT,                 -- P: tratamento e prescrição
  -- Alertas
  diagnosis       TEXT,
  treatment       TEXT,
  return_date     DATE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 4. `appointments` — Agenda de Cuidados
```sql
CREATE TABLE appointments (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id        UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  owner_id      UUID NOT NULL REFERENCES profiles(id),
  type          TEXT NOT NULL
                CHECK (type IN ('consultation', 'vaccine', 'surgery', 'return', 'other')),
  date          DATE NOT NULL,
  time          TIME,
  clinic_name   TEXT,
  vet_name      TEXT,
  status        TEXT NOT NULL DEFAULT 'scheduled'
                CHECK (status IN ('scheduled', 'completed', 'cancelled')),
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 5. `vaccines` — Carteira de Vacinação
```sql
CREATE TABLE vaccines (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id          UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  owner_id        UUID NOT NULL REFERENCES profiles(id),
  name            TEXT NOT NULL,
  application_date DATE NOT NULL,
  next_dose_date  DATE,
  manufacturer    TEXT,
  clinic_name     TEXT,
  status          TEXT NOT NULL DEFAULT 'up_to_date'
                  CHECK (status IN ('up_to_date', 'upcoming', 'overdue')),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 6. `exams` — Repositório de Exames
```sql
CREATE TABLE exams (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id        UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  owner_id      UUID NOT NULL REFERENCES profiles(id),
  title         TEXT NOT NULL,
  type          TEXT NOT NULL
                CHECK (type IN ('hemogram', 'image', 'prescription', 'certificate', 'receipt', 'other')),
  file_url      TEXT NOT NULL,  -- Supabase Storage
  file_name     TEXT,
  notes         TEXT,
  exam_date     DATE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 7. `health_monitoring` — Monitoramento Ativo
```sql
CREATE TABLE health_monitoring (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id        UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  owner_id      UUID NOT NULL REFERENCES profiles(id),
  date          DATE NOT NULL DEFAULT CURRENT_DATE,
  weight_kg     NUMERIC(5,2),
  hydration     TEXT CHECK (hydration IN ('normal', 'low', 'high')),
  mood          TEXT CHECK (mood IN ('active', 'calm', 'lethargic', 'agitated')),
  activity      TEXT CHECK (activity IN ('active', 'moderate', 'low')),
  sleep         TEXT CHECK (sleep IN ('good', 'normal', 'poor')),
  appetite      TEXT CHECK (appetite IN ('normal', 'low', 'high')),
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 8. `routine_tasks` — Rotina e Alimentação
```sql
CREATE TABLE routine_tasks (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id        UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  owner_id      UUID NOT NULL REFERENCES profiles(id),
  title         TEXT NOT NULL,
  type          TEXT CHECK (type IN ('feeding', 'medication', 'walk', 'grooming', 'other')),
  frequency     TEXT CHECK (frequency IN ('daily', 'weekly', 'custom')),
  time          TIME,
  completed     BOOLEAN NOT NULL DEFAULT FALSE,
  completed_at  TIMESTAMPTZ,
  notes         TEXT,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

### 9. `notifications` — Notificações do Sistema
```sql
CREATE TABLE notifications (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id      UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  pet_id        UUID REFERENCES pets(id),
  type          TEXT NOT NULL
                CHECK (type IN ('vaccine', 'medication', 'appointment', 'exam', 'system')),
  title         TEXT NOT NULL,
  message       TEXT,
  read          BOOLEAN NOT NULL DEFAULT FALSE,
  read_at       TIMESTAMPTZ,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
```

---

## Indexes
```sql
-- Performance nas queries mais comuns
CREATE INDEX idx_pets_owner_id          ON pets(owner_id);
CREATE INDEX idx_medical_records_pet_id ON medical_records(pet_id);
CREATE INDEX idx_appointments_pet_id    ON appointments(pet_id);
CREATE INDEX idx_appointments_date      ON appointments(date);
CREATE INDEX idx_vaccines_pet_id        ON vaccines(pet_id);
CREATE INDEX idx_vaccines_next_dose     ON vaccines(next_dose_date);
CREATE INDEX idx_exams_pet_id           ON exams(pet_id);
CREATE INDEX idx_health_pet_id          ON health_monitoring(pet_id);
CREATE INDEX idx_routine_pet_id         ON routine_tasks(pet_id);
CREATE INDEX idx_notifications_owner    ON notifications(owner_id, read);
```

---

## Row Level Security (RLS)

Todas as tabelas devem ter RLS ativado. Política padrão:

```sql
-- Tutor só vê seus próprios dados
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_only" ON pets
  FOR ALL USING (owner_id = auth.uid());

-- (Repetir para todas as tabelas)
```

---

## Storage Buckets

```
exams-documents/    → documentos e exames (privado, RLS por owner_id)
pet-photos/         → fotos dos pets (privado, RLS por owner_id)
avatars/            → fotos de perfil do tutor (privado)
```

---

## Trigger: atualizar updated_at automaticamente

```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Aplicar nas tabelas com updated_at
CREATE TRIGGER set_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
-- (repetir para pets, medical_records, appointments, vaccines, routine_tasks)
```
