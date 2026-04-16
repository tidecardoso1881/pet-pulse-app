import * as React from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Card — PetPulse Design System
 *
 * Especificação (Seção 2, Documento de Requisitos):
 *   - Fundo branco
 *   - Border-radius 8–12px → usamos 12px (--radius-card)
 *   - Box-shadow leve
 *   - Borda 1px cinza claro
 */

/* ── Card raiz ──────────────────────────────────────────────────────────────── */
const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "bg-surface-card rounded-card border border-[var(--border-card)]",
      "shadow-card",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

/* ── Header ─────────────────────────────────────────────────────────────────── */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1 p-5 pb-0", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/* ── Title ──────────────────────────────────────────────────────────────────── */
const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-sm font-semibold text-[var(--content-secondary)] uppercase tracking-wide",
      className
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/* ── Description ────────────────────────────────────────────────────────────── */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-caption text-[var(--content-muted)]", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/* ── Content ────────────────────────────────────────────────────────────────── */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-5", className)}
    {...props}
  />
));
CardContent.displayName = "CardContent";

/* ── Footer ─────────────────────────────────────────────────────────────────── */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between p-5 pt-0 border-t border-[var(--border)] mt-auto",
      className
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };
