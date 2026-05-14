import { useState } from "react";
import { SEEDED_LEADERBOARD } from "../lib/data";

const FILTERS = ["Overall", "Physics", "Chemistry", "Biology", "Mathematics", "This Week", "All Time"];

function RankBadge({ rank }: { rank: number }) {
  const styles: Record<number, string> = {
    1: "background:linear-gradient(135deg,#c9a84c,#e8b840);color:#0a1f5c",
    2: "background:linear-gradient(135deg,#c0c0d0,#d8d8e8);color:#333",
    3: "background:linear-gradient(135deg,#cd7f32,#e8a050);color:#fff",
  };
  return (
    <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-extrabold flex-shrink-0"
      style={{ ...(rank <= 3 ? Object.fromEntries(styles[rank].split(";").map(s => s.split(":"))) : { background: "#f3f4f6", color: "#6b7280" }) }}>
      {rank <= 3 ? ["🥇","🥈","🥉"][rank - 1] : `#${rank}`}
    </div>
  );
}

export function RankingsPanel() {
  const [filter, setFilter] = useState("Overall");

  const stats = [
    { num: "2,41,893", label: "Total Students" },
    { num: "18,540", label: "Tests This Week" },
    { num: "Rahul S.", label: "#1 This Week" },
    { num: "73.4%", label: "Average Score" },
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
          <h2 className="font-serif font-bold text-lg text-[#0a1f5c]">Live Leaderboard</h2>
          <span className="flex items-center gap-1.5 text-xs text-red-500 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live
          </span>
        </div>

        {/* Top 3 podium */}
        <div className="flex justify-center items-end gap-4 p-6 border-b" style={{ background: "linear-gradient(135deg,#f5f0ff,#fafafa)" }}>
          {/* 2nd */}
          <div className="text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-xl mb-1 mx-auto">🥈</div>
            <div className="text-xs font-bold text-gray-800">{SEEDED_LEADERBOARD[1].name.split(" ")[0]}</div>
            <div className="font-serif font-black text-lg text-gray-600">{SEEDED_LEADERBOARD[1].score}%</div>
            <div className="text-[10px] text-gray-400">{SEEDED_LEADERBOARD[1].state}</div>
          </div>
          {/* 1st */}
          <div className="text-center -mt-4">
            <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-1 mx-auto shadow-lg" style={{ background: "linear-gradient(135deg,#c9a84c,#e8b840)" }}>🥇</div>
            <div className="text-xs font-bold text-[#0a1f5c]">{SEEDED_LEADERBOARD[0].name.split(" ")[0]}</div>
            <div className="font-serif font-black text-2xl" style={{ color: "#6c3fc7" }}>{SEEDED_LEADERBOARD[0].score}%</div>
            <div className="text-[10px] text-gray-400">{SEEDED_LEADERBOARD[0].state}</div>
          </div>
          {/* 3rd */}
          <div className="text-center">
            <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl mb-1 mx-auto" style={{ background: "linear-gradient(135deg,#cd7f32,#e8a050)" }}>🥉</div>
            <div className="text-xs font-bold text-gray-800">{SEEDED_LEADERBOARD[2].name.split(" ")[0]}</div>
            <div className="font-serif font-black text-lg" style={{ color: "#cd7f32" }}>{SEEDED_LEADERBOARD[2].score}%</div>
            <div className="text-[10px] text-gray-400">{SEEDED_LEADERBOARD[2].state}</div>
          </div>
        </div>

        {/* Full list */}
        <div className="divide-y divide-gray-100">
          {SEEDED_LEADERBOARD.map(entry => (
            <div key={entry.id} data-testid={`rank-row-${entry.rank}`}
              className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition cursor-pointer">
              <RankBadge rank={entry.rank} />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-gray-900 flex items-center gap-2">
                  {entry.name}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">{entry.state} · {entry.testsTaken} tests · {entry.accuracy}% accuracy</div>
              </div>
              <div className="text-right">
                <div className="font-serif font-bold text-xl" style={{ color: "#6c3fc7" }}>{entry.score}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
