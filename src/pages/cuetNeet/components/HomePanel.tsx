import { useState, useEffect } from "react";
import { TabId } from "../components/Header";

interface HomePanelProps {
  setActiveTab: (tab: TabId) => void;
  onScholarship: () => void;
}

// NCERT Flashcards Data
const FLASHCARDS = [
  { id: 1, subject: "Biology", question: "Which organelle is known as the 'powerhouse' of eukaryotic cells and has its own DNA?", answer: "Mitochondria (contains 70S ribosomes and circular dsDNA)" },
  { id: 2, subject: "Biology", question: "Name the plant hormone responsible for apical dominance and phototropism.", answer: "Auxin (specifically Indole-3-acetic acid / IAA)" },
  { id: 3, subject: "Chemistry", question: "What is the hybridisation of carbon in a carbocation?", answer: "sp² hybridised (planar geometry with an empty p-orbital)" },
  { id: 4, subject: "Chemistry", question: "Which law states that at constant temperature, solubility of a gas is directly proportional to its partial pressure?", answer: "Henry's Law (p = KH * x)" },
  { id: 5, subject: "Physics", question: "What happens to the focal length of a convex lens when it is immersed in water?", answer: "Focal length increases (due to decrease in relative refractive index)" },
  { id: 6, subject: "Physics", question: "State the relationship between drift velocity and electric field intensity.", answer: "vd = μE (where μ is the mobility of charge carriers)" }
];

// Interactive PYQ Data
const PYQS = [
  {
    id: "pyq1",
    year: "NEET 2025",
    subject: "Biology",
    question: "Which of the following hormones is not secreted by human placenta?",
    options: ["hCG", "hPL", "Progesterone", "LH"],
    correctOption: 3,
    explanation: "LH (Luteinizing Hormone) is secreted by the anterior pituitary gland, not by the placenta."
  },
  {
    id: "pyq2",
    year: "NEET 2024",
    subject: "Chemistry",
    question: "The correct order of acid strength among the following is:",
    options: ["HClO < HClO2 < HClO3 < HClO4", "HClO4 < HClO3 < HClO2 < HClO", "HClO3 < HClO4 < HClO2 < HClO", "HClO2 < HClO < HClO3 < HClO4"],
    correctOption: 0,
    explanation: "Acid strength increases with increase in the oxidation state of central chlorine atom (+1 < +3 < +5 < +7)."
  },
  {
    id: "pyq3",
    year: "NEET 2023",
    subject: "Physics",
    question: "If the temperature of source and sink of a Carnot engine are 327°C and 27°C, its efficiency is:",
    options: ["30%", "40%", "50%", "60%"],
    correctOption: 2,
    explanation: "η = 1 - (T2/T1) = 1 - (300/600) = 0.5 or 50%."
  }
];

// Weak Topic Roadmap Data
const ROADMAPS: Record<string, { chapters: string[]; strategy: string; focus: string }> = {
  Biology: {
    chapters: ["Genetics & Evolution (15 questions)", "Human Physiology (12 questions)", "Ecology & Environment (10 questions)", "Plant Physiology (8 questions)"],
    strategy: "Focus 100% on NCERT line-by-line reading. Re-draw all cycle diagrams in Photosynthesis and Respiration manually.",
    focus: "Solve active Biology mocks twice a week and revise incorrect options meticulously."
  },
  Chemistry: {
    chapters: ["Organic Reaction Mechanisms (Named Reactions)", "Chemical & Ionic Equilibrium", "Coordination Compounds", "Electrochemistry & Chemical Kinetics"],
    strategy: "Maintain a dedicated booklet for named reactions and conversions. Practice numericals for physical chemistry daily.",
    focus: "Memorise exceptional periodic trends in Inorganic Chemistry directly from NCERT."
  },
  Physics: {
    chapters: ["Modern Physics & Semiconductors (High yield)", "Mechanics (Laws of Motion & Rotational Dynamics)", "Electrostatics & Current Electricity", "Optics (Ray & Wave)"],
    strategy: "Derive basic formulas from scratch to build spatial confidence. Create a formula cheat sheet for quick reference.",
    focus: "Avoid starting extremely complex calculations; NEET targets conceptual clarity and speed."
  }
};

