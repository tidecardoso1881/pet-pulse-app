"use client";

import React from "react";
import Link from "next/link";
import { Search, Bell, Menu } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface HeaderProps {
  onMenuToggle?: () => void;
  notificationCount?: number;
  user?: {
    name: string;
    initials: string;
    avatarUrl?: string;
  };
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
        "flex items-center px-7",
        className
      )}
    >
      {/* Hambúrguer — apenas mobile */}
      <button
        onClick={onMenuToggle}
        className="lg:hidden p-1.5 rounded-md text-[#6b7280] hover:bg-[#f3f4f6] transition-colors mr-3"
        aria-label="Abrir menu"
      >
        <Menu size={20} />
      </button>

      {/* Busca global */}
      <div className="relative" style={{ width: 280 }}>
        <Search
          size={15}
          className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: 12, color: "#9ca3af" }}
        />
        <input
          type="search"
          placeholder="Buscar pets, consultas, registros..."
          className="focus:outline-none focus:ring-2 focus:ring-[#2d7a57] focus:border-[#2d7a57] transition-colors"
          style={{
            width: "100%",
            height: 36,
            paddingLeft: 36,
            paddingRight: 12,
            fontSize: 13,
            background: "#f9fafb",
            border: "1px solid #e5e7eb",
            borderRadius: 10,
            color: "#111827",
          }}
        />
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Ações à direita */}
      <div className="flex items-center" style={{ gap: 14 }}>
        {/* Notificações */}
        <Link
          href="/notifications"
          className="relative"
          aria-label="Notificações"
        >
          <Bell size={18} style={{ color: "#4b5563" }} />
          {notificationCount > 0 && (
            <span
              className="absolute rounded-full"
              style={{
                top: -2,
                right: -2,
                width: 7,
                height: 7,
                background: "#f97316",
                border: "1.5px solid #FDFDFC",
              }}
            />
          )}
        </Link>

        {/* Avatar do usuário */}
        <button
          onClick={onAvatarClick}
          className="flex items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#2d7a57]"
          style={{ width: 32, height: 32, background: "#e8f5ef" }}
          aria-label="Menu do usuário"
          title={user?.name}
        >
          {user?.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={user.avatarUrl}
              alt={user?.name ?? ""}
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <span style={{ fontSize: 12, fontWeight: 700, color: "#2d7a57" }}>
              {user?.initials ?? "U"}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
