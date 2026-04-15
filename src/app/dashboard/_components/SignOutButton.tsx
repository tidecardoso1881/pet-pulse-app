"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <button
      onClick={handleSignOut}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "13px 24px",
        background: "transparent",
        color: "#1a4d35",
        border: "1.5px solid rgba(45,122,87,0.3)",
        borderRadius: 12,
        fontSize: "0.9375rem",
        fontWeight: 600,
        cursor: "pointer",
        fontFamily: "inherit",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = "#e8f5ef";
        el.style.borderColor = "#2d7a57";
        el.style.transform = "translateY(-1px)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = "transparent";
        el.style.borderColor = "rgba(45,122,87,0.3)";
        el.style.transform = "";
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <polyline points="15 18 9 12 15 6" />
      </svg>
      Sair
    </button>
  );
}
