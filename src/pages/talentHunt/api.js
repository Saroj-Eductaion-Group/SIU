const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// ── CUET (Mock Tests) ────────────────────────────────────────────────────────
export async function cuetRegister(data) {
  const r = await fetch(`${BASE}/cuet/register`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  });
  return r.json();
}

export async function cuetLogin(cuetId) {
  const r = await fetch(`${BASE}/cuet/login/${cuetId}`);
  if (!r.ok) { const e = await r.json(); throw new Error(e.message); }
  return r.json();
}

export async function cuetSaveResult(cuetId, resultData) {
  const r = await fetch(`${BASE}/cuet/result/${cuetId}`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(resultData),
  });
  return r.json();
}

export async function cuetGetResults(cuetId) {
  const r = await fetch(`${BASE}/cuet/results/${cuetId}`);
  if (!r.ok) return [];
  return r.json();
}

// ── SIUAT (Talent Hunt) ──────────────────────────────────────────────────────
export async function siuatRegister(data) {
  const r = await fetch(`${BASE}/registrations/register`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  });
  return r.json();
}

export async function siuatLogin(appId) {
  const r = await fetch(`${BASE}/registrations/${appId}`);
  if (!r.ok) { const e = await r.json(); throw new Error(e.message); }
  return r.json();
}

export async function siuatSubmitResult(appId, score, grade, sectionData) {
  const r = await fetch(`${BASE}/registrations/result/${appId}`, {
    method: 'PATCH', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ score, grade, sectionData }),
  });
  return r.json();
}

export async function siuatGetSeats() {
  const r = await fetch(`${BASE}/registrations/seats`);
  return r.json();
}

export async function siuatGetResults() {
  const r = await fetch(`${BASE}/registrations/results`);
  return r.json();
}

export async function siuatForgotAppId(data) {
  const r = await fetch(`${BASE}/registrations/forgot-appid`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data),
  });
  return r.json();
}
