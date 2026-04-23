import { useState } from 'react';

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API = `${BASE}/registrations`;
const UG   = ['B.Tech','BBA','BCA','B.Sc','B.Com','BA','B.Ed','B.Arch'];
const PG   = ['MBA','M.Tech','MCA','M.Sc','M.Com','MA','M.Ed','M.Phil'];
const PROF = ['LLB (Law)','LLM','B.Pharma','M.Pharma','MBBS','BDS','B.Nursing','BAMS'];

const inp = 'w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 bg-white';
const lbl = 'block text-xs font-semibold text-gray-700 mb-1';

export default function RegistrationPanel() {
  const [step, setStep]       = useState(1);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr]         = useState('');
  const [appId, setAppId]     = useState('');
  const [f, setF] = useState({
    fn:'', ln:'', dob:'', gender:'', mobile:'', email:'', city:'', state:'',
    qual:'', board:'', marks:'', yop:'',
    examdate:'', exammode:'Online (CBT)', centre:'', medium:'English',
    categ:'General', scholar:'Yes, interested', hearsrc:''
  });

  const upd = e => setF(p => ({ ...p, [e.target.name]: e.target.value }));
  const toggle = c => setCourses(p => p.includes(c) ? p.filter(x=>x!==c) : [...p,c]);

  const next = (n) => {
    setErr('');
    if (n === 2) {
      if (!f.fn || !f.ln) return setErr('Please enter your full name.');
      if (!f.dob) return setErr('Date of Birth is required.');
      if (!f.gender) return setErr('Please select your gender.');
      if (!f.mobile) return setErr('Mobile number is required.');
      if (!f.email) return setErr('Email address is required.');
      if (!f.city) return setErr('City is required.');
      if (!f.state) return setErr('Please select your state.');
    }
    if (n === 3) {
      if (!f.qual) return setErr('Please select your qualification.');
      if (!f.marks) return setErr('Please enter your percentage/CGPA.');
      if (courses.length === 0) return setErr('Please select at least one course.');
    }
    setStep(n);
  };

  const submit = async () => {
    setErr('');
    if (!f.fn||!f.ln) return setErr('Please enter your full name.');
    if (!f.mobile) return setErr('Mobile number is required.');
    if (!/^[6-9]\d{9}$/.test(f.mobile.replace(/^(\+91|91|0)/, '').replace(/\s/g,''))) return setErr('Please enter a valid 10-digit Indian mobile number.');
    if (!f.email) return setErr('Email address is required.');
    if (!courses.length) return setErr('Please select at least one course in Step 2.');
    if (!f.examdate)  return setErr('Please select an exam date.');
    setLoading(true);
    try {
      const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: f.fn, lastName: f.ln, dob: f.dob, gender: f.gender,
          mobile: f.mobile, email: f.email, city: f.city, state: f.state,
          qual: f.qual, board: f.board, marks: f.marks, yop: f.yop,
          courses, examDate: f.examdate, examMode: f.exammode,
          centre: f.centre, medium: f.medium, category: f.categ,
          scholar: f.scholar, source: f.hearsrc
        })
      });
      const data = await res.json();
      if (res.ok) {
        setAppId(data.appId);
        setStep(4);
        setCourses([]);
        setF({ fn:'',ln:'',dob:'',gender:'',mobile:'',email:'',city:'',state:'',qual:'',board:'',marks:'',yop:'',examdate:'',exammode:'Online (CBT)',centre:'',medium:'English',categ:'General',scholar:'Yes, interested',hearsrc:'' });
      } else {
        setErr(data.message || 'Registration failed. Please try again.');
      }
    } catch {
      setErr('Cannot connect to server. Please make sure backend is running.');
    }
    setLoading(false);
  };

  const [copied, setCopied] = useState(false);
  const copyId = () => {
    navigator.clipboard.writeText(appId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Step 4 — Success
  if (step === 4) return (
    <div className="max-w-lg mx-auto text-center py-12 px-4">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
      </div>
      <h2 className="text-2xl font-bold text-blue-800 mb-2">Registration Successful!</h2>
      <p className="text-gray-500 mb-4 text-sm">Your Application ID is:</p>
      <div className="bg-blue-700 text-white text-2xl sm:text-3xl font-bold tracking-widest px-6 py-4 rounded-xl inline-block mb-3 font-outfit">{appId}</div>
      <div className="mb-4">
        <button onClick={copyId} className={`text-xs font-semibold px-4 py-1.5 rounded-full border transition ${copied?'bg-green-100 text-green-700 border-green-300':'bg-gray-100 text-gray-600 border-gray-300 hover:border-blue-700 hover:text-blue-700'}`}>
          {copied ? '✓ Copied!' : '📋 Copy ID'}
        </button>
      </div>
      <p className="text-gray-500 text-sm mb-6">Save this ID. You'll need it to access the exam after admin approval.</p>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6 text-left">
        <p className="text-amber-800 text-xs font-semibold mb-1">⚠️ Next Steps:</p>
        <ol className="text-amber-700 text-xs space-y-1 list-decimal list-inside">
          <li>Wait for Admin approval (you'll be notified)</li>
          <li>Go to <strong>Exam Portal</strong> tab</li>
          <li>Enter your Application ID to start the exam</li>
        </ol>
      </div>
      <button onClick={() => { setStep(1); setAppId(''); setCopied(false); }} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg text-sm transition">Register Another Candidate</button>
    </div>
  );

  const stepLabel = ['Personal Info', 'Academic & Courses', 'Exam Preference'];

  return (
    <div>

      {/* Stepper */}
      <div className="flex items-center mb-6">
        {stepLabel.map((label, i) => {
          const n = i + 1;
          const done = step > n, active = step === n;
          return (
            <div key={n} className="flex items-center flex-1">
              <div className="flex items-center gap-2 shrink-0">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${done?'bg-green-600 text-white':active?'bg-blue-700 text-white':'bg-gray-200 text-gray-500'}`}>
                  {done ? '✓' : n}
                </div>
                <span className={`text-xs font-semibold hidden sm:block ${active?'text-blue-700':done?'text-green-600':'text-gray-400'}`}>{label}</span>
              </div>
              {i < 2 && <div className={`flex-1 h-0.5 mx-2 ${step > n ? 'bg-green-500' : 'bg-gray-200'}`}/>}
            </div>
          );
        })}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4">
          <h3 className="text-blue-800 font-bold text-lg font-outfit mb-1">Personal Information</h3>
          <p className="text-gray-400 text-xs mb-4">Fill in your details as per school/college records.</p>

          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">Basic Details</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div><label className={lbl}>First Name <span className="text-red-500">*</span></label><input name="fn" value={f.fn} onChange={upd} placeholder="First name" className={inp}/></div>
            <div><label className={lbl}>Last Name <span className="text-red-500">*</span></label><input name="ln" value={f.ln} onChange={upd} placeholder="Last name" className={inp}/></div>
            <div><label className={lbl}>Date of Birth <span className="text-red-500">*</span></label><input type="date" name="dob" value={f.dob} onChange={upd} className={inp}/></div>
            <div><label className={lbl}>Gender <span className="text-red-500">*</span></label>
              <select name="gender" value={f.gender} onChange={upd} className={inp}>
                <option value="">-- Select --</option>
                <option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option>
              </select>
            </div>
          </div>

          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 pb-2 border-b border-gray-100">Contact Details</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label className={lbl}>Mobile Number <span className="text-red-500">*</span></label><input name="mobile" type="tel" value={f.mobile} onChange={upd} placeholder="+91 XXXXX XXXXX" className={inp}/></div>
            <div><label className={lbl}>Email Address <span className="text-red-500">*</span></label><input name="email" type="email" value={f.email} onChange={upd} placeholder="email@example.com" className={inp}/></div>
            <div><label className={lbl}>City <span className="text-red-500">*</span></label><input name="city" value={f.city} onChange={upd} placeholder="Your city" className={inp}/></div>
            <div><label className={lbl}>State <span className="text-red-500">*</span></label>
              <select name="state" value={f.state} onChange={upd} className={inp}>
                <option value="">-- Select State --</option>
                {['Uttar Pradesh','Delhi','Bihar','Madhya Pradesh','Rajasthan','Gujarat','Maharashtra','Punjab','Haryana','Other'].map(s=><option key={s}>{s}</option>)}
              </select>
            </div>
          </div>

          {err && <p className="mt-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{err}</p>}
          <div className="flex justify-end mt-5">
            <button onClick={() => next(2)} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg text-sm transition">Next: Academic Details →</button>
          </div>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4">
            <h3 className="text-blue-800 font-bold text-lg font-outfit mb-1">Academic Background</h3>
            <p className="text-gray-400 text-xs mb-4">Enter your last qualification details.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div><label className={lbl}>Highest Qualification <span className="text-red-500">*</span></label>
                <select name="qual" value={f.qual} onChange={upd} className={inp}>
                  <option value="">-- Select --</option>
                  <option>Class 10</option><option>Class 12 / Intermediate</option><option>Graduation</option><option>Post Graduation</option>
                </select>
              </div>
              <div><label className={lbl}>Board / University</label><input name="board" value={f.board} onChange={upd} placeholder="e.g. CBSE, UP Board, LU" className={inp}/></div>
              <div><label className={lbl}>Percentage / CGPA <span className="text-red-500">*</span></label><input name="marks" value={f.marks} onChange={upd} placeholder="e.g. 85% or 8.5 CGPA" className={inp}/></div>
              <div><label className={lbl}>Year of Passing</label>
                <select name="yop" value={f.yop} onChange={upd} className={inp}>
                  <option value="">-- Select --</option>
                  <option>Appearing 2026</option><option>2025</option><option>2024</option><option>2023</option><option>2022</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4">
            <h3 className="text-blue-800 font-bold text-lg font-outfit mb-1">Select Desired Course(s)</h3>
            <p className="text-gray-400 text-xs mb-4">Tap to select one or more courses. The exam will be tailored to your selection.</p>
            {[['UG Programs','4 years',UG],['PG Programs','2 years',PG],['Professional Programs','3-5 years',PROF]].map(([label,dur,list])=>(
              <div key={label} className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-blue-800">{label}</span>
                  <span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">{dur}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {list.map(c=>(
                    <button key={c} type="button" onClick={()=>toggle(c)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition ${courses.includes(c)?'bg-blue-700 text-white border-blue-700':'bg-white text-gray-600 border-gray-300 hover:border-blue-700 hover:text-blue-700'}`}>
                      {c}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {err && <p className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{err}</p>}
          <div className="flex justify-between">
            <button onClick={()=>next(1)} className="border border-gray-300 text-gray-600 hover:border-blue-700 hover:text-blue-700 font-semibold px-5 py-2 rounded-lg text-sm transition">← Back</button>
            <button onClick={()=>next(3)} className="bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-2 rounded-lg text-sm transition">Next: Exam Preference →</button>
          </div>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 mb-4">
            <h3 className="text-blue-800 font-bold text-lg font-outfit mb-1">Exam Preference</h3>
            <p className="text-gray-400 text-xs mb-4">Choose your preferred exam date, mode, and centre.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              <div><label className={lbl}>Exam Date <span className="text-red-500">*</span></label>
                <select name="examdate" value={f.examdate} onChange={upd} className={inp}>
                  <option value="">-- Select --</option>
                  <option>15 May 2026 (Morning)</option><option>15 May 2026 (Evening)</option>
                  <option>22 May 2026 (Morning)</option><option>22 May 2026 (Evening)</option>
                  <option>01 Jun 2026 (Morning)</option><option>15 Jun 2026 (Morning)</option>
                </select>
              </div>
              <div><label className={lbl}>Exam Mode</label>
                <select name="exammode" value={f.exammode} onChange={upd} className={inp}>
                  <option>Online (CBT)</option><option>Offline (Pen &amp; Paper)</option>
                </select>
              </div>
              <div><label className={lbl}>Exam Centre</label>
                <select name="centre" value={f.centre} onChange={upd} className={inp}>
                  <option value="">-- Select --</option>
                  <option>Lucknow Main Campus</option><option>Barabanki Centre</option>
                  <option>Sitapur Centre</option><option>Hardoi Centre</option><option>Raebareli Centre</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div><label className={lbl}>Medium of Exam</label>
                <select name="medium" value={f.medium} onChange={upd} className={inp}>
                  <option>English</option><option>Hindi</option><option>Bilingual (Both)</option>
                </select>
              </div>
              <div><label className={lbl}>Category</label>
                <select name="categ" value={f.categ} onChange={upd} className={inp}>
                  <option>General</option><option>OBC</option><option>SC</option><option>ST</option><option>EWS</option>
                </select>
              </div>
              <div><label className={lbl}>Scholarship Interest</label>
                <select name="scholar" value={f.scholar} onChange={upd} className={inp}>
                  <option>Yes, interested</option><option>No, not required</option>
                </select>
              </div>
              <div><label className={lbl}>How did you hear about us?</label>
                <select name="hearsrc" value={f.hearsrc} onChange={upd} className={inp}>
                  <option value="">-- Select --</option>
                  <option>School / College</option><option>Social Media</option><option>Friends / Family</option>
                  <option>Newspaper / Magazine</option><option>Coaching Institute</option>
                  <option>University Website</option><option>Other</option>
                </select>
              </div>
            </div>
          </div>

          {err && <p className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">{err}</p>}
          <div className="flex justify-between">
            <button onClick={()=>next(2)} className="border border-gray-300 text-gray-600 hover:border-blue-700 hover:text-blue-700 font-semibold px-5 py-2 rounded-lg text-sm transition">← Back</button>
            <button onClick={submit} disabled={loading} className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-2 rounded-lg text-sm transition disabled:opacity-60">
              {loading ? 'Submitting...' : '✓ Submit Registration'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
