"use client";

import React from "react";
import Link from "next/link";
import { Search, Bell, Menu } from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * Header Global — PetPulse Design System
 *
 * Especificação (Seção 6.1, Documento de Requisitos):
 *   ☰  [ 🔍 Buscar pets, consultas, registros... ]   🔔(badge)  [SB avatar]
 *
 *   - Hambúrguer: abre sidebar (mobile)
 *   - Busca global: placeholder "Buscar pets, consultas, registros..."
 *   - Sino: notificações com badge numérico laranja
 *   - Avatar: iniciais do usuário em círculo verde → abre menu de conta (EP-14)
 */

interface HeaderProps {
  /** Abre/fecha sidebar (mobile) */
  onMenuToggle?: () => void;
  /** Número de notificações não lidas */
  notificationCount?: number;
  /** Dados do usuário */
  user?: {
    name: string;
    initials: string;
    avatarUrl?: string;
  };
  /** Callback ao clicar no avatar */
  onAvatarClick?: () => void;
  className?: string;
}

export function Header({
  onMenuToggle,
  notificationCount = 0,
  user,
  onAvatarClick,
  className,
}: HeaderProps) {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30",
        "left-0 lg:left-[var(--sidebar-width)]",
        "h-[var(--header-height)] bg-[var(--header-bg)]",
        "border-b border-[var(--header-border)]",
        "shadow-[var(--shadow-header)]",
        "flex items-center gap-3 px-4",
        className
      )}
    >
      {/* Hambúrguer — apenas mobile */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-1.5 rounded-md text-[var(--content-muted)] hover:bg-[var(--brand-light)] transition-colors"
        aria-label="Abrir menu"
      >
        <Menu size={20} />
      </button>

      {/* Busca global ─────────────────────────────────────────────────── */}
      <div className="flex-1 max-w-md relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--content-muted)] pointer-events-none"
        />
        <input
          type="search"
          placeholder="Buscar pets, consultas, registros..."
          className={cn(
            "w-full h-9 pl-9 pr-3 text-sm",
            "bg-[var(--surface-inner)] text-[var(--content-primary)]",
            "border border-[var(--border)] rounded-[var(--radius-pill)]",
            "placeholder:text-[var(--content-muted)]",
            "focus:outline-none focus:ring-2 focus:ring-[var(--border-focus)] focus:border-[var(--border-focus)]",
            "transition-colors duration-150"
          )}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Ações à direita ──────────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        {/* Notificações */}
        <Link href="/notifications" className="relative p-2 rounded-full hover:bg-[var(--brand-light)] transition-colors" aria-label="Notificações">
          <Bell size={20} className="text-[var(--content-secondary)]" />
          {notificationCount > 0 && (
            <span className="absolute top-1 right-1 inline-flex items-center justify-center min-w-[1rem] h-4 px-0.5 rounded-full bg-[var(--notify)] text-white text-[0.6rem] font-bold leading-none">
              {notificationCount > 99 ? "99+" : notificationCount}
            </span>
          )}
        </Link>

        {/* Avatar do usuário (EP-14) */}
        <button
          onClick={onAvatarClick}
          className="flex items-center justify-center w-8 h-8 rounded-full bg-brand text-white text-sm font-bold uppercase hover:bg-brand-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
          aria-label="Menu do usuário"
          title={user?.name}
        >
          {user?.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <span>{user?.initials ?? "U"}</span>
          )}
        </button>
      </div>
    </header>
  );
}
