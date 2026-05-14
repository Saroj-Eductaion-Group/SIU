import { useState, useEffect } from 'react';

const PROGRAMMES = ["B.Tech","BBA","BCA","B.Sc","B.Com","BA","MBA","M.Tech","MCA","M.Sc","M.Com","MA","LLB","LLM","B.Pharma","M.Pharma"];

export default function ScholarshipModal({ onClose, onRegister }) {
  const [timeLeft, setTimeLeft] = useState(72 * 3600);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(t => Math.max(0, t - 1)), 1000);
    return () => clearInterval(interval);
  }, []);

  const fmt = (s) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${String(h).padStart(2,"0")}:${String(m).padStart(2,"0")}:${String(sec).padStart(2,"0")}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
      <div className="relative bg-white rounded-2xl w-full max-w-[540px] overflow-hidden shadow-2xl"
        style={{ maxHeight: "90vh", overflowY: "auto" }}>
        <button onClick={onClose}
          className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-lg font-bold border border-gray-200"
          style={{ color: "#0a1f5c" }}>×</button>

        {/* Ribbon */}
        <div className="text-center py-3 font-extrabold text-sm tracking-widest uppercase"
          style={{ background: "linear-gradient(90deg, #c9a84c, #e8b840, #c9a84c)", color: "#0a1f5c" }}>
          🏆 SIU Special Merit Scholarship Drive 2026-27 🏆
        </div>

        <div className="p-6 text-center">
          <div className="text-3xl mb-2">⭐⭐⭐</div>
          <h2 className="text-2xl font-black mb-2" style={{ fontFamily: "'Playfair Display', serif", color: "#0a1f5c" }}>
            Win 100% Full Scholarship!
          </h2>
          <p className="text-sm text-gray-500 mb-3 leading-relaxed">
            Score <strong>90% or above</strong> in the Talent Hunt Examination and get a complete fee waiver for your entire programme. Limited seats — register before they fill up!
          </p>

          {timeLeft > 0 && (
            <p className="text-red-600 font-bold text-sm mb-4">Offer closes in: {fmt(timeLeft)}</p>
          )}

          {/* Slabs */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { icon: "🏆", pct: "100%",       label: "Score 90% & above", bg: "#fffbea", border: "#e8c840", col: "#7a5500" },
              { icon: "🥈", pct: "50%",        label: "Score 75% – 89%",   bg: "#f0f4ff", border: "#93c5fd", col: "#0a1f5c" },
              { icon: "🥉", pct: "25%",        label: "Score 60% – 74%",   bg: "#fff5e8", border: "#e8c090", col: "#8a4f00" },
              { icon: "📚", pct: "Merit Cert", label: "All qualifiers",     bg: "#e8f5ee", border: "#a8d5ba", col: "#1a6b3a" },
            ].map(s => (
              <div key={s.pct} className="rounded-xl p-3 flex items-center gap-2 text-left border-[1.5px]"
                style={{ background: s.bg, borderColor: s.border, color: s.col }}>
                <span className="text-xl flex-shrink-0">{s.icon}</span>
                <div>
                  <div className="font-bold text-sm">{s.pct} Scholarship</div>
                  <div className="text-xs opacity-70">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: "#0a1f5c" }}>
            Available across all programmes
          </p>
          <div className="flex flex-wrap gap-1.5 justify-center mb-5">
            {PROGRAMMES.map(p => (
              <span key={p} className="px-2.5 py-1 rounded-full text-xs font-semibold border border-blue-200"
                style={{ background: "#eff6ff", color: "#0a1f5c" }}>{p}</span>
            ))}
          </div>

          <button onClick={onRegister}
            className="w-full py-3 rounded-xl text-base font-extrabold mb-2 transition hover:brightness-95"
            style={{ background: "linear-gradient(90deg, #c9a84c, #e8b840)", color: "#0a1f5c" }}>
            ✎ Register Now & Claim Scholarship →
          </button>
          <button onClick={onClose} className="text-xs text-gray-400 underline">
            Dismiss — I'll check later
          </button>
        </div>
      </div>
    </div>
  );
}
