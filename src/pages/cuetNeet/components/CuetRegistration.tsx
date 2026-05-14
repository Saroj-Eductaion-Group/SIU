import { useState } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";
import {
  CUET_LANGUAGES, CUET_DOMAIN_SUBJECTS, CUET_TEST_CITIES,
  SEEDED_CUET_REGISTRATIONS, CUETRegistration,
} from "../lib/data";

const STATES = ["Uttar Pradesh","Delhi","Bihar","Madhya Pradesh","Rajasthan","Gujarat","Maharashtra","Punjab","Haryana","Uttarakhand","Jharkhand","West Bengal","Assam","Tamil Nadu","Telangana","Andhra Pradesh","Karnataka","Kerala","Odisha","Other"];
const QUALIFICATIONS = ["Class 12 / Intermediate (Appearing 2026)","Class 12 / Intermediate (Passed)","Diploma","Other"];
const BOARDS = ["CBSE","ICSE","UP Board","MP Board","Maharashtra Board","RBSE (Rajasthan)","HBSE (Haryana)","PSEB (Punjab)","WBBSE (West Bengal)","State Board (Other)"];
const SOURCES = ["School / College","Social Media","Friends / Family","Coaching Institute","Newspaper","University Website","AdmissionX Platform","Other"];
const MAX_DOMAIN = 6;

type AuthTab = "login" | "register";
type RegStep = 1 | 2 | 3;

