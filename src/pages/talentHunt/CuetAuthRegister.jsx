import { useState } from 'react';
import { cuetRegister, cuetLogin } from './api';

const STATES = ["Uttar Pradesh","Delhi","Bihar","Madhya Pradesh","Rajasthan","Gujarat","Maharashtra","Punjab","Haryana","Uttarakhand","Jharkhand","West Bengal","Assam","Tamil Nadu","Telangana","Andhra Pradesh","Karnataka","Kerala","Odisha","Other"];
const BOARDS = ["CBSE","ICSE","UP Board","MP Board","Maharashtra Board","RBSE (Rajasthan)","HBSE (Haryana)","PSEB (Punjab)","WBBSE (West Bengal)","State Board (Other)"];
const LANGUAGES = ["English","Hindi","Assamese","Bengali","Gujarati","Kannada","Malayalam","Marathi","Odia","Punjabi","Tamil","Telugu","Urdu","Sanskrit"];
const DOMAIN_SUBJECTS = ["Physics","Chemistry","Biology (Botany & Zoology)","Mathematics","Accountancy","Business Studies","Economics","History","Political Science","Geography","Sociology","Psychology","Computer Science","Information Practices","Agriculture","Home Science","Fine Arts","Entrepreneurship","Legal Studies","Environmental Science","Physical Education"];
const TEST_CITIES = ["Lucknow","Delhi","Varanasi","Agra","Kanpur","Prayagraj","Bareilly","Meerut","Mumbai","Bengaluru","Chennai","Hyderabad","Kolkata","Jaipur","Chandigarh","Patna","Bhopal","Ahmedabad","Pune","Guwahati"];

const F = ({ label, k, value, onChange, type='text', ph='', req=true, err }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-700 mb-1">{label}{req && <span className="text-red-500 ml-0.5">*</span>}</label>
    <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={ph}
      className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none transition"
      style={{ borderColor: err ? '#dc2626' : '#e5e7eb' }} />
    {err && <p className="text-red-500 text-xs mt-0.5">{err}</p>}
  </div>
);

const S = ({ label, k, value, onChange, opts, req=true, err }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-700 mb-1">{label}{req && <span className="text-red-500 ml-0.5">*</span>}</label>
    <select value={value} onChange={e => onChange(e.target.value)}
      className="w-full px-3 py-2.5 border rounded-lg text-sm bg-white focus:outline-none"
      style={{ borderColor: err ? '#dc2626' : '#e5e7eb' }}>
      <option value="">-- Select --</option>
      {opts.map(o => <option key={o}>{o}</option>)}
    </select>
    {err && <p className="text-red-500 text-xs mt-0.5">{err}</p>}
  </div>
);

