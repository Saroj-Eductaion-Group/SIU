import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";

type Message = { role: "user" | "ai"; text: string; ts: number };

const SUGGESTIONS = [
  "Explain photoelectric effect",
  "NEET Biology syllabus 2026",
  "How to score 680+ in NEET?",
  "SIUAT scholarship criteria",
  "Organic chemistry tips",
  "Revision strategy for 30 days",
];

const AI_RESPONSES: Array<{ keys: string[]; reply: string }> = [
  {
    keys: ["photoelectric", "photo electric"],
    reply: "The Photoelectric Effect (Einstein, 1905): When light of sufficient frequency strikes a metal surface, electrons are emitted. Key points:\n\n📌 Threshold frequency (ν₀): minimum frequency needed to emit electrons.\n📌 KE_max = hν − hν₀ = hν − φ (where φ = work function)\n📌 KE depends ONLY on frequency, NOT intensity.\n📌 Number of electrons emitted depends on intensity.\n📌 Effect is instantaneous — no time delay.\n\nFor NEET: Focus on the equation KE_max = eV₀ (stopping potential) and comparisons between classical wave theory (wrong predictions) vs Einstein's photon theory. This is a highly frequent 4-mark question! 🎯"
  },
  {
    keys: ["biology", "bio", "zoology", "botany", "syllabus"],
    reply: "NEET Biology High-Weightage Syllabus 2026 (NCERT Focus):\n\n🌿 Botany:\n• Genetics & Evolution (Principles of Inheritance, Molecular Basis)\n• Plant Physiology (Photosynthesis, Respiration, Growth)\n• Plant Anatomy & Diversity\n• Ecology & Environment\n\n🐾 Zoology:\n• Human Physiology (Digestion, Circulation, Nervous System)\n• Human Reproduction & Reproductive Health\n• Animal Kingdom & Structural Organisation\n• Biotechnology (Principles & Processes, Applications)\n\n🎯 High-weightage topics: Genetics (molecular basis), Biotechnology, and Human Physiology are top priorities. Master NCERT diagrams completely!"
  },
  {
    keys: ["score", "680", "crack", "strategy", "tips", "study", "preparation", "how to"],
    reply: "Scoring 680+ in NEET — AdmissionX Proven Strategy:\n\n✅ Month 1 (NCERT Line-by-line): Read and highlight every line of NCERT Biology, Chemistry, and Physics exemplars.\n\n✅ Month 2 (High-Frequency Practice): Solve at least 150 MCQs daily, focusing on active NEET mock tests on AdmissionX.\n\n✅ Month 3 (Mistake Book & Time Speed): Maintain a mistakes log. Solve full-length 3-hour mocks to build muscle memory.\n\n📊 NEET Target Score Distribution:\n• Biology: 340+ (out of 360)\n• Chemistry: 160+ (out of 180)\n• Physics: 160+ (out of 180)\n• Overall Target: 660–680+ for top Government Medical Colleges!"
  },
  {
    keys: ["scholarship", "siuat", "talent hunt", "100%", "51000", "₹51"],
    reply: "SIUAT / SIU Talent Hunt Scholarship 2026-27:\n\n🏆 Scholarship Slabs:\n• Score 90% or above → 100% Full Tuition Fee Waiver\n• Score 75–89% → 50% Scholarship\n• Score 60–74% → 25% Scholarship\n• All qualifiers → Merit Certificate\n\n📋 Eligibility:\n• Class 12 passed/appearing (for UG)\n• Bachelor's passed/appearing (for PG)\n• No minimum % cutoff to appear\n\n📝 How to Apply:\n1. Register in the SIUAT/Talent Hunt tab on this portal\n2. Wait for admin approval (24-48 hours)\n3. Appear in online/offline exam on your chosen date\n4. Check result in the Results tab\n5. Submit scholarship form to SIU admissions office\n\n💡 500 seats only. Register ASAP!"
  },
  {
    keys: ["organic", "chemistry", "reaction"],
    reply: "Organic Chemistry NEET Quick Mastery:\n\n🧪 Must-Know Reactions:\n1. Aldol Condensation: Aldehydes/Ketones with base → β-hydroxy carbonyl\n2. Cannizzaro Reaction: Non-enolizable aldehydes + NaOH → alcohol + carboxylate\n3. Friedel-Crafts: Aromatic ring + alkyl/acyl halide (Lewis acid cat.)\n4. Grignard Reaction: RMgX + carbonyl → alcohol (after hydrolysis)\n5. Diazotization: Primary amine + NaNO₂/HCl → diazonium salt\n\n🎯 NEET Focus Areas:\n• Named reactions (always asked, 2-3 questions)\n• Functional group identification & interconversion\n• IUPAC nomenclature (medium difficulty)\n• Stereochemistry basics (optical isomers)\n\n⚡ Tip: Make a reaction chart with substrates → reagents → products. Visual memory helps more than rote learning!"
  },
  {
    keys: ["30 days", "one month", "revision", "last minute"],
    reply: "30-Day NEET Sprint Plan by AdmissionX AI Mentor:\n\n📅 Week 1 (Days 1–7): Rapid NCERT Revision\n• 2 chapters/day per subject\n• Mark all diagrams, definitions, key formulas\n• No new topics — only NCERT revision\n\n📅 Week 2 (Days 8–14): Mock Test Marathon\n• 1 subject mock test daily on AdmissionX\n• Review every wrong answer before bed\n• Target: finish at least 6 full mocks\n\n📅 Week 3 (Days 15–21): Weak Area Blitz\n• Use your mock test results to find weak chapters\n• Spend 3 hrs/day on lowest-scoring sections\n• Redo those chapter tests\n\n📅 Week 4 (Days 22–28): Full Mocks + Mental Prep\n• 1 full 3-hour NEET simulation daily\n• Practice time management — don't spend >2 min/question\n• Sleep 7-8 hours. No all-nighters!\n\n🏁 Days 29–30: Light revision only. Confidence-building. You've got this! 💪"
  },
];

