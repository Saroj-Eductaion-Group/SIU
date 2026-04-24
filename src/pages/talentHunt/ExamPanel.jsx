import { useState, useEffect, useRef } from 'react';
import { getQuestions, calcGrade, DATE_MAP } from './thData';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API  = `${BASE}/registrations`;

export default function ExamPanel({ onShowResults }) {
  const [showForgot, setShowForgot] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotResult, setForgotResult] = useState(null);
  const [forgotErr, setForgotErr] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [screen, setScreen] = useState('login');

  const findAppId = async () => {
    setForgotErr(''); setForgotResult(null);
    if (!forgotInput.trim()) return setForgotErr('Please enter your mobile number.');
    setForgotLoading(true);
    try {
      const res = await fetch(`${API}/forgot-appid`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mobile: forgotInput.trim() })
      });
      const data = await res.json();
      if (res.ok) setForgotResult(data);
      else setForgotErr(data.message);
    } catch { setForgotErr('Cannot connect to server.'); }
    setForgotLoading(false);
  };
  const [loginId, setLoginId]     = useState('');
  const [loginMsg, setLoginMsg]   = useState({ type:'', text:'' });
  const [loading, setLoading]     = useState(false);
  const [candidate, setCandidate] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ]   = useState(0);
  const [answers, setAnswers]     = useState({});   // { qIndex: optionIndex }
  const [skipped, setSkipped]     = useState({});   // { qIndex: true }
  const [timeLeft, setTimeLeft]   = useState(1500);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult]       = useState(null);
  const [reviewMode, setReviewMode] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (screen === 'exam' && !submitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) { clearInterval(timerRef.current); doFinalize(true); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [screen, submitted]);

  const fmt = s => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;

  const login = async () => {
    setLoginMsg({ type:'', text:'' });
    const id = loginId.trim().toUpperCase();
    if (!id) return setLoginMsg({ type:'error', text:'Please enter your Application ID.' });
    setLoading(true);
    try {
      const res = await fetch(`${API}/${id}`);
      if (res.status === 404) { setLoginMsg({ type:'error', text:'Application ID not found. Please check or register first.' }); setLoading(false); return; }
      const r = await res.json();
      if (r.status === 'Pending')  { setLoginMsg({ type:'warning', text:'Your application is pending admin approval. Please check back later.' }); setLoading(false); return; }
      if (r.status === 'Rejected') { setLoginMsg({ type:'error', text:'Your application has been rejected. Please contact admissions.' }); setLoading(false); return; }
      if (r.score !== null && r.score !== undefined) {
        setLoginMsg({ type:'info', text:`Exam already completed. You scored ${r.score}% (Grade ${r.grade}).` });
        setLoading(false); return;
      }

      // Date check — exam only on selected date (unless admin override)
      if (!r.examOverride) {
        const today = new Date();
        const examDateStr = r.examDate || '';
        const mapped = DATE_MAP[examDateStr];
        if (mapped) {
          const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const examDateOnly = new Date(mapped.date);
          examDateOnly.setHours(0,0,0,0);
          if (todayDate < examDateOnly) {
            setLoginMsg({ type:'warning', text:`Your exam is scheduled on ${examDateStr} (${mapped.slot}). Exam portal will open on that date only.` });
            setLoading(false); return;
          }
          if (todayDate > examDateOnly) {
            setLoginMsg({ type:'error', text:`Your exam date (${examDateStr}) has passed. Please contact the admissions office.` });
            setLoading(false); return;
          }
        }
      }
      setCandidate(r);
      setQuestions(getQuestions(r.courses || []));
      setCurrentQ(0); setAnswers({}); setSkipped({}); setTimeLeft(3600); setSubmitted(false);
      setScreen('exam');
    } catch { setLoginMsg({ type:'error', text:'Cannot connect to server. Make sure backend is running.' }); }
    setLoading(false);
  };

  const skipQuestion = () => {
    setSkipped(p => ({ ...p, [currentQ]: true }));
    if (currentQ < questions.length - 1) setCurrentQ(q => q + 1);
  };

  const doFinalize = async (auto = false) => {
    if (submitted) return;
    setSubmitted(true);
    clearInterval(timerRef.current);
    let earnedMarks = 0;
    let totalMarks = 0;
    const sectionData = {};
    questions.forEach((q, i) => {
      const qMarks = q.marks || 1;
      totalMarks += qMarks;
      if (!sectionData[q.sec]) sectionData[q.sec] = { total:0, correct:0, totalMarks:0, earnedMarks:0 };
      sectionData[q.sec].total++;
      sectionData[q.sec].totalMarks += qMarks;
      if (answers[i] === q.ans) {
        earnedMarks += qMarks;
        sectionData[q.sec].correct++;
        sectionData[q.sec].earnedMarks += qMarks;
      }
    });
    const pct = Math.round(earnedMarks / totalMarks * 100);
    const { grade, scholarship, color: gColor, bg: gBg } = calcGrade(pct);
    const attempted = Object.keys(answers).length;
    const skippedCount = Object.keys(skipped).length;
    const res = {
      pct, correct: earnedMarks, totalMarks,
      wrong: attempted - Object.values(answers).filter((a,i) => questions[i] && a === questions[i].ans).length,
      skippedCount,
      grade, gColor, gBg, scholarship, sectionData,
      questions, answers, skipped
    };
    setResult(res);
    try {
      await fetch(`${API}/result/${candidate.appId}`, {
        method:'PATCH', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ score: pct, grade, sectionData })
      });
    } catch {}
    setScreen('result');
  };

  const confirmSubmit = () => {
    const unanswered = questions.length - Object.keys(answers).length;
    const skippedCount = Object.keys(skipped).length;
    const msg = [];
    if (unanswered > 0) msg.push(`${unanswered} unanswered`);
    if (skippedCount > 0) msg.push(`${skippedCount} skipped`);
    if (msg.length > 0 && !window.confirm(`You have ${msg.join(' and ')} question(s). Are you sure you want to submit?`)) return;
    doFinalize();
  };

  const msgStyle = {
    error:'bg-red-50 border-red-200 text-red-700',
    warning:'bg-amber-50 border-amber-200 text-amber-700',
    info:'bg-blue-50 border-blue-200 text-blue-700'
  };

  // Q dot color
  const qDotClass = (i) => {
    if (i === currentQ) return 'border-orange-400 border-2 text-orange-600 bg-orange-50';
    if (answers[i] !== undefined) return 'bg-blue-700 text-white border-blue-700';
    if (skipped[i]) return 'bg-amber-400 text-white border-amber-400';
    return 'border-gray-200 text-gray-500 hover:border-blue-400';
  };

  // ─── REVIEW SCREEN ───
  if (screen === 'result' && result && reviewMode) {
    return (
      <div>
        <div className="bg-blue-800 rounded-2xl p-4 mb-4 flex justify-between items-center">
          <div>
            <h3 className="text-white font-bold text-sm sm:text-base">Answer Review</h3>
            <p className="text-blue-300 text-xs mt-0.5">{candidate.firstName} {candidate.lastName} — Score: {result.pct}% (Grade {result.grade})</p>
          </div>
          <button onClick={() => setReviewMode(false)} className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg border border-blue-400">← Back to Result</button>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-4 text-xs font-semibold">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-green-500 inline-block"/> Correct</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-red-500 inline-block"/> Wrong</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-amber-400 inline-block"/> Skipped</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gray-300 inline-block"/> Not Attempted</span>
        </div>

        {result.questions.map((q, i) => {
          const userAns = result.answers[i];
          const isCorrect = userAns === q.ans;
          const isSkipped = result.skipped[i];
          const isUnattempted = userAns === undefined && !isSkipped;
          const headerColor = isCorrect ? 'bg-green-50 border-green-200' : isSkipped ? 'bg-amber-50 border-amber-200' : isUnattempted ? 'bg-gray-50 border-gray-200' : 'bg-red-50 border-red-200';
          const statusText = isCorrect ? '✓ Correct' : isSkipped ? '⟳ Skipped' : isUnattempted ? '— Not Attempted' : '✗ Wrong';
          const statusColor = isCorrect ? 'text-green-600' : isSkipped ? 'text-amber-600' : isUnattempted ? 'text-gray-400' : 'text-red-600';

          return (
            <div key={i} className={`border rounded-2xl mb-3 overflow-hidden ${headerColor}`}>
              <div className="flex justify-between items-center px-4 py-2 border-b border-inherit">
                <span className="text-xs font-bold text-gray-500">Q{i+1} · {q.sec}</span>
                <span className={`text-xs font-bold ${statusColor}`}>{statusText}</span>
              </div>
              <div className="p-4">
                <p className="text-sm font-medium text-gray-800 mb-3">{q.q}</p>
                <div className="space-y-2">
                  {q.opts.map((opt, j) => {
                    const isUserChoice = userAns === j;
                    const isCorrectOpt = q.ans === j;
                    let cls = 'border-gray-200 bg-white text-gray-600';
                    if (isCorrectOpt) cls = 'border-green-500 bg-green-50 text-green-800 font-semibold';
                    else if (isUserChoice && !isCorrect) cls = 'border-red-400 bg-red-50 text-red-700';
                    return (
                      <div key={j} className={`flex items-center gap-3 px-3 py-2 border-2 rounded-xl text-xs ${cls}`}>
                        <span className="font-bold shrink-0">{String.fromCharCode(65+j)}.</span>
                        <span className="flex-1">{opt}</span>
                        {isCorrectOpt && <span className="text-green-600 font-bold shrink-0">✓ Correct</span>}
                        {isUserChoice && !isCorrect && <span className="text-red-500 font-bold shrink-0">Your Answer</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}

        <div className="text-center mt-4 pb-4">
          <button onClick={onShowResults} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg text-sm transition">View Full Results Sheet →</button>
        </div>
      </div>
    );
  }

  // ─── RESULT SCREEN ───
  if (screen === 'result' && result) {
    const ringColor = result.grade==='A'?'border-green-500':result.grade==='F'?'border-red-500':'border-blue-700';
    return (
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="text-center p-6 sm:p-8 border-b border-gray-100">
          <p className="text-xs text-gray-400 mb-2">SIUAT — Saroj International University Aptitude Test 2026-27 — Result</p>
          <p className="text-base sm:text-lg font-bold text-blue-800 mb-5">{candidate.firstName} {candidate.lastName} — {candidate.appId}</p>
          <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 ${ringColor} flex flex-col items-center justify-center mx-auto mb-4`}>
            <span className={`text-3xl sm:text-4xl font-bold font-outfit ${result.gColor}`}>{result.pct}%</span>
            <span className="text-xs text-gray-400">Score</span>
          </div>
          <span className={`inline-block px-6 py-2 rounded-full text-base font-bold mb-2 ${result.gBg}`}>
            Grade {result.grade}
          </span>
          {result.scholarship && (
            <div className="text-sm font-bold text-green-700 mb-2">🏆 {result.scholarship}</div>
          )}
          <p className="text-sm text-gray-500">{result.correct} marks out of {result.totalMarks} total marks</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 p-4 sm:p-5 border-b border-gray-100">
          <div className="bg-green-50 rounded-xl p-3 text-center"><div className="text-xl sm:text-2xl font-bold text-green-600 font-outfit">{result.correct}</div><div className="text-xs text-gray-500 mt-1">Marks Earned</div></div>
          <div className="bg-red-50 rounded-xl p-3 text-center"><div className="text-xl sm:text-2xl font-bold text-red-500 font-outfit">{result.wrong}</div><div className="text-xs text-gray-500 mt-1">Wrong</div></div>
          <div className="bg-amber-50 rounded-xl p-3 text-center"><div className="text-xl sm:text-2xl font-bold text-amber-600 font-outfit">{result.skippedCount}</div><div className="text-xs text-gray-500 mt-1">Skipped</div></div>
        </div>

        {/* Section Performance */}
        <div className="p-4 sm:p-5 border-b border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Section-wise Performance</p>
          {Object.entries(result.sectionData).map(([sec, d]) => {
            const sp = Math.round(d.correct/d.total*100);
            const bc = sp>=75?'bg-green-500':sp>=50?'bg-blue-700':sp>=40?'bg-amber-500':'bg-red-500';
            return (
              <div key={sec} className="flex items-center gap-3 mb-2">
                <span className="text-xs text-gray-500 w-20 sm:w-24 text-right shrink-0">{sec}</span>
                <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${bc} rounded-full flex items-center justify-end pr-2`} style={{width:`${sp}%`}}>
                    <span className="text-white text-xs font-bold">{sp}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scholarship Banner */}
        {result.scholarship && (
          <div className="mx-4 sm:mx-5 mt-4 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-xl p-4 flex items-center gap-3 text-white">
            <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-xl shrink-0">🏆</div>
            <div>
              <p className="font-bold text-sm">Scholarship Qualified!</p>
              <p className="text-xs opacity-90 mt-0.5">You qualify for <strong>{result.scholarship}</strong> at SIU for Session 2026-27. Our admissions team will contact you shortly.</p>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="p-4 sm:p-5 flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => setReviewMode(true)} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2">
            📋 Review Answers
          </button>
          <button onClick={onShowResults} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2">
            🏆 View Full Results Sheet
          </button>
        </div>
      </div>
    );
  }

  // ─── EXAM SCREEN ───
  if (screen === 'exam' && candidate) {
    const q = questions[currentQ];
    const answered = Object.keys(answers).length;
    const skippedCount = Object.keys(skipped).length;
    const timerCls = timeLeft<=60?'text-red-400':timeLeft<=300?'text-amber-300':'text-orange-300';
    const totalTime = 3600;

    return (
      <div>
        {/* Exam Header */}
        <div className="bg-blue-800 rounded-2xl p-4 mb-3">
          <div className="flex justify-between items-start gap-3">
            <div className="min-w-0">
              <h3 className="text-white font-bold text-sm sm:text-base truncate">{candidate.firstName} {candidate.lastName} — {candidate.appId}</h3>
              <p className="text-blue-300 text-xs mt-1 truncate">Course: {(candidate.courses||[]).slice(0,2).join(', ')} | {candidate.examDate}</p>
            </div>
            <div className="text-right shrink-0">
              <div className={`text-2xl sm:text-3xl font-bold font-outfit ${timerCls}`}>{fmt(timeLeft)}</div>
              <p className="text-blue-400 text-xs">Time Left</p>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1 bg-blue-600 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-orange-400 rounded-full transition-all" style={{width:`${(timeLeft/totalTime)*100}%`}}/>
          </div>
        </div>

        {/* Question Navigator */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 mb-3 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Navigator</span>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-blue-700 inline-block"/> {answered} Answered</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-amber-400 inline-block"/> {skippedCount} Skipped</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-gray-200 inline-block"/> {questions.length - answered - skippedCount} Left</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {questions.map((_,i) => (
              <button key={i} onClick={()=>setCurrentQ(i)}
                className={`w-8 h-8 rounded-lg text-xs font-bold border-2 transition ${qDotClass(i)}`}>
                {i+1}
              </button>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 mb-3 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <p className="text-xs font-bold text-orange-500 uppercase tracking-widest">Q{currentQ+1} of {questions.length} · {q.sec} · <span className="text-blue-600">{q.marks} mark{q.marks>1?'s':''}</span></p>
            {skipped[currentQ] && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-semibold">Skipped</span>}
          </div>
          <p className="text-sm sm:text-base font-medium text-gray-800 leading-relaxed mb-4">{q.q}</p>
          {q.opts.map((opt,i) => (
            <div key={i} onClick={()=>{ setAnswers(p=>({...p,[currentQ]:i})); setSkipped(p=>{ const n={...p}; delete n[currentQ]; return n; }); }}
              className={`flex items-center gap-3 p-3 border-2 rounded-xl mb-2 cursor-pointer transition ${answers[currentQ]===i?'border-blue-700 bg-blue-50 text-blue-800 font-medium':'border-gray-200 hover:border-blue-400 text-gray-700'}`}>
              <div className={`w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold shrink-0 ${answers[currentQ]===i?'border-blue-700 text-blue-700 bg-blue-100':'border-gray-300 text-gray-400'}`}>
                {String.fromCharCode(65+i)}
              </div>
              <span className="text-sm">{opt}</span>
            </div>
          ))}
        </div>

        {/* Nav Buttons */}
        <div className="flex gap-2 items-center flex-wrap">
          <button disabled={currentQ===0} onClick={()=>setCurrentQ(q=>q-1)}
            className="border border-gray-300 text-gray-600 hover:border-blue-700 hover:text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm transition disabled:opacity-40">
            ← Prev
          </button>
          <button onClick={skipQuestion}
            className="border border-amber-400 text-amber-600 hover:bg-amber-50 font-semibold px-4 py-2 rounded-lg text-sm transition">
            Skip →
          </button>
          <div className="flex-1"/>
          {currentQ < questions.length - 1 ? (
            <button onClick={()=>setCurrentQ(q=>q+1)}
              className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2 rounded-lg text-sm transition">
              Next →
            </button>
          ) : (
            <button onClick={confirmSubmit}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-lg text-sm transition">
              Submit ✓
            </button>
          )}
        </div>
      </div>
    );
  }

  // ─── LOGIN SCREEN ───
  return (
    <div className="max-w-md mx-auto py-8 px-4">
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-xl font-outfit">SIU</div>
          <h3 className="text-blue-800 font-bold text-xl font-outfit">Exam Portal Login</h3>
          <p className="text-gray-400 text-xs mt-1">Session 2026-27 | SIUAT — Saroj International University Aptitude Test</p>
        </div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">Candidate Login</p>
        <div className="mb-4">
          <label className="block text-xs font-semibold text-gray-700 mb-1">Application ID <span className="text-red-500">*</span></label>
          <input value={loginId} onChange={e=>setLoginId(e.target.value)} onKeyDown={e=>e.key==='Enter'&&login()}
            placeholder="e.g. SIU123456"
            className="w-full border border-gray-300 rounded-lg px-3 py-3 text-center font-bold text-lg tracking-widest focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700"/>
        </div>
        <button onClick={login} disabled={loading} className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg text-sm transition disabled:opacity-60">
          {loading ? 'Checking...' : 'Access My Exam →'}
        </button>
        {loginMsg.text && (
          <div className={`mt-3 text-sm border rounded-lg px-3 py-2 ${msgStyle[loginMsg.type]}`}>
            {loginMsg.text}
            {loginMsg.type === 'info' && (
              <button onClick={onShowResults} className="block mt-2 w-full bg-blue-700 text-white text-xs font-semibold py-1.5 rounded-lg">View Results →</button>
            )}
          </div>
        )}
        <p className="text-center text-xs text-gray-400 mt-4">Don't have an ID? <button onClick={()=>window.dispatchEvent(new CustomEvent('th-tab', {detail:'registration'}))} className="text-blue-700 font-semibold hover:underline">Register here</button></p>

        {/* Forgot App ID */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <button onClick={()=>{ setShowForgot(!showForgot); setForgotResult(null); setForgotErr(''); setForgotInput(''); }}
            className="w-full text-xs text-gray-500 hover:text-blue-700 font-semibold transition">
            🔍 Forgot your Application ID?
          </button>

          {showForgot && (
            <div className="mt-3 bg-blue-50 border border-blue-200 rounded-xl p-4">
              <p className="text-xs font-bold text-blue-800 mb-3">Find your Application ID</p>
              <input
                value={forgotInput}
                onChange={e=>setForgotInput(e.target.value)}
                onKeyDown={e=>e.key==='Enter'&&findAppId()}
                placeholder="Enter registered mobile number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-700 mb-2"
              />
              <button onClick={findAppId} disabled={forgotLoading}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white text-xs font-semibold py-2 rounded-lg transition disabled:opacity-60">
                {forgotLoading ? 'Searching...' : 'Find My Application ID'}
              </button>
              {forgotErr && <p className="mt-2 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{forgotErr}</p>}
              {forgotResult && (
                <div className="mt-2 bg-green-50 border border-green-200 rounded-lg p-3">
                  <p className="text-xs text-green-700 font-semibold mb-1">✓ Application Found!</p>
                  <p className="text-xs text-gray-600">Name: <strong>{forgotResult.name}</strong></p>
                  <p className="text-xs text-gray-600">Exam Date: <strong>{forgotResult.examDate}</strong></p>
                  <p className="text-xs text-gray-600">Status: <strong>{forgotResult.status}</strong></p>
                  <div className="mt-2 bg-blue-700 text-white text-center font-bold tracking-widest py-2 rounded-lg text-sm">{forgotResult.appId}</div>
                  <button onClick={()=>{ setLoginId(forgotResult.appId); setShowForgot(false); }}
                    className="mt-2 w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold py-1.5 rounded-lg transition">
                    Use this ID to Login →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
