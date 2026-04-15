"use client";

interface Props {
  password: string;
}

function getStrength(p: string): number {
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  return score;
}

const LABELS = ["", "Fraca", "Média", "Forte", "Muito forte"];
const COLORS = ["", "#ef4444", "#f59e0b", "#2d7a57", "#2d7a57"];

export default function PasswordStrength({ password }: Props) {
  if (!password) return null;
  const strength = getStrength(password);

  return (
    <div className="mt-1.5">
      <div className="flex gap-1 items-center">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-[3px] flex-1 rounded-full transition-all duration-300"
            style={{ background: i < strength ? COLORS[strength] : "#e5e7eb" }}
          />
        ))}
        <span className="text-[0.72rem] text-gray-500 ml-1 min-w-[60px]">
          {LABELS[strength]}
        </span>
      </div>
    </div>
  );
}
