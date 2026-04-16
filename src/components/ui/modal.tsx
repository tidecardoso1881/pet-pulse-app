"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { Button } from "./button";

/**
 * Modal — PetPulse Design System
 *
 * Especificação (Seção 2, Documento de Requisitos):
 *   - Overlay escuro no fundo
 *   - Título em negrito no topo
 *   - Botão ✕ para fechar no canto superior direito
 *   - Campos do formulário no corpo
 *   - Botão primário verde na parte inferior (largura total)
 *   - Largura ~450–680px; altura máxima scrollable
 *   - Border-radius 12px
 *
 * Usado em: Adicionar Pet, Nova Consulta, Registrar Vacina, Novo Prontuário,
 *           Upload de Documento, Nova Tarefa, etc.
 */

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

/* ── Overlay ────────────────────────────────────────────────────────────────── */
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/50",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

/* ── Content ────────────────────────────────────────────────────────────────── */
const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    /** Tamanho do modal: md (480px) ou lg (640px) */
    size?: "md" | "lg";
  }
>(({ className, children, size = "md", ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        // Posicionamento
        "fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2",
        // Dimensões
        "w-full max-h-[90vh] overflow-y-auto",
        size === "md" ? "max-w-[480px]" : "max-w-[640px]",
        // Visual
        "bg-white rounded-[var(--radius-modal)] shadow-[var(--shadow-modal)]",
        // Animação
        "data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        "data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%]",
        "data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
        "duration-200",
        className
      )}
      {...props}
    >
      {children}
      {/* Botão de fechar ✕ */}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-[var(--brand-light)] data-[state=open]:text-brand">
        <X size={18} />
        <span className="sr-only">Fechar</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

/* ── Header ─────────────────────────────────────────────────────────────────── */
function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-1 px-6 pt-6 pb-4 border-b border-[var(--border)]", className)}
      {...props}
    />
  );
}
DialogHeader.displayName = "DialogHeader";

/* ── Footer ─────────────────────────────────────────────────────────────────── */
function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex flex-col gap-2 px-6 pb-6 pt-4", className)}
      {...props}
    />
  );
}
DialogFooter.displayName = "DialogFooter";

/* ── Title ──────────────────────────────────────────────────────────────────── */
const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-bold text-[var(--content-primary)]", className)}
    {...props}
  />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

/* ── Description ────────────────────────────────────────────────────────────── */
const DialogDescription = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn("text-sm text-[var(--content-muted)]", className)}
    {...props}
  />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

/* ── Body ───────────────────────────────────────────────────────────────────── */
function DialogBody({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-6 py-5 flex flex-col gap-4", className)} {...props} />
  );
}
DialogBody.displayName = "DialogBody";

/* ── Botão de submit padrão (CTA verde largura total) ───────────────────────── */
interface DialogSubmitProps {
  children: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
}

function DialogSubmit({ children, isLoading, onClick }: DialogSubmitProps) {
  return (
    <Button variant="primary" size="full" isLoading={isLoading} onClick={onClick}>
      {children}
    </Button>
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogClose,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogBody,
  DialogSubmit,
};
