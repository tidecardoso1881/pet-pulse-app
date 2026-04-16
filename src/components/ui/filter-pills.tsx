"use client";

import React from "react";
import { cn } from "@/lib/utils/cn";

/**
 * FilterPills — PetPulse Design System
 *
 * Pills/tags clicáveis para filtrar listas.
 *
 * Exemplos do protótipo:
 *   Meus Pets:  [ Todos ] [ 🐕 Cão ] [ 🐈 Gato ]
 *   Vacinas:    [ Todos ] (filtro por status)
 *   Prontuário: [ Todos ] [ Cacau ] [ Chico ] ... (filtro por pet)
 *               [ Todos ] [ Aberto ] [ Em tratamento ] [ Resolvido ]
 *   Exames:     [ Todos ] [ Hemograma ] [ Imagem ] [ Prescrição ] ...
 *   Monitoramento: [ Cacau ] [ Chico ] [ Thor ★ ] (seletor de pet)
 *
 * Visual:
 *   - Ativo: fundo verde (#2d7a57), texto branco
 *   - Inativo: fundo branco ou transparente, borda cinza
 */

interface FilterOption {
  value: string;
  label: React.ReactNode;
  /** Ícone ou emoji prefixo */
  prefix?: React.ReactNode;
}

interface FilterPillsProps {
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function FilterPills({
  options,
  value,
  onChange,
  className,
}: FilterPillsProps) {
  return (
    <div className={cn("flex flex-wrap gap-2", className)} role="group">
      {options.map((opt) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "inline-flex items-center gap-1.5 px-4 py-1.5",
              "rounded-[var(--radius-pill)] text-sm font-medium",
              "border transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] focus:ring-offset-1",
              isActive
                ? "bg-brand border-brand text-white"
                : "bg-white border-[var(--border-input)] text-[var(--content-secondary)] hover:bg-[var(--brand-bg)] hover:border-brand hover:text-brand"
            )}
            aria-pressed={isActive}
          >
            {opt.prefix && (
              <span className="text-base leading-none">{opt.prefix}</span>
            )}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

/* ── ViewToggle (Lista / Calendário) ────────────────────────────────────────── */
/**
 * Alternância de visualização — usado em Agenda de Cuidados.
 * Especificação (Seção 10.2): [ ≡ Lista ] [ 📅 Calendário ]
 */
interface ViewToggleOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface ViewToggleProps {
  options: ViewToggleOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ViewToggle({ options, value, onChange, className }: ViewToggleProps) {
  return (
    <div
      className={cn(
        "inline-flex rounded-[var(--radius-btn)] border border-[var(--border-input)] bg-white overflow-hidden",
        className
      )}
      role="group"
    >
      {options.map((opt, idx) => {
        const isActive = opt.value === value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={cn(
              "inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium",
              "transition-colors duration-150",
              "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--border-focus)]",
              idx > 0 && "border-l border-[var(--border-input)]",
              isActive
                ? "bg-[var(--brand-light)] text-brand"
                : "text-[var(--content-secondary)] hover:bg-[var(--brand-bg)]"
            )}
            aria-pressed={isActive}
          >
            {opt.icon && <span className="shrink-0">{opt.icon}</span>}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
