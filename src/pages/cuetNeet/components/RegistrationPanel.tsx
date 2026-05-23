import { useState, useEffect, useRef } from "react";
import { SIUAT_QUESTIONS } from "../lib/data";

const BASE = (import.meta as unknown as { env: Record<string, string> }).env?.VITE_API_URL || 'http://localhost:5000/api';
const API = `${BASE}/registrations`;

type SubTab = "register" | "exam";
type ExamPhase = "login" | "instructions" | "active" | "submitted";

const STATES = ["Uttar Pradesh", "Delhi", "Bihar", "Madhya Pradesh", "Rajasthan", "Gujarat", "Maharashtra", "Punjab", "Haryana", "Uttarakhand", "Jharkhand", "West Bengal", "Other"];
const UG = ["B.Tech", "BBA", "BCA", "B.Sc", "B.Com", "BA"];
const PG = ["MBA", "M.Tech", "MCA", "M.Sc", "M.Com", "MA"];
const PROF = ["LLB (Law)", "LLM", "B.Pharma", "M.Pharma"];
const EXAM_DATES = ["15 May 2026 (Morning)", "15 May 2026 (Evening)", "22 May 2026 (Morning)", "22 May 2026 (Evening)", "01 Jun 2026 (Morning)", "15 Jun 2026 (Morning)"];
const CENTRES = ["Lucknow Main Campus", "Barabanki Centre", "Sitapur Centre", "Hardoi Centre", "Raebareli Centre"];
const SOURCES = ["School / College", "Social Media", "Friends / Family", "Newspaper", "Coaching Institute", "University Website", "Other"];

const EXAM_DURATION = 45 * 60; // 45 minutes

function getGrade(pct: number) {
  if (pct >= 90) return { grade: "A+", label: "100% Scholarship Eligible!", color: "#7a5500", bg: "#fffbea" };
  if (pct >= 75) return { grade: "A", label: "50% Scholarship Eligible!", color: "#0a1f5c", bg: "#dbeafe" };
  if (pct >= 60) return { grade: "B", label: "25% Scholarship Eligible!", color: "#92400e", bg: "#fef3c7" };
  if (pct >= 40) return { grade: "C", label: "Merit Certificate", color: "#374151", bg: "#f3f4f6" };
  return { grade: "F", label: "Better luck next time", color: "#dc2626", bg: "#fee2e2" };
}

/* ─────────────────────────────── EXAM PORTAL ─────────────────────────────── */
type CandidateData = { id: string; firstName: string; lastName: string; mobile: string; email: string; city: string; state: string; qualification: string; board: string; marks: string; year: string; courses: string[]; examDate: string; examMode: string; examCentre: string; medium: string; category: string; source: string; status: string; registeredAt: string; examCompleted: boolean; score: number | null; };

