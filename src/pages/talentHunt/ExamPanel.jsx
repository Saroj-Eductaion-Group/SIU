import { useState, useEffect, useRef } from 'react';
import { getQuestions, calcGrade } from './thData';

const OR_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const OR_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OR_MODEL = 'google/gemma-4-31b-it:free';

function buildGeminiHeaders() {
  return {}; // unused — kept for compatibility
}

function buildGeminiUrl() {
  return ''; // unused — kept for compatibility
}

async function callGemini(prompt) {
  if (!OR_KEY || OR_KEY.length < 10) return '';
  try {
    const seed = Date.now() + '-' + Math.random().toString(36).slice(2);
    const res = await fetch(OR_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + OR_KEY,
        'HTTP-Referer': 'https://sarojuniversity.edu.in',
        'X-Title': 'SIU SIUAT AI Analysis'
      },
      body: JSON.stringify({
        model: OR_MODEL,
        messages: [{ role: 'user', content: '[seed:' + seed + '] ' + prompt }],
        temperature: 0.85 + Math.random() * 0.1,
        max_tokens: 700
      })
    });
    if (!res.ok) return '';
    const data = await res.json();
    return data?.choices?.[0]?.message?.content || '';
  } catch { return ''; }
}

async function getSiuatAIAnalysis(pct, correct, wrong, skipped, sectionData) {
  const secText = Object.entries(sectionData).map(([s, d]) => s + ': ' + d.correct + '/' + d.total + ' correct').join(', ');
  return callGemini('You are an expert SIUAT counselor. A student scored ' + pct + '% (' + correct + ' marks earned, ' + wrong + ' wrong, ' + skipped + ' skipped). Section breakdown: ' + secText + '.\n\nProvide a personalized 4-point analysis:\n1. **Overall Assessment**: How did the student perform?\n2. **Strongest Section**: Which area shows mastery?\n3. **Weakest Section**: Which area needs urgent attention?\n4. **Action Plan**: One specific actionable tip for the next attempt.\n\nBe encouraging, specific, and vary your language. This is for scholarship eligibility at Saroj International University.');
}

async function getQuestionAIAnalysis(questionText, opts, correctIndex, selectedIndex, section, marks) {
  const difficulty = marks === 1 ? 'Easy' : marks === 2 ? 'Medium' : marks === 3 ? 'Hard' : 'Advanced';
  const correctText = opts[correctIndex];
  const selectedText = selectedIndex !== undefined ? opts[selectedIndex] : 'Not attempted';
  const isWrong = selectedIndex !== undefined && selectedIndex !== correctIndex;
  const optionsText = opts.map((o, i) => String.fromCharCode(65 + i) + ') ' + o).join(' | ');
  const wrongPart = isWrong ? '**Why "' + selectedText + '" is Wrong:**\n(Explain the mistake and common misconception)\n\n' : '';
  return callGemini('You are a SIUAT exam expert. Analyze this question:\n\nQuestion: ' + questionText + '\nOptions: ' + optionsText + '\nCorrect Answer: ' + correctText + '\nStudent Answer: ' + selectedText + '\nSection: ' + section + ' | Difficulty: ' + difficulty + '\n\n**Concept Behind This Question:**\n(Identify the exact concept tested)\n\n**Why the Correct Answer is Right:**\n(Explain with underlying concept or calculation)\n\n' + wrongPart + '**Option-Level Intelligence:**\n(Why each option is correct/incorrect, how distractors are designed)\n\n**Similar Question Patterns:**\n(2-3 different question types from the same concept)\n\n**Quick Revision Tip:**\n(One key formula, fact, or memory trick)\n\nKeep it concise and exam-focused.');
}

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API  = `${BASE}/registrations`;

