import { useState } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";
import { SEEDED_REGISTRATIONS } from "../lib/data";

type Registration = typeof SEEDED_REGISTRATIONS[number];

const FILTERS = ["All", "100% Scholarship (A+)", "50% Scholarship (A)", "25% Scholarship (B)", "Grade C", "Not Qualified"];

function getGrade(score: number | null) {
  if (score === null) return null;
  if (score >= 90) return { grade: "A+", label: "100% Scholarship", color: "#7a5500", bg: "#fffbea", border: "#e8c840" };
  if (score >= 75) return { grade: "A", label: "50% Scholarship", color: "#0a1f5c", bg: "#dbeafe", border: "#93c5fd" };
  if (score >= 60) return { grade: "B", label: "25% Scholarship", color: "#92400e", bg: "#fef3c7", border: "#fcd34d" };
  if (score >= 40) return { grade: "C", label: "Merit Certificate", color: "#374151", bg: "#f3f4f6", border: "#d1d5db" };
  return { grade: "F", label: "Not Qualified", color: "#dc2626", bg: "#fee2e2", border: "#fca5a5" };
}

function StatusBadge({ status }: { status: string }) {
  const s = { Approved: "#16a34a", Pending: "#d97706", Rejected: "#dc2626" };
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white" style={{ background: (s as Record<string, string>)[status] || "#6b7280" }}>
      {status}
    </span>
  );
}

export function ResultsPanel() {
  const [filter, setFilter] = useState("All");
  const [registrations] = useLocalStorage<Registration[]>("siu_registrations", SEEDED_REGISTRATIONS);

  const completed = registrations.filter(r => r.examCompleted);
  const appeared = completed.length;
  const qualified = completed.filter(r => r.score !== null && r.score >= 60).length;
  const topScore = appeared > 0 ? Math.max(...completed.map(r => r.score ?? 0)) : 0;
  const avgScore = appeared > 0 ? Math.round(completed.reduce((s, r) => s + (r.score ?? 0), 0) / appeared) : 0;

  const filtered = registrations.filter(r => {
    if (filter === "All") return true;
    if (!r.examCompleted) return filter === "Not Qualified";
    const g = getGrade(r.score);
    if (filter === "100% Scholarship (A+)") return g?.grade === "A+";
    if (filter === "50% Scholarship (A)") return g?.grade === "A";
    if (filter === "25% Scholarship (B)") return g?.grade === "B";
    if (filter === "Grade C") return g?.grade === "C";
    if (filter === "Not Qualified") return g?.grade === "F" || !r.examCompleted;
    return true;
  });

  return (
    <div>
      {/* Alert banner */}
      <div className="rounded-xl p-4 mb-5 flex items-center gap-3" style={{ background: "#fffbea", border: "1.5px solid #c9a84c" }}>
        <span className="text-2xl">🏆</span>
        <div className="text-sm font-medium text-[#7a5500]">Score <strong>90% or above</strong> in the Talent Hunt Exam to win a <strong>100% Full Scholarship</strong> at Saroj International University — covering your entire tuition fee for the degree programme.</div>
      </div>

      {/* Section header */}
      <div className="rounded-xl p-5 mb-5 text-center" style={{ background: "linear-gradient(135deg,#0a1f5c,#4c1d95)" }}>
        <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>Saroj International University</div>
        <h2 className="font-serif font-black text-xl text-white mb-0.5">Official Result Sheet</h2>
        <div className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Talent Hunt Examination 2026-27 — Session Results</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { num: registrations.length, label: "Registered" },
          { num: appeared, label: "Appeared" },
          { num: qualified, label: "Qualified" },
          { num: topScore ? `${topScore}%` : "—", label: "Top Score" },
          { num: avgScore ? `${avgScore}%` : "—", label: "Avg Score" },
        ].slice(0, 4).map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
            <div className="font-serif font-bold text-xl text-[#6c3fc7]">{s.num}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-4">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} data-testid={`res-filter-${f.slice(0, 5)}`}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition"
            style={{ background: filter === f ? "#6c3fc7" : "#fff", color: filter === f ? "#fff" : "#6b7280", border: `1.5px solid ${filter === f ? "#6c3fc7" : "#e5e7eb"}` }}>
            {f}
          </button>
        ))}
      </div>

      {/* Results Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200 text-left" style={{ background: "#f5f0ff" }}>
                {["App ID", "Candidate", "Course(s)", "Score", "Grade", "Scholarship", "Exam Status"].map(h => (
                  <th key={h} className="px-4 py-3 text-xs font-bold uppercase tracking-wider text-[#4c1d95]">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-400">
                    <div className="text-3xl mb-2">📋</div>
                    <div className="font-medium">No results match this filter</div>
                  </td>
                </tr>
              )}
              {filtered.map(reg => {
                const g = reg.score !== null && reg.examCompleted ? getGrade(reg.score) : null;
                return (
                  <tr key={reg.id} data-testid={`result-row-${reg.id}`} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 font-mono text-xs font-bold text-[#6c3fc7]">{reg.id}</td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-gray-900">{reg.firstName} {reg.lastName}</div>
                      <div className="text-xs text-gray-400">{reg.city}, {reg.state}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {reg.courses.slice(0, 2).map(c => (
                          <span key={c} className="px-1.5 py-0.5 rounded text-[10px] bg-blue-50 text-[#0a1f5c] font-medium border border-blue-100">{c}</span>
                        ))}
                        {reg.courses.length > 2 && <span className="text-xs text-gray-400">+{reg.courses.length - 2}</span>}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      {reg.examCompleted && reg.score !== null
                        ? <span className="font-serif font-bold text-lg text-[#4c1d95]">{reg.score}%</span>
                        : <span className="text-gray-400 text-xs">Pending</span>}
                    </td>
                    <td className="px-4 py-3">
                      {g ? (
                        <span className="px-2 py-1 rounded-full text-xs font-extrabold border-[1.5px]" style={{ background: g.bg, color: g.color, borderColor: g.border }}>
                          {g.grade}
                        </span>
                      ) : <span className="text-gray-400 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {g ? (
                        <span className="text-xs font-semibold" style={{ color: g.color }}>{g.label}</span>
                      ) : <span className="text-gray-400 text-xs">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {reg.examCompleted
                        ? <span className="px-2 py-0.5 rounded-full text-xs font-bold text-white bg-green-600">Completed</span>
                        : <StatusBadge status={reg.status} />}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
