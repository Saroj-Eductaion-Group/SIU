import { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import RegistrationPanel from './talentHunt/RegistrationPanel';
import AdminPanel from './talentHunt/AdminPanel';
import ExamPanel from './talentHunt/ExamPanel';
import ResultsPanel from './talentHunt/ResultsPanel';
import logo from '../assets/logo.png';

const TABS = [
  { id: 'registration', label: 'Registration', icon: '📋' },
  { id: 'admin',        label: 'Admin Panel',  icon: '🔐' },
  { id: 'exam',         label: 'Exam Portal',  icon: '📝' },
  { id: 'results',      label: 'Results',      icon: '🏆' },
];

function CountdownTimer() {
  const target = new Date('2026-05-15T09:00:00');
  const [time, setTime] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const diff = target - now;
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
    <div className="flex gap-3 justify-center">
      {[['Days', time.days], ['Hours', time.hours], ['Mins', time.mins], ['Secs', time.secs]].map(([label, val]) => (
        <div key={label} className="text-center">
          <div className="bg-orange-500 rounded-xl px-4 py-2 min-w-[60px]">
            <div className="text-2xl font-bold text-white font-outfit">{String(val).padStart(2,'0')}</div>
            <div className="text-orange-100 text-xs mt-0.5 font-semibold">{label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function TalentHunt() {
  const [active, setActive] = useState('registration');

  useEffect(() => {
    const handler = (e) => setActive(e.detail);
    window.addEventListener('th-tab', handler);
    return () => window.removeEventListener('th-tab', handler);
  }, []);

  return (
    <Layout>
      <div className="bg-gray-50 min-h-screen font-outfit">

        {/* HERO SECTION */}
        <div className="relative overflow-hidden" style={{background:'linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #1d4ed8 100%)'}}>
          {/* Background decorations */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-orange-500 opacity-10 rounded-full"/>
            <div className="absolute top-10 right-10 w-64 h-64 bg-orange-400 opacity-5 rounded-full"/>
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400 opacity-10 rounded-full"/>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500 opacity-60"/>
            <div className="absolute inset-0" style={{backgroundImage:'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize:'30px 30px'}}/>
          </div>

          <div className="relative max-w-6xl mx-auto px-4 py-10 sm:py-14">
            <div className="flex flex-col lg:flex-row items-center gap-10">

              {/* Left Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-orange-500 bg-opacity-20 border border-orange-400 border-opacity-40 text-orange-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-4">
                  <span className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"/>
                  Registrations Open — Session 2026-27
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
                  SIU <span className="text-orange-400">Talent Hunt</span><br/>
                  Examination 2026-27
                </h1>

                <p className="text-blue-100 text-sm sm:text-base mb-6 max-w-lg mx-auto lg:mx-0 leading-relaxed">
                  Saroj International University's premier scholarship-based entrance examination. Showcase your talent and win merit scholarships up to <span className="text-orange-300 font-bold">100% tuition fee waiver.</span>
                </p>

                {/* Key Info */}
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-6">
                  {[
                    ['📅', '15 May 2026', 'First Exam Date'],
                    ['🎓', '100% Scholarship', 'Top Scorers'],
                    ['📍', 'Online & Offline', 'Exam Mode'],
                    ['🏛️', '5 Centres', 'Across UP'],
                  ].map(([icon, val, label]) => (
                    <div key={label} className="flex items-center gap-2 bg-white rounded-xl px-3 py-2 shadow-md">
                      <span className="text-lg">{icon}</span>
                      <div>
                        <div className="text-blue-900 text-xs font-bold">{val}</div>
                        <div className="text-gray-500 text-xs">{label}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <button onClick={() => setActive('registration')}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-3 rounded-xl text-sm transition shadow-lg shadow-orange-500/30 inline-flex items-center gap-2">
                  Register Now →
                </button>
              </div>

              {/* Right — Countdown */}
              <div className="w-full lg:w-auto flex-shrink-0 text-center">
                <div className="bg-blue-950 border border-blue-700 rounded-2xl p-5 sm:p-8 w-full lg:w-auto">
                  <div className="text-white text-base font-bold mb-1">First Exam Starts In</div>
                  <div className="text-orange-400 text-sm mb-4 font-bold">15 May 2026 — 9:00 AM</div>
                  <CountdownTimer />
                  <div className="mt-5 pt-4 border-t border-blue-700">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      {[['10,000+','Expected Candidates'],['₹50L+','Scholarships'],['20+','Programs']].map(([val,label]) => (
                        <div key={label}>
                          <div className="text-orange-400 font-bold text-lg">{val}</div>
                          <div className="text-white text-xs mt-0.5 font-semibold">{label}</div>
                        </div>
                      ))}
                    </div>
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
                    active === t.id
                      ? 'text-blue-700 border-orange-500 bg-blue-50'
                      : 'text-gray-500 border-transparent hover:text-blue-700 hover:bg-gray-50'
                  }`}>
                  <span>{t.icon}</span>{t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* PANEL */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {active === 'registration' && <RegistrationPanel />}
          {active === 'admin'        && <AdminPanel />}
          {active === 'exam'         && <ExamPanel onShowResults={() => setActive('results')} />}
          {active === 'results'      && <ResultsPanel />}
        </div>

      </div>
    </Layout>
  );
}
