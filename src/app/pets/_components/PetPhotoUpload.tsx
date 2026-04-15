"use client";

import { Camera, Upload, Trash2, Plus } from "lucide-react";
import { useRef, useState, useEffect } from "react";

interface PetPhotoUploadProps {
  initialUrl?: string | null;
  onFileChange: (file: File | null) => void;
}

export function PetPhotoUpload({ initialUrl, onFileChange }: PetPhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(initialUrl ?? null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(initialUrl ?? null);
  }, [initialUrl]);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    onFileChange(file);
    const reader = new FileReader();
    reader.onload = (ev) => setPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  }

  function handleRemove() {
    setPreview(null);
    onFileChange(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  const circleBorder = preview ? "2px solid #d4ead8" : "2px dashed #d1d5db";

  return (
    <div className="flex flex-col items-center" style={{ gap: 14, marginBottom: 24 }}>
      {/* Circle */}
      <div
        className="relative flex flex-col items-center justify-center overflow-hidden"
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          background: "#f3f4f6",
          border: circleBorder,
          cursor: "pointer",
          transition: "border-color 0.2s, background 0.2s",
        }}
        onClick={() => inputRef.current?.click()}
        onMouseEnter={(e) => {
          if (!preview) {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#2d7a57";
            el.style.background = "#f0faf4";
          }
        }}
        onMouseLeave={(e) => {
          if (!preview) {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#d1d5db";
            el.style.background = "#f3f4f6";
          }
        }}
      >
        {preview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt="Preview"
            style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }}
          />
        ) : (
          <div
            className="flex flex-col items-center"
            style={{ gap: 4, pointerEvents: "none" }}
          >
            <Camera size={28} style={{ color: "#9ca3af" }} />
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                color: "#9ca3af",
                textAlign: "center",
                lineHeight: 1.3,
              }}
            >
              Foto do pet
            </span>
          </div>
        )}

        {/* Badge + */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            bottom: 4,
            right: 4,
            width: 24,
            height: 24,
            background: "#2d7a57",
            borderRadius: "50%",
            border: "2px solid white",
            pointerEvents: "none",
          }}
        >
          <Plus size={11} style={{ color: "white" }} />
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileSelect}
      />

      {/* Action buttons */}
      <div className="flex" style={{ gap: 8 }}>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center"
          style={{
            gap: 6,
            padding: "7px 14px",
            borderRadius: 8,
            fontSize: 12,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: "inherit",
            border: "1px solid #e5e7eb",
            background: "white",
            color: "#4b5563",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#2d7a57";
            el.style.color = "#2d7a57";
            el.style.background = "#f0faf4";
          }}
          onMouseLeave={(e) => {
            const el = e.currentTarget as HTMLElement;
            el.style.borderColor = "#e5e7eb";
            el.style.color = "#4b5563";
            el.style.background = "white";
          }}
        >
          <Upload size={13} />
          Enviar foto
        </button>

        {preview && (
          <button
            type="button"
            onClick={handleRemove}
            className="flex items-center"
            style={{
              gap: 6,
              padding: "7px 14px",
              borderRadius: 8,
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "inherit",
              border: "1px solid #e5e7eb",
              background: "white",
              color: "#4b5563",
              transition: "all 0.15s",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "#ef4444";
              el.style.color = "#ef4444";
              el.style.background = "#fef2f2";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.borderColor = "#e5e7eb";
              el.style.color = "#4b5563";
              el.style.background = "white";
            }}
          >
            <Trash2 size={13} />
            Remover
          </button>
        )}
      </div>

      <span style={{ fontSize: 11, color: "#9ca3af", textAlign: "center" }}>
        JPG, PNG ou WEBP · máx. 5 MB
      </span>

      <hr style={{ border: "none", borderTop: "1px solid #f3f4f6", width: "100%", margin: "0" }} />
    </div>
  );
}
