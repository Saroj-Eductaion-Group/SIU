import { useState, useEffect } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";
import {
  CUET_TEST_CITIES,
  CUETRegistration,
} from "../lib/data";

const BASE = import.meta.env.VITE_API_URL || `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:5000/api`;

const STATES = ["Uttar Pradesh","Delhi","Bihar","Madhya Pradesh","Rajasthan","Gujarat","Maharashtra","Punjab","Haryana","Uttarakhand","Jharkhand","West Bengal","Assam","Tamil Nadu","Telangana","Andhra Pradesh","Karnataka","Kerala","Odisha","Other"];
const QUALIFICATIONS = ["Class 12 / Intermediate (Appearing 2026)","Class 12 / Intermediate (Passed)"];
const BOARDS = ["CBSE","ICSE","UP Board","MP Board","Maharashtra Board","RBSE (Rajasthan)","State Board (Other)"];
const SOURCES = ["School / College","Social Media","Friends / Family","Coaching Institute","Newspaper","University Website","Other"];

type AuthTab = "login" | "register";
type RegStep = 1 | 2;

function InputField({ label, k, value, onChange, type = "text", placeholder = "", required = true, error }: { label: string; k: string; value: string; onChange: (v: string) => void; type?: string; placeholder?: string; required?: boolean; error?: string }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}{required && <span className="text-red-500 ml-0.5">*</span>}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none transition"
        style={{ borderColor: error ? "#dc2626" : "#e5e7eb" }} data-testid={`neet-input-${k}`} />
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
        style={{ borderColor: error ? "#dc2626" : "#e5e7eb" }} data-testid={`neet-select-${k}`}>
        <option value="">-- Select --</option>
        {opts.map(o => <option key={o}>{o}</option>)}
      </select>
      {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
    </div>
  );
}

/* ─── Welcome Banner shown after login ─── */
export function NeetWelcomeBanner({ candidate, onLogout }: { candidate: CUETRegistration; onLogout: () => void }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-xl mb-4 overflow-hidden border" style={{ borderColor: "#c9a84c" }}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3" style={{ background: "linear-gradient(90deg,#064e3b,#0d9488)", display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        {/* Left: Avatar & Candidate Info */}
        <div className="flex items-center gap-3 min-w-0" style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, width: '100%' }}>
          <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm text-[#064e3b] flex-shrink-0" style={{ background: "#c9a84c", width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            {candidate.firstName[0]}{candidate.lastName[0]}
          </div>
          <div className="min-w-0" style={{ minWidth: 0, flex: 1 }}>
            <div className="text-white font-bold text-sm truncate" style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>
              {candidate.firstName} {candidate.lastName}
            </div>
            <div className="text-[11px] font-mono" style={{ color: "#c9a84c", fontSize: '11px', fontFamily: 'monospace', opacity: 0.85 }}>
              {candidate.id}
            </div>
          </div>
        </div>

        {/* Right: Status Pill & Logout Action */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end sm:justify-start border-t border-white/10 pt-2 sm:pt-0 sm:border-0 flex-shrink-0" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, width: '100%', justifyContent: 'flex-end', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '8px' }}>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-bold text-[#064e3b] bg-[#c9a84c] whitespace-nowrap" style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '9999px', fontWeight: 'bold', color: '#064e3b', backgroundColor: '#c9a84c', whiteSpace: 'nowrap' }}>
            ✓ NEET Registered
          </span>
          <button onClick={() => setExpanded(e => !e)} className="text-white/40 hover:text-white/80 text-xs px-2" style={{ color: 'rgba(255,255,255,0.4)', padding: '0 8px', fontSize: '12px', background: 'none', border: 'none', cursor: 'pointer' }}>
            {expanded ? "▲" : "▼"}
          </button>
          <button onClick={onLogout} data-testid="neet-logout" className="text-[11px] font-semibold px-2.5 py-1 rounded-lg border border-white/20 text-white/60 hover:text-white/90 transition" style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', background: 'none' }}>
            Logout
          </button>
        </div>
      </div>
      {expanded && (
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-600 flex flex-wrap gap-x-6 gap-y-1">
          <span><strong>Language Medium:</strong> {candidate.languages.join(", ")}</span>
          <span><strong>Domain Stream:</strong> Physics, Chemistry, Biology (Botany & Zoology)</span>
          <span><strong>Test Cities:</strong> {[candidate.testCity1, candidate.testCity2, candidate.testCity3].filter(Boolean).join(" / ")}</span>
          <span><strong>Category:</strong> {candidate.category}</span>
        </div>
      )}
    </div>
  );
}

