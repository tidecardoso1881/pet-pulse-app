"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import AuthCard from "@/components/auth/AuthCard";
import OtpInput from "@/components/auth/OtpInput";
import StepIndicator from "@/components/auth/StepIndicator";

const STEPS = {
  cadastro: ["Dados", "Verificação", "Pronto!"],
  recuperacao: ["Seu e-mail", "Código", "Nova senha"],
};

function VerificarForm() {
  const router = useRouter();
  const params = useSearchParams();
  const tipo = (params.get("tipo") || "login") as "login" | "cadastro" | "recuperacao";
  const email = params.get("email") || "";

  const supabase = createClient();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(120);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (timer <= 0) { setCanResend(true); return; }
    const id = setTimeout(() => setTimer((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timer]);

  const timerDisplay = `${String(Math.floor(timer / 60)).padStart(2, "0")}:${String(timer % 60).padStart(2, "0")}`;

  async function handleVerify(e: React.FormEvent) {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 6) { setError("Digite o código completo de 6 dígitos."); return; }
    setError("");
    setLoading(true);
    const otpType = tipo === "recuperacao" ? "recovery" : "email";
    const { error } = await supabase.auth.verifyOtp({ email, token: code, type: otpType });
    setLoading(false);
    if (error) { setError("Código inválido ou expirado. Tente novamente."); return; }
    if (tipo === "recuperacao") {
      router.push("/nova-senha");
    } else {
      router.push("/dashboard");
    }
  }

  async function handleResend() {
    setCanResend(false);
    setTimer(120);
    if (tipo === "recuperacao") {
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/nova-senha`,
      });
    } else {
      await supabase.auth.resend({ type: "signup", email });
    }
  }

  const titles = {
    cadastro: "Confirme seu e-mail",
    login: "Verificação de segurança",
    recuperacao: "Digite o código",
  };
  const subtitles = {
    cadastro: "Enviamos um código de 6 dígitos para o e-mail abaixo. Digite-o para ativar sua conta.",
    login: "Por segurança, enviamos um código de verificação para seu e-mail.",
    recuperacao: "Enviamos um código de recuperação para o e-mail abaixo.",
  };
  const btnLabels = {
    cadastro: "Confirmar e ativar conta →",
    login: "Verificar código →",
    recuperacao: "Verificar código →",
  };

  const currentStep = tipo === "cadastro" ? 1 : tipo === "recuperacao" ? 1 : undefined;
  const steps = STEPS[tipo as keyof typeof STEPS];

  return (
    <AuthCard>
      {steps && currentStep !== undefined && (
        <StepIndicator steps={steps} current={currentStep} />
      )}

      <div className="mb-6">
        <h1 className="text-[1.75rem] font-extrabold text-[#1a4d35] mb-1.5 tracking-tight">
          {titles[tipo]}
        </h1>
        <p className="text-[0.9rem] text-gray-500 leading-relaxed">
          {subtitles[tipo]}
        </p>
      </div>

      {email && (
        <div className="mb-4 flex justify-center">
          <span className="inline-flex items-center gap-1.5 bg-[#e8f5ef] border border-[#b8dfc8] rounded-full px-4 py-1 text-[0.82rem] font-semibold text-[#1a4d35]">
            ✉️ {email}
          </span>
        </div>
      )}

      <div className="flex items-start gap-2 bg-[#fffde7] border border-[#f9e04b] rounded-lg px-4 py-3 text-[0.82rem] text-[#6b4c00] leading-relaxed mb-2">
        <span>⏱</span>
        <span>Verifique sua caixa de entrada — o código expira em <strong>10 minutos</strong>.</span>
      </div>

      <form onSubmit={handleVerify}>
        <OtpInput value={otp} onChange={setOtp} />

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5 mb-4">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-[#2d7a57] text-white font-semibold text-[0.9375rem] rounded-xl px-7 py-3.5 hover:bg-[#1a4d35] active:scale-[.99] transition-all disabled:opacity-60"
        >
          {loading ? "Verificando…" : btnLabels[tipo]}
        </button>
      </form>

      <p className="mt-4 text-center text-[0.85rem] text-gray-500">
        Não recebeu?{" "}
        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            className="text-[#2d7a57] font-semibold hover:underline"
          >
            Reenviar agora
          </button>
        ) : (
          <>
            Reenviar em{" "}
            <span className="font-bold text-[#1a4d35] tabular-nums">{timerDisplay}</span>
          </>
        )}
      </p>

      <p className="mt-4 text-center text-sm text-gray-400">
        {tipo === "cadastro" ? (
          <Link href="/cadastro" className="text-[#2d7a57] hover:underline">← Voltar ao cadastro</Link>
        ) : tipo === "recuperacao" ? (
          <Link href="/recuperar" className="text-[#2d7a57] hover:underline">← Voltar</Link>
        ) : (
          <Link href="/login" className="text-[#2d7a57] hover:underline">← Voltar ao login</Link>
        )}
      </p>
    </AuthCard>
  );
}

export default function VerificarPage() {
  return (
    <Suspense fallback={null}>
      <VerificarForm />
    </Suspense>
  );
}
