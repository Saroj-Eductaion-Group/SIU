import { useState, useEffect, useRef } from 'react';
import { SIUAT_QUESTIONS, getGrade } from './thData';
import { siuatLogin, siuatSubmitResult } from './api';

const EXAM_DURATION = 45 * 60;

export default function ExamPortal({ registrations, setRegistrations }) {
  const [phase, setPhase] = useState('login');
  const [appId, setAppId] = useState('');
  const [loginError, setLoginError] = useState('');
  const [candidate, setCandidate] = useState(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [violations, setViolations] = useState(0);
  const [showVio, setShowVio] = useState(false);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [result, setResult] = useState(null);
  const timerRef = useRef(null);
  const questions = SIUAT_QUESTIONS;

  useEffect(() => {
    const handler = () => {
      if (document.hidden && phase === 'active') {
        setViolations(v => { const n = v + 1; setShowVio(true); setTimeout(() => setShowVio(false), 3000); return n; });
      }
    };
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, [phase]);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(timerRef.current); handleSubmit(); return 0; } return t - 1; });
    }, 1000);
  };

  const handleLogin = async () => {
    const trimmed = appId.trim().toUpperCase();
    setLoginError('');
    try {
      const reg = await siuatLogin(trimmed);
      if (reg.status === 'Pending') { setLoginError('Your application is still under review. Please wait for admin approval.'); return; }
      if (reg.status === 'Rejected') { setLoginError('Your application has been rejected. Please contact SIU admissions.'); return; }
      if (reg.score !== null && reg.score !== undefined) { setLoginError('You have already completed the Talent Hunt exam. Check your result in the Results tab.'); return; }
      setCandidate({ ...reg, id: reg.appId || reg.id }); setPhase('instructions');
    } catch (e) {
      // fallback to localStorage
      const reg = registrations.find(r => r.id === trimmed);
      if (!reg) { setLoginError('Application ID not found. Please check and try again.'); return; }
      if (reg.status === 'Pending') { setLoginError('Your application is still under review. Please wait for admin approval.'); return; }
      if (reg.status === 'Rejected') { setLoginError('Your application has been rejected. Please contact SIU admissions.'); return; }
      if (reg.examCompleted) { setLoginError('You have already completed the Talent Hunt exam. Check your result in the Results tab.'); return; }
      setCandidate(reg); setPhase('instructions');
    }
  };

  const startExam = () => { setPhase('active'); setTimeLeft(EXAM_DURATION); startTimer(); };

  const handleSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    let correct = 0, wrong = 0, skipped = 0;
    questions.forEach((q, i) => {
      const a = answers[i];
      if (a === undefined) skipped++;
      else if (a === q.correctOption) correct++;
      else wrong++;
    });
    const score = correct * 4 - wrong * 1;
    const maxScore = questions.length * 4;
    const pct = Math.max(0, Math.round((score / maxScore) * 100));
    setResult({ pct, correct, wrong, skipped, score });
    if (candidate) {
      const appId = candidate.appId || candidate.id;
      // Save to DB
      siuatSubmitResult(appId, pct, getGrade(pct).grade, { correct, wrong, skipped }).catch(() => {});
      // Also update localStorage fallback
      setRegistrations(prev => prev.map(r => r.id === appId ? { ...r, examCompleted: true, score: pct } : r));
    }
    setPhase('submitted');
  };

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const timerPct = (timeLeft / EXAM_DURATION) * 100;
  const q = questions[currentQ];

  // ── LOGIN ──
  if (phase === 'login') return (
    <div className="max-w-md mx-auto mt-2">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: '#f5f0ff' }}>📋</div>
          <div>
            <h3 className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif", color: '#0a1f5c' }}>Exam Portal Login</h3>
            <p className="text-xs text-gray-400">Enter your Application ID to access your exam</p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-xs text-amber-800">
          <strong>Note:</strong> Your application must be <strong>Approved</strong> by admin before you can access the exam.
        </div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Application ID <span className="text-red-500">*</span></label>
        <input value={appId} onChange={e => setAppId(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleLogin()}
          placeholder="e.g. SIU839201"
          className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm mb-3 focus:outline-none focus:border-purple-400 font-mono tracking-widest" />
        {loginError && <div className="text-red-600 text-xs mb-3 p-2 rounded-lg bg-red-50 border border-red-200">{loginError}</div>}
        <button onClick={handleLogin} className="w-full py-3 rounded-xl text-sm font-bold text-white" style={{ background: '#0a1f5c' }}>
          Access Exam Portal →
        </button>
        <p className="text-[10px] text-gray-400 text-center mt-3">Try App ID: SIU839201 or SIU472910 (Approved candidates)</p>
      </div>
    </div>
  );

  // ── INSTRUCTIONS ──
  if (phase === 'instructions' && candidate) return (
    <div className="max-w-2xl mx-auto mt-2">
      <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        <div className="p-5 text-white" style={{ background: 'linear-gradient(135deg,#0a1f5c,#4c1d95)' }}>
          <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: 'rgba(255,255,255,0.5)' }}>SIU Talent Hunt Examination 2026-27</div>
          <h3 className="font-black text-xl text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>Exam Instructions</h3>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>Welcome, {candidate.firstName} {candidate.lastName} — App ID: {candidate.id}</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {[{ l: 'Total Questions', v: `${questions.length}` }, { l: 'Total Marks', v: `${questions.length * 4}` }, { l: 'Duration', v: '45 Minutes' }, { l: 'Marking Scheme', v: '+4 / −1' }].map(s => (
              <div key={s.l} className="text-center rounded-xl p-3" style={{ background: '#f5f0ff' }}>
                <div className="font-black text-xl" style={{ fontFamily: "'Playfair Display', serif", color: '#4c1d95' }}>{s.v}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2 mb-5">
            {[
              'The exam consists of 15 multiple choice questions covering General Aptitude, Reasoning, English & GK.',
              'Each correct answer carries +4 marks. Each wrong answer carries −1 mark. Unattempted = 0.',
              'The exam will auto-submit when the 45-minute timer ends.',
              'Do NOT switch tabs or minimize the browser window — each violation is recorded.',
              'After 3 tab-switch violations, a strict warning is issued. This may affect your scholarship eligibility.',
              'Once started, the exam cannot be paused. Ensure stable internet before proceeding.',
              'Your result and scholarship eligibility will be displayed immediately after submission.',
            ].map((rule, i) => (
              <div key={i} className="flex gap-2.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5" style={{ background: '#6c3fc7' }}>{i + 1}</div>
                <p className="text-gray-700 text-xs leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg mb-5" style={{ background: '#fffbea', border: '1px solid #c9a84c' }}>
            <span className="text-xl">🏆</span>
            <p className="text-xs font-medium" style={{ color: '#7a5500' }}>Score <strong>90%+</strong> to win <strong>100% Full Scholarship</strong> at Saroj International University. Every question matters!</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setPhase('login'); setCandidate(null); }} className="flex-1 py-3 border border-gray-300 rounded-xl text-sm font-semibold text-gray-600">← Back</button>
            <button onClick={startExam} className="flex-1 py-3 rounded-xl text-sm font-extrabold text-white" style={{ background: 'linear-gradient(90deg,#4c1d95,#6c3fc7)' }}>
              Start Exam Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── ACTIVE EXAM ──
  if (phase === 'active' && q) return (
    <div>
      {showVio && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: 'rgba(127,0,0,0.85)' }}>
          <div className="text-white text-center p-8 max-w-sm">
            <div className="text-5xl mb-3">⚠️</div>
            <div className="text-xl font-bold mb-2">Tab Switch Detected!</div>
            <div className="text-sm opacity-80">This has been recorded as Violation #{violations}. 3 violations may affect your scholarship eligibility.</div>
          </div>
        </div>
      )}

      {/* Exam Header */}
      <div className="rounded-xl p-4 mb-4 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#4c1d95,#0a1f5c)' }}>
        <div className="flex justify-between items-center flex-wrap gap-3 relative z-10">
          <div>
            <div className="text-white font-bold text-sm">SIU Talent Hunt Exam 2026-27</div>
            <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>{candidate?.firstName} {candidate?.lastName} · App ID: {candidate?.id}</div>
            <div className="text-xs font-semibold mt-1" style={{ color: violations > 0 ? '#fca5a5' : '#f0d060' }}>
              {violations > 0 ? `⚠ ${violations} violation${violations > 1 ? 's' : ''} recorded` : '✓ No violations'}
            </div>
          </div>
          <div className="text-right">
            <div className="font-black text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: timeLeft < 300 ? '#fca5a5' : '#f0d060' }}>{fmt(timeLeft)}</div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.55)' }}>Time Remaining</div>
          </div>
        </div>
        <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${timerPct}%`, background: timeLeft < 300 ? '#ef4444' : 'linear-gradient(90deg,#c9a84c,#e8b840)' }} />
        </div>
      </div>

      {/* Navigator */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Question Navigator</span>
          <span className="text-xs text-gray-500">{Object.keys(answers).length} / {questions.length} answered</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {questions.map((_, i) => (
            <button key={i} onClick={() => setCurrentQ(i)}
              className="w-8 h-8 rounded-lg text-xs font-bold transition"
              style={{
                background: answers[i] !== undefined ? '#0a1f5c' : '#fff',
                color: answers[i] !== undefined ? '#fff' : '#6b7280',
                border: i === currentQ ? '2.5px solid #c9a84c' : answers[i] !== undefined ? '1.5px solid #0a1f5c' : '1.5px solid #e5e7eb',
              }}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs font-bold" style={{ color: '#c9a84c' }}>Q.{currentQ + 1} of {questions.length}</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-[#0a1f5c]">{q.section}</span>
          <span className="px-2 py-0.5 rounded-lg text-[10px] text-green-700 bg-green-50 font-bold">+4 marks</span>
        </div>
        <p className="text-base font-medium text-gray-900 leading-relaxed mb-5">{q.text}</p>
        <div className="space-y-2.5">
          {q.options.map((opt, oi) => (
            <button key={oi} onClick={() => setAnswers(a => ({ ...a, [currentQ]: oi }))}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left transition"
              style={{
                borderColor: answers[currentQ] === oi ? '#0a1f5c' : '#e5e7eb',
                border: '1.5px solid',
                background: answers[currentQ] === oi ? '#eff6ff' : '#fff',
                color: answers[currentQ] === oi ? '#0a1f5c' : '#374151',
                fontWeight: answers[currentQ] === oi ? 600 : 400,
              }}>
              <span className="w-6 h-6 min-w-[24px] rounded-full border-[1.5px] flex items-center justify-center text-xs font-bold flex-shrink-0">
                {String.fromCharCode(65 + oi)}
              </span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <button onClick={() => setCurrentQ(q => Math.max(0, q - 1))} disabled={currentQ === 0}
          className="px-4 py-2 rounded-lg border text-sm font-semibold text-gray-600 border-gray-300 disabled:opacity-40">← Previous</button>
        <div className="flex-1" />
        <button onClick={() => setCurrentQ(q => Math.min(questions.length - 1, q + 1))} disabled={currentQ === questions.length - 1}
          className="px-4 py-2 rounded-lg border text-sm font-semibold text-gray-600 border-gray-300 disabled:opacity-40">Next →</button>
        <button onClick={handleSubmit} className="px-5 py-2 rounded-lg text-sm font-bold" style={{ background: 'linear-gradient(90deg,#c9a84c,#e8b840)', color: '#0a1f5c' }}>Submit Exam ✓</button>
      </div>
    </div>
  );

  // ── RESULT ──
  if (phase === 'submitted' && result) {
    const g = getGrade(result.pct);
    return (
      <div className="max-w-xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
          <div className="p-8 text-center">
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">SIU Talent Hunt Examination Result</div>
            <div className="font-bold mb-4" style={{ color: '#0a1f5c' }}>{candidate?.firstName} {candidate?.lastName} — {candidate?.id}</div>
            <div className="w-32 h-32 rounded-full mx-auto flex flex-col items-center justify-center mb-4 border-[6px]" style={{ borderColor: '#0a1f5c' }}>
              <div className="font-black text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: '#0a1f5c' }}>{result.pct}%</div>
              <div className="text-xs text-gray-400 mt-0.5">Score</div>
            </div>
            <div className="inline-block px-6 py-1.5 rounded-full text-base font-bold mb-3" style={{ background: g.bg, color: g.color }}>
              Grade {g.grade} — {g.label}
            </div>
            <div className="text-sm text-gray-500 mb-5">{result.score}/{questions.length * 4} marks</div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[{ n: result.correct, l: 'Correct', c: '#16a34a' }, { n: result.wrong, l: 'Wrong', c: '#dc2626' }, { n: result.skipped, l: 'Skipped', c: '#d97706' }].map(s => (
                <div key={s.l} className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="font-bold text-2xl" style={{ fontFamily: "'Playfair Display', serif", color: s.c }}>{s.n}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
            {result.pct >= 60 && (
              <div className="rounded-xl p-4 flex items-center gap-3 text-left mb-4" style={{ background: 'linear-gradient(135deg,#c9a84c,#e8b840)' }}>
                <span className="text-2xl">🏆</span>
                <div className="text-sm font-semibold" style={{ color: '#0a1f5c' }}>
                  Congratulations! You qualify for <strong>{g.grade === 'A+' ? '100% Full' : g.grade === 'A' ? '50%' : '25%'} Scholarship</strong> at SIU. Visit the admissions office with your App ID to claim it.
                </div>
              </div>
            )}
            <p className="text-xs text-gray-400">Your result has been recorded. Check the Results tab for the official result sheet.</p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
