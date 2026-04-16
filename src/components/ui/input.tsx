import * as React from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Input — PetPulse Design System
 *
 * Especificação (Seção 2, Documento de Requisitos):
 *   - Borda 1px cinza
 *   - Focus: borda verde (#2d7a57)
 *   - Border-radius 6–8px → usamos 8px
 *   - Placeholder cinza claro
 *   - Label: sans-serif semibold, ~13px
 */

/* ── Input base ─────────────────────────────────────────────────────────────── */
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Ícone à esquerda dentro do input */
  leftIcon?: React.ReactNode;
  /** Ícone à direita dentro do input */
  rightIcon?: React.ReactNode;
  /** Mensagem de erro */
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, leftIcon, rightIcon, error, type, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--content-muted)] pointer-events-none">
            {leftIcon}
          </span>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            // Base
            "w-full h-10 bg-white text-[var(--content-primary)]",
            "border border-[var(--border-input)] rounded-[var(--radius-input)]",
            "px-3 py-2 text-sm",
            // Placeholder
            "placeholder:text-[var(--content-muted)]",
            // Focus
            "focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] focus:border-[var(--border-focus)]",
            // Transição
            "transition-colors duration-150",
            // Disabled
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[var(--surface-inner)]",
            // Error
            error && "border-[var(--status-danger)] focus:ring-[var(--status-danger)]",
            // Padding com ícones
            leftIcon  && "pl-9",
            rightIcon && "pr-9",
            className
          )}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--content-muted)] pointer-events-none">
            {rightIcon}
          </span>
        )}
        {error && (
          <p className="mt-1 text-xs text-[var(--status-danger)]">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

/* ── Textarea ───────────────────────────────────────────────────────────────── */
export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, ...props }, ref) => (
    <div className="w-full">
      <textarea
        ref={ref}
        className={cn(
          "w-full min-h-[80px] bg-white text-[var(--content-primary)]",
          "border border-[var(--border-input)] rounded-[var(--radius-input)]",
          "px-3 py-2 text-sm resize-y",
          "placeholder:text-[var(--content-muted)]",
          "focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] focus:border-[var(--border-focus)]",
          "transition-colors duration-150",
          "disabled:cursor-not-allowed disabled:opacity-50",
          error && "border-[var(--status-danger)]",
          className
        )}
        {...props}
      />
      {error && (
        <p className="mt-1 text-xs text-[var(--status-danger)]">{error}</p>
      )}
    </div>
  )
);
Textarea.displayName = "Textarea";

/* ── Label ──────────────────────────────────────────────────────────────────── */
export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, required, children, ...props }, ref) => (
    <label
      ref={ref}
      className={cn(
        "text-label text-[var(--content-secondary)] block mb-1",
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="text-[var(--status-danger)] ml-0.5">*</span>
      )}
    </label>
  )
);
Label.displayName = "Label";

/* ── FormField (Label + Input + Error agrupados) ────────────────────────────── */
export interface FormFieldProps {
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  className?: string;
  hint?: string;
}

export function FormField({
  label,
  required,
  error,
  children,
  className,
  hint,
}: FormFieldProps) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <Label required={required}>{label}</Label>
      {children}
      {hint && !error && (
        <p className="text-xs text-[var(--content-muted)]">{hint}</p>
      )}
    </div>
  );
}
