import { motion } from "framer-motion";

const TICKER_ITEMS = [
  "🏆 SIUAT 2026-27 registrations OPEN — Only 500 seats! Register now",
  "✏ New CUET mock added: Biology Genetics & Biotech Full Mock 2026",
  "🥇 Rahul Sharma, Lucknow — CUET Physics mock score: 98/100",
  "💰 Win ₹51,000 merit award — appear in SIUAT Talent Hunt 2026",
  "📢 CUET UG 2026 city allotment: 96.6% candidates got preferred city",
  "🤖 AI Mentor now supports Hindi · Hinglish queries",
  "🎓 SIU Lucknow admissions open for B.Tech, B.Pharma & 40+ courses",
  "📊 Over 2.4 lakh students now on AdmissionX — join the community!",
  "✨ CUET 2026 exam dates announced: May 14–30, 2026",
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
