import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ─── PetPulse Design System ───────────────────────────────────────
        // Fonte: PetPulse-Documento-de-Requisitos (Seção 2 – Identidade Visual)

        // Verdes (marca)
        brand: {
          dark:   "#1a4d35", // Títulos principais, textos de destaque
          DEFAULT:"#2d7a57", // Botões primários, links, ícones ativos
          accent: "#43a87a", // Badges, hovers, gradientes
          light:  "#e8f5ef", // Fundo de alertas positivos / status verde claro
          muted:  "#b8dfc8", // Bordas verdes sutis
          bg:     "#f8fdf9", // Fundo de cards com tom esverdeado
        },

        // Fundo e superfícies
        surface: {
          page:   "#f5f2ec", // Fundo geral da página (bege/off-white)
          card:   "#ffffff", // Cards, modais
          inner:  "#f8fdf9", // Cards internos com tom verde
        },

        // Status semânticos
        status: {
          success:  "#2d7a57", // Resolvido / em dia
          "success-bg": "#e8f5ef",
          warning:  "#f59e0b", // Atenção / medicações
          "warning-bg": "#fff3e0",
          danger:   "#c62828", // Crítico / alergias
          "danger-bg":  "#fce4ec",
          info:     "#1565c0", // Informativo
          "info-bg":    "#e3f2fd",
        },

        // Notificações / badge laranja
        notify: {
          DEFAULT: "#f59e0b",
          bg:      "#fff3e0",
          border:  "#ffcc80",
        },

        // SOAP (prontuário)
        soap: {
          "s-bg":     "#e8f4fd", // Subjetivo – azul
          "s-border": "#1976d2",
          "o-bg":     "#e8f5e9", // Objetivo – verde
          "o-border": "#388e3c",
          "a-bg":     "#fff8e1", // Avaliação – âmbar
          "a-border": "#f9a825",
          "p-bg":     "#f3e5f5", // Plano – roxo
          "p-border": "#7b1fa2",
        },

        // Texto
        content: {
          primary:   "#1a2e1a", // Texto principal (verde-escuro quase preto)
          secondary: "#4a5568", // Texto secundário
          muted:     "#6b7280", // Placeholders, labels sutis
          inverse:   "#ffffff", // Texto sobre fundo escuro
        },

        // Bordas
        border: {
          DEFAULT: "#e8ede8",  // Borda padrão
          card:    "#d4ead8",  // Borda de cards
          input:   "#cbd5e0",  // Borda de inputs
          focus:   "#2d7a57",  // Foco em inputs
        },

        // Sidebar
        sidebar: {
          bg:          "#ffffff",
          active:      "#e8f5ef", // Fundo do item ativo
          "active-text":"#2d7a57",// Texto do item ativo
          text:        "#374151",  // Texto padrão
          "text-muted":"#6b7280",  // Texto desabilitado
        },

        // Landing page tokens
        "brand-ultra": "#f4fbf7",

        // Backward compat (usado pelo shadcn gerado)
        background: "var(--background)",
        foreground:  "var(--foreground)",
      },

      fontFamily: {
        sans: ["var(--font-geist-sans)", "Segoe UI", "Arial", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },

      fontSize: {
        // Escala tipográfica do design system
        "h1-landing": ["3rem",    { lineHeight: "1.15", fontWeight: "700" }],
        "h2-section": ["2rem",    { lineHeight: "1.2",  fontWeight: "700" }],
        "h1-app":     ["1.625rem",{ lineHeight: "1.25", fontWeight: "700" }],
        "section-label": ["0.75rem", { lineHeight: "1", fontWeight: "600", letterSpacing: "0.08em" }],
        body:         ["0.9375rem", { lineHeight: "1.6" }],
        label:        ["0.8125rem", { lineHeight: "1.4", fontWeight: "600" }],
        caption:      ["0.8125rem", { lineHeight: "1.4" }],
      },

      borderRadius: {
        card:  "12px",
        modal: "12px",
        btn:   "8px",
        input: "8px",
        badge: "20px",
        pill:  "9999px",
      },

      boxShadow: {
        card:   "0 2px 16px rgba(0,0,0,0.07)",
        "card-sm": "0 2px 12px rgba(0,0,0,0.08)",
        modal:  "0 8px 32px rgba(0,0,0,0.18)",
        header: "0 1px 4px rgba(0,0,0,0.08)",
      },

      spacing: {
        // Padding padrão de páginas e seções
        "page-x": "2rem",
        "page-y": "2rem",
        "section": "2.5rem",
      },

      width: {
        sidebar: "240px",
        modal:   "480px",
        "modal-lg": "640px",
      },
    },
  },
  plugins: [],
};

export default config;
