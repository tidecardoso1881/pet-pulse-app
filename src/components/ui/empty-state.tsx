import React from "react";
import { cn } from "@/lib/utils/cn";
import { Button } from "./button";

/**
 * EmptyState — PetPulse Design System
 *
 * Estado vazio padrão — presente em quase todas as telas quando não há dados.
 *
 * Exemplos do protótipo:
 *   Meus Pets:
 *     🐾  "Bem-vindo ao PetPulse!"
 *         "Você ainda não tem pets cadastrados. Adicione seu primeiro companheiro agora."
 *         [ + Cadastrar meu primeiro pet ]
 *
 *   Vacinas:
 *     🛡️  "Nenhuma vacina registrada."
 *
 *   Dashboard (sem pets):
 *     🐾  "Cadastre seu primeiro pet"
 *         "Você ainda não tem pets cadastrados..."
 *         [ Cadastrar meu primeiro pet ]
 *
 * Visual: centralizado, ícone emoji grande, título, subtítulo, botão CTA.
 */
interface EmptyStateProps {
  /** Emoji ou ícone React */
  icon?: React.ReactNode;
  /** Título */
  title: string;
  /** Descrição opcional */
  description?: string;
  /** Texto do botão CTA */
  actionLabel?: string;
  /** Callback do botão */
  onAction?: () => void;
  /** Variante: inline (dentro de card) ou page (centralizado na tela) */
  variant?: "inline" | "page";
  className?: string;
}

export function EmptyState({
  icon = "🐾",
  title,
  description,
  actionLabel,
  onAction,
  variant = "inline",
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center text-center",
        variant === "page"
          ? "min-h-[60vh] gap-4"
          : "py-16 px-6 gap-3",
        className
      )}
    >
      {/* Ícone */}
      <div className="text-4xl select-none">{icon}</div>

      {/* Texto */}
      <div className="flex flex-col gap-1 max-w-xs">
        <p className="font-semibold text-[var(--content-primary)] text-base">
          {title}
        </p>
        {description && (
          <p className="text-sm text-[var(--content-muted)] leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {/* CTA */}
      {actionLabel && onAction && (
        <Button
          variant="primary"
          size="md"
          onClick={onAction}
          leftIcon={<span>+</span>}
          className="mt-1"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
