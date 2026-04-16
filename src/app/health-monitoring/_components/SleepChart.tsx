"use client";

import { HealthRecord, SleepValue } from "@/types/health-monitoring";

interface SleepChartProps {
  records: HealthRecord[];
}

const SLEEP_NUM: Record<SleepValue, number> = { good: 3, normal: 2, poor: 1 };
const Y_LABELS = ["", "Ruim", "Normal", "Bom"];
const COLOR = "#3b82f6";

function buildSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length < 2) return "";
  return points.reduce((acc, pt, i) => {
    if (i === 0) return `M ${pt.x} ${pt.y}`;
    const prev = points[i - 1];
    const cpX = (prev.x + pt.x) / 2;
    return `${acc} C ${cpX} ${prev.y} ${cpX} ${pt.y} ${pt.x} ${pt.y}`;
  }, "");
}

const W = 500;
const H = 140;
const PAD_LEFT = 64;
const PAD_RIGHT = 16;
const PAD_TOP = 12;
const PAD_BOTTOM = 28;

export function SleepChart({ records }: SleepChartProps) {
  const data = records
    .filter((r) => r.sleep != null)
    .slice(0, 30)
    .reverse()
    .map((r) => ({ date: r.date, value: SLEEP_NUM[r.sleep!] }));

  if (data.length < 2) {
    return (
      <div style={{ padding: "28px 16px", textAlign: "center", color: "#9ca3af", fontSize: 13 }}>
        Registre mais dados para visualizar o gráfico
      </div>
    );
  }

  const chartW = W - PAD_LEFT - PAD_RIGHT;
  const chartH = H - PAD_TOP - PAD_BOTTOM;

  const points = data.map((d, i) => ({
    x: PAD_LEFT + (i / (data.length - 1)) * chartW,
    y: PAD_TOP + chartH - ((d.value - 1) / 2) * chartH,
  }));

  const linePath = buildSmoothPath(points);
  const areaPath =
    linePath +
    ` L ${points[points.length - 1].x} ${PAD_TOP + chartH}` +
    ` L ${points[0].x} ${PAD_TOP + chartH} Z`;

  const step = Math.max(1, Math.floor(data.length / 5));
  const xLabels = data.filter((_, i) => i % step === 0 || i === data.length - 1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={COLOR} stopOpacity="0.2" />
          <stop offset="100%" stopColor={COLOR} stopOpacity="0" />
        </linearGradient>
      </defs>

      {[1, 2, 3].map((v) => {
        const y = PAD_TOP + chartH - ((v - 1) / 2) * chartH;
        return (
          <g key={v}>
            <line x1={PAD_LEFT} y1={y} x2={W - PAD_RIGHT} y2={y} stroke="#f3f4f6" strokeWidth={1} />
            <text x={PAD_LEFT - 6} y={y + 4} textAnchor="end" fontSize={9} fill="#9ca3af">
              {Y_LABELS[v]}
            </text>
          </g>
        );
      })}

      <path d={areaPath} fill="url(#sg)" />
      <path d={linePath} fill="none" stroke={COLOR} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r={3} fill="white" stroke={COLOR} strokeWidth={2} />
      ))}

      {xLabels.map((d, i) => {
        const idx = data.indexOf(d);
        const x = PAD_LEFT + (idx / (data.length - 1)) * chartW;
        const [, m, day] = d.date.split("-");
        return (
          <text key={i} x={x} y={H - 4} textAnchor="middle" fontSize={9} fill="#9ca3af">
            {day}/{m}
          </text>
        );
      })}
    </svg>
  );
}
