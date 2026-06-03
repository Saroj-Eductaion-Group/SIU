import { useState, useEffect, useRef } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const SUGGESTIONS = [
  "Explain photoelectric effect",
  "CUET Maths syllabus 2026",
  "How to score 95+ in CUET?",
  "SIUAT scholarship criteria",
  "Organic chemistry tips",
  "Revision strategy for 30 days",
];

const AI_RESPONSES = [
  {
    keys: ["photoelectric","photo electric"],
    reply: "The Photoelectric Effect (Einstein, 1905): When light of sufficient frequency strikes a metal surface, electrons are emitted.\n\n📌 Threshold frequency (ν₀): minimum frequency needed to emit electrons.\n📌 KE_max = hν − hν₀ = hν − φ (where φ = work function)\n📌 KE depends ONLY on frequency, NOT intensity.\n📌 Number of electrons emitted depends on intensity.\n📌 Effect is instantaneous — no time delay.\n\nFor CUET: Focus on the equation KE_max = eV₀ (stopping potential). This is a frequent 4-mark question! 🎯"
  },
  {
    keys: ["maths","math","mathematics","syllabus"],
    reply: "CUET Mathematics Syllabus 2026:\n\n📐 Section A (Mandatory):\n• Relations & Functions\n• Algebra (Matrices, Determinants)\n• Calculus (Differentiation, Integration, Differential Equations)\n• Vectors & 3D Geometry\n• Linear Programming\n• Probability\n\n🎯 High-weightage topics: Definite Integration, Vectors, Probability, Matrices. Aim for 100% accuracy in Algebra and Calculus for a 90+ score!"
  },
  {
    keys: ["score","95","crack","strategy","tips","study","preparation","how to"],
    reply: "Scoring 95+ in CUET — Proven Strategy:\n\n✅ Month 1 (Foundation): Complete NCERT thoroughly. Solve all in-chapter and chapter-end exercises.\n\n✅ Month 2 (Practice): Take 2 subject mock tests per day. Focus on weak areas identified from results.\n\n✅ Month 3 (Revision): Daily 3-hour revision. 1 full mock test every alternate day. Analyse errors.\n\n📊 Score Distribution Strategy:\n• General Aptitude: Target 100%\n• Domain Subjects: Target 85%+\n• Language: Target 90%+\n\n⚡ Quick wins: PYQ analysis shows 60% questions repeat from NCERT exemplar!"
  },
  {
    keys: ["scholarship","siuat","talent hunt","100%","51000","₹51"],
    reply: "SIUAT / SIU Talent Hunt Scholarship 2026-27:\n\n🏆 Scholarship Slabs:\n• Score 90% or above → 100% Full Tuition Fee Waiver\n• Score 75–89% → 50% Scholarship\n• Score 60–74% → 25% Scholarship\n• All qualifiers → Merit Certificate\n\n📝 How to Apply:\n1. Register in the SIUAT tab on this portal\n2. Wait for admin approval (24-48 hours)\n3. Appear in online/offline exam on your chosen date\n4. Check result in the Results tab\n5. Submit scholarship form to SIU admissions office\n\n💡 500 seats only. Register ASAP!"
  },
  {
    keys: ["organic","chemistry","reaction"],
    reply: "Organic Chemistry CUET Quick Mastery:\n\n🧪 Must-Know Reactions:\n1. Aldol Condensation: Aldehydes/Ketones with base → β-hydroxy carbonyl\n2. Cannizzaro Reaction: Non-enolizable aldehydes + NaOH → alcohol + carboxylate\n3. Friedel-Crafts: Aromatic ring + alkyl/acyl halide (Lewis acid cat.)\n4. Grignard Reaction: RMgX + carbonyl → alcohol (after hydrolysis)\n5. Diazotization: Primary amine + NaNO₂/HCl → diazonium salt\n\n🎯 CUET Focus Areas:\n• Named reactions (always asked, 2-3 questions)\n• Functional group identification & interconversion\n• IUPAC nomenclature\n\n⚡ Tip: Make a reaction chart with substrates → reagents → products!"
  },
  {
    keys: ["30 days","one month","revision","last minute"],
    reply: "30-Day CUET Sprint Plan:\n\n📅 Week 1 (Days 1–7): Rapid NCERT Revision\n• 2 chapters/day per subject\n• Mark all diagrams, definitions, key formulas\n\n📅 Week 2 (Days 8–14): Mock Test Marathon\n• 1 subject mock test daily\n• Review every wrong answer before bed\n\n📅 Week 3 (Days 15–21): Weak Area Blitz\n• Use mock test results to find weak chapters\n• Spend 3 hrs/day on lowest-scoring sections\n\n📅 Week 4 (Days 22–28): Full Mocks + Mental Prep\n• 1 full 3-hour CUET simulation daily\n• Practice time management\n• Sleep 7-8 hours. No all-nighters!\n\n🏁 Days 29–30: Light revision only. You've got this! 💪"
  },
];

