import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

/**
 * Badge — PetPulse Design System
 *
 * Especificação (Seção 2, Documento de Requisitos):
 *   green  → bg #e8f5ef, text #2d7a57, border #b8dfc8  — status positivo
 *   orange → bg #fff3e0, text #e65c00, border #ffcc80  — atenção/médio
 *   blue   → bg #e3f2fd, text #1565c0, border #90caf9  — informativo
 *   red    → bg #fce4ec, text #c62828, border #f48fb1  — crítico
 *
 * Usado em: status de vacinas, prontuários, badges de plano, notificações
 */
const badgeVariants = cva(
  [
    "inline-flex items-center gap-1.5",
    "border rounded-badge",
    "px-3 py-0.5",
    "text-[0.8rem] font-semibold",
    "whitespace-nowrap",
  ],
  {
    variants: {
      variant: {
        /** Em dia / Resolvido / Sucesso */
        green: [
          "bg-[#e8f5ef] text-brand border-[#b8dfc8]",
        ],
        /** Atenção / Em tratamento / Próximas */
        orange: [
          "bg-[#fff3e0] text-[#e65c00] border-[#ffcc80]",
        ],
        /** Crítico / Atrasadas / Alergias */
        red: [
          "bg-[#fce4ec] text-[#c62828] border-[#f48fb1]",
        ],
        /** Informativo */
        blue: [
          "bg-[#e3f2fd] text-[#1565c0] border-[#90caf9]",
        ],
        /** Neutro / cinza */
        gray: [
          "bg-[#f3f4f6] text-[#4b5563] border-[#d1d5db]",
        ],
        /** Tag de plano — "MAIS POPULAR" */
        brand: [
          "bg-brand text-white border-transparent",
        ],
        /** Tag laranja sólido — "RECOMENDADO" */
        "brand-orange": [
          "bg-[#f59e0b] text-white border-transparent",
        ],
        /** Notificação numérica no header */
        notify: [
          "bg-[#f59e0b] text-white border-transparent",
          "rounded-full px-1.5 py-0 min-w-[1.25rem] h-5",
          "text-[0.7rem] justify-center",
        ],
      },
    },
    defaultVariants: {
      variant: "green",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

/** Dot indicator (ponto de status) */
export function StatusDot({
  status,
  className,
}: {
  status: "online" | "warning" | "error" | "neutral";
  className?: string;
}) {
  const colors: Record<typeof status, string> = {
    online:  "bg-brand",
    warning: "bg-[#f59e0b]",
    error:   "bg-[#c62828]",
    neutral: "bg-[#9ca3af]",
  };

  return (
    <span
      className={cn(
        "inline-block w-2 h-2 rounded-full shrink-0",
        colors[status],
        className
      )}
      aria-hidden="true"
    />
  );
}
