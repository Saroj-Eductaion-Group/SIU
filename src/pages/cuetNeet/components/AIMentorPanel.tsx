import { useState, useEffect, useRef } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";

type Message = { role: "user" | "ai"; text: string; ts: number };

const SUGGESTIONS = [
  "Explain photoelectric effect",
  "CUET Maths syllabus 2026",
  "How to score 95+ in CUET?",
  "SIUAT scholarship criteria",
  "Organic chemistry tips",
  "Revision strategy for 30 days",
];

const AI_RESPONSES: Array<{ keys: string[]; reply: string }> = [
  {
    keys: ["photoelectric", "photo electric"],
    reply: "The Photoelectric Effect (Einstein, 1905): When light of sufficient frequency strikes a metal surface, electrons are emitted. Key points:\n\n📌 Threshold frequency (ν₀): minimum frequency needed to emit electrons.\n📌 KE_max = hν − hν₀ = hν − φ (where φ = work function)\n📌 KE depends ONLY on frequency, NOT intensity.\n📌 Number of electrons emitted depends on intensity.\n📌 Effect is instantaneous — no time delay.\n\nFor CUET: Focus on the equation KE_max = eV₀ (stopping potential) and comparisons between classical wave theory (wrong predictions) vs Einstein's photon theory. This is a frequent 4-mark question! 🎯"
  },
  {
    keys: ["maths", "math", "mathematics", "syllabus"],
    reply: "CUET Mathematics Syllabus 2026 (Detailed):\n\n📐 Section A (Mandatory):\n• Relations & Functions\n• Algebra (Matrices, Determinants)\n• Calculus (Differentiation, Integration, Differential Equations)\n• Vectors & 3D Geometry\n• Linear Programming\n• Probability\n\n📐 Section B (Optional, any 3 from 5):\n• Inverse Trigonometric Functions\n• Continuity & Differentiability\n• Application of Integrals\n• Statistics\n• Mathematical Reasoning\n\n🎯 High-weightage topics: Definite Integration, Vectors, Probability, Matrices. Aim for 100% accuracy in Algebra and Calculus for a 90+ score!"
  },
  {
    keys: ["score", "95", "crack", "strategy", "tips", "study", "preparation", "how to"],
    reply: "Scoring 95+ in CUET — AdmissionX Proven Strategy:\n\n✅ Month 1 (Foundation): Complete NCERT thoroughly for each subject. Solve all in-chapter and chapter-end exercises.\n\n✅ Month 2 (Practice): Take 2 subject mock tests per day on AdmissionX. Focus on weak areas identified from results.\n\n✅ Month 3 (Revision): Daily 3-hour revision. 1 full mock test every alternate day. Analyse errors pattern.\n\n📊 Score Distribution Strategy:\n• General Aptitude: Target 100% (Reasoning + English)\n• Domain Subjects: Target 85%+ (choose 3 strong subjects)\n• Language: Target 90%+\n\n⚡ Quick wins: PYQ analysis shows 60% questions repeat from NCERT exemplar. Don't skip those!"
  },
  {
    keys: ["scholarship", "siuat", "talent hunt", "100%", "51000", "₹51"],
    reply: "SIUAT / SIU Talent Hunt Scholarship 2026-27:\n\n🏆 Scholarship Slabs:\n• Score 90% or above → 100% Full Tuition Fee Waiver\n• Score 75–89% → 50% Scholarship\n• Score 60–74% → 25% Scholarship\n• All qualifiers → Merit Certificate\n\n📋 Eligibility:\n• Class 12 passed/appearing (for UG)\n• Bachelor's passed/appearing (for PG)\n• No minimum % cutoff to appear\n\n📝 How to Apply:\n1. Register in the SIUAT/Talent Hunt tab on this portal\n2. Wait for admin approval (24-48 hours)\n3. Appear in online/offline exam on your chosen date\n4. Check result in the Results tab\n5. Submit scholarship form to SIU admissions office\n\n💡 500 seats only. Register ASAP!"
  },
  {
    keys: ["organic", "chemistry", "reaction"],
    reply: "Organic Chemistry CUET Quick Mastery:\n\n🧪 Must-Know Reactions:\n1. Aldol Condensation: Aldehydes/Ketones with base → β-hydroxy carbonyl\n2. Cannizzaro Reaction: Non-enolizable aldehydes + NaOH → alcohol + carboxylate\n3. Friedel-Crafts: Aromatic ring + alkyl/acyl halide (Lewis acid cat.)\n4. Grignard Reaction: RMgX + carbonyl → alcohol (after hydrolysis)\n5. Diazotization: Primary amine + NaNO₂/HCl → diazonium salt\n\n🎯 CUET Focus Areas:\n• Named reactions (always asked, 2-3 questions)\n• Functional group identification & interconversion\n• IUPAC nomenclature (medium difficulty)\n• Stereochemistry basics (optical isomers)\n\n⚡ Tip: Make a reaction chart with substrates → reagents → products. Visual memory helps more than rote learning!"
  },
  {
    keys: ["30 days", "one month", "revision", "last minute"],
    reply: "30-Day CUET Sprint Plan by AdmissionX AI Mentor:\n\n📅 Week 1 (Days 1–7): Rapid NCERT Revision\n• 2 chapters/day per subject\n• Mark all diagrams, definitions, key formulas\n• No new topics — only NCERT revision\n\n📅 Week 2 (Days 8–14): Mock Test Marathon\n• 1 subject mock test daily on AdmissionX\n• Review every wrong answer before bed\n• Target: finish at least 6 full mocks\n\n📅 Week 3 (Days 15–21): Weak Area Blitz\n• Use your mock test results to find weak chapters\n• Spend 3 hrs/day on lowest-scoring sections\n• Redo those chapter tests\n\n📅 Week 4 (Days 22–28): Full Mocks + Mental Prep\n• 1 full 3-hour CUET simulation daily\n• Practice time management — don't spend >2 min/question\n• Sleep 7-8 hours. No all-nighters!\n\n🏁 Days 29–30: Light revision only. Confidence-building. You've got this! 💪"
  },
];