const DEFAULT_REPLY = "Great question! For CUET 2026 preparation, I recommend focusing on NCERT first — it covers 60–70% of the actual exam. Then solve PYQs (Previous Year Questions) from 2022–2025 for pattern recognition.\n\nYour target score should be:\n• 85%+ for top NLUs and DU colleges\n• 90%+ for SIUAT 100% scholarship eligibility\n\nWould you like me to create a personalised subject-wise study plan? Just tell me your strongest and weakest subjects! 😊";

function getAIReply(text) {
  const lower = text.toLowerCase();
  for (const { keys, reply } of AI_RESPONSES) {
    if (keys.some(k => lower.includes(k))) return reply;
  }
  return DEFAULT_REPLY;
}

const INIT_MESSAGE = {
  role: "ai",
  text: "👋 Namaste! I'm your AdmissionX AI Mentor, powered by Saroj International University.\n\nI can help you with:\n• CUET preparation strategies and study plans\n• Subject-wise doubts (Physics, Maths, Chemistry, Biology, English)\n• SIUAT scholarship information\n• Revision tips and mock test analysis\n\nWhat would you like to learn today?",
  ts: Date.now()
};

export default function AIMentorPanel() {
  const [messages, setMessages] = useLocalStorage("ai_mentor_messages", [INIT_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = (text) => {
    if (!text.trim() || loading) return;
    const userMsg = { role: "user", text: text.trim(), ts: Date.now() };
    setMessages(prev => [...prev.slice(-49), userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const aiMsg = { role: "ai", text: getAIReply(text), ts: Date.now() };
      setMessages(prev => [...prev.slice(-49), aiMsg]);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-2 sm:px-4">
      {/* Header */}
      <div className="rounded-t-2xl px-5 py-4 flex items-center justify-between"
        style={{ background: "linear-gradient(135deg,#4c1d95,#0a1f5c)" }}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.15)" }}>🤖</div>
          <div>
            <div className="font-bold text-white text-base sm:text-lg">SIU AI Mentor</div>
            <div className="text-xs sm:text-sm" style={{ color: "rgba(255,255,255,0.65)" }}>Powered by Saroj International University</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-bold" style={{ color: "#86efac" }}>
          <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
          Online
        </div>
      </div>

      {/* Chat Window */}
      <div className="bg-gray-50 border-x border-gray-200 overflow-y-auto p-4 sm:p-5 space-y-4"
        style={{ minHeight: "420px", height: "clamp(420px, 55vh, 600px)" }}>
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            {msg.role === "ai" && (
              <div className="mr-2 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 self-end"
                style={{ background: "linear-gradient(135deg,#4c1d95,#6c3fc7)", color: "#fff" }}>AI</div>
            )}
            <div className="max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-3 text-sm sm:text-base leading-relaxed whitespace-pre-wrap"
              style={msg.role === "ai"
                ? { background: "#fff", color: "#1f2937", border: "1px solid #e5e7eb", borderBottomLeftRadius: "4px" }
                : { background: "linear-gradient(135deg,#6c3fc7,#4c1d95)", color: "#fff", borderBottomRightRadius: "4px" }
              }>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="mr-2 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#4c1d95,#6c3fc7)", color: "#fff" }}>AI</div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-2">
              {[0,1,2].map(i => (
                <div key={i} className="w-2.5 h-2.5 rounded-full animate-bounce"
                  style={{ background: "#6c3fc7", animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className="bg-gray-50 border-x border-gray-200 px-4 py-2.5 flex gap-2 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}>
        {SUGGESTIONS.map(s => (
          <button key={s} onClick={() => send(s)}
            className="whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition flex-shrink-0 hover:bg-purple-50"
            style={{ background: "#fff", borderColor: "#d8b4fe", color: "#6c3fc7" }}>
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="bg-white border border-gray-200 rounded-b-2xl px-4 py-3 flex gap-3 items-center">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && send(input)}
          placeholder="Ask me anything about NEET, SIUAT, scholarship or study tips..."
          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-sm sm:text-base focus:outline-none focus:border-purple-400 transition"
        />
        <button onClick={() => send(input)} disabled={!input.trim() || loading}
          className="w-11 h-11 rounded-full flex items-center justify-center text-white transition disabled:opacity-40 flex-shrink-0 text-lg"
          style={{ background: "linear-gradient(135deg,#6c3fc7,#4c1d95)" }}>
          ➤
        </button>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-3 sm:gap-4">
        {[
          { num: "2,34,891", label: "Questions answered this month" },
          { num: "1.2s",     label: "Average response time" },
          { num: "847",      label: "Topics covered" },
        ].map(s => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-xl p-4 text-center">
            <div className="font-bold text-lg sm:text-xl" style={{ color: "#6c3fc7" }}>{s.num}</div>
            <div className="text-xs sm:text-sm text-gray-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
