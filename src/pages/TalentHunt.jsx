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

function ScholarshipPopup({ onClose, onRegister }) {
  const [timeLeft, setTimeLeft] = useState(3 * 24 * 60 * 60);
  useEffect(() => {
    const id = setInterval(() => setTimeLeft(p => p > 0 ? p - 1 : 0), 1000);
    return () => clearInterval(id);
  }, []);
  const d = Math.floor(timeLeft/86400), h = Math.floor((timeLeft%86400)/3600),
        m = Math.floor((timeLeft%3600)/60), s = timeLeft%60;
  return createPortal(
    <div style={{position:'fixed',inset:0,background:'rgba(5,15,50,0.75)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',padding:'16px',overflowY:'auto'}}>
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative my-auto" style={{maxHeight:'90vh',overflowY:'auto'}}>
        <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-lg z-10 transition">×</button>
        <div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 py-2.5 text-center text-blue-900 text-xs font-black tracking-widest uppercase">
          🏆 SIU Special Merit Scholarship Drive 2026-27 🏆
        </div>
        <div className="p-5 sm:p-6">
          <div className="text-center mb-4">
            <img src="/download.png" alt="SIU" className="w-16 h-auto object-contain mx-auto mb-2"/>
            <div className="text-2xl mb-2">⭐⭐⭐</div>
            <h2 className="text-xl sm:text-2xl font-black text-blue-900 mb-1">Win 100% Full Scholarship!</h2>
            <p className="text-gray-500 text-sm leading-relaxed">Score <strong>90% or above</strong> in the Saroj International University Aptitude Test (SIUAT) and get a complete fee waiver for your entire programme. Limited seats — register before they fill up!</p>
            <p className="text-red-600 text-xs font-bold mt-2">
              Offer closes in: {d}d {String(h).padStart(2,'0')}h {String(m).padStart(2,'0')}m {String(s).padStart(2,'0')}s
            </p>
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {[
              ['🏆','100% Scholarship','Score 90% & above','bg-yellow-50 border-yellow-300 text-yellow-800'],
              ['🥈','50% Scholarship','Score 75% – 89%','bg-blue-50 border-blue-300 text-blue-800'],
              ['🥉','25% Scholarship','Score 60% – 74%','bg-orange-50 border-orange-300 text-orange-800'],
              ['📚','Merit Certificate','All qualifiers','bg-green-50 border-green-300 text-green-800'],
            ].map(([icon,title,sub,cls])=>(
              <div key={title} className={`flex items-center gap-2 p-2.5 rounded-xl border ${cls}`}>
                <span className="text-lg shrink-0">{icon}</span>
                <div><div className="text-xs font-bold">{title}</div><div className="text-xs opacity-75">{sub}</div></div>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <p className="text-xs font-bold text-gray-600 uppercase tracking-widest mb-2 text-center">Available Across All Programmes</p>
            <div className="flex flex-wrap gap-1.5 justify-center">
              {['B.Tech','BBA','BCA','B.Sc','B.Com','BA','MBA','M.Tech','MCA','M.Sc','M.Com','MA','LLB','LLM','B.Pharma','M.Pharma'].map(c=>(
                <span key={c} className="bg-blue-50 border border-blue-200 text-blue-800 text-xs font-semibold px-2 py-0.5 rounded-full">{c}</span>
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

      {/* Floating badge — mobile only */}
      <button onClick={() => setShowSchPopup(true)}
        className="fixed bottom-5 right-5 z-[500] bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-black text-xs px-4 py-2.5 rounded-full shadow-lg transition animate-bounce sm:hidden">
        🏆 Scholarship!
      </button>

      <div className="bg-gray-50 min-h-screen font-outfit">

        {/* HERO */}
        <div className="relative overflow-hidden" style={{background:'linear-gradient(135deg, #0a1f5c 0%, #0e2557 60%, #1a3a8a 100%)'}}>

          {/* Decorative circles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-yellow-400 opacity-5 rounded-full"/>
            <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-400 opacity-5 rounded-full"/>
            <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.02) 1px, transparent 1px)',backgroundSize:'30px 30px'}}/>
          </div>

          {/* Gold ribbon */}
          <div className="bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600 py-2 text-center text-blue-900 text-xs font-black tracking-widest uppercase px-4">
            ★ Building Futures, Transforming Lives — SIUAT National Examination 2026 ★
          </div>

          {/* Main content */}
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

            {/* Win 100% button + 100% box — top right */}
            <div className="absolute top-4 right-4 sm:right-6 hidden sm:flex flex-col items-end gap-2 z-10">
              <button onClick={() => setShowSchPopup(true)}
                className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-black text-sm px-5 py-2.5 rounded-full shadow-lg transition flex items-center gap-1.5">
                🏆 Win 100% Scholarship!
              </button>
              <div className="rounded-2xl px-5 py-4 text-center" style={{background:'rgba(255,255,255,0.05)',border:'2px solid rgba(201,168,76,0.5)'}}>
                <div className="text-2xl mb-1">🏆</div>
                <div className="text-3xl font-black text-yellow-300 font-outfit leading-none">100%</div>
                <div className="text-yellow-200 text-xs font-bold tracking-widest uppercase mt-1">Scholarship</div>
                <div className="text-yellow-300 text-xs mt-0.5">Score above 90%</div>
              </div>
            </div>

            {/* Top label */}
            <p className="text-yellow-400 text-sm font-black tracking-widest uppercase text-center mb-4 sm:mb-6">
              ★ A National Level SIUAT for Bright Young Minds ★
            </p>

            {/* Title + 100% box */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 mb-6">
              {/* Center — SIUAT text */}
              <div className="text-center">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-yellow-300 leading-none font-outfit tracking-wide">SIUAT</h1>
                <p className="text-white text-lg sm:text-xl lg:text-2xl font-light mt-2">Saroj International University Aptitude Test</p>
                <p className="text-blue-300 text-sm italic mt-2">Discover Your Talent. Earn Your Scholarship. Shape Your Future.</p>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {[
                ['🎯','National Recognition'],
                ['🏆','Up to 100% Scholarship'],
                ['📚','UG & PG Programs'],
                ['🏫','Professional Courses'],
                ['🏢','15+ Industry Partners'],
                ['🏗️','IIIT Lucknow Collaboration'],
                ['📅','5 Exam Opportunities'],
                ['🌐','Online / Offline Mode'],
              ].map(([icon,label]) => (
                <span key={label}
                  className="flex items-center gap-1.5 text-white text-sm font-medium px-4 py-2 rounded-full border border-white border-opacity-25"
                  style={{background:'rgba(255,255,255,0.08)'}}>
                  <span>{icon}</span>{label}
                </span>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={() => setActive('registration')}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl text-sm transition shadow-lg">
                ✎ Register Now →
              </button>
              {/* Mobile only — scholarship button */}
              <button onClick={() => setShowSchPopup(true)}
                className="sm:hidden bg-yellow-500 hover:bg-yellow-600 text-blue-900 font-bold px-6 py-3 rounded-xl text-sm transition">
                🏆 Win 100% Scholarship!
              </button>
            </div>
          </div>

          {/* Bottom exam dates bar */}
          <div style={{background:'rgba(0,0,0,0.3)',borderTop:'1px solid rgba(201,168,76,0.25)'}}>
            <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-around flex-wrap gap-x-2 gap-y-2">
              {[['3 May','Exam 1'],['10 May','Exam 2'],['24 May','Exam 3'],['7 Jun','Exam 4'],['21 Jun','Exam 5']].map(([date,label],i,arr)=>(
                <div key={date} className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-yellow-300 font-bold text-base sm:text-lg font-outfit">{date}</div>
                    <div className="text-blue-300 text-xs sm:text-sm uppercase tracking-widest">{label}</div>
                  </div>
                  {i < arr.length-1 && <div className="hidden sm:block" style={{width:'1px',height:'28px',background:'rgba(255,255,255,0.15)'}}/>}
                </div>
              ))}
              <div className="hidden sm:block" style={{width:'1px',height:'28px',background:'rgba(255,255,255,0.15)'}}/>
              <div className="text-center">
                <div className="text-yellow-300 font-bold text-base sm:text-lg font-outfit">500</div>
                <div className="text-blue-300 text-xs sm:text-sm uppercase tracking-widest">Seats Total</div>
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
                  className={`flex items-center gap-2 px-4 sm:px-5 py-4 text-xs sm:text-sm font-semibold whitespace-nowrap border-b-2 transition-all ${
                    active === t.id ? 'text-blue-700 border-orange-500 bg-blue-50' : 'text-gray-500 border-transparent hover:text-blue-700 hover:bg-gray-50'
                  }`}>
                  <span>{t.icon}</span>{t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PANEL */}
        <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8">
          {active === 'registration' && <RegistrationPanel onOpenScholarship={() => setShowSchPopup(true)} />}
          {active === 'admin'        && <AdminPanel />}
          {active === 'exam'         && <ExamPanel onShowResults={() => setActive('results')} />}
          {active === 'results'      && <ResultsPanel />}
        </div>

      </div>
    </Layout>
  );
}
