import { useState } from 'react';

export const TABS = [
  { id: "home",      label: "Home",             icon: "⊞" },
  { id: "mocks",     label: "Mock Tests",        icon: "✏" },
  { id: "siuat",     label: "SIUAT Talent Hunt", icon: "🏆" },
  { id: "rankings",  label: "Rankings",          icon: "◈" },
  { id: "ai",        label: "AI Mentor",         icon: "✦" },
  { id: "results",   label: "Results",           icon: "▤" },
  { id: "admin",     label: "Admin",             icon: "⚙" },
];

export default function TalentHuntHeader({ activeTab, setActiveTab, onScholarship }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full"
      style={{ background: "linear-gradient(180deg, #0b1f5e 0%, #091749 100%)", boxShadow: "0 2px 20px rgba(0,0,0,0.4)" }}>

      {/* Top bar */}
      <div className="flex h-[58px] items-center px-4 md:px-8 justify-between max-w-7xl mx-auto gap-4">

        {/* Logo */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div>
            <div className="leading-none select-none"
              style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: "22px", letterSpacing: "-0.5px" }}>
              <span style={{ color: "#ffffff" }}>SIU</span>
              <span style={{ color: "#dc2626", fontWeight: 800 }}>AT</span>
            </div>
            <div className="text-[9px] font-semibold tracking-[0.12em] uppercase mt-0.5 hidden md:block"
              style={{ color: "rgba(255,255,255,0.35)" }}>
              Saroj International University · Talent Hunt
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-3 ml-1">
            <div className="w-px h-7" style={{ background: "rgba(255,255,255,0.15)" }} />
            <div className="text-[9px] font-semibold leading-tight tracking-widest uppercase"
              style={{ color: "rgba(255,255,255,0.32)" }}>
              Saroj<br />International<br />University
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-2 flex-shrink-0 ml-auto">
          {/* Live pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold"
            style={{ background: "rgba(220,38,38,0.18)", color: "#fca5a5", border: "1px solid rgba(220,38,38,0.3)" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-red-400 animate-pulse inline-block" />
            LIVE RANKINGS
          </div>

          {/* Scholarship */}
          <button onClick={onScholarship}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-extrabold transition hover:brightness-110 active:scale-95"
            style={{ background: "linear-gradient(90deg,#c9a84c,#e8b840)", color: "#0a1f5c" }}>
            🏆 <span className="hidden sm:inline">Scholarship</span>
          </button>

          {/* Register */}
          <button onClick={() => setActiveTab("siuat")}
            className="flex items-center gap-1 px-4 py-1.5 rounded-xl text-xs font-extrabold transition hover:brightness-110 active:scale-95"
            style={{ background: "linear-gradient(90deg,#c9a84c,#e8b840)", color: "#0a1f5c", boxShadow: "0 2px 8px rgba(201,168,76,0.3)" }}>
            Register
          </button>

          {/* Mobile toggle */}
          <button onClick={() => setMobileMenuOpen(m => !m)}
            className="md:hidden p-2 rounded-xl text-white/60 hover:text-white transition"
            style={{ border: "1px solid rgba(255,255,255,0.12)" }}>
            {mobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Desktop Nav Tabs */}
      <div className="hidden md:block w-full border-t"
        style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(0,0,0,0.18)" }}>
        <div className="flex px-4 md:px-8 max-w-7xl mx-auto overflow-x-auto"
          style={{ scrollbarWidth: "none" }}>
          {TABS.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="relative whitespace-nowrap px-4 py-2.5 text-[12px] font-semibold transition-all flex-shrink-0 flex items-center gap-1.5"
              style={{ color: activeTab === tab.id ? "#ffffff" : "rgba(255,255,255,0.45)" }}>
              <span style={{ color: activeTab === tab.id ? "#e8b840" : "inherit" }}>{tab.icon}</span>
              {tab.label}
              {activeTab === tab.id && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                  style={{ background: "linear-gradient(90deg,#c9a84c,#e8b840)" }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t px-4 py-2"
          style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(0,0,0,0.3)" }}>
          <div className="grid grid-cols-2 gap-1">
            {TABS.map(tab => (
              <button key={tab.id}
                onClick={() => { setActiveTab(tab.id); setMobileMenuOpen(false); }}
                className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-semibold transition text-left"
                style={{
                  color: activeTab === tab.id ? "#e8b840" : "rgba(255,255,255,0.6)",
                  background: activeTab === tab.id ? "rgba(255,255,255,0.1)" : "transparent",
                }}>
                <span>{tab.icon}</span>{tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
