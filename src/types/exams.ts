export type ExamType =
  | "hemograma"
  | "imagem"
  | "prescricao"
  | "certificado"
  | "recibo"
  | "outro";

export interface Exam {
  id: string;
  pet_id: string;
  owner_id: string;
  title: string;
  type: ExamType;
  file_url: string;
  file_name: string | null;
  file_path: string | null;
  notes: string | null;
  exam_date: string | null;
  created_at: string;
  updated_at?: string;
  pets?: { name: string; photo_url?: string | null };
}

export interface PetForExams {
  id: string;
  name: string;
  photo_url?: string | null;
}

export const EXAM_TYPE_LABELS: Record<ExamType, string> = {
  hemograma: "Hemograma",
  imagem: "Imagem",
  prescricao: "Prescrição",
  certificado: "Certificado",
  recibo: "Recibo",
  outro: "Outro",
};

export const EXAM_TYPE_COLORS: Record<
  ExamType,
  { chipBg: string; chipText: string; iconBg: string; iconColor: string }
> = {
  hemograma:   { chipBg: "#fee2e2", chipText: "#dc2626", iconBg: "#fee2e2", iconColor: "#dc2626" },
  imagem:      { chipBg: "#dbeafe", chipText: "#2563eb", iconBg: "#dbeafe", iconColor: "#2563eb" },
  prescricao:  { chipBg: "#f3e8ff", chipText: "#7c3aed", iconBg: "#f3e8ff", iconColor: "#7c3aed" },
  certificado: { chipBg: "#fef3c7", chipText: "#d97706", iconBg: "#fef3c7", iconColor: "#d97706" },
  recibo:      { chipBg: "#d1fae5", chipText: "#059669", iconBg: "#d1fae5", iconColor: "#059669" },
  outro:       { chipBg: "#f3f4f6", chipText: "#6b7280", iconBg: "#f3f4f6", iconColor: "#6b7280" },
};
