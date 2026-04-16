"use client";

import { HealthRecord } from "@/types/health-monitoring";

interface WeightChartProps {
  records: HealthRecord[];
  species: string;
}

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
const H = 160;
const PAD_LEFT = 44;
const PAD_RIGHT = 16;
const PAD_TOP = 16;
const PAD_BOTTOM = 32;

export function WeightChart({ records, species }: WeightChartProps) {
  const color = species === "dog" ? "#2d7a57" : species === "cat" ? "#7c3aed" : "#6b7280";

  const data = records
    .filter((r) => r.weight_kg != null)
    .slice(0, 30)
    .reverse()
    .map((r) => ({ date: r.date, value: Number(r.weight_kg) }));

  if (data.length < 2) {
    return (
      <div style={{ padding: "32px 16px", textAlign: "center", color: "#9ca3af", fontSize: 13 }}>
        Registre mais dados para visualizar o gráfico
      </div>
    );
  }

  const values = data.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal || 1;

  const chartW = W - PAD_LEFT - PAD_RIGHT;
  const chartH = H - PAD_TOP - PAD_BOTTOM;

  const points = data.map((d, i) => ({
    x: PAD_LEFT + (i / (data.length - 1)) * chartW,
    y: PAD_TOP + chartH - ((d.value - minVal) / range) * chartH,
  }));

  const linePath = buildSmoothPath(points);
  const areaPath =
    linePath +
    ` L ${points[points.length - 1].x} ${PAD_TOP + chartH}` +
    ` L ${points[0].x} ${PAD_TOP + chartH} Z`;

  const gradId = `wg-${species}`;

  // X axis labels (show max 6)
  const step = Math.max(1, Math.floor(data.length / 5));
  const xLabels = data.filter((_, i) => i % step === 0 || i === data.length - 1);

  // Y axis labels (3 ticks)
  const yTicks = [minVal, (minVal + maxVal) / 2, maxVal];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto", display: "block" }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {yTicks.map((_, i) => {
        return (
          <line
            key={i}
            x1={PAD_LEFT}
            y1={PAD_TOP + chartH - (i / 2) * chartH}
            x2={W - PAD_RIGHT}
            y2={PAD_TOP + chartH - (i / 2) * chartH}
            stroke="#f3f4f6"
            strokeWidth={1}
          />
        );
      })}

      {/* Y axis labels */}
      {yTicks.map((v, i) => (
        <text
          key={i}
          x={PAD_LEFT - 6}
          y={PAD_TOP + chartH - (i / 2) * chartH + 4}
          textAnchor="end"
          fontSize={9}
          fill="#9ca3af"
        >
          {v.toFixed(1)}
        </text>
      ))}

      {/* Area fill */}
      <path d={areaPath} fill={`url(#${gradId})`} />

      {/* Line */}
      <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />

      {/* Dots */}
      {points.map((pt, i) => (
        <circle key={i} cx={pt.x} cy={pt.y} r={3} fill="white" stroke={color} strokeWidth={2} />
      ))}

      {/* X axis labels */}
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