const DEFAULT_REPLY = "Great question! For CUET 2026 preparation, I recommend focusing on NCERT first — it covers 60–70% of the actual exam. Then solve PYQs (Previous Year Questions) from 2022–2025 for pattern recognition.\n\nYour target score should be:\n• 85%+ for top NLUs and DU colleges\n• 90%+ for SIUAT 100% scholarship eligibility\n\nWould you like me to create a personalised subject-wise study plan based on your weak areas? Just tell me your strongest and weakest subjects! 😊";

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
    text: "👋 Namaste! I'm your AdmissionX AI Mentor, powered by Saroj International University.\n\nI can help you with:\n• CUET preparation strategies and study plans\n• Subject-wise doubts (Physics, Maths, Chemistry, Biology, English)\n• SIUAT scholarship information\n• Revision tips and mock test analysis\n\nWhat would you like to learn today?",
    ts: Date.now()
  }] : messages;

  useEffect(() => {
    if (messages.length === 0) setMessages(initMessages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", text: text.trim(), ts: Date.now() };
    setMessages(prev => [...prev.slice(-49), userMsg]);
    setInput("");
    setLoading(true);
    setTimeout(() => {
      const aiMsg: Message = { role: "ai", text: getAIReply(text), ts: Date.now() };
      setMessages(prev => [...prev.slice(-49), aiMsg]);
      setLoading(false);
    }, 1200);
  };

  const displayMessages = messages.length === 0 ? initMessages : messages;

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="rounded-t-xl p-4 flex items-center justify-between" style={{ background: "linear-gradient(135deg,#4c1d95,#0a1f5c)" }}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background: "rgba(255,255,255,0.15)" }}>🤖</div>
          <div>
            <div className="font-bold text-white text-sm">AdmissionX AI Mentor</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>Powered by Saroj International University</div>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-bold" style={{ color: "#86efac" }}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Online
        </div>
      </div>

      {/* Chat Window */}
      <div className="bg-gray-50 border-x border-gray-200 overflow-y-auto p-4 space-y-4" style={{ height: "420px" }}>
        {displayMessages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`} data-testid={`msg-${i}`}>
            {msg.role === "ai" && (
              <div className="mr-2 w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0 self-end" style={{ background: "linear-gradient(135deg,#4c1d95,#6c3fc7)", color: "#fff" }}>AI</div>
            )}
            <div className="max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap"
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
            <div className="mr-2 w-8 h-8 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{ background: "linear-gradient(135deg,#4c1d95,#6c3fc7)", color: "#fff" }}>AI</div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 flex items-center gap-1.5">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-2 h-2 rounded-full animate-bounce" style={{ background: "#6c3fc7", animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Suggestions */}
      <div className="bg-gray-50 border-x border-gray-200 px-4 py-2 flex gap-2 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
        {SUGGESTIONS.map(s => (
          <button key={s} onClick={() => send(s)} data-testid={`suggestion-${s.slice(0, 10)}`}
            className="whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium border transition flex-shrink-0"
            style={{ background: "#fff", borderColor: "#e5e7eb", color: "#6c3fc7" }}>
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
          placeholder="Ask me anything about CUET, SIUAT, scholarship or study tips..."
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
