"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AuthCard from "@/components/auth/AuthCard";
import StepIndicator from "@/components/auth/StepIndicator";

const STEPS = ["Seu e-mail", "Código", "Nova senha"];

export default function RecuperarPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRecuperar(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/nova-senha`,
    });
    setLoading(false);
    if (error) { setError(error.message); return; }
    router.push(`/verificar?tipo=recuperacao&email=${encodeURIComponent(email)}`);
  }

  return (
    <AuthCard>
      <Link
        href="/login"
        className="inline-flex items-center gap-1.5 text-[0.85rem] text-gray-500 hover:text-[#2d7a57] transition-colors mb-6"
      >
        ← Voltar para o login
      </Link>

      <StepIndicator steps={STEPS} current={0} />

      <div className="mb-8">
        <h1 className="text-[1.75rem] font-extrabold text-[#1a4d35] mb-1.5 tracking-tight">
          Recuperar senha
        </h1>
        <p className="text-[0.9rem] text-gray-500 leading-relaxed">
          Digite seu e-mail cadastrado e enviaremos um código de verificação.
        </p>
      </div>

      <form onSubmit={handleRecuperar} className="flex flex-col gap-4">
        <div>
          <label className="block text-[0.8125rem] font-semibold text-gray-700 mb-1.5">E-mail</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="2,4 12,13 22,4" />
              </svg>
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full pl-10 pr-4 py-[11px] border border-[#d1d5db] rounded-lg text-[0.9375rem] text-gray-900 bg-white outline-none placeholder-gray-400 focus:border-[#2d7a57] focus:shadow-[0_0_0_3px_rgba(45,122,87,0.12)] transition-all"
            />
          </div>
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#2d7a57] text-white font-semibold text-[0.9375rem] rounded-xl px-7 py-3.5 hover:bg-[#1a4d35] active:scale-[.99] transition-all disabled:opacity-60 mt-1"
        >
          {loading ? "Enviando…" : "Enviar código de verificação →"}
        </button>

        <Link
          href="/login"
          className="w-full flex items-center justify-center border border-[#2d7a57] text-[#2d7a57] font-semibold text-[0.9375rem] rounded-lg py-3 hover:bg-[#e8f5ef] transition-all"
        >
          Cancelar
        </Link>
      </form>
    </AuthCard>
  );
}
