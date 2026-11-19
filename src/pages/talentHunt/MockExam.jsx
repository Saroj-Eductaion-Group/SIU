import { useState, useEffect, useRef } from 'react';
import { MOCK_TESTS, DIFF_COLORS, SECTION_COLORS, getMockGrade, cuetPercentile } from './mockData';
import { ALL_QUESTIONS } from './mockQuestions';
import { cuetSaveResult } from './api';

export default function MockExam({ testId, candidate, onBack }) {
  const test = MOCK_TESTS.find(t => t.id === testId);
  const questions = ALL_QUESTIONS[testId] || [];

  const [phase, setPhase] = useState('instructions');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [visited, setVisited] = useState({});
  const [marked, setMarked] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [violations, setViolations] = useState(0);
  const [showVio, setShowVio] = useState(false);
  const [result, setResult] = useState(null);
  const [showWarn, setShowWarn] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const h = () => {
      if (document.hidden && phase === 'active') {
        setViolations(v => { const n = v + 1; setShowVio(true); setTimeout(() => setShowVio(false), 3000); return n; });
      }
    };
    document.addEventListener('visibilitychange', h);
    return () => document.removeEventListener('visibilitychange', h);
  }, [phase]);

  const startTest = () => {
    setTimeLeft(test.durationMinutes * 60);
    setVisited({ 0: true });
    setPhase('active');
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(timerRef.current); doSubmit(); return 0; } return t - 1; });
    }, 1000);
  };

  const doSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    let correct = 0, wrong = 0, skipped = 0;
    questions.forEach((q, i) => {
      const a = answers[i];
      if (a === undefined) skipped++;
      else if (a === q.correctOption) correct++;
      else wrong++;
    });
    const score = correct * 5 - wrong;
    const maxScore = test.attemptCount * 5;
    const pct = maxScore > 0 ? Math.max(0, Math.round((score / maxScore) * 100)) : 0;
    const r = { correct, wrong, skipped, score, maxScore, pct, answers };
    setResult(r);
    setShowWarn(false);
    setPhase('result');
    if (candidate?.cuetId) {
      cuetSaveResult(candidate.cuetId, { testId, testName: test?.name, correct, wrong, skipped, score, maxScore, pct }).catch(() => {});
    }
  };

  const trySubmit = () => {
    if (Object.keys(answers).length < test.attemptCount) { setShowWarn(true); return; }
    doSubmit();
  };

  const nav = (i) => { setCurrentQ(i); setVisited(v => ({ ...v, [i]: true })); };
  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const timerPct = test ? (timeLeft / (test.durationMinutes * 60)) * 100 : 100;
  const attempted = Object.keys(answers).length;
  const q = questions[currentQ];
  const sc = test ? (SECTION_COLORS[test.cuetSection] || { bg: '#f3e8ff', text: '#7c3aed' }) : {};

  // ── INSTRUCTIONS ──
  if (phase === 'instructions') return (
    <div className="max-w-2xl mx-auto">
      <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        <div className="p-5 text-white" style={{ background: 'linear-gradient(135deg,#0a1f5c,#4c1d95)' }}>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest"
              style={{ background: sc.bg, color: sc.text }}>{test?.cuetSection}</span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-white/40">CUET 2026 Pattern</span>
          </div>
          <h3 className="font-black text-xl text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>{test?.name}</h3>
          <p className="text-xs text-white/50">Paper Code: {test?.cuetCode}</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {[{ l: 'Total Questions', v: `${test?.questionsCount}` }, { l: 'Attempt Any', v: `${test?.attemptCount}` }, { l: 'Time Allotted', v: `${test?.durationMinutes} Min` }, { l: 'Max Marks', v: `${test?.marks}` }].map(s => (
              <div key={s.l} className="rounded-xl p-3 text-center" style={{ background: '#f5f0ff' }}>
                <div className="font-black text-xl" style={{ fontFamily: "'Playfair Display', serif", color: '#4c1d95' }}>{s.v}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="flex gap-2 mb-5 flex-wrap">
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-green-50 text-green-700 border border-green-200">✓ Correct: +5 Marks</span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-red-50 text-red-700 border border-red-200">✗ Incorrect: −1 Mark</span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 text-gray-600 border border-gray-200">— Unattempted: 0</span>
          </div>
          <div className="space-y-1.5 mb-5">
            {[
              `You must attempt any ${test?.attemptCount} of the ${test?.questionsCount} questions.`,
              'Marking Scheme: +5 for each correct answer, −1 for each incorrect answer, 0 for unattempted.',
              'Do NOT switch browser tabs or minimize the window. Every violation is recorded.',
              `The timer is set to ${test?.durationMinutes} minutes. The exam auto-submits when the timer ends.`,
              'You can mark questions for review and return to them. Use the navigator panel.',
              'Your result and CUET estimated percentile will be shown immediately after submission.',
            ].map((rule, i) => (
              <div key={i} className="flex gap-2.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5" style={{ background: '#0a1f5c' }}>{i + 1}</div>
                <p className="text-xs text-gray-700 leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <button onClick={onBack} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600">← Back</button>
            <button onClick={startTest} className="flex-1 py-2.5 rounded-xl text-sm font-extrabold text-white" style={{ background: 'linear-gradient(90deg,#0a1f5c,#4c1d95)' }}>Start Exam →</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ── ACTIVE ──
  if (phase === 'active' && q) return (
    <div>
      {showVio && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: 'rgba(120,0,0,0.88)' }}>
          <div className="text-white text-center p-8 max-w-sm">
            <div className="text-5xl mb-3">⚠️</div>
            <div className="text-xl font-bold mb-2">Tab Switch Detected!</div>
            <div className="text-sm opacity-75">This is Violation #{violations}.</div>
          </div>
        </div>
      )}
      {showWarn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-6 max-w-sm mx-4 shadow-xl">
            <div className="text-3xl mb-3 text-center">⚠️</div>
            <h3 className="font-bold text-center text-gray-900 mb-2">Insufficient Attempts</h3>
            <p className="text-sm text-gray-600 text-center mb-4">You have attempted <strong>{attempted}</strong> of <strong>{test.attemptCount}</strong> required questions. Submit anyway?</p>
            <div className="flex gap-3">
              <button onClick={() => setShowWarn(false)} className="flex-1 py-2 rounded-lg border text-sm font-semibold text-gray-600 border-gray-200">Continue Exam</button>
              <button onClick={doSubmit} className="flex-1 py-2 rounded-lg text-sm font-bold text-white" style={{ background: '#dc2626' }}>Submit Anyway</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="rounded-xl p-4 mb-3 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#0a1f5c,#4c1d95)' }}>
        <div className="flex justify-between items-start flex-wrap gap-3 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-extrabold tracking-widest uppercase px-2 py-0.5 rounded-full" style={{ background: '#c9a84c', color: '#0a1f5c' }}>NTA CUET 2026</span>
            </div>
            <div className="text-white font-bold text-sm">{test.name}</div>
            <div className="text-xs text-white/50">{test.cuetSection} · +5 / −1 Marking</div>
          </div>
          <div className="text-right">
            <div className="font-black text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: timeLeft < 300 ? '#fca5a5' : '#f0d060' }}>{fmt(timeLeft)}</div>
            <div className="text-[10px] text-white/50">Time Remaining</div>
          </div>
        </div>
        <div className="mt-3 flex items-center gap-3 relative z-10">
          <div className="text-xs font-bold" style={{ color: attempted >= test.attemptCount ? '#86efac' : '#f0d060' }}>
            Answered: {attempted} / {test.attemptCount} required
          </div>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.15)' }}>
            <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(100, (attempted / test.attemptCount) * 100)}%`, background: attempted >= test.attemptCount ? '#86efac' : '#c9a84c' }} />
          </div>
        </div>
        <div className="mt-1.5 h-1 rounded-full overflow-hidden relative z-10" style={{ background: 'rgba(255,255,255,0.10)' }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${timerPct}%`, background: timeLeft < 300 ? '#ef4444' : 'rgba(240,208,96,0.6)' }} />
        </div>
      </div>

      {/* Navigator */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 mb-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Navigator</span>
          <span className="text-xs text-gray-400">{attempted} answered · {Object.keys(marked).filter(k => marked[+k]).length} marked</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {questions.map((_, i) => {
            const isAnswered = answers[i] !== undefined;
            const isMarked = marked[i];
            const isVisited = visited[i];
            return (
              <button key={i} onClick={() => nav(i)}
                className="w-8 h-8 rounded-lg text-xs font-bold transition"
                style={{
                  background: isAnswered ? '#7c3aed' : isMarked ? '#d97706' : isVisited ? '#fee2e2' : '#f3f4f6',
                  color: isAnswered ? '#fff' : isMarked ? '#fff' : isVisited ? '#dc2626' : '#6b7280',
                  border: i === currentQ ? '2.5px solid #c9a84c' : '1.5px solid transparent',
                  transform: i === currentQ ? 'scale(1.1)' : 'scale(1)',
                }}>
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-3">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs font-extrabold tracking-wider" style={{ color: '#c9a84c' }}>Q.{currentQ + 1} of {questions.length}</span>
          {q.type === 'AR' && <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-700 uppercase tracking-wide">Assertion-Reason</span>}
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white" style={{ background: DIFF_COLORS[q.difficulty] }}>{q.difficulty}</span>
          <span className="px-2 py-0.5 rounded-lg text-[10px] text-green-700 bg-green-50 font-bold">+5 marks</span>
        </div>
        {q.type === 'AR' ? (
          <div className="mb-4 space-y-2">
            {q.text.split('\n').map((line, li) => (
              <div key={li} className={`p-3 rounded-lg text-sm font-medium leading-relaxed ${li === 0 ? 'bg-indigo-50 text-indigo-900 border border-indigo-200' : 'bg-amber-50 text-amber-900 border border-amber-200'}`}>{line}</div>
            ))}
          </div>
        ) : (
          <p className="text-sm font-medium text-gray-900 leading-relaxed mb-4">{q.text}</p>
        )}
        <div className="space-y-2">
          {q.options.map((opt, oi) => (
            <button key={oi} onClick={() => setAnswers(a => ({ ...a, [currentQ]: oi }))}
              className="w-full flex items-start gap-3 px-4 py-3 rounded-xl text-sm text-left transition"
              style={{ border: '1.5px solid', borderColor: answers[currentQ] === oi ? '#7c3aed' : '#e5e7eb', background: answers[currentQ] === oi ? '#f5f0ff' : '#fff', color: answers[currentQ] === oi ? '#4c1d95' : '#374151', fontWeight: answers[currentQ] === oi ? 600 : 400 }}>
              <span className="w-6 h-6 min-w-[24px] rounded-full border-[1.5px] flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ borderColor: 'currentColor' }}>
                {String.fromCharCode(65 + oi)}
              </span>
              <span>{opt}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Nav buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <button onClick={() => nav(Math.max(0, currentQ - 1))} disabled={currentQ === 0} className="px-3 py-2 rounded-lg border text-xs font-semibold text-gray-600 border-gray-300 disabled:opacity-40">← Prev</button>
        <button onClick={() => setMarked(m => ({ ...m, [currentQ]: !m[currentQ] }))}
          className="px-3 py-2 rounded-lg border text-xs font-semibold"
          style={{ background: marked[currentQ] ? '#fef3c7' : '#fff', borderColor: marked[currentQ] ? '#d97706' : '#e5e7eb', color: marked[currentQ] ? '#92400e' : '#6b7280' }}>
          {marked[currentQ] ? '⭐ Marked' : '☆ Mark for Review'}
        </button>
        <div className="flex-1" />
        <button onClick={() => nav(Math.min(questions.length - 1, currentQ + 1))} disabled={currentQ === questions.length - 1} className="px-3 py-2 rounded-lg border text-xs font-semibold text-gray-600 border-gray-300 disabled:opacity-40">Next →</button>
        <button onClick={trySubmit} className="px-5 py-2 rounded-lg text-xs font-bold" style={{ background: 'linear-gradient(90deg,#c9a84c,#e8b840)', color: '#0a1f5c' }}>Submit Paper ✓</button>
      </div>
    </div>
  );

  // ── RESULT ──
  if (phase === 'result' && result) {
    const g = getMockGrade(result.pct);
    const sections = {};
    questions.forEach((q, i) => {
      if (!sections[q.section]) sections[q.section] = { correct: 0, wrong: 0, total: 0 };
      sections[q.section].total++;
      const a = result.answers[i];
      if (a === q.correctOption) sections[q.section].correct++;
      else if (a !== undefined) sections[q.section].wrong++;
    });

    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow">
          <div className="p-5 text-white text-center" style={{ background: 'linear-gradient(135deg,#0a1f5c,#4c1d95)' }}>
            <div className="text-[10px] font-bold tracking-widest uppercase text-white/40 mb-1">NTA CUET 2026 — Result</div>
            <div className="font-bold text-sm text-white">{test.name}</div>
          </div>
          <div className="p-6">
            <div className="flex flex-col items-center mb-5">
              <div className="w-32 h-32 rounded-full flex flex-col items-center justify-center mb-3 border-[6px]"
                style={{ borderColor: result.pct >= 60 ? '#7c3aed' : result.pct >= 40 ? '#d97706' : '#dc2626' }}>
                <div className="font-black text-3xl" style={{ fontFamily: "'Playfair Display', serif", color: '#0a1f5c' }}>{result.pct}%</div>
                <div className="text-[10px] text-gray-400">Score</div>
              </div>
              <div className="inline-block px-5 py-1 rounded-full text-sm font-bold mb-1" style={{ background: g.bg, color: g.color }}>{g.grade} — {g.label}</div>
              <div className="text-xs text-gray-400">CUET Estimated Percentile: <strong className="text-gray-700">{cuetPercentile(result.pct)}</strong></div>
            </div>

            <div className="rounded-xl p-4 mb-5 text-sm" style={{ background: '#f8f9ff', border: '1px solid #e0e7ff' }}>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Marks Breakdown (+5 / −1)</div>
              <div className="space-y-1.5">
                <div className="flex justify-between"><span className="text-green-700">✓ {result.correct} Correct × 5</span><span className="font-bold text-green-700">+{result.correct * 5}</span></div>
                <div className="flex justify-between"><span className="text-red-600">✗ {result.wrong} Wrong × 1</span><span className="font-bold text-red-600">−{result.wrong}</span></div>
                <div className="flex justify-between"><span className="text-gray-400">— {result.skipped} Unattempted</span><span className="font-bold text-gray-400">0</span></div>
                <div className="border-t border-gray-200 pt-1.5 flex justify-between">
                  <span className="font-bold text-gray-800">Net Score</span>
                  <span className="font-black" style={{ fontFamily: "'Playfair Display', serif", color: '#0a1f5c' }}>{result.score} / {result.maxScore}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-5">
              {[{ num: result.correct, label: 'Correct', color: '#16a34a' }, { num: result.wrong, label: 'Wrong', color: '#dc2626' }, { num: result.skipped, label: 'Skipped', color: '#d97706' }].map(s => (
                <div key={s.label} className="rounded-xl p-3 text-center bg-gray-50">
                  <div className="font-bold text-2xl" style={{ fontFamily: "'Playfair Display', serif", color: s.color }}>{s.num}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            <div className="mb-5">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Section-wise Performance</div>
              {Object.entries(sections).map(([sec, data]) => (
                <div key={sec} className="mb-2">
                  <div className="flex justify-between text-xs text-gray-600 mb-0.5">
                    <span className="font-medium">{sec}</span>
                    <span>{data.correct}/{data.total} correct</span>
                  </div>
                  <div className="h-4 bg-gray-100 rounded-full overflow-hidden flex">
                    <div className="h-full rounded-l-full" style={{ width: `${(data.correct / data.total) * 100}%`, background: '#7c3aed' }} />
                    <div className="h-full" style={{ width: `${(data.wrong / data.total) * 100}%`, background: '#fca5a5' }} />
                  </div>
                </div>
              ))}
            </div>

            <button onClick={onBack} className="w-full py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: '#0a1f5c' }}>← Back to Mock Tests</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