/* ─── Auth / Registration Gate ─── */
interface NeetAuthProps {
  onLogin: (id: string) => void;
}

export function NeetAuthScreen({ onLogin }: NeetAuthProps) {
  const [tab, setTab] = useState<AuthTab>("login");
  const [regs, setRegs] = useLocalStorage<CUETRegistration[]>("neet_registrations", []);
  const [siuRegs, setSiuRegs] = useLocalStorage<any[]>("siu_registrations", []);

  // Automatically clear out any residual TEST999 or test candidates from local storage
  useEffect(() => {
    if (siuRegs.some(r => r.id === "TEST999" || r.id === "SIU156714" || r.id === "SIU120229")) {
      setSiuRegs(prev => prev.filter(r => r.id !== "TEST999" && r.id !== "SIU156714" && r.id !== "SIU120229"));
    }
    if (regs.some(r => r.id === "TEST999" || r.id === "SIU156714" || r.id === "SIU120229" || r.id === "NEET2026156714" || r.id === "NEET2026120229")) {
      setRegs(prev => prev.filter(r => r.id !== "TEST999" && r.id !== "SIU156714" && r.id !== "SIU120229" && r.id !== "NEET2026156714" && r.id !== "NEET2026120229"));
    }
  }, [siuRegs, setSiuRegs, regs, setRegs]);

  // ── Login state ──
  const [loginId, setLoginId] = useState("");
  const [loginError, setLoginError] = useState("");

  const handleLogin = async () => {
    const id = loginId.trim().toUpperCase();
    setLoginError("");

    // Try to login via backend
    try {
      const res = await fetch(`${BASE}/neet/login/${id}`);
      const data = await res.json();
      if (res.ok && data) {
        // Successfully verified with database! Sync to local state
        const syncedCandidate: CUETRegistration = {
          id: data.neetId,
          firstName: data.firstName,
          lastName: data.lastName,
          dob: data.dob,
          gender: data.gender,
          mobile: data.mobile,
          email: data.email,
          city: data.city,
          state: data.state,
          qualification: data.qualification,
          board: data.board || "—",
          marks: data.marks || "—",
          year: data.year || "—",
          languages: data.languages || ["English"],
          domainSubjects: ["Physics", "Chemistry", "Biology (Botany & Zoology)"],
          generalTest: false,
          testCity1: data.city || "Lucknow",
          testCity2: "",
          testCity3: "",
          category: data.category || "General",
          pwd: "No",
          source: "NEET AI Portal (DB Sync)",
          registeredAt: data.registeredAt || new Date().toISOString()
        };
        
        setRegs(prev => [...prev.filter(r => r.id !== id), syncedCandidate]);

        // Sync to unified registrations list as well
        const syncedSiuReg = {
          id: data.neetId,
          firstName: data.firstName,
          lastName: data.lastName,
          mobile: data.mobile,
          email: data.email,
          city: data.city,
          state: data.state,
          qualification: data.qualification,
          board: data.board || "CBSE",
          marks: data.marks || "—",
          year: data.year || "2026",
          courses: ["B.Sc (Pre-Medical)", "B.Pharma"],
          examDate: "TBD (NEET Slot)",
          examMode: "Online (CBT)",
          examCentre: data.city || "Lucknow Main Campus",
          medium: (data.languages && data.languages[0]) || "English",
          category: data.category || "General",
          source: "NEET AI Portal (DB Sync)",
          status: "Approved" as const, // Automatically approve synced candidates for mock logins
          registeredAt: data.registeredAt || new Date().toISOString(),
          examCompleted: false,
          score: null as number | null
        };
        setSiuRegs(prev => [...prev.filter(r => r.id !== id), syncedSiuReg]);

        onLogin(id);
        return;
      }
    } catch (e) {
      console.warn("Backend login offline, falling back to local verification", e);
    }

    const found = regs.find(r => r.id === id);
    if (!found) { setLoginError("Application ID not found. Please check or register first."); return; }

    // Enforce Admin Approval Gate
    const siuFound = siuRegs.find(r => r.id === id);
    if (siuFound) {
      if (siuFound.status === "Pending") {
        setLoginError("Your mock test application is still under review. Please wait for admin approval before attempting tests.");
        return;
      }
      if (siuFound.status === "Rejected") {
        setLoginError("Your mock test application has been rejected. Please contact the SIU prep office.");
        return;
      }
    }

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
    languageMedium: "English",
    testCity1: "", testCity2: "", testCity3: "",
    category: "General", pwd: "No", source: "",
  });

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

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
    if (!form.testCity1) e.testCity1 = "Required";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const goStep = (s: RegStep) => {
    if (s === 2 && !validateStep1()) return;
    setStep(s);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const submitReg = async () => {
    if (!validateStep2()) return;
    
    const registeredAt = new Date().toISOString();
    let generatedId = "";

    // 1. Attempt to register via backend MongoDB
    try {
      const res = await fetch(`${BASE}/neet/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          dob: form.dob,
          gender: form.gender,
          mobile: form.mobile,
          email: form.email,
          city: form.city,
          state: form.state,
          qualification: form.qualification,
          board: form.board,
          marks: form.marks,
          year: form.year,
          languages: [form.languageMedium]
        })
      });
      const data = await res.json();
      if (res.ok && data.success && data.neetId) {
        generatedId = data.neetId;
        console.log("🟢 Successfully registered NEET candidate in database:", generatedId);
      }
    } catch (e) {
      console.warn("Backend NEET registration offline, falling back to local storage registration", e);
    }

    // 2. Fallback to client-side local ID if backend is unseeded or offline
    if (!generatedId) {
      generatedId = `NEET2026${Math.floor(100000 + Math.random() * 900000)}`;
    }

    // 3. Save locally in local storage for instant access
    const reg: CUETRegistration = {
      id: generatedId,
      firstName: form.firstName,
      lastName: form.lastName,
      dob: form.dob,
      gender: form.gender,
      mobile: form.mobile,
      email: form.email,
      city: form.city,
      state: form.state,
      qualification: form.qualification,
      board: form.board,
      marks: form.marks,
      year: form.year,
      languages: [form.languageMedium],
      domainSubjects: ["Physics", "Chemistry", "Biology (Botany & Zoology)"],
      generalTest: false,
      testCity1: form.testCity1,
      testCity2: form.testCity2,
      testCity3: form.testCity3,
      category: form.category,
      pwd: form.pwd,
      source: form.source || "NEET AI Portal (DB Sync)",
      registeredAt
    };
    setRegs(prev => [...prev.filter(r => r.id !== generatedId), reg]);

    // Sync newly created NEET candidate to siu_registrations for unified admin dashboard visibility
    const siuReg = {
      id: generatedId,
      firstName: form.firstName,
      lastName: form.lastName,
      mobile: form.mobile,
      email: form.email,
      city: form.city,
      state: form.state,
      qualification: form.qualification,
      board: form.board || "CBSE",
      marks: form.marks || "—",
      year: form.year || "2026",
      courses: ["B.Sc (Pre-Medical)", "B.Pharma"],
      examDate: "TBD (NEET Slot)",
      examMode: "Online (CBT)",
      examCentre: form.testCity1 || "Lucknow Main Campus",
      medium: form.languageMedium,
      category: form.category,
      source: form.source || "NEET AI Portal (DB Sync)",
      status: "Pending" as const,
      registeredAt,
      examCompleted: false,
      score: null as number | null
    };
    setSiuRegs(prev => [...prev.filter(r => r.id !== generatedId), siuReg]);

    setSuccessId(generatedId);
  };

  const stepDot = (n: RegStep, label: string) => (
    <div key={n} className="flex items-center gap-1">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: step > n ? "#16a34a" : step === n ? "#064e3b" : "#e5e7eb", color: step >= n ? "#fff" : "#6b7280" }}>
          {step > n ? "✓" : n}
        </div>
        <span className={`text-xs font-semibold hidden sm:block ${step === n ? "text-[#064e3b]" : step > n ? "text-green-600" : "text-gray-400"}`}>{label}</span>
      </div>
      {n < 2 && <div className="w-5 sm:w-10 h-0.5 mx-1.5 rounded" style={{ background: step > n ? "#16a34a" : "#e5e7eb" }} />}
    </div>
  );

  /* ── Success screen ── */
  if (successId) return (
    <div className="max-w-lg mx-auto text-center py-8">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="font-serif text-2xl font-black text-[#064e3b] mb-2">Registration Successful!</h2>
      <p className="text-gray-500 mb-5 text-sm">Your NEET Mock Test application has been processed. Use the Application ID below to log in and attempt tests.</p>
      <div className="bg-[#e6fffa] border border-teal-200 rounded-xl p-5 mb-5">
        <div className="text-xs text-teal-600 uppercase tracking-wider mb-1">Your NEET Application ID</div>
        <div className="font-serif font-black text-3xl text-[#064e3b]">{successId}</div>
        <div className="text-xs text-gray-500 mt-2">Save this ID to access your NEET mock portal</div>
      </div>
      <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 text-sm text-teal-800 mb-5 text-left">
        <strong>Registered Subjects:</strong>
        <div className="mt-1 flex flex-wrap gap-1.5">
          <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded text-xs font-semibold">Physics (Core)</span>
          <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded text-xs font-semibold">Chemistry (Core)</span>
          <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded text-xs font-semibold">Biology (Botany & Zoology)</span>
          <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs font-semibold">Medium: {form.languageMedium}</span>
        </div>
      </div>
      <button onClick={() => onLogin(successId)} data-testid="neet-reg-login"
        className="w-full py-3 rounded-xl text-base font-extrabold text-white"
        style={{ background: "linear-gradient(90deg,#064e3b,#0d9488)" }}>
        Enter Mock Test Portal →
      </button>
    </div>
  );

  /* ── Main auth screen ── */
  return (
    <div>
      {/* Hero */}
      <div className="rounded-xl p-5 mb-5 relative overflow-hidden" style={{ background: "linear-gradient(135deg,#064e3b,#0d9488)" }}>
        <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-extrabold text-[#064e3b]" style={{ background: "#c9a84c" }}>NEET 2026</div>
        <h2 className="font-serif text-xl font-black text-white mb-1">NEET Preparation Hub</h2>
        <p className="text-xs leading-relaxed mb-3 text-white/80">
          Access high-fidelity NEET mock tests, NCERT exemplar revision, and AI performance reports. Register today or login with your Application ID.
        </p>
        <div className="flex gap-2 flex-wrap">
          {["Free Mock Registration", "Physics & Chemistry Sets", "Zoology & Botany Full Mocks", "NTA NEET Pattern"].map(t => (
            <span key={t} className="px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ background: "rgba(201,168,76,0.16)", color: "#f0d080", border: "1px solid rgba(201,168,76,0.28)" }}>{t}</span>
          ))}
        </div>
      </div>

      {/* Tab toggle */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-5">
        {([["login", "🔑 Login", "Already registered? Enter App ID"], ["register", "📝 New Registration", "Get your mock portal login credentials"]] as const).map(([id, label, desc]) => (
          <button key={id} onClick={() => setTab(id)} data-testid={`neet-tab-${id}`}
            className="flex-1 py-2.5 px-3 rounded-lg text-left transition"
            style={{ background: tab === id ? "#fff" : "transparent", boxShadow: tab === id ? "0 1px 4px rgba(0,0,0,0.1)" : "none" }}>
            <div className={`text-sm font-bold ${tab === id ? "text-[#064e3b]" : "text-gray-500"}`}>{label}</div>
            <div className="text-[10px] text-gray-400 hidden sm:block">{desc}</div>
          </button>
        ))}
      </div>

      {/* ── LOGIN TAB ── */}
      {tab === "login" && (
        <div className="max-w-md mx-auto">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl bg-teal-50">🧬</div>
              <div>
                <h3 className="font-serif font-bold text-lg text-[#064e3b]">Candidate Login</h3>
                <p className="text-xs text-gray-400">Enter your NEET Application ID to access mocks</p>
              </div>
            </div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">NEET Application ID <span className="text-red-500">*</span></label>
            <input value={loginId} onChange={e => setLoginId(e.target.value)} onKeyDown={e => e.key === "Enter" && handleLogin()}
              placeholder="e.g. NEET2026847382"
              data-testid="neet-login-id"
              className="w-full px-3 py-3 border border-gray-300 rounded-xl text-sm mb-3 focus:outline-none focus:border-teal-700 font-mono tracking-widest uppercase" />
            {loginError && <div className="text-red-600 text-xs mb-3 p-2 rounded-lg bg-red-50 border border-red-200">{loginError}</div>}
            <button onClick={handleLogin} data-testid="neet-login-btn"
              className="w-full py-3 rounded-xl text-sm font-bold text-white shadow-md bg-teal-800 hover:bg-teal-900"
              style={{ background: "linear-gradient(90deg,#064e3b,#0d9488)" }}>
              Login to NEET Portal →
            </button>
            <div className="mt-3 pt-3 border-t border-gray-100 text-center text-xs text-gray-400">
              Demo Account: <button onClick={() => setLoginId("NEET2026839201")} className="text-[#064e3b] font-semibold hover:underline">NEET2026839201</button>
            </div>
          </div>
        </div>
      )}

      {/* ── REGISTER TAB ── */}
      {tab === "register" && (
        <div>
          {/* Stepper */}
          <div className="flex items-center mb-5 px-1 justify-center">
            {stepDot(1, "Personal Info")}
            {stepDot(2, "Preferences")}
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
              <h3 className="font-serif font-bold text-base text-gray-900 mb-0.5">Personal & Academic Details</h3>
              <p className="text-xs text-gray-500 mb-4">Please fill in details matching your official school credentials.</p>

              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 pb-1.5 border-b">Personal Information</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <InputField label="First Name" k="firstName" value={form.firstName} onChange={v => set("firstName", v)} placeholder="First name" error={errors.firstName} />
                <InputField label="Last Name" k="lastName" value={form.lastName} onChange={v => set("lastName", v)} placeholder="Last name" error={errors.lastName} />
                <InputField label="Date of Birth" k="dob" value={form.dob} onChange={v => set("dob", v)} type="date" error={errors.dob} />
                <SelectField label="Gender" k="gender" value={form.gender} onChange={v => set("gender", v)} opts={["Male", "Female", "Prefer not to say"]} error={errors.gender} />
                <InputField label="Mobile Number" k="mobile" value={form.mobile} onChange={v => set("mobile", v)} type="tel" placeholder="10-digit mobile" error={errors.mobile} />
                <InputField label="Email Address" k="email" value={form.email} onChange={v => set("email", v)} type="email" placeholder="email@example.com" error={errors.email} />
                <InputField label="City" k="city" value={form.city} onChange={v => set("city", v)} placeholder="Your city" error={errors.city} />
                <SelectField label="State" k="state" value={form.state} onChange={v => set("state", v)} opts={STATES} error={errors.state} />
              </div>

              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 pb-1.5 border-b mt-4">Qualifying Examination</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <SelectField label="Qualification" k="qualification" value={form.qualification} onChange={v => set("qualification", v)} opts={QUALIFICATIONS} error={errors.qualification} />
                <SelectField label="Board" k="board" value={form.board} onChange={v => set("board", v)} opts={BOARDS} required={false} />
                <InputField label="Class 12 % Marks" k="marks" value={form.marks} onChange={v => set("marks", v)} placeholder="e.g. 92%" required={false} />
                <SelectField label="Year of Passing" k="year" value={form.year} onChange={v => set("year", v)} opts={["Appearing 2026", "2025", "2024 or earlier"]} required={false} />
              </div>

              <div className="flex justify-end mt-5">
                <button onClick={() => goStep(2)} data-testid="neet-step2"
                  className="px-6 py-2.5 rounded-lg text-sm font-bold text-white bg-teal-800 hover:bg-teal-900 transition shadow-sm"
                  style={{ background: "#064e3b" }}>
                  Next: Exam Preferences →
                </button>
              </div>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
              <h3 className="font-serif font-bold text-base text-gray-900 mb-0.5">Mock Test Preferences</h3>
              <p className="text-xs text-gray-500 mb-4">Confirm your medical stream selections.</p>

              {/* Subject details info */}
              <div className="mb-4 p-4 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs leading-relaxed space-y-1">
                <p className="font-bold">✓ Standard NEET PCB Pack Pre-allocated:</p>
                <p>• Physics (45 Questions) · Chemistry (45 Questions) · Botany & Zoology (90 Questions)</p>
                <p>• Scoring Scheme: <strong>+4 Marks</strong> for Correct, <strong>-1 Mark</strong> for Incorrect, <strong>0</strong> for Skipped.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <SelectField label="Preferred Language Medium" k="languageMedium" value={form.languageMedium} onChange={v => set("languageMedium", v)} opts={["English", "Hindi"]} />
                <SelectField label="Primary Exam Location" k="testCity1" value={form.testCity1} onChange={v => set("testCity1", v)} opts={CUET_TEST_CITIES} error={errors.testCity1} />
              </div>

              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 pb-1.5 border-b mt-4">Additional Details</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <SelectField label="Category" k="category" value={form.category} onChange={v => set("category", v)} opts={["General","OBC-NCL","SC","ST","EWS"]} required={false} />
                <SelectField label="PwD Status" k="pwd" value={form.pwd} onChange={v => set("pwd", v)} opts={["No","Yes"]} required={false} />
                <SelectField label="How did you hear about us?" k="source" value={form.source} onChange={v => set("source", v)} opts={SOURCES} required={false} />
              </div>

              <div className="flex justify-between mt-6">
                <button onClick={() => setStep(1)} className="px-4 py-2.5 rounded-lg border text-xs font-semibold text-gray-600 border-gray-200 bg-white">← Back</button>
                <button onClick={submitReg} data-testid="neet-submit-reg"
                  className="px-8 py-2.5 rounded-xl text-xs font-extrabold text-[#064e3b] shadow-md transition"
                  style={{ background: "linear-gradient(90deg,#c9a84c,#e8b840)" }}>
                  ✓ Submit NEET Registration
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
