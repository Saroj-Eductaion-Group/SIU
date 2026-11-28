const nodemailer = require('nodemailer');

/**
 * Configure Nodemailer SMTP Transporter
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER || 'rajsharmafullstackdev@gmail.com';
  const pass = process.env.SMTP_PASS || 'ikqdukmmqhfqjzdm';

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

/**
 * Generate full HTML email for Talent Search Exam Registration & Credentials
 */
function generateTalentSearchEmailHtml({
  studentName,
  applicationNumber,
  rollNumber,
  loginId,
  password,
  stream,
  slot,
}) {
  const portalUrl = 'https://talent-search-scholership.vercel.app/login';
  const admitCardUrl = 'https://sarojuniversity.edu.in/talent-search-scholarship';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SIU Talent Search Examination Credentials</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: 'Segoe UI', Arial, sans-serif; color: #1e293b;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 24px 12px;">
    <tr>
      <td align="center">
        <!-- Container -->
        <table role="presentation" width="100%" style="max-width: 650px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.08); border: 1px solid #e2e8f0;" cellspacing="0" cellpadding="0">
          
          <!-- Header Banner -->
          <tr>
            <td style="background: linear-gradient(135deg, #0e2557 0%, #1e3a8a 100%); padding: 32px 24px; text-align: center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <img src="https://sarojuniversity.edu.in/favicon.png" alt="SIU Logo" width="64" height="64" style="display: block; margin-bottom: 12px; border-radius: 50%; background: #ffffff; padding: 4px;" />
                    <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 0.5px; text-transform: uppercase;">
                      Saroj International University
                    </h1>
                    <div style="display: inline-block; background-color: #c9a84c; color: #0e2557; font-size: 11px; font-weight: 800; padding: 4px 14px; border-radius: 9999px; margin-top: 10px; text-transform: uppercase; letter-spacing: 1px;">
                      Talent Search &amp; Scholarship Exam 2026–27
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Welcome Body -->
          <tr>
            <td style="padding: 28px 28px 12px 28px;">
              <p style="font-size: 16px; margin: 0 0 12px; color: #0f172a;">
                Dear <strong>${studentName || 'Candidate'}</strong>,
              </p>
              <p style="font-size: 14px; line-height: 1.6; margin: 0 0 18px; color: #334155;">
                Congratulations on your successful registration for the <strong>Saroj International University Talent Search &amp; Scholarship Examination 2026–27</strong>! Your examination profile and portal access credentials have been officially generated.
              </p>

              <!-- Credentials Box -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background: #f8fafc; border: 2px solid #cbd5e1; border-radius: 12px; margin-bottom: 24px; overflow: hidden;">
                <tr>
                  <td style="background: #e2e8f0; padding: 10px 16px; font-size: 12px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">
                    🔑 Your Exam Portal Login Credentials
                  </td>
                </tr>
                <tr>
                  <td style="padding: 18px 20px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="6">
                      <tr>
                        <td width="38%" style="font-size: 13px; color: #64748b; font-weight: 600;">Candidate Name:</td>
                        <td style="font-size: 14px; color: #0f172a; font-weight: 700;">${studentName || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #64748b; font-weight: 600;">Roll Number:</td>
                        <td style="font-size: 15px; color: #1e3a8a; font-weight: 800; font-family: monospace;">${rollNumber || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #64748b; font-weight: 600;">Application No:</td>
                        <td style="font-size: 13px; color: #334155; font-family: monospace;">${applicationNumber || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #64748b; font-weight: 600;">Login ID (Username):</td>
                        <td style="font-size: 15px; color: #1e3a8a; font-weight: 800; font-family: monospace;">${loginId || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #64748b; font-weight: 600;">Exam Password:</td>
                        <td style="font-size: 16px; color: #b45309; font-weight: 800; font-family: monospace; background: #fef3c7; padding: 2px 8px; border-radius: 4px; display: inline-block;">${password || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #64748b; font-weight: 600;">Selected Stream:</td>
                        <td style="font-size: 14px; color: #047857; font-weight: 700;">${stream || 'General'}</td>
                      </tr>
                      <tr>
                        <td style="font-size: 13px; color: #64748b; font-weight: 600;">Allocated Exam Slot:</td>
                        <td style="font-size: 14px; color: #b91c1c; font-weight: 800;">${slot || '29 Nov'}</td>
                      </tr>
                    </table>

                    <!-- Login Button -->
                    <div style="text-align: center; margin-top: 18px; padding-top: 14px; border-top: 1px solid #e2e8f0;">
                      <a href="${portalUrl}" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%); color: #ffffff; text-decoration: none; font-size: 14px; font-weight: 800; padding: 12px 28px; border-radius: 8px; box-shadow: 0 4px 12px rgba(37,99,235,0.35);">
                        🚀 Enter Online Exam Portal →
                      </a>
                      <div style="margin-top: 8px; font-size: 11px; color: #64748b;">
                        Exam Portal Link: <a href="${portalUrl}" style="color: #2563eb;">${portalUrl}</a>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- About the Test Section -->
              <div style="margin-bottom: 24px;">
                <h3 style="color: #0e2557; font-size: 16px; font-weight: 800; margin: 0 0 10px; border-left: 4px solid #c9a84c; padding-left: 10px;">
                  📘 About The Talent Search Examination
                </h3>
                <p style="font-size: 13px; line-height: 1.6; color: #334155; margin: 0 0 12px;">
                  The <strong>Saroj International University Talent Search &amp; Scholarship Exam</strong> is an all-India talent identification initiative aimed at identifying exceptionally talented young minds. High scorers in this examination unlock prestigious merit scholarships across university degree programmes including B.Tech, BCA, B.Sc, BBA, B.Com, Pharmacy, Film &amp; Mass Media, and Humanities.
                </p>

                <!-- Scholarship Slabs Box -->
                <table role="presentation" width="100%" cellspacing="0" cellpadding="8" style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; font-size: 12px; margin-bottom: 16px;">
                  <tr>
                    <td colspan="2" style="font-weight: 800; color: #92400e; font-size: 13px; border-bottom: 1px dashed #fcd34d;">
                      🏆 Scholarship Slabs &amp; Merit Awards:
                    </td>
                  </tr>
                  <tr>
                    <td width="35%" style="color: #78350f; font-weight: 700;">Score 90% or above:</td>
                    <td style="color: #065f46; font-weight: 800;">100% Complete Tuition Fee Waiver (Full Scholarship)</td>
                  </tr>
                  <tr>
                    <td style="color: #78350f; font-weight: 700;">Score 75% – 89%:</td>
                    <td style="color: #1e3a8a; font-weight: 700;">50% Tuition Fee Waiver</td>
                  </tr>
                  <tr>
                    <td style="color: #78350f; font-weight: 700;">Score 60% – 74%:</td>
                    <td style="color: #c2410c; font-weight: 700;">25% Tuition Fee Waiver</td>
                  </tr>
                  <tr>
                    <td style="color: #78350f; font-weight: 700;">All Qualifiers:</td>
                    <td style="color: #475569; font-weight: 600;">Official Certificate of Merit &amp; Admission Priority</td>
                  </tr>
                </table>

                <!-- Exam Pattern & Syllabus -->
                <h4 style="color: #0e2557; font-size: 14px; font-weight: 700; margin: 14px 0 8px;">
                  📝 Examination Pattern &amp; Syllabus:
                </h4>
                <ul style="font-size: 13px; color: #334155; line-height: 1.6; margin: 0 0 16px; padding-left: 20px;">
                  <li><strong>Format:</strong> Online Computer-Based / Mobile-friendly Proctored Test consisting of Multiple Choice Questions (MCQs).</li>
                  <li><strong>Syllabus Focus:</strong> Strictly based on your selected stream (<strong>${stream || 'PCM / Class 12'}</strong>) following the standard NCERT / CBSE / State Board curriculum.</li>
                  <li><strong>Negative Marking:</strong> There is <strong>NO negative marking</strong>. You are encouraged to attempt all questions.</li>
                  <li><strong>Exam Duration:</strong> 60 Minutes.</li>
                </ul>

                <!-- Important Instructions -->
                <h4 style="color: #0e2557; font-size: 14px; font-weight: 700; margin: 14px 0 8px;">
                  ⚠️ Important Exam Day Guidelines:
                </h4>
                <ol style="font-size: 13px; color: #334155; line-height: 1.6; margin: 0 0 16px; padding-left: 20px;">
                  <li>Log in to the exam portal at least <strong>15 minutes prior</strong> to your scheduled slot.</li>
                  <li>Ensure a stable internet connection and allow camera access for the proctoring verification.</li>
                  <li>Do not switch tabs or minimize your browser window during the active test session.</li>
                  <li>Keep your Login ID and Password confidential.</li>
                </ol>
              </div>

              <!-- Download Admit Card Link -->
              <div style="background-color: #f1f5f9; border-radius: 8px; padding: 12px 16px; margin-bottom: 20px; font-size: 12px; color: #475569;">
                📄 <strong>Need your Admit Card?</strong> You can download or print your official admit card at any time by visiting <a href="${admitCardUrl}" style="color: #1e3a8a; font-weight: 700;">${admitCardUrl}</a>.
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0e2557; color: #94a3b8; padding: 24px 28px; text-align: center; font-size: 12px; line-height: 1.6; border-top: 1px solid #1e3a8a;">
              <p style="margin: 0 0 6px; color: #ffffff; font-weight: 700; font-size: 13px;">
                Examination Cell | Saroj International University
              </p>
              <p style="margin: 0 0 6px;">
                Helpline &amp; Queries: <a href="mailto:tse@sarojuniversity.edu.in" style="color: #c9a84c; text-decoration: none;">tse@sarojuniversity.edu.in</a> | <a href="mailto:info@sarojuniversity.edu.in" style="color: #c9a84c; text-decoration: none;">info@sarojuniversity.edu.in</a>
              </p>
              <p style="margin: 0; font-size: 11px; color: #64748b;">
                Website: <a href="https://sarojuniversity.edu.in" style="color: #94a3b8;">sarojuniversity.edu.in</a> | Shivrajpur, Kanpur Nagar, Uttar Pradesh, India
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Send Talent Search Credentials Email
 * @param {Object} candidate - Student registration record
 * @returns {Promise<{ success: boolean, message: string }>}
 */
async function sendTalentSearchCredentialsEmail(candidate) {
  const recipient = candidate.email;
  if (!recipient || !recipient.includes('@')) {
    console.warn('[TalentSearch Mail] Invalid or missing email address:', recipient);
    return { success: false, message: 'Invalid or missing email address' };
  }

  const studentName = candidate.name || 'Candidate';
  const applicationNumber = candidate.applicationNumber || 'N/A';
  const rollNumber = candidate.rollNumber || candidate.applicationNumber || 'N/A';
  const loginId = candidate.username || candidate.mobile || 'N/A';
  const password = candidate.password || `SIU@${(candidate.mobile || '1234').slice(-4)}`;
  const stream = candidate.stream || 'Class 12';
  const slot = candidate.slot || '29 Nov';

  const htmlContent = generateTalentSearchEmailHtml({
    studentName,
    applicationNumber,
    rollNumber,
    loginId,
    password,
    stream,
    slot,
  });

  const textContent = `
SAROJ INTERNATIONAL UNIVERSITY
Talent Search & Scholarship Examination 2026-27

Dear ${studentName},

Congratulations! You have successfully registered for the SIU Talent Search & Scholarship Examination 2026-27.

YOUR EXAM CREDENTIALS:
- Exam Portal URL: https://talent-search-scholership.vercel.app/login
- Roll Number: ${rollNumber}
- Application Number: ${applicationNumber}
- Login ID (Username): ${loginId}
- Exam Password: ${password}
- Selected Stream: ${stream}
- Allocated Exam Slot: ${slot}

ABOUT THE EXAM:
The SIU Talent Search Examination offers 100% full fee waiver scholarships to high scorers.
- Score 90% or above: 100% Tuition Fee Waiver (Full Scholarship)
- Score 75% to 89%: 50% Tuition Fee Waiver
- Score 60% to 74%: 25% Tuition Fee Waiver
- Format: Online MCQ Proctored Test (60 Minutes) based strictly on your stream syllabus. No negative marking.

Please log in 15 minutes prior to your allocated slot at:
https://talent-search-scholership.vercel.app/login

For queries, email us at: tse@sarojuniversity.edu.in
Examination Cell, Saroj International University
  `.trim();

  try {
    const transporter = createTransporter();
    const fromAddress = process.env.SMTP_FROM || `"Saroj International University Examination Cell" <${process.env.SMTP_USER || 'rajsharmafullstackdev@gmail.com'}>`;
    const replyToAddress = process.env.SMTP_REPLY_TO || 'tse@sarojuniversity.edu.in';

    console.log(`[TalentSearch Mail] Sending credentials email to ${recipient}...`);

    const info = await transporter.sendMail({
      from: fromAddress,
      replyTo: replyToAddress,
      to: recipient,
      subject: `SIU Talent Search 2026-27 | Your Exam Portal Login ID & Password (${rollNumber})`,
      text: textContent,
      html: htmlContent,
    });

    console.log(`[TalentSearch Mail] Email sent successfully to ${recipient}! Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId, message: `Credentials email dispatched to ${recipient}` };
  } catch (err) {
    console.error(`[TalentSearch Mail Error] Failed to send email to ${recipient}:`, err.message);
    return { success: false, error: err.message, message: `SMTP dispatch notice: ${err.message}` };
  }
}

module.exports = {
  createTransporter,
  generateTalentSearchEmailHtml,
  sendTalentSearchCredentialsEmail,
};
