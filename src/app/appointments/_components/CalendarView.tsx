"use client";

import { useState } from "react";
import { Appointment, MONTH_NAMES_PT } from "@/types/appointments";

interface CalendarViewProps {
  appointments: Appointment[];
}

const DAY_LABELS = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"];

export function CalendarView({ appointments }: CalendarViewProps) {
  const now = new Date();
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(now.getMonth()); // 0-indexed

  const todayDay = now.getDate();
  const todayMonth = now.getMonth();
  const todayYear = now.getFullYear();

  // Days with appointments in current month
  const daysWithAppointments = new Set(
    appointments
      .filter((a) => {
        const [y, m] = a.date.split("-");
        return parseInt(y) === currentYear && parseInt(m) - 1 === currentMonth;
      })
      .map((a) => parseInt(a.date.split("-")[2]))
  );

  // Build grid
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const prevMonthDays = new Date(currentYear, currentMonth, 0).getDate();

  const cells: { day: number; inMonth: boolean }[] = [];
  // Leading cells from prev month
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: prevMonthDays - i, inMonth: false });
  }
  // Current month days
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true });
  }
  // Trailing cells
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, inMonth: false });
  }

  function prevMonth() {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear((y) => y - 1); }
    else setCurrentMonth((m) => m - 1);
  }
  function nextMonth() {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear((y) => y + 1); }
    else setCurrentMonth((m) => m + 1);
  }

  const isToday = (day: number, inMonth: boolean) =>
    inMonth && day === todayDay && currentMonth === todayMonth && currentYear === todayYear;

  return (
    <div style={{ background: "white", border: "1px solid #e5e7eb", borderRadius: 12, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", borderBottom: "1px solid #e5e7eb" }}>
        <button
          type="button"
          onClick={prevMonth}
          style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e5e7eb", borderRadius: 6, background: "#f9fafb", cursor: "pointer", color: "#374151", fontSize: 14 }}
        >
          ◀
        </button>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#111827" }}>
          {MONTH_NAMES_PT[currentMonth]} de {currentYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          style={{ width: 28, height: 28, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #e5e7eb", borderRadius: 6, background: "#f9fafb", cursor: "pointer", color: "#374151", fontSize: 14 }}
        >
          ▶
        </button>
      </div>

      {/* Day labels */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", padding: "10px 16px 0" }}>
        {DAY_LABELS.map((d) => (
          <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 600, textTransform: "uppercase", color: "#9ca3af", letterSpacing: "0.4px", paddingBottom: 8 }}>
            {d}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", padding: "0 16px 16px" }}>
        {cells.map((cell, idx) => {
          const today = isToday(cell.day, cell.inMonth);
          const hasDot = cell.inMonth && daysWithAppointments.has(cell.day);

          return (
            <div
              key={idx}
              style={{
                height: 40,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                cursor: hasDot ? "pointer" : "default",
                borderRadius: 8,
              }}
              onMouseEnter={(e) => {
                if (!today) (e.currentTarget as HTMLElement).style.background = "#f0faf4";
              }}
              onMouseLeave={(e) => {
                if (!today) (e.currentTarget as HTMLElement).style.background = "transparent";
              }}
            >
              <div style={{
                width: today ? 32 : undefined,
                height: today ? 32 : undefined,
                borderRadius: today ? "50%" : undefined,
                background: today ? "#2d7a57" : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <span style={{
                  fontSize: 14,
                  fontWeight: today ? 700 : 500,
                  color: today ? "white" : cell.inMonth ? "#374151" : "#d1d5db",
                }}>
                  {cell.day}
                </span>
              </div>
              {hasDot && (
                <div style={{
                  position: "absolute",
                  bottom: 4,
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#2d7a57",
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
