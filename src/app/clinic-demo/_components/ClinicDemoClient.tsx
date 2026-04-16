"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// ─── Types ───────────────────────────────────────────────────────────────────

type TabType = "overview" | "records" | "appointments" | "hospitalization" | "professionals" | "reports" | "insights";
type BoxStatus = "Internado" | "Disponível" | "Observação" | "Limpeza";

interface ContactForm {
  clinicName: string;
  email: string;
  contactName: string;
  message: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const kpiOverview = [
  { label: "Atendimentos Hoje", value: "12",     icon: "📅" },
  { label: "Receita do Mês",    value: "R$ 8.450", icon: "💰" },
  { label: "Pets em Acompanhamento", value: "47", icon: "🐾" },
  { label: "Boxes de Internação",    value: "6/8", icon: "🏥" },
];

const revenueData = [
  { month: "Jan", value: 5200 }, { month: "Fev", value: 6800 },
  { month: "Mar", value: 7100 }, { month: "Abr", value: 8200 },
  { month: "Mai", value: 8900 }, { month: "Jun", value: 8450 },
];

const servicesMix = [
  { label: "Consultas",   percentage: 35, color: "#2d7a57" },
  { label: "Cirurgias",   percentage: 20, color: "#7c3aed" },
  { label: "Vacinas",     percentage: 25, color: "#3b82f6" },
  { label: "Exames",      percentage: 15, color: "#f59e0b" },
  { label: "Banho e Tosa", percentage: 5, color: "#10b981" },
];

const recordsData = [
  { tutor: "Maria Silva",     pet: "Rex",   species: "Cão",  breed: "Labrador",        age: "4 anos", status: "Saudável",      lastConsultation: "15/04/2026", nextReturn: "15/05/2026" },
  { tutor: "João Santos",     pet: "Mimi",  species: "Gato", breed: "Siamês",           age: "2 anos", status: "Em Tratamento", lastConsultation: "12/04/2026", nextReturn: "19/04/2026" },
  { tutor: "Ana Costa",       pet: "Buddy", species: "Cão",  breed: "Golden Retriever", age: "1 ano",  status: "Saudável",      lastConsultation: "16/04/2026", nextReturn: "16/05/2026" },
  { tutor: "Carlos Oliveira", pet: "Luna",  species: "Gato", breed: "Persa",            age: "5 anos", status: "Internado",     lastConsultation: "10/04/2026", nextReturn: "18/04/2026" },
  { tutor: "Paula Rocha",     pet: "Max",   species: "Cão",  breed: "Poodle",           age: "3 anos", status: "Saudável",      lastConsultation: "14/04/2026", nextReturn: "14/05/2026" },
  { tutor: "Roberto Lima",    pet: "Nala",  species: "Cão",  breed: "Dálmata",          age: "6 anos", status: "Em Tratamento", lastConsultation: "11/04/2026", nextReturn: "20/04/2026" },
];

const appointmentKpis = [
  { label: "Hoje", value: 4 }, { label: "Amanhã", value: 7 }, { label: "Esta semana", value: 28 },
];

const appointmentsData = [
  { pet: "Rex",   tutor: "Maria Silva",     vet: "Dr. Roberto", type: "Consulta",  date: "16/04/2026", time: "14:00", status: "Confirmado" },
  { pet: "Mimi",  tutor: "João Santos",     vet: "Dra. Paula",  type: "Vacinação", date: "16/04/2026", time: "15:30", status: "Confirmado" },
  { pet: "Buddy", tutor: "Ana Costa",       vet: "Dr. Roberto", type: "Exame",     date: "17/04/2026", time: "09:00", status: "Pendente"   },
  { pet: "Luna",  tutor: "Carlos Oliveira", vet: "Dra. Paula",  type: "Cirurgia",  date: "18/04/2026", time: "08:00", status: "Confirmado" },
  { pet: "Max",   tutor: "Paula Rocha",     vet: "Dr. Roberto", type: "Consulta",  date: "19/04/2026", time: "16:00", status: "Confirmado" },
  { pet: "Nala",  tutor: "Roberto Lima",    vet: "Dra. Paula",  type: "Retorno",   date: "20/04/2026", time: "10:30", status: "Pendente"   },
];

const appointmentsTrendData = [
  { month: "Jan", count: 45 }, { month: "Fev", count: 58 },
  { month: "Mar", count: 62 }, { month: "Abr", count: 78 },
  { month: "Mai", count: 85 }, { month: "Jun", count: 82 },
];

const hospitalizationKpis = [
  { label: "Total", value: "8" }, { label: "Ocupados", value: "4" }, { label: "Disponíveis", value: "4" },
];

const boxesData: { boxNumber: string; status: BoxStatus; pet: string | null }[] = [
  { boxNumber: "01", status: "Internado",  pet: "Rex"  },
  { boxNumber: "02", status: "Disponível", pet: null   },
  { boxNumber: "03", status: "Observação", pet: "Luna" },
  { boxNumber: "04", status: "Limpeza",    pet: null   },
  { boxNumber: "05", status: "Internado",  pet: "Mimi" },
  { boxNumber: "06", status: "Disponível", pet: null   },
];

const boxStatusColors: Record<BoxStatus, { border: string; bg: string; text: string }> = {
  "Internado":  { border: "#ef4444", bg: "#fee2e2", text: "#ef4444" },
  "Disponível": { border: "#d1d5db", bg: "#f3f4f6", text: "#6b7280" },
  "Observação": { border: "#f59e0b", bg: "#fef3c7", text: "#92400e" },
  "Limpeza":    { border: "#3b82f6", bg: "#dbeafe", text: "#1e40af" },
};

const professionalsData = [
  { name: "Dr. Roberto",   specialty: "Clínico Geral",   initials: "DR", avatarColor: "#3b82f6", appointmentsToday: 3, appointmentsMonth: 24 },
  { name: "Dra. Paula",    specialty: "Cirurgião",        initials: "DP", avatarColor: "#7c3aed", appointmentsToday: 2, appointmentsMonth: 18 },
  { name: "Dr. Carlos",    specialty: "Oftalmologista",   initials: "DC", avatarColor: "#f59e0b", appointmentsToday: 1, appointmentsMonth: 15 },
  { name: "Dra. Fernanda", specialty: "Dentista",         initials: "DF", avatarColor: "#10b981", appointmentsToday: 2, appointmentsMonth: 12 },
];

const reportsKpis = [
  { label: "Receita Total",  value: "R$ 42.250", icon: "💰" },
  { label: "Ticket Médio",   value: "R$ 320",    icon: "📊" },
  { label: "Atendimentos",   value: "132",       icon: "👥" },
];

const reportsData = [
  { vet: "Dr. Roberto",   appointments: 24, ticketAvg: "R$ 340", revenue: "R$ 8.160", commission: "R$ 4.080" },
  { vet: "Dra. Paula",    appointments: 18, ticketAvg: "R$ 380", revenue: "R$ 6.840", commission: "R$ 3.420" },
  { vet: "Dr. Carlos",    appointments: 15, ticketAvg: "R$ 280", revenue: "R$ 4.200", commission: "R$ 2.100" },
  { vet: "Dra. Fernanda", appointments: 12, ticketAvg: "R$ 295", revenue: "R$ 3.540", commission: "R$ 1.770" },
];

const insightsData = [
  { title: "Aumento em Consultas",           text: "Análise de tendência mostra crescimento de 18% em atendimentos este mês comparado ao mês anterior." },
  { title: "Pets com Acompanhamento Ativo",  text: "47 pets estão em acompanhamento contínuo. Recomendamos reforçar o engajamento com tutores destes pacientes." },
  { title: "Especialidades Demandadas",      text: "Cirurgia e Oftalmologia apresentam maior demanda. Considere expandir a oferta dessas especialidades." },
  { title: "Receita em Alta",                text: "Faturamento de R$ 8.450 este mês. Ticket médio de R$ 320 — estável. Manutenção de qualidade confirmada." },
];

const breedsData = [
  { breed: "Labrador",          count: 28 },
  { breed: "Golden Retriever",  count: 20 },
  { breed: "Poodle",            count: 17 },
  { breed: "Siamês",            count: 14 },
];

// ─── SVG Charts ──────────────────────────────────────────────────────────────

function LineChart() {
  const W = 520, H = 180, padL = 48, padB = 28, padT = 12, padR = 16;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxVal = 10000;
  const xs = revenueData.map((_, i) => padL + (i / (revenueData.length - 1)) * chartW);
  const ys = revenueData.map((d) => padT + chartH - (d.value / maxVal) * chartH);
  const polyline = xs.map((x, i) => `${x},${ys[i]}`).join(" ");
  const area = `M${xs[0]},${ys[0]} ` + xs.map((x, i) => `L${x},${ys[i]}`).join(" ") + ` L${xs[xs.length - 1]},${padT + chartH} L${xs[0]},${padT + chartH} Z`;
  const gridYs = [0, 2500, 5000, 7500, 10000];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      {gridYs.map((v) => {
        const y = padT + chartH - (v / maxVal) * chartH;
        return <g key={v}>
          <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#e5e7eb" strokeWidth="1" />
          <text x={padL - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{v === 0 ? "" : `${v / 1000}k`}</text>
        </g>;
      })}
      <path d={area} fill="#2d7a57" fillOpacity="0.08" />
      <polyline points={polyline} fill="none" stroke="#2d7a57" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      {xs.map((x, i) => (
        <circle key={i} cx={x} cy={ys[i]} r="4" fill="white" stroke="#2d7a57" strokeWidth="2" />
      ))}
      {revenueData.map((d, i) => (
        <text key={i} x={xs[i]} y={H - 6} textAnchor="middle" fontSize="9" fill="#6b7280">{d.month}</text>
      ))}
    </svg>
  );
}

function DonutChart() {
  const cx = 90, cy = 90, r = 65, stroke = 28;
  let offset = 0;
  const circ = 2 * Math.PI * r;
  const segments = servicesMix.map((s) => {
    const dash = (s.percentage / 100) * circ;
    const gap = circ - dash;
    const rotate = (offset / 100) * 360 - 90;
    offset += s.percentage;
    return { ...s, dash, gap, rotate };
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
      <svg viewBox="0 0 180 180" style={{ width: 160, height: 160, flexShrink: 0 }}>
        {segments.map((s, i) => (
          <circle
            key={i} cx={cx} cy={cy} r={r}
            fill="none" stroke={s.color} strokeWidth={stroke}
            strokeDasharray={`${s.dash} ${s.gap}`}
            strokeDashoffset={0}
            transform={`rotate(${s.rotate} ${cx} ${cy})`}
          />
        ))}
        <circle cx={cx} cy={cy} r={r - stroke / 2 - 2} fill="white" />
        <text x={cx} y={cy - 4} textAnchor="middle" fontSize="14" fontWeight="700" fill="#1a4d35">Mix</text>
        <text x={cx} y={cy + 14} textAnchor="middle" fontSize="10" fill="#6b7280">Serviços</text>
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {servicesMix.map((s) => (
          <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12 }}>
            <div style={{ width: 12, height: 12, borderRadius: 3, background: s.color, flexShrink: 0 }} />
            <span style={{ color: "#374151" }}>{s.label}</span>
            <span style={{ fontWeight: 700, color: "#111827", marginLeft: "auto", paddingLeft: 8 }}>{s.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BarChart() {
  const W = 520, H = 160, padL = 36, padB = 24, padT = 8, padR = 16;
  const chartW = W - padL - padR;
  const chartH = H - padT - padB;
  const maxVal = 100;
  const barW = (chartW / appointmentsTrendData.length) * 0.5;
  const gap = chartW / appointmentsTrendData.length;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      {[0, 25, 50, 75, 100].map((v) => {
        const y = padT + chartH - (v / maxVal) * chartH;
        return <g key={v}>
          <line x1={padL} y1={y} x2={W - padR} y2={y} stroke="#e5e7eb" strokeWidth="1" />
          <text x={padL - 4} y={y + 4} textAnchor="end" fontSize="9" fill="#9ca3af">{v > 0 ? v : ""}</text>
        </g>;
      })}
      {appointmentsTrendData.map((d, i) => {
        const x = padL + i * gap + gap / 2 - barW / 2;
        const barH = (d.count / maxVal) * chartH;
        const y = padT + chartH - barH;
        return <g key={i}>
          <rect x={x} y={y} width={barW} height={barH} rx="4" fill="#2d7a57" fillOpacity="0.85" />
          <text x={x + barW / 2} y={H - 6} textAnchor="middle" fontSize="9" fill="#6b7280">{d.month}</text>
        </g>;
      })}
    </svg>
  );
}

function HorizontalBarChart() {
  const maxCount = Math.max(...breedsData.map((d) => d.count));
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {breedsData.map((d) => (
        <div key={d.breed} style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 12, color: "#374151", width: 120, flexShrink: 0 }}>{d.breed}</span>
          <div style={{ flex: 1, height: 20, background: "#f3f4f6", borderRadius: 6, overflow: "hidden" }}>
            <div
              style={{
                width: `${(d.count / maxCount) * 100}%`,
                height: "100%",
                background: "#2d7a57",
                borderRadius: 6,
              }}
            />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#1a4d35", width: 24, textAlign: "right" }}>{d.count}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Shared UI ───────────────────────────────────────────────────────────────

function KpiCard({ label, value, icon }: { label: string; value: string | number; icon?: string }) {
  return (
    <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: "20px 24px" }}>
      <p style={{ fontSize: "0.75rem", fontWeight: 600, color: "#6b7280", textTransform: "uppercase", letterSpacing: "0.05em", margin: "0 0 8px" }}>
        {icon} {label}
      </p>
      <p style={{ fontSize: "1.375rem", fontWeight: 800, color: "#1a4d35", margin: 0 }}>{value}</p>
    </div>
  );
}

const TABLE_STYLE: React.CSSProperties = {
  width: "100%", borderCollapse: "collapse",
  fontSize: 13, background: "white",
  border: "1px solid #e5e7eb", borderRadius: 12,
  overflow: "hidden",
};

const TH_STYLE: React.CSSProperties = {
  background: "#f5f2ec", padding: "10px 14px",
  fontSize: "0.7rem", fontWeight: 600, color: "#6b7280",
  textTransform: "uppercase", letterSpacing: "0.05em",
  textAlign: "left", borderBottom: "1px solid #e5e7eb",
};

const TD_STYLE: React.CSSProperties = {
  padding: "13px 14px", color: "#374151",
  borderBottom: "1px solid #f3f4f6",
};

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; color: string }> = {
    "Saudável":      { bg: "#e8f5ef", color: "#2d7a57" },
    "Em Tratamento": { bg: "#ede9fe", color: "#7c3aed" },
    "Internado":     { bg: "#fee2e2", color: "#ef4444" },
    "Confirmado":    { bg: "#e8f5ef", color: "#2d7a57" },
    "Pendente":      { bg: "#fef3c7", color: "#92400e" },
  };
  const c = map[status] ?? { bg: "#f3f4f6", color: "#6b7280" };
  return (
    <span style={{ fontSize: 11, fontWeight: 600, background: c.bg, color: c.color, borderRadius: 4, padding: "3px 8px", whiteSpace: "nowrap" }}>
      {status}
    </span>
  );
}

const CARD_STYLE: React.CSSProperties = {
  background: "white", border: "1px solid #e5e7eb", borderRadius: 12, padding: 24,
};

// ─── Tab Renderers ────────────────────────────────────────────────────────────

function TabOverview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
        {kpiOverview.map((k) => <KpiCard key={k.label} {...k} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
        <div style={CARD_STYLE}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: "0 0 16px" }}>Receita Mensal</h3>
          <LineChart />
        </div>
        <div style={CARD_STYLE}>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: "0 0 16px" }}>Mix de Serviços</h3>
          <DonutChart />
        </div>
      </div>
    </div>
  );
}

