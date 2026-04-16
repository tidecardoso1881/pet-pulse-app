"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AuthCard from "@/components/auth/AuthCard";
import PasswordStrength from "@/components/auth/PasswordStrength";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
    <path d="M16.51 8H8.98v3h4.3c-.18 1-.74 1.48-1.6 2.04v2.01h2.6a7.8 7.8 0 002.38-5.88c0-.57-.05-.66-.15-1.18z" fill="#4285F4" />
    <path d="M8.98 17c2.16 0 3.97-.72 5.3-1.94l-2.6-2a4.8 4.8 0 01-7.18-2.54H1.83v2.07A8 8 0 008.98 17z" fill="#34A853" />
    <path d="M4.5 10.52a4.8 4.8 0 010-3.04V5.41H1.83a8 8 0 000 7.18l2.67-2.07z" fill="#FBBC05" />
    <path d="M8.98 4.18c1.17 0 2.23.4 3.06 1.2l2.3-2.3A8 8 0 001.83 5.4L4.5 7.49a4.77 4.77 0 014.48-3.3z" fill="#EA4335" />
  </svg>
);

export default function CadastroPage() {
  const router = useRouter();
  const supabase = createClient();

  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [termos, setTermos] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleCadastro(e: React.FormEvent) {
    e.preventDefault();
    if (!termos) { setError("Aceite os Termos de Uso para continuar."); return; }
    setError("");
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: nome, last_name: sobrenome, phone: telefone || null },
      },
    });
    setLoading(false);
    if (error) { setError("Não foi possível criar sua conta. Verifique os dados e tente novamente."); return; }
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
          Criar conta grátis
        </h1>
        <p className="text-[0.9rem] text-gray-500 leading-relaxed">
          Cadastre-se e comece a cuidar da saúde do seu pet agora mesmo.
        </p>
      </div>

      <button
        type="button"
        onClick={handleGoogle}
        className="w-full flex items-center justify-center gap-2.5 bg-white border border-[#e5e7eb] rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 hover:border-[#d1d5db] hover:bg-gray-50 transition-all"
      >
        <GoogleIcon />
        Cadastrar com Google
      </button>

      <div className="flex items-center gap-3 my-5 text-[0.8rem] text-gray-400">
        <div className="flex-1 h-px bg-[#e5e7eb]" />
        ou preencha o formulário
        <div className="flex-1 h-px bg-[#e5e7eb]" />
      </div>

      <form onSubmit={handleCadastro} className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3.5">
          <div>
            <label className="block text-[0.8125rem] font-semibold text-gray-700 mb-1.5">Nome</label>
            <input
              type="text"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Tide"
              className="w-full px-3.5 py-[11px] border border-[#d1d5db] rounded-lg text-[0.9375rem] text-gray-900 bg-white outline-none placeholder-gray-400 focus:border-[#2d7a57] focus:shadow-[0_0_0_3px_rgba(45,122,87,0.12)] transition-all"
            />
          </div>
          <div>
            <label className="block text-[0.8125rem] font-semibold text-gray-700 mb-1.5">Sobrenome</label>
            <input
              type="text"
              required
              value={sobrenome}
              onChange={(e) => setSobrenome(e.target.value)}
              placeholder="Cardoso"
              className="w-full px-3.5 py-[11px] border border-[#d1d5db] rounded-lg text-[0.9375rem] text-gray-900 bg-white outline-none placeholder-gray-400 focus:border-[#2d7a57] focus:shadow-[0_0_0_3px_rgba(45,122,87,0.12)] transition-all"
            />
          </div>
        </div>

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

        <div>
          <label className="block text-[0.8125rem] font-semibold text-gray-700 mb-1.5">
            Telefone <span className="font-normal text-gray-400">(opcional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.09 1.18 2 2 0 012.07 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </span>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="(11) 99999-9999"
              className="w-full pl-10 pr-4 py-[11px] border border-[#d1d5db] rounded-lg text-[0.9375rem] text-gray-900 bg-white outline-none placeholder-gray-400 focus:border-[#2d7a57] focus:shadow-[0_0_0_3px_rgba(45,122,87,0.12)] transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-[0.8125rem] font-semibold text-gray-700 mb-1.5">Senha</label>
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
              placeholder="Mínimo 8 caracteres"
              className="w-full pl-10 pr-10 py-[11px] border border-[#d1d5db] rounded-lg text-[0.9375rem] text-gray-900 bg-white outline-none placeholder-gray-400 focus:border-[#2d7a57] focus:shadow-[0_0_0_3px_rgba(45,122,87,0.12)] transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
            </button>
          </div>
          <PasswordStrength password={password} />
        </div>

        <div className="flex flex-col gap-2 mt-1">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={termos}
              onChange={(e) => setTermos(e.target.checked)}
              className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#2d7a57] cursor-pointer"
            />
            <span className="text-[0.8rem] text-gray-500 leading-relaxed">
              Li e aceito os{" "}
              <Link href="/termos" className="text-[#2d7a57] font-medium hover:underline">Termos de Uso</Link>{" "}
              e a{" "}
              <Link href="/privacidade" className="text-[#2d7a57] font-medium hover:underline">Política de Privacidade</Link>
            </span>
          </label>
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={newsletter}
              onChange={(e) => setNewsletter(e.target.checked)}
              className="mt-0.5 w-4 h-4 flex-shrink-0 accent-[#2d7a57] cursor-pointer"
            />
            <span className="text-[0.8rem] text-gray-500 leading-relaxed">
              Quero receber dicas de saúde pet
            </span>
          </label>
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
          {loading ? "Criando conta…" : "Criar minha conta →"}
        </button>
      </form>

      <p className="mt-5 text-center text-sm text-gray-500">
        Já tem conta?{" "}
        <Link href="/login" className="text-[#2d7a57] font-semibold hover:underline">
          Entrar
        </Link>
      </p>
    </AuthCard>
  );
}
