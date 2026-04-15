"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "./button";

/**
 * Shelf — PetPulse Design System
 *
 * Painel deslizante que abre pelo lado direito da tela.
 * Substitui todos os modais/popups do sistema.
 *
 * Decisão de design: todos os formulários (Adicionar Pet, Nova Consulta,
 * Registrar Vacina, Novo Prontuário, Upload de Documento, Nova Tarefa, etc.)
 * abrem como Shelf pelo lado direito — não como modal centralizado.
 *
 * Visual:
 *   - Overlay escuro semi-transparente à esquerda
 *   - Painel branco desliza da direita (largura ~480px no desktop, 100% no mobile)
 *   - Header com título + botão ✕
 *   - Corpo scrollável com campos do formulário
 *   - Footer fixo com botão primário verde (largura total)
 */

const Shelf = DialogPrimitive.Root;
const ShelfTrigger = DialogPrimitive.Trigger;
const ShelfClose = DialogPrimitive.Close;
const ShelfPortal = DialogPrimitive.Portal;

/* ── Overlay ────────────────────────────────────────────────────────────────── */
const ShelfOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/40",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "duration-200",
      className
    )}
    {...props}
  />
));
ShelfOverlay.displayName = "ShelfOverlay";

/* ── Painel principal ───────────────────────────────────────────────────────── */
const ShelfContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    /**
     * Largura do shelf:
     *   sm  → 400px
     *   md  → 480px (padrão, equivale ao modal padrão do protótipo)
     *   lg  → 600px
     *   xl  → 720px
     */
    size?: "sm" | "md" | "lg" | "xl";
  }
>(({ className, children, size = "md", ...props }, ref) => {
  const widthClass = {
    sm: "w-full max-w-[400px]",
    md: "w-full max-w-[480px]",
    lg: "w-full max-w-[600px]",
    xl: "w-full max-w-[720px]",
  }[size];

  return (
    <ShelfPortal>
      <ShelfOverlay />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          // Posicionamento: fixo no lado direito, altura total
          "fixed top-0 right-0 z-50 h-full",
          widthClass,
          // Visual
          "bg-white shadow-[var(--shadow-modal)]",
          "flex flex-col",
          // Animação: desliza da direita
          "data-[state=open]:animate-in data-[state=closed]:animate-out",
          "data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right",
          "duration-300 ease-in-out",
          className
        )}
        {...props}
      >
        {children}
      </DialogPrimitive.Content>
    </ShelfPortal>
  );
});
ShelfContent.displayName = "ShelfContent";

/* ── Header ─────────────────────────────────────────────────────────────────── */
const ShelfHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between",
      "px-6 py-5 border-b border-[var(--border)]",
      "shrink-0",
      className
    )}
    {...props}
  >
    <div className="flex-1 pr-4">{children}</div>
    {/* Botão fechar */}
    <DialogPrimitive.Close
      className={cn(
        "shrink-0 flex items-center justify-center w-8 h-8 rounded-full",
        "text-[var(--content-muted)]",
        "hover:bg-[var(--brand-light)] hover:text-brand",
        "transition-colors duration-150",
        "focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)]"
      )}
    >
      <X size={18} />
      <span className="sr-only">Fechar</span>
    </DialogPrimitive.Close>
  </div>
));
ShelfHeader.displayName = "ShelfHeader";

/* ── Title ──────────────────────────────────────────────────────────────────── */
const ShelfTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-bold text-[var(--content-primary)]", className)}
    {...props}
  />
));
ShelfTitle.displayName = "ShelfTitle";

/* ── Description ────────────────────────────────────────────────────────────── */
const ShelfDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-[var(--content-muted)] mt-0.5", className)}
    {...props}
  />
));
ShelfDescription.displayName = "ShelfDescription";

/* ── Body (scrollável) ──────────────────────────────────────────────────────── */
const ShelfBody = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex-1 overflow-y-auto",
      "px-6 py-5",
      "flex flex-col gap-4",
      className
    )}
    {...props}
  />
));
ShelfBody.displayName = "ShelfBody";

/* ── Footer (fixo na base) ───────────────────────────────────────────────────── */
const ShelfFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "shrink-0 px-6 py-4",
      "border-t border-[var(--border)]",
      "bg-white",
      className
    )}
    {...props}
  />
));
ShelfFooter.displayName = "ShelfFooter";

/* ── Submit (CTA verde largura total) ───────────────────────────────────────── */
interface ShelfSubmitProps {
  children: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

function ShelfSubmit({ children, isLoading, onClick, disabled }: ShelfSubmitProps) {
  return (
    <Button
      variant="primary"
      size="full"
      isLoading={isLoading}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}

export {
  Shelf,
  ShelfTrigger,
  ShelfClose,
  ShelfPortal,
  ShelfOverlay,
  ShelfContent,
  ShelfHeader,
  ShelfTitle,
  ShelfDescription,
  ShelfBody,
  ShelfFooter,
  ShelfSubmit,
};
