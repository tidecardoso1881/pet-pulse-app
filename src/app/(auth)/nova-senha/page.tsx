"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AuthCard from "@/components/auth/AuthCard";
import PasswordStrength from "@/components/auth/PasswordStrength";
import StepIndicator from "@/components/auth/StepIndicator";

const STEPS = ["Seu e-mail ✓", "Código ✓", "Nova senha"];

function Req({ met, label }: { met: boolean; label: string }) {
  return (
    <li className={`flex items-center gap-2 text-[0.8rem] ${met ? "text-[#2d7a57]" : "text-gray-400"}`}>
      <span>{met ? "✅" : "○"}</span>
      {label}
    </li>
  );
}

export default function NovaSenhaPage() {
  const router = useRouter();
  const supabase = createClient();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const reqs = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };
  const passwordsMatch = password && confirm && password === confirm;

  async function handleNovaSenha(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { setError("As senhas não coincidem."); return; }
    if (!Object.values(reqs).every(Boolean)) { setError("A senha não atende todos os requisitos."); return; }
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) { setError(error.message); return; }
    router.push("/login");
  }

  return (
    <AuthCard>
      <StepIndicator steps={STEPS} current={2} />

      <div className="mb-8">
        <h1 className="text-[1.75rem] font-extrabold text-[#1a4d35] mb-1.5 tracking-tight">
          Criar nova senha
        </h1>
      </div>

      <form onSubmit={handleNovaSenha} className="flex flex-col gap-4">
        <div>
          <label className="block text-[0.8125rem] font-semibold text-gray-700 mb-1.5">Nova senha</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" />
              </svg>
            </span>
            <input
              type={showPwd ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nova senha"
              className="w-full pl-10 pr-10 py-[11px] border border-[#d1d5db] rounded-lg text-[0.9375rem] text-gray-900 bg-white outline-none placeholder-gray-400 focus:border-[#2d7a57] focus:shadow-[0_0_0_3px_rgba(45,122,87,0.12)] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPwd(!showPwd)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Alternar visibilidade"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
          <PasswordStrength password={password} />
        </div>

        <div>
          <label className="block text-[0.8125rem] font-semibold text-gray-700 mb-1.5">Confirmar senha</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" />
              </svg>
            </span>
            <input
              type={showConfirm ? "text" : "password"}
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Repita a senha"
              className="w-full pl-10 pr-10 py-[11px] border border-[#d1d5db] rounded-lg text-[0.9375rem] text-gray-900 bg-white outline-none placeholder-gray-400 focus:border-[#2d7a57] focus:shadow-[0_0_0_3px_rgba(45,122,87,0.12)] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Alternar visibilidade"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
          {confirm && (
            <p className={`text-[0.8rem] mt-1.5 ${passwordsMatch ? "text-[#2d7a57]" : "text-red-500"}`}>
              {passwordsMatch ? "✅ As senhas coincidem" : "As senhas não coincidem"}
            </p>
          )}
        </div>

        {/* Requirements */}
        <div className="bg-gray-50 border border-gray-100 rounded-lg px-4 py-3">
          <p className="text-[0.78rem] font-semibold text-gray-500 mb-2">A senha precisa ter:</p>
          <ul className="flex flex-col gap-1">
            <Req met={reqs.length} label="Mínimo 8 caracteres" />
            <Req met={reqs.upper} label="Uma letra maiúscula" />
            <Req met={reqs.number} label="Um número" />
            <Req met={reqs.special} label="Um caractere especial (!@#$...)" />
          </ul>
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
          {loading ? "Salvando…" : "Salvar nova senha →"}
        </button>
      </form>

      <p className="mt-4 text-center text-[0.78rem] text-gray-400">
        Após salvar, você será redirecionado para o login.
      </p>
    </AuthCard>
  );
}
