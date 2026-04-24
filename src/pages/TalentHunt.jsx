import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Layout from '../components/Layout';
import RegistrationPanel from './talentHunt/RegistrationPanel';
import AdminPanel from './talentHunt/AdminPanel';
import ExamPanel from './talentHunt/ExamPanel';
import ResultsPanel from './talentHunt/ResultsPanel';

const TABS = [
  { id: 'registration', label: 'Registration', icon: '📋' },
  { id: 'admin',        label: 'Admin Panel',  icon: '🔐' },
  { id: 'exam',         label: 'Exam Portal',  icon: '📝' },
  { id: 'results',      label: 'Results',      icon: '🏆' },
];

function CountdownTimer() {
  const target = new Date('2026-05-03T09:00:00');
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target - new Date();
      if (diff <= 0) return;
      setTime({
        days:  Math.floor(diff / (1000*60*60*24)),
        hours: Math.floor((diff % (1000*60*60*24)) / (1000*60*60)),
        mins:  Math.floor((diff % (1000*60*60)) / (1000*60)),
        secs:  Math.floor((diff % (1000*60)) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex gap-2 justify-center">
      {[['Days', time.days], ['Hours', time.hours], ['Mins', time.mins], ['Secs', time.secs]].map(([label, val]) => (
        <div key={label} className="text-center">
          <div className="bg-orange-500 rounded-xl px-3 py-2 min-w-[54px]">
            <div className="text-xl font-bold text-white font-outfit">{String(val).padStart(2,'0')}</div>
            <div className="text-orange-100 text-xs mt-0.5 font-semibold">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ScholarshipPopup({ onClose, onRegister }) {
  const [timeLeft, setTimeLeft] = useState(3 * 24 * 60 * 60);
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(p => p > 0 ? p - 1 : 0), 1000);
    return () => clearInterval(id);
  }, []);
  const d = Math.floor(timeLeft/86400), h = Math.floor((timeLeft%86400)/3600),
        m = Math.floor((timeLeft%3600)/60), s = timeLeft%60;
  return createPortal(
    <div style={{position:'fixed',inset:0,background:'rgba(5,15,50,0.72)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:'16px'}}>
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg z-10 transition">
          ×
        </button>
        {/* Ribbon */}
        <div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 py-2.5 text-center text-blue-900 text-xs font-black tracking-widest uppercase">
          🏆 SIU Special Merit Scholarship Drive 2026-27 🏆
        </div>
        <div className="p-6">
          <div className="text-center mb-4">
            <div className="text-3xl mb-2">⭐⭐⭐</div>
            <h2 className="text-2xl font-black text-blue-900 mb-1">Win 100% Full Scholarship!</h2>
            <p className="text-gray-500 text-sm leading-relaxed">Score <strong>90% or above</strong> in the SIUAT and get a complete fee waiver for your entire programme. Limited 500 seats!</p>
            <p className="text-red-600 text-xs font-bold mt-2">
              Offer closes in: {d}d {String(h).padStart(2,'0')}h {String(m).padStart(2,'0')}m {String(s).padStart(2,'0')}s
            </p>
          </div>
          {/* Slabs */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              ['🏆','100% Scholarship','Score 90% & above','bg-yellow-50 border-yellow-300 text-yellow-800'],
              ['🥈','50% Scholarship','Score 75% – 89%','bg-blue-50 border-blue-300 text-blue-800'],
              ['🥉','25% Scholarship','Score 60% – 74%','bg-orange-50 border-orange-300 text-orange-800'],
              ['📚','Merit Certificate','All qualifiers','bg-green-50 border-green-300 text-green-800'],
            ].map(([icon,title,sub,cls])=>(
              <div key={title} className={`flex items-center gap-2 p-2.5 rounded-xl border ${cls}`}>
                <span className="text-xl shrink-0">{icon}</span>
                <div><div className="text-sm font-bold">{title}</div><div className="text-xs opacity-75">{sub}</div></div>
              </div>
            ))}
          </div>
          {/* Exam dates */}
          <div className="bg-gray-50 rounded-xl p-3 mb-4">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2 text-center">4 Exam Opportunities</p>
            <div className="flex justify-around text-center">
              {[['3 May','Exam 1'],['10 May','Exam 2'],['24 May','Exam 3'],['7 Jun','Exam 4'],['21 Jun','Exam 5']].map(([d,l])=>(
                <div key={d}><div className="text-blue-800 font-bold text-xs">{d}</div><div className="text-gray-400 text-xs">{l}</div></div>
              ))}
            </div>
          </div>
          <button onClick={() => { onRegister(); onClose(); }} className="w-full bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-black py-3 rounded-xl text-sm transition mb-2">
            ✎ Register Now & Claim Scholarship →
          </button>
          <button onClick={onClose} className="w-full text-xs text-gray-400 hover:text-gray-600 transition">
            Dismiss — I'll check later
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function TalentHunt() {
  const [active, setActive] = useState('registration');
  const [showSchPopup, setShowSchPopup] = useState(false);

  useEffect(() => {
    // Show popup once on page load after 1.5s
    const t = setTimeout(() => setShowSchPopup(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handler = (e) => setActive(e.detail);
    window.addEventListener('th-tab', handler);
    return () => window.removeEventListener('th-tab', handler);
  }, []);

return (
    <Layout>
      {showSchPopup && (
        <ScholarshipPopup
          onClose={() => setShowSchPopup(false)}
          onRegister={() => setActive('registration')}
        />
      )}

      {/* Floating badge */}
      <button onClick={() => setShowSchPopup(true)}
        className="fixed bottom-6 right-6 z-[400] bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-black text-xs px-4 py-2.5 rounded-full shadow-lg transition animate-bounce hidden sm:block">
        🏆 Win 100% Scholarship!
      </button>

      <div className="bg-gray-50 min-h-screen font-outfit">

        {/* HERO */}
        <div className="relative overflow-hidden" style={{background:'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)'}}>
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-500 opacity-10 rounded-full"/>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400 opacity-10 rounded-full"/>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 opacity-60"/>
            <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize:'30px 30px'}}/>
          </div>

          {/* Gold ribbon */}
          <div className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 py-2 text-center text-blue-900 text-xs font-black tracking-widest uppercase">
            ★ Building Futures, Transforming Lives — SIUAT National Examination 2026 ★
          </div>

          <div className="relative max-w-6xl mx-auto px-4 py-8 sm:py-12">
            <div className="flex flex-col lg:flex-row items-center gap-8">

              {/* Left */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-orange-500 bg-opacity-20 border border-orange-400 border-opacity-40 text-orange-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-3">
                  <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"/>
                  Registrations Open — Session 2026-27
                </div>
                <div className="text-yellow-400 text-xs font-black tracking-widest uppercase mb-1">★ A National Level Aptitude Test for Bright Young Minds ★</div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-yellow-300 leading-tight mb-1 font-outfit">SIUAT</h1>
                <p className="text-white text-base sm:text-lg font-light mb-1">Saroj International University Aptitude Test</p>
                <p className="text-blue-300 text-xs italic mb-4">Discover Your Talent. Earn Your Scholarship. Shape Your Future.</p>

                {/* Key Info chips */}
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-5">
                  {[
                    ['📅', '3 May 2026', 'First Exam'],
                    ['🏆', '100% Scholarship', 'Score 90%+'],
                    ['📍', 'Online & Offline', 'Exam Mode'],
                    ['🏛️', '5 Centres', 'Across UP'],
                    ['🎓', '500 Seats', 'Total Capacity'],
                  ].map(([icon, val, label]) => (
                    <div key={label} className="flex items-center gap-2 bg-white rounded-xl px-3 py-1.5 shadow-md">
                      <span className="text-base">{icon}</span>
                      <div>
                        <div className="text-blue-900 text-xs font-bold">{val}</div>
                        <div className="text-gray-500 text-xs">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                  <button onClick={() => setActive('registration')}
                    className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow-lg inline-flex items-center gap-2">
                    ✎ Register Now →
                  </button>
                  <button onClick={() => setShowSchPopup(true)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold px-6 py-2.5 rounded-xl text-sm transition inline-flex items-center gap-2">
                    🏆 Win 100% Scholarship!
                  </button>
                </div>
              </div>

              {/* Right — Countdown + Stats */}
              <div className="w-full lg:w-auto flex-shrink-0 text-center">
                <div className="bg-blue-950 border border-blue-700 rounded-2xl p-5 w-full lg:w-auto">
                  <div className="text-white text-sm font-bold mb-0.5">First Exam Starts In</div>
                  <div className="text-orange-400 text-xs mb-3 font-bold">3 May 2026 — 9:00 AM</div>
                  <CountdownTimer />
                  {/* Exam dates row */}
                  <div className="mt-4 pt-3 border-t border-blue-700 grid grid-cols-5 gap-1 text-center">
                    {[['3 May','E1'],['10 May','E2'],['24 May','E3'],['7 Jun','E4'],['21 Jun','E5']].map(([d,l])=>(
                      <div key={d}>
                        <div className="text-yellow-300 font-bold text-xs">{d}</div>
                        <div className="text-blue-400 text-xs">{l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 pt-3 border-t border-blue-700 grid grid-cols-3 gap-3 text-center">
                    {[['500','Total Seats'],['₹50L+','Scholarships'],['4','Exam Dates']].map(([val,label])=>(
                      <div key={label}>
                        <div className="text-orange-400 font-bold text-base">{val}</div>
                        <div className="text-white text-xs mt-0.5 font-semibold">{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* TABS */}
        <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex gap-0 overflow-x-auto">
              {TABS.map(t => (
                <button key={t.id} onClick={() => setActive(t.id)}
                  className={`flex items-center gap-2 px-5 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                    active === t.id ? 'text-blue-700 border-orange-500 bg-blue-50' : 'text-gray-500 border-transparent hover:text-blue-700 hover:bg-gray-50'
                  }`}>
                  <span>{t.icon}</span>{t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PANEL */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {active === 'registration' && <RegistrationPanel onOpenScholarship={() => setShowSchPopup(true)} />}
          {active === 'admin'        && <AdminPanel />}
          {active === 'exam'         && <ExamPanel onShowResults={() => setActive('results')} />}
          {active === 'results'      && <ResultsPanel />}
        </div>

      </div>
    </Layout>
  );
}