// Helper: Secure shuffling algorithm
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function ExamPanel({ onShowResults }) {
  const [showForgot, setShowForgot] = useState(false);
  const [forgotInput, setForgotInput] = useState('');
  const [forgotResult, setForgotResult] = useState(null);
  const [forgotErr, setForgotErr] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [screen, setScreen] = useState('login');
  // Attempt history stored in localStorage per appId
  const getAttemptHistory = (id) => {
    try { return JSON.parse(localStorage.getItem(`siuat_attempts_${id}`) || '[]'); } catch { return []; }
  };
  const saveAttempt = (id, attempt) => {
    const prev = getAttemptHistory(id);
    localStorage.setItem(`siuat_attempts_${id}`, JSON.stringify([...prev, attempt]));
  };
  const [attemptHistory, setAttemptHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

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
  const [timeLeft, setTimeLeft]   = useState(3600);
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult]       = useState(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState('');
  const [aiLoading, setAiLoading]   = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [qAiAnalysis, setQAiAnalysis] = useState({});
  const [qAiLoading, setQAiLoading]   = useState({});
  const [showViolation, setShowViolation] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [violations, setViolations] = useState(0);
  const timerRef = useRef(null);

  // Time remaining tracking
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
      // Allow exam anytime after admin approval — no date restriction
      if (r.status !== 'Approved' && id !== 'TEST999') {
        setLoginMsg({ type:'warning', text:'Your application is pending admin approval. Please check back later.' });
        setLoading(false);
        return;
      }
      
      // Allow re-attempts — if exam was already completed, show history and let them retake
      if (r.score !== null && r.score !== undefined && id !== 'TEST999') {
        const history = getAttemptHistory(id);
        setAttemptHistory(history);
        setCandidate(r);
        setScreen('attempt-history');
        setLoading(false);
        return;
      }

      // Secure Backend login to fetch/write sessionToken
      let currentToken = null;
      try {
        const loginRes = await fetch(`${API}/login/${id}`, { method: 'POST' });
        if (loginRes.ok) {
          const loginData = await loginRes.json();
          if (loginData.sessionToken) {
            currentToken = loginData.sessionToken;
            sessionStorage.setItem(`siuat_session_token_${id}`, loginData.sessionToken);
          }
        }
      } catch (err) {
        console.warn("Session token setup failed on server:", err);
      }

      // Auto-Save Resilience Check
      const savedStateRaw = localStorage.getItem(`siuat_exam_state_${id}`);
      if (savedStateRaw && id !== 'TEST999') {
        try {
          const savedState = JSON.parse(savedStateRaw);
          setCandidate(r);
          setQuestions(savedState.questions);
          setAnswers(savedState.answers);
          setCurrentQ(savedState.currentQ);
          setSkipped(savedState.skipped || {});
          setTimeLeft(savedState.timeLeft);
          setSubmitted(false);
          setScreen('exam');
          setLoading(false);
          return;
        } catch (e) {
          console.warn("Resuming state failed, starting fresh:", e);
        }
      }

      // Start fresh, prepare unique paper
      setCandidate(r);
      const qList = getQuestions(r.courses || []);
      
      // Partition by difficulty (marks based)
      const easy = qList.filter(x => x.marks === 1);
      const medium = qList.filter(x => x.marks === 2);
      const hard = qList.filter(x => x.marks === 3);
      const advanced = qList.filter(x => x.marks === 4);

      // All SIUAT paper questions are equal weight — shuffle entire set at once
      const shuffleOptions = (q) => {
        const originalCorrectText = q.opts[q.ans];
        const shuffledOpts = shuffleArray(q.opts);
        const newCorrectIndex = shuffledOpts.indexOf(originalCorrectText);
        return { ...q, opts: shuffledOpts, ans: newCorrectIndex === -1 ? q.ans : newCorrectIndex };
      };
      const finalQuestions = shuffleArray(qList).map(shuffleOptions);

      setQuestions(finalQuestions);
      setCurrentQ(0); setAnswers({}); setSkipped({}); setTimeLeft(3600); setSubmitted(false);
      setScreen('exam');
    } catch { setLoginMsg({ type:'error', text:'Cannot connect to server. Make sure backend is running.' }); }
    setLoading(false);
  };

  // Auto-Save sync hook
  useEffect(() => {
    if (screen === 'exam' && candidate && !submitted) {
      const stateToSave = {
        appId: candidate.appId,
        timeLeft,
        currentQ,
        answers,
        skipped,
        questions
      };
      localStorage.setItem(`siuat_exam_state_${candidate.appId}`, JSON.stringify(stateToSave));
      sessionStorage.setItem("siuat_active_appid", candidate.appId);
    }
  }, [screen, candidate, timeLeft, currentQ, answers, skipped, questions, submitted]);

  // ─── FULLSCREEN + TAB SWITCH MONITORING ───
  const requestFS = () => {
    const el = document.documentElement;
    if (el.requestFullscreen) el.requestFullscreen().catch(() => {});
    else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
  };

  useEffect(() => {
    if (screen !== 'exam' || submitted) return;

    const checkFS = () => {
      const fs = !!(document.fullscreenElement || document.webkitFullscreenElement);
      setIsFullscreen(fs);
      if (!fs) {
        setViolations(v => {
          const next = v + 1;
          setShowViolation(true);
          setTimeout(() => setShowViolation(false), 2500);
          if (next >= 3) setTimeout(() => doFinalize(), 2500);
          return next;
        });
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        setViolations(v => {
          const next = v + 1;
          setShowViolation(true);
          setTimeout(() => setShowViolation(false), 2500);
          if (next >= 3) setTimeout(() => doFinalize(), 2500);
          return next;
        });
      }
    };

    // Enter fullscreen immediately & track state
    requestFS();
    const timer = setTimeout(() => {
      setIsFullscreen(!!(document.fullscreenElement || document.webkitFullscreenElement));
    }, 500);

    document.addEventListener('fullscreenchange', checkFS);
    document.addEventListener('webkitfullscreenchange', checkFS);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('fullscreenchange', checkFS);
      document.removeEventListener('webkitfullscreenchange', checkFS);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [screen, submitted]);

  // One-device session check polling hook (every 15 seconds)
  useEffect(() => {
    if (screen === 'exam' && candidate && !submitted) {
      const interval = setInterval(async () => {
        try {
          const res = await fetch(`${API}/session-check/${candidate.appId}`);
          if (res.ok) {
            const data = await res.json();
            const currentToken = sessionStorage.getItem(`siuat_session_token_${candidate.appId}`);
            if (data.sessionToken && data.sessionToken !== currentToken) {
              clearInterval(interval);
              alert("Multiple logins detected! This exam session is active on another device. You will be logged out.");
              if (timerRef.current) clearInterval(timerRef.current);
              localStorage.removeItem(`siuat_exam_state_${candidate.appId}`);
              sessionStorage.removeItem("siuat_active_appid");
              sessionStorage.removeItem(`siuat_session_token_${candidate.appId}`);
              setScreen('login');
              setCandidate(null);
            }
          }
        } catch (e) {
          console.warn("Session check failed:", e);
        }
      }, 15000);
      return () => clearInterval(interval);
    }
  }, [screen, candidate, submitted]);

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
    let wrongCount = 0;
    const sectionData = {};

    let easyTotal = 0, easyCorrect = 0;
    let medTotal = 0, medCorrect = 0;
    let hardTotal = 0, hardCorrect = 0;
    let advTotal = 0, advCorrect = 0;

    questions.forEach((q, i) => {
      const qMarks = q.marks || 1;
      totalMarks += qMarks;
      if (!sectionData[q.sec]) sectionData[q.sec] = { total:0, correct:0, totalMarks:0, earnedMarks:0 };
      sectionData[q.sec].total++;
      sectionData[q.sec].totalMarks += qMarks;
      
      const isCorrect = answers[i] !== undefined && answers[i] === q.ans;
      if (answers[i] !== undefined) {
        if (isCorrect) {
          earnedMarks += qMarks;
          sectionData[q.sec].correct++;
          sectionData[q.sec].earnedMarks += qMarks;
        } else {
          wrongCount++;
        }
      }

      // Difficulty analytics
      if (qMarks === 1) {
        easyTotal++;
        if (isCorrect) easyCorrect++;
      } else if (qMarks === 2) {
        medTotal++;
        if (isCorrect) medCorrect++;
      } else if (qMarks === 3) {
        hardTotal++;
        if (isCorrect) hardCorrect++;
      } else if (qMarks === 4) {
        advTotal++;
        if (isCorrect) advCorrect++;
      }
    });

    const pct = Math.round(earnedMarks / totalMarks * 100);
    const { grade, scholarship, color: gColor, bg: gBg } = calcGrade(pct);
    const skippedCount = Object.keys(skipped).length;
    const timeTaken = 3600 - timeLeft;
    const avgTimePerQuestion = Math.round(timeTaken / (questions.length - skippedCount || 1));

    const difficultyAnalytics = {
      easy: { correct: easyCorrect, total: easyTotal, pct: Math.round((easyCorrect / (easyTotal || 1)) * 100) },
      medium: { correct: medCorrect, total: medTotal, pct: Math.round((medCorrect / (medTotal || 1)) * 100) },
      hard: { correct: hardCorrect, total: hardTotal, pct: Math.round((hardCorrect / (hardTotal || 1)) * 100) },
      advanced: { correct: advCorrect, total: advTotal, pct: Math.round((advCorrect / (advTotal || 1)) * 100) }
    };

    const res = {
      pct, correct: earnedMarks, totalMarks,
      wrong: wrongCount,
      skippedCount,
      timeTaken,
      avgTimePerQuestion,
      grade, gColor, gBg, scholarship, sectionData,
      difficultyAnalytics,
      questions, answers, skipped
    };
    
    setResult(res);

    // Trigger AI analysis for SIUAT result
    setAiAnalysis('');
    setAiLoading(true);
    setQAiAnalysis({});
    setQAiLoading({});
    setShowReview(false);
    getSiuatAIAnalysis(pct, earnedMarks, wrongCount, Object.keys(skipped).length, sectionData)
      .then(text => setAiAnalysis(text))
      .finally(() => setAiLoading(false));

    // Save attempt to local history before DB
    const attemptRecord = {
      attemptNo: getAttemptHistory(candidate.appId).length + 1,
      date: new Date().toLocaleDateString('en-IN'),
      score: pct,
      grade,
      correct: earnedMarks,
      wrong: wrongCount,
      skipped: skippedCount,
      timeTaken,
      sectionData: { ...sectionData }
    };
    saveAttempt(candidate.appId, attemptRecord);
    setAttemptHistory(getAttemptHistory(candidate.appId));
    try {
      await fetch(`${API}/result/${candidate.appId}`, {
        method:'PATCH', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          score: pct,
          grade,
          sectionData: {
            correct: earnedMarks,
            wrong: wrongCount,
            skipped: skippedCount,
            timeTaken,
            avgTimePerQuestion,
            difficultyAnalytics
          }
        })
      });
    } catch {}

    // Clean up local storage exam states immediately upon submission
    localStorage.removeItem(`siuat_exam_state_${candidate.appId}`);
    sessionStorage.removeItem("siuat_active_appid");
    sessionStorage.removeItem(`siuat_session_token_${candidate.appId}`);

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

  const qDotClass = (i) => {
    if (i === currentQ) return 'border-orange-400 border-2 text-orange-600 bg-orange-50';
    if (answers[i] !== undefined) return 'bg-blue-700 text-white border-blue-700';
    if (skipped[i]) return 'bg-amber-400 text-white border-amber-400';
    return 'border-gray-200 text-gray-500 hover:border-blue-400';
  };

  // ─── RESULT SCREEN ───
  if (screen === 'result' && result) {
    const secEntries = Object.entries(result.sectionData).filter(
      ([k]) => !['correct','wrong','skipped','timeTaken','avgTimePerQuestion','difficultyAnalytics'].includes(k)
    );
    const weakest = secEntries.length
      ? secEntries.reduce((a, b) => (Math.round(a[1].correct/a[1].total*100) < Math.round(b[1].correct/b[1].total*100) ? a : b))[0]
      : null;
    const strongest = secEntries.length
      ? secEntries.reduce((a, b) => (Math.round(a[1].correct/a[1].total*100) > Math.round(b[1].correct/b[1].total*100) ? a : b))[0]
      : null;
    const attempted = Object.keys(result.answers).length;
    const notAttempted = result.questions.length - attempted - result.skippedCount;
    const accuracy = attempted > 0 ? Math.round((result.correct / 2 / attempted) * 100) : 0;
    const gradeColor = result.grade==='A+'?'#b45309':result.grade==='A'?'#16a34a':result.grade==='B'?'#1d4ed8':result.grade==='C'?'#d97706':'#dc2626';
    const gradeBg = result.grade==='A+'?'#fefce8':result.grade==='A'?'#f0fdf4':result.grade==='B'?'#eff6ff':result.grade==='C'?'#fef3c7':'#fef2f2';
    const secIcons = { Biology:'🧬', Chemistry:'🧪', English:'📖', Mathematics:'📐' };

    return (
      <div className="space-y-4" id="printable-report-card">
        <style>{`@media print{body *{visibility:hidden}#printable-report-card,#printable-report-card *{visibility:visible}#printable-report-card{position:absolute;left:0;top:0;width:100%;padding:20px}.print-hide{display:none!important}}`}</style>

        {/* ── HERO HEADER ── */}
        <div className="rounded-2xl overflow-hidden shadow-sm" style={{background:'linear-gradient(135deg,#0a1f5c 0%,#1e3a8a 60%,#1d4ed8 100%)'}}>
          <div className="px-5 py-4 flex items-center justify-between border-b" style={{borderColor:'rgba(255,255,255,0.1)'}}>
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase" style={{color:'rgba(255,255,255,0.45)'}}>SIUAT 2026-27 · Saroj International University</p>
              <p className="text-white font-bold text-base mt-0.5">{candidate.firstName} {candidate.lastName}</p>
              <p className="text-[11px] font-mono mt-0.5" style={{color:'rgba(255,255,255,0.4)'}}>{candidate.appId} · {(candidate.courses||[]).join(', ')}</p>
            </div>
            <div className="text-right shrink-0">
              <div className="text-3xl font-black font-outfit" style={{color: result.grade==='A+'?'#fbbf24':result.grade==='A'?'#34d399':result.grade==='B'?'#60a5fa':'#f87171'}}>{result.pct}%</div>
              <div className="text-[10px] uppercase tracking-widest" style={{color:'rgba(255,255,255,0.4)'}}>Overall Score</div>
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x" style={{divideColor:'rgba(255,255,255,0.1)'}}>
            {[
              {label:'Marks Earned', val:`${result.correct}/${result.totalMarks}`, color:'#34d399'},
              {label:'Questions Attempted', val:`${attempted}/50`, color:'#60a5fa'},
              {label:'Accuracy', val:`${accuracy}%`, color:'#fbbf24'},
              {label:'Time Taken', val:`${Math.floor(result.timeTaken/60)}m ${result.timeTaken%60}s`, color:'#c4b5fd'},
            ].map(s => (
              <div key={s.label} className="px-4 py-3 text-center">
                <div className="font-bold text-lg font-outfit" style={{color:s.color}}>{s.val}</div>
                <div className="text-[9px] uppercase tracking-wider mt-0.5" style={{color:'rgba(255,255,255,0.4)'}}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── GRADE + SCHOLARSHIP ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="rounded-2xl p-5 flex items-center gap-4 border" style={{background: gradeBg, borderColor: gradeColor+'33'}}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl font-black shrink-0 border-2" style={{background: gradeColor+'18', borderColor: gradeColor+'44', color: gradeColor}}>
              {result.grade}
            </div>
            <div>
              <p className="font-bold text-sm" style={{color: gradeColor}}>Grade {result.grade}</p>
              <p className="text-xs text-gray-500 mt-0.5">
                {result.grade==='A+'?'Outstanding — Top 10% Candidate':result.grade==='A'?'Excellent — Well above average':result.grade==='B'?'Good — Above average performance':result.grade==='C'?'Average — Needs improvement':'Below average — Revise syllabus'}
              </p>
            </div>
          </div>
          <div className="rounded-2xl p-5 flex items-center gap-4" style={{background: result.scholarship?'linear-gradient(135deg,#78350f,#b45309)':'#f9fafb', border: result.scholarship?'none':'1px solid #e5e7eb'}}>
            <div className="text-3xl shrink-0">{result.scholarship?'🏆':'📋'}</div>
            <div>
              <p className={`font-bold text-sm ${result.scholarship?'text-yellow-200':'text-gray-500'}`}>
                {result.scholarship ? 'Scholarship Qualified!' : 'Not Qualified for Scholarship'}
              </p>
              <p className={`text-xs mt-0.5 ${result.scholarship?'text-yellow-100/70':'text-gray-400'}`}>
                {result.scholarship ? `You qualify for ${result.scholarship} at SIU — Admissions team will contact you.` : 'Score 60%+ for merit certificate, 75%+ for scholarship.'}
              </p>
            </div>
          </div>
        </div>

        {/* ── QUICK STATS ROW ── */}
        <div className="grid grid-cols-4 gap-2">
          {[
            {val: attempted, label:'Attempted', icon:'✏️', bg:'#eff6ff', color:'#1d4ed8'},
            {val: result.correct/2, label:'Correct', icon:'✓', bg:'#f0fdf4', color:'#16a34a'},
            {val: result.wrong, label:'Wrong', icon:'✗', bg:'#fef2f2', color:'#dc2626'},
            {val: result.skippedCount + notAttempted, label:'Skipped/Left', icon:'—', bg:'#fef3c7', color:'#d97706'},
          ].map(s => (
            <div key={s.label} className="rounded-xl p-3 text-center" style={{background:s.bg}}>
              <div className="font-black text-xl font-outfit" style={{color:s.color}}>{s.val}</div>
              <div className="text-[10px] text-gray-400 font-semibold mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── SUBJECT-WISE DETAILED BREAKDOWN ── */}
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
          <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
            <p className="font-bold text-sm text-gray-800">📊 Subject-wise Performance Report</p>
            {weakest && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-50 text-red-600">⚠ Weakest: {weakest}</span>}
          </div>
          <div className="divide-y divide-gray-50">
            {secEntries.map(([sec, d]) => {
              const pct = Math.round(d.correct / d.total * 100);
              const correct = d.correct;
              const wrong = d.total - d.correct - (result.questions.filter((q,i) => q.sec===sec && result.answers[i]===undefined).length);
              const unattempted = result.questions.filter((q,i) => q.sec===sec && result.answers[i]===undefined).length;
              const color = pct>=75?'#16a34a':pct>=50?'#1d4ed8':pct>=35?'#d97706':'#dc2626';
              const bg = pct>=75?'#f0fdf4':pct>=50?'#eff6ff':pct>=35?'#fef3c7':'#fef2f2';
              const status = pct>=75?'Strong':pct>=50?'Average':pct>=35?'Weak':'Critical';
              const isWeakest = sec === weakest;
              const isStrongest = sec === strongest;
              return (
                <div key={sec} className="px-5 py-4" style={{background: isWeakest?'#fff5f5':isStrongest?'#f0fdf4':'#fff'}}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{secIcons[sec]||'📚'}</span>
                      <div>
                        <div className="font-semibold text-sm text-gray-900 flex items-center gap-1.5">
                          {sec}
                          {isWeakest && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-600">WEAKEST</span>}
                          {isStrongest && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-green-100 text-green-700">STRONGEST</span>}
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{d.total} questions · {d.totalMarks} marks</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-xl font-outfit" style={{color}}>{pct}%</div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full" style={{background:bg, color}}>{status}</span>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                    <div className="h-full rounded-full transition-all" style={{width:`${Math.max(pct,2)}%`, background:color}} />
                  </div>
                  {/* Stats pills */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="rounded-lg px-3 py-2 text-center bg-green-50">
                      <div className="font-bold text-sm text-green-700">{correct}</div>
                      <div className="text-[9px] text-gray-400">Correct</div>
                    </div>
                    <div className="rounded-lg px-3 py-2 text-center bg-red-50">
                      <div className="font-bold text-sm text-red-600">{wrong}</div>
                      <div className="text-[9px] text-gray-400">Wrong</div>
                    </div>
                    <div className="rounded-lg px-3 py-2 text-center bg-gray-50">
                      <div className="font-bold text-sm text-gray-500">{unattempted}</div>
                      <div className="text-[9px] text-gray-400">Not Attempted</div>
                    </div>
                  </div>
                  {/* Recommendation */}
                  {pct < 50 && (
                    <div className="mt-2.5 rounded-lg px-3 py-2 text-[11px] text-amber-800 font-medium" style={{background:'#fef3c7',border:'1px solid #fde68a'}}>
                      💡 Focus area: Revise {sec} concepts and attempt more practice questions.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ── TIME ANALYTICS ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="font-bold text-sm text-gray-800 mb-4">⏱ Time & Attempt Analytics</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              {label:'Total Time Spent', val:`${Math.floor(result.timeTaken/60)}m ${result.timeTaken%60}s`},
              {label:'Avg per Question', val:`${result.avgTimePerQuestion}s`},
              {label:'Questions Attempted', val:`${attempted} / 50`},
              {label:'Attempt Rate', val:`${Math.round(attempted/50*100)}%`},
            ].map(s => (
              <div key={s.label} className="rounded-xl bg-blue-50 p-3 text-center">
                <div className="font-bold text-base text-blue-800 font-outfit">{s.val}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── AI ANALYSIS ── */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <p className="font-bold text-sm text-gray-800 mb-3">🤖 AI Performance Analysis</p>
          {aiLoading ? (
            <div className="rounded-xl p-4 flex items-center gap-3" style={{background:'#f5f0ff',border:'1px solid #e9d5ff'}}>
              <div className="flex gap-1">{[0,1,2].map(i=><div key={i} className="w-2 h-2 rounded-full animate-bounce bg-purple-500" style={{animationDelay:`${i*0.15}s`}}/>)}</div>
              <span className="text-xs text-purple-700">Generating personalised AI feedback...</span>
            </div>
          ) : aiAnalysis ? (
            <div className="rounded-xl p-4 text-xs text-gray-800 leading-relaxed" style={{background:'#f5f0ff',border:'1px solid #e9d5ff',whiteSpace:'pre-wrap'}}>
              <div className="flex items-center gap-1.5 mb-2"><span className="text-base">🤖</span><span className="font-bold text-purple-800 text-[11px] uppercase tracking-wider">AI Mentor Feedback</span></div>
              {aiAnalysis}
            </div>
          ) : (
            <div className="rounded-xl p-3 text-xs text-gray-400" style={{background:'#f9fafb',border:'1px solid #e5e7eb'}}>
              AI analysis unavailable. Add a valid VITE_GEMINI_API_KEY to enable.
            </div>
          )}
        </div>

        {/* ── QUESTION REVIEW ── */}
        <div className="print-hide">
          <button onClick={() => setShowReview(r => !r)}
            className="w-full py-3 rounded-xl text-sm font-bold transition"
            style={{background:showReview?'#f5f0ff':'#eff6ff', color:showReview?'#4c1d95':'#1d4ed8', border:'1.5px solid '+(showReview?'#c4b5fd':'#bfdbfe')}}>
            {showReview ? '▲ Hide Question-wise Review' : '▼ Review All 50 Questions with Solutions'}
          </button>
        </div>

        {showReview && (
          <div className="space-y-3 print-hide">
            {result.questions.map((q, i) => {
              const userAns = result.answers[i];
              const isCorrect = userAns === q.ans;
              const isSkipped = result.skipped[i];
              const isUnattempted = userAns === undefined && !isSkipped;
              const hasAI = !!qAiAnalysis[i];
              const loadingAI = !!qAiLoading[i];
              const borderColor = isUnattempted?'#e5e7eb':isCorrect?'#86efac':isSkipped?'#fcd34d':'#fca5a5';
              const bgColor = isUnattempted?'#f9fafb':isCorrect?'#f0fdf4':isSkipped?'#fffbeb':'#fff5f5';
              const statusLabel = isCorrect?'✓ Correct':isSkipped?'⟳ Skipped':isUnattempted?'— Not Attempted':'✗ Wrong';
              const statusBg = isCorrect?'#16a34a':isSkipped?'#d97706':isUnattempted?'#9ca3af':'#dc2626';
              const fetchQAI = async () => {
                if (hasAI || loadingAI) return;
                setQAiLoading(p=>({...p,[i]:true}));
                const text = await getQuestionAIAnalysis(q.q, q.opts, q.ans, userAns, q.sec, q.marks);
                setQAiAnalysis(p=>({...p,[i]:text||'AI analysis unavailable.'}));
                setQAiLoading(p=>({...p,[i]:false}));
              };
              return (
                <div key={i} className="rounded-xl border overflow-hidden" style={{borderColor}}>
                  <div className="flex items-center gap-2 px-4 py-2.5 flex-wrap" style={{background:bgColor}}>
                    <span className="font-bold text-xs text-orange-500">Q.{i+1}</span>
                    <span className="px-1.5 py-0.5 rounded text-white text-[10px] font-bold" style={{background:statusBg}}>{statusLabel}</span>
                    <span className="text-[10px] text-gray-400">{q.sec} · {q.marks} mark{q.marks>1?'s':''}</span>
                  </div>
                  <div className="p-4" style={{background:bgColor}}>
                    <p className="font-medium text-gray-900 mb-3 leading-relaxed text-sm">{q.q}</p>
                    <div className="space-y-1.5 mb-3">
                      {q.opts.map((opt,j) => {
                        const isSel=userAns===j, isAns=j===q.ans;
                        return (
                          <div key={j} className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                            style={{background:isAns?'#dcfce7':isSel&&!isAns?'#fee2e2':'#f9fafb', border:'1px solid '+(isAns?'#86efac':isSel&&!isAns?'#fca5a5':'#e5e7eb'), fontWeight:isAns||isSel?600:400, color:isAns?'#166534':isSel&&!isAns?'#991b1b':'#374151'}}>
                            <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0" style={{borderColor:'currentColor'}}>{String.fromCharCode(65+j)}</span>
                            <span className="flex-1">{opt}</span>
                            {isAns && <span className="text-[10px] font-bold text-green-700">✓ Correct</span>}
                            {isSel&&!isAns && <span className="text-[10px] font-bold text-red-600">Your Answer</span>}
                          </div>
                        );
                      })}
                    </div>
                    {!hasAI&&!loadingAI&&<button onClick={fetchQAI} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold" style={{background:'#f5f0ff',color:'#4c1d95',border:'1.5px solid #c4b5fd'}}>🤖 Get AI Explanation</button>}
                    {loadingAI&&<div className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs" style={{background:'#f5f0ff',border:'1px solid #e9d5ff'}}><div className="flex gap-1">{[0,1,2].map(j=><div key={j} className="w-1.5 h-1.5 rounded-full animate-bounce bg-purple-500" style={{animationDelay:j*0.15+'s'}}/>)}</div><span className="text-purple-700">Analyzing...</span></div>}
                    {hasAI&&<div className="mt-2 rounded-xl p-4 text-xs text-gray-800 leading-relaxed" style={{background:'#f5f0ff',border:'1.5px solid #c4b5fd',whiteSpace:'pre-wrap'}}><div className="flex items-center gap-1.5 mb-2"><span>🤖</span><span className="font-bold text-purple-800 text-[11px] uppercase tracking-wider">AI Concept Analysis</span></div>{qAiAnalysis[i]}</div>}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ── ACTION BUTTONS ── */}
        <div className="flex flex-col sm:flex-row gap-3 print-hide">
          <button onClick={()=>window.print()} className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2">🖨️ Download PDF Report</button>
          <button onClick={onShowResults} className="flex-1 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2">🏆 Full Results Sheet</button>
          <button onClick={()=>{ const h=getAttemptHistory(candidate.appId); setAttemptHistory(h); setScreen('attempt-history'); }} className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold px-5 py-2.5 rounded-xl text-sm transition flex items-center justify-center gap-2">🔄 Retake Exam</button>
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
        {/* Fullscreen Required Blocker */}
        {!isFullscreen && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center" style={{ background: 'rgba(10,31,92,0.97)' }}>
            <div className="bg-white rounded-2xl overflow-hidden max-w-md w-full mx-4 shadow-2xl">
              <div className="px-6 py-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg,#1e3a8a,#4c1d95)' }}>
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-lg flex-shrink-0">⚠️</div>
                <div>
                  <p className="text-white font-bold text-sm">Exam Paused — Action Required</p>
                  <p className="text-white/50 text-xs">SIUAT 2026-27 · Proctored Examination</p>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-800 font-semibold text-sm mb-1">Fullscreen mode is required to continue.</p>
                <p className="text-gray-500 text-xs mb-4 leading-relaxed">
                  This is a proctored exam. Exiting fullscreen is treated as a security violation and has been recorded against your candidature.
                </p>
                <div className="rounded-xl p-3 mb-5 flex items-start gap-3" style={{ background: '#fef3c7', border: '1px solid #fcd34d' }}>
                  <span className="text-base mt-0.5">📋</span>
                  <div className="text-xs text-amber-800">
                    <strong>Violations recorded: {violations} of 3.</strong> Upon 3 violations, your exam will be automatically submitted and the incident will be logged.
                  </div>
                </div>
                <button
                  onClick={requestFS}
                  className="w-full py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
                  style={{ background: 'linear-gradient(90deg,#1d4ed8,#4c1d95)' }}
                >
                  <span>⛶</span> Re-enter Fullscreen & Resume Exam
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Violation Toast */}
        {showViolation && (
          <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[9998] w-full max-w-sm mx-4">
            <div className="rounded-xl shadow-xl overflow-hidden" style={{ border: '1.5px solid #fca5a5' }}>
              <div className="px-4 py-2 flex items-center gap-2" style={{ background: '#dc2626' }}>
                <span className="text-white font-bold text-xs uppercase tracking-widest">Security Violation #{violations}</span>
                <span className="ml-auto text-white/70 text-xs">Auto-dismissing...</span>
              </div>
              <div className="bg-white px-4 py-3">
                <p className="text-sm font-semibold text-gray-800 mb-0.5">Fullscreen exit or tab switch detected.</p>
                <p className="text-xs text-gray-500">
                  {violations >= 3
                    ? 'Maximum violations reached. Your exam is being submitted now.'
                    : `You have ${3 - violations} warning${3 - violations === 1 ? '' : 's'} remaining before automatic submission.`
                  }
                </p>
              </div>
            </div>
          </div>
        )}
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

  // ─── ATTEMPT HISTORY SCREEN ───
  if (screen === 'attempt-history' && candidate) {
    const history = attemptHistory.length > 0 ? attemptHistory : getAttemptHistory(candidate.appId);
    const startFresh = () => {
      localStorage.removeItem(`siuat_exam_state_${candidate.appId}`);
      const qList = getQuestions(candidate.courses || []);
      const shuffleArray = (arr) => { const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];} return a; };
      const shuffleOpts = (q) => { const t=q.opts[q.ans]; const s=shuffleArray(q.opts); return {...q,opts:s,ans:s.indexOf(t)===-1?q.ans:s.indexOf(t)}; };
      setQuestions(shuffleArray(qList).map(shuffleOpts));
      setCurrentQ(0); setAnswers({}); setSkipped({}); setTimeLeft(3600); setSubmitted(false);
      setScreen('exam');
    };
    return (
      <div className="max-w-lg mx-auto py-8 px-4">
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="text-center mb-5">
            <div className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center mx-auto mb-3 text-white font-bold text-lg">SIU</div>
            <h3 className="text-blue-800 font-bold text-xl font-outfit">{candidate.firstName} {candidate.lastName}</h3>
            <p className="text-gray-400 text-xs mt-1 font-mono">{candidate.appId}</p>
          </div>

          {/* Attempt History */}
          {history.length > 0 && (
            <div className="mb-5">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Your Attempt History</p>
              <div className="space-y-2">
                {history.map((h, idx) => (
                  <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-xs font-bold text-blue-800">Attempt {h.attemptNo}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{h.date} · {h.correct} marks · {h.wrong} wrong · {h.skipped} skipped</div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl text-blue-800 font-outfit">{h.score}%</div>
                        <div className="text-xs font-bold" style={{ color: h.grade==='A+'?'#b45309':h.grade==='A'?'#16a34a':h.grade==='B'?'#2563eb':h.grade==='C'?'#d97706':'#dc2626' }}>Grade {h.grade}</div>
                      </div>
                    </div>
                    {/* Section-wise breakdown per attempt */}
                    {h.sectionData && Object.keys(h.sectionData).length > 0 && (
                      <div className="mt-2 space-y-1">
                        {Object.entries(h.sectionData).map(([sec, d]) => {
                          const sp = d.total > 0 ? Math.round(d.correct / d.total * 100) : 0;
                          const bc = sp >= 75 ? '#16a34a' : sp >= 50 ? '#2563eb' : sp >= 40 ? '#d97706' : '#dc2626';
                          return (
                            <div key={sec} className="flex items-center gap-2">
                              <span className="text-[10px] text-gray-400 w-20 text-right shrink-0">{sec}</span>
                              <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full rounded-full" style={{ width: `${sp}%`, background: bc }} />
                              </div>
                              <span className="text-[10px] font-bold shrink-0" style={{ color: bc }}>{sp}%</span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Performance trend */}
              {history.length > 1 && (
                <div className="mt-3 bg-blue-50 border border-blue-100 rounded-xl p-3">
                  <p className="text-xs font-bold text-blue-800 mb-2">Score Trend</p>
                  <div className="flex items-end gap-1.5 h-12">
                    {history.map((h, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full rounded-t bg-blue-600" style={{ height: `${Math.max(8, h.score * 0.44)}px` }} />
                        <span className="text-[9px] text-gray-400">A{h.attemptNo}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-5 text-xs text-amber-800">
            <p className="font-bold mb-1">💡 Multiple Attempts Allowed</p>
            <p>You can retake SIUAT as many times as you want. Each attempt is fully shuffled with a fresh question set. Your best score counts for scholarship eligibility.</p>
          </div>

          <button onClick={startFresh} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl text-sm transition">
            {history.length > 0 ? `🔄 Retake SIUAT (Attempt ${history.length + 1}) →` : 'Start Exam →'}
          </button>
          <button onClick={() => { setScreen('login'); setCandidate(null); setLoginId(''); }}
            className="w-full mt-2 text-xs text-gray-400 hover:text-gray-600 transition">
            Exit to Login
          </button>
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
              <input value={forgotInput} onChange={e=>setForgotInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&findAppId()}
                placeholder="Enter registered mobile number"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-blue-700 mb-2"/>
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