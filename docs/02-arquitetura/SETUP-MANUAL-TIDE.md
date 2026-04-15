# 🛠️ Setup Manual — Tide (Ações no Browser)

> Este guia cobre as ações que só você pode fazer via interface web:
> criar o projeto Supabase, conectar o Vercel ao GitHub e configurar variáveis de ambiente.
>
> **Pré-requisito:** O Especialista (Claude Code) já fez o push do código para o GitHub.

---

## PARTE 1 — Supabase

### 1.1 Criar o Projeto

1. Acesse [supabase.com](https://supabase.com) e faça login
2. Clique em **"New Project"**
3. Preencha:
   - **Name:** `pet-pulse-app`
   - **Database Password:** (crie uma senha forte e guarde bem)
   - **Region:** `South America (São Paulo)` → `sa-east-1`
   - **Plan:** Free
4. Clique em **"Create new project"**
5. Aguarde ~2 minutos para o projeto ser criado

### 1.2 Pegar as Credenciais

1. No menu lateral, clique em **"Project Settings"** (ícone de engrenagem)
2. Clique em **"API"**
3. Copie e salve em local seguro:
   - **Project URL** → será a `NEXT_PUBLIC_SUPABASE_URL`
   - **anon / public key** → será a `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** (secret) → será a `SUPABASE_SERVICE_ROLE_KEY`

### 1.3 Executar o Schema SQL

1. No menu lateral, clique em **"SQL Editor"**
2. Clique em **"New query"**
3. Cole e execute o SQL abaixo **em partes** (uma tabela de cada vez se quiser ser cauteloso, ou tudo de uma vez):

```sql
-- ============================================================
-- TRIGGER: atualizar updated_at automaticamente
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- TABELA 1: profiles
-- ============================================================
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

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_only" ON profiles FOR ALL USING (id = auth.uid());

CREATE TRIGGER set_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABELA 2: pets
-- ============================================================
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

ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_only" ON pets FOR ALL USING (owner_id = auth.uid());
CREATE INDEX idx_pets_owner_id ON pets(owner_id);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON pets
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABELA 3: medical_records
-- ============================================================
CREATE TABLE medical_records (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id          UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  owner_id        UUID NOT NULL REFERENCES profiles(id),
  reason          TEXT NOT NULL,
  vet_name        TEXT,
  clinic_name     TEXT,
  date            DATE NOT NULL,
  status          TEXT NOT NULL DEFAULT 'open'
                  CHECK (status IN ('open', 'in_treatment', 'resolved')),
  subjective      TEXT,
  objective       TEXT,
  assessment      TEXT,
  plan            TEXT,
  diagnosis       TEXT,
  treatment       TEXT,
  return_date     DATE,
  created_at      TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE medical_records ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_only" ON medical_records FOR ALL USING (owner_id = auth.uid());
CREATE INDEX idx_medical_records_pet_id ON medical_records(pet_id);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON medical_records
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABELA 4: appointments
-- ============================================================
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

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_only" ON appointments FOR ALL USING (owner_id = auth.uid());
CREATE INDEX idx_appointments_pet_id ON appointments(pet_id);
CREATE INDEX idx_appointments_date ON appointments(date);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON appointments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABELA 5: vaccines
-- ============================================================
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

ALTER TABLE vaccines ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_only" ON vaccines FOR ALL USING (owner_id = auth.uid());
CREATE INDEX idx_vaccines_pet_id ON vaccines(pet_id);
CREATE INDEX idx_vaccines_next_dose ON vaccines(next_dose_date);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON vaccines
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABELA 6: exams
-- ============================================================
CREATE TABLE exams (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pet_id        UUID NOT NULL REFERENCES pets(id) ON DELETE CASCADE,
  owner_id      UUID NOT NULL REFERENCES profiles(id),
  title         TEXT NOT NULL,
  type          TEXT NOT NULL
                CHECK (type IN ('hemogram', 'image', 'prescription', 'certificate', 'receipt', 'other')),
  file_url      TEXT NOT NULL,
  file_name     TEXT,
  notes         TEXT,
  exam_date     DATE,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE exams ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_only" ON exams FOR ALL USING (owner_id = auth.uid());
CREATE INDEX idx_exams_pet_id ON exams(pet_id);

-- ============================================================
-- TABELA 7: health_monitoring
-- ============================================================
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

ALTER TABLE health_monitoring ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_only" ON health_monitoring FOR ALL USING (owner_id = auth.uid());
CREATE INDEX idx_health_pet_id ON health_monitoring(pet_id);

-- ============================================================
-- TABELA 8: routine_tasks
-- ============================================================
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

ALTER TABLE routine_tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_only" ON routine_tasks FOR ALL USING (owner_id = auth.uid());
CREATE INDEX idx_routine_pet_id ON routine_tasks(pet_id);

CREATE TRIGGER set_updated_at BEFORE UPDATE ON routine_tasks
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- TABELA 9: notifications
-- ============================================================
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

ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "owner_only" ON notifications FOR ALL USING (owner_id = auth.uid());
CREATE INDEX idx_notifications_owner ON notifications(owner_id, read);
```

4. Clique em **"Run"** (▶️) e confirme que executou sem erros

### 1.4 Criar os Storage Buckets

1. No menu lateral, clique em **"Storage"**
2. Clique em **"New bucket"** e crie os 3 buckets abaixo:

| Nome | Public? | Descrição |
|---|---|---|
| `pet-photos` | ❌ Privado | Fotos dos pets |
| `exams-documents` | ❌ Privado | Documentos e exames |
| `avatars` | ❌ Privado | Fotos de perfil do tutor |

3. Para cada bucket, após criar, vá em **"Policies"** e crie uma policy:
   - **Allowed operation:** All
   - **Policy definition:** `auth.uid()::text = (storage.foldername(name))[1]`

### 1.5 Configurar Autenticação

1. No menu lateral, clique em **"Authentication"** → **"Providers"**
2. Confirme que **Email** está habilitado
3. Em **"Auth"** → **"URL Configuration"**:
   - **Site URL:** `http://localhost:3000` (mudar depois para o domínio Vercel)
   - **Redirect URLs:** adicione `http://localhost:3000/**`

---

## PARTE 2 — Vercel

### 2.1 Criar o Projeto

1. Acesse [vercel.com](https://vercel.com) e faça login
2. Clique em **"Add New..."** → **"Project"**
3. Em **"Import Git Repository"**, busque por `pet-pulse-app`
4. Selecione `tidecardoso1881/pet-pulse-app`
5. Clique em **"Import"**

### 2.2 Configurar o Projeto

Na tela de configuração:
- **Framework Preset:** Next.js (detectado automaticamente)
- **Root Directory:** `./` (padrão)
- **Build Command:** `npm run build` (padrão)
- **Output Directory:** `.next` (padrão)

### 2.3 Adicionar Variáveis de Ambiente

Antes de fazer o primeiro deploy, clique em **"Environment Variables"** e adicione:

| Key | Value | Environment |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxx.supabase.co` | Production, Preview, Development |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGci...` | Production, Preview, Development |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` | Production, Preview, Development |

> ⚠️ Substitua os valores pelas credenciais copiadas no passo 1.2

### 2.4 Fazer o Deploy

1. Clique em **"Deploy"**
2. Aguarde o build (~2 minutos)
3. Ao concluir, você verá a URL de produção: `pet-pulse-app.vercel.app`

### 2.5 Configurar Deploy por Branch (Gitflow)

1. Vá em **"Settings"** → **"Git"**
2. Confirme que **"Production Branch"** está como `main`
3. Em **"Preview Branches"**, o Vercel automaticamente fará preview de qualquer branch/PR

### 2.6 Atualizar Supabase com URL do Vercel

1. Volte ao Supabase → **"Authentication"** → **"URL Configuration"**
2. Adicione a URL do Vercel nas **"Redirect URLs"**:
   - `https://pet-pulse-app.vercel.app/**`
   - `https://pet-pulse-app-*.vercel.app/**` (para previews)

---

## PARTE 3 — Criar o .env.local

Crie um arquivo `.env.local` na raiz do projeto (este arquivo **não vai para o GitHub**):

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key_aqui
```

---

## Checklist Final

- [ ] Supabase project criado em São Paulo
- [ ] 9 tabelas criadas sem erros
- [ ] 3 storage buckets criados (pet-photos, exams-documents, avatars)
- [ ] Vercel conectado ao GitHub
- [ ] Variáveis de ambiente adicionadas no Vercel
- [ ] `.env.local` criado na máquina local
- [ ] URL do Vercel adicionada no Supabase Auth

---

*Após completar tudo isso, avise o Gerente para iniciarmos o EP-00 (Autenticação).*
