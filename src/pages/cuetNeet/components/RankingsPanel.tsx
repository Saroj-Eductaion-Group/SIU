import { useState, useEffect } from "react";
import type React from "react";

const FILTERS = ["Overall", "Physics", "Chemistry", "Biology", "Mathematics", "This Week", "All Time"];

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

const BASE = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_API_URL || 'http://localhost:5000/api';

type RankEntry = { appId: string; firstName: string; lastName: string; city: string; state: string; courses: string[]; score: number; };

export function RankingsPanel() {
  const [filter, setFilter] = useState("Overall");
  const [entries, setEntries] = useState<RankEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${BASE}/registrations/results`)
      .then(r => r.json())
      .then(data => setEntries(Array.isArray(data) ? data.filter((r: RankEntry) => r.score !== null) : []))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  const top = entries[0];
  const stats = [
    { num: entries.length.toString(), label: "Total Appeared" },
    { num: entries.filter(e => e.score >= 60).length.toString(), label: "Qualified" },
    { num: top ? `${top.firstName} ${top.lastName[0]}.` : "—", label: "#1 Rank" },
    { num: entries.length ? `${Math.round(entries.reduce((s, e) => s + e.score, 0) / entries.length)}%` : "—", label: "Avg Score" },
  ];

  return (
    <div>
      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {stats.map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center shadow-sm">
            <div className="font-serif font-bold text-xl text-[#0a1f5c]">{s.num}</div>
            <div className="text-xs text-gray-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-5">
        {FILTERS.map(f => (
          <button key={f} onClick={() => setFilter(f)} data-testid={`rank-filter-${f}`}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition"
            style={{ background: filter === f ? "#0a1f5c" : "#fff", color: filter === f ? "#fff" : "#6b7280", border: `1.5px solid ${filter === f ? "#0a1f5c" : "#e5e7eb"}` }}>
            {f}
          </button>
        ))}
      </div>

      {/* Leaderboard */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-serif font-bold text-lg text-[#0a1f5c]">SIUAT Live Leaderboard</h2>
          <span className="flex items-center gap-1.5 text-xs text-red-500 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live
          </span>
        </div>

        {loading && <div className="text-center py-12 text-gray-400 text-sm">Loading...</div>}

        {!loading && entries.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <div className="text-4xl mb-3">🏆</div>
            <div className="font-semibold">No exam results yet. Be the first to appear!</div>
          </div>
        )}

        {!loading && entries.length > 0 && (
          <div className="divide-y divide-gray-100">
            {entries.map((entry, i) => (
              <div key={entry.appId} data-testid={`rank-row-${i + 1}`}
                className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition">
                <RankBadge rank={i + 1} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-gray-900">
                    {entry.firstName} {entry.lastName}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{entry.city}, {entry.state}</div>
                </div>
                <div className="text-right">
                  <div className="font-serif font-bold text-xl" style={{ color: entry.score >= 90 ? "#7a5500" : entry.score >= 75 ? "#0a1f5c" : "#6c3fc7" }}>{entry.score}%</div>
                  <div className="text-[10px] text-gray-400">{(entry.courses || []).slice(0, 1).join(", ")}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
