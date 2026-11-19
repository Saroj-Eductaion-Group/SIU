import { motion } from "framer-motion";

const TICKER_ITEMS = [
  "✏ New NEET mock added: Biology Genetics & Evolution Full Mock 2026",
  "🥇 Rahul Sharma, Lucknow — NEET Physics mock score: 178/180",
  "📢 NEET UG 2026 exam date: May 3, 2026 — start your preparation now!",
  "🤖 AI Mentor now supports Hindi · Hinglish queries",
  "🧬 Biology Botany & Zoology full mock now available — attempt it!",
  "📊 Over 2.4 lakh NEET aspirants on the platform — join the community!",
  "✨ New Chemistry Organic Focus mock test added — practice now",
  "⚡ Physics Mechanics & Waves mock: attempt and track your AIR rank",
  "🏆 Score 680+ with AI-powered NEET preparation — start today!",
];

export function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="w-full overflow-hidden flex items-center relative border-b"
      style={{ background: "linear-gradient(90deg, #091749 0%, #0f2272 50%, #091749 100%)", borderColor: "rgba(255,255,255,0.08)", height: 36 }}>
      {/* Edge fades */}
      <div className="absolute left-0 z-10 w-16 h-full pointer-events-none" style={{ background: "linear-gradient(to right, #091749, transparent)" }} />
      <div className="absolute right-0 z-10 w-16 h-full pointer-events-none" style={{ background: "linear-gradient(to left, #091749, transparent)" }} />

      <motion.div className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}>
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center text-[11px] font-semibold px-6" style={{ color: "#f0d060" }}>
            {item}
            <span className="ml-6 opacity-30 text-white/40">◆</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
