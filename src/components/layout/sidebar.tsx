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
  { label: "Painel Principal",       href: "/dashboard",         icon: <LayoutDashboard size={15} /> },
  { label: "Meus Pets",              href: "/pets",              icon: <PawPrint size={15} /> },
  { label: "Prontuário Digital",     href: "/medical-records",   icon: <ClipboardList size={15} /> },
  { label: "Agenda de Cuidados",     href: "/appointments",      icon: <CalendarDays size={15} /> },
  { label: "Vacinas",                href: "/vaccines",          icon: <Syringe size={15} /> },
  { label: "Repositório de Exames",  href: "/exams",             icon: <FolderOpen size={15} /> },
  { label: "Monitoramento Ativo",    href: "/health-monitoring", icon: <Activity size={15} /> },
  { label: "Localização GPS",        href: "/gps",               icon: <MapPin size={15} /> },
  { label: "Rotina e Alimentação",   href: "/routine",           icon: <UtensilsCrossed size={15} /> },
  { label: "Marketplace",            href: "/marketplace",       icon: <ShoppingBag size={15} /> },
  { label: "Notificações",           href: "/notifications",     icon: <Bell size={15} />, badge: 4 },
  { label: "Configurações",          href: "/settings",          icon: <Settings size={15} /> },
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
            <svg
              width="26"
              height="26"
              viewBox="0 0 26 26"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M13 22s-9-5.5-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-9 12-9 12z"
                fill="#2d7a57"
                opacity="0.15"
              />
              <path
                d="M13 22s-9-5.5-9-12a5 5 0 0 1 9-3 5 5 0 0 1 9 3c0 6.5-9 12-9 12z"
                stroke="#2d7a57"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <circle cx="11" cy="12" r="1" fill="#2d7a57" />
              <circle cx="15" cy="12" r="1" fill="#2d7a57" />
              <circle cx="13" cy="14.5" r="1.4" fill="#2d7a57" />
            </svg>
            <div className="flex flex-col leading-tight">
              <span className="text-[0.875rem] font-bold" style={{ color: "#1a4d35" }}>PetPulse</span>
              <span className="text-[0.5rem] font-semibold tracking-widest uppercase" style={{ color: "#9ca3af" }}>
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
              <X size={15} />
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
                      "flex items-center gap-2 px-[10px] py-[7px] rounded-[7px]",
                      "text-[0.8125rem] font-medium transition-colors duration-150",
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
        <div className="px-[10px] py-3 border-t border-[var(--border)]">
          <Link
            href="/settings"
            className="flex items-center gap-2 rounded-[7px] px-[6px] py-2 hover:bg-[var(--brand-bg)] transition-colors group"
          >
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[var(--brand-light)] text-brand flex-shrink-0">
              <CreditCard size={12} />
            </span>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="text-[0.7rem] font-semibold text-[var(--content-secondary)] truncate">
                {planName}
              </span>
              <span className="text-[0.65rem] text-brand group-hover:underline truncate">
                Ver planos
              </span>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
