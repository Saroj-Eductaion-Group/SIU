import { useState } from "react";
import { TabId } from "../components/Header";

interface HomePanelProps {
  setActiveTab: (tab: TabId) => void;
  onScholarship: () => void;
}

const STATS = [
  { num: "2.4L+",   label: "Students Enrolled",    icon: "👨‍🎓", color: "#e8b840" },
  { num: "18,500+", label: "Mock Tests Taken",      icon: "✏️",   color: "#60a5fa" },
  { num: "₹51K",    label: "Scholarship Awards",    icon: "🏆",   color: "#34d399" },
  { num: "94.2%",   label: "Student Success Rate",  icon: "📈",   color: "#f472b6" },
];

const QUICK_ACTIONS = [
  { icon: "✏️", title: "Start Mock Test", sub: "CUET 2026 pattern", tab: "mocks" as TabId, bg: "linear-gradient(135deg,#1e3a8a,#2563eb)", accent: "#60a5fa" },
  { icon: "🏆", title: "SIUAT Exam", sub: "Win ₹51K scholarship", tab: "siuat" as TabId, bg: "linear-gradient(135deg,#78350f,#d97706)", accent: "#e8b840" },
  { icon: "🤖", title: "Ask AI Mentor", sub: "24/7 doubt solving", tab: "ai" as TabId, bg: "linear-gradient(135deg,#4c1d95,#7c3aed)", accent: "#a78bfa" },
  { icon: "📊", title: "Live Rankings", sub: "2.4L+ students", tab: "rankings" as TabId, bg: "linear-gradient(135deg,#065f46,#059669)", accent: "#34d399" },
];

const FEATURES = [
  { icon: "🎯", title: "CUET Mock Tests", desc: "3000+ chapter-wise questions across 25 subjects following official NTA CUET 2026 pattern with detailed solutions", badge: "Free", badgeColor: "#16a34a", tab: "mocks" as TabId },
  { icon: "🏛️", title: "SIUAT Scholarship", desc: "Win up to ₹51,000 merit award. 100% full scholarship for top scorers at Saroj International University", badge: "Hot", badgeColor: "#dc2626", tab: "siuat" as TabId },
  { icon: "🤖", title: "AI Mentor", desc: "24/7 personalised doubt solving powered by advanced AI for CUET prep — ask any question, get instant answers", badge: "AI", badgeColor: "#7c3aed", tab: "ai" as TabId },
  { icon: "📊", title: "Live Rankings", desc: "See where you stand among 2.4L+ students from across India in real-time national leaderboard", badge: "Live", badgeColor: "#dc2626", tab: "rankings" as TabId },
  { icon: "📁", title: "Result Tracker", desc: "Chapter-wise accuracy heatmap, performance analytics dashboard and previous attempt history", badge: "New", badgeColor: "#0a1f5c", tab: "results" as TabId },
  { icon: "🎓", title: "Admission Guidance", desc: "Direct SIU admission support, course counselling, and merit-based scholarship application assistance", badge: "SIU", badgeColor: "#c9a84c", tab: "siuat" as TabId },
];

const SUBJECTS = [
  { name: "Physics", code: "PHYS", color: "#dbeafe", text: "#1d4ed8" },
  { name: "Chemistry", code: "CHEM", color: "#dcfce7", text: "#15803d" },
  { name: "Biology", code: "BIO", color: "#d1fae5", text: "#065f46" },
  { name: "Mathematics", code: "MATH", color: "#fee2e2", text: "#b91c1c" },
  { name: "English", code: "ENG", color: "#f3e8ff", text: "#7c3aed" },
  { name: "General Test", code: "GT", color: "#fef3c7", text: "#92400e" },
  { name: "Reasoning", code: "LR", color: "#e0e7ff", text: "#3730a3" },
  { name: "Economics", code: "ECO", color: "#fce7f3", text: "#9d174d" },
  { name: "History", code: "HIST", color: "#fff7ed", text: "#c2410c" },
  { name: "Political Sci.", code: "POLSCI", color: "#f0fdf4", text: "#166534" },
];

