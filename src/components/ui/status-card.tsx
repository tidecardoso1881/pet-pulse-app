import React from "react";
import { cn } from "@/lib/utils/cn";

/**
 * StatusCard — PetPulse Design System
 *
 * Cards de resumo numérico, usados no topo de cada tela.
 *
 * Exemplos do protótipo:
 *   Dashboard: Próxima Consulta / Vacinas Pendentes / Medicações Ativas / Último Peso
 *   Prontuário: Total / Em Tratamento / Resolvidos / Em Aberto
 *   Vacinas:    Em Dia / Próximas / Atrasadas
 *
 * Visual: card branco, ícone colorido, valor grande, label pequena.
 */

type StatusVariant = "default" | "success" | "warning" | "danger" | "info";

const variantStyles: Record<
  StatusVariant,
  { iconBg: string; iconColor: string; valueBg: string }
> = {
  default: {
    iconBg:    "bg-[var(--brand-bg)]",
    iconColor: "text-brand",
    valueBg:   "",
  },
  success: {
    iconBg:    "bg-[var(--status-success-bg)]",
    iconColor: "text-[var(--status-success)]",
    valueBg:   "bg-[var(--status-success-bg)]",
  },
  warning: {
    iconBg:    "bg-[var(--status-warning-bg)]",
    iconColor: "text-[var(--status-warning)]",
    valueBg:   "bg-[var(--status-warning-bg)]",
  },
  danger: {
    iconBg:    "bg-[var(--status-danger-bg)]",
    iconColor: "text-[var(--status-danger)]",
    valueBg:   "bg-[var(--status-danger-bg)]",
  },
  info: {
    iconBg:    "bg-[var(--status-info-bg)]",
    iconColor: "text-[var(--status-info)]",
    valueBg:   "bg-[var(--status-info-bg)]",
  },
};

interface StatusCardProps {
  /** Label em uppercase acima do valor */
  label: string;
  /** Valor principal (número ou texto) */
  value: string | number;
  /** Descrição abaixo do valor */
  description?: string;
  /** Ícone */
  icon?: React.ReactNode;
  /** Variante de cor */
  variant?: StatusVariant;
  className?: string;
}

export function StatusCard({
  label,
  value,
  description,
  icon,
  variant = "default",
  className,
}: StatusCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "bg-white rounded-card border border-[var(--border-card)] shadow-card-sm",
        "p-4 flex items-center gap-3",
        className
      )}
    >
      {/* Ícone */}
      {icon && (
        <div
          className={cn(
            "flex items-center justify-center w-10 h-10 rounded-lg shrink-0",
            styles.iconBg,
            styles.iconColor
          )}
        >
          {icon}
        </div>
      )}

      {/* Conteúdo */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="section-label text-[var(--content-muted)]">
          {label}
        </span>
        <span className="text-2xl font-bold text-[var(--content-primary)] leading-none">
          {value}
        </span>
        {description && (
          <span className="text-xs text-[var(--content-muted)] truncate">
            {description}
          </span>
        )}
      </div>
    </div>
  );
}

/** Grade padrão de 4 status-cards (dashboard, prontuário) */
export function StatusCardGrid({
  children,
  cols = 4,
  className,
}: {
  children: React.ReactNode;
  cols?: 2 | 3 | 4;
  className?: string;
}) {
  const colsClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[cols];

  return (
    <div className={cn("grid gap-4", colsClass, className)}>
      {children}
    </div>
  );
}