function InputField({ label, k, value, onChange, type = "text", placeholder = "", required = true, error }: { label: string; k: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean; error?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none transition"
        style={{ borderColor: error ? "#dc2626" : "#e5e7eb" }} data-testid={`cuet-input-${k}`} />
      {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
    </div>
  );
}

function SelectField({ label, k, value, onChange, opts, required = true, error }: { label: string; k: string; value: string; onChange: (v: string) => void; opts: string[]; required?: boolean; error?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full px-3 py-2.5 border rounded-lg text-sm bg-white focus:outline-none"
        style={{ borderColor: error ? "#dc2626" : "#e5e7eb" }} data-testid={`cuet-select-${k}`}>
        <option value="">-- Select --</option>
        {opts.map(o => <option key={o}>{o}</option>)}
      </select>
      {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
    </div>
  );
}

/* ─── Welcome Banner shown after login ─── */
export function CuetWelcomeBanner({ candidate, onLogout }: { candidate: CUETRegistration; onLogout: () => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-xl mb-4 overflow-hidden border" style={{ borderColor: "#c9a84c" }}>
      <div className="flex items-center gap-3 px-4 py-3" style={{ background: "linear-gradient(90deg,#0a1f5c,#1e3a8a)" }}>
        <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-[#0a1f5c] flex-shrink-0" style={{ background: "#c9a84c" }}>
          {candidate.firstName[0]}{candidate.lastName[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-white font-bold text-sm">{candidate.firstName} {candidate.lastName}</div>
          <div className="text-[11px] font-mono" style={{ color: "#c9a84c" }}>{candidate.id}</div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold text-[#0a1f5c] bg-[#c9a84c]">✓ CUET Registered</span>
          <button onClick={() => setExpanded(e => !e)} className="text-white/40 hover:text-white/80 text-xs px-2">{expanded ? "▲" : "▼"}</button>
          <button onClick={onLogout} data-testid="cuet-logout" className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-white/20 text-white/60 hover:text-white/90 transition">Logout</button>
        </div>
      </div>
      {expanded && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-600 flex flex-wrap gap-x-6 gap-y-1">
          <span><strong>Languages:</strong> {candidate.languages.join(", ")}</span>
          <span><strong>Domain Subjects:</strong> {candidate.domainSubjects.join(", ")}</span>
          {candidate.generalTest && <span><strong>Section III:</strong> General Test ✓</span>}
          <span><strong>Test Cities:</strong> {[candidate.testCity1, candidate.testCity2, candidate.testCity3].filter(Boolean).join(" / ")}</span>
          <span><strong>Category:</strong> {candidate.category}</span>
        </div>
      )}
    </div>
  );
}

/* ─── Auth / Registration Gate ─── */
interface CuetAuthProps {
  onLogin: (id: string) => void;
}

export function CuetAuthScreen({ onLogin }: CuetAuthProps) {
  const [tab, setTab] = useState<AuthTab>("login");
  const [regs, setRegs] = useLocalStorage<CUETRegistration[]>("cuet_registrations", SEEDED_CUET_REGISTRATIONS);

  // ── Login state ──
  const [loginId, setLoginId] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = () => {
    const id = loginId.trim().toUpperCase();
    const found = regs.find(r => r.id === id);
    if (!found) { setLoginError("Application ID not found. Please check or register first."); return; }
    setLoginError("");
    onLogin(id);
  };

  // ── Registration state ──
  const [step, setStep] = useState<RegStep>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successId, setSuccessId] = useState<string | null>(null);

  const [form, setForm] = useState({
    firstName: "", lastName: "", dob: "", gender: "", mobile: "", email: "", city: "", state: "",
    qualification: "", board: "", marks: "", year: "",
    languages: [] as string[], domainSubjects: [] as string[], generalTest: true,
    testCity1: "", testCity2: "", testCity3: "",
    category: "General", pwd: "No", source: "",
  });

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  const toggleLang = (l: string) => setForm(f => ({
    ...f, languages: f.languages.includes(l) ? f.languages.filter(x => x !== l) : [...f.languages, l]
  }));

  const toggleDomain = (s: string) => setForm(f => {
    if (f.domainSubjects.includes(s)) return { ...f, domainSubjects: f.domainSubjects.filter(x => x !== s) };
    if (f.domainSubjects.length >= MAX_DOMAIN) return f;
    return { ...f, domainSubjects: [...f.domainSubjects, s] };
  });

  const validateStep1 = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Required";
    if (!form.lastName.trim()) e.lastName = "Required";
    if (!form.dob) e.dob = "Required";
    if (!form.gender) e.gender = "Required";
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile.replace(/\D/g, ""))) e.mobile = "Enter valid 10-digit mobile";
    if (!form.email.trim() || !form.email.includes("@")) e.email = "Enter valid email";
    if (!form.city.trim()) e.city = "Required";
    if (!form.state) e.state = "Required";
    if (!form.qualification) e.qualification = "Required";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (form.languages.length === 0) e.languages = "Select at least one language";
    if (form.domainSubjects.length === 0 && !form.generalTest) e.domainSubjects = "Select at least one subject or enable General Test";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: Record<string, string> = {};
    if (!form.testCity1) e.testCity1 = "Required";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const goStep = (s: RegStep) => {
    if (s === 2 && !validateStep1()) return;
    if (s === 3 && !validateStep2()) return;
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitReg = () => {
    if (!validateStep3()) return;
    const id = `CUET2026${Math.floor(100000 + Math.random() * 900000)}`;
    const reg: CUETRegistration = {
      id, firstName: form.firstName, lastName: form.lastName, dob: form.dob, gender: form.gender,
      mobile: form.mobile, email: form.email, city: form.city, state: form.state,
      qualification: form.qualification, board: form.board, marks: form.marks, year: form.year,
      languages: form.languages, domainSubjects: form.domainSubjects, generalTest: form.generalTest,
      testCity1: form.testCity1, testCity2: form.testCity2, testCity3: form.testCity3,
      category: form.category, pwd: form.pwd, source: form.source,
      registeredAt: new Date().toISOString(),
    };
    setRegs(prev => [...prev, reg]);
    setSuccessId(id);
  };

  const stepDot = (n: RegStep, label: string) => (
    <div key={n} className="flex items-center gap-1">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: step > n ? "#16a34a" : step === n ? "#0a1f5c" : "#e5e7eb", color: step >= n ? "#fff" : "#6b7280" }}>
          {step > n ? "✓" : n}
        </div>
        <span className={`text-xs font-semibold hidden sm:block ${step === n ? "text-[#0a1f5c]" : step > n ? "text-green-600" : "text-gray-400"}`}>{label}</span>
      </div>
      {n < 3 && <div className="w-5 sm:w-10 h-0.5 mx-1.5 rounded" style={{ background: step > n ? "#16a34a" : "#e5e7eb" }} />}
    </div>
  );

  /* ── Success screen ── */
  if (successId) return (
    <div className="max-w-lg mx-auto text-center py-8">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="font-serif text-2xl font-black text-[#0a1f5c] mb-2">Registration Successful!</h2>
      <p className="text-gray-500 mb-5 text-sm">Your CUET 2026 application has been received. Use the Application ID below to access mock tests.</p>
      <div className="bg-[#f5f0ff] border border-purple-200 rounded-xl p-5 mb-5">
        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Your CUET Application ID</div>
        <div className="font-serif font-black text-3xl text-[#0a1f5c]">{successId}</div>
        <div className="text-xs text-gray-500 mt-2">Save this ID to access your exam portal</div>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 mb-5 text-left">
        <strong>Registered Subjects:</strong>
        <div className="mt-1 flex flex-wrap gap-1.5">
          {form.languages.map(l => <span key={l} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-semibold">{l} (Section IA)</span>)}
          {form.domainSubjects.map(s => <span key={s} className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs font-semibold">{s} (Section II)</span>)}
          {form.generalTest && <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-semibold">General Test (Section III)</span>}
        </div>
      </div>
      <button onClick={() => onLogin(successId)} data-testid="cuet-reg-login"
        className="w-full py-3 rounded-xl text-base font-extrabold text-white"
        style={{ background: "linear-gradient(90deg,#0a1f5c,#4c1d95)" }}>
        Enter Mock Test Portal →
      </button>
    </div>
  );

  /* ── Main auth screen ── */
  return (
    <div>
      {/* Hero */}
      <div className="rounded-xl p-5 mb-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#0a1f5c,#1e3a8a)" }}>
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-extrabold text-[#0a1f5c]" style={{ background: "#c9a84c" }}>CUET 2026</div>
        <h2 className="font-serif text-xl font-black text-white mb-1">CUET Mock Test Portal</h2>
        <p className="text-xs leading-relaxed mb-3" style={{ color: "rgba(255,255,255,0.55)" }}>
          To access CUET mock tests, candidates must first complete the NTA CUET 2026 application form. Already registered? Login with your Application ID.
        </p>
        <div className="flex gap-2 flex-wrap">
          {["Free Registration", "Section II Domain Tests", "Section III General Test", "NTA CUET Pattern"].map(t => (
            <span key={t} className="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ background: "rgba(201,168,76,0.16)", color: "#f0d080", border: "1px solid rgba(201,168,76,0.28)" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Tab toggle */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5">
        {([["login", "🔑 Login", "Already registered? Enter App ID"], ["register", "📝 New Registration", "First time? Fill the application form"]] as const).map(([id, label, desc]) => (
          <button key={id} onClick={() => setTab(id)} data-testid={`cuet-tab-${id}`}
            className="flex-1 py-2.5 px-3 rounded-lg text-left transition"
            style={{ background: tab === id ? "#fff" : "transparent", boxShadow: tab === id ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>
            <div className={`text-sm font-bold ${tab === id ? "text-[#0a1f5c]" : "text-gray-500"}`}>{label}</div>
            <div className="text-[10px] text-gray-400 hidden sm:block">{desc}</div>
          </button>
        ))}
      </div>

      {/* ── LOGIN TAB ── */}
      {tab === "login" && (
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-blue-50">🎓</div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#0a1f5c]">Candidate Login</h3>
                <p className="text-xs text-gray-400">Enter your CUET Application ID to access mock tests</p>
              </div>
            </div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">CUET Application ID <span className="text-red-500">*</span></label>
            <input value={loginId} onChange={e => setLoginId(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="e.g. CUET2026847382"
              data-testid="cuet-login-id"
              className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm mb-3 focus:outline-none focus:border-blue-400 font-mono tracking-widest" />
            {loginError && <div className="text-red-600 text-xs mb-3 p-2 rounded-lg bg-red-50 border border-red-200">{loginError}</div>}
            <button onClick={handleLogin} data-testid="cuet-login-btn"
              className="w-full py-3 rounded-xl text-sm font-bold text-white"
              style={{ background: "linear-gradient(90deg,#0a1f5c,#4c1d95)" }}>
              Login to Mock Tests →
            </button>
            <div className="mt-3 pt-3 border-t border-gray-100 text-center text-xs text-gray-400">
              Try: <button onClick={() => setLoginId("CUET2026847382")} className="text-[#0a1f5c] font-semibold hover:underline">CUET2026847382</button> or{" "}
              <button onClick={() => setLoginId("CUET2026293847")} className="text-[#0a1f5c] font-semibold hover:underline">CUET2026293847</button>
            </div>
          </div>
        </div>
      )}

      {/* ── REGISTER TAB ── */}
      {tab === "register" && (
        <div>
          {/* Stepper */}
          <div className="flex items-center mb-5 px-1">
            {stepDot(1, "Personal Details")}
            {stepDot(2, "Subject Selection")}
            {stepDot(3, "Exam Preference")}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
              <h3 className="font-serif font-bold text-base text-gray-900 mb-0.5">Personal & Academic Details</h3>
              <p className="text-xs text-gray-500 mb-4">Fill as per official documents.</p>

              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 pb-1.5 border-b">Personal Information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <InputField label="First Name" k="firstName" value={form.firstName} onChange={v => set("firstName", v)} placeholder="First name" error={errors.firstName} />
                <InputField label="Last Name" k="lastName" value={form.lastName} onChange={v => set("lastName", v)} placeholder="Last name" error={errors.lastName} />
                <InputField label="Date of Birth" k="dob" value={form.dob} onChange={v => set("dob", v)} type="date" error={errors.dob} />
                <SelectField label="Gender" k="gender" value={form.gender} onChange={v => set("gender", v)} opts={["Male", "Female", "Third Gender", "Prefer not to say"]} error={errors.gender} />
                <InputField label="Mobile Number" k="mobile" value={form.mobile} onChange={v => set("mobile", v)} type="tel" placeholder="+91 XXXXX XXXXX" error={errors.mobile} />
                <InputField label="Email Address" k="email" value={form.email} onChange={v => set("email", v)} type="email" placeholder="email@example.com" error={errors.email} />
                <InputField label="City / Town" k="city" value={form.city} onChange={v => set("city", v)} placeholder="Your city" error={errors.city} />
                <SelectField label="State" k="state" value={form.state} onChange={v => set("state", v)} opts={STATES} error={errors.state} />
              </div>

              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 pb-1.5 border-b mt-4">Qualifying Examination</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SelectField label="Qualification" k="qualification" value={form.qualification} onChange={v => set("qualification", v)} opts={QUALIFICATIONS} error={errors.qualification} />
                <SelectField label="Board" k="board" value={form.board} onChange={v => set("board", v)} opts={BOARDS} required={false} />
                <InputField label="Percentage / CGPA" k="marks" value={form.marks} onChange={v => set("marks", v)} placeholder="e.g. 85% or 8.5 CGPA" required={false} />
                <SelectField label="Year of Passing" k="year" value={form.year} onChange={v => set("year", v)} opts={["Appearing 2026", "2025", "2024", "2023", "2022 or earlier"]} required={false} />
              </div>

              <div className="flex justify-end mt-5">
                <button onClick={() => goStep(2)} data-testid="cuet-step2"
                  className="px-6 py-2.5 rounded-lg text-sm font-bold text-white"
                  style={{ background: "#0a1f5c" }}>
                  Next: Select Subjects →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
              <h3 className="font-serif font-bold text-base text-gray-900 mb-0.5">CUET Subject Selection</h3>
              <p className="text-xs text-gray-500 mb-4">Select subjects for each section as per NTA CUET 2026 guidelines.</p>

              {/* Section IA — Languages */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wider">Section IA</span>
                  <span className="text-xs font-semibold text-gray-700">Language(s) — Select 1 or 2</span>
                </div>
                {errors.languages && <p className="text-red-500 text-xs mb-2">{errors.languages}</p>}
                <div className="flex flex-wrap gap-1.5">
                  {CUET_LANGUAGES.map(l => (
                    <button key={l} onClick={() => toggleLang(l)} data-testid={`lang-${l}`}
                      className="px-2.5 py-1 rounded-full text-xs font-semibold border transition"
                      style={{
                        background: form.languages.includes(l) ? "#1d4ed8" : "#fff",
                        color: form.languages.includes(l) ? "#fff" : "#374151",
                        borderColor: form.languages.includes(l) ? "#1d4ed8" : "#e5e7eb"
                      }}>
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section II — Domain Subjects */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 uppercase tracking-wider">Section II</span>
                  <span className="text-xs font-semibold text-gray-700">Domain Subjects — Select up to {MAX_DOMAIN}</span>
                </div>
                <div className="text-xs text-gray-400 mb-2">
                  Selected: <strong className={form.domainSubjects.length >= MAX_DOMAIN ? "text-red-600" : "text-[#0a1f5c]"}>{form.domainSubjects.length} / {MAX_DOMAIN}</strong>
                  {form.domainSubjects.length >= MAX_DOMAIN && <span className="text-red-500 ml-1">Maximum reached</span>}
                </div>
                {errors.domainSubjects && <p className="text-red-500 text-xs mb-2">{errors.domainSubjects}</p>}
                <div className="flex flex-wrap gap-1.5">
                  {CUET_DOMAIN_SUBJECTS.map(s => {
                    const sel = form.domainSubjects.includes(s);
                    const disabled = !sel && form.domainSubjects.length >= MAX_DOMAIN;
                    return (
                      <button key={s} onClick={() => !disabled && toggleDomain(s)} data-testid={`dom-${s}`}
                        disabled={disabled}
                        className="px-2.5 py-1 rounded-full text-xs font-semibold border transition disabled:opacity-40"
                        style={{
                          background: sel ? "#7c3aed" : "#fff",
                          color: sel ? "#fff" : "#374151",
                          borderColor: sel ? "#7c3aed" : "#e5e7eb"
                        }}>
                        {s}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Section III — General Test */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-wider">Section III</span>
                  <span className="text-xs font-semibold text-gray-700">General Test</span>
                </div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <div onClick={() => set("generalTest", !form.generalTest)}
                    className="w-12 h-6 rounded-full relative transition-colors"
                    style={{ background: form.generalTest ? "#0a1f5c" : "#d1d5db" }}>
                    <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                      style={{ left: form.generalTest ? "26px" : "2px" }} />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-800">Include General Test (Section III)</div>
                    <div className="text-xs text-gray-500">Required for most UG & PG programs · 75 Qs, 60 to attempt, 60 min</div>
                  </div>
                </label>
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="px-4 py-2 rounded-lg border text-sm font-semibold text-gray-600 border-gray-200">← Back</button>
                <button onClick={() => goStep(3)} data-testid="cuet-step3"
                  className="px-6 py-2.5 rounded-lg text-sm font-bold text-white"
                  style={{ background: "#0a1f5c" }}>
                  Next: Exam Preference →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
              <h3 className="font-serif font-bold text-base text-gray-900 mb-0.5">Exam Preferences</h3>
              <p className="text-xs text-gray-500 mb-4">Choose preferred test cities and personal details.</p>

              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 pb-1.5 border-b">Test City Preferences (NTA allocates subject-to-availability)</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <SelectField label="Test City Choice 1" k="testCity1" value={form.testCity1} onChange={v => set("testCity1", v)} opts={CUET_TEST_CITIES} error={errors.testCity1} />
                <SelectField label="Test City Choice 2" k="testCity2" value={form.testCity2} onChange={v => set("testCity2", v)} opts={CUET_TEST_CITIES} required={false} />
                <SelectField label="Test City Choice 3" k="testCity3" value={form.testCity3} onChange={v => set("testCity3", v)} opts={CUET_TEST_CITIES} required={false} />
              </div>

              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 pb-1.5 border-b mt-4">Other Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <SelectField label="Category" k="category" value={form.category} onChange={v => set("category", v)} opts={["General","OBC (Non-Creamy Layer)","SC","ST","EWS","PwD"]} required={false} />
                <SelectField label="PwD Status" k="pwd" value={form.pwd} onChange={v => set("pwd", v)} opts={["No","Yes — Visual Impairment","Yes — Hearing Impairment","Yes — Locomotor Disability","Yes — Other"]} required={false} />
                <SelectField label="How did you hear about us?" k="source" value={form.source} onChange={v => set("source", v)} opts={SOURCES} required={false} />
              </div>

              {/* Summary */}
              <div className="mt-5 p-4 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-600 space-y-1">
                <div className="font-bold text-gray-800 mb-2">Application Summary</div>
                <div><strong>Name:</strong> {form.firstName} {form.lastName}</div>
                <div><strong>Section IA:</strong> {form.languages.join(", ") || "—"}</div>
                <div><strong>Section II:</strong> {form.domainSubjects.join(", ") || "—"}</div>
                <div><strong>Section III:</strong> {form.generalTest ? "General Test ✓" : "Not selected"}</div>
                <div><strong>Test City:</strong> {form.testCity1 || "—"}</div>
              </div>

              <div className="flex justify-between mt-5 flex-wrap gap-3">
                <button onClick={() => setStep(2)} className="px-4 py-2 rounded-lg border text-sm font-semibold text-gray-600 border-gray-200">← Back</button>
                <button onClick={submitReg} data-testid="cuet-submit-reg"
                  className="px-8 py-3 rounded-xl text-sm font-extrabold text-[#0a1f5c]"
                  style={{ background: "linear-gradient(90deg,#c9a84c,#e8b840)" }}>
                  ✓ Submit CUET Application
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
