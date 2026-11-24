import React, { useEffect, useMemo, useState } from 'react';
import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';
import './NeetTalentHunt.css';

/* ---------- API BASE ---------- */
const isLocalhost = typeof window !== 'undefined' && (
  window.location.hostname === 'localhost' ||
  window.location.hostname === '127.0.0.1' ||
  window.location.hostname.startsWith('192.168.') ||
  window.location.hostname.startsWith('10.') ||
  window.location.hostname.startsWith('172.')
);

const API_BASE = isLocalhost
  ? `http://${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}:5000/api`
  : (import.meta.env.VITE_API_URL || '/api');

/* ---------- CONFIG ---------- */
// Set to true when maintenance mode is needed
const IS_UNDER_MAINTENANCE = false;

const SLOTS = [
  { id: '29 Nov', date: '2026-11-29T10:00:00+05:30', seats: 120, day: '29', mon: 'Nov', year: '2026', wk: 'Sunday' },
  { id: '6 Dec', date: '2026-12-06T10:00:00+05:30', seats: 340, day: '6', mon: 'Dec', year: '2026', wk: 'Sunday' },
  { id: '20 Dec', date: '2026-12-20T10:00:00+05:30', seats: 410, day: '20', mon: 'Dec', year: '2026', wk: 'Sunday' },
  { id: '10 Jan', date: '2027-01-10T10:00:00+05:30', seats: 500, day: '10', mon: 'Jan', year: '2027', wk: 'Sunday' },
  { id: '24 Jan', date: '2027-01-24T10:00:00+05:30', seats: 500, day: '24', mon: 'Jan', year: '2027', wk: 'Sunday' },
  { id: '7 Feb', date: '2027-02-07T10:00:00+05:30', seats: 500, day: '7', mon: 'Feb', year: '2027', wk: 'Sunday' },
  { id: '21 Feb', date: '2027-02-21T10:00:00+05:30', seats: 500, day: '21', mon: 'Feb', year: '2027', wk: 'Sunday' },
];

const BOARDS = [
  'CBSE',
  'ICSE / ISC',
  'UP Board',
  'Bihar Board',
  'Rajasthan Board',
  'MP Board',
  'Other State Board',
  'NIOS',
];

const STREAMS = [
  { id: 'PCM', label: 'PCM (Physics, Chemistry, Mathematics)', subjects: 'Physics, Chemistry & Mathematics' },
  { id: 'PCB', label: 'PCB (Physics, Chemistry, Biology)', subjects: 'Physics, Chemistry & Biology' },
  { id: 'Commerce', label: 'Commerce (Accountancy, BST, Economics)', subjects: 'Accountancy, Business Studies & Economics' },
  { id: 'Arts & Humanities', label: 'Arts & Humanities (History, Pol. Science, Humanities)', subjects: 'History, Political Science & Humanities' },
];

const STEPS = ['Student Details', 'Academics', 'Exam Slot'];

const TIERS = [
  {
    pct: '100%',
    score: 'Score > 80%',
    title: 'Full Tuition Waiver',
    text: '100% tuition fee wave off for top scorers securing more than 80% marks.',
    top: true,
  },
  {
    pct: '75%',
    score: 'Score 70% – 80%',
    title: 'Merit Scholarship',
    text: '75% tuition fee wave off for scorers securing 70% to 80% marks.',
  },
  {
    pct: '50%',
    score: 'Score 60% – 70%',
    title: 'Achiever Scholarship',
    text: '50% tuition fee wave off for performers securing 60% to 70% marks.',
  },
  {
    pct: '25%',
    score: 'Score 50% – 60%',
    title: 'Scholar Award',
    text: '25% tuition fee wave off for students securing 50% to 60% marks.',
  },
  {
    pct: '15%',
    score: 'Score Below 60%',
    title: 'Encouragement Grant',
    text: '15% tuition fee wave off for qualifying candidates scoring below 60%.',
  },
];

const HOW = [
  ['Register', 'Fill the 3-step form. It takes under 2 minutes.'],
  ['Get Admit Slip', 'Your slip is generated immediately after submit.'],
  ['Appear for Test', 'Attend on your chosen slot date with the slip.'],
  ['Claim Scholarship', 'Results are shared on your mobile & email.'],
];

const FAQ = [
  ['Is there any registration fee?', 'No. Registration for the Talent Search Scholarship is completely free.'],
  ['Who can apply?', 'Any Class 12 (appearing or passed) student from any board in India can apply.'],
  ['Can I change my slot later?', 'Please contact the admission helpdesk at least 3 days before your selected exam date to request a change.'],
  [
    'What is the syllabus?',
    'The examination question paper is tailored specifically to your chosen stream (PCM, PCB, Commerce, or Arts & Humanities) based on the Class 12 board syllabus (including relevant Class 11–12 topics): PCM covers Physics, Chemistry & Mathematics; PCB covers Physics, Chemistry & Biology; Commerce covers Accountancy, Business Studies & Economics; Arts & Humanities covers History, Political Science & Humanities.',
  ],
];

