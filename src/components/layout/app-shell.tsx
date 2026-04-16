"use client";

import React, { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { cn } from "@/lib/utils/cn";

/**
 * AppShell — PetPulse Design System
 *
 * Wrapper do layout autenticado: Sidebar + Header + conteúdo.
 * Usado em todos os layouts do app (dashboard, pets, etc).
 *
 * Uso:
 *   <AppShell user={...} notificationCount={4}>
 *     {children}
 *   </AppShell>
 */
interface AppShellProps {
  children: React.ReactNode;
  user?: {
    name: string;
    initials: string;
    avatarUrl?: string;
  };
  notificationCount?: number;
  planName?: string;
  className?: string;
}

export function AppShell({
  children,
  user,
  notificationCount = 0,
  planName,
  className,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={cn("app-layout", className)}>
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        notificationCount={notificationCount}
        planName={planName}
      />

      {/* Header */}
      <Header
        onMenuToggle={() => setSidebarOpen((v) => !v)}
        notificationCount={notificationCount}
        user={user}
      />

      {/* Conteúdo principal */}
      <main className="app-main animate-fade-in">
        {children}
      </main>
    </div>
  );
}