const EXAM_DATES = [
  { label: "CUET UG 2026", date: "May 14–30, 2026", status: "Upcoming", color: "#dc2626" },
  { label: "SIUAT Talent Hunt", date: "Jun 1–15, 2026", status: "Open", color: "#16a34a" },
  { label: "CUET PG 2026", date: "Jun 15–25, 2026", status: "Soon", color: "#d97706" },
  { label: "DU UG Counselling", date: "Jul 10+, 2026", status: "Later", color: "#6b7280" },
];

const PARTNERS = ["SIU Lucknow", "CBSE", "UP Board", "Narayana IIT", "Resonance", "FIITJEE", "Aakash", "Allen Kota"];

const WHY_US = [
  { icon: "⚡", title: "Official NTA Pattern", desc: "Questions modelled on actual CUET paper structure" },
  { icon: "🧠", title: "AI-Powered Prep", desc: "Smart doubt solver adapts to your weak areas" },
  { icon: "🔐", title: "Secure Exam Engine", desc: "Anti-cheat system · Tab detection · Timed sections" },
  { icon: "🏅", title: "Real Scholarships", desc: "Top scorers win actual SIU merit awards up to ₹51K" },
];

export function HomePanel({ setActiveTab, onScholarship }: HomePanelProps) {
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  return (
    <div className="space-y-5">

      {/* ══════════ HERO ══════════ */}
      <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ background: "linear-gradient(145deg, #0b1f5e 0%, #131f4f 40%, #0a1435 100%)", minHeight: 340 }}>
        {/* Background mesh */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: `radial-gradient(ellipse at 80% 10%, rgba(108,63,199,0.22) 0%, transparent 60%),
            radial-gradient(ellipse at 10% 80%, rgba(201,168,76,0.10) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(255,255,255,0.02) 0%, transparent 70%)`,
        }} />
        {/* Grid lines */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }} />

        {/* Gold announcement strip */}
        <div className="relative z-10 text-center py-2.5 text-[11px] font-extrabold tracking-widest uppercase text-[#0a1f5c]"
          style={{ background: "linear-gradient(90deg, #b8860b 0%, #e8b840 35%, #ffd700 60%, #e8b840 80%, #b8860b 100%)" }}>
          🏆 &nbsp;SIUAT 2026-27 Registrations Open — Limited 500 Seats — Register Now!&nbsp; 🏆
        </div>

        <div className="relative z-10 px-6 md:px-10 pt-8 pb-6">
          <div className="flex flex-col lg:flex-row gap-8 items-start">

            {/* Left: Text */}
            <div className="flex-1 min-w-0">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold mb-4"
                style={{ background: "rgba(201,168,76,0.14)", border: "1px solid rgba(201,168,76,0.35)", color: "#f0d060" }}>
                🇮🇳 &nbsp;India's #1 AI-Powered CUET Exam Portal
              </div>

              {/* Headline */}
              <h1 className="font-black leading-tight mb-3" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 4vw, 44px)", color: "#ffffff" }}>
                Practice Smart.<br />
                <span style={{ color: "#e8b840" }}>Crack CUET 2026.</span>
              </h1>

              <p className="text-sm leading-relaxed mb-6 max-w-lg" style={{ color: "rgba(255,255,255,0.6)" }}>
                India's most trusted CUET preparation platform. Free NTA-pattern mock tests, live national rankings, AI mentor, and real ₹51,000 scholarship opportunities — all in one place.
              </p>

              {/* CTAs */}
              <div className="flex gap-3 flex-wrap mb-6">
                <button onClick={() => setActiveTab("mocks")} data-testid="hero-start-mock"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#0a1f5c] transition hover:brightness-105 active:scale-95 shadow-lg"
                  style={{ background: "linear-gradient(90deg,#c9a84c,#e8b840)", boxShadow: "0 4px 16px rgba(201,168,76,0.4)" }}>
                  ✏ Start Free Mock Test →
                </button>
                <button onClick={() => setActiveTab("siuat")} data-testid="hero-register-siuat"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition hover:bg-white/10 active:scale-95"
                  style={{ color: "rgba(255,255,255,0.9)", border: "1.5px solid rgba(255,255,255,0.25)" }}>
                  Register for SIUAT 🎓
                </button>
              </div>

              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {["CUET 2026", "Free Mock Tests", "AI Mentor", "₹51K Merit Award", "Live Rankings", "NTA Pattern"].map(t => (
                  <span key={t} className="px-2.5 py-1 rounded-lg text-[11px] border font-medium"
                    style={{ background: "rgba(255,255,255,0.07)", borderColor: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.7)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: Exam Dates Widget */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <div className="rounded-xl overflow-hidden" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="px-4 py-3 text-[11px] font-bold uppercase tracking-widest" style={{ background: "rgba(0,0,0,0.2)", color: "rgba(255,255,255,0.5)" }}>
                  📅 Exam Calendar 2026
                </div>
                <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  {EXAM_DATES.map(e => (
                    <div key={e.label} className="flex items-center justify-between px-4 py-2.5">
                      <div>
                        <div className="text-xs font-semibold text-white/80">{e.label}</div>
                        <div className="text-[10px] text-white/40 mt-0.5">{e.date}</div>
                      </div>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded-full" style={{ background: e.color + "22", color: e.color, border: `1px solid ${e.color}44` }}>{e.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
            {STATS.map(s => (
              <div key={s.num} className="rounded-xl px-4 py-3 flex items-center gap-3"
                style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <div className="font-black text-lg leading-none" style={{ color: s.color, fontFamily: "'Playfair Display', serif" }}>{s.num}</div>
                  <div className="text-[10px] mt-0.5 uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.42)" }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ QUICK ACTIONS ══════════ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {QUICK_ACTIONS.map(a => (
          <button key={a.title} onClick={() => setActiveTab(a.tab)}
            className="flex flex-col items-center justify-center gap-2 rounded-xl py-5 px-3 text-center transition hover:-translate-y-1 hover:shadow-xl active:scale-95 group"
            style={{ background: a.bg, boxShadow: `0 2px 12px ${a.accent}22` }}>
            <span className="text-3xl group-hover:scale-110 transition-transform">{a.icon}</span>
            <div>
              <div className="text-white font-bold text-sm">{a.title}</div>
              <div className="text-[10px] mt-0.5" style={{ color: a.accent }}>{a.sub}</div>
            </div>
          </button>
        ))}
      </div>

      {/* ══════════ FEATURES GRID ══════════ */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-black text-lg text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>Everything You Need to Crack CUET</h2>
          <span className="text-xs text-gray-400 hidden sm:block">All features are free for registered candidates</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map(f => (
            <button key={f.title} onClick={() => setActiveTab(f.tab)} data-testid={`feature-${f.tab}`}
              onMouseEnter={() => setHoveredFeature(f.title)}
              onMouseLeave={() => setHoveredFeature(null)}
              className="bg-white border border-gray-100 rounded-xl p-5 text-left transition-all hover:-translate-y-1 group relative overflow-hidden shadow-sm hover:shadow-lg">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl"
                style={{ background: "linear-gradient(135deg, rgba(108,63,199,0.03) 0%, transparent 60%)" }} />
              <div className="absolute bottom-0 left-0 right-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left rounded-b-xl"
                style={{ background: "linear-gradient(90deg,#6c3fc7,#0a1f5c)" }} />
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-3 transition-transform group-hover:scale-110"
                style={{ background: hoveredFeature === f.title ? "#f0e8ff" : "#f8f6ff" }}>
                {f.icon}
              </div>
              <div className="font-bold text-sm text-gray-900 mb-1.5">{f.title}</div>
              <div className="text-xs text-gray-500 leading-relaxed mb-3">{f.desc}</div>
              <span className="inline-block px-2.5 py-1 rounded-lg text-xs font-bold text-white" style={{ background: f.badgeColor }}>{f.badge}</span>
            </button>
          ))}
        </div>
      </div>

      {/* ══════════ WHY ADMISSIONX ══════════ */}
      <div className="rounded-2xl px-6 md:px-8 py-7" style={{ background: "linear-gradient(135deg, #0b1f5e 0%, #1a1060 100%)", boxShadow: "0 4px 24px rgba(10,31,92,0.25)" }}>
        <div className="text-center mb-5">
          <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: "#e8b840" }}>Why Choose Us</span>
          <h2 className="font-black text-white text-xl mt-1" style={{ fontFamily: "'Playfair Display', serif" }}>Built for Serious CUET Aspirants</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {WHY_US.map(w => (
            <div key={w.title} className="rounded-xl p-4 text-center" style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div className="text-3xl mb-2">{w.icon}</div>
              <div className="font-bold text-white text-sm mb-1">{w.title}</div>
              <div className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{w.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ SUBJECTS COVERED ══════════ */}
      <div className="bg-white border border-gray-100 rounded-2xl px-6 py-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-gray-900 text-base" style={{ fontFamily: "'Playfair Display', serif" }}>Subjects Covered</h2>
          <button onClick={() => setActiveTab("mocks")} className="text-xs font-semibold text-purple-600 hover:text-purple-800 transition">View all tests →</button>
        </div>
        <div className="flex flex-wrap gap-2">
          {SUBJECTS.map(s => (
            <button key={s.name} onClick={() => setActiveTab("mocks")}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition hover:shadow-md hover:-translate-y-0.5"
              style={{ background: s.color, color: s.text }}>
              <span className="w-5 h-5 rounded-md flex items-center justify-center text-[9px] font-black"
                style={{ background: s.text, color: "#fff" }}>{s.code.slice(0, 2)}</span>
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════ TWO-COLUMN: WhatsApp + Partner ══════════ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* WhatsApp */}
        <div className="rounded-2xl p-5 flex items-center gap-4 text-white overflow-hidden relative"
          style={{ background: "linear-gradient(135deg,#128c7e,#25d366)", boxShadow: "0 4px 16px rgba(18,140,126,0.3)" }}>
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-10 bg-white" />
          <span className="text-4xl flex-shrink-0">💬</span>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm">Join 2.4L+ students</div>
            <div className="text-xs opacity-80 mt-0.5">Daily MCQs, live rank updates & scholarship alerts on WhatsApp</div>
          </div>
          <button className="bg-white text-green-700 font-bold px-3 py-1.5 rounded-lg text-xs flex-shrink-0 hover:bg-green-50 transition">Join Now</button>
        </div>

        {/* Partners */}
        <div className="bg-white border border-gray-100 rounded-2xl px-5 py-4 shadow-sm">
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Trusted Partners</p>
          <div className="flex flex-wrap gap-1.5">
            {PARTNERS.map(p => (
              <span key={p} className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-[#0a1f5c]">{p}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ SCHOLARSHIP CTA ══════════ */}
      <div className="rounded-2xl overflow-hidden shadow-xl" style={{ background: "linear-gradient(135deg,#7c2d12 0%,#b45309 50%,#d97706 100%)" }}>
        <div className="px-6 md:px-10 py-7 flex flex-col md:flex-row items-center gap-5">
          <div className="flex-shrink-0 text-center">
            <div className="text-5xl mb-1">🏆</div>
            <div className="text-[10px] font-bold text-amber-200 uppercase tracking-widest">Merit Award</div>
          </div>
          <div className="text-white flex-1 text-center md:text-left">
            <div className="font-black text-2xl mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Win ₹51,000 Scholarship!</div>
            <div className="text-sm opacity-80 max-w-lg">Register for SIUAT Talent Hunt Exam 2026-27. Score 90%+ to unlock a 100% full scholarship at Saroj International University, Lucknow.</div>
          </div>
          <div className="flex flex-col gap-2 items-center flex-shrink-0">
            <button onClick={onScholarship} data-testid="home-scholarship-cta"
              className="font-extrabold text-sm px-6 py-3 rounded-xl text-[#7c2d12] transition hover:brightness-105 active:scale-95"
              style={{ background: "linear-gradient(90deg,#fef08a,#fde047)", boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}>
              Know More →
            </button>
            <div className="text-[10px] text-amber-200 opacity-70">500 seats · Limited time</div>
          </div>
        </div>
      </div>

    </div>
  );
}