const EXAM_DATES = [
  { label: "NEET UG 2026", date: "May 3, 2026 (Sunday)", status: "Target Exam", color: "#10b981" },
  { label: "SIUAT Talent Hunt", date: "June 1–15, 2026", status: "Registration Open", color: "#e8b840" },
  { label: "Admissions Window", date: "July 2026 Onwards", status: "Upcoming", color: "#2563eb" }
];

export function HomePanel({ setActiveTab, onScholarship }: HomePanelProps) {
  // Stats Counting Animation
  const [studentsCount, setStudentsCount] = useState(200000);
  const [successRate, setSuccessRate] = useState(90.0);

  // Flashcards state
  const [activeCard, setActiveCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [flashcardFilter, setFlashcardFilter] = useState("All");

  // PYQ Interactive state
  const [selectedPyq, setSelectedPyq] = useState(0);
  const [chosenOption, setChosenOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  // Weak Topic state
  const [selectedSubject, setSelectedSubject] = useState<"Biology" | "Chemistry" | "Physics">("Biology");

  // Animate stats on load
  useEffect(() => {
    const studentInterval = setInterval(() => {
      setStudentsCount(c => (c >= 241500 ? 241500 : c + 850));
    }, 15);

    const successInterval = setInterval(() => {
      setSuccessRate(r => (r >= 98.2 ? 98.2 : parseFloat((r + 0.1).toFixed(1))));
    }, 20);

    return () => {
      clearInterval(studentInterval);
      clearInterval(successInterval);
    };
  }, []);

  const filteredCards = FLASHCARDS.filter(c => flashcardFilter === "All" || c.subject === flashcardFilter);

  const nextCard = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setActiveCard(c => (c + 1) % filteredCards.length);
    }, 200);
  };

  const handleOptionSelect = (idx: number) => {
    if (chosenOption === null) {
      setChosenOption(idx);
      setShowExplanation(true);
    }
  };

  const handlePyqChange = (idx: number) => {
    setSelectedPyq(idx);
    setChosenOption(null);
    setShowExplanation(false);
  };

  return (
    <div className="space-y-6">

      {/* ══════════ HERO SECTION ══════════ */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl transition-all duration-300" style={{ background: "linear-gradient(145deg, #022c22 0%, #064e3b 40%, #022c22 100%)", minHeight: 360 }}>
        {/* Glowing Background Orbs */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.25) 0%, transparent 60%),
            radial-gradient(ellipse at 15% 75%, rgba(232,184,64,0.12) 0%, transparent 55%),
            radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 70%)`,
        }} />
        {/* Clean grid mesh */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        {/* Live Ribbon */}
        <div className="relative z-10 text-center py-2 text-xs font-black tracking-widest uppercase text-[#064e3b]"
          style={{ background: "linear-gradient(90deg, #f59e0b 0%, #fbbf24 35%, #fef08a 60%, #fbbf24 80%, #f59e0b 100%)" }}>
          ⚡ &nbsp;SIUAT 2026 Registrations Open — Direct Seat Allocation on Merit!&nbsp; ⚡
        </div>

        <div className="relative z-10 px-6 md:px-10 pt-8 pb-7">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            
            {/* Left: Branding & Core Headline */}
            <div className="flex-1 min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full px-4.5 py-1.5 text-[11px] font-extrabold mb-4"
                style={{ background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.35)", color: "#34d399" }}>
                🏥 &nbsp;CRACK NEET 2026 · ELITE AI PREPARATION PLATFORM
              </div>

              <h1 className="font-serif font-black leading-tight mb-3 text-white" style={{ fontSize: "clamp(28px, 4vw, 42px)" }}>
                Master Your NEET 2026 Goals.<br />
                <span className="text-amber-400">Score 680+ with AI Precision.</span>
              </h1>

              <p className="text-sm leading-relaxed mb-6 max-w-xl text-emerald-100/70">
                Unlock specialized NEET-pattern mock tests, full NCERT micro-flashcards, real-time national leaderboard analytics, and direct entrance scholarships up to 100% at Saroj International University.
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3.5 flex-wrap mb-6">
                <button onClick={() => setActiveTab("mocks")} className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#064e3b] transition hover:brightness-105 active:scale-97 shadow-lg"
                  style={{ background: "linear-gradient(90deg,#fbbf24,#ffd700)", boxShadow: "0 4px 18px rgba(251,191,36,0.4)" }}>
                  🧬 Practice Mock Tests →
                </button>
                <button onClick={() => setActiveTab("siuat")} className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition hover:bg-white/10 active:scale-97 text-white"
                  style={{ border: "1.5px solid rgba(255,255,255,0.3)" }}>
                  Register for SIUAT 🎓
                </button>
              </div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {["NEET 2026", "NCERT Zone", "Biology High-Yield", "AI Dashboard", "National Rank", "100% Scholarships"].map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-[10px] font-bold border"
                    style={{ background: "rgba(255,255,255,0.06)", borderColor: "rgba(255,255,255,0.12)", color: "#a7f3d0" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: NEET 2026 Calendar Widget */}
            <div className="w-full lg:w-72 flex-shrink-0">
              <div className="rounded-xl overflow-hidden shadow-md" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="px-4.5 py-3 text-[10px] font-extrabold uppercase tracking-widest text-emerald-200" style={{ background: "rgba(0,0,0,0.3)" }}>
                  📅 NEET UG 2026 Calendar
                </div>
                <div className="divide-y divide-white/5">
                  {EXAM_DATES.map(e => (
                    <div key={e.label} className="flex items-center justify-between px-4 py-3">
                      <div>
                        <div className="text-xs font-bold text-white">{e.label}</div>
                        <div className="text-[10px] text-white/55 mt-0.5">{e.date}</div>
                      </div>
                      <span className="text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border" style={{ background: e.color + "18", color: e.color, borderColor: e.color + "30" }}>{e.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Core Analytics Counters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {[
              { val: `${studentsCount.toLocaleString()}+`, label: "NEET Competitors", icon: "🩺", color: "#fbbf24" },
              { val: "50,000+", label: "Daily PYQ Solved", icon: "✏️", color: "#60a5fa" },
              { val: "99.8%", label: "Platform Uptime", icon: "⚡", color: "#34d399" },
              { val: `${successRate}%`, label: "Scholarship Index", icon: "📈", color: "#f472b6" }
            ].map(s => (
              <div key={s.label} className="rounded-xl px-4 py-3.5 flex items-center gap-3"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <div className="font-serif font-black text-lg leading-none" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-[10px] mt-1 uppercase tracking-wider text-white/40">{s.label}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* ══════════ MAIN TOOLKIT: NCERT ZONE + PYQ CHALLENGER ══════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Column 1: NCERT Revision Zone (Flashcards) */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col min-h-[380px]">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div>
              <h3 className="font-serif font-black text-lg text-emerald-900">NCERT Revision Zone</h3>
              <p className="text-xs text-gray-400">Rapid micro-flashcards direct from NCERT syllabus</p>
            </div>
            
            {/* Subject Filters */}
            <div className="flex gap-1">
              {["All", "Biology", "Chemistry", "Physics"].map(sub => (
                <button key={sub} onClick={() => { setFlashcardFilter(sub); setActiveCard(0); setIsFlipped(false); }}
                  className="px-2.5 py-1 rounded-lg text-[10px] font-bold transition border"
                  style={{
                    background: flashcardFilter === sub ? "#064e3b" : "#fff",
                    color: flashcardFilter === sub ? "#fff" : "#6b7280",
                    borderColor: flashcardFilter === sub ? "#064e3b" : "#e5e7eb"
                  }}>
                  {sub}
                </button>
              ))}
            </div>
          </div>

          {/* Flashcard Area */}
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            {filteredCards.length > 0 ? (
              <div onClick={() => setIsFlipped(!isFlipped)} 
                className="w-full max-w-sm h-48 border border-emerald-100 rounded-2xl p-6 flex flex-col justify-between items-center text-center cursor-pointer relative overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md"
                style={{
                  background: isFlipped ? "#f0fdf4" : "#ffffff",
                  borderColor: isFlipped ? "#a7f3d0" : "#e5e7eb"
                }}>
                
                {/* Subject Badge */}
                <span className="px-2 py-0.5 rounded-full text-[9px] font-bold text-white bg-emerald-700">
                  {filteredCards[activeCard].subject}
                </span>

                <div className="text-sm font-medium text-gray-900 leading-relaxed px-2">
                  {isFlipped ? (
                    <div className="animate-fade-in text-emerald-800 font-bold">
                      💡 {filteredCards[activeCard].answer}
                    </div>
                  ) : (
                    <div>{filteredCards[activeCard].question}</div>
                  )}
                </div>

                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  {isFlipped ? "Click to see question ↺" : "Click to reveal answer 💡"}
                </span>

              </div>
            ) : (
              <p className="text-xs text-gray-400">No cards matching filter</p>
            )}
          </div>

          {/* Flashcard Nav */}
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
            <span className="text-[11px] text-gray-400 font-semibold">Card {activeCard + 1} of {filteredCards.length}</span>
            <button onClick={nextCard} className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition">
              Next Fact →
            </button>
          </div>
        </div>

        {/* Column 2: Previous Year NEET Questions (PYQ Challenger) */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col min-h-[380px]">
          <div className="flex justify-between items-center mb-4 flex-wrap gap-2">
            <div>
              <h3 className="font-serif font-black text-lg text-[#0a1f5c]">NEET PYQ Challenger</h3>
              <p className="text-xs text-gray-400">Instant evaluation of actual questions from previous NEET exams</p>
            </div>
            
            {/* Year Selector */}
            <div className="flex gap-1">
              {PYQS.map((q, idx) => (
                <button key={q.id} onClick={() => handlePyqChange(idx)}
                  className="px-2 py-1 rounded-lg text-[10px] font-bold transition border"
                  style={{
                    background: selectedPyq === idx ? "#0a1f5c" : "#fff",
                    color: selectedPyq === idx ? "#fff" : "#6b7280",
                    borderColor: selectedPyq === idx ? "#0a1f5c" : "#e5e7eb"
                  }}>
                  {q.year}
                </button>
              ))}
            </div>
          </div>

          {/* PYQ Content */}
          <div className="flex-1 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded text-[9px] font-bold text-white bg-amber-500">{PYQS[selectedPyq].subject}</span>
                <span className="text-[10px] text-gray-400 font-bold">{PYQS[selectedPyq].year} Official Paper</span>
              </div>
              <p className="text-sm font-semibold text-gray-900 leading-relaxed">{PYQS[selectedPyq].question}</p>
              
              {/* Interactive options */}
              <div className="space-y-2">
                {PYQS[selectedPyq].options.map((opt, oi) => {
                  const isSelected = chosenOption === oi;
                  const isCorrect = oi === PYQS[selectedPyq].correctOption;
                  let btnBg = "#ffffff";
                  let btnBorder = "#e5e7eb";
                  let btnColor = "#374151";

                  if (chosenOption !== null) {
                    if (isCorrect) {
                      btnBg = "#f0fdf4";
                      btnBorder = "#86efac";
                      btnColor = "#166534";
                    } else if (isSelected) {
                      btnBg = "#fef2f2";
                      btnBorder = "#fca5a5";
                      btnColor = "#991b1b";
                    }
                  }

                  return (
                    <button key={oi} onClick={() => handleOptionSelect(oi)} disabled={chosenOption !== null}
                      className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border text-xs text-left transition"
                      style={{ background: btnBg, borderColor: btnBorder, color: btnColor, fontWeight: isSelected ? "bold" : "normal" }}>
                      <span className="w-5 h-5 rounded-full border flex items-center justify-center font-bold text-[10px] flex-shrink-0" style={{ borderColor: "currentcolor" }}>
                        {String.fromCharCode(65 + oi)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Explanation box */}
            {showExplanation && (
              <div className="bg-[#eff6ff] border border-blue-100 rounded-xl p-3.5 mt-3.5 text-xs text-blue-900 animate-fade-in">
                <strong>Solution Explanation:</strong> {PYQS[selectedPyq].explanation}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* ══════════ THREE-COLUMN: AI ENGINE PREVIEW + ROADMAP + WHY US ══════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left: AI Dashboard Mock Preview */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between lg:col-span-1">
          <div>
            <h3 className="font-serif font-black text-base text-[#0a1f5c] mb-1">AI Diagnostic Center</h3>
            <p className="text-[11px] text-gray-400">Calculates preparation indexes based on live mocks</p>
          </div>
          
          {/* Progress gauge visual using pure Tailwind/CSS shapes */}
          <div className="my-5 flex flex-col items-center justify-center">
            <div className="w-28 h-28 rounded-full border-[8px] border-emerald-500/10 flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 w-28 h-28 rounded-full border-[8px] border-emerald-500 border-r-transparent border-b-transparent animate-spin-slow"></div>
              <span className="font-serif font-black text-2xl text-[#0a1f5c]">86%</span>
              <span className="text-[9px] text-gray-400 uppercase tracking-widest font-bold mt-0.5">READY</span>
            </div>
            
            <div className="w-full mt-4 space-y-2 text-[10px] text-gray-500 font-semibold">
              <div className="flex justify-between">
                <span>Biology Accuracy</span> <span className="text-[#10b981]">92% (Excellent)</span>
              </div>
              <div className="flex justify-between">
                <span>Chemistry Accuracy</span> <span className="text-blue-600">84% (Steady)</span>
              </div>
              <div className="flex justify-between">
                <span>Physics Accuracy</span> <span className="text-red-500">76% (Requires Boost)</span>
              </div>
            </div>
          </div>

          <button onClick={() => setActiveTab("mocks")} className="w-full py-2 bg-[#0a1f5c] text-white font-bold text-xs rounded-xl hover:brightness-105 transition">
            Access Full Performance Dashboard
          </button>
        </div>

        {/* Middle: Weak Topic Roadmaps */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col justify-between lg:col-span-1">
          <div>
            <h3 className="font-serif font-black text-base text-rose-900 mb-1">Weak Topic Booster</h3>
            <p className="text-[11px] text-gray-400">Pick your weakest domain to unlock AI study strategy</p>
          </div>

          {/* Select Subject Controls */}
          <div className="grid grid-cols-3 gap-1.5 my-3">
            {["Biology", "Chemistry", "Physics"].map((sub) => (
              <button key={sub} onClick={() => setSelectedSubject(sub as any)}
                className="py-1.5 rounded-lg text-[10px] font-bold border transition"
                style={{
                  background: selectedSubject === sub ? "#991b1b" : "#fff",
                  color: selectedSubject === sub ? "#fff" : "#6b7280",
                  borderColor: selectedSubject === sub ? "#991b1b" : "#e5e7eb"
                }}>
                {sub}
              </button>
            ))}
          </div>

          {/* Roadmap details */}
          <div className="flex-1 bg-rose-50/30 rounded-xl p-3 border border-rose-50 text-[11px] text-gray-700 space-y-3 mb-4">
            <div>
              <span className="font-bold text-rose-800">Critical High-Yield Chapters:</span>
              <ul className="list-disc list-inside mt-1 text-gray-600 font-medium">
                {ROADMAPS[selectedSubject].chapters.map(c => <li key={c}>{c}</li>)}
              </ul>
            </div>
            <div>
              <span className="font-bold text-rose-800">AI Recommendation:</span>
              <p className="text-gray-600 leading-relaxed mt-0.5">{ROADMAPS[selectedSubject].strategy}</p>
            </div>
            <div>
              <span className="font-bold text-rose-800">Mock Strategy:</span>
              <p className="text-gray-600 leading-relaxed mt-0.5">{ROADMAPS[selectedSubject].focus}</p>
            </div>
          </div>

          <button onClick={() => setActiveTab("ai")} className="w-full py-2 bg-rose-800 text-white font-bold text-xs rounded-xl hover:brightness-105 transition">
            Consult AI Study Mentor 🤖
          </button>
        </div>

        {/* Right: Premium Security Features */}
        <div className="rounded-2xl p-5 text-white flex flex-col justify-between lg:col-span-1"
          style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)", border: "1px solid #334155" }}>
          <div>
            <span className="text-[9px] font-extrabold text-amber-400 uppercase tracking-widest">Exam Platform Integrity</span>
            <h3 className="font-serif font-black text-base text-white mt-0.5">Secure Exam Protection</h3>
            <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">Our advanced CBT platform features a proctored architecture to secure talent evaluations.</p>
          </div>

          <div className="space-y-2.5 my-4 text-[10px] font-medium text-slate-300">
            <div className="flex gap-2 items-center">
              <span className="text-emerald-400">✓</span> <span>Tab/Window visibility detection warnings</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-emerald-400">✓</span> <span>Enforced strict fullscreen containment</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-emerald-400">✓</span> <span>Real-time backend polling session check</span>
            </div>
            <div className="flex gap-2 items-center">
              <span className="text-emerald-400">✓</span> <span>Right-click, copy, paste & DevTools blocked</span>
            </div>
          </div>

          <button onClick={() => setActiveTab("siuat")} className="w-full py-2 bg-slate-800 text-white font-bold text-xs rounded-xl hover:bg-slate-700 transition border border-slate-700">
            Learn Exam Integrity Rules
          </button>
        </div>

      </div>

      {/* ══════════ ADMISSION & SCHOLARSHIP CTA ══════════ */}
      <div className="rounded-2xl overflow-hidden shadow-2xl relative" style={{ background: "linear-gradient(135deg,#064e3b 0%,#047857 50%,#10b981 100%)" }}>
        <div className="px-6 md:px-10 py-8 flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="flex-shrink-0 text-center">
            <div className="text-5xl mb-1">🏛️</div>
            <div className="text-[9px] font-bold text-amber-200 uppercase tracking-widest">Saroj University</div>
          </div>
          
          <div className="text-white flex-1 text-center md:text-left">
            <h3 className="font-serif font-black text-2xl mb-1 text-white">Unlock Direct Merit Scholarships!</h3>
            <p className="text-xs text-emerald-50 mt-1 leading-relaxed max-w-xl">
              Apply today for the SIUAT Talent Hunt. Qualified candidates with 90%+ scores win a **100% full academic tuition scholarship** to study at our main Lucknow Campus.
            </p>
          </div>

          <div className="flex flex-col gap-2 items-center flex-shrink-0">
            <button onClick={onScholarship} className="font-extrabold text-xs px-6 py-3 rounded-xl text-[#065f46] transition hover:brightness-105 active:scale-97"
              style={{ background: "linear-gradient(90deg,#ffd700,#fbbf24)", boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
              Explore Scholarships →
            </button>
            <span className="text-[10px] text-emerald-200 font-medium">Approved by UGC · 500 Seats Available</span>
          </div>
        </div>
      </div>

    </div>
  );
}