function ExamPortal() {
  const [phase, setPhase] = useState<ExamPhase>("login");
  const [appId, setAppId] = useState("");
  const [loginError, setLoginError] = useState("");
  const [candidate, setCandidate] = useState<CandidateData | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [violations, setViolations] = useState(0);
  const [showVio, setShowVio] = useState(false);
  const [timeLeft, setTimeLeft] = useState(EXAM_DURATION);
  const [result, setResult] = useState<{ pct: number; correct: number; wrong: number; skipped: number; score: number } | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const questions = SIUAT_QUESTIONS;

  useEffect(() => {
    const handler = () => {
      if (document.hidden && phase === "active") {
        setViolations(v => { const n = v + 1; setShowVio(true); setTimeout(() => setShowVio(false), 3000); return n; });
      }
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, [phase]);

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(timerRef.current!); handleSubmit(); return 0; } return t - 1; });
    }, 1000);
  };

  const handleLogin = async () => {
    const trimmed = appId.trim().toUpperCase();
    try {
      const res = await fetch(`${API}/${trimmed}`);
      if (!res.ok) { setLoginError("Application ID not found. Please check and try again."); return; }
      const reg = await res.json();
      if (reg.status === "Pending") { setLoginError("Your application is still under review. Please wait for admin approval."); return; }
      if (reg.status === "Rejected") { setLoginError("Your application has been rejected. Please contact SIU admissions."); return; }
      if (reg.score !== null && reg.score !== undefined) { setLoginError("You have already completed the Talent Hunt exam. Check your result in the Results tab."); return; }
      setCandidate({ id: reg.appId, firstName: reg.firstName, lastName: reg.lastName, mobile: reg.mobile, email: reg.email, city: reg.city, state: reg.state, qualification: reg.qual, board: reg.board, marks: reg.marks, year: reg.yop, courses: reg.courses || [], examDate: reg.examDate, examMode: reg.examMode, examCentre: reg.centre || '', medium: reg.medium, category: reg.category, source: reg.source, status: reg.status, registeredAt: reg.registeredAt, examCompleted: false, score: null });
      setLoginError("");
      setPhase("instructions");
    } catch { setLoginError("Cannot connect to server. Please try again."); }
  };

  const startExam = () => {
    setPhase("active");
    setTimeLeft(EXAM_DURATION);
    startTimer();
  };

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
      const grade = pct >= 90 ? 'A+' : pct >= 75 ? 'A' : pct >= 60 ? 'B' : pct >= 40 ? 'C' : 'F';
      fetch(`${API}/result/${candidate.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ score: pct, grade }) }).catch(() => {});
    }
    setPhase("submitted");
  };

  const fmt = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const timerPct = (timeLeft / EXAM_DURATION) * 100;
  const q = questions[currentQ];

  if (phase === "login") return (
    <div className="max-w-md mx-auto mt-2">
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "#f5f0ff" }}>📋</div>
          <div>
            <h3 className="font-serif font-bold text-lg text-[#0a1f5c]">Exam Portal Login</h3>
            <p className="text-xs text-gray-400">Enter your Application ID to access your exam</p>
          </div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-xs text-amber-800">
          <strong>Note:</strong> Your application must be <strong>Approved</strong> by admin before you can access the exam. Register first if you haven't already.
        </div>
        <label className="block text-xs font-semibold text-gray-700 mb-1">Application ID <span className="text-red-500">*</span></label>
        <input
          value={appId}
          onChange={e => setAppId(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleLogin()}
          placeholder="e.g. SIU839201"
          data-testid="exam-portal-appid"
          className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm mb-3 focus:outline-none focus:border-purple-400 font-mono tracking-widest"
        />
        {loginError && (
          <div className="text-red-600 text-xs mb-3 p-2 rounded-lg bg-red-50 border border-red-200">{loginError}</div>
        )}
        <button onClick={handleLogin} data-testid="exam-portal-login" className="w-full py-3 rounded-xl text-sm font-bold text-white" style={{ background: "#0a1f5c" }}>
          Access Exam Portal →
        </button>
        <p className="text-[10px] text-gray-400 text-center mt-3">Register first to get your Application ID, then come back here.</p>
      </div>
    </div>
  );

  if (phase === "instructions" && candidate) return (
    <div className="max-w-2xl mx-auto mt-2">
      <div className="rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm">
        <div className="p-5 text-white" style={{ background: "linear-gradient(135deg,#0a1f5c,#4c1d95)" }}>
          <div className="text-xs font-bold tracking-widest uppercase mb-1" style={{ color: "rgba(255,255,255,0.5)" }}>SIU Talent Hunt Examination 2026-27</div>
          <h3 className="font-serif font-black text-xl text-white mb-1">Exam Instructions</h3>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.6)" }}>Welcome, {candidate.firstName} {candidate.lastName} — App ID: {candidate.id}</p>
        </div>
        <div className="p-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
            {[{ l: "Total Questions", v: `${questions.length}` }, { l: "Total Marks", v: `${questions.length * 4}` }, { l: "Duration", v: "45 Minutes" }, { l: "Marking Scheme", v: "+4 / −1" }].map(s => (
              <div key={s.l} className="text-center rounded-xl p-3" style={{ background: "#f5f0ff" }}>
                <div className="font-serif font-black text-xl text-[#4c1d95]">{s.v}</div>
                <div className="text-[10px] text-gray-500 mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
          <div className="space-y-2 mb-5 text-sm">
            {[
              "The exam consists of 15 multiple choice questions covering General Aptitude, Reasoning, English & GK.",
              "Each correct answer carries +4 marks. Each wrong answer carries −1 mark. Unattempted = 0.",
              "The exam will auto-submit when the 45-minute timer ends.",
              "Do NOT switch tabs or minimize the browser window — each violation is recorded.",
              "After 3 tab-switch violations, a strict warning is issued. This may affect your scholarship eligibility.",
              "Once started, the exam cannot be paused. Ensure stable internet before proceeding.",
              "Your result and scholarship eligibility will be displayed immediately after submission.",
            ].map((rule, i) => (
              <div key={i} className="flex gap-2.5">
                <div className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mt-0.5" style={{ background: "#6c3fc7" }}>{i + 1}</div>
                <p className="text-gray-700 text-xs leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg mb-5" style={{ background: "#fffbea", border: "1px solid #c9a84c" }}>
            <span className="text-xl">🏆</span>
            <p className="text-xs text-[#7a5500] font-medium">Score <strong>90%+</strong> to win <strong>100% Full Scholarship</strong> at Saroj International University. Every question matters!</p>
          </div>
          <div className="flex gap-3">
            <button onClick={() => { setPhase("login"); setCandidate(null); }} className="flex-1 py-3 border border-gray-300 rounded-xl text-sm font-semibold text-gray-600">← Back</button>
            <button onClick={startExam} data-testid="start-siuat-exam" className="flex-1 py-3 rounded-xl text-sm font-extrabold text-white" style={{ background: "linear-gradient(90deg,#4c1d95,#6c3fc7)" }}>
              Start Exam Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  if (phase === "active" && q) return (
    <div>
      {showVio && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center" style={{ background: "rgba(127,0,0,0.85)" }}>
          <div className="text-white text-center p-8 max-w-sm">
            <div className="text-5xl mb-3">⚠️</div>
            <div className="text-xl font-bold mb-2">Tab Switch Detected!</div>
            <div className="text-sm opacity-80">This has been recorded as Violation #{violations}. 3 violations may affect your scholarship eligibility.</div>
          </div>
        </div>
      )}

      {/* Exam Header */}
      <div className="rounded-xl p-4 mb-4 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#4c1d95,#0a1f5c)" }}>
        <div className="flex justify-between items-center flex-wrap gap-3 relative z-10">
          <div>
            <div className="text-white font-bold text-sm">SIU Talent Hunt Exam 2026-27</div>
            <div className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>{candidate?.firstName} {candidate?.lastName} · App ID: {candidate?.id}</div>
            <div className="text-xs font-semibold mt-1" style={{ color: violations > 0 ? "#fca5a5" : "#f0d060" }}>
              {violations > 0 ? `⚠ ${violations} violation${violations > 1 ? "s" : ""} recorded` : "✓ No violations"}
            </div>
          </div>
          <div className="text-right">
            <div className="font-serif font-black text-3xl" style={{ color: timeLeft < 300 ? "#fca5a5" : "#f0d060" }}>{fmt(timeLeft)}</div>
            <div className="text-xs" style={{ color: "rgba(255,255,255,0.55)" }}>Time Remaining</div>
          </div>
        </div>
        <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
          <div className="h-full rounded-full transition-all" style={{ width: `${timerPct}%`, background: timeLeft < 300 ? "#ef4444" : "linear-gradient(90deg,#c9a84c,#e8b840)" }} />
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
            <button key={i} onClick={() => setCurrentQ(i)} data-testid={`siuat-qnav-${i}`}
              className="w-8 h-8 rounded-lg text-xs font-bold transition border-[1.5px]"
              style={{ background: answers[i] !== undefined ? "#0a1f5c" : "#fff", color: answers[i] !== undefined ? "#fff" : "#6b7280", borderColor: i === currentQ ? "#c9a84c" : answers[i] !== undefined ? "#0a1f5c" : "#e5e7eb", borderWidth: i === currentQ ? "2.5px" : "1.5px" }}>
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-6 mb-4">
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          <span className="text-xs font-bold" style={{ color: "#c9a84c" }}>Q.{currentQ + 1} of {questions.length}</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold text-white bg-[#0a1f5c]">{q.section}</span>
          <span className="px-2 py-0.5 rounded-lg text-[10px] text-green-700 bg-green-50 font-bold">+4 marks</span>
        </div>
        <p className="text-sm sm:text-base font-medium text-gray-900 leading-relaxed mb-5">{q.text}</p>
        <div className="space-y-2.5">
          {q.options.map((opt, oi) => (
            <button key={oi} onClick={() => setAnswers(a => ({ ...a, [currentQ]: oi }))} data-testid={`siuat-opt-${oi}`}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl border-[1.5px] text-sm text-left transition"
              style={{ borderColor: answers[currentQ] === oi ? "#0a1f5c" : "#e5e7eb", background: answers[currentQ] === oi ? "#eff6ff" : "#fff", color: answers[currentQ] === oi ? "#0a1f5c" : "#374151", fontWeight: answers[currentQ] === oi ? 600 : 400 }}>
              <span className="w-6 h-6 min-w-[24px] rounded-full border-[1.5px] flex items-center justify-center text-xs font-bold flex-shrink-0" style={{ borderColor: "currentcolor" }}>
                {String.fromCharCode(65 + oi)}
              </span>
              {opt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <button onClick={() => setCurrentQ(q => Math.max(0, q - 1))} disabled={currentQ === 0} data-testid="siuat-prev" className="px-4 py-2 rounded-lg border text-sm font-semibold text-gray-600 border-gray-300 disabled:opacity-40">← Previous</button>
        <div className="flex-1" />
        <button onClick={() => setCurrentQ(q => Math.min(questions.length - 1, q + 1))} disabled={currentQ === questions.length - 1} data-testid="siuat-next" className="px-4 py-2 rounded-lg border text-sm font-semibold text-gray-600 border-gray-300 disabled:opacity-40">Next →</button>
        <button onClick={handleSubmit} data-testid="siuat-submit" className="px-5 py-2 rounded-lg text-sm font-bold text-[#0a1f5c]" style={{ background: "linear-gradient(90deg,#c9a84c,#e8b840)" }}>Submit Exam ✓</button>
      </div>
    </div>
  );

  if (phase === "submitted" && result) {
    const g = getGrade(result.pct);
    return (
      <div className="max-w-xl mx-auto">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg">
          <div className="p-8 text-center">
            <div className="text-xs text-gray-400 uppercase tracking-widest mb-2">SIU Talent Hunt Examination Result</div>
            <div className="font-bold text-[#0a1f5c] mb-4">{candidate?.firstName} {candidate?.lastName} — {candidate?.id}</div>
            <div className="w-32 h-32 rounded-full mx-auto flex flex-col items-center justify-center mb-4 border-[6px]" style={{ borderColor: "#0a1f5c" }}>
              <div className="font-serif font-black text-3xl text-[#0a1f5c]">{result.pct}%</div>
              <div className="text-xs text-gray-400 mt-0.5">Score</div>
            </div>
            <div className="inline-block px-6 py-1.5 rounded-full text-base font-bold mb-3" style={{ background: g.bg, color: g.color }}>
              Grade {g.grade} — {g.label}
            </div>
            <div className="text-sm text-gray-500 mb-5">{result.score}/{questions.length * 4} marks</div>
            <div className="grid grid-cols-3 gap-3 mb-5">
              {[{ n: result.correct, l: "Correct", c: "#16a34a" }, { n: result.wrong, l: "Wrong", c: "#dc2626" }, { n: result.skipped, l: "Skipped", c: "#d97706" }].map(s => (
                <div key={s.l} className="bg-gray-50 rounded-xl p-4 text-center">
                  <div className="font-serif font-bold text-2xl" style={{ color: s.c }}>{s.n}</div>
                  <div className="text-xs text-gray-500 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
            {result.pct >= 60 && (
              <div className="rounded-xl p-4 flex items-center gap-3 text-left mb-4" style={{ background: "linear-gradient(135deg,#c9a84c,#e8b840)" }}>
                <span className="text-2xl">🏆</span>
                <div className="text-[#0a1f5c] text-sm font-semibold">
                  Congratulations! You qualify for <strong>{g.grade === "A+" ? "100% Full" : g.grade === "A" ? "50%" : "25%"} Scholarship</strong> at SIU. Visit the admissions office with your App ID to claim it.
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

/* ─────────────────────────────── MAIN PANEL ─────────────────────────────── */
export function RegistrationPanel() {
  const [subTab, setSubTab] = useState<SubTab>("register");
  const [step, setStep] = useState(1);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitErr, setSubmitErr] = useState("");
  const [seatsLeft, setSeatsLeft] = useState<number | null>(null);
  const [form, setForm] = useState({
    firstName: "", lastName: "", dob: "", gender: "", mobile: "", email: "", city: "", state: "",
    qualification: "", board: "", marks: "", year: "",
    courses: [] as string[],
    examDate: "", examMode: "Online (CBT)", centre: "", medium: "English", category: "General", scholar: "Yes, very interested", source: ""
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    fetch(`${API}/seats`).then(r => r.json()).then(d => setSeatsLeft(d.left)).catch(() => {});
  }, []);

  const seats = 500;
  const taken = seatsLeft !== null ? seats - seatsLeft : 0;
  const pct = Math.round((taken / seats) * 100);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));
  const toggleCourse = (c: string) => setForm(f => ({ ...f, courses: f.courses.includes(c) ? f.courses.filter(x => x !== c) : [...f.courses, c] }));

  const validateStep1 = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "Required";
    if (!form.lastName.trim()) errs.lastName = "Required";
    if (!form.dob) errs.dob = "Required";
    if (!form.gender) errs.gender = "Required";
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile.replace(/\D/g, ""))) errs.mobile = "Enter valid 10-digit mobile";
    if (!form.email.trim() || !form.email.includes("@")) errs.email = "Enter valid email";
    if (!form.city.trim()) errs.city = "Required";
    if (!form.state) errs.state = "Required";
    if (!form.qualification) errs.qualification = "Required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    if (form.courses.length === 0) { setErrors({ courses: "Select at least one course" }); return false; }
    setErrors({});
    return true;
  };

  const goStep = (s: number) => {
    if (s === 2 && !validateStep1()) return;
    if (s === 3 && !validateStep2()) return;
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submit = async () => {
    if (!form.examDate) { setErrors({ examDate: "Select exam date" }); return; }
    setLoading(true); setSubmitErr("");
    try {
      const res = await fetch(`${API}/register`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstName: form.firstName, lastName: form.lastName, dob: form.dob, gender: form.gender, mobile: form.mobile, email: form.email, city: form.city, state: form.state, qual: form.qualification, board: form.board, marks: form.marks, yop: form.year, courses: form.courses, examDate: form.examDate, examMode: form.examMode, centre: form.centre, medium: form.medium, category: form.category, scholar: form.scholar, source: form.source })
      });
      const data = await res.json();
      if (res.ok) { setSuccessId(data.appId); setSeatsLeft(s => s !== null ? s - 1 : s); }
      else setSubmitErr(data.message || 'Registration failed. Please try again.');
    } catch { setSubmitErr('Cannot connect to server. Please make sure backend is running.'); }
    setLoading(false);
  };

  const resetForm = () => {
    setSuccessId(null); setStep(1);
    setForm({ firstName:"",lastName:"",dob:"",gender:"",mobile:"",email:"",city:"",state:"",qualification:"",board:"",marks:"",year:"",courses:[],examDate:"",examMode:"Online (CBT)",centre:"",medium:"English",category:"General",scholar:"Yes, very interested",source:"" });
  };

  if (successId) {
    return (
      <div className="max-w-lg mx-auto text-center py-10">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="font-serif text-2xl font-black text-[#0a1f5c] mb-2">Registration Successful!</h2>
        <p className="text-gray-500 mb-4">Your application has been submitted and is pending admin review.</p>
        <div className="bg-[#f5f0ff] border border-purple-200 rounded-xl p-5 mb-5">
          <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Your Application ID</div>
          <div className="font-serif font-black text-3xl text-[#6c3fc7]">{successId}</div>
          <div className="text-xs text-gray-500 mt-2">Save this ID — you'll need it to log in to the Exam Portal</div>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-700 mb-5">
          <strong>Next Steps:</strong> Once your application is <strong>Approved</strong> by an admin (24–48 hours), visit the <strong>Exam Portal</strong> tab above and enter your App ID to take the exam.
        </div>
        <div className="flex gap-3 justify-center">
          <button onClick={resetForm} className="px-5 py-2 rounded-lg border text-sm font-semibold text-gray-600 border-gray-300">Register Another</button>
          <button onClick={() => { resetForm(); setSubTab("exam"); }} className="px-5 py-2 rounded-lg text-sm font-bold text-white" style={{ background: "#0a1f5c" }}>Go to Exam Portal →</button>
        </div>
      </div>
    );
  }

  const stepDot = (n: number, label: string) => (
    <div key={n} className="flex items-center gap-1">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all flex-shrink-0"
          style={{ background: step > n ? "#16a34a" : step === n ? "#0a1f5c" : "#e5e7eb", color: step >= n ? "#fff" : "#6b7280" }}>
          {step > n ? "✓" : n}
        </div>
        <span className={`text-xs font-semibold hidden sm:block ${step === n ? "text-[#0a1f5c]" : step > n ? "text-green-600" : "text-gray-400"}`}>{label}</span>
      </div>
      {n < 3 && <div className="w-6 sm:w-12 h-0.5 mx-2 rounded" style={{ background: step > n ? "#16a34a" : "#e5e7eb" }} />}
    </div>
  );

  const fld = (label: string, key: string, type = "text", req = true, ph = "") => (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label} {req && <span className="text-red-500">*</span>}</label>
      <input type={type} value={(form as unknown as Record<string, string>)[key] || ""} onChange={e => set(key, e.target.value)} placeholder={ph}
        data-testid={`input-${key}`}
        className="w-full px-3 py-2.5 border rounded-lg text-sm transition focus:outline-none focus:border-blue-400"
        style={{ borderColor: errors[key] ? "#dc2626" : "#e5e7eb" }} />
      {errors[key] && <p className="text-red-500 text-xs mt-0.5">{errors[key]}</p>}
    </div>
  );

  const sel = (label: string, key: string, opts: string[], req = true) => (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label} {req && <span className="text-red-500">*</span>}</label>
      <select value={(form as unknown as Record<string, string>)[key] || ""} onChange={e => set(key, e.target.value)} data-testid={`select-${key}`}
        className="w-full px-3 py-2.5 border rounded-lg text-sm bg-white focus:outline-none" style={{ borderColor: errors[key] ? "#dc2626" : "#e5e7eb" }}>
        <option value="">-- Select --</option>
        {opts.map(o => <option key={o}>{o}</option>)}
      </select>
      {errors[key] && <p className="text-red-500 text-xs mt-0.5">{errors[key]}</p>}
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <div className="rounded-xl p-5 mb-4 relative overflow-hidden" style={{ background: "#0a1f5c" }}>
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-extrabold text-[#0a1f5c] animate-pulse" style={{ background: "#c9a84c" }}>🏆 100% Scholarship!</div>
        <h2 className="font-serif text-xl font-black text-white mb-1">SIU Talent Hunt Examination 2026-27</h2>
        <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.65)" }}>Register for Saroj International University's scholarship-based entrance examination. Limited to 500 students.</p>
        <div className="flex gap-2 flex-wrap">
          {["UG & PG Programs", "Professional Courses", "100% Merit Scholarship", "Online & Offline Mode"].map(t => (
            <span key={t} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: "rgba(201,168,76,0.16)", color: "#f0d080", border: "1px solid rgba(201,168,76,0.28)" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Sub-tabs */}
      <div className="flex gap-1 mb-4 bg-gray-100 rounded-xl p-1">
        {([["register", "📝 Register", "Apply for SIUAT exam"], ["exam", "🖥️ Exam Portal", "Already registered? Take your exam"]] as const).map(([id, label, desc]) => (
          <button key={id} onClick={() => setSubTab(id)} data-testid={`siuat-subtab-${id}`}
            className="flex-1 rounded-lg py-2.5 px-3 text-left transition"
            style={{ background: subTab === id ? "#fff" : "transparent", boxShadow: subTab === id ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>
            <div className={`text-sm font-bold ${subTab === id ? "text-[#0a1f5c]" : "text-gray-500"}`}>{label}</div>
            <div className="text-[10px] text-gray-400 hidden sm:block">{desc}</div>
          </button>
        ))}
      </div>

      {/* Exam Portal sub-tab */}
      {subTab === "exam" && <ExamPortal />}

      {/* Registration sub-tab */}
      {subTab === "register" && (
        <div>
          {/* Capacity */}
          <div className="mb-4 p-3 rounded-lg flex items-center gap-3 text-sm font-semibold" style={{ background: "#fef3c7", borderLeft: "4px solid #d97706", color: "#92400e" }}>
            <span>⚠</span>
            <span>{taken} / {seats} seats filled ({pct}%) — {seats - taken} remaining. Register now!</span>
          </div>

          {/* Stepper */}
          <div className="flex items-center mb-6 px-1">
            {stepDot(1, "Personal Info")}
            {stepDot(2, "Course Selection")}
            {stepDot(3, "Exam Preference")}
          </div>

          {/* Step 1 */}
          {step === 1 && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
              <h3 className="font-serif font-bold text-lg text-gray-900 mb-1">Personal Information & Highest Qualification</h3>
              <p className="text-xs text-gray-500 mb-4">Fill in your personal details as per your academic records.</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 pb-2 border-b">Basic Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                {fld("First Name", "firstName", "text", true, "First name")}
                {fld("Last Name", "lastName", "text", true, "Last name")}
                {fld("Date of Birth", "dob", "date")}
                {sel("Gender", "gender", ["Male", "Female", "Other", "Prefer not to say"])}
                {fld("Mobile Number", "mobile", "tel", true, "+91 XXXXX XXXXX")}
                {fld("Email Address", "email", "email", true, "email@example.com")}
                {fld("City", "city", "text", true, "Your city")}
                {sel("State", "state", STATES)}
              </div>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 pb-2 border-b mt-4">Highest Qualification</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {sel("Qualification Level", "qualification", ["Class 10 / Secondary", "Class 12 / Intermediate", "Diploma (Polytechnic / ITI)", "B.A / B.Sc / B.Com", "B.Tech / B.E", "Other Bachelor's Degree", "Master's Degree (PG)", "Other"])}
                {fld("Board / University", "board", "text", false, "e.g. CBSE, UP Board, AKTU")}
                {fld("Percentage / CGPA", "marks", "text", false, "e.g. 85% or 8.5 CGPA")}
                {sel("Year of Passing", "year", ["Appearing 2026", "2025", "2024", "2023", "2022", "2021", "2020 or earlier"], false)}
              </div>
              <div className="flex justify-end mt-5">
                <button onClick={() => goStep(2)} data-testid="step-next-2" className="px-6 py-2.5 rounded-lg text-sm font-bold text-white" style={{ background: "#0a1f5c" }}>Next: Select Course →</button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
              <h3 className="font-serif font-bold text-lg text-gray-900 mb-1">Select Desired Course(s)</h3>
              <p className="text-xs text-gray-500 mb-4">Tap to choose one or more courses you wish to apply for at SIU.</p>
              {errors.courses && <div className="text-red-500 text-sm mb-3 p-2 bg-red-50 rounded">{errors.courses}</div>}
              {[{ label: "UG Programs", tag: "3–4 years", list: UG }, { label: "PG Programs", tag: "2 years", list: PG }, { label: "Professional Programs", tag: "3–5 years", list: PROF }].map(g => (
                <div key={g.label} className="mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-[#0a1f5c]">{g.label}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-[#0a1f5c] font-semibold">{g.tag}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {g.list.map(c => (
                      <button key={c} onClick={() => toggleCourse(c)} data-testid={`chip-${c}`}
                        className="px-3 py-1.5 rounded-full text-xs font-semibold border-[1.5px] transition"
                        style={{ background: form.courses.includes(c) ? "#0a1f5c" : "#fff", color: form.courses.includes(c) ? "#fff" : "#374151", borderColor: form.courses.includes(c) ? "#0a1f5c" : "#e5e7eb" }}>
                        {c}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex justify-between mt-5">
                <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border text-sm font-semibold text-gray-600 border-gray-300">← Back</button>
                <button onClick={() => goStep(3)} data-testid="step-next-3" className="px-6 py-2.5 rounded-lg text-sm font-bold text-white" style={{ background: "#0a1f5c" }}>Next: Exam Preference →</button>
              </div>
            </div>
          )}

          {/* Step 3 */}
          {step === 3 && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
              <h3 className="font-serif font-bold text-lg text-gray-900 mb-1">Exam Preference</h3>
              <p className="text-xs text-gray-500 mb-4">Select your preferred exam date, mode and centre.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                {sel("Exam Date", "examDate", EXAM_DATES)}
                {sel("Exam Mode", "examMode", ["Online (CBT)", "Offline (Pen & Paper)"], false)}
                {sel("Exam Centre", "centre", CENTRES, false)}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                {sel("Medium of Exam", "medium", ["English", "Hindi", "Bilingual"], false)}
                {sel("Category", "category", ["General", "OBC", "SC", "ST", "EWS"], false)}
                {sel("Scholarship Interest", "scholar", ["Yes, very interested", "No, not required"], false)}
                {sel("How did you hear about us?", "source", SOURCES, false)}
              </div>
              <div className="flex justify-between mt-5 flex-wrap gap-3">
                <button onClick={() => setStep(2)} className="px-4 py-2 rounded-lg border text-sm font-semibold text-gray-600 border-gray-300">← Back</button>
                <button onClick={submit} disabled={loading} data-testid="btn-submit-reg" className="px-8 py-3 rounded-xl text-base font-extrabold text-[#0a1f5c]" style={{ background: "linear-gradient(90deg,#c9a84c,#e8b840)" }}>
                  {loading ? 'Submitting...' : '✓ Submit Registration'}
                </button>
              </div>
              {submitErr && <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{submitErr}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