const DEFAULT_REPLY = "Great question! For NEET 2026 preparation, I recommend focusing on NCERT line-by-line first — it covers 95% of Biology and 85% of Chemistry. Then solve PYQs (Previous Year Questions) from 2016–2025 for high-speed pattern recognition.\n\nYour target score should be:\n• 650+ for top MBBS seats\n• 90%+ in SIUAT for 100% scholarship eligibility\n\nWould you like me to create a personalised subject-wise study plan based on your weak areas? Just tell me your strongest and weakest subjects! 😊";

function getAIReply(text: string): string {
  const lower = text.toLowerCase();
  for (const { keys, reply } of AI_RESPONSES) {
    if (keys.some(k => lower.includes(k))) return reply;
  }
  return DEFAULT_REPLY;
}

export function AIMentorPanel() {
  const [messages, setMessages] = useLocalStorage<Message[]>("ai_mentor_messages", []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const initMessages: Message[] = messages.length === 0 ? [{
    role: "ai",
    text: "👋 Namaste! I'm your AdmissionX AI Mentor, powered by Saroj International University.\n\nI can help you with:\n• NEET preparation strategies and study plans\n• Subject-wise doubts (Physics, Chemistry, Biology, English)\n• SIUAT scholarship information\n• Revision tips and mock test analysis\n\nWhat would you like to learn today?",
    ts: Date.now()
  }] : messages;

  useEffect(() => {
    if (messages.length === 0) setMessages(initMessages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (txt: string) => {
    if (!txt.trim() || loading) return;
    const userMsg: Message = { role: "user", text: txt, ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const replyText = getAIReply(txt);
      const aiMsg: Message = { role: "ai", text: replyText, ts: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="flex flex-col h-[520px] max-w-2xl mx-auto border border-gray-200 rounded-2xl shadow-sm overflow-hidden bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-100 flex items-center gap-3 bg-gradient-to-r from-[#6c3fc7] to-[#4c1d95] text-white">
        <span className="text-2xl">🤖</span>
        <div>
          <h3 className="font-serif font-black text-sm text-white">SIU AI Mentor</h3>
          <p className="text-[10px] text-white/70">Powered by Saroj International University</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${m.role === "user" ? "bg-[#6c3fc7] text-white rounded-tr-none" : "bg-white border border-gray-100 text-gray-800 rounded-tl-none shadow-sm"}`} style={{ whiteSpace: "pre-wrap" }}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 text-xs text-gray-400 italic">
              AI Mentor is typing...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className="p-2.5 bg-gray-50 border-t border-gray-100 flex gap-1.5 overflow-x-auto whitespace-nowrap scrollbar-none no-print">
        {SUGGESTIONS.map(s => (
          <button key={s} onClick={() => send(s)} className="px-3 py-1.5 bg-white border border-gray-200 rounded-full text-[10px] font-semibold text-gray-600 hover:border-purple-300 transition">
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border border-gray-200 rounded-b-xl p-3 flex gap-2 items-center">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && send(input)}
          placeholder="Ask me anything about NEET, SIUAT, scholarship or study tips..."
          data-testid="chat-input"
          className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-purple-400 transition"
        />
        <button
          onClick={() => send(input)}
          disabled={!input.trim() || loading}
          data-testid="chat-send"
          className="w-10 h-10 rounded-full flex items-center justify-center text-white transition disabled:opacity-40 flex-shrink-0"
          style={{ background: "linear-gradient(135deg,#6c3fc7,#4c1d95)" }}
        >
          ➤
        </button>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {[
          { num: "2,34,891", label: "Questions answered this month" },
          { num: "1.2s", label: "Average response time" },
          { num: "847", label: "Topics covered" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-3 text-center">
            <div className="font-serif font-bold text-base text-[#6c3fc7]">{s.num}</div>
            <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
