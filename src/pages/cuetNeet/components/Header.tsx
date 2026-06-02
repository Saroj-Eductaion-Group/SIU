import { Bell, ChevronDown } from "lucide-react";
import { cn } from "../lib/utils";
import { useState, useEffect, useRef } from "react";

export const TABS = [
  { id: "home",     label: "Home",            icon: "⊞" },
  { id: "mocks",    label: "Mock Tests",       icon: "✏" },
  { id: "rankings", label: "Rankings",         icon: "◈" },
  { id: "ai",       label: "AI Mentor",        icon: "✦" },
  { id: "results",  label: "Results",          icon: "▤" },
  { id: "admin",    label: "Admin",            icon: "⚙" },
] as const;

export type TabId = typeof TABS[number]["id"];

interface HeaderProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
  onScholarship: () => void;
}

export function Header({ activeTab, setActiveTab, onScholarship }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showNotif) return;
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotif(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [showNotif]);

  const NOTIFICATIONS = [
    { icon: "🏆", text: "SIUAT 2026-27 registrations open — only 500 seats!", time: "Just now" },
    { icon: "✏", text: "New mock test added: Biology Genetics & Biotech", time: "2h ago" },
    { icon: "💰", text: "Win ₹51,000 merit award — appear in SIUAT Talent Hunt", time: "5h ago" },
    { icon: "📢", text: "NEET UG 2026 exam dates: May 3, 2026", time: "1d ago" },
    { icon: "🤖", text: "AI Mentor now supports Hindi & Hinglish queries", time: "2d ago" },
  ];

  // Green theme to distinguish from SIU main navbar (dark blue)

  return (
    <header className="sticky top-0 z-50 w-full" style={{ background: "linear-gradient(135deg, #064e3b 0%, #065f46 60%, #047857 100%)", boxShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>
      {/* Top bar */}
      <div className="flex h-[58px] items-center px-2 md:px-8 justify-between max-w-7xl mx-auto">

        {/* Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.25)" }}>📚</div>
          <div>
            <div className="font-black text-white leading-none text-[14px] sm:text-[18px]" style={{ letterSpacing: "-0.3px" }}>
              NEET
            </div>
            <div className="text-[8px] sm:text-[9px] font-semibold tracking-[0.1em] uppercase mt-0.5" style={{ color: "rgba(255,255,255,0.55)" }}>
              <span className="sm:hidden">Talent Hunt · SIU</span>
              <span className="hidden sm:inline">Talent Hunt · Saroj International University</span>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          {/* Live rankings pill - desktop only */}
          <button onClick={() => setActiveTab('rankings')} className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold transition hover:brightness-110"
            style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.3)" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse inline-block" />
            LIVE RANKINGS
          </button>

          {/* Scholarship - desktop only */}
          <button onClick={onScholarship} data-testid="header-scholarship-pill"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold transition hover:brightness-110"
            style={{ background: "linear-gradient(90deg,#c9a84c,#e8b840)", color: "#064e3b" }}>
            🏆 <span>Scholarship</span>
          </button>

          {/* Bell - always visible */}
          <div className="relative" ref={notifRef}>
            <button onClick={() => setShowNotif(n => !n)} className="relative p-2 rounded-xl transition hover:bg-white/10"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
              <Bell className="h-4 w-4 text-white/70" />
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-red-400" />
            </button>
            {showNotif && (
              <div className="fixed top-[62px] left-0 right-0 mx-3 sm:absolute sm:top-[45px] sm:mx-0 sm:left-auto sm:right-0 sm:w-[320px] rounded-xl shadow-2xl overflow-hidden overflow-y-auto max-h-[70vh]"
                style={{ zIndex: 9999, background: "#064e3b", border: "1px solid rgba(255,255,255,0.15)" }}>
                <div className="px-4 py-3 flex items-center justify-between border-b sticky top-0" style={{ borderColor: "rgba(255,255,255,0.1)", background: "#064e3b" }}>
                  <span className="text-white text-xs font-bold uppercase tracking-widest">🔔 Notifications</span>
                  <button onClick={() => setShowNotif(false)} className="text-white/40 hover:text-white text-xl leading-none px-1">×</button>
                </div>
                <div className="divide-y" style={{ borderColor: "rgba(255,255,255,0.07)" }}>
                  {NOTIFICATIONS.map((n, i) => (
                    <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-white/5 transition cursor-pointer">
                      <span className="text-lg flex-shrink-0 mt-0.5">{n.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white/80 leading-relaxed">{n.text}</p>
                        <p className="text-[10px] mt-1" style={{ color: "rgba(255,255,255,0.35)" }}>{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-4 py-2.5 text-center border-t sticky bottom-0" style={{ borderColor: "rgba(255,255,255,0.1)", background: "#064e3b" }}>
                  <button onClick={() => setShowNotif(false)} className="text-[11px] font-semibold" style={{ color: "#e8b840" }}>Mark all as read</button>
                </div>
              </div>
            )}
          </div>

          {/* Login */}
          <button onClick={() => setActiveTab('mocks')} className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold text-white/80 transition hover:text-white hover:bg-white/10"
            style={{ border: "1px solid rgba(255,255,255,0.15)" }}>
            Login <ChevronDown className="h-3 w-3" />
          </button>

          {/* Register */}
          <button onClick={() => setActiveTab('siuat')} className="flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-extrabold transition hover:brightness-110 active:scale-95"
            style={{ background: "linear-gradient(90deg,#c9a84c,#e8b840)", color: "#0a1f5c", boxShadow: "0 2px 8px rgba(201,168,76,0.3)" }}>
            Register
          </button>

          {/* Mobile menu toggle */}
          <button onClick={() => setMobileMenuOpen(m => !m)}
            className="md:hidden p-2 rounded-xl text-white/60 hover:text-white transition"
            style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Desktop Nav Tabs */}
      <div className="hidden md:block w-full border-t" style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.2)" }}>
        <div className="flex px-4 md:px-8 max-w-7xl mx-auto overflow-x-auto no-scrollbar">
          <style>{`.no-scrollbar::-webkit-scrollbar{display:none}`}</style>
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              data-testid={`tab-${tab.id}`}
              className={cn(
                "relative whitespace-nowrap px-4 py-2.5 text-[12px] font-semibold transition-all flex-shrink-0 flex items-center gap-1.5",
                activeTab === tab.id
                  ? "text-white"
                  : "text-white/45 hover:text-white/75"
              )}>
              <span className={activeTab === tab.id ? "text-[#e8b840]" : ""}>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full" style={{ background: "linear-gradient(90deg,#c9a84c,#e8b840)" }} />
              )}            </button>
          ))}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t px-4 py-3" style={{ borderColor: "rgba(255,255,255,0.15)", background: "rgba(0,0,0,0.95)" }}>
          <div className="grid grid-cols-2 gap-2">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                className={cn(
                  "flex items-center gap-2 px-3 py-3 rounded-xl text-xs font-semibold transition text-left",
                  activeTab === tab.id
                    ? "text-[#e8b840] bg-white/15 border border-[#e8b840]/30"
                    : "text-white/70 hover:text-white hover:bg-white/10 border border-white/10"
                )}>
                <span className="text-base">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
