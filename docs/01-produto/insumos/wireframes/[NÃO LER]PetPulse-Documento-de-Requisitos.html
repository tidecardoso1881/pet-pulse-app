<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>PetPulse – Documento de Requisitos</title>
<style>
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:'Segoe UI',Arial,sans-serif;color:#1a2e1a;background:#f5f2ec;line-height:1.6}
.cover{background:linear-gradient(135deg,#1a4d35,#2d7a57);color:#fff;padding:80px 60px;text-align:center}
.cover h1{font-size:3em;margin-bottom:16px;letter-spacing:-1px}
.cover .subtitle{font-size:1.3em;opacity:.85;margin-bottom:24px}
.cover .meta{font-size:.95em;opacity:.7;line-height:2.2}
.cover .badge{display:inline-block;background:rgba(255,255,255,.2);border:1px solid rgba(255,255,255,.4);border-radius:20px;padding:6px 18px;font-size:.9em;margin-bottom:30px}
.toc{background:#fff;border-left:4px solid #2d7a57;padding:32px 40px;margin:40px 60px;border-radius:8px;box-shadow:0 2px 12px rgba(0,0,0,.08)}
.toc h2{color:#2d7a57;margin-bottom:16px;font-size:1.3em}
.toc ol{padding-left:20px}
.toc li{margin:6px 0;font-size:.95em}
.toc a{color:#2d7a57;text-decoration:none;font-weight:500}
.toc a:hover{text-decoration:underline}
.section{margin:40px 60px 0;background:#fff;border-radius:12px;box-shadow:0 2px 16px rgba(0,0,0,.07);overflow:hidden}
.section-header{background:linear-gradient(90deg,#2d7a57,#43a87a);color:#fff;padding:24px 32px;display:flex;align-items:center;gap:14px}
.section-header .num{background:rgba(255,255,255,.25);border-radius:50%;width:36px;height:36px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:1em;flex-shrink:0}
.section-header h2{font-size:1.5em;font-weight:700}
.section-header .sub{font-size:.9em;opacity:.85;margin-top:2px}
.section-body{padding:32px}
.section-body h3{color:#2d7a57;font-size:1.15em;margin:24px 0 10px;padding-bottom:6px;border-bottom:2px solid #e8f5ef}
.section-body h3:first-child{margin-top:0}
.section-body h4{color:#1a4d35;font-size:1em;margin:16px 0 8px;font-weight:600}
.section-body p{margin:8px 0;font-size:.95em;color:#2a3a2a}
.section-body ul{padding-left:22px;margin:8px 0}
.section-body ul li{margin:4px 0;font-size:.95em}
table{width:100%;border-collapse:collapse;margin:12px 0;font-size:.9em}
th{background:#2d7a57;color:#fff;padding:10px 14px;text-align:left;font-weight:600}
td{padding:9px 14px;border-bottom:1px solid #e8f0e8}
tr:nth-child(even) td{background:#f5fbf7}
.route{background:#1a2e1a;color:#7fff90;padding:4px 10px;border-radius:4px;font-family:monospace;font-size:.85em}
.note{background:#fffde7;border-left:4px solid #f9a825;padding:12px 16px;border-radius:0 8px 8px 0;margin:12px 0;font-size:.9em}
.info{background:#e3f2fd;border-left:4px solid #1976d2;padding:12px 16px;border-radius:0 8px 8px 0;margin:12px 0;font-size:.9em}
.url-map{background:#1a2e1a;color:#a8ffc0;padding:20px;border-radius:8px;font-family:monospace;font-size:.85em;line-height:2;margin:12px 0;white-space:pre}
.grid-2{display:grid;grid-template-columns:1fr 1fr;gap:20px;margin:16px 0}
.grid-3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin:16px 0}
.card{background:#f8fdf9;border:1px solid #d4ead8;border-radius:8px;padding:16px}
.card h4{color:#2d7a57;margin-bottom:8px;font-size:.95em}
.card ul{padding-left:16px}
.card ul li{margin:3px 0;font-size:.88em}
.badge-green{background:#e8f5ef;color:#2d7a57;border:1px solid #b8dfc8;border-radius:20px;padding:3px 12px;font-size:.8em;font-weight:600;display:inline-block;margin:2px}
.badge-orange{background:#fff3e0;color:#e65c00;border:1px solid #ffcc80;border-radius:20px;padding:3px 12px;font-size:.8em;font-weight:600;display:inline-block;margin:2px}
.badge-blue{background:#e3f2fd;color:#1565c0;border:1px solid #90caf9;border-radius:20px;padding:3px 12px;font-size:.8em;font-weight:600;display:inline-block;margin:2px}
.badge-red{background:#fce4ec;color:#c62828;border:1px solid #f48fb1;border-radius:20px;padding:3px 12px;font-size:.8em;font-weight:600;display:inline-block;margin:2px}
.soap-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:12px 0}
.soap-s{background:#e8f4fd;border-left:4px solid #1976d2;padding:14px;border-radius:0 8px 8px 0}
.soap-o{background:#e8f5e9;border-left:4px solid #388e3c;padding:14px;border-radius:0 8px 8px 0}
.soap-a{background:#fff8e1;border-left:4px solid #f9a825;padding:14px;border-radius:0 8px 8px 0}
.soap-p{background:#f3e5f5;border-left:4px solid #7b1fa2;padding:14px;border-radius:0 8px 8px 0}
.soap-label{font-weight:700;font-size:1.05em;margin-bottom:3px}
.soap-sub{font-size:.8em;color:#666;margin-bottom:8px}
.divider{border:none;border-top:2px solid #e8f0e8;margin:24px 0}
.screen-img{width:100%;border-radius:8px;border:1px solid #e0e8e4;margin:14px 0;box-shadow:0 2px 10px rgba(0,0,0,.1);display:block}
.img-caption{font-size:.82em;color:#777;text-align:center;margin:-6px 0 16px;font-style:italic}
footer{background:#1a2e1a;color:#a8ffc0;text-align:center;padding:30px;margin-top:60px;font-size:.85em}
</style>
</head>
<body>

<!-- CAPA -->
<div class="cover">
  <div class="badge">📋 Documento de Requisitos Funcionais</div>
  <h1>🐾 PetPulse</h1>
  <div class="subtitle">Plataforma Completa de Saúde Pet</div>
  <div class="meta">
    Versão: 1.0 &nbsp;|&nbsp; Data: 14/04/2026<br>
    Baseado no protótipo: pet-pulse-care2.base44.app<br>
    Empresa: Vital Biometry<br>
    Elaborado por: Análise de Protótipo (Claude / Anthropic)
  </div>
</div>

<!-- ÍNDICE -->
<div class="toc">
  <h2>📑 Índice</h2>
  <ol>
    <li><a href="#s1">Visão Geral do Produto</a></li>
    <li><a href="#s2">Identidade Visual e Design System</a></li>
    <li><a href="#s3">Arquitetura de Páginas e Rotas</a></li>
    <li><a href="#s4">Landing Page — Tutor (/)</a></li>
    <li><a href="#s5">Landing Page — Clínicas e Parceiros (/clinica-parceiro)</a></li>
    <li><a href="#s6">Estrutura Global do App (Logado)</a></li>
    <li><a href="#s7">Painel Principal (/dashboard)</a></li>
    <li><a href="#s8">Meus Pets (/pets)</a></li>
    <li><a href="#s9">Prontuário Digital (/medical-records)</a></li>
    <li><a href="#s10">Agenda de Cuidados (/appointments)</a></li>
    <li><a href="#s11">Vacinas (/vaccines)</a></li>
    <li><a href="#s12">Repositório de Exames (/exams)</a></li>
    <li><a href="#s13">Monitoramento Ativo (/health-monitoring)</a></li>
    <li><a href="#s14">Localização GPS (/gps)</a></li>
    <li><a href="#s15">Rotina e Alimentação (/routine)</a></li>
    <li><a href="#s16">Marketplace (/marketplace)</a></li>
    <li><a href="#s17">Notificações (/notifications)</a></li>
    <li><a href="#s18">Configurações (/settings)</a></li>
    <li><a href="#s19">Planos e Assinatura</a></li>
    <li><a href="#s20">Entidades de Dados</a></li>
  </ol>
</div>

<!-- SEÇÃO 1 -->
<div class="section" id="s1">
  <div class="section-header">
    <div class="num">1</div>
    <div><h2>Visão Geral do Produto</h2><div class="sub">Propósito, perfis de usuário e modelo de negócio</div></div>
  </div>
  <div class="section-body">
    <h3>O que é o PetPulse?</h3>
    <p><strong>PetPulse</strong> é uma plataforma SaaS (Software as a Service) web e mobile voltada para a saúde e bem-estar de animais domésticos. Conecta tutores (donos de pets) a clínicas veterinárias, veterinários e parceiros de serviços.</p>
    <p><strong>Slogan:</strong> "Toda a saúde do seu pet em um só lugar"</p>
    <p><strong>Marca:</strong> PetPulse · Vital Biometry</p>

    <h3>Perfis de Usuário</h3>
    <div class="grid-2">
      <div class="card">
        <h4>🐾 Tutor</h4>
        <p>Dono(a) de um ou mais pets. Pode:</p>
        <ul>
          <li>Cadastrar e gerenciar seus pets</li>
          <li>Visualizar prontuários e histórico médico</li>
          <li>Registrar vacinas e exames</li>
          <li>Agendar consultas</li>
          <li>Monitorar saúde e bem-estar diário</li>
          <li>Rastrear localização GPS</li>
          <li>Gerenciar rotina e alimentação</li>
          <li>Acessar o Marketplace</li>
          <li>Compartilhar dados com veterinários</li>
        </ul>
      </div>
      <div class="card">
        <h4>🏥 Clínica / Veterinário / Parceiro</h4>
        <p>Profissional ou estabelecimento. Pode:</p>
        <ul>
          <li>Acessar prontuários digitais dos pacientes</li>
          <li>Registrar consultas com formato SOAP</li>
          <li>Gerenciar agenda de atendimentos</li>
          <li>Comunicar-se com tutores</li>
          <li>Acessar relatórios e insights de dados</li>
          <li>Aparecer no Marketplace da plataforma</li>
          <li>Receber novos pacientes organicamente</li>
        </ul>
      </div>
    </div>

    <h3>Modelo de Negócio</h3>
    <p>Freemium com planos de assinatura mensal. Quatro planos: <strong>Gratuito (R$0)</strong>, <strong>Essencial (R$29)</strong>, <strong>Premium (R$49)</strong> e <strong>Família (R$69)</strong>.</p>

    <h3>Premissas Técnicas</h3>
    <ul>
      <li>Plataforma 100% online — sem instalação de software</li>
      <li>Funciona em navegador web e app mobile</li>
      <li>Dados dos pacientes armazenados com segurança na nuvem</li>
      <li>Atualizações automáticas sem intervenção do usuário</li>
      <li>Copyright 2026 PetPulse · Vital Biometry</li>
    </ul>
  </div>
</div>

<!-- SEÇÃO 2 -->
<div class="section" id="s2">
  <div class="section-header">
    <div class="num">2</div>
    <div><h2>Identidade Visual e Design System</h2><div class="sub">Cores, tipografia, componentes e padrões visuais</div></div>
  </div>
  <div class="section-body">
    <h3>Paleta de Cores</h3>
    <table>
      <tr><th>Nome</th><th>Hex Aproximado</th><th>Uso</th></tr>
      <tr><td>Verde Escuro (Primary)</td><td><code>#1a4d35</code></td><td>Títulos principais, textos de destaque</td></tr>
      <tr><td>Verde Médio (Brand)</td><td><code>#2d7a57</code></td><td>Botões primários, links, ícones ativos</td></tr>
      <tr><td>Verde Menta (Accent)</td><td><code>#43a87a</code></td><td>Badges, hovers, gradientes</td></tr>
      <tr><td>Bege / Off-White (Background)</td><td><code>#f5f2ec</code></td><td>Fundo geral da página</td></tr>
      <tr><td>Branco</td><td><code>#ffffff</code></td><td>Cards, modais, superfícies</td></tr>
      <tr><td>Verde Claro (Sucesso)</td><td><code>#e8f5ef</code></td><td>Background de alertas positivos</td></tr>
      <tr><td>Laranja (Alerta)</td><td><code>#f59e0b</code></td><td>Medicações, alertas médios</td></tr>
      <tr><td>Vermelho claro (Crítico)</td><td><code>#fce4ec</code></td><td>Alergias, vacinas atrasadas</td></tr>
    </table>

    <h3>Logo e Marca</h3>
    <ul>
      <li><strong>Ícone:</strong> Coração verde com patinha integrada</li>
      <li><strong>Texto:</strong> "PetPulse" em negrito + subtexto "VITAL BIOMETRY" em caixa alta, menor</li>
      <li>Aparece no header global e no topo do menu lateral</li>
    </ul>

    <h3>Tipografia</h3>
    <table>
      <tr><th>Uso</th><th>Estilo</th></tr>
      <tr><td>Títulos H1 (Landing)</td><td>Sans-serif bold, ~48px, cor verde escuro</td></tr>
      <tr><td>Títulos H2 (Seções)</td><td>Sans-serif bold, ~32px, cor verde escuro</td></tr>
      <tr><td>Títulos de tela (App)</td><td>Sans-serif bold, ~26px, cor quase preto</td></tr>
      <tr><td>Subtítulos de seção</td><td>Sans-serif regular, cor verde médio, uppercase com espaçamento</td></tr>
      <tr><td>Corpo de texto</td><td>Sans-serif regular, ~15px, cor cinza-escuro</td></tr>
      <tr><td>Labels de formulário</td><td>Sans-serif semibold, ~13px</td></tr>
    </table>

    <h3>Componentes Visuais Padrão</h3>
    <div class="grid-3">
      <div class="card">
        <h4>Cards</h4>
        <ul>
          <li>Fundo branco</li>
          <li>Borda-radius 8–12px</li>
          <li>Box-shadow leve</li>
          <li>Borda 1px cinza claro</li>
        </ul>
      </div>
      <div class="card">
        <h4>Botões Primários</h4>
        <ul>
          <li>Fundo verde #2d7a57</li>
          <li>Texto branco bold</li>
          <li>Borda-radius 8px</li>
          <li>Padding 12px 24px</li>
        </ul>
      </div>
      <div class="card">
        <h4>Botões Outline</h4>
        <ul>
          <li>Fundo transparente</li>
          <li>Borda 1px cinza</li>
          <li>Texto escuro</li>
          <li>Hover: fundo cinza claro</li>
        </ul>
      </div>
      <div class="card">
        <h4>Inputs / Formulários</h4>
        <ul>
          <li>Borda 1px cinza</li>
          <li>Focus: borda verde</li>
          <li>Borda-radius 6–8px</li>
          <li>Placeholder cinza claro</li>
        </ul>
      </div>
      <div class="card">
        <h4>Badges / Tags</h4>
        <ul>
          <li>Verde: status positivo</li>
          <li>Laranja: atenção/médio</li>
          <li>Vermelho: crítico/alto</li>
          <li>Azul: informativo</li>
        </ul>
      </div>
      <div class="card">
        <h4>Ícones</h4>
        <ul>
          <li>Estilo outline/linear</li>
          <li>Cor verde-menta</li>
          <li>Fundo arredondado claro</li>
          <li>Tamanho 20–24px</li>
        </ul>
      </div>
    </div>

    <h3>Modais</h3>
    <p>Todos os formulários de criação/edição abrem em modais centralizados (overlay escuro no fundo), com:</p>
    <ul>
      <li>Título na parte superior em negrito</li>
      <li>Botão <strong>✕</strong> para fechar no canto superior direito</li>
      <li>Campos do formulário</li>
      <li>Botão primário verde na parte inferior (largura total)</li>
      <li>Largura ~450–680px; altura máxima scrollable</li>
    </ul>
  </div>
</div>

<!-- SEÇÃO 3 -->
<div class="section" id="s3">
  <div class="section-header">
    <div class="num">3</div>
    <div><h2>Arquitetura de Páginas e Rotas</h2><div class="sub">Mapa completo de URLs e fluxos de navegação</div></div>
  </div>
  <div class="section-body">
    <h3>Mapa de Rotas</h3>
    <div class="url-map">PetPulse
├── /                          → Landing Page (Tutor)
├── /clinica-parceiro          → Landing Page (Clínicas)
└── App (autenticado)
    ├── /dashboard             → Painel Principal
    ├── /pets                  → Meus Pets (listagem)
    │   └── /pets/:id          → Perfil do Pet
    ├── /medical-records       → Prontuário Digital
    ├── /appointments          → Agenda de Cuidados
    ├── /vaccines              → Vacinas
    ├── /exams                 → Repositório de Exames
    ├── /health-monitoring     → Monitoramento Ativo
    ├── /gps                   → Localização GPS
    ├── /routine               → Rotina e Alimentação
    ├── /marketplace           → Marketplace
    ├── /notifications         → Notificações
    └── /settings              → Configurações</div>

    <h3>Fluxos Principais</h3>
    <table>
      <tr><th>Fluxo</th><th>Caminho</th></tr>
      <tr><td>Tutor novo se cadastra</td><td>/ → Começar gratuitamente → cadastro → /dashboard</td></tr>
      <tr><td>Clínica conhece a plataforma</td><td>/ → Para clínicas → /clinica-parceiro → Falar com equipe</td></tr>
      <tr><td>Usuário faz login</td><td>/ → Entrar → /dashboard</td></tr>
      <tr><td>Adicionar primeiro pet</td><td>/dashboard → Cadastrar meu primeiro pet → modal → /pets</td></tr>
      <tr><td>Registrar consulta</td><td>/medical-records → Novo Registro → modal SOAP</td></tr>
      <tr><td>Agendar consulta</td><td>/appointments → Agendar Consulta → modal Nova Consulta</td></tr>
      <tr><td>Upload de exame</td><td>/exams → Upload de Documento → modal</td></tr>
    </table>

    <h3>Autenticação</h3>
    <div class="info">O protótipo utiliza login automático (sem tela de login visível). Em produção, implementar tela de login/cadastro com email e senha, OAuth (Google, Apple) e recuperação de senha. A rota <strong>/dashboard</strong> é protegida — redirecionar usuários não autenticados para a Landing Page.</div>
  </div>
</div>

<!-- SEÇÃO 4 - LANDING PAGE -->
<div class="section" id="s4">
  <div class="section-header">
    <div class="num">4</div>
    <div><h2>Landing Page — Tutor</h2><div class="sub">Rota: / (raiz do site)</div></div>
  </div>
  <div class="section-body">

    <h3>4.1 Header (Fixo / Sticky)</h3>
    <img src="data:image/jpeg;base64,HERO_PLACEHOLDER_1" class="screen-img" alt="Landing Page Hero" onerror="this.style.display='none'">
    <p>Barra superior fixa com:</p>
    <ul>
      <li><strong>Logo:</strong> ícone de coração-pata + texto "PetPulse" (alinhado à esquerda)</li>
      <li><strong>Nav link "Para clínicas":</strong> texto simples, leva para <span class="route">/clinica-parceiro</span></li>
      <li><strong>Botão "Entrar":</strong> outline, leva ao app <span class="route">/dashboard</span></li>
      <li><strong>Botão "Começar agora":</strong> verde primário, leva ao fluxo de cadastro</li>
    </ul>
    <div class="note">O header deve ser sticky (fixo no topo ao rolar a página) com fundo branco e leve sombra.</div>

    <h3>4.2 Seção Hero</h3>
    <p><strong>Badge:</strong> tag verde-menta com ícone de pulso cardíaco + texto "Plataforma de Saúde Pet"</p>
    <p><strong>Título H1 (destaque):</strong></p>
    <blockquote style="font-size:1.4em;font-weight:700;color:#1a4d35;padding:12px 0">"Toda a saúde do seu pet <span style="color:#2d7a57">em um só lugar</span>"</blockquote>
    <p>A segunda linha ("em um só lugar") deve aparecer em verde #2d7a57.</p>
    <p><strong>Subtítulo:</strong> "PetPulse é a plataforma completa para centralizar prontuários, vacinas, exames e o dia a dia do seu companheiro. Cuidado preventivo com a precisão que eles merecem."</p>
    <p><strong>CTAs lado a lado:</strong></p>
    <ul>
      <li>Botão primário verde: <strong>"Começar gratuitamente →"</strong></li>
      <li>Botão outline: <strong>"Sou clínica ou parceiro"</strong> → leva a /clinica-parceiro</li>
    </ul>

    <h3>4.3 Imagem Hero</h3>
    <p>Foto de cachorro Golden Retriever em close (olho), com overlay de ícone de pulso cardíaco em verde, estilo "tech biométrico". Imagem ocupa a largura total com cantos arredondados.</p>

    <h3>4.4 Seção Funcionalidades</h3>
    <p><strong>Label:</strong> <span style="color:#2d7a57;font-weight:600;font-size:.9em;letter-spacing:1px">FUNCIONALIDADES</span></p>
    <p><strong>Título:</strong> "Tudo que seu pet precisa, ao alcance da mão"</p>
    <p>Grid 3 colunas de cards:</p>
    <table>
      <tr><th>Ícone</th><th>Título</th><th>Descrição</th></tr>
      <tr><td>🛡️ Escudo</td><td>Prontuário Digital Completo</td><td>Centralize todo o histórico médico do seu pet em um só lugar, com registros SOAP profissionais.</td></tr>
      <tr><td>🔔 Sino</td><td>Lembretes Inteligentes</td><td>Nunca mais perca uma vacina ou medicação. Alertas automáticos para cada compromisso.</td></tr>
      <tr><td>📈 Pulso</td><td>Monitoramento de Saúde</td><td>Acompanhe peso, apetite, humor e atividade com insights visuais detalhados.</td></tr>
      <tr><td>📍 GPS Pin</td><td>Localização GPS em Tempo Real</td><td>Saiba sempre onde seu pet está com rastreamento GPS, zonas seguras e alertas de fuga.</td></tr>
      <tr><td>👥 Família</td><td>Acesso Familiar Compartilhado</td><td>Toda a família conectada ao cuidado do pet, com visibilidade e rotinas sincronizadas.</td></tr>
      <tr><td>⚡ Raio</td><td>Insights Preventivos</td><td>Análise comportamental e alertas preventivos para antecipar problemas de saúde antes que ocorram.</td></tr>
    </table>

    <h3>4.5 Seção "Por que PetPulse?"</h3>
    <p><strong>Label:</strong> "POR QUE PETPULSE?" &nbsp; <strong>Título:</strong> "Cuidado preventivo, saúde preditiva"</p>
    <p><strong>Subtítulo:</strong> "Mais do que um app, PetPulse é um sistema clínico completo que conecta tutores e veterinários em torno do que mais importa: a saúde do seu companheiro."</p>
    <p>Layout <strong>2 colunas</strong>: lista de benefícios (esquerda) + card de métricas (direita).</p>
    <p><strong>Lista de benefícios</strong> (ícone de check verde em cada item):</p>
    <ul>
      <li>Histórico médico completo e organizado</li>
      <li>Carteira de vacinação digital</li>
      <li>Agendamento de consultas integrado</li>
      <li>Monitoramento de bem-estar contínuo</li>
      <li>Localização GPS e zonas de segurança</li>
      <li>Compartilhamento seguro com veterinários</li>
      <li>Repositório de exames e documentos</li>
      <li>Alertas de fuga e modo pet perdido</li>
    </ul>
    <p><strong>Card de métricas</strong> (fundo branco, arredondado, lado direito):</p>
    <table>
      <tr><th>Métrica</th><th>Valor</th><th>Cor da barra</th></tr>
      <tr><td>Vacinas em dia</td><td>94%</td><td>Verde</td></tr>
      <tr><td>Consultas realizadas</td><td>87%</td><td>Amarelo/Laranja</td></tr>
      <tr><td>Aderência à rotina</td><td>78%</td><td>Azul</td></tr>
    </table>

    <h3>4.6 Seção de Planos</h3>
    <p><strong>Label:</strong> "PLANOS" &nbsp; <strong>Título:</strong> "Escolha o plano ideal para você"</p>
    <p><strong>Subtítulo:</strong> "Comece gratuitamente e evolua conforme sua família de pets crescer."</p>
    <p>Grid 2×2 com 4 cards de planos:</p>
    <div class="grid-2">
      <div class="card">
        <h4>Gratuito — R$ 0,00</h4>
        <p>Sem badge. Botão outline "Começar".</p>
        <ul>
          <li>Cadastro do pet</li>
          <li>Histórico básico de consultas</li>
          <li>Upload simples de documentos</li>
          <li>Agenda inicial de cuidados</li>
        </ul>
      </div>
      <div class="card">
        <h4>Essencial — R$ 29,00 <span class="badge-green">MAIS POPULAR</span></h4>
        <p>Badge verde no topo. Borda verde destacada. Botão primário verde "Começar".</p>
        <ul>
          <li>Histórico completo de saúde</li>
          <li>Armazenamento ilimitado de exames</li>
          <li>Agenda inteligente com lembretes</li>
          <li>Vacinas organizadas digitalmente</li>
          <li>Informações centralizadas do pet</li>
        </ul>
      </div>
      <div class="card">
        <h4>Premium — R$ 49,00 <span class="badge-orange">RECOMENDADO</span></h4>
        <p>Badge laranja no topo. Borda laranja. Botão outline "Começar".</p>
        <ul>
          <li>Tudo do Essencial</li>
          <li>Relatórios de saúde detalhados</li>
          <li>Recomendações por raça</li>
          <li>Alertas preventivos</li>
          <li>Insights automáticos por histórico</li>
        </ul>
      </div>
      <div class="card">
        <h4>Família — R$ 69,00 <span class="badge-blue">MULTI-PET</span></h4>
        <p>Badge azul. Card com aparência levemente desbotada/desabilitada ("Em breve"). Botão outline desabilitado.</p>
        <ul>
          <li>Tudo do Premium</li>
          <li>Múltiplos pets</li>
          <li>Compartilhamento com familiares</li>
          <li>Prioridade no suporte</li>
          <li>Comparação de planos e serviços</li>
        </ul>
      </div>
    </div>

    <h3>4.7 Seção Depoimentos</h3>
    <p><strong>Label:</strong> "DEPOIMENTOS" &nbsp; <strong>Título:</strong> "Quem usa, recomenda"</p>
    <p>Grid 3 colunas de cards de depoimento:</p>
    <table>
      <tr><th>Estrelas</th><th>Depoimento</th><th>Autor</th><th>Descrição</th></tr>
      <tr><td>⭐⭐⭐⭐⭐</td><td>"Com o PetPulse, nunca mais esqueci uma vacina. Meus pets estão sempre com a saúde em dia!"</td><td>Mariana Costa</td><td>Tutora de 2 pets</td></tr>
      <tr><td>⭐⭐⭐⭐⭐</td><td>"Revolucionou a forma como acompanho meus pacientes. Os prontuários digitais são impecáveis."</td><td>Dr. Rafael Souza</td><td>Veterinário</td></tr>
      <tr><td>⭐⭐⭐⭐½</td><td>"A interface é linda e super intuitiva. Consigo gerenciar a rotina dos meus gatos facilmente."</td><td>Juliana Mendes</td><td>Tutora de 3 gatos</td></tr>
    </table>

    <h3>4.8 Seção "Escolha seu Perfil"</h3>
    <p><strong>Label:</strong> "ESCOLHA SEU PERFIL" &nbsp; <strong>Título:</strong> "Como você quer usar o PetPulse?"</p>
    <p><strong>Subtítulo:</strong> "Acesso completo para tutores e para clínicas e parceiros"</p>
    <p>2 cards lado a lado:</p>
    <div class="grid-2">
      <div class="card">
        <h4>🐾 Sou Tutor</h4>
        <p>Cadastre seus pets, acompanhe a saúde, vacinas, consultas e acesse o Marketplace de serviços.</p>
        <p>Link: <strong>"Começar agora →"</strong> em verde</p>
      </div>
      <div class="card">
        <h4>🏥 Sou Clínica ou Parceiro</h4>
        <p>Gerencie atendimentos, prontuários digitais, conecte-se com tutores e acesse relatórios avançados.</p>
        <p>Link: <strong>"Conhecer a plataforma →"</strong> em verde</p>
      </div>
    </div>

    <h3>4.9 CTA Final e Footer</h3>
    <p><strong>Seção CTA:</strong> Fundo verde-claro, texto centralizado "Pronto para cuidar melhor?"</p>
    <p><strong>Footer:</strong> Fundo branco, logo à esquerda, copyright à direita: "© 2026 PetPulse · Vital Biometry. Todos os direitos reservados."</p>
  </div>
</div>

<!-- SEÇÃO 5 - LANDING CLINICAS -->
<div class="section" id="s5">
  <div class="section-header">
    <div class="num">5</div>
    <div><h2>Landing Page — Clínicas e Parceiros</h2><div class="sub">Rota: /clinica-parceiro</div></div>
  </div>
  <div class="section-body">
    <h3>5.1 Header Específico</h3>
    <p>Diferente do header principal:</p>
    <ul>
      <li>Logo PetPulse (esquerda)</li>
      <li><strong>"← Voltar"</strong>: link que retorna para <span class="route">/</span></li>
      <li><strong>"Falar com a equipe"</strong>: botão verde primário (ação de contato)</li>
    </ul>

    <h3>5.2 Hero</h3>
    <p><strong>Badge:</strong> ícone de configurações + "Soluções para Clínicas e Parceiros"</p>
    <p><strong>Título:</strong> "PetPulse para" + quebra de linha + <strong>"Clínicas, Veterinários e Parceiros"</strong> (em verde)</p>
    <p><strong>Subtítulo:</strong> "Centralize prontuários, organize atendimentos, conecte-se com tutores e tome decisões baseadas em dados — tudo em uma plataforma integrada, projetada para o setor pet."</p>
    <p><strong>CTAs:</strong></p>
    <ul>
      <li>Primário verde: <strong>"Quero conhecer a plataforma →"</strong></li>
      <li>Outline: <strong>"Ver demonstração"</strong></li>
    </ul>

    <h3>5.3 Funcionalidades para Clínicas</h3>
    <p><strong>Label:</strong> "FUNCIONALIDADES" &nbsp; <strong>Título:</strong> "Tudo que sua clínica precisa"</p>
    <p>Grid 3 colunas (2 linhas = 6 cards):</p>
    <table>
      <tr><th>Ícone</th><th>Título</th><th>Descrição</th></tr>
      <tr><td>📄 Documento</td><td>Prontuário Digital Integrado</td><td>Acesse o histórico completo dos pacientes diretamente na plataforma. Registros SOAP estruturados, exames e documentos centralizados.</td></tr>
      <tr><td>📅 Calendário</td><td>Gestão de Atendimentos</td><td>Organize a agenda da clínica, gerencie consultas, retornos e cirurgias com visualização por dia, semana ou mês.</td></tr>
      <tr><td>👥 Pessoas</td><td>Relacionamento com Tutores</td><td>Comunique-se com os tutores de forma integrada. Compartilhe resultados, planos de tratamento e recomendações diretamente pelo app.</td></tr>
      <tr><td>📊 Gráfico</td><td>Relatórios e Insights de Dados</td><td>Acompanhe métricas de atendimento, comportamento dos pacientes, evolução de tratamentos e gere relatórios avançados para tomada de decisão.</td></tr>
      <tr><td>⚙️ Engrenagem</td><td>Onboarding e Configuração Inicial</td><td>Equipe dedicada para cadastro de serviços, configuração da plataforma, treinamento da equipe e integração operacional completa.</td></tr>
      <tr><td>❤️ Coração</td><td>Conexão com o Ecossistema PetPulse</td><td>Apareça no Marketplace para tutores da plataforma. Amplie sua visibilidade e receba novos pacientes de forma orgânica.</td></tr>
    </table>

    <h3>5.4 Áreas de Produto</h3>
    <p><strong>Label:</strong> "ÁREAS DE PRODUTO" &nbsp; <strong>Título:</strong> "O que está incluído"</p>
    <div class="grid-3">
      <div class="card">
        <h4>Setup e Integração</h4>
        <ul>
          <li>Configuração inicial da plataforma para a sua clínica</li>
          <li>Cadastro de serviços e especialidades</li>
          <li>Onboarding da equipe médica e administrativa</li>
          <li>Treinamento inicial e suporte de implantação</li>
          <li>Integração operacional completa</li>
        </ul>
      </div>
      <div class="card">
        <h4>Licença da Plataforma (SaaS)</h4>
        <ul>
          <li>Acesso contínuo a todas as funcionalidades PetPulse</li>
          <li>Gestão de atendimentos e agenda integrada</li>
          <li>Prontuário digital com registros SOAP</li>
          <li>Armazenamento ilimitado de exames e documentos</li>
          <li>Atualizações e novidades automáticas</li>
        </ul>
      </div>
      <div class="card">
        <h4>Relatórios e Insights</h4>
        <ul>
          <li>Relatórios avançados de atendimentos</li>
          <li>Análise comportamental e histórico dos pets</li>
          <li>Geração de insights por raça, condição e faixa etária</li>
          <li>Dados para apoio à tomada de decisão clínica</li>
          <li>Exportação de relatórios em formatos padrão</li>
        </ul>
      </div>
    </div>

    <h3>5.5 FAQ — Perguntas Frequentes</h3>
    <p>Componente <strong>Accordion</strong> (expandir/recolher ao clicar). Ícone <strong>∨/∧</strong> à direita de cada pergunta.</p>
    <table>
      <tr><th>Pergunta</th><th>Resposta</th></tr>
      <tr><td>Preciso instalar algum software?</td><td>Não. O PetPulse é 100% online e funciona diretamente no navegador ou app mobile, sem instalação.</td></tr>
      <tr><td>Os dados dos pacientes ficam seguros?</td><td>(Conteúdo a definir — expandível)</td></tr>
      <tr><td>Posso integrar com o meu sistema atual?</td><td>(Conteúdo a definir — expandível)</td></tr>
      <tr><td>Quantos usuários posso cadastrar na clínica?</td><td>Os limites variam de acordo com o plano contratado. Para clínicas com múltiplos veterinários e atendentes, temos planos específicos.</td></tr>
    </table>

    <h3>5.6 CTA Final</h3>
    <p>Fundo verde-menta. <strong>Título:</strong> "Pronto para transformar sua clínica?" &nbsp; <strong>Subtítulo:</strong> "Entre em contato com nossa equipe e agende uma demonstração personalizada."</p>
    <p><strong>Botão:</strong> "Falar com nossa equipe →" (verde primário)</p>

    <h3>5.7 Footer</h3>
    <p>Mesmo padrão do footer principal: logo + copyright.</p>
  </div>
</div>

<!-- SEÇÃO 6 - ESTRUTURA GLOBAL -->
<div class="section" id="s6">
  <div class="section-header">
    <div class="num">6</div>
    <div><h2>Estrutura Global do App (Logado)</h2><div class="sub">Header, Sidebar e navegação interna</div></div>
  </div>
  <div class="section-body">
    <h3>6.1 Header Global (Fixo)</h3>
    <p>Presente em todas as telas do app logado:</p>
    <table>
      <tr><th>Elemento</th><th>Posição</th><th>Comportamento</th></tr>
      <tr><td>☰ Hambúrguer</td><td>Esquerda</td><td>Abre/fecha o menu lateral (sidebar)</td></tr>
      <tr><td>🔍 Barra de busca</td><td>Centro</td><td>Busca global — placeholder "Buscar pets, consultas, registros..."</td></tr>
      <tr><td>🔔 Ícone de notificações</td><td>Direita</td><td>Badge numérico laranja com contagem de não lidas. Clique vai para /notifications</td></tr>
      <tr><td>Avatar do usuário (iniciais)</td><td>Direita</td><td>Círculo verde com iniciais (ex: "SB"). Clique abre menu de conta/perfil</td></tr>
    </table>

    <h3>6.2 Menu Lateral (Sidebar)</h3>
    <p>Slide-in da esquerda ao clicar no hambúrguer. Ocupa ~280px de largura. Fecha com botão ✕ ou clicando fora.</p>
    <p><strong>Cabeçalho do menu:</strong></p>
    <ul>
      <li>Logo "🐾 PetPulse" + "VITAL BIOMETRY" abaixo em menor</li>
      <li>Botão ✕ no canto superior direito</li>
    </ul>
    <p><strong>Itens de navegação</strong> (com ícone outline + texto):</p>
    <table>
      <tr><th>Ícone</th><th>Label</th><th>Rota</th><th>Badge</th></tr>
      <tr><td>⊞ Grid</td><td>Painel Principal</td><td>/dashboard</td><td>—</td></tr>
      <tr><td>🐾 Pata</td><td>Meus Pets</td><td>/pets</td><td>—</td></tr>
      <tr><td>📋 Prontuário</td><td>Prontuário Digital</td><td>/medical-records</td><td>—</td></tr>
      <tr><td>📅 Calendário</td><td>Agenda de Cuidados</td><td>/appointments</td><td>—</td></tr>
      <tr><td>💉 Seringa</td><td>Vacinas</td><td>/vaccines</td><td>—</td></tr>
      <tr><td>📁 Pasta</td><td>Repositório de Exames</td><td>/exams</td><td>—</td></tr>
      <tr><td>📈 Pulso</td><td>Monitoramento Ativo</td><td>/health-monitoring</td><td>—</td></tr>
      <tr><td>📍 Pin GPS</td><td>Localização GPS</td><td>/gps</td><td>—</td></tr>
      <tr><td>🥣 Alimentação</td><td>Rotina e Alimentação</td><td>/routine</td><td>—</td></tr>
      <tr><td>🛍️ Sacola</td><td>Marketplace</td><td>/marketplace</td><td>—</td></tr>
      <tr><td>🔔 Sino</td><td>Notificações</td><td>/notifications</td><td>Número laranja (ex: 4)</td></tr>
      <tr><td>⚙️ Engrenagem</td><td>Configurações</td><td>/settings</td><td>—</td></tr>
    </table>
    <p><strong>Item ativo:</strong> fundo verde-menta claro, texto e ícone em verde.</p>
    <p><strong>Rodapé do menu:</strong> card com ícone de cartão + "Plano Gratuito" + link "Ver planos e assinatura"</p>
    <div class="note">O menu lateral é exibido ao clicar no ☰. Em telas largas (desktop), pode ficar sempre visível como sidebar fixa.</div>
  </div>
</div>

<!-- SEÇÃO 7 - DASHBOARD -->
<div class="section" id="s7">
  <div class="section-header">
    <div class="num">7</div>
    <div><h2>Painel Principal (Dashboard)</h2><div class="sub">Rota: /dashboard</div></div>
  </div>
  <div class="section-body">
    <h3>7.1 Cabeçalho da Tela</h3>
    <table>
      <tr><th>Elemento</th><th>Conteúdo</th></tr>
      <tr><td>Data atual</td><td>Exibida dinamicamente: "Terça-Feira, 14 De Abril"</td></tr>
      <tr><td>Título</td><td>"Painel Principal" (bold, grande)</td></tr>
      <tr><td>Subtítulo</td><td>"Olá, [Nome do Usuário]! Aqui está o resumo dos seus pets."</td></tr>
      <tr><td>Badge de status</td><td>• "Sistema ativo" (ponto verde + texto)</td></tr>
    </table>

    <h3>7.2 Banner — Estado Vazio (condicional)</h3>
    <p>Exibido <strong>apenas quando não há pets cadastrados</strong>. Card com fundo verde claro:</p>
    <ul>
      <li>Ícone de patas 🐾 centralizado</li>
      <li>Título: "Cadastre seu primeiro pet"</li>
      <li>Texto: "Você ainda não tem pets cadastrados. Comece agora e tenha toda a saúde do seu companheiro organizada."</li>
      <li>Botão verde: "Cadastrar meu primeiro pet" → abre modal de cadastro de pet</li>
    </ul>

    <h3>7.3 Cards de Métricas (Grid 2×2)</h3>
    <table>
      <tr><th>Label</th><th>Ícone</th><th>Valor de Exemplo</th><th>Subtexto</th></tr>
      <tr><td>PRÓXIMA CONSULTA</td><td>📅 calendário verde</td><td>Data ou "—"</td><td>"Nenhuma agendada" ou nome da clínica</td></tr>
      <tr><td>VACINAS PENDENTES</td><td>💉 seringa</td><td>0, 1, 2...</td><td>"Todas em dia" ou "X vacina(s) pendente(s)"</td></tr>
      <tr><td>MEDICAÇÕES ATIVAS</td><td>💊 pílula</td><td>0, 1, 2...</td><td>"Nenhuma ativa" ou lista resumida</td></tr>
      <tr><td>ÚLTIMO PESO</td><td>⚖️ balança</td><td>XX kg ou "—"</td><td>Data do último registro</td></tr>
    </table>

    <h3>7.4 Ações Rápidas (Grid 4 colunas)</h3>
    <p>Cards clicáveis com ícone colorido + label de ação:</p>
    <table>
      <tr><th>Ícone</th><th>Label</th><th>Ação</th></tr>
      <tr><td>📅 Azul</td><td>Agendar consulta</td><td>Abre modal Nova Consulta</td></tr>
      <tr><td>📋 Verde</td><td>Novo prontuário</td><td>Abre modal Novo Registro</td></tr>
      <tr><td>⬆️ Roxo</td><td>Upload de exame</td><td>Abre modal Upload de Documento</td></tr>
      <tr><td>💉 Laranja</td><td>Registrar vacina</td><td>Abre modal Registrar Vacina</td></tr>
    </table>

    <h3>7.5 Serviços Próximos</h3>
    <p>Título "SERVIÇOS PRÓXIMOS" + link "Ver todos" (leva para /marketplace)</p>
    <p>Grid 2×3 de mini-cards com ícone + título + descrição curta:</p>
    <table>
      <tr><th>Ícone</th><th>Serviço</th><th>Subtexto</th></tr>
      <tr><td>🏥 Vermelho</td><td>Consultas próximas</td><td>2 clínicas · 1,2 km</td></tr>
      <tr><td>🐕 Verde</td><td>Passeadores</td><td>3 disponíveis hoje</td></tr>
      <tr><td>✂️ Roxo</td><td>Banho e Tosa</td><td>A partir de R$ 60</td></tr>
      <tr><td>🏠 Amarelo</td><td>Hospedagem</td><td>Vagas disponíveis</td></tr>
      <tr><td>❤️ Rosa</td><td>Cuidadores</td><td>Pet sitters verificados</td></tr>
      <tr><td>🛍️ Azul</td><td>Produtos</td><td>Entrega expressa</td></tr>
    </table>

    <h3>7.6 Índice de Saúde</h3>
    <p>Componente visual com:</p>
    <ul>
      <li><strong>Donut chart</strong> circular com pontuação central (ex: "85 PONTOS")</li>
      <li>3 barras de progresso com label e percentual:
        <ul>
          <li>Vacinas: 90% (barra verde)</li>
          <li>Rotina: 78% (barra amarela)</li>
          <li>Peso ideal: 95% (barra verde)</li>
        </ul>
      </li>
    </ul>

    <h3>7.7 Gráfico de Evolução de Peso</h3>
    <ul>
      <li>Gráfico de linha suave com área preenchida (cor verde clara)</li>
      <li>Título: "Evolução de Peso · [Nome do Pet] · [Raça]"</li>
      <li>Link "Ver mais" → leva para /health-monitoring</li>
    </ul>

    <h3>7.8 Seção Meus Pets</h3>
    <p>Título "Meus Pets" + link "Ver todos" → /pets. Mini-avatares dos pets cadastrados.</p>

    <h3>7.9 Próximos Compromissos</h3>
    <p>Título "Próximos Compromissos" + link "Ver todos" → /appointments. Lista de eventos futuros.</p>
  </div>
</div>

<!-- SEÇÃO 8 - MEUS PETS -->
<div class="section" id="s8">
  <div class="section-header">
    <div class="num">8</div>
    <div><h2>Meus Pets</h2><div class="sub">Rota: /pets | Perfil: /pets/:id</div></div>
  </div>
  <div class="section-body">
    <h3>8.1 Cabeçalho da Tela</h3>
    <table>
      <tr><th>Elemento</th><th>Detalhe</th></tr>
      <tr><td>Título</td><td>"Meus Pets"</td></tr>
      <tr><td>Subtítulo</td><td>"[X] pets cadastrados" (dinâmico)</td></tr>
      <tr><td>Botão primário</td><td>"+ Adicionar Pet" (verde, topo direito) → abre modal</td></tr>
    </table>

    <h3>8.2 Filtros</h3>
    <table>
      <tr><th>Componente</th><th>Comportamento</th></tr>
      <tr><td>🔍 Input de busca</td><td>Placeholder "Buscar por nome..." — filtra a lista em tempo real</td></tr>
      <tr><td>Tag "Todos"</td><td>Mostra todos os pets (verde ativo por padrão)</td></tr>
      <tr><td>Tag "🐕 Cão"</td><td>Filtra apenas cães</td></tr>
      <tr><td>Tag "🐈 Gato"</td><td>Filtra apenas gatos</td></tr>
    </table>

    <h3>8.3 Estado Vazio</h3>
    <p>Quando nenhum pet cadastrado:</p>
    <ul>
      <li>Ícone 🐾 centralizado</li>
      <li>Título: "Bem-vindo ao PetPulse!"</li>
      <li>Texto: "Você ainda não tem pets cadastrados. Adicione seu primeiro companheiro agora."</li>
      <li>Botão verde: "+ Cadastrar meu primeiro pet" → abre modal</li>
    </ul>

    <h3>8.4 Estado com Pets</h3>
    <p>Grid de cards de pets (2-3 colunas). Cada card exibe:</p>
    <ul>
      <li>Foto circular do pet (ou avatar com inicial)</li>
      <li>Nome do pet (bold)</li>
      <li>Espécie + Raça</li>
      <li>Idade ou data de nascimento</li>
      <li>Peso atual</li>
      <li>Clique no card → /pets/:id (perfil do pet)</li>
    </ul>

    <h3>8.5 Modal — "Adicionar Pet"</h3>
    <p><strong>Título do modal:</strong> "Adicionar Pet"</p>
    <table class="field-table">
      <tr><th>Campo</th><th>Tipo</th><th>Obrigatório</th><th>Placeholder / Opções</th></tr>
      <tr><td>Nome do pet</td><td>Text Input</td><td>✅ Sim</td><td>"Ex: Luna"</td></tr>
      <tr><td>Espécie</td><td>Select</td><td>✅ Sim</td><td>Cão, Gato, Outros</td></tr>
      <tr><td>Sexo</td><td>Select</td><td>✅ Sim</td><td>Macho, Fêmea</td></tr>
      <tr><td>Raça</td><td>Text Input</td><td>Não</td><td>"Ex: Golden Retriever"</td></tr>
      <tr><td>Data de nascimento</td><td>Date Input</td><td>Não</td><td>dd/mm/aaaa</td></tr>
      <tr><td>Peso (kg)</td><td>Number Input</td><td>Não</td><td>"Ex: 8.5"</td></tr>
    </table>
    <p><strong>Botão submit:</strong> "Cadastrar Pet" (verde, largura total)</p>
    <p><strong>Fechar:</strong> ✕ no topo direito</p>

    <h3>8.6 Perfil do Pet (/pets/:id)</h3>
    <p>Tela dedicada para um pet específico. Deve exibir:</p>
    <ul>
      <li>Foto e dados básicos do pet</li>
      <li>Resumo de saúde (últimas vacinas, consultas, peso)</li>
      <li>Acesso rápido ao prontuário, vacinas e exames deste pet</li>
      <li>Botão de editar perfil do pet</li>
    </ul>
    <div class="note">Quando o pet não é encontrado (ID inválido), exibe: "Pet não encontrado." com botão "Voltar".</div>
  </div>
</div>

<!-- SEÇÃO 9 - PRONTUÁRIO -->
<div class="section" id="s9">
  <div class="section-header">
    <div class="num">9</div>
    <div><h2>Prontuário Digital</h2><div class="sub">Rota: /medical-records</div></div>
  </div>
  <div class="section-body">
    <h3>9.1 Cabeçalho da Tela</h3>
    <table>
      <tr><th>Elemento</th><th>Detalhe</th></tr>
      <tr><td>Ícone</td><td>🔄 Pulso/sincronismo (verde)</td></tr>
      <tr><td>Título</td><td>"Prontuário Digital"</td></tr>
      <tr><td>Subtítulo</td><td>"Histórico clínico completo com registros SOAP estruturados"</td></tr>
      <tr><td>Botão primário</td><td>"+ Novo Registro" (verde, topo direito)</td></tr>
    </table>

    <h3>9.2 Cards de Resumo (4 cards em linha)</h3>
    <table>
      <tr><th>Ícone</th><th>Label</th><th>Valor</th></tr>
      <tr><td>📄</td><td>TOTAL</td><td>Total de registros</td></tr>
      <tr><td>⏱ laranja</td><td>EM TRATAMENTO</td><td>Registros com status "Em tratamento"</td></tr>
      <tr><td>✅ verde</td><td>RESOLVIDOS</td><td>Registros com status "Resolvido"</td></tr>
      <tr><td>⚠️ azul</td><td>EM ABERTO</td><td>Registros com status "Aberto"</td></tr>
    </table>

    <h3>9.3 Cards de Alertas</h3>
    <p>Dois cards lado a lado de alertas críticos:</p>
    <div class="grid-2">
      <div class="card" style="border-left:4px solid #e53935;background:#fce4ec">
        <h4>⚠️ ALERGIAS CONHECIDAS</h4>
        <p>Lista de alérgenos por pet. Ex: Thor → tag "Frango" (badge rosa/vermelho)</p>
        <p>Cada alérgeno aparece como uma tag colorida.</p>
      </div>
      <div class="card" style="border-left:4px solid #f59e0b;background:#fffde7">
        <h4>💊 MEDICAÇÃO CONTÍNUA</h4>
        <p>Lista de medicamentos em uso. Ex:</p>
        <ul>
          <li>Luna → "Dermacort pomada - aplicar 2x/dia"</li>
          <li>Luna → "Prednisolona 5mg - 1/4 comp 1x/dia por 7 dias"</li>
        </ul>
        <p>Texto em laranja para os nomes dos medicamentos.</p>
      </div>
    </div>

    <h3>9.4 Filtros</h3>
    <table>
      <tr><th>Filtro</th><th>Opções</th></tr>
      <tr><td>Pet:</td><td>[Todos] + um tag por pet cadastrado (ex: Cacau, Chico, Kohaku, Ozzy, Thor, Luna)</td></tr>
      <tr><td>Status:</td><td>[Todos] [Aberto] [Em tratamento] [Resolvido]</td></tr>
    </table>

    <h3>9.5 Timeline de Registros</h3>
    <p>Organizada cronologicamente (mais recente primeiro), agrupada por ano. Cada item da timeline:</p>
    <ul>
      <li><strong>Data à esquerda:</strong> dia e mês em destaque + ano abaixo</li>
      <li><strong>Badge de tipo:</strong> "CONSULTA", "CIRURGIA", etc. (pequeno, outline)</li>
      <li><strong>Badge de status (direita):</strong> "EM TRATAMENTO" (laranja), "RESOLVIDO" (verde), "ABERTO" (amarelo)</li>
      <li><strong>Título</strong> do registro (bold)</li>
      <li><strong>Veterinário</strong> (ícone 🧑), <strong>Clínica</strong> (ícone 📍), <strong>Retorno</strong> (ícone 📅)</li>
      <li><strong>Diagnóstico</strong> (em itálico)</li>
      <li><strong>Tags de medicamento</strong> (badges lilás com ícone de seringa)</li>
      <li><strong>Botão ∨</strong> (chevron) à direita para expandir o SOAP completo</li>
    </ul>

    <h3>9.6 Registro SOAP Expandido</h3>
    <p>Ao clicar no chevron ∨, o card expande mostrando o registro SOAP em 4 quadrantes (2×2):</p>
    <div class="soap-grid">
      <div class="soap-s">
        <div class="soap-label">S &nbsp; SUBJETIVO</div>
        <div class="soap-sub">Queixa principal e histórico relatado</div>
        <p>Texto livre com queixa do tutor. Campo "SINTOMAS RELATADOS" abaixo.</p>
      </div>
      <div class="soap-o">
        <div class="soap-label">O &nbsp; OBJETIVO</div>
        <div class="soap-sub">Achados clínicos e exame físico</div>
        <p>Temperatura, FC, achados do exame físico.</p>
      </div>
      <div class="soap-a">
        <div class="soap-label">A &nbsp; AVALIAÇÃO</div>
        <div class="soap-sub">Diagnóstico e interpretação clínica</div>
        <p>Diagnóstico descritivo + campo "DIAGNÓSTICO DEFINITIVO".</p>
      </div>
      <div class="soap-p">
        <div class="soap-label">P &nbsp; PLANO</div>
        <div class="soap-sub">Tratamento, prescrições e retorno</div>
        <p>Plano de tratamento + campo "PRESCRIÇÃO" com medicamentos listados.</p>
      </div>
    </div>
    <p><strong>Cabeçalho da expansão:</strong> data por extenso + resumo do tratamento em texto</p>

    <h3>9.7 Modal — "Novo Registro no Prontuário"</h3>
    <p><strong>Título do modal:</strong> "Novo Registro no Prontuário"</p>
    <table class="field-table">
      <tr><th>Campo</th><th>Tipo</th><th>Obrigatório</th><th>Placeholder / Opções</th></tr>
      <tr><td>Motivo da consulta</td><td>Text Input</td><td>✅ Sim</td><td>"Ex: Check-up anual"</td></tr>
      <tr><td>Veterinário</td><td>Text Input</td><td>Não</td><td>"Dr(a). Nome"</td></tr>
      <tr><td>Clínica</td><td>Text Input</td><td>Não</td><td>"Nome da clínica"</td></tr>
      <tr><td>Data</td><td>Date Input</td><td>Não</td><td>dd/mm/aaaa</td></tr>
      <tr><td>Status</td><td>Select</td><td>Não</td><td>Aberto, Em tratamento, Resolvido</td></tr>
      <tr><td>Diagnóstico</td><td>Text Input</td><td>Não</td><td>"Ex: Infecção leve no ouvido"</td></tr>
      <tr><td>Tratamento prescrito</td><td>Text Input</td><td>Não</td><td>"Ex: Antibiótico por 7 dias"</td></tr>
    </table>
    <p><strong>Botão submit:</strong> "Salvar Registro" (verde, largura total)</p>
  </div>
</div>

<!-- SEÇÃO 10 - AGENDA -->
<div class="section" id="s10">
  <div class="section-header">
    <div class="num">10</div>
    <div><h2>Agenda de Cuidados</h2><div class="sub">Rota: /appointments</div></div>
  </div>
  <div class="section-body">
    <h3>10.1 Cabeçalho da Tela</h3>
    <table>
      <tr><th>Elemento</th><th>Detalhe</th></tr>
      <tr><td>Título</td><td>"Agenda de Cuidados"</td></tr>
      <tr><td>Subtítulo</td><td>"[X] compromissos próximos" (dinâmico)</td></tr>
      <tr><td>Botão primário</td><td>"+ Agendar Consulta" (verde)</td></tr>
    </table>

    <h3>10.2 Toggle de Visualização</h3>
    <p>Dois botões toggle lado a lado:</p>
    <ul>
      <li><strong>≡ Lista</strong> — exibe eventos em formato de lista</li>
      <li><strong>📅 Calendário</strong> — exibe calendário mensal completo</li>
    </ul>
    <p>Botão ativo: fundo escuro/destacado.</p>

    <h3>10.3 Visualização — Lista</h3>
    <p>Quando não há compromissos: área vazia com mensagem padrão.</p>
    <p>Com compromissos: lista de cards com:</p>
    <ul>
      <li>Data e horário</li>
      <li>Tipo de compromisso (Consulta, Vacina, Cirurgia, etc.)</li>
      <li>Nome do pet</li>
      <li>Clínica e veterinário</li>
      <li>Botão de opções (editar, cancelar)</li>
    </ul>

    <h3>10.4 Visualização — Calendário</h3>
    <p>Calendário mensal completo (full-page):</p>
    <ul>
      <li>Cabeçalho: "abril de 2026" (mês + ano em português)</li>
      <li>Dias da semana: DOM SEG TER QUA QUI SEX SÁB</li>
      <li>Dia atual: círculo verde preenchido</li>
      <li>Eventos exibidos como pequenos blocos coloridos dentro do dia</li>
      <li>Navegação de meses: setas ← → (implementar)</li>
    </ul>

    <h3>10.5 Modal — "Nova Consulta"</h3>
    <p><strong>Título do modal:</strong> "Nova Consulta"</p>
    <table class="field-table">
      <tr><th>Campo</th><th>Tipo</th><th>Obrigatório</th><th>Placeholder / Opções</th></tr>
      <tr><td>Nome do pet</td><td>Text Input</td><td>✅ Sim</td><td>"Ex: Rex"</td></tr>
      <tr><td>Tipo</td><td>Select</td><td>✅ Sim</td><td>Consulta, Vacina, Cirurgia, Retorno, Exame, Banho, Outros</td></tr>
      <tr><td>Data</td><td>Date Input</td><td>✅ Sim</td><td>dd/mm/aaaa</td></tr>
      <tr><td>Horário</td><td>Time Input</td><td>✅ Sim</td><td>--:--</td></tr>
      <tr><td>Clínica</td><td>Text Input</td><td>Não</td><td>"Nome da clínica"</td></tr>
      <tr><td>Veterinário</td><td>Text Input</td><td>Não</td><td>"Dr(a). Nome"</td></tr>
    </table>
    <p><strong>Botão submit:</strong> "Agendar Consulta" (verde, largura total)</p>
  </div>
</div>

<!-- SEÇÃO 11 - VACINAS -->
<div class="section" id="s11">
  <div class="section-header">
    <div class="num">11</div>
    <div><h2>Vacinas</h2><div class="sub">Rota: /vaccines — Carteira de vacinação digital</div></div>
  </div>
  <div class="section-body">
    <h3>11.1 Cabeçalho da Tela</h3>
    <table>
      <tr><th>Elemento</th><th>Detalhe</th></tr>
      <tr><td>Título</td><td>"Vacinas"</td></tr>
      <tr><td>Subtítulo</td><td>"Carteira de vacinação digital"</td></tr>
      <tr><td>Botão primário</td><td>"+ Registrar Vacina" (verde)</td></tr>
    </table>

    <h3>11.2 Cards de Resumo (3 cards)</h3>
    <table>
      <tr><th>Ícone / Cor</th><th>Label</th><th>Descrição</th></tr>
      <tr><td>✅ verde</td><td>EM DIA</td><td>Vacinas dentro do prazo</td></tr>
      <tr><td>⏱ amarelo/laranja</td><td>PRÓXIMAS</td><td>Vacinas vencendo em breve</td></tr>
      <tr><td>⚠️ vermelho</td><td>ATRASADAS</td><td>Vacinas vencidas</td></tr>
    </table>

    <h3>11.3 Filtros</h3>
    <p>Tags filtro por status: [Todos] + tags por pet cadastrado.</p>

    <h3>11.4 Estado Vazio</h3>
    <p>Ícone 🛡️ centralizado + texto "Nenhuma vacina registrada."</p>

    <h3>11.5 Lista de Vacinas</h3>
    <p>Cards de vacinação com:</p>
    <ul>
      <li>Nome da vacina (bold)</li>
      <li>Pet associado</li>
      <li>Data de aplicação</li>
      <li>Próxima dose</li>
      <li>Fabricante</li>
      <li>Clínica onde foi aplicada</li>
      <li>Badge de status (Em dia / Próxima / Atrasada)</li>
    </ul>

    <h3>11.6 Modal — "Registrar Vacina"</h3>
    <p><strong>Título do modal:</strong> "Registrar Vacina"</p>
    <table class="field-table">
      <tr><th>Campo</th><th>Tipo</th><th>Obrigatório</th><th>Placeholder</th></tr>
      <tr><td>Nome da vacina</td><td>Text Input</td><td>✅ Sim</td><td>"Ex: V10, Antirrábica"</td></tr>
      <tr><td>Nome do pet</td><td>Text Input</td><td>✅ Sim</td><td>"Ex: Thor"</td></tr>
      <tr><td>Data de aplicação</td><td>Date Input</td><td>✅ Sim</td><td>dd/mm/aaaa</td></tr>
      <tr><td>Próxima dose</td><td>Date Input</td><td>Não</td><td>dd/mm/aaaa</td></tr>
      <tr><td>Fabricante</td><td>Text Input</td><td>Não</td><td>"Ex: MSD, Zoetis"</td></tr>
      <tr><td>Clínica</td><td>Text Input</td><td>Não</td><td>"Nome da clínica"</td></tr>
    </table>
    <p><strong>Botão submit:</strong> "Salvar Vacina" (verde, largura total)</p>
  </div>
</div>

<!-- SEÇÃO 12 - REPOSITÓRIO DE EXAMES -->
<div class="section" id="s12">
  <div class="section-header">
    <div class="num">12</div>
    <div><h2>Repositório de Exames</h2><div class="sub">Rota: /exams</div></div>
  </div>
  <div class="section-body">
    <h3>12.1 Cabeçalho da Tela</h3>
    <table>
      <tr><th>Elemento</th><th>Detalhe</th></tr>
      <tr><td>Título</td><td>"Repositório de Exames"</td></tr>
      <tr><td>Subtítulo</td><td>"[X] documentos armazenados" (dinâmico)</td></tr>
      <tr><td>Botão primário</td><td>"+ Upload de Documento" (verde)</td></tr>
    </table>

    <h3>12.2 Filtros</h3>
    <table>
      <tr><th>Componente</th><th>Detalhes</th></tr>
      <tr><td>🔍 Busca</td><td>Input "Buscar exames..." — filtra por nome/descrição</td></tr>
      <tr><td>Tags de tipo</td><td>[Todos] [Hemograma] [Imagem] [Prescrição] [Certificado] [Recibo] [Outro]</td></tr>
    </table>

    <h3>12.3 Grid de Documentos (2 colunas)</h3>
    <p>Cada card de documento exibe:</p>
    <table>
      <tr><th>Elemento</th><th>Detalhe</th></tr>
      <tr><td>Ícone</td><td>Ícone de tipo do documento (pasta=outro, doc vermelho=hemograma, imagem azul=imagem)</td></tr>
      <tr><td>Título</td><td>Nome do exame (bold)</td></tr>
      <tr><td>Metadados</td><td>[Nome do Pet] · [Tipo] · [Data dd/mm/aaaa]</td></tr>
      <tr><td>Descrição</td><td>Texto curto descritivo do resultado</td></tr>
      <tr><td>Botão "Visualizar"</td><td>Laranja/orange — abre o documento para visualização</td></tr>
      <tr><td>Botão "Baixar"</td><td>Outline cinza — faz download do arquivo</td></tr>
    </table>

    <h3>12.4 Exemplos de Documentos (dados de teste)</h3>
    <table>
      <tr><th>Título</th><th>Pet</th><th>Tipo</th><th>Data</th><th>Descrição</th></tr>
      <tr><td>Exame Dermatológico</td><td>Luna</td><td>Outro</td><td>31/03/2026</td><td>Raspado de pele negativo para fungos</td></tr>
      <tr><td>Hemograma Completo</td><td>Thor</td><td>Hemograma</td><td>19/03/2026</td><td>Todos os valores dentro da normalidade</td></tr>
      <tr><td>Hemograma Controle</td><td>Luna</td><td>Hemograma</td><td>14/03/2026</td><td>Leve eosinofilia - compatível com quadro alérgico</td></tr>
      <tr><td>Radiografia Ombro Direito</td><td>Thor</td><td>Imagem</td><td>14/01/2026</td><td>Sem alterações ósseas visíveis</td></tr>
    </table>

    <h3>12.5 Modal — "Upload de Documento"</h3>
    <p><strong>Título do modal:</strong> "Upload de Documento"</p>
    <table class="field-table">
      <tr><th>Campo</th><th>Tipo</th><th>Obrigatório</th><th>Placeholder / Opções</th></tr>
      <tr><td>Título do documento</td><td>Text Input</td><td>✅ Sim</td><td>"Ex: Hemograma completo"</td></tr>
      <tr><td>Pet</td><td>Text Input</td><td>✅ Sim</td><td>"Nome do pet"</td></tr>
      <tr><td>Tipo</td><td>Select</td><td>✅ Sim</td><td>Hemograma, Imagem, Prescrição, Certificado, Recibo, Outro</td></tr>
      <tr><td>Arquivo</td><td>File Upload</td><td>✅ Sim</td><td>Área drag & drop com borda pontilhada. "Clique para selecionar um arquivo / PDF, JPG, PNG até 10MB"</td></tr>
      <tr><td>Observações</td><td>Text Input</td><td>Não</td><td>"Observações opcionais"</td></tr>
    </table>
    <p><strong>Botão submit:</strong> "Enviar Documento" (verde, largura total)</p>
    <div class="info">Formatos aceitos: PDF, JPG, PNG. Tamanho máximo: 10MB por arquivo.</div>
  </div>
</div>

<!-- SEÇÃO 13 - MONITORAMENTO -->
<div class="section" id="s13">
  <div class="section-header">
    <div class="num">13</div>
    <div><h2>Monitoramento Ativo</h2><div class="sub">Rota: /health-monitoring</div></div>
  </div>
  <div class="section-body">
    <h3>13.1 Cabeçalho da Tela</h3>
    <table>
      <tr><th>Elemento</th><th>Detalhe</th></tr>
      <tr><td>Título</td><td>"Monitoramento Ativo"</td></tr>
      <tr><td>Subtítulo</td><td>"Acompanhe o bem-estar diário dos seus pets"</td></tr>
    </table>

    <h3>13.2 Seletor de Pet</h3>
    <p>Pills/tags horizontais com um tag por pet. Pet com foto tem thumbnail circular. Pet ativo: fundo verde, texto branco.</p>
    <p>Exemplo: [Cacau] [Chico] [Kohaku] [Ozzy] [🐶 Thor] [🐱 Luna]</p>

    <h3>13.3 Cards de Status Atual (Grid 2×3)</h3>
    <p>Para cada pet selecionado, 6 cards exibem o status atual:</p>
    <table>
      <tr><th>Card</th><th>Ícone</th><th>Dados exibidos</th><th>Valores possíveis</th></tr>
      <tr><td>PESO ATUAL</td><td>📈 trending (verde)</td><td>Valor em kg + raça do pet</td><td>Número com 1 decimal</td></tr>
      <tr><td>HIDRATAÇÃO</td><td>💧 gota (azul)</td><td>Status textual</td><td>Normal, Baixa, Alta</td></tr>
      <tr><td>HUMOR</td><td>😊 emoji</td><td>Emoji + texto</td><td>😄 Ativo, 😐 Neutro, 😔 Abatido</td></tr>
      <tr><td>ATIVIDADE</td><td>⚡ raio (laranja)</td><td>Status textual</td><td>Ativo, Moderado, Sedentário</td></tr>
      <tr><td>SONO</td><td>🌙 lua (roxo)</td><td>Qualidade</td><td>Ótimo, Bom, Regular, Ruim</td></tr>
      <tr><td>APETITE</td><td>📊 pulso (amarelo)</td><td>Status</td><td>Normal, Aumentado, Reduzido</td></tr>
    </table>

    <h3>13.4 Gráfico — Evolução de Peso</h3>
    <ul>
      <li>Tipo: linha suave com área preenchida (verde claro)</li>
      <li>Eixo X: datas (últimas semanas)</li>
      <li>Eixo Y: peso em kg</li>
      <li>Título: "EVOLUÇÃO DE PESO / [Nome do Pet]"</li>
    </ul>

    <h3>13.5 Gráfico — Nível de Atividade</h3>
    <ul>
      <li>Tipo: linha (cor laranja/amarela)</li>
      <li>Eixo Y: 0 a 5</li>
      <li>Tooltip ao hover: data + valor (ex: "26 de mar. / atividade : 4")</li>
    </ul>

    <h3>13.6 Gráfico — Qualidade do Sono</h3>
    <ul>
      <li>Tipo: linha (cor verde)</li>
      <li>Eixo Y: 0 a 4</li>
    </ul>

    <h3>13.7 Registros Diários</h3>
    <p>Lista de registros passados. Cada linha: data + peso + humor + atividade + hidratação + sono. Exibe como badges coloridos horizontais.</p>
    <p>Exemplo: <code>09 ABR. &nbsp; 32.5kg &nbsp; 😄 Ativo &nbsp; ⚡ Ativo &nbsp; 💧 Normal &nbsp; 🌙 Bom</code></p>

    <h3>13.8 Banner — Insights Inteligentes (Em breve)</h3>
    <p>Card cinza indicando funcionalidade futura: "Estamos desenvolvendo alertas automáticos para padrões incomuns no comportamento e saúde do seu pet."</p>
    <div class="info">Esta funcionalidade aparece como "Em breve" no protótipo e deve ser implementada na versão futura da plataforma.</div>
  </div>
</div>

<!-- SEÇÃO 14 - GPS -->
<div class="section" id="s14">
  <div class="section-header">
    <div class="num">14</div>
    <div><h2>Localização GPS</h2><div class="sub">Rota: /gps — Rastreamento em tempo real</div></div>
  </div>
  <div class="section-body">
    <h3>14.1 Cabeçalho da Tela</h3>
    <table>
      <tr><th>Elemento</th><th>Detalhe</th></tr>
      <tr><td>Título</td><td>"Localização GPS"</td></tr>
      <tr><td>Subtítulo</td><td>"Rastreamento em tempo real e zonas seguras"</td></tr>
      <tr><td>Botão "Compartilhar"</td><td>Compartilha localização atual</td></tr>
      <tr><td>Botão "Pet Perdido"</td><td>Ativa modo de alerta emergencial</td></tr>
    </table>

    <h3>14.2 Seletor de Pet</h3>
    <p>Mesmo padrão: pills horizontais por pet.</p>

    <h3>14.3 Mapa</h3>
    <ul>
      <li>Mapa simulado com grid (em produção: integrar Google Maps ou Mapbox)</li>
      <li>Marcador do pet: círculo verde com ícone de pata + nome do pet + horário + "Ao vivo"</li>
      <li>Círculo tracejado ao redor: representa a Zona Segura configurada</li>
      <li>Label: "Zona segura: 300m"</li>
      <li>Botões + e − para zoom</li>
      <li>Label de localização: "📍 Parque Municipal · Bairro Verde"</li>
    </ul>

    <h3>14.4 Card — Status Atual</h3>
    <table>
      <tr><th>Campo</th><th>Valor de Exemplo</th></tr>
      <tr><td>Status</td><td>"Dentro da zona segura" (texto verde) ou "Fora da zona segura!" (vermelho)</td></tr>
      <tr><td>Última atualização</td><td>Horário da última ping GPS</td></tr>
      <tr><td>Zona segura</td><td>Raio em metros (ex: "300m")</td></tr>
      <tr><td>Distância</td><td>"0m" (da zona)</td></tr>
      <tr><td>Velocidade</td><td>"0 km/h"</td></tr>
      <tr><td>Bateria GPS</td><td>Percentual (ex: "82%")</td></tr>
    </table>

    <h3>14.5 Ações Rápidas</h3>
    <ul>
      <li><strong>Configurar área segura</strong> — define o raio da zona segura</li>
      <li><strong>Ver rotas</strong> — exibe histórico de rotas do dia</li>
      <li><strong>Compartilhar localização</strong> — compartilha com familiar/veterinário</li>
      <li><strong>Simular status</strong> — (protótipo) simula diferentes estados:
        <ul>
          <li>Dentro da zona segura (ativo/selecionado)</li>
          <li>Fora da zona segura!</li>
          <li>Em movimento</li>
        </ul>
      </li>
    </ul>

    <h3>14.6 Histórico de Rotas</h3>
    <p>Título: "Histórico de Rotas · Hoje" + link "Ver tudo"</p>
    <p>Lista de locais visitados no dia, com horário e badge "ATUAL" para o local mais recente:</p>
    <table>
      <tr><th>Local</th><th>Horário</th><th>Status</th></tr>
      <tr><td>Parque Municipal</td><td>14:32</td><td><span class="badge-green">ATUAL</span></td></tr>
      <tr><td>Rua das Flores</td><td>13:10</td><td>—</td></tr>
      <tr><td>Praça dos Pets</td><td>11:45</td><td>—</td></tr>
    </table>
    <div class="note">Integração com GPS real: usar dispositivo GPS físico no pet. O mapa do protótipo é simulado — em produção integrar com API de mapas (Google Maps / Mapbox).</div>
  </div>
</div>

<!-- SEÇÃO 15 - ROTINA -->
<div class="section" id="s15">
  <div class="section-header">
    <div class="num">15</div>
    <div><h2>Rotina e Alimentação</h2><div class="sub">Rota: /routine — Checklist diário de cuidados</div></div>
  </div>
  <div class="section-body">
    <h3>15.1 Cabeçalho da Tela</h3>
    <table>
      <tr><th>Elemento</th><th>Detalhe</th></tr>
      <tr><td>Título</td><td>"Rotina e Alimentação"</td></tr>
      <tr><td>Subtítulo</td><td>"Checklist diário de cuidados"</td></tr>
      <tr><td>Botão primário</td><td>"+ Nova Tarefa" (verde)</td></tr>
    </table>

    <h3>15.2 Card — Progresso do Dia</h3>
    <ul>
      <li>Título: "Progresso do Dia" + percentual (ex: 40%)</li>
      <li>Barra de progresso verde horizontal</li>
      <li>Subtexto: "X de Y tarefas concluídas"</li>
    </ul>

    <h3>15.3 Filtro por Pet</h3>
    <p>Tags: [Todos] + um tag por pet (ex: Cacau, Chico, Kohaku, Ozzy, Thor, Luna)</p>

    <h3>15.4 Lista de Tarefas</h3>
    <p>Agrupadas por pet (título do grupo = nome do pet em maiúsculo).</p>
    <p>Cada item de tarefa:</p>
    <table>
      <tr><th>Elemento</th><th>Detalhe</th></tr>
      <tr><td>Checkbox</td><td>Círculo clicável. Quando marcado: fundo verde + ícone check</td></tr>
      <tr><td>Ícone de categoria</td><td>Ícone colorido (garfo-faca=alimentação, alarme=passeio, pilula=medicação, tesoura=higiene)</td></tr>
      <tr><td>Título</td><td>Nome da tarefa (tachado se concluída)</td></tr>
      <tr><td>Subtexto</td><td>Horário · Categoria · Detalhes (ex: "07:00 · Alimentação · Ração premium 300g")</td></tr>
      <tr><td>Badge "Recorrente"</td><td>Tag cinza à direita se for tarefa repetida diariamente</td></tr>
    </table>

    <h3>15.5 Exemplos de Tarefas (dados de teste)</h3>
    <p><strong>Thor:</strong></p>
    <table>
      <tr><th>Tarefa</th><th>Horário</th><th>Categoria</th><th>Detalhe</th></tr>
      <tr><td>Alimentação manhã</td><td>07:00</td><td>Alimentação</td><td>Ração premium 300g</td></tr>
      <tr><td>Passeio manhã</td><td>07:30</td><td>Passeio</td><td>30 min no parque</td></tr>
      <tr><td>Alimentação tarde</td><td>12:00</td><td>Alimentação</td><td>Ração premium 300g</td></tr>
      <tr><td>Passeio tarde</td><td>17:00</td><td>Passeio</td><td>40 min caminhada</td></tr>
      <tr><td>Alimentação noite</td><td>19:00</td><td>Alimentação</td><td>Ração premium 200g</td></tr>
    </table>
    <p><strong>Luna:</strong></p>
    <table>
      <tr><th>Tarefa</th><th>Horário</th><th>Categoria</th><th>Detalhe</th></tr>
      <tr><td>Alimentação manhã</td><td>07:00</td><td>Alimentação</td><td>Ração úmida 80g</td></tr>
      <tr><td>Dermacort pomada</td><td>08:00</td><td>Medicação</td><td>Aplicar na região cervical</td></tr>
      <tr><td>Alimentação noite</td><td>18:00</td><td>Alimentação</td><td>Ração seca 40g</td></tr>
      <tr><td>Dermacort pomada</td><td>20:00</td><td>Medicação</td><td>Aplicar na região cervical</td></tr>
      <tr><td>Escovação</td><td>21:00</td><td>Higiene</td><td>Escovar pelo por 5 min</td></tr>
    </table>

    <h3>15.6 Modal — "Nova Tarefa de Rotina"</h3>
    <p><strong>Título do modal:</strong> "Nova Tarefa de Rotina"</p>
    <table class="field-table">
      <tr><th>Campo</th><th>Tipo</th><th>Obrigatório</th><th>Placeholder / Opções</th></tr>
      <tr><td>Título</td><td>Text Input</td><td>✅ Sim</td><td>"Ex: Ração da manhã"</td></tr>
      <tr><td>Categoria</td><td>Select</td><td>✅ Sim</td><td>Alimentação, Passeio, Medicação, Higiene, Brincadeira, Outros</td></tr>
      <tr><td>Horário</td><td>Time Input</td><td>✅ Sim</td><td>--:--</td></tr>
      <tr><td>Observações</td><td>Text Input</td><td>Não</td><td>"Ex: 200g de ração"</td></tr>
      <tr><td>Tarefa recorrente (diária)</td><td>Checkbox</td><td>Não</td><td>Desmarcado por padrão</td></tr>
    </table>
    <p><strong>Botão submit:</strong> "Adicionar à Rotina" (verde, largura total)</p>
  </div>
</div>

<!-- SEÇÃO 16 - MARKETPLACE -->
<div class="section" id="s16">
  <div class="section-header">
    <div class="num">16</div>
    <div><h2>Marketplace</h2><div class="sub">Rota: /marketplace — Serviços e produtos para o pet</div></div>
  </div>
  <div class="section-body">
    <h3>16.1 Cabeçalho da Tela</h3>
    <table>
      <tr><th>Elemento</th><th>Detalhe</th></tr>
      <tr><td>Título</td><td>"Marketplace"</td></tr>
      <tr><td>Subtítulo</td><td>"Serviços e produtos para o seu pet, perto de você"</td></tr>
    </table>

    <h3>16.2 Busca e Filtros</h3>
    <ul>
      <li>Input de busca: "Buscar serviços ou produtos..."</li>
      <li>Tags de categoria: [Todos] [Veterinários] [Cuidadores] [Passeadores] [Banho e Tosa] [Hospedagem] [Produtos]</li>
    </ul>

    <h3>16.3 Grid de Serviços/Produtos (2 colunas)</h3>
    <p>Cada card de serviço exibe:</p>
    <table>
      <tr><th>Elemento</th><th>Detalhe</th></tr>
      <tr><td>Ícone colorido</td><td>Ícone representativo com fundo colorido arredondado</td></tr>
      <tr><td>Nome</td><td>Nome do estabelecimento/serviço (bold)</td></tr>
      <tr><td>Descrição</td><td>Texto curto de 1-2 linhas</td></tr>
      <tr><td>Avaliação</td><td>★ Nota (1 decimal) + (número de avaliações)</td></tr>
      <tr><td>Distância/tipo</td><td>📍 X,X km ou 🌐 Online</td></tr>
      <tr><td>Preço</td><td>"A partir de R$ XX" em verde</td></tr>
      <tr><td>Botão "Ver detalhes"</td><td>Outline</td></tr>
      <tr><td>Botão "Agendar"</td><td>Verde primário (ausente se indisponível)</td></tr>
      <tr><td>Badge "Indisponível"</td><td>Tag cinza no canto superior direito do card</td></tr>
    </table>

    <h3>16.4 Estabelecimentos Cadastrados (dados de teste)</h3>
    <table>
      <tr><th>Nome</th><th>Descrição</th><th>Nota</th><th>Distância</th><th>Preço</th></tr>
      <tr><td>Clínica VetCare</td><td>Consultas, exames e cirurgias. Atendimento especializado para cães e gatos.</td><td>4.9 (128)</td><td>1,2 km</td><td>A partir de R$ 80</td></tr>
      <tr><td>Pet Spa Premium</td><td>Banho, tosa e hidratação com produtos naturais. Agendamento rápido online.</td><td>4.8 (94)</td><td>0,8 km</td><td>A partir de R$ 60</td></tr>
      <tr><td>Walk4Pets</td><td>Passeios individuais e em grupo. Passeadores certificados com seguro de pet.</td><td>4.7 (211)</td><td>0,5 km</td><td>A partir de R$ 35/passeio</td></tr>
      <tr><td>PetSitter Mariana <span class="badge-red">Indisponível</span></td><td>Cuidado domiciliar enquanto você viaja. Experiência com pets de todas as raças.</td><td>5.0 (47)</td><td>2,0 km</td><td>A partir de R$ 100/dia</td></tr>
      <tr><td>PetHotel Feliz</td><td>Hotel boutique para pets. Suítes individuais com monitoramento 24h.</td><td>4.6 (83)</td><td>3,1 km</td><td>A partir de R$ 90/noite</td></tr>
      <tr><td>Loja PetLife</td><td>Medicamentos, suplementos e acessórios. Entrega expressa para sua casa.</td><td>4.5 (302)</td><td>Online</td><td>Frete a partir de R$ 9,90</td></tr>
      <tr><td>Dr. Pet Online</td><td>Teleconsulta veterinária. Atendimento rápido via videochamada, sem sair de casa.</td><td>4.8 (156)</td><td>Online</td><td>A partir de R$ 50</td></tr>
      <tr><td>Grooming & Cia</td><td>Especialistas em raças com pelagem longa. Tratamentos e perfumação inclusa.</td><td>4.7 (61)</td><td>1,5 km</td><td>A partir de R$ 75</td></tr>
    </table>
  </div>
</div>

<!-- SEÇÃO 17 - NOTIFICAÇÕES -->
<div class="section" id="s17">
  <div class="section-header">
    <div class="num">17</div>
    <div><h2>Notificações</h2><div class="sub">Rota: /notifications</div></div>
  </div>
  <div class="section-body">
    <h3>17.1 Cabeçalho da Tela</h3>
    <table>
      <tr><th>Elemento</th><th>Detalhe</th></tr>
      <tr><td>Título</td><td>"Notificações"</td></tr>
      <tr><td>Subtítulo</td><td>"X não lidas" (dinâmico)</td></tr>
      <tr><td>Botão</td><td>"✓ Marcar todas como lidas" (outline cinza)</td></tr>
    </table>

    <h3>17.2 Lista de Notificações</h3>
    <p>Cada card de notificação exibe:</p>
    <table>
      <tr><th>Elemento</th><th>Detalhe</th></tr>
      <tr><td>Borda esquerda colorida</td><td>Laranja = alta prioridade, Azul = média, Cinza = baixa</td></tr>
      <tr><td>Ícone</td><td>Representativo do tipo (seringa, calendário, pílula, documento, alerta)</td></tr>
      <tr><td>Título</td><td>Nome da notificação (bold)</td></tr>
      <tr><td>Descrição</td><td>Texto explicativo</td></tr>
      <tr><td>Tags</td><td>[Pet] [Tipo] [Prioridade] — badges coloridas</td></tr>
      <tr><td>Ponto azul</td><td>Indica notificação não lida (canto direito)</td></tr>
      <tr><td>Link "Marcar como lida"</td><td>Texto verde, aparece apenas nas não lidas</td></tr>
    </table>

    <h3>17.3 Tipos de Notificação</h3>
    <table>
      <tr><th>Ícone</th><th>Título</th><th>Prioridade</th><th>Exemplo</th></tr>
      <tr><td>💉 Seringa</td><td>Vacina V10 pendente</td><td><span class="badge-red">Alta</span></td><td>Thor precisa da dose de reforço da V10. Agende sua consulta.</td></tr>
      <tr><td>📅 Calendário</td><td>Consulta de retorno</td><td><span class="badge-orange">Média</span></td><td>Luna tem retorno marcado para a próxima semana.</td></tr>
      <tr><td>💊 Pílula</td><td>Horário da medicação</td><td><span class="badge-red">Alta</span></td><td>Luna: Dermacort pomada - aplicar às 20h</td></tr>
      <tr><td>📄 Documento</td><td>Exame disponível</td><td><span class="badge-blue">Baixa</span></td><td>O hemograma de Thor está disponível para visualização.</td></tr>
      <tr><td>⚠️ Alerta</td><td>Lembrete de passeio</td><td><span class="badge-blue">Baixa</span></td><td>Thor não foi passeado hoje. Que tal uma caminhada?</td></tr>
      <tr><td>💊 Pílula</td><td>Antiparasitário</td><td><span class="badge-orange">Média</span></td><td>Próxima dose do antipulgas de Luna em 3 dias.</td></tr>
    </table>

    <h3>17.4 Regras de Exibição</h3>
    <ul>
      <li>Notificações não lidas: borda lateral colorida mais intensa + ponto azul</li>
      <li>Notificações lidas: borda mais clara, sem ponto</li>
      <li>Ordenação: mais recentes primeiro</li>
      <li>Badge no ícone do sino do header: contagem de não lidas</li>
      <li>Ao clicar em "Marcar como lida": remove o ponto azul e atenua a notificação</li>
    </ul>
  </div>
</div>

<!-- SEÇÃO 18 - CONFIGURAÇÕES -->
<div class="section" id="s18">
  <div class="section-header">
    <div class="num">18</div>
    <div><h2>Configurações</h2><div class="sub">Rota: /settings</div></div>
  </div>
  <div class="section-body">
    <h3>18.1 Cabeçalho da Tela</h3>
    <table>
      <tr><th>Elemento</th><th>Detalhe</th></tr>
      <tr><td>Título</td><td>"Configurações"</td></tr>
      <tr><td>Subtítulo</td><td>"Gerencie sua conta e preferências"</td></tr>
    </table>

    <h3>18.2 Seção — Perfil do Tutor</h3>
    <ul>
      <li>Label: "PERFIL DO TUTOR"</li>
      <li>Avatar com iniciais ou foto</li>
      <li>Nome do usuário (bold)</li>
      <li>Email</li>
      <li>Descrição: "Tutor(a) · X pets cadastrados"</li>
      <li>Botão outline: "Editar Perfil"</li>
    </ul>

    <h3>18.3 Seção — Preferências de Notificação</h3>
    <p>Label: "PREFERÊNCIAS DE NOTIFICAÇÃO". Lista de toggles (on/off):</p>
    <table>
      <tr><th>Ícone</th><th>Label</th><th>Descrição</th><th>Padrão</th></tr>
      <tr><td>🔔</td><td>Vacinas</td><td>Lembretes de vacinas próximas e atrasadas</td><td>✅ On</td></tr>
      <tr><td>🔔</td><td>Medicações</td><td>Horários de medicação e reposições</td><td>✅ On</td></tr>
      <tr><td>🔔</td><td>Consultas</td><td>Lembretes de consultas e retornos</td><td>✅ On</td></tr>
      <tr><td>🔔</td><td>Exames</td><td>Notificações quando exames ficarem disponíveis</td><td>✅ On</td></tr>
      <tr><td>🔔</td><td>Novidades e promoções</td><td>Receba dicas de saúde e ofertas de parceiros</td><td>❌ Off</td></tr>
    </table>

    <h3>18.4 Seção — Compartilhamento</h3>
    <ul>
      <li>Label: "COMPARTILHAMENTO"</li>
      <li>Item: <strong>Compartilhar com veterinário</strong> — "Dê acesso aos prontuários dos seus pets para profissionais de confiança"</li>
      <li>Botão outline: "Gerenciar"</li>
    </ul>

    <h3>18.5 Seção — Privacidade e Dados</h3>
    <ul>
      <li>Label: "PRIVACIDADE E DADOS"</li>
      <li>Item 1: <strong>Privacidade dos dados</strong> — "Gerencie como seus dados são utilizados" → botão "Configurar"</li>
      <li>Item 2: <strong>Exportar dados</strong> — "Baixe uma cópia de todos os seus dados" → botão "Exportar"</li>
    </ul>

    <h3>18.6 Seção — Plano Atual</h3>
    <ul>
      <li>Card com fundo verde claro</li>
      <li>Ícone de cartão + nome do plano (ex: "Plano Gratuito (Freemium)")</li>
      <li>Descrição do plano: "Cadastro de pets, histórico básico e agenda de cuidados."</li>
      <li>Botão outline: "Ver planos e Gerenciar Assinatura"</li>
    </ul>

    <h3>18.7 Botão — Sair da Conta</h3>
    <p>Botão vermelho outline com ícone de sair: "→ Sair da Conta". Cor vermelha para indicar ação destrutiva.</p>
  </div>
</div>

<!-- SEÇÃO 19 - PLANOS -->
<div class="section" id="s19">
  <div class="section-header">
    <div class="num">19</div>
    <div><h2>Planos e Assinatura</h2><div class="sub">Modelo de monetização e features por plano</div></div>
  </div>
  <div class="section-body">
    <h3>19.1 Tabela Comparativa de Planos</h3>
    <table>
      <tr>
        <th>Feature</th>
        <th>Gratuito (R$0)</th>
        <th>Essencial (R$29)</th>
        <th>Premium (R$49)</th>
        <th>Família (R$69)</th>
      </tr>
      <tr><td>Cadastro do pet</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td></tr>
      <tr><td>Múltiplos pets</td><td>—</td><td>—</td><td>—</td><td>✅</td></tr>
      <tr><td>Histórico básico de consultas</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td></tr>
      <tr><td>Histórico completo de saúde</td><td>—</td><td>✅</td><td>✅</td><td>✅</td></tr>
      <tr><td>Upload simples de documentos</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td></tr>
      <tr><td>Armazenamento ilimitado de exames</td><td>—</td><td>✅</td><td>✅</td><td>✅</td></tr>
      <tr><td>Agenda inicial de cuidados</td><td>✅</td><td>✅</td><td>✅</td><td>✅</td></tr>
      <tr><td>Agenda inteligente com lembretes</td><td>—</td><td>✅</td><td>✅</td><td>✅</td></tr>
      <tr><td>Vacinas organizadas digitalmente</td><td>—</td><td>✅</td><td>✅</td><td>✅</td></tr>
      <tr><td>Informações centralizadas do pet</td><td>—</td><td>✅</td><td>✅</td><td>✅</td></tr>
      <tr><td>Relatórios de saúde detalhados</td><td>—</td><td>—</td><td>✅</td><td>✅</td></tr>
      <tr><td>Recomendações por raça</td><td>—</td><td>—</td><td>✅</td><td>✅</td></tr>
      <tr><td>Alertas preventivos</td><td>—</td><td>—</td><td>✅</td><td>✅</td></tr>
      <tr><td>Insights automáticos por histórico</td><td>—</td><td>—</td><td>✅</td><td>✅</td></tr>
      <tr><td>Compartilhamento com familiares</td><td>—</td><td>—</td><td>—</td><td>✅</td></tr>
      <tr><td>Prioridade no suporte</td><td>—</td><td>—</td><td>—</td><td>✅</td></tr>
      <tr><td>Comparação de planos e serviços</td><td>—</td><td>—</td><td>—</td><td>✅</td></tr>
    </table>

    <h3>19.2 Badges Visuais dos Planos</h3>
    <table>
      <tr><th>Plano</th><th>Badge</th><th>Estilo do Card</th></tr>
      <tr><td>Gratuito</td><td>—</td><td>Borda cinza simples</td></tr>
      <tr><td>Essencial</td><td><span class="badge-green">MAIS POPULAR</span></td><td>Borda verde espessa, destaque</td></tr>
      <tr><td>Premium</td><td><span class="badge-orange">RECOMENDADO</span></td><td>Borda laranja</td></tr>
      <tr><td>Família</td><td><span class="badge-blue">MULTI-PET</span></td><td>Aparência desbotada ("Em breve")</td></tr>
    </table>
  </div>
</div>

<!-- SEÇÃO 20 - ENTIDADES DE DADOS -->
<div class="section" id="s20">
  <div class="section-header">
    <div class="num">20</div>
    <div><h2>Entidades de Dados</h2><div class="sub">Modelos de dados inferidos do protótipo</div></div>
  </div>
  <div class="section-body">
    <h3>20.1 Usuário (User)</h3>
    <table>
      <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
      <tr><td>id</td><td>UUID</td><td>Identificador único</td></tr>
      <tr><td>nome</td><td>String</td><td>Nome completo</td></tr>
      <tr><td>email</td><td>String</td><td>Email de login</td></tr>
      <tr><td>avatar_url</td><td>String</td><td>URL da foto de perfil</td></tr>
      <tr><td>plano</td><td>Enum</td><td>gratuito | essencial | premium | familia</td></tr>
      <tr><td>tipo_perfil</td><td>Enum</td><td>tutor | clinica | parceiro</td></tr>
      <tr><td>criado_em</td><td>DateTime</td><td>Data de cadastro</td></tr>
    </table>

    <h3>20.2 Pet</h3>
    <table>
      <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
      <tr><td>id</td><td>UUID</td><td>Identificador único</td></tr>
      <tr><td>tutor_id</td><td>FK → User</td><td>Dono do pet</td></tr>
      <tr><td>nome</td><td>String</td><td>Nome do pet</td></tr>
      <tr><td>especie</td><td>Enum</td><td>cao | gato | outro</td></tr>
      <tr><td>sexo</td><td>Enum</td><td>macho | femea</td></tr>
      <tr><td>raca</td><td>String</td><td>Raça</td></tr>
      <tr><td>data_nascimento</td><td>Date</td><td>Data de nascimento</td></tr>
      <tr><td>peso_atual</td><td>Float</td><td>Peso em kg</td></tr>
      <tr><td>foto_url</td><td>String</td><td>URL da foto do pet</td></tr>
      <tr><td>alergias</td><td>Array&lt;String&gt;</td><td>Lista de alérgenos conhecidos</td></tr>
    </table>

    <h3>20.3 Registro Médico (MedicalRecord)</h3>
    <table>
      <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
      <tr><td>id</td><td>UUID</td><td>Identificador único</td></tr>
      <tr><td>pet_id</td><td>FK → Pet</td><td>Pet associado</td></tr>
      <tr><td>tipo</td><td>Enum</td><td>consulta | cirurgia | exame | outro</td></tr>
      <tr><td>motivo</td><td>String</td><td>Motivo da consulta</td></tr>
      <tr><td>data</td><td>Date</td><td>Data do atendimento</td></tr>
      <tr><td>veterinario</td><td>String</td><td>Nome do veterinário</td></tr>
      <tr><td>clinica</td><td>String</td><td>Nome da clínica</td></tr>
      <tr><td>data_retorno</td><td>Date</td><td>Data do próximo retorno</td></tr>
      <tr><td>status</td><td>Enum</td><td>aberto | em_tratamento | resolvido</td></tr>
      <tr><td>soap_subjetivo</td><td>Text</td><td>Queixa e histórico</td></tr>
      <tr><td>soap_objetivo</td><td>Text</td><td>Achados clínicos</td></tr>
      <tr><td>soap_avaliacao</td><td>Text</td><td>Diagnóstico</td></tr>
      <tr><td>soap_plano</td><td>Text</td><td>Tratamento e prescrição</td></tr>
      <tr><td>diagnostico</td><td>String</td><td>Diagnóstico resumido</td></tr>
      <tr><td>tratamento</td><td>String</td><td>Tratamento prescrito</td></tr>
      <tr><td>medicamentos</td><td>Array&lt;String&gt;</td><td>Lista de medicamentos</td></tr>
      <tr><td>sintomas</td><td>String</td><td>Sintomas relatados</td></tr>
      <tr><td>diagnostico_definitivo</td><td>String</td><td>CID ou diagnóstico final</td></tr>
    </table>

    <h3>20.4 Vacina (Vaccine)</h3>
    <table>
      <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
      <tr><td>id</td><td>UUID</td><td>—</td></tr>
      <tr><td>pet_id</td><td>FK → Pet</td><td>—</td></tr>
      <tr><td>nome</td><td>String</td><td>Ex: "V10", "Antirrábica"</td></tr>
      <tr><td>data_aplicacao</td><td>Date</td><td>—</td></tr>
      <tr><td>proxima_dose</td><td>Date</td><td>—</td></tr>
      <tr><td>fabricante</td><td>String</td><td>Ex: MSD, Zoetis</td></tr>
      <tr><td>clinica</td><td>String</td><td>—</td></tr>
      <tr><td>status</td><td>Enum</td><td>em_dia | proxima | atrasada</td></tr>
    </table>

    <h3>20.5 Exame / Documento (Exam)</h3>
    <table>
      <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
      <tr><td>id</td><td>UUID</td><td>—</td></tr>
      <tr><td>pet_id</td><td>FK → Pet</td><td>—</td></tr>
      <tr><td>titulo</td><td>String</td><td>Nome do exame</td></tr>
      <tr><td>tipo</td><td>Enum</td><td>hemograma | imagem | prescricao | certificado | recibo | outro</td></tr>
      <tr><td>data</td><td>Date</td><td>Data do exame</td></tr>
      <tr><td>descricao</td><td>String</td><td>Observações sobre o resultado</td></tr>
      <tr><td>arquivo_url</td><td>String</td><td>URL do arquivo no storage</td></tr>
      <tr><td>tamanho_bytes</td><td>Integer</td><td>Tamanho do arquivo</td></tr>
    </table>

    <h3>20.6 Compromisso (Appointment)</h3>
    <table>
      <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
      <tr><td>id</td><td>UUID</td><td>—</td></tr>
      <tr><td>pet_id</td><td>FK → Pet</td><td>—</td></tr>
      <tr><td>tipo</td><td>Enum</td><td>consulta | vacina | cirurgia | retorno | exame | banho | outro</td></tr>
      <tr><td>data</td><td>Date</td><td>—</td></tr>
      <tr><td>horario</td><td>Time</td><td>—</td></tr>
      <tr><td>clinica</td><td>String</td><td>—</td></tr>
      <tr><td>veterinario</td><td>String</td><td>—</td></tr>
    </table>

    <h3>20.7 Tarefa de Rotina (RoutineTask)</h3>
    <table>
      <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
      <tr><td>id</td><td>UUID</td><td>—</td></tr>
      <tr><td>pet_id</td><td>FK → Pet</td><td>—</td></tr>
      <tr><td>titulo</td><td>String</td><td>—</td></tr>
      <tr><td>categoria</td><td>Enum</td><td>alimentacao | passeio | medicacao | higiene | brincadeira | outro</td></tr>
      <tr><td>horario</td><td>Time</td><td>—</td></tr>
      <tr><td>observacoes</td><td>String</td><td>—</td></tr>
      <tr><td>recorrente</td><td>Boolean</td><td>Se repete diariamente</td></tr>
      <tr><td>concluida_hoje</td><td>Boolean</td><td>Status do dia atual</td></tr>
    </table>

    <h3>20.8 Monitoramento de Saúde (HealthRecord)</h3>
    <table>
      <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
      <tr><td>id</td><td>UUID</td><td>—</td></tr>
      <tr><td>pet_id</td><td>FK → Pet</td><td>—</td></tr>
      <tr><td>data</td><td>Date</td><td>Data do registro</td></tr>
      <tr><td>peso</td><td>Float</td><td>kg</td></tr>
      <tr><td>humor</td><td>Enum</td><td>ativo | neutro | abatido</td></tr>
      <tr><td>atividade</td><td>Enum</td><td>ativo | moderado | sedentario</td></tr>
      <tr><td>hidratacao</td><td>Enum</td><td>normal | baixa | alta</td></tr>
      <tr><td>sono</td><td>Enum</td><td>otimo | bom | regular | ruim</td></tr>
      <tr><td>apetite</td><td>Enum</td><td>normal | aumentado | reduzido</td></tr>
    </table>

    <h3>20.9 Notificação (Notification)</h3>
    <table>
      <tr><th>Campo</th><th>Tipo</th><th>Descrição</th></tr>
      <tr><td>id</td><td>UUID</td><td>—</td></tr>
      <tr><td>usuario_id</td><td>FK → User</td><td>—</td></tr>
      <tr><td>pet_id</td><td>FK → Pet</td><td>Pet relacionado (opcional)</td></tr>
      <tr><td>titulo</td><td>String</td><td>—</td></tr>
      <tr><td>descricao</td><td>String</td><td>—</td></tr>
      <tr><td>tipo</td><td>Enum</td><td>vacina | consulta | medicacao | exame | alerta | outro</td></tr>
      <tr><td>prioridade</td><td>Enum</td><td>alta | media | baixa</td></tr>
      <tr><td>lida</td><td>Boolean</td><td>—</td></tr>
      <tr><td>criada_em</td><td>DateTime</td><td>—</td></tr>
    </table>
  </div>
</div>

<footer>
  <p>📋 Documento de Requisitos — PetPulse v1.0</p>
  <p style="margin-top:8px;opacity:.7">Baseado em análise do protótipo: pet-pulse-care2.base44.app &nbsp;|&nbsp; Vital Biometry &nbsp;|&nbsp; 14/04/2026</p>
</footer>

</body>
</html>