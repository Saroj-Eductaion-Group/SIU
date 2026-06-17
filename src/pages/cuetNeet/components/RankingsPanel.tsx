import { useState } from "react";
import type React from "react";
import { SEEDED_LEADERBOARD } from "../lib/data";

const FILTERS = ["Overall", "Physics", "Chemistry", "Biology", "Full Mock"];

function RankBadge({ rank }: { rank: number }) {
  const MEDAL = ["🥇", "🥈", "🥉"];
  const STYLE: Record<number, React.CSSProperties> = {
    1: { background: "linear-gradient(135deg,#c9a84c,#e8b840)", color: "#0a1f5c" },
    2: { background: "linear-gradient(135deg,#c0c0d0,#d8d8e8)", color: "#333" },
    3: { background: "linear-gradient(135deg,#cd7f32,#e8a050)", color: "#fff" },
  };
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0"
      style={rank <= 3 ? STYLE[rank] : { background: "#f3f4f6", color: "#6b7280" }}>
      {rank <= 3 ? MEDAL[rank - 1] : `#${rank}`}
    </div>
  );
}

export function RankingsPanel() {
  const [filter, setFilter] = useState("Overall");

  const entries = SEEDED_LEADERBOARD;
  const top = entries[0];
  const stats = [
    { num: `${entries.length}+`, label: "Mock Rankers" },
    { num: entries.filter(e => e.score >= 75).length.toString(), label: "High Scorers (75%+)" },
    { num: top ? top.name.split(" ")[0] + " " + top.name.split(" ")[1][0] + "." : "—", label: "#1 Ranker" },
    { num: entries.length ? `${Math.round(entries.reduce((s, e) => s + e.score, 0) / entries.length)}%` : "—", label: "Avg Score" },
  ];

  return (
    <div>
      {/* Info banner */}
      <div className="rounded-xl p-4 mb-5 flex items-center gap-3" style={{ background: "linear-gradient(135deg,#064e3b,#0d9488)" }}>
        <span className="text-2xl flex-shrink-0">📊</span>
        <div>
          <div className="text-white font-bold text-sm">NEET 2026 — National Mock Test Rankings</div>
          <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>
            Rankings based on NEET pattern mock test scores · Physics, Chemistry, Biology
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {stats.map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
            <div className="font-serif font-bold text-xl text-[#064e3b]">{s.num}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-5">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} data-testid={`rank-filter-${f}`}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition"
            style={{ background: filter === f ? "#064e3b" : "#fff", color: filter === f ? "#fff" : "#6b7280", border: `1.5px solid ${filter === f ? "#064e3b" : "#e5e7eb"}` }}>
            {f}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="font-serif font-bold text-lg text-[#064e3b]">NEET Mock Test Leaderboard</h2>
            <p className="text-xs text-gray-400 mt-0.5">National ranking based on mock test performance</p>
          </div>
          <span className="flex items-center gap-1.5 text-xs text-red-500 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live
          </span>
        </div>
        <div className="divide-y divide-gray-100">
          {entries.map((entry, i) => (
            <div key={entry.id} data-testid={`rank-row-${i + 1}`}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition">
              <RankBadge rank={i + 1} />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-900">{entry.name}</div>
                <div className="text-xs text-gray-400 mt-0.5">{entry.state} · {entry.testsTaken} mocks · {entry.accuracy}% accuracy</div>
              </div>
              <div className="text-right">
                <div className="font-serif font-bold text-xl" style={{ color: entry.score >= 90 ? "#7a5500" : entry.score >= 75 ? "#064e3b" : "#6c3fc7" }}>{entry.score}%</div>
                <div className="text-[10px] text-gray-400">Rank #{entry.rank}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
