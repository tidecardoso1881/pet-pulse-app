"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AuthCard from "@/components/auth/AuthCard";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
    <path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z" fill="#4285F4" />
    <path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z" fill="#34A853" />
    <path d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z" fill="#FBBC05" />
    <path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z" fill="#EA4335" />
  </svg>
);

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      if (error.message.includes("Email not confirmed")) {
        router.push(`/verificar?tipo=login&email=${encodeURIComponent(email)}`);
      } else {
        setError("E-mail ou senha inválidos. Tente novamente.");
      }
      return;
    }
    router.push("/dashboard");
  }

  async function handleGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
  }

  return (
    <AuthCard>
      <div className="mb-8">
        <h1 className="text-[1.75rem] font-extrabold text-[#1a4d35] mb-1.5 tracking-tight">
          Bem-vindo de volta
        </h1>
        <p className="text-[0.9rem] text-gray-500 leading-relaxed">
          Entre na sua conta para acessar a saúde do seu pet.
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        className="w-full flex items-center justify-center gap-2.5 bg-white border border-[#e5e7eb] rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-[#d1d5db] hover:bg-gray-50 transition-all"
      >
        <GoogleIcon />
        Continuar com Google
      </button>

      <div className="flex items-center gap-3 my-5 text-[0.8rem] text-gray-400">
        <div className="flex-1 h-px bg-[#e5e7eb]" />
        ou entre com e-mail
        <div className="flex-1 h-px bg-[#e5e7eb]" />
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <div>
          <label className="block text-[0.8125rem] font-semibold text-gray-700 mb-1.5">
            E-mail
          </label>
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

        <div>
          <label className="block text-[0.8125rem] font-semibold text-gray-700 mb-1.5">
            Senha
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" />
              </svg>
            </span>
            <input
              type={showPassword ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-[11px] border border-[#d1d5db] rounded-lg text-[0.9375rem] text-gray-900 bg-white outline-none placeholder-gray-400 focus:border-[#2d7a57] focus:shadow-[0_0_0_3px_rgba(45,122,87,0.12)] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                {showPassword ? (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                ) : (
                  <>
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className="text-right -mt-1">
          <Link href="/recuperar" className="text-[0.8rem] text-[#2d7a57] font-medium hover:underline">
            Esqueci minha senha
          </Link>
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
          {loading ? "Entrando…" : "Entrar na minha conta →"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-gray-500">
        Não tem conta?{" "}
        <Link href="/cadastro" className="text-[#2d7a57] font-semibold hover:underline">
          Cadastre-se grátis
        </Link>
      </p>
    </AuthCard>
  );
}