function TabRecords() {
  return (
    <div style={CARD_STYLE}>
      <h3 style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: "0 0 16px" }}>Prontuários dos Pacientes</h3>
      <div style={{ overflowX: "auto" }}>
        <table style={TABLE_STYLE}>
          <thead>
            <tr>
              {["Tutor", "Pet", "Espécie", "Raça", "Idade", "Status", "Última Consulta", "Próx. Retorno", "Ação"].map((h) => (
                <th key={h} style={TH_STYLE}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recordsData.map((r, i) => (
              <tr key={i} onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")} onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                <td style={TD_STYLE}>{r.tutor}</td>
                <td style={{ ...TD_STYLE, fontWeight: 600 }}>{r.pet}</td>
                <td style={TD_STYLE}>{r.species}</td>
                <td style={TD_STYLE}>{r.breed}</td>
                <td style={TD_STYLE}>{r.age}</td>
                <td style={TD_STYLE}><StatusBadge status={r.status} /></td>
                <td style={TD_STYLE}>{r.lastConsultation}</td>
                <td style={TD_STYLE}>{r.nextReturn}</td>
                <td style={{ ...TD_STYLE, color: "#6b7280", cursor: "pointer", textAlign: "center" }}>⋯</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TabAppointments() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {appointmentKpis.map((k) => <KpiCard key={k.label} label={k.label} value={k.value} />)}
      </div>
      <div style={CARD_STYLE}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: "0 0 16px" }}>Agenda</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={TABLE_STYLE}>
            <thead>
              <tr>
                {["Pet", "Tutor", "Veterinário", "Tipo", "Data", "Horário", "Status"].map((h) => (
                  <th key={h} style={TH_STYLE}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {appointmentsData.map((a, i) => (
                <tr key={i} onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")} onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                  <td style={{ ...TD_STYLE, fontWeight: 600 }}>{a.pet}</td>
                  <td style={TD_STYLE}>{a.tutor}</td>
                  <td style={TD_STYLE}>{a.vet}</td>
                  <td style={TD_STYLE}>{a.type}</td>
                  <td style={TD_STYLE}>{a.date}</td>
                  <td style={TD_STYLE}>{a.time}</td>
                  <td style={TD_STYLE}><StatusBadge status={a.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div style={CARD_STYLE}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: "0 0 16px" }}>Evolução Mensal de Atendimentos</h3>
        <BarChart />
      </div>
    </div>
  );
}

function TabHospitalization() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {hospitalizationKpis.map((k) => <KpiCard key={k.label} label={k.label} value={k.value} />)}
      </div>
      <div style={CARD_STYLE}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: "0 0 16px" }}>Boxes de Internação</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {boxesData.map((b) => {
            const c = boxStatusColors[b.status];
            return (
              <div
                key={b.boxNumber}
                style={{
                  background: "white", border: `2px solid ${c.border}`,
                  borderRadius: 12, padding: "20px 16px", minHeight: 120,
                  display: "flex", flexDirection: "column", gap: 8,
                }}
              >
                <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#6b7280" }}>BOX {b.boxNumber}</span>
                <span style={{ fontSize: "0.75rem", fontWeight: 600, background: c.bg, color: c.text, borderRadius: 4, padding: "4px 8px", alignSelf: "flex-start" }}>
                  {b.status}
                </span>
                {b.pet && (
                  <span style={{ fontSize: "1rem", fontWeight: 600, color: "#1a4d35", marginTop: 4 }}>{b.pet}</span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function TabProfessionals() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
      {professionalsData.map((p) => (
        <div
          key={p.name}
          style={{ ...CARD_STYLE, transition: "box-shadow 0.2s", cursor: "default" }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 16px rgba(0,0,0,0.10)")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLDivElement).style.boxShadow = "none")}
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: 8, background: p.avatarColor, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "white", fontWeight: 700, fontSize: "1.5rem" }}>{p.initials}</span>
            </div>
            <p style={{ fontSize: "1rem", fontWeight: 700, color: "#1a4d35", margin: "12px 0 4px" }}>{p.name}</p>
            <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#6b7280", margin: 0 }}>{p.specialty}</p>
          </div>
          <div style={{ borderTop: "1px solid #e5e7eb", margin: "16px 0 0", paddingTop: 16, display: "flex", justifyContent: "space-around" }}>
            {[{ label: "Hoje", v: p.appointmentsToday }, { label: "Este Mês", v: p.appointmentsMonth }].map(({ label, v }) => (
              <div key={label} style={{ textAlign: "center" }}>
                <p style={{ fontSize: "0.875rem", fontWeight: 500, color: "#6b7280", margin: "0 0 4px" }}>{label}</p>
                <p style={{ fontSize: "1.125rem", fontWeight: 700, color: "#1a4d35", margin: 0 }}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function TabReports() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {reportsKpis.map((k) => <KpiCard key={k.label} {...k} />)}
      </div>
      <div style={CARD_STYLE}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: "0 0 16px" }}>Desempenho por Veterinário</h3>
        <table style={TABLE_STYLE}>
          <thead>
            <tr>
              {["Veterinário", "Atendimentos", "Ticket Médio", "Receita Gerada", "Repasse (50%)"].map((h) => (
                <th key={h} style={TH_STYLE}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reportsData.map((r, i) => (
              <tr key={i} onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")} onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                <td style={{ ...TD_STYLE, fontWeight: 600 }}>{r.vet}</td>
                <td style={{ ...TD_STYLE, textAlign: "center" }}>{r.appointments}</td>
                <td style={{ ...TD_STYLE, textAlign: "center", fontWeight: 600, color: "#2d7a57" }}>{r.ticketAvg}</td>
                <td style={{ ...TD_STYLE, textAlign: "center", fontWeight: 600, color: "#2d7a57" }}>{r.revenue}</td>
                <td style={{ ...TD_STYLE, textAlign: "center", fontWeight: 600, color: "#2d7a57" }}>{r.commission}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TabInsights() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
        {insightsData.map((ins) => (
          <div key={ins.title} style={{ ...CARD_STYLE, borderLeft: "4px solid #2d7a57" }}>
            <h3 style={{ fontSize: 14, fontWeight: 700, color: "#1a4d35", margin: "0 0 8px" }}>🤖 {ins.title}</h3>
            <p style={{ fontSize: 13, color: "#4b5563", margin: 0, lineHeight: 1.6 }}>{ins.text}</p>
          </div>
        ))}
      </div>
      <div style={CARD_STYLE}>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: "0 0 20px" }}>Raças Mais Atendidas</h3>
        <HorizontalBarChart />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

const TABS: { id: TabType; label: string }[] = [
  { id: "overview",         label: "Visão Geral"  },
  { id: "records",          label: "Prontuários"  },
  { id: "appointments",     label: "Atendimentos" },
  { id: "hospitalization",  label: "Internação"   },
  { id: "professionals",    label: "Profissionais"},
  { id: "reports",          label: "Relatórios"   },
  { id: "insights",         label: "Insights IA"  },
];

export default function ClinicDemoClient() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [showContactModal, setShowContactModal] = useState(false);
  const [formData, setFormData] = useState<ContactForm>({ clinicName: "", email: "", contactName: "", message: "" });
  const [toast, setToast] = useState("");

  function setField(field: keyof ContactForm, value: string) {
    setFormData((f) => ({ ...f, [field]: value }));
  }

  function handleSubmitContact() {
    const { clinicName, email, contactName, message } = formData;
    if (!clinicName.trim() || !email.trim() || !contactName.trim() || !message.trim()) {
      alert("Preencha todos os campos.");
      return;
    }
    setToast("Obrigado! Entraremos em contato em breve.");
    setShowContactModal(false);
    setFormData({ clinicName: "", email: "", contactName: "", message: "" });
    setTimeout(() => setToast(""), 2000);
  }

  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "9px 12px", border: "1px solid #d1d5db",
    borderRadius: 8, fontSize: 13, fontFamily: "inherit", color: "#111827",
    background: "white", boxSizing: "border-box", outline: "none",
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh", background: "#f5f2ec" }}>
      {/* Page Header */}
      <div style={{ padding: "20px 28px 0", display: "flex", alignItems: "center", gap: 16 }}>
        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, color: "#6b7280", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4, padding: 0 }}
        >
          ← Voltar
        </button>
        <h1 style={{ fontSize: "1.625rem", fontWeight: 800, color: "#1a4d35", margin: 0, flex: 1 }}>
          Painel da Clínica (Demo)
        </h1>
        <span style={{ background: "#f59e0b", color: "white", borderRadius: 20, padding: "4px 12px", fontSize: "0.75rem", fontWeight: 600 }}>
          DEMO
        </span>
      </div>

      {/* Tab Navigation */}
      <div style={{ padding: "0 28px", borderBottom: "1px solid #e5e7eb", marginTop: 16, display: "flex", gap: 0, overflowX: "auto" }}>
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "14px 20px",
              background: "none", border: "none",
              borderBottom: activeTab === tab.id ? "2px solid #2d7a57" : "2px solid transparent",
              fontSize: 14, fontWeight: 500,
              color: activeTab === tab.id ? "#1a4d35" : "#6b7280",
              cursor: "pointer", fontFamily: "inherit",
              whiteSpace: "nowrap",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding: "28px" }}>
        {activeTab === "overview"        && <TabOverview />}
        {activeTab === "records"         && <TabRecords />}
        {activeTab === "appointments"    && <TabAppointments />}
        {activeTab === "hospitalization" && <TabHospitalization />}
        {activeTab === "professionals"   && <TabProfessionals />}
        {activeTab === "reports"         && <TabReports />}
        {activeTab === "insights"        && <TabInsights />}
      </div>

      {/* Floating Contact Button */}
      <button
        type="button"
        onClick={() => setShowContactModal(true)}
        title="Quero conhecer o PetPulse para minha clínica"
        style={{
          position: "fixed", bottom: 28, right: 28,
          width: 56, height: 56, borderRadius: "50%",
          background: "#2d7a57", border: "none",
          boxShadow: "0 4px 16px rgba(45,122,87,0.4)",
          cursor: "pointer", fontSize: 22,
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 500,
        }}
      >
        💬
      </button>

      {/* Contact Modal */}
      {showContactModal && (
        <div
          onClick={() => setShowContactModal(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ background: "white", borderRadius: 16, padding: 32, maxWidth: 480, width: "calc(100vw - 32px)", boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div>
                <h2 style={{ fontSize: 17, fontWeight: 700, color: "#111827", margin: 0 }}>Quero o PetPulse na minha clínica</h2>
                <p style={{ fontSize: 12, color: "#6b7280", margin: "4px 0 0" }}>Entraremos em contato em até 24h</p>
              </div>
              <button type="button" onClick={() => setShowContactModal(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", fontSize: 20 }}>✕</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { field: "clinicName",    label: "Nome da Clínica",  placeholder: "Clínica VetCare" },
                { field: "email",         label: "E-mail",           placeholder: "contato@clinica.com" },
                { field: "contactName",   label: "Seu Nome",         placeholder: "Dr. João Silva" },
              ].map(({ field, label, placeholder }) => (
                <div key={field}>
                  <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>{label}</label>
                  <input
                    style={inputStyle}
                    value={formData[field as keyof ContactForm]}
                    onChange={(e) => setField(field as keyof ContactForm, e.target.value)}
                    placeholder={placeholder}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: "#374151", display: "block", marginBottom: 5 }}>Mensagem</label>
                <textarea
                  style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
                  value={formData.message}
                  onChange={(e) => setField("message", e.target.value)}
                  placeholder="Conte um pouco sobre sua clínica e o que mais chamou sua atenção..."
                />
              </div>
            </div>

            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button type="button" onClick={() => setShowContactModal(false)} style={{ flex: 1, padding: "10px", background: "white", border: "1px solid #d1d5db", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "#374151" }}>
                Cancelar
              </button>
              <button type="button" onClick={handleSubmitContact} style={{ flex: 2, padding: "10px", background: "#2d7a57", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "white" }}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: 96, left: "50%", transform: "translateX(-50%)",
          background: "#1a4d35", color: "white", padding: "12px 24px",
          borderRadius: 8, fontSize: 13, fontWeight: 600,
          boxShadow: "0 4px 16px rgba(0,0,0,0.2)", zIndex: 600,
          whiteSpace: "nowrap",
        }}>
          ✅ {toast}
        </div>
      )}
    </div>
  );
}