export default function CuetAuthRegister({ onLogin }) {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successId, setSuccessId] = useState(null);

  const [form, setForm] = useState({
    firstName:'', lastName:'', dob:'', gender:'', mobile:'', email:'', city:'', state:'',
    qualification:'', board:'', marks:'', year:'',
    languages:[], domainSubjects:[], generalTest:true,
    testCity1:'', testCity2:'', testCity3:'',
    category:'General', pwd:'No', source:'',
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleLang = l => setForm(f => ({ ...f, languages: f.languages.includes(l) ? f.languages.filter(x=>x!==l) : [...f.languages, l] }));
  const toggleDomain = s => setForm(f => {
    if (f.domainSubjects.includes(s)) return { ...f, domainSubjects: f.domainSubjects.filter(x=>x!==s) };
    if (f.domainSubjects.length >= 6) return f;
    return { ...f, domainSubjects: [...f.domainSubjects, s] };
  });

  const v1 = () => {
    const e = {};
    if (!form.firstName.trim()) e.firstName='Required';
    if (!form.lastName.trim())  e.lastName='Required';
    if (!form.dob)              e.dob='Required';
    if (!form.gender)           e.gender='Required';
    if (!form.mobile.trim() || !/^\d{10}$/.test(form.mobile.replace(/\D/g,''))) e.mobile='Enter valid 10-digit mobile';
    if (!form.email.trim() || !form.email.includes('@')) e.email='Enter valid email';
    if (!form.city.trim())      e.city='Required';
    if (!form.state)            e.state='Required';
    if (!form.qualification)    e.qualification='Required';
    setErrors(e); return Object.keys(e).length===0;
  };
  const v2 = () => {
    const e = {};
    if (form.languages.length===0) e.languages='Select at least one language';
    setErrors(e); return Object.keys(e).length===0;
  };
  const v3 = () => {
    const e = {};
    if (!form.testCity1) e.testCity1='Required';
    setErrors(e); return Object.keys(e).length===0;
  };

  const goStep = s => {
    if (s===2 && !v1()) return;
    if (s===3 && !v2()) return;
    setStep(s); window.scrollTo({top:0,behavior:'smooth'});
  };

  const submit = async () => {
    if (!v3()) return;
    setLoading(true);
    try {
      const res = await cuetRegister(form);
      if (res.success) setSuccessId(res.cuetId);
      else setErrors({ submit: res.message || 'Registration failed.' });
    } catch { setErrors({ submit: 'Server error. Please try again.' }); }
    finally { setLoading(false); }
  };

  const enterPortal = async () => {
    try {
      const data = await cuetLogin(successId);
      onLogin(data);
    } catch { onLogin({ cuetId: successId, firstName: form.firstName, lastName: form.lastName, languages: form.languages, domainSubjects: form.domainSubjects, generalTest: form.generalTest, testCity1: form.testCity1, category: form.category }); }
  };

  const dot = (n, label) => (
    <div key={n} className="flex items-center gap-1">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
          style={{ background: step>n?'#16a34a':step===n?'#0a1f5c':'#e5e7eb', color: step>=n?'#fff':'#6b7280' }}>
          {step>n?'✓':n}
        </div>
        <span className={`text-xs font-semibold hidden sm:block ${step===n?'text-[#0a1f5c]':step>n?'text-green-600':'text-gray-400'}`}>{label}</span>
      </div>
      {n<3 && <div className="w-5 sm:w-10 h-0.5 mx-1.5 rounded" style={{ background: step>n?'#16a34a':'#e5e7eb' }} />}
    </div>
  );

  if (successId) return (
    <div className="max-w-lg mx-auto text-center py-8">
      <div className="text-6xl mb-4">🎉</div>
      <h2 className="text-2xl font-black mb-2" style={{ fontFamily:"'Playfair Display',serif", color:'#0a1f5c' }}>Registration Successful!</h2>
      <p className="text-gray-500 mb-5 text-sm">Your CUET 2026 application has been received.</p>
      <div className="border border-purple-200 rounded-xl p-5 mb-5" style={{ background:'#f5f0ff' }}>
        <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">Your CUET Application ID</div>
        <div className="font-black text-3xl" style={{ fontFamily:"'Playfair Display',serif", color:'#0a1f5c' }}>{successId}</div>
        <div className="text-xs text-gray-500 mt-2">Save this ID to access your mock test portal</div>
      </div>
      <button onClick={enterPortal} className="w-full py-3 rounded-xl text-base font-extrabold text-white"
        style={{ background:'linear-gradient(90deg,#0a1f5c,#4c1d95)' }}>
        Enter Mock Test Portal →
      </button>
    </div>
  );

  return (
    <div>
      <div className="flex items-center mb-5 px-1">
        {dot(1,'Personal Details')}{dot(2,'Subject Selection')}{dot(3,'Exam Preference')}
      </div>

      {/* Step 1 */}
      {step===1 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
          <h3 className="font-bold text-base text-gray-900 mb-0.5" style={{ fontFamily:"'Playfair Display',serif" }}>Personal & Academic Details</h3>
          <p className="text-xs text-gray-500 mb-4">Fill as per official documents.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <F label="First Name" k="firstName" value={form.firstName} onChange={v=>set('firstName',v)} ph="First name" err={errors.firstName} />
            <F label="Last Name" k="lastName" value={form.lastName} onChange={v=>set('lastName',v)} ph="Last name" err={errors.lastName} />
            <F label="Date of Birth" k="dob" value={form.dob} onChange={v=>set('dob',v)} type="date" err={errors.dob} />
            <S label="Gender" k="gender" value={form.gender} onChange={v=>set('gender',v)} opts={['Male','Female','Third Gender','Prefer not to say']} err={errors.gender} />
            <F label="Mobile Number" k="mobile" value={form.mobile} onChange={v=>set('mobile',v)} type="tel" ph="+91 XXXXX XXXXX" err={errors.mobile} />
            <F label="Email Address" k="email" value={form.email} onChange={v=>set('email',v)} type="email" ph="email@example.com" err={errors.email} />
            <F label="City / Town" k="city" value={form.city} onChange={v=>set('city',v)} ph="Your city" err={errors.city} />
            <S label="State" k="state" value={form.state} onChange={v=>set('state',v)} opts={STATES} err={errors.state} />
          </div>
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 pb-1.5 border-b mt-4">Qualifying Examination</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <S label="Qualification" k="qualification" value={form.qualification} onChange={v=>set('qualification',v)} opts={['Class 12 / Intermediate (Appearing 2026)','Class 12 / Intermediate (Passed)','Diploma','Other']} err={errors.qualification} />
            <S label="Board" k="board" value={form.board} onChange={v=>set('board',v)} opts={BOARDS} req={false} />
            <F label="Percentage / CGPA" k="marks" value={form.marks} onChange={v=>set('marks',v)} ph="e.g. 85% or 8.5 CGPA" req={false} />
            <S label="Year of Passing" k="year" value={form.year} onChange={v=>set('year',v)} opts={['Appearing 2026','2025','2024','2023','2022 or earlier']} req={false} />
          </div>
          <div className="flex justify-end mt-5">
            <button onClick={()=>goStep(2)} className="px-6 py-2.5 rounded-lg text-sm font-bold text-white" style={{ background:'#0a1f5c' }}>Next: Select Subjects →</button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step===2 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
          <h3 className="font-bold text-base text-gray-900 mb-0.5" style={{ fontFamily:"'Playfair Display',serif" }}>CUET Subject Selection</h3>
          <p className="text-xs text-gray-500 mb-4">Select subjects for each section as per NTA CUET 2026 guidelines.</p>

          {/* Section IA */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-wider">Section IA</span>
              <span className="text-xs font-semibold text-gray-700">Language(s) — Select 1 or 2</span>
            </div>
            {errors.languages && <p className="text-red-500 text-xs mb-2">{errors.languages}</p>}
            <div className="flex flex-wrap gap-1.5">
              {LANGUAGES.map(l => (
                <button key={l} onClick={()=>toggleLang(l)}
                  className="px-2.5 py-1 rounded-full text-xs font-semibold border transition"
                  style={{ background:form.languages.includes(l)?'#1d4ed8':'#fff', color:form.languages.includes(l)?'#fff':'#374151', borderColor:form.languages.includes(l)?'#1d4ed8':'#e5e7eb' }}>
                  {l}
                </button>
              ))}
            </div>
          </div>

          {/* Section II */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 uppercase tracking-wider">Section II</span>
              <span className="text-xs font-semibold text-gray-700">Domain Subjects — Select up to 6</span>
            </div>
            <div className="text-xs text-gray-400 mb-2">
              Selected: <strong className={form.domainSubjects.length>=6?'text-red-600':'text-[#0a1f5c]'}>{form.domainSubjects.length} / 6</strong>
              {form.domainSubjects.length>=6 && <span className="text-red-500 ml-1">Maximum reached</span>}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {DOMAIN_SUBJECTS.map(s => {
                const sel = form.domainSubjects.includes(s);
                const disabled = !sel && form.domainSubjects.length>=6;
                return (
                  <button key={s} onClick={()=>!disabled&&toggleDomain(s)} disabled={disabled}
                    className="px-2.5 py-1 rounded-full text-xs font-semibold border transition disabled:opacity-40"
                    style={{ background:sel?'#7c3aed':'#fff', color:sel?'#fff':'#374151', borderColor:sel?'#7c3aed':'#e5e7eb' }}>
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section III */}
          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-wider">Section III</span>
              <span className="text-xs font-semibold text-gray-700">General Test</span>
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <div onClick={()=>set('generalTest',!form.generalTest)}
                className="w-12 h-6 rounded-full relative transition-colors"
                style={{ background:form.generalTest?'#0a1f5c':'#d1d5db' }}>
                <div className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                  style={{ left:form.generalTest?'26px':'2px' }} />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800">Include General Test (Section III)</div>
                <div className="text-xs text-gray-500">Required for most UG & PG programs · 75 Qs, 60 to attempt, 60 min</div>
              </div>
            </label>
          </div>

          <div className="flex justify-between">
            <button onClick={()=>setStep(1)} className="px-4 py-2 rounded-lg border text-sm font-semibold text-gray-600 border-gray-200">← Back</button>
            <button onClick={()=>goStep(3)} className="px-6 py-2.5 rounded-lg text-sm font-bold text-white" style={{ background:'#0a1f5c' }}>Next: Exam Preference →</button>
          </div>
        </div>
      )}

      {/* Step 3 */}
      {step===3 && (
        <div className="bg-white border border-gray-200 rounded-xl p-5 mb-4">
          <h3 className="font-bold text-base text-gray-900 mb-0.5" style={{ fontFamily:"'Playfair Display',serif" }}>Exam Preferences</h3>
          <p className="text-xs text-gray-500 mb-4">Choose preferred test cities and personal details.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <S label="Test City Choice 1" k="testCity1" value={form.testCity1} onChange={v=>set('testCity1',v)} opts={TEST_CITIES} err={errors.testCity1} />
            <S label="Test City Choice 2" k="testCity2" value={form.testCity2} onChange={v=>set('testCity2',v)} opts={TEST_CITIES} req={false} />
            <S label="Test City Choice 3" k="testCity3" value={form.testCity3} onChange={v=>set('testCity3',v)} opts={TEST_CITIES} req={false} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <S label="Category" k="category" value={form.category} onChange={v=>set('category',v)} opts={['General','OBC (Non-Creamy Layer)','SC','ST','EWS','PwD']} req={false} />
            <S label="PwD Status" k="pwd" value={form.pwd} onChange={v=>set('pwd',v)} opts={['No','Yes — Visual Impairment','Yes — Hearing Impairment','Yes — Locomotor Disability','Yes — Other']} req={false} />
            <S label="How did you hear about us?" k="source" value={form.source} onChange={v=>set('source',v)} opts={['School / College','Social Media','Friends / Family','Coaching Institute','Newspaper','University Website','AdmissionX Platform','Other']} req={false} />
          </div>

          {/* Summary */}
          <div className="mt-5 p-4 rounded-xl border border-gray-200 bg-gray-50 text-xs text-gray-600 space-y-1">
            <div className="font-bold text-gray-800 mb-2">Application Summary</div>
            <div><strong>Name:</strong> {form.firstName} {form.lastName}</div>
            <div><strong>Section IA:</strong> {form.languages.join(', ') || '—'}</div>
            <div><strong>Section II:</strong> {form.domainSubjects.join(', ') || '—'}</div>
            <div><strong>Section III:</strong> {form.generalTest ? 'General Test ✓' : 'Not selected'}</div>
            <div><strong>Test City:</strong> {form.testCity1 || '—'}</div>
          </div>

          {errors.submit && <div className="mt-3 text-red-600 text-xs p-2 bg-red-50 rounded">{errors.submit}</div>}

          <div className="flex justify-between mt-5 flex-wrap gap-3">
            <button onClick={()=>setStep(2)} className="px-4 py-2 rounded-lg border text-sm font-semibold text-gray-600 border-gray-200">← Back</button>
            <button onClick={submit} disabled={loading}
              className="px-8 py-3 rounded-xl text-sm font-extrabold disabled:opacity-60"
              style={{ background:'linear-gradient(90deg,#c9a84c,#e8b840)', color:'#0a1f5c' }}>
              {loading ? 'Submitting...' : '✓ Submit CUET Application'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
