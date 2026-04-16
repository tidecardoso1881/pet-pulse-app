import React from "react";
import { cn } from "@/lib/utils/cn";

/**
 * PageHeader — PetPulse Design System
 *
 * Padrão de cabeçalho de tela do app, usado em todas as páginas internas.
 *
 * Exemplos do protótipo:
 *   "Painel Principal" + "Olá, Tide! Aqui está o resumo dos seus pets."
 *   "Meus Pets" + "0 pets cadastrados" + botão [ + Adicionar Pet ]
 *   "Vacinas" + "Carteira de vacinação digital" + botão [ + Registrar Vacina ]
 */
interface PageHeaderProps {
  /** Título principal da tela */
  title: string;
  /** Subtítulo ou contagem (ex: "0 pets cadastrados") */
  subtitle?: string;
  /** Ícone à esquerda do título (opcional, ex: ícone de refresh) */
  icon?: React.ReactNode;
  /** Ação principal — normalmente um <Button> */
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  icon,
  action,
  className,
}: PageHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-start justify-between gap-4 mb-6",
        className
      )}
    >
      <div className="flex items-center gap-2">
        {icon && (
          <span className="text-brand mt-0.5">{icon}</span>
        )}
        <div>
          <h1 className="page-title">{title}</h1>
          {subtitle && (
            <p className="text-sm text-[var(--content-muted)] mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {action && (
        <div className="shrink-0">{action}</div>
      )}
    </div>
  );
}
