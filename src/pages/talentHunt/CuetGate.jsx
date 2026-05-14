import { useState } from 'react';
import CuetAuthLogin from './CuetAuthLogin';
import CuetAuthRegister from './CuetAuthRegister';

export default function CuetGate({ onLogin }) {
  const [tab, setTab] = useState('login');

  return (
    <div>
      {/* Hero */}
      <div className="rounded-xl p-5 mb-5 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#0a1f5c,#1e3a8a)' }}>
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-extrabold" style={{ background: '#c9a84c', color: '#0a1f5c' }}>CUET 2026</div>
        <h2 className="font-black text-xl text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>CUET Mock Test Portal</h2>
        <p className="text-xs leading-relaxed mb-3" style={{ color: 'rgba(255,255,255,0.55)' }}>
          To access CUET mock tests, candidates must first complete the NTA CUET 2026 application form. Already registered? Login with your Application ID.
        </p>
        <div className="flex gap-2 flex-wrap">
          {['Free Registration','Section II Domain Tests','Section III General Test','NTA CUET Pattern'].map(t => (
            <span key={t} className="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ background: 'rgba(201,168,76,0.16)', color: '#f0d080', border: '1px solid rgba(201,168,76,0.28)' }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Tab toggle */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5">
        {[['login','🔑 Login','Already registered? Enter App ID'],['register','📝 New Registration','First time? Fill the application form']].map(([id, label, desc]) => (
          <button key={id} onClick={() => setTab(id)}
            className="flex-1 py-2.5 px-3 rounded-lg text-left transition"
            style={{ background: tab === id ? '#fff' : 'transparent', boxShadow: tab === id ? '0 1px 4px rgba(0,0,0,0.1)' : 'none' }}>
            <div className={`text-sm font-bold ${tab === id ? 'text-[#0a1f5c]' : 'text-gray-500'}`}>{label}</div>
            <div className="text-[10px] text-gray-400 hidden sm:block">{desc}</div>
          </button>
        ))}
      </div>

      {tab === 'login'    && <CuetAuthLogin    onLogin={onLogin} />}
      {tab === 'register' && <CuetAuthRegister onLogin={onLogin} />}
    </div>
  );
}
