export function downloadReportCard(candidate, result) {
  const diffRows = ['Easy', 'Moderate', 'Hard', 'Advanced'].map(d => {
    const data = result.diffData?.[d];
    if (!data) return '';
    const pct = Math.round(data.correct / data.total * 100);
    const color = { Easy: '#16a34a', Moderate: '#2563eb', Hard: '#ea580c', Advanced: '#7c3aed' }[d];
    return `<tr>
      <td style="padding:6px 10px;font-size:12px;color:#374151;">${d}</td>
      <td style="padding:6px 10px;font-size:12px;text-align:center;">${data.total}</td>
      <td style="padding:6px 10px;font-size:12px;text-align:center;color:#16a34a;font-weight:700;">${data.correct}</td>
      <td style="padding:6px 10px;font-size:12px;text-align:center;color:#dc2626;font-weight:700;">${data.total - data.correct}</td>
      <td style="padding:6px 10px;font-size:12px;text-align:center;">
        <span style="background:${color};color:#fff;padding:2px 8px;border-radius:999px;font-size:11px;font-weight:700;">${pct}%</span>
      </td>
    </tr>`;
  }).join('');

  const secRows = Object.entries(result.sectionData || {}).map(([sec, d]) => {
    const pct = Math.round(d.correct / d.total * 100);
    return `<tr>
      <td style="padding:6px 10px;font-size:12px;color:#374151;">${sec}</td>
      <td style="padding:6px 10px;font-size:12px;text-align:center;">${d.total}</td>
      <td style="padding:6px 10px;font-size:12px;text-align:center;color:#16a34a;font-weight:700;">${d.correct}</td>
      <td style="padding:6px 10px;font-size:12px;text-align:center;color:#dc2626;font-weight:700;">${d.total - d.correct}</td>
      <td style="padding:6px 10px;font-size:12px;text-align:center;font-weight:700;">${pct}%</td>
    </tr>`;
  }).join('');

  const gradeColor = result.grade === 'A+' ? '#b45309' : result.grade === 'A' ? '#15803d' : result.grade === 'B' ? '#1d4ed8' : result.grade === 'C' ? '#d97706' : '#dc2626';
  const now = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

  const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>SIUAT Report Card - ${candidate.appId}</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: Arial, sans-serif; background:#f3f4f6; padding:20px; }
  .card { max-width:720px; margin:0 auto; background:#fff; border-radius:12px; overflow:hidden; box-shadow:0 4px 24px rgba(0,0,0,0.12); }
  .header { background:linear-gradient(135deg,#0a1f5c,#1e3a8a); color:#fff; padding:24px 28px; }
  .header h1 { font-size:22px; font-weight:900; letter-spacing:-0.5px; }
  .header p { font-size:11px; opacity:0.6; margin-top:2px; }
  .gold-bar { background:linear-gradient(90deg,#b8860b,#e8b840,#ffd700,#e8b840,#b8860b); padding:6px; text-align:center; font-size:11px; font-weight:900; color:#0a1f5c; letter-spacing:2px; text-transform:uppercase; }
  .body { padding:24px 28px; }
  .info-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:20px; }
  .info-box { background:#f8fafc; border:1px solid #e2e8f0; border-radius:8px; padding:10px 14px; }
  .info-box label { font-size:10px; color:#94a3b8; text-transform:uppercase; letter-spacing:1px; display:block; margin-bottom:2px; }
  .info-box span { font-size:14px; font-weight:700; color:#0f172a; }
  .score-row { display:flex; align-items:center; justify-content:space-between; background:#f0f4ff; border-radius:10px; padding:16px 20px; margin-bottom:20px; }
  .score-circle { width:80px; height:80px; border-radius:50%; border:5px solid ${gradeColor}; display:flex; flex-direction:column; align-items:center; justify-content:center; }
  .score-circle .pct { font-size:22px; font-weight:900; color:${gradeColor}; }
  .score-circle .lbl { font-size:9px; color:#94a3b8; }
  .grade-badge { background:${gradeColor}22; color:${gradeColor}; border:1.5px solid ${gradeColor}44; padding:4px 16px; border-radius:999px; font-size:14px; font-weight:900; }
  .stats { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:20px; }
  .stat { border-radius:8px; padding:12px; text-align:center; }
  .stat .num { font-size:22px; font-weight:900; }
  .stat .lbl { font-size:10px; color:#64748b; margin-top:2px; }
  table { width:100%; border-collapse:collapse; margin-bottom:20px; }
  thead tr { background:#0a1f5c; color:#fff; }
  thead th { padding:8px 10px; font-size:11px; text-align:left; font-weight:700; letter-spacing:0.5px; }
  tbody tr:nth-child(even) { background:#f8fafc; }
  .section-title { font-size:11px; font-weight:800; color:#64748b; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:8px; margin-top:16px; }
  .scholarship { background:linear-gradient(135deg,#78350f,#d97706); color:#fff; border-radius:10px; padding:14px 18px; margin-bottom:20px; display:flex; align-items:center; gap:12px; }
  .scholarship .icon { font-size:28px; }
  .scholarship .text h3 { font-size:14px; font-weight:900; }
  .scholarship .text p { font-size:11px; opacity:0.85; margin-top:2px; }
  .percentile { background:#eff6ff; border:1px solid #bfdbfe; border-radius:8px; padding:10px 14px; margin-bottom:20px; display:flex; align-items:center; gap:10px; }
  .percentile .icon { font-size:20px; }
  .percentile .text label { font-size:10px; color:#1d4ed8; font-weight:700; text-transform:uppercase; letter-spacing:1px; display:block; }
  .percentile .text span { font-size:14px; font-weight:900; color:#1e40af; }
  .footer { background:#f8fafc; border-top:1px solid #e2e8f0; padding:12px 28px; display:flex; justify-content:space-between; align-items:center; }
  .footer p { font-size:10px; color:#94a3b8; }
  @media print { body { background:#fff; padding:0; } .card { box-shadow:none; border-radius:0; } }
</style>
</head>
<body>
<div class="card">
  <div class="gold-bar">★ Saroj International University — SIUAT Talent Hunt 2026-27 ★</div>
  <div class="header">
    <h1>SIUAT Examination Report Card</h1>
    <p>Saroj International University Aptitude Test · Session 2026-27</p>
  </div>
  <div class="body">
    <div class="info-grid">
      <div class="info-box"><label>Candidate Name</label><span>${candidate.firstName || ''} ${candidate.lastName || ''}</span></div>
      <div class="info-box"><label>Application ID</label><span>${candidate.appId || ''}</span></div>
      <div class="info-box"><label>Exam Date</label><span>${candidate.examDate || now}</span></div>
      <div class="info-box"><label>Report Generated</label><span>${now}</span></div>
    </div>

    <div class="score-row">
      <div>
        <div class="grade-badge">Grade ${result.grade}</div>
        ${result.scholarship ? `<p style="margin-top:6px;font-size:12px;color:#15803d;font-weight:700;">🏆 ${result.scholarship}</p>` : ''}
        <p style="margin-top:4px;font-size:11px;color:#64748b;">${result.correct} marks out of ${result.totalMarks} total</p>
      </div>
      <div class="score-circle">
        <span class="pct">${result.pct}%</span>
        <span class="lbl">Score</span>
      </div>
    </div>

    <div class="percentile">
      <div class="icon">📊</div>
      <div class="text">
        <label>Estimated Percentile</label>
        <span>${result.percentile}</span>
      </div>
    </div>

    <div class="stats">
      <div class="stat" style="background:#f0fdf4;"><div class="num" style="color:#16a34a;">${result.correct}</div><div class="lbl">Marks Earned</div></div>
      <div class="stat" style="background:#fef2f2;"><div class="num" style="color:#dc2626;">${result.wrong}</div><div class="lbl">Wrong</div></div>
      <div class="stat" style="background:#fffbeb;"><div class="num" style="color:#d97706;">${result.skippedCount}</div><div class="lbl">Skipped</div></div>
    </div>

    ${result.scholarship ? `
    <div class="scholarship">
      <div class="icon">🏆</div>
      <div class="text">
        <h3>Scholarship Qualified!</h3>
        <p>You qualify for ${result.scholarship} at SIU for Session 2026-27. Visit admissions office with this report card.</p>
      </div>
    </div>` : ''}

    <div class="section-title">Difficulty-wise Analysis</div>
    <table>
      <thead><tr><th>Difficulty</th><th>Total</th><th>Correct</th><th>Wrong</th><th>Score %</th></tr></thead>
      <tbody>${diffRows}</tbody>
    </table>

    <div class="section-title">Section-wise Performance</div>
    <table>
      <thead><tr><th>Section</th><th>Total</th><th>Correct</th><th>Wrong</th><th>Score %</th></tr></thead>
      <tbody>${secRows}</tbody>
    </table>
  </div>
  <div class="footer">
    <p>Saroj International University, Lucknow · siuat.siu.edu.in</p>
    <p>This is a computer-generated report card.</p>
  </div>
</div>
<script>window.onload = () => { window.print(); }</script>
</body>
</html>`;

  const win = window.open('', '_blank');
  win.document.write(html);
  win.document.close();
}
