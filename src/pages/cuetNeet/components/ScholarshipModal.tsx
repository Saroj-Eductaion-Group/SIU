import { useState } from "react";
import { createPortal } from "react-dom";

interface ScholarshipModalProps {
  onClose: () => void;
  onRegister: () => void;
}

const PROGRAMMES: string[] = [];

export function ScholarshipModal({ onClose, onRegister }: ScholarshipModalProps) {

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}>
      <div className="relative bg-white rounded-2xl w-full max-w-[540px] overflow-hidden shadow-2xl" style={{ maxHeight: "90vh", overflowY: "auto" }}>
        <button onClick={onClose} data-testid="modal-close" className="absolute top-3 right-3 z-10 w-7 h-7 rounded-full bg-white/80 flex items-center justify-center text-lg font-bold text-[#0a1f5c] border border-gray-200">×</button>

        {/* Ribbon */}
        <div className="text-center py-3 font-extrabold text-sm tracking-widest uppercase text-[#064e3b]" style={{ background: "linear-gradient(90deg, #c9a84c, #e8b840, #c9a84c)" }}>
          🧬 NEET 2026 — Free Mock Test Registration
        </div>

        <div className="p-6 text-center">
          <div className="text-3xl mb-2">🎓🤖📊</div>
          <h2 className="font-serif text-2xl font-black text-[#064e3b] mb-2">Crack NEET 2026 with AI!</h2>
          <p className="text-sm text-gray-500 mb-3 leading-relaxed">Get access to <strong>NTA-pattern mock tests</strong>, instant AI result analysis, subject-wise performance tracking, and weak-topic identification — all free!</p>

          {/* Feature highlights */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { icon: "✏️", title: "Free Mock Tests", label: "Physics, Chemistry, Biology", bg: "#e6fffa", border: "#a7f3d0", col: "#064e3b" },
              { icon: "🤖", title: "AI Mentor", label: "24/7 doubt solving", bg: "#f5f0ff", border: "#c4b5fd", col: "#4c1d95" },
              { icon: "📊", title: "Performance Analysis", label: "After every test", bg: "#eff6ff", border: "#93c5fd", col: "#0a1f5c" },
              { icon: "🏅", title: "National Ranking", label: "Live leaderboard", bg: "#fffbea", border: "#e8c840", col: "#7a5500" },
            ].map(s => (
              <div key={s.title} className="rounded-xl p-3 flex items-center gap-2 text-left border-[1.5px]" style={{ background: s.bg, borderColor: s.border, color: s.col }}>
                <span className="text-xl flex-shrink-0">{s.icon}</span>
                <div>
                  <div className="font-bold text-sm">{s.title}</div>
                  <div className="text-xs opacity-70">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-xs font-bold text-[#064e3b] uppercase tracking-wider mb-2">NEET 2026 Subjects Covered</p>
          <div className="flex flex-wrap gap-1.5 justify-center mb-5">
            {["Physics", "Chemistry", "Botany", "Zoology", "Full Mock"].map(p => (
              <span key={p} className="px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-50 text-teal-800 border border-teal-200">{p}</span>
            ))}
          </div>

          <button
            onClick={onRegister}
            data-testid="modal-register-cta"
            className="w-full py-3 rounded-xl text-base font-extrabold text-[#064e3b] mb-2 transition hover:brightness-95"
            style={{ background: "linear-gradient(90deg, #c9a84c, #e8b840)" }}
          >
            ✎ Start Free Mock Tests →
          </button>
          <button onClick={onClose} className="text-xs text-gray-400 underline">Dismiss — I'll check later</button>
        </div>
      </div>
    </div>
  , document.body);
}
