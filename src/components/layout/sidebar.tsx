"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  PawPrint,
  ClipboardList,
  Calendar,
  ShieldCheck,
  FileText,
  Activity,
  MapPin,
  Utensils,
  ShoppingBag,
  Bell,
  Settings,
  CreditCard,
  X,
  LogOut,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils/cn";

export interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
}

const NAV_ITEMS: SidebarItem[] = [
  { label: "Painel Principal",      href: "/dashboard",         icon: <LayoutGrid size={17} /> },
  { label: "Meus Pets",             href: "/pets",              icon: <PawPrint size={17} /> },
  { label: "Prontuário Digital",    href: "/medical-records",   icon: <ClipboardList size={17} /> },
  { label: "Agenda de Cuidados",    href: "/appointments",      icon: <Calendar size={17} /> },
  { label: "Vacinas",               href: "/vaccines",          icon: <ShieldCheck size={17} /> },
  { label: "Repositório de Exames", href: "/exams",             icon: <FileText size={17} /> },
  { label: "Monitoramento Ativo",   href: "/health-monitoring", icon: <Activity size={17} /> },
  { label: "Localização GPS",       href: "/gps",               icon: <MapPin size={17} /> },
  { label: "Rotina e Alimentação",  href: "/routine",           icon: <Utensils size={17} /> },
  { label: "Marketplace",           href: "/marketplace",       icon: <ShoppingBag size={17} /> },
  { label: "Notificações",          href: "/notifications",     icon: <Bell size={17} />, badge: 4 },
  { label: "Configurações",         href: "/settings",          icon: <Settings size={17} /> },
];

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
  notificationCount?: number;
  planName?: string;
}

export function Sidebar({
  isOpen = true,
  onClose,
  notificationCount,
  planName = "Plano Gratuito",
}: SidebarProps) {
  const pathname = usePathname();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    window.location.href = "/login";
  }

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
          "fixed top-0 left-0 h-full z-40",
          "w-[var(--sidebar-width)]",
          "border-r border-[#e5e7eb] flex flex-col",
          "transition-transform duration-250",
          !isOpen && "-translate-x-full lg:translate-x-0"
        )}
        style={{ background: "#FDFDFC" }}
      >
        {/* ── Logo ── */}
        <div className="relative">
          <Link
            href="/dashboard"
            className="flex items-center gap-[10px] px-4 py-[18px] border-b border-[#e5e7eb]"
          >
            <div
              className="flex items-center justify-center flex-shrink-0"
              style={{ width: 36, height: 36, background: "#2d7a57", borderRadius: 8 }}
              aria-hidden="true"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="flex flex-col" style={{ lineHeight: 1.1 }}>
              <span style={{ fontSize: 17, fontWeight: 800, color: "#1a4d35", letterSpacing: "-0.2px", lineHeight: 1.1 }}>
                PetPulse
              </span>
              <span style={{ fontSize: 9, fontWeight: 600, color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: 1, lineHeight: 1 }}>
                Vital Biometry
              </span>
            </div>
          </Link>

          {/* Botão fechar — apenas mobile */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-3 lg:hidden p-1 rounded text-[#6b7280] hover:bg-[#f3f4f6]"
              aria-label="Fechar menu"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* ── Navegação ── */}
        <nav className="flex-1 overflow-y-auto py-[10px] px-[10px]">
          <ul className="flex flex-col" style={{ gap: 2 }}>
            {items.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href));

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "group flex items-center rounded-[8px] relative",
                      "transition-colors duration-150",
                      isActive
                        ? "bg-[#e8f5ef] text-[#2d7a57] font-semibold"
                        : "text-[#4b5563] font-medium hover:bg-[#f3f4f6] hover:text-[#1f2937]"
                    )}
                    style={{ gap: 12, padding: "9px 14px", fontSize: "13.5px" }}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span
                      className={cn(
                        "shrink-0 transition-colors",
                        isActive
                          ? "text-[#2d7a57]"
                          : "text-[#6b7280] group-hover:text-[#4b5563]"
                      )}
                    >
                      {item.icon}
                    </span>
                    <span className="flex-1 truncate">{item.label}</span>

                    {item.badge !== undefined && item.badge > 0 && (
                      <span
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                          width: 18,
                          height: 18,
                          minWidth: 18,
                          borderRadius: "50%",
                          background: "#f97316",
                          color: "#ffffff",
                          fontSize: 11,
                          fontWeight: 700,
                          lineHeight: 1,
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* ── Rodapé — plano atual ── */}
        <div className="border-t border-[#e5e7eb]">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-[10px] w-full rounded-[8px] mx-[10px] mt-3 px-3 py-[9px] text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#1f2937] transition-colors"
            style={{ fontSize: "13.5px", fontWeight: 500, background: "transparent", border: "none", cursor: "pointer", fontFamily: "inherit" }}
          >
            <LogOut size={16} />
            Sair
          </button>
          <Link
            href="/settings/billing"
            className="group flex items-center gap-[10px] rounded-[10px] mx-[10px] my-3 px-3 py-[10px] bg-[#e8f5ef] border border-[#b8dfc8] hover:bg-[#EAF6F0] transition-colors"
          >
            <span
              className="flex items-center justify-center flex-shrink-0 bg-white border border-[#b8dfc8]"
              style={{ width: 28, height: 28, borderRadius: 7 }}
            >
              <CreditCard size={16} style={{ color: "#2d7a57" }} />
            </span>
            <div className="flex flex-col leading-tight min-w-0">
              <span className="truncate" style={{ fontSize: 13, fontWeight: 700, color: "#1a4d35" }}>
                {planName}
              </span>
              <span className="truncate group-hover:underline" style={{ fontSize: 11, fontWeight: 500, color: "#2d7a57" }}>
                Ver planos e assinatura
              </span>
            </div>
          </Link>
        </div>
      </aside>
    </>
  );
}
             