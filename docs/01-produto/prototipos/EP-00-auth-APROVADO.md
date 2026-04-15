---
epico: EP-00
titulo: Autenticação
status: APROVADO
data_aprovacao: 2026-04-15
aprovado_por: Tide Cardoso
arquivo_prototipo: EP-00-auth-prototipo.html
---

# EP-00 — Autenticação · APROVADO ✅

Protótipo aprovado por Tide Cardoso em 15/04/2026.

## Telas aprovadas

1. **Login** — e-mail + senha + Google OAuth
2. **Cadastro** — nome, e-mail, telefone (opcional), senha + força + termos
3. **Código MFA — Login** — OTP 6 dígitos, timer, reenvio
4. **Código MFA — Cadastro** — OTP 6 dígitos com steps indicator
5. **Recuperar Senha** — e-mail + steps indicator
6. **Código MFA — Recuperação** — OTP 6 dígitos
7. **Criar Nova Senha** — força de senha + checklist de requisitos

## Decisões de design aprovadas

- Layout split: branding verde à esquerda / formulário bege à direita
- OTP com 6 caixas individuais, auto-avanço ao digitar
- Steps indicator (1/2/3) nos fluxos de recuperação e cadastro
- Indicador de força de senha em tempo real
- Checklist de requisitos na tela de nova senha
- Badge do e-mail mascarado nas telas de MFA
- Empresa: Sinergia Soft Tecnologia e Inovação

## Nota de repriorização

EP-00 ficará em espera. Antes da implementação, serão construídos:
- Landing Page (/) — EP-LANDING
- Para Clínicas e Parceiros (/clinica-parceiro) — EP-CLINICS