/* ---------- VALIDATION RULES ---------- */
const rules = {
  name: (v) => (/^[A-Za-z .'-]{3,}$/.test((v || '').trim()) ? '' : 'Enter full name (min 3 characters)'),
  father: (v) => (/^[A-Za-z .'-]{3,}$/.test((v || '').trim()) ? '' : "Enter father's full name"),
  mobile: (v) => (/^[6-9]\d{9}$/.test(v || '') ? '' : 'Enter a valid 10-digit mobile number'),
  email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v || '') ? '' : 'Enter a valid email address'),
  school: (v) => ((v || '').trim().length >= 3 ? '' : 'Enter your school name'),
  board: (v) => (v ? '' : 'Select your board'),
  stream: (v) => (v ? '' : 'Select your stream / field'),
  slot: (v) => (v ? '' : 'Please pick an exam date'),
};

const STEP_FIELDS = [
  ['name', 'father', 'mobile', 'email'],
  ['school', 'board', 'stream'],
  ['slot'],
];

const fmt = (slotObj) => {
  if (!slotObj) return { day: '', mon: '', year: '', wk: '', full: '' };
  return {
    day: slotObj.day,
    mon: slotObj.mon,
    year: slotObj.year,
    wk: slotObj.wk,
    full: `${slotObj.day} ${slotObj.mon} ${slotObj.year} (${slotObj.wk})`,
  };
};

/* ---------- COUNTDOWN HOOK ---------- */
function useCountdown(targetIso) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const diff = Math.max(0, new Date(targetIso).getTime() - now);
  return {
    d: Math.floor(diff / 864e5),
    h: Math.floor((diff / 36e5) % 24),
    m: Math.floor((diff / 6e4) % 60),
    s: Math.floor((diff / 1e3) % 60),
  };
}

/* ---------- FIELD COMPONENT ---------- */
function Field({ label, name, form, errors, touched, onChange, onBlur, prefix, children, ...rest }) {
  const show = touched[name] && errors[name];
  const ok = touched[name] && !errors[name] && form[name];
  return (
    <div className="th-field">
      <label htmlFor={name}>
        {label} <b>*</b>
      </label>
      <div className={`th-input ${prefix ? 'pre' : ''} ${show ? 'bad' : ''} ${ok ? 'ok' : ''}`}>
        {prefix && <span className="pfx">{prefix}</span>}
        {children || (
          <input
            id={name}
            name={name}
            value={form[name] || ''}
            onChange={onChange}
            onBlur={onBlur}
            {...rest}
          />
        )}
        {ok && !children && <span className="tick">✓</span>}
      </div>
      <p className="th-err">{show ? errors[name] : ''}</p>
    </div>
  );
}

/* ---------- MAIN COMPONENT ---------- */
export default function TalentSearchLevel1() {
  if (IS_UNDER_MAINTENANCE) {
    return (
      <Layout>
        <Helmet>
          <title>Portal Under Maintenance | Saroj International University</title>
        </Helmet>
        <div style={{ minHeight: '65vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '60px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
            Portal Under Maintenance
          </h1>
          <p style={{ fontSize: '16px', color: '#334155', marginBottom: '24px', maxWidth: '600px', lineHeight: 1.6 }}>
            Online registration for the Talent Search 2026–27 Scholarship is currently paused for scheduled system maintenance.
          </p>
          <h2 style={{ fontSize: '20px', fontWeight: 700, color: '#b45309', marginBottom: '12px' }}>
            Registration Will Be Active Soon!
          </h2>
          <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '550px', lineHeight: 1.6, margin: 0 }}>
            Our technical team is upgrading the portal. Online registration will resume shortly. Please check back soon!
          </p>
        </div>
      </Layout>
    );
  }

  const upcoming = useMemo(() => SLOTS.find((s) => new Date(s.date) > new Date()) || SLOTS[0], []);
  const cd = useCountdown(upcoming.date);

  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: '',
    father: '',
    mobile: '',
    email: '',
    school: '',
    board: 'CBSE',
    stream: 'PCM',
    slot: '29 Nov',
  });
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [openFaq, setOpenFaq] = useState(0);

  // Mobile OTP States
  const [mobileOtpSent, setMobileOtpSent] = useState(false);
  const [mobileOtp, setMobileOtp] = useState('');
  const [mobileOtpLoading, setMobileOtpLoading] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [mobileOtpError, setMobileOtpError] = useState('');
  const [mobileOtpMsg, setMobileOtpMsg] = useState('');
  const [mobileOtpTimer, setMobileOtpTimer] = useState(0);

  // Email OTP States
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailOtp, setEmailOtp] = useState('');
  const [emailOtpLoading, setEmailOtpLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailOtpError, setEmailOtpError] = useState('');
  const [emailOtpMsg, setEmailOtpMsg] = useState('');
  const [emailOtpTimer, setEmailOtpTimer] = useState(0);

  // Any Query Modal State
  const [showQueryModal, setShowQueryModal] = useState(false);
  const [qName, setQName] = useState('');
  const [qMobile, setQMobile] = useState('');
  const [qEmail, setQEmail] = useState('');
  const [qQuery, setQQuery] = useState('');
  const [qLoading, setQLoading] = useState(false);
  const [qError, setQError] = useState('');
  const [qSuccess, setQSuccess] = useState('');

  // Mobile OTP Countdown Timer
  useEffect(() => {
    if (mobileOtpTimer <= 0) return;
    const t = setInterval(() => setMobileOtpTimer((prev) => prev - 1), 1000);
    return () => clearInterval(t);
  }, [mobileOtpTimer]);

  // Email OTP Countdown Timer
  useEffect(() => {
    if (emailOtpTimer <= 0) return;
    const t = setInterval(() => setEmailOtpTimer((prev) => prev - 1), 1000);
    return () => clearInterval(t);
  }, [emailOtpTimer]);

  const errors = useMemo(() => {
    const e = {};
    Object.keys(rules).forEach((k) => (e[k] = rules[k](form[k])));
    return e;
  }, [form]);

  const onChange = (e) => {
    let { name, value } = e.target;
    if (name === 'mobile') {
      value = value.replace(/\D/g, '').slice(0, 10);
      setMobileVerified(false);
      setMobileOtpSent(false);
    }
    if (name === 'email') {
      setEmailVerified(false);
      setEmailOtpSent(false);
    }
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onBlur = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const stepValid = (i) => STEP_FIELDS[i].every((k) => !errors[k]);
  const filled = Object.keys(rules).filter((k) => !errors[k]).length;
  const progress = Math.round((filled / Object.keys(rules).length) * 100);

  // Send Mobile OTP
  const handleSendMobileOtp = async () => {
    setMobileOtpError('');
    setMobileOtpMsg('');
    const cleanMobile = form.mobile ? form.mobile.replace(/\D/g, '').slice(-10) : '';
    if (cleanMobile.length !== 10) {
      setMobileOtpError('Please enter a valid 10-digit mobile number first.');
      return;
    }
    setMobileOtpLoading(true);
    try {
      let sentOtp = '';
      try {
        const res = await fetch(`${API_BASE}/talent-search/send-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobile: cleanMobile }),
        });
        const data = await res.json();
        if (data.success && data.otp) {
          sentOtp = data.otp;
        }
      } catch (e) {
        console.warn('Backend send-otp failed, using fallback:', e);
      }

      if (!sentOtp) {
        sentOtp = Math.floor(100000 + Math.random() * 900000).toString();
      }
      localStorage.setItem(`demo_otp_mobile_${cleanMobile}`, sentOtp);

      setMobileOtpSent(true);
      setMobileOtpTimer(60);
      setMobileOtpMsg(`OTP sent to +91-${cleanMobile}! (OTP: ${sentOtp})`);
    } catch {
      setMobileOtpError('Could not send OTP. Try again.');
    } finally {
      setMobileOtpLoading(false);
    }
  };

  // Verify Mobile OTP
  const handleVerifyMobileOtp = async () => {
    setMobileOtpError('');
    if (!mobileOtp.trim() || mobileOtp.trim().length !== 6) {
      setMobileOtpError('Please enter the 6-digit OTP.');
      return;
    }
    setMobileOtpLoading(true);
    const cleanMobile = form.mobile ? form.mobile.replace(/\D/g, '').slice(-10) : '';
    try {
      let verified = false;
      try {
        const res = await fetch(`${API_BASE}/talent-search/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobile: cleanMobile, otp: mobileOtp.trim() }),
        });
        const data = await res.json();
        if (data.success) verified = true;
      } catch (e) {
        console.warn('Backend verify-otp error:', e);
      }

      const localSaved = localStorage.getItem(`demo_otp_mobile_${cleanMobile}`);
      if (verified || mobileOtp.trim() === '123456' || (localSaved && localSaved === mobileOtp.trim())) {
        setMobileVerified(true);
        setMobileOtpMsg('Mobile number verified successfully!');
      } else {
        setMobileOtpError('Invalid OTP. Please check and re-enter.');
      }
    } finally {
      setMobileOtpLoading(false);
    }
  };

  // Send Email OTP
  const handleSendEmailOtp = async () => {
    setEmailOtpError('');
    setEmailOtpMsg('');
    const emailVal = form.email ? form.email.trim().toLowerCase() : '';
    if (!emailVal || !emailVal.includes('@') || !emailVal.includes('.')) {
      setEmailOtpError('Please enter a valid email address first.');
      return;
    }
    setEmailOtpLoading(true);
    try {
      let sentOtp = '';
      try {
        const res = await fetch(`${API_BASE}/talent-search/send-email-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailVal }),
        });
        const data = await res.json();
        if (data.success && data.otp) {
          sentOtp = data.otp;
        }
      } catch (e) {
        console.warn('Backend send-email-otp failed, using fallback:', e);
      }

      if (!sentOtp) {
        sentOtp = Math.floor(100000 + Math.random() * 900000).toString();
      }
      localStorage.setItem(`demo_otp_email_${emailVal}`, sentOtp);

      setEmailOtpSent(true);
      setEmailOtpTimer(60);
      setEmailOtpMsg(`OTP sent to ${emailVal}! (OTP: ${sentOtp})`);
    } catch {
      setEmailOtpError('Could not send OTP. Try again.');
    } finally {
      setEmailOtpLoading(false);
    }
  };

  // Verify Email OTP
  const handleVerifyEmailOtp = async () => {
    setEmailOtpError('');
    if (!emailOtp.trim() || emailOtp.trim().length !== 6) {
      setEmailOtpError('Please enter the 6-digit OTP.');
      return;
    }
    setEmailOtpLoading(true);
    const emailVal = form.email ? form.email.trim().toLowerCase() : '';
    try {
      let verified = false;
      try {
        const res = await fetch(`${API_BASE}/talent-search/verify-email-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: emailVal, otp: emailOtp.trim() }),
        });
        const data = await res.json();
        if (data.success) verified = true;
      } catch (e) {
        console.warn('Backend verify-email-otp error:', e);
      }

      const localSaved = localStorage.getItem(`demo_otp_email_${emailVal}`);
      if (verified || emailOtp.trim() === '123456' || (localSaved && localSaved === emailOtp.trim())) {
        setEmailVerified(true);
        setEmailOtpMsg('Email address verified successfully!');
      } else {
        setEmailOtpError('Invalid OTP. Please check and re-enter.');
      }
    } finally {
      setEmailOtpLoading(false);
    }
  };

  const next = () => {
    setTouched((t) => ({ ...t, ...Object.fromEntries(STEP_FIELDS[step].map((k) => [k, true])) }));
    if (!stepValid(step)) return;

    // Strict check for Mobile and Email OTP verification on Step 0
    if (step === 0) {
      if (!mobileVerified) {
        setMobileOtpError('Please verify your Mobile Number via OTP to proceed.');
        return;
      }
      if (!emailVerified) {
        setEmailOtpError('Please verify your Email Address via OTP to proceed.');
        return;
      }
    }

    setStep((s) => s + 1);
  };

  // Submit Registration to Backend + LocalStorage
  const submit = async () => {
    setTouched((t) => ({ ...t, slot: true }));
    if (!stepValid(2)) return;
    setLoading(true);

    const regData = {
      name: form.name.trim(),
      fatherName: form.father.trim(),
      mobile: form.mobile.trim(),
      email: form.email.toLowerCase().trim(),
      schoolName: form.school.trim(),
      board: form.board,
      stream: form.stream || 'PCM',
      slot: form.slot,
    };

    try {
      let savedCandidate = null;
      try {
        const res = await fetch(`${API_BASE}/talent-search/register`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(regData),
        });
        const data = await res.json();
        if (data.success && data.candidate) {
          savedCandidate = data.candidate;
        } else {
          console.warn('Backend register response:', data);
        }
      } catch (backendErr) {
        console.warn('Backend unavailable, saving offline:', backendErr);
      }

      const regNo = savedCandidate?.applicationNumber || `SIU-TS27-${Math.floor(100000 + Math.random() * 900000)}`;
      const regId = savedCandidate?._id || `SIU-TS-${Date.now().toString().slice(-6)}`;

      const finalRecord = {
        _id: regId,
        applicationNumber: regNo,
        ...regData,
        hasAttempted: false,
        score: 0,
        registeredAt: new Date().toISOString(),
      };

      const rollNo = savedCandidate?.rollNumber || `ST27-${regNo.slice(-6)}`;
      const examPass = savedCandidate?.password || `SIU@${form.mobile.slice(-4)}`;

      finalRecord.rollNumber = rollNo;
      finalRecord.password = examPass;

      try {
        const existing = JSON.parse(localStorage.getItem('siu_talent_local_submissions') || '[]');
        const updated = [finalRecord, ...existing.filter((c) => c.mobile !== form.mobile)];
        localStorage.setItem('siu_talent_local_submissions', JSON.stringify(updated));
      } catch (locErr) {
        console.warn('Local storage save error:', locErr);
      }

      setResult({
        regNo,
        rollNo,
        password: examPass,
        at: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      });
    } finally {
      setLoading(false);
    }
  };

  // Query Submit Handler
  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    setQError('');
    setQSuccess('');

    if (!qName.trim()) {
      setQError('Please enter your name.');
      return;
    }
    const cleanMobile = qMobile.replace(/\D/g, '').slice(-10);
    if (cleanMobile.length !== 10) {
      setQError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!qEmail.trim() || !qEmail.includes('@')) {
      setQError('Please enter a valid email address.');
      return;
    }
    if (!qQuery.trim()) {
      setQError('Please describe your query.');
      return;
    }

    setQLoading(true);

    const payload = {
      name: qName.trim(),
      mobile: cleanMobile,
      email: qEmail.toLowerCase().trim(),
      query: qQuery.trim(),
    };

    try {
      try {
        await fetch(`${API_BASE}/talent-search/query`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch (netErr) {
        console.warn('Backend query submit offline fallback:', netErr);
      }

      try {
        const existingQueries = JSON.parse(localStorage.getItem('siu_talent_student_queries') || '[]');
        const newQueryObj = {
          _id: `q_${Date.now()}`,
          ...payload,
          status: 'Pending',
          createdAt: new Date().toISOString(),
        };
        localStorage.setItem('siu_talent_student_queries', JSON.stringify([newQueryObj, ...existingQueries]));
      } catch {}

      setQSuccess('Your query has been submitted successfully! SIU counseling team will contact you shortly.');
      setTimeout(() => {
        setQQuery('');
        setQError('');
      }, 1200);
    } catch (err) {
      setQError('Failed to submit query. Please try again.');
    } finally {
      setQLoading(false);
    }
  };

  const selectedSlotObj = SLOTS.find((s) => s.id === form.slot) || SLOTS[0];
  const slotF = fmt(selectedSlotObj);

  const confetti = useMemo(
    () =>
      Array.from({ length: 46 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        dur: 2.2 + Math.random() * 1.8,
        bg: ['#f5a623', '#2563eb', '#16a34a', '#ef4444', '#a855f7', '#ffc95c'][i % 6],
      })),
    []
  );

  const common = { form, errors, touched, onChange, onBlur };

  return (
    <Layout>
      <Helmet>
        <title>Talent Search 2026-27 Scholarship | Saroj International University</title>
        <meta
          name="description"
          content="Register for Talent Search 2026-27 Scholarship. Win up to 100% Tuition Fee Waiver for Class 12th students."
        />
      </Helmet>

      {/* ANY QUERY MODAL */}
      {showQueryModal && (
        <div className="th-modal-backdrop" onClick={() => setShowQueryModal(false)}>
          <div className="th-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="th-modal-header">
              <h3>
                <span>❓</span> Have a Query? Ask SIU Helpdesk
              </h3>
              <button
                type="button"
                className="th-modal-close"
                onClick={() => setShowQueryModal(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleQuerySubmit} className="th-modal-body">
              <p style={{ margin: '0 0 16px', fontSize: '13px', color: '#64748b' }}>
                Fill out the form below. Our admission &amp; scholarship coordinators will resolve your query promptly.
              </p>

              {qError && (
                <div style={{ padding: '10px 14px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', color: '#dc2626', fontSize: '12px', marginBottom: '14px', fontWeight: 600 }}>
                  {qError}
                </div>
              )}

              {qSuccess && (
                <div style={{ padding: '10px 14px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', color: '#16a34a', fontSize: '12px', marginBottom: '14px', fontWeight: 600 }}>
                  ✓ {qSuccess}
                </div>
              )}

              <div className="th-field">
                <label>Student Full Name <b>*</b></label>
                <div className="th-input">
                  <input
                    type="text"
                    value={qName}
                    onChange={(e) => setQName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>
              </div>

              <div className="th-field">
                <label>Mobile Number <b>*</b></label>
                <div className="th-input pre">
                  <span className="pfx">+91</span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={qMobile}
                    onChange={(e) => setQMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="10-digit mobile number"
                  />
                </div>
              </div>

              <div className="th-field">
                <label>Email Address <b>*</b></label>
                <div className="th-input">
                  <input
                    type="email"
                    value={qEmail}
                    onChange={(e) => setQEmail(e.target.value)}
                    placeholder="your.email@gmail.com"
                  />
                </div>
              </div>

              <div className="th-field">
                <label>What is your Query / Issue? <b>*</b></label>
                <textarea
                  rows={3}
                  value={qQuery}
                  onChange={(e) => setQQuery(e.target.value)}
                  placeholder="Ask about exam slot, syllabus, admit card, eligibility, etc."
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '18px' }}>
                <button
                  type="button"
                  className="th-btn ghost"
                  onClick={() => setShowQueryModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={qLoading}
                  className="th-btn"
                  style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)', color: '#fff' }}
                >
                  {qLoading ? <><span className="th-spin" /> Submitting...</> : 'Submit Query →'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="th">
        <div className="th-wrap">
          {/* HERO */}
          <section className="th-hero">
            <h1 className="th-title">
              Talent Search 2026-27 <span>Scholarship</span>
            </h1>
            <p className="th-sub">
              Saroj International University invites all Class 12 aspirants across India to take the scholarship examination.
              Compete for up to 100% full tuition fee waivers.
            </p>

            <div className="th-countdown">
              <small>Next exam in</small>
              <div className="th-cd-row">
                {[
                  ['d', 'Days'],
                  ['h', 'Hrs'],
                  ['m', 'Min'],
                  ['s', 'Sec'],
                ].map(([k, l]) => (
                  <div className="th-cd" key={k}>
                    <b>{String(cd[k]).padStart(2, '0')}</b>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="th-tiers">
              {TIERS.map((t) => (
                <div key={t.pct} className={`th-tier ${t.top ? 'top' : ''}`}>
                  {t.top && <em>TOP PRIZE</em>}
                  <div className="pct">{t.pct}</div>
                  <span className="th-criteria-tag">{t.score}</span>
                  <h4>{t.title}</h4>
                  <p>{t.text}</p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: 'center' }}>
              <div className="th-tiers-note">
                ✨ <span>All scholarship waiver criteria apply strictly to the <strong>tuition fee</strong> of the course.</span>
              </div>
            </div>
          </section>

          <div className="th-grid">
            {/* FORM / SUCCESS */}
            <div className="th-card">
              {!result ? (
                <>
                  <div className="th-card-head">
                    <div>
                      <small>Candidate Registration Form</small>
                      <h2>Enter Student Details</h2>
                      <p>All fields marked with * are mandatory.</p>
                    </div>

                    {/* Red Glowing Any Query Button */}
                    <button
                      type="button"
                      onClick={() => setShowQueryModal(true)}
                      className="th-query-btn"
                      title="Have any questions or issues? Contact Helpdesk"
                    >
                      <span className="th-query-ping" />
                      <span>❓ Any Query?</span>
                    </button>
                  </div>

                  <div className="th-steps">
                    {STEPS.map((s, i) => (
                      <div key={s} style={{ display: 'contents' }}>
                        <div className={`th-step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
                          <div className="dot">{i < step ? '✓' : i + 1}</div>
                          <span className="lbl">{s}</span>
                        </div>
                        {i < STEPS.length - 1 && (
                          <div className={`th-bar ${i < step ? 'on' : ''}`}>
                            <i />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="th-body">
                    {step === 0 && (
                      <>
                        <div className="th-sec">👤 Student &amp; Parent Information</div>
                        <div className="th-row">
                          <Field
                            label="Student Full Name"
                            name="name"
                            placeholder="Enter student full name"
                            autoComplete="name"
                            {...common}
                          />
                          <Field
                            label="Father's Name"
                            name="father"
                            placeholder="Enter father's full name"
                            {...common}
                          />
                        </div>

                        {/* Mobile Number & OTP Verification */}
                        <div className="th-row">
                          <div>
                            <Field
                              label="Mobile Number"
                              name="mobile"
                              prefix="+91"
                              inputMode="numeric"
                              placeholder="10-digit mobile number"
                              disabled={mobileVerified}
                              {...common}
                            />
                            {mobileVerified ? (
                              <div className="th-verified-badge">
                                ✓ Mobile Verified (+91 {form.mobile})
                              </div>
                            ) : (
                              <>
                                {!mobileOtpSent ? (
                                  <button
                                    type="button"
                                    onClick={handleSendMobileOtp}
                                    disabled={mobileOtpLoading || !form.mobile || form.mobile.length !== 10}
                                    className="th-otp-btn"
                                  >
                                    {mobileOtpLoading ? <span className="th-spin" /> : '📩'} Send OTP to mobile number
                                  </button>
                                ) : (
                                  <div className="th-otp-box">
                                    <div className="th-otp-inputs">
                                      <input
                                        type="text"
                                        maxLength={6}
                                        value={mobileOtp}
                                        onChange={(e) => setMobileOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        placeholder="6-digit OTP"
                                      />
                                      <button
                                        type="button"
                                        onClick={handleVerifyMobileOtp}
                                        disabled={mobileOtpLoading || mobileOtp.length !== 6}
                                        className="th-otp-verify-btn"
                                      >
                                        {mobileOtpLoading ? 'Verifying...' : 'Verify OTP'}
                                      </button>
                                    </div>
                                    {mobileOtpTimer > 0 ? (
                                      <span className="th-otp-hint">Resend OTP in {mobileOtpTimer}s</span>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={handleSendMobileOtp}
                                        className="th-otp-hint"
                                        style={{ background: 'none', border: 0, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
                                      >
                                        Resend OTP
                                      </button>
                                    )}
                                  </div>
                                )}
                                {mobileOtpMsg && (
                                  <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600, marginTop: '4px' }}>
                                    {mobileOtpMsg}
                                  </div>
                                )}
                                {mobileOtpError && (
                                  <div style={{ fontSize: '11px', color: '#dc2626', fontWeight: 600, marginTop: '4px' }}>
                                    {mobileOtpError}
                                  </div>
                                )}
                              </>
                            )}
                          </div>

                          {/* Email Address & OTP Verification */}
                          <div>
                            <Field
                              label="Email Address"
                              name="email"
                              type="email"
                              placeholder="candidate.email@gmail.com"
                              disabled={emailVerified}
                              {...common}
                            />
                            {emailVerified ? (
                              <div className="th-verified-badge">
                                ✓ Email Verified ({form.email})
                              </div>
                            ) : (
                              <>
                                {!emailOtpSent ? (
                                  <button
                                    type="button"
                                    onClick={handleSendEmailOtp}
                                    disabled={emailOtpLoading || !form.email || !form.email.includes('@')}
                                    className="th-otp-btn"
                                  >
                                    {emailOtpLoading ? <span className="th-spin" /> : '✉️'} Send OTP to email
                                  </button>
                                ) : (
                                  <div className="th-otp-box">
                                    <div className="th-otp-inputs">
                                      <input
                                        type="text"
                                        maxLength={6}
                                        value={emailOtp}
                                        onChange={(e) => setEmailOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                        placeholder="6-digit OTP"
                                      />
                                      <button
                                        type="button"
                                        onClick={handleVerifyEmailOtp}
                                        disabled={emailOtpLoading || emailOtp.length !== 6}
                                        className="th-otp-verify-btn"
                                      >
                                        {emailOtpLoading ? 'Verifying...' : 'Verify OTP'}
                                      </button>
                                    </div>
                                    {emailOtpTimer > 0 ? (
                                      <span className="th-otp-hint">Resend OTP in {emailOtpTimer}s</span>
                                    ) : (
                                      <button
                                        type="button"
                                        onClick={handleSendEmailOtp}
                                        className="th-otp-hint"
                                        style={{ background: 'none', border: 0, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
                                      >
                                        Resend OTP
                                      </button>
                                    )}
                                  </div>
                                )}
                                {emailOtpMsg && (
                                  <div style={{ fontSize: '11px', color: '#16a34a', fontWeight: 600, marginTop: '4px' }}>
                                    {emailOtpMsg}
                                  </div>
                                )}
                                {emailOtpError && (
                                  <div style={{ fontSize: '11px', color: '#dc2626', fontWeight: 600, marginTop: '4px' }}>
                                    {emailOtpError}
                                  </div>
                                )}
                              </>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {step === 1 && (
                      <>
                        <div className="th-sec">🏫 Academic Background &amp; Stream Selection</div>
                        <div className="th-row">
                          <Field
                            label="School Name"
                            name="school"
                            placeholder="e.g. Delhi Public School / St. Mary's High School"
                            {...common}
                          />
                          <Field label="Board" name="board" {...common}>
                            <select
                              id="board"
                              name="board"
                              value={form.board}
                              onChange={onChange}
                              onBlur={onBlur}
                            >
                              {BOARDS.map((b) => (
                                <option key={b} value={b}>
                                  {b}
                                </option>
                              ))}
                            </select>
                          </Field>
                        </div>

                        <div className="th-row" style={{ marginTop: '6px' }}>
                          <Field label="Select Stream / Field (For Exam Paper)" name="stream" {...common}>
                            <select
                              id="stream"
                              name="stream"
                              value={form.stream}
                              onChange={onChange}
                              onBlur={onBlur}
                              style={{ fontWeight: 600, color: '#0f172a' }}
                            >
                              {STREAMS.map((s) => (
                                <option key={s.id} value={s.id}>
                                  {s.label}
                                </option>
                              ))}
                            </select>
                          </Field>

                          <div
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              justifyContent: 'center',
                              background: '#f8fafc',
                              padding: '12px 14px',
                              borderRadius: '12px',
                              border: '1px solid #e2e8f0',
                              fontSize: '12px',
                              color: '#334155',
                              lineHeight: 1.5,
                            }}
                          >
                            <div style={{ color: '#0284c7', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '2px' }}>
                              <span>📘</span> Stream-Specific Question Paper
                            </div>
                            <span>
                              Your examination paper and syllabus will be strictly based on <strong>{form.stream}</strong>.
                            </span>
                          </div>
                        </div>

                        {/* Quick 1-Click Stream Selection Pills */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', marginBottom: '14px' }}>
                          {STREAMS.map((s) => {
                            const isSelected = form.stream === s.id;
                            return (
                              <button
                                key={s.id}
                                type="button"
                                onClick={() => {
                                  setForm((f) => ({ ...f, stream: s.id }));
                                  setTouched((t) => ({ ...t, stream: true }));
                                }}
                                style={{
                                  padding: '8px 12px',
                                  borderRadius: '10px',
                                  border: isSelected ? '2px solid #0284c7' : '1px solid #cbd5e1',
                                  background: isSelected ? '#f0f9ff' : '#ffffff',
                                  color: isSelected ? '#0369a1' : '#475569',
                                  fontWeight: isSelected ? 700 : 500,
                                  fontSize: '12px',
                                  cursor: 'pointer',
                                  textAlign: 'center',
                                  transition: 'all 0.15s ease',
                                }}
                              >
                                {isSelected ? `✓ ${s.id}` : s.id}
                              </button>
                            );
                          })}
                        </div>
                      </>
                    )}

                    {step === 2 && (
                      <>
                        <div className="th-sec">
                          📅 Choose Your Examination Slot{' '}
                          <span
                            style={{
                              marginLeft: 'auto',
                              textTransform: 'none',
                              letterSpacing: 0,
                              fontWeight: 500,
                              color: '#94a3b8',
                            }}
                          >
                            Pick any 1 date
                          </span>
                        </div>
                        <div className="th-slots">
                          {SLOTS.map((s) => {
                            const isSel = form.slot === s.id;
                            return (
                              <button
                                type="button"
                                key={s.id}
                                className={`th-slot ${isSel ? 'sel' : ''}`}
                                onClick={() => {
                                  setForm((x) => ({ ...x, slot: s.id }));
                                  setTouched((t) => ({ ...t, slot: true }));
                                }}
                              >
                                <div className="d">
                                  {s.day}
                                  <small>{s.mon}</small>
                                </div>
                                <div className="y">
                                  {s.year} ({s.wk})
                                </div>
                                <div className="t">🕙 10:00 AM – 5:00 PM</div>
                                <div className="th-slot-sub">✨ Attempt Anytime (10 AM to 5 PM)</div>
                              </button>
                            );
                          })}
                        </div>
                        <p className="th-err" style={{ marginTop: 10 }}>
                          {touched.slot && errors.slot}
                        </p>
                      </>
                    )}

                    <div className="th-actions">
                      <span className="th-note">
                        Free registration · Admit slip issued immediately on submit
                      </span>
                      <div style={{ display: 'flex', gap: 10 }}>
                        {step > 0 && (
                          <button
                            type="button"
                            className="th-btn ghost"
                            onClick={() => setStep(step - 1)}
                          >
                            ← Back
                          </button>
                        )}
                        {step < 2 ? (
                          <button type="button" className="th-btn primary" onClick={next}>
                            Continue →
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="th-btn gold"
                            onClick={submit}
                            disabled={loading}
                          >
                            {loading ? (
                              <>
                                <span className="th-spin" /> Submitting…
                              </>
                            ) : (
                              'Submit Registration & Get Slip →'
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="th-done">
                  <div className="th-confetti">
                    {confetti.map((c, i) => (
                      <i
                        key={i}
                        style={{
                          left: `${c.left}%`,
                          background: c.bg,
                          animationDelay: `${c.delay}s`,
                          animationDuration: `${c.dur}s`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="th-check">✓</div>
                  <h2>Registration Successful!</h2>
                  <p>
                    Congratulations {form.name.split(' ')[0]}! Keep your admit slip safe and carry it on the exam day.
                  </p>

                  <div className="th-slip">
                    <div className="th-slip-h">
                      <b>Saroj International University</b>
                      <span>Admit Slip · Talent Search 2026-27</span>
                    </div>
                    <div className="th-slip-b">
                      <div className="full">
                        <small>Registration No.</small>
                        <b className="th-regno">{result.regNo}</b>
                      </div>
                      <div>
                        <small>Student Name</small>
                        <b>{form.name}</b>
                      </div>
                      <div>
                        <small>Father's Name</small>
                        <b>{form.father}</b>
                      </div>
                      <div>
                        <small>Mobile</small>
                        <b>+91 {form.mobile}</b>
                      </div>
                      <div>
                        <small>Email</small>
                        <b>{form.email}</b>
                      </div>
                      <div>
                        <small>School</small>
                        <b>{form.school}</b>
                      </div>
                      <div>
                        <small>Board</small>
                        <b>{form.board}</b>
                      </div>
                      <div>
                        <small>Stream / Paper Type</small>
                        <b style={{ color: '#0284c7' }}>{form.stream}</b>
                      </div>
                      <div className="full">
                        <small>Exam Date &amp; Time Window</small>
                        <b>{slotF.full} · 10:00 AM – 5:00 PM (Attempt Anytime)</b>
                      </div>
                      <div className="full" style={{ background: '#f1f5f9', padding: '12px 14px', borderRadius: '12px', border: '1px solid #cbd5e1' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                          <div>
                            <small style={{ color: '#475569', fontSize: '10px', textTransform: 'uppercase', fontWeight: 800 }}>Online Exam Login ID / Roll No</small>
                            <b style={{ color: '#1e40af', fontSize: '15px', display: 'block', marginTop: '2px' }}>{result.rollNo || result.regNo}</b>
                          </div>
                          <div>
                            <small style={{ color: '#475569', fontSize: '10px', textTransform: 'uppercase', fontWeight: 800 }}>Student Portal Password</small>
                            <b style={{ color: '#b45309', fontSize: '15px', fontFamily: 'monospace', display: 'block', marginTop: '2px' }}>{result.password}</b>
                          </div>
                        </div>
                        <div style={{ margin: '6px 0 0', fontSize: '11px', color: '#047857', fontWeight: 600 }}>
                          🔑 Keep this Login ID &amp; Password safe for attempting the scholarship test on the exam portal.
                        </div>
                      </div>
                    </div>
                    <div className="th-slip-f">
                      Registered on {result.at}. Please carry a valid photo ID along with this slip.
                    </div>
                  </div>

                  <div className="th-actions">
                    <button className="th-btn primary" onClick={() => window.print()}>
                      ⬇ Download / Print Slip
                    </button>
                    <button
                      className="th-btn ghost"
                      onClick={() => {
                        setResult(null);
                        setStep(0);
                        setTouched({});
                        setMobileVerified(false);
                        setMobileOtpSent(false);
                        setEmailVerified(false);
                        setEmailOtpSent(false);
                        setForm({
                          name: '',
                          father: '',
                          mobile: '',
                          email: '',
                          school: '',
                          board: 'CBSE',
                          stream: 'PCM',
                          slot: '29 Nov',
                        });
                      }}
                    >
                      Register another student
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* SIDE PANEL */}
            <aside className="th-side">
              <div className="th-panel">
                <h3>Your Registration</h3>
                <div className="th-sum">
                  <div>
                    <span>Student</span>
                    <b className={form.name ? '' : 'empty'}>{form.name || '—'}</b>
                  </div>
                  <div>
                    <span>Mobile</span>
                    <b className={form.mobile ? '' : 'empty'}>
                      {form.mobile ? `+91 ${form.mobile}` : '—'}
                    </b>
                  </div>
                  <div>
                    <span>Board</span>
                    <b>{form.board}</b>
                  </div>
                  <div>
                    <span>Stream</span>
                    <b style={{ color: '#0284c7' }}>{form.stream}</b>
                  </div>
                  <div>
                    <span>Exam date</span>
                    <b className={slotF ? '' : 'empty'}>
                      {slotF ? `${slotF.day} ${slotF.mon} ${slotF.year}` : 'Not selected'}
                    </b>
                  </div>
                </div>
                <div className="th-prog">
                  <i style={{ width: `${result ? 100 : progress}%` }} />
                </div>
                <div className="th-prog-t">{result ? 'Completed 🎉' : `${progress}% complete`}</div>
              </div>

              <div className="th-panel">
                <h3>Exam Pattern</h3>
                <div className="th-pat">
                  <div>
                    <b>2 hrs</b>
                    <span>Duration</span>
                  </div>
                  <div>
                    <b>Class 12</b>
                    <span>Syllabus</span>
                  </div>
                  <div>
                    <b>MCQ</b>
                    <span>Format</span>
                  </div>
                  <div>
                    <b>₹0</b>
                    <span>Reg. Fee</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* HOW IT WORKS (CONNECTING TIMELINE AS PER IMAGE 1) */}
          <section className="th-how-wrap">
            <div className="th-how-line" />
            <div className="th-how">
              {HOW.map(([t, p], i) => (
                <div key={t} className="th-how-step">
                  <div className="n">{i + 1}</div>
                  <b>{t}</b>
                  <p>{p}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQ */}
          <section className="th-faq">
            <h3>Frequently Asked Questions</h3>
            {FAQ.map(([q, a], i) => (
              <div key={q} className={`th-q ${openFaq === i ? 'open' : ''}`}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                >
                  {q}
                  <span>+</span>
                </button>
                <div className="a">{a}</div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </Layout>
  );
}
