"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  PawPrint,
  ClipboardList,
  CalendarDays,
  Syringe,
  FolderOpen,
  Activity,
  MapPin,
  UtensilsCrossed,
  ShoppingBag,
  Bell,
  Settings,
  CreditCard,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils/cn";

/**
 * Sidebar — PetPulse Design System
 *
 * Especificação (Seção 6.2, Documento de Requisitos):
 *   - Logo PetPulse + VITAL BIOMETRY no topo
 *   - Itens de navegação com ícone outline
 *   - Item ativo: fundo verde-menta (#e8f5ef), texto verde (#2d7a57)
 *   - Badge de notificação laranja em Notificações
 *   - Rodapé: plano atual + link "Ver planos e assinatura"
 *   - Botão ✕ para fechar (mobile)
 */

export interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const NAV_ITEMS: SidebarItem[] = [
  { label: "Painel Principal",       href: "/dashboard",         icon: <LayoutDashboard size={18} /> },
  { label: "Meus Pets",              href: "/pets",              icon: <PawPrint size={18} /> },
  { label: "Prontuário Digital",     href: "/medical-records",   icon: <ClipboardList size={18} /> },
  { label: "Agenda de Cuidados",     href: "/appointments",      icon: <CalendarDays size={18} /> },
  { label: "Vacinas",                href: "/vaccines",          icon: <Syringe size={18} /> },
  { label: "Repositório de Exames",  href: "/exams",             icon: <FolderOpen size={18} /> },
  { label: "Monitoramento Ativo",    href: "/health-monitoring", icon: <Activity size={18} /> },
  { label: "Localização GPS",        href: "/gps",               icon: <MapPin size={18} /> },
  { label: "Rotina e Alimentação",   href: "/routine",           icon: <UtensilsCrossed size={18} /> },
  { label: "Marketplace",            href: "/marketplace",       icon: <ShoppingBag size={18} /> },
  { label: "Notificações",           href: "/notifications",     icon: <Bell size={18} />, badge: 4 },
  { label: "Configurações",          href: "/settings",          icon: <Settings size={18} /> },
];

interface SidebarProps {
  /** Controle mobile: se o menu está aberto */
  isOpen?: boolean;
  /** Callback para fechar o menu (mobile) */
  onClose?: () => void;
  /** Número de notificações não lidas (sobrescreve o padrão) */
  notificationCount?: number;
  /** Nome do plano atual do usuário */
  planName?: string;
}

export function Sidebar({
  isOpen = true,
  onClose,
  notificationCount,
  planName = "Plano Gratuito",
}: SidebarProps) {
  const pathname = usePathname();

  // Substitui badge de notificações se passado via prop
  const items = notificationCount !== undefined
    ? NAV_ITEMS.map((item) =>
        item.href === "/notifications"
          ? { ...item, badge: notificationCount }
          : item
      )
    : NAV_ITEMS;

  return (
    <>
      {/* Overlay mobile */}
      {isOpen && onClose && (
        <div
          className="fixed inset-0 bg-black/30 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          // Base
          "fixed top-0 left-0 h-full z-40",
          "w-[var(--sidebar-width)] bg-[var(--sidebar-bg)]",
          "border-r border-[var(--border)] flex flex-col",
          "transition-transform duration-250",
          // Mobile: esconde se fechado
          !isOpen && "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[var(--border)]">
          <Link href="/dashboard" className="flex items-center gap-2 group">
            {/* Ícone coração-pata */}
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand text-white text-base font-bold select-none">
              🐾
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-brand">PetPulse</span>
              <span className="text-[9px] font-semibold tracking-widest text-[var(--content-muted)] uppercase">
                Vital Biometry
              </span>
            </div>
          </Link>

          {/* Botão fechar — apenas mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1 rounded text-[var(--content-muted)] hover:bg-[var(--brand-light)]"
              aria-label="Fechar menu"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* ── Navegação ─────────────────────────────────────────────────── */}
        <nav className="flex-1 overflow-y-auto py-2 px-2">
          <ul className="flex flex-col gap-0.5">
            {items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg",
                      "text-sm font-medium transition-colors duration-150",
                      "relative",
                      isActive
                        ? "bg-[var(--sidebar-active)] text-[var(--sidebar-active-text)]"
                        : "text-[var(--sidebar-text)] hover:bg-[var(--brand-bg)] hover:text-brand"
                    )}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span
                      className={cn(
                        "shrink-0 transition-colors",
                        isActive
                          ? "text-brand"
                          : "text-[var(--content-muted)]"
                      )}
                    >
                      {item.icon}
                    </span>
                    <span className="flex-1 truncate">{item.label}</span>

                    {/* Badge de notificação */}
                    {item.badge !== undefined && item.badge > 0 && (
                      <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-[var(--notify)] text-white text-[0.65rem] font-bold">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Rodapé — plano atual ───────────────────────────────────────── */}
        <div className="px-4 py-4 border-t border-[var(--border)]">
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-[var(--brand-bg)] transition-colors group"
          >
            <span className="flex items-center justify-center w-7 h-7 rounded-full bg-[var(--brand-light)] text-brand">
              <CreditCard size={14} />
            </span>
            <div className="flex flex-col leading-tight">
              <span className="text-xs font-semibold text-[var(--content-secondary)]">
                {planName}
              </span>
              <span className="text-[11px] text-brand group-hover:underline">
                Ver planos e assinatura
              </span>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
