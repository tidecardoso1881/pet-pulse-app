"use client";

import { useRef } from "react";

interface Props {
  value: string[];
  onChange: (value: string[]) => void;
}

export default function OtpInput({ value, onChange }: Props) {
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, raw: string) => {
    const char = raw.replace(/\D/g, "").slice(-1);
    const next = [...value];
    next[index] = char;
    onChange(next);
    if (char && index < 5) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!digits) return;
    e.preventDefault();
    const next = digits.split("").concat(Array(6).fill("")).slice(0, 6);
    onChange(next);
    refs.current[Math.min(digits.length, 5)]?.focus();
  };

  return (
    <div className="flex gap-2.5 justify-center my-7">
      {Array.from({ length: 6 }).map((_, i) => (
        <input
          key={i}
          ref={(el) => { refs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className={`w-[52px] h-[60px] text-center font-bold outline-none transition-all duration-200 rounded-[10px] border-2 bg-white text-[#1a4d35] focus:border-[#2d7a57] focus:shadow-[0_0_0_3px_rgba(45,122,87,0.15)] ${
            value[i] ? "border-[#2d7a57] bg-[#e8f5ef]" : "border-[#d1d5db]"
          }`}
          style={{ fontSize: "1.6rem", fontFamily: "monospace" }}
        />
      ))}
    </div>
  );
}
