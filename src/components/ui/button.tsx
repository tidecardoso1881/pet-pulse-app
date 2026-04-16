"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils/cn";

/**
 * Button — PetPulse Design System
 *
 * Variantes definidas na Seção 2 do Documento de Requisitos:
 *   primary  → fundo #2d7a57, texto branco, border-radius 8px, padding 12px 24px
 *   outline  → fundo transparente, borda 1px cinza, hover fundo cinza claro
 *   ghost    → sem borda, hover fundo levemente verde
 *   danger   → fundo vermelho (ações destrutivas)
 */
const buttonVariants = cva(
  // Base
  [
    "inline-flex items-center justify-center gap-2",
    "font-semibold text-sm whitespace-nowrap",
    "transition-colors duration-150",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--border-focus)]",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer select-none",
  ],
  {
    variants: {
      variant: {
        /** Botão primário verde — ação principal de cada tela */
        primary: [
          "bg-brand text-white",
          "hover:bg-brand-dark",
          "active:bg-brand-dark",
          "rounded-[var(--radius-btn)]",
        ],
        /** Botão outline — ação secundária */
        outline: [
          "border border-[var(--border-input)] bg-transparent",
          "text-[var(--content-secondary)]",
          "hover:bg-[var(--brand-bg)] hover:border-[var(--border-focus)]",
          "rounded-[var(--radius-btn)]",
        ],
        /** Botão ghost — itens de navegação, ações discretas */
        ghost: [
          "bg-transparent text-[var(--content-secondary)]",
          "hover:bg-[var(--brand-light)] hover:text-brand",
          "rounded-[var(--radius-btn)]",
        ],
        /** Botão destrutivo */
        danger: [
          "bg-status-danger text-white",
          "hover:bg-[#b71c1c]",
          "rounded-[var(--radius-btn)]",
        ],
        /** Link discreto */
        link: [
          "bg-transparent text-brand underline-offset-4",
          "hover:underline",
          "rounded-none p-0 h-auto",
        ],
      },
      size: {
        sm:   "h-8  px-3  text-xs",
        md:   "h-10 px-5  text-sm",
        lg:   "h-11 px-6  text-base",
        /** Largura total — usado em CTAs de modais */
        full: "h-11 px-6  text-sm w-full justify-center",
        icon: "h-9  w-9   p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size:    "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Renderiza como filho (Radix Slot) — útil para links com estilo de botão */
  asChild?: boolean;
  /** Mostra spinner de loading e desabilita o botão */
  isLoading?: boolean;
  /** Ícone à esquerda */
  leftIcon?: React.ReactNode;
  /** Ícone à direita */
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin h-4 w-4 shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12" cy="12" r="10"
              stroke="currentColor" strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3V4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && (
          <span className="shrink-0">{leftIcon}</span>
        )}
        {children}
        {!isLoading && rightIcon && (
          <span className="shrink-0">{rightIcon}</span>
        )}
      </Comp>
    );
  }
);

Button.displayName = "Button";
