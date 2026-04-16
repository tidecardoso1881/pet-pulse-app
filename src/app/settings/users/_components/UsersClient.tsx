"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { PetAccess } from "@/types/pet-access";
import { StatCards } from "./StatCards";
import { UserCard } from "./UserCard";
import { PendingInviteCard } from "./PendingInviteCard";
import { InviteShelf } from "./InviteShelf";
import { ManageShelf } from "./ManageShelf";
import { RevokeDialog } from "./RevokeDialog";
import { revokeAccess, cancelInvite } from "../actions";

interface Pet { id: string; name: string; }

interface UsersClientProps {
  accesses: PetAccess[];
  pets: Pet[];
}

export function UsersClient({ accesses, pets }: UsersClientProps) {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [manageAccessId, setManageAccessId] = useState<string | null>(null);
  const [revokeAccessId, setRevokeAccessId] = useState<string | null>(null);

  const petNames = new Map(pets.map((p) => [p.id, p.name]));

  const activeAccesses = accesses.filter((a) => a.status === "active");
  const pendingAccesses = accesses.filter((a) => a.status === "pending");
  const manageAccess = accesses.find((a) => a.id === manageAccessId) ?? null;
  const revokeTarget = accesses.find((a) => a.id === revokeAccessId);

  function refresh() {
    startTransition(() => { router.refresh(); });
  }

  async function handleRevoke() {
    if (!revokeAccessId) return;
    await revokeAccess(revokeAccessId);
    setRevokeAccessId(null);
    refresh();
  }

  async function handleCancel(id: string) {
    await cancelInvite(id);
    refresh();
  }

  return (
    <>
      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 28, gap: 16, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "1.625rem", fontWeight: 800, color: "#1a4d35", margin: "0 0 4px" }}>
            👥 Gestão de Usuários
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280", margin: 0 }}>
            Controle quem pode acessar os dados dos seus pets
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsInviteOpen(true)}
          style={{
            padding: "10px 18px",
            background: "#2d7a57", border: "none",
            borderRadius: 8, fontSize: 13, fontWeight: 600,
            color: "white", cursor: "pointer", fontFamily: "inherit",
            flexShrink: 0,
          }}
        >
          + Convidar usuário
        </button>
      </div>

      {/* Stat Cards */}
      <StatCards accesses={accesses} />

      {/* Usuários ativos */}
      {activeAccesses.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#374151", margin: "0 0 14px" }}>
            Usuários com acesso ({activeAccesses.length})
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {activeAccesses.map((a) => (
              <UserCard
                key={a.id}
                access={a}
                petNames={petNames}
                onManage={setManageAccessId}
                onRevoke={setRevokeAccessId}
              />
            ))}
          </div>
        </section>
      )}

      {/* Convites pendentes */}
      {pendingAccesses.length > 0 && (
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 15, fontWeight: 700, color: "#374151", margin: "0 0 14px" }}>
            Convites pendentes ({pendingAccesses.length})
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
            {pendingAccesses.map((a) => (
              <PendingInviteCard
                key={a.id}
                access={a}
                petNames={petNames}
                onCancel={handleCancel}
              />
            ))}
          </div>
        </section>
      )}

      {activeAccesses.length === 0 && pendingAccesses.length === 0 && (
        <div style={{ textAlign: "center", padding: "60px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>👥</div>
          <h3 style={{ fontSize: 16, fontWeight: 600, color: "#374151", margin: "0 0 8px" }}>
            Nenhum usuário com acesso
          </h3>
          <p style={{ fontSize: 13, color: "#6b7280", margin: "0 0 20px" }}>
            Convide veterinários, cuidadores e familiares para acompanhar seus pets.
          </p>
          <button
            type="button"
            onClick={() => setIsInviteOpen(true)}
            style={{ padding: "10px 24px", background: "#2d7a57", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, color: "white", cursor: "pointer", fontFamily: "inherit" }}
          >
            + Convidar usuário
          </button>
        </div>
      )}

      {/* Shelves & Dialogs */}
      <InviteShelf
        isOpen={isInviteOpen}
        pets={pets}
        onClose={() => setIsInviteOpen(false)}
        onSaved={() => { setIsInviteOpen(false); refresh(); }}
      />
      <ManageShelf
        isOpen={!!manageAccessId}
        access={manageAccess}
        pets={pets}
        onClose={() => setManageAccessId(null)}
        onSaved={() => { setManageAccessId(null); refresh(); }}
      />
      <RevokeDialog
        isOpen={!!revokeAccessId}
        email={revokeTarget?.invitee_email ?? ""}
        onConfirm={handleRevoke}
        onCancel={() => setRevokeAccessId(null)}
      />
    </>
  );
}
