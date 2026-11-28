const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

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
 * Generate clean, transactional HTML email for Talent Search Exam
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
  <title>Saroj International University - Examination Slip</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; padding: 24px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);" cellspacing="0" cellpadding="0">
          
          <!-- Institutional Header -->
          <tr>
            <td style="background-color: #0e2557; padding: 28px 20px; text-align: center;">
              <img src="cid:siu_university_logo" alt="Saroj International University" width="72" height="72" style="display: block; margin: 0 auto 10px; border-radius: 50%; background: #ffffff; padding: 4px; border: 1px solid #cbd5e1;" />
              <h1 style="color: #ffffff; margin: 0 0 4px; font-size: 20px; font-weight: 700; letter-spacing: 0.5px; text-transform: uppercase;">
                Saroj International University
              </h1>
              <p style="color: #cbd5e1; margin: 0; font-size: 13px; font-weight: 500;">
                Talent Search &amp; Scholarship Examination 2026–2027
              </p>
            </td>
          </tr>

          <!-- Notice Bar -->
          <tr>
            <td style="background-color: #f1f5f9; padding: 10px 24px; border-bottom: 1px solid #e2e8f0; font-size: 12px; color: #475569; text-align: center;">
              Official Candidate Registration &amp; Examination Allotment Slip
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 24px 24px 12px 24px;">
              <p style="font-size: 15px; margin: 0 0 12px; color: #0f172a;">
                Dear <strong>${studentName || 'Candidate'}</strong>,
              </p>
              <p style="font-size: 13.5px; color: #334155; margin: 0 0 16px;">
                Your registration for the <strong>Saroj International University Talent Search &amp; Scholarship Examination 2026–27</strong> has been successfully confirmed. Please find your official roll number, exam schedule, and portal access details below.
              </p>

              <!-- Access Credentials Table -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; margin-bottom: 20px; overflow: hidden;">
                <tr>
                  <td colspan="2" style="background-color: #e2e8f0; padding: 9px 16px; font-size: 12px; font-weight: 700; color: #1e293b; text-transform: uppercase;">
                    Candidate Allotment &amp; Login Details
                  </td>
                </tr>
                <tr>
                  <td style="padding: 14px 16px;">
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="4" style="font-size: 13px;">
                      <tr>
                        <td width="40%" style="color: #64748b; font-weight: 600;">Student Name:</td>
                        <td style="color: #0f172a; font-weight: 700;">${studentName || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Roll Number:</td>
                        <td style="color: #0e2557; font-weight: 700; font-family: monospace; font-size: 14px;">${rollNumber || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Application ID:</td>
                        <td style="color: #334155; font-family: monospace;">${applicationNumber || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Portal Username:</td>
                        <td style="color: #0e2557; font-weight: 700; font-family: monospace;">${loginId || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Access Password:</td>
                        <td style="color: #9a3412; font-weight: 700; font-family: monospace; font-size: 14px;">${password || 'N/A'}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Selected Stream:</td>
                        <td style="color: #0f172a; font-weight: 600;">${stream || 'General'}</td>
                      </tr>
                      <tr>
                        <td style="color: #64748b; font-weight: 600;">Allocated Slot Date:</td>
                        <td style="color: #0e2557; font-weight: 700;">${slot || '29 Nov'}</td>
                      </tr>
                    </table>

                    <!-- Portal Link -->
                    <div style="text-align: center; margin-top: 14px; padding-top: 12px; border-top: 1px dashed #cbd5e1;">
                      <a href="${portalUrl}" target="_blank" style="display: inline-block; background-color: #0e2557; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 600; padding: 10px 24px; border-radius: 6px;">
                        Access Online Examination Portal &rarr;
                      </a>
                      <div style="margin-top: 6px; font-size: 11px; color: #64748b;">
                        Direct URL: <a href="${portalUrl}" style="color: #0e2557;">${portalUrl}</a>
                      </div>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- About the Examination -->
              <h2 style="font-size: 14px; color: #0e2557; margin: 18px 0 8px; font-weight: 700; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px;">
                Examination Structure &amp; Scholarship Slabs
              </h2>
              <p style="font-size: 13px; color: #334155; margin: 0 0 10px;">
                The SIU Talent Search Examination is an academic assessment conducted by Saroj International University to identify meritorious students for merit-based tuition waivers across academic degree programmes (B.Tech, BCA, B.Sc, BBA, B.Com, Pharmacy, Film &amp; Media, and Allied Sciences).
              </p>

              <!-- Slabs Table -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="6" style="font-size: 12.5px; border: 1px solid #e2e8f0; border-radius: 6px; margin-bottom: 16px; background-color: #ffffff;">
                <tr style="background-color: #f8fafc;">
                  <th align="left" style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; color: #475569;">Performance Tier</th>
                  <th align="left" style="padding: 8px 10px; border-bottom: 1px solid #e2e8f0; color: #475569;">Merit Award</th>
                </tr>
                <tr>
                  <td style="padding: 6px 10px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">Score 90% and above</td>
                  <td style="padding: 6px 10px; border-bottom: 1px solid #f1f5f9; color: #047857; font-weight: 700;">100% Tuition Fee Exemption</td>
                </tr>
                <tr>
                  <td style="padding: 6px 10px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">Score 75% to 89%</td>
                  <td style="padding: 6px 10px; border-bottom: 1px solid #f1f5f9; color: #1e3a8a; font-weight: 600;">50% Tuition Fee Exemption</td>
                </tr>
                <tr>
                  <td style="padding: 6px 10px; border-bottom: 1px solid #f1f5f9; font-weight: 600; color: #0f172a;">Score 60% to 74%</td>
                  <td style="padding: 6px 10px; border-bottom: 1px solid #f1f5f9; color: #b45309; font-weight: 600;">25% Tuition Fee Exemption</td>
                </tr>
                <tr>
                  <td style="padding: 6px 10px; font-weight: 600; color: #0f172a;">All Qualifying Students</td>
                  <td style="padding: 6px 10px; color: #475569;">Official Certificate of Merit &amp; Admission Preference</td>
                </tr>
              </table>

              <!-- Instructions -->
              <h2 style="font-size: 14px; color: #0e2557; margin: 16px 0 8px; font-weight: 700; border-bottom: 2px solid #e2e8f0; padding-bottom: 4px;">
                Examination Guidelines
              </h2>
              <ul style="font-size: 12.5px; color: #334155; margin: 0 0 16px; padding-left: 20px; line-height: 1.6;">
                <li><strong>Format:</strong> Computer-Based Objective Test (Multiple Choice Questions) based on your selected stream (${stream || 'Class 12'}).</li>
                <li><strong>Duration:</strong> 60 Minutes. There is <strong>no negative marking</strong>.</li>
                <li><strong>Timing:</strong> Please log in to the portal 15 minutes before your allotted exam slot.</li>
                <li><strong>Requirements:</strong> Ensure a stable internet connection on your laptop, desktop, or mobile device with camera permission enabled.</li>
              </ul>

              <!-- Admit Card Download Notice -->
              <div style="background-color: #f1f5f9; border-left: 3px solid #0e2557; padding: 10px 14px; margin-bottom: 16px; font-size: 12px; color: #334155;">
                You may also download or print your provisional admit slip anytime from: <a href="${admitCardUrl}" style="color: #0e2557; font-weight: 600;">${admitCardUrl}</a>.
              </div>
            </td>
          </tr>

          <!-- Institutional Footer -->
          <tr>
            <td style="background-color: #0e2557; color: #94a3b8; padding: 20px 24px; text-align: center; font-size: 11.5px; line-height: 1.6;">
              <p style="margin: 0 0 4px; color: #f8fafc; font-weight: 600; font-size: 12px;">
                Examination Cell, Saroj International University
              </p>
              <p style="margin: 0 0 4px;">
                Email Support: <a href="mailto:tse@sarojuniversity.edu.in" style="color: #f8fafc; text-decoration: underline;">tse@sarojuniversity.edu.in</a>
              </p>
              <p style="margin: 0; color: #64748b;">
                Campus: Shivrajpur, Kanpur Nagar, Uttar Pradesh, India | <a href="https://sarojuniversity.edu.in" style="color: #94a3b8; text-decoration: none;">sarojuniversity.edu.in</a>
              </p>
            </td>
          </tr>

        </table>

        <!-- Anti-Spam Footer Notice -->
        <p style="font-size: 11px; color: #94a3b8; margin: 12px 0 0; text-align: center;">
          This is an automated transactional confirmation regarding your examination registration at Saroj International University.
        </p>
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
Talent Search & Scholarship Examination 2026-2027
Official Candidate Registration & Examination Allotment Slip

Dear ${studentName},

Your registration for the Saroj International University Talent Search & Scholarship Examination 2026-27 has been successfully confirmed.

CANDIDATE ALLOTMENT & LOGIN DETAILS:
- Candidate Name: ${studentName}
- Roll Number: ${rollNumber}
- Application ID: ${applicationNumber}
- Portal Username: ${loginId}
- Access Password: ${password}
- Selected Stream: ${stream}
- Allocated Exam Slot: ${slot}
- Online Examination Portal: https://talent-search-scholership.vercel.app/login

EXAMINATION STRUCTURE & MERIT SLABS:
- Score 90% and above: 100% Tuition Fee Exemption
- Score 75% to 89%: 50% Tuition Fee Exemption
- Score 60% to 74%: 25% Tuition Fee Exemption
- All Qualifiers: Certificate of Merit & Admission Preference
- Format: 60-Minute Online Objective Test based on stream syllabus (${stream}). No negative marking.

Please log in to the portal 15 minutes before your scheduled slot.
You can also print your admit slip at: https://sarojuniversity.edu.in/talent-search-scholarship

Examination Cell, Saroj International University
Helpline: tse@sarojuniversity.edu.in | https://sarojuniversity.edu.in
  `.trim();

  try {
    const transporter = createTransporter();
    const fromAddress = process.env.SMTP_FROM || `"SIU Examination Cell" <${process.env.SMTP_USER || 'rajsharmafullstackdev@gmail.com'}>`;
    const replyToAddress = process.env.SMTP_REPLY_TO || 'tse@sarojuniversity.edu.in';

    // Locate inline logo
    const logoCandidates = [
      path.join(__dirname, '../assets/logo.png'),
      path.join(__dirname, '../../public/logo.png'),
      path.join(__dirname, '../../dist/logo.png'),
    ];
    let logoAttachment = null;
    for (const p of logoCandidates) {
      if (fs.existsSync(p)) {
        logoAttachment = {
          filename: 'siu-logo.png',
          path: p,
          cid: 'siu_university_logo',
        };
        break;
      }
    }

    const mailOptions = {
      from: fromAddress,
      replyTo: replyToAddress,
      to: recipient,
      subject: `Saroj International University: Talent Search Examination Slip [Roll No: ${rollNumber}]`,
      text: textContent,
      html: htmlContent,
      headers: {
        'X-Priority': '3',
        'X-Entity-Ref-ID': rollNumber,
        'X-Auto-Response-Suppress': 'OOF, AutoReply',
      },
    };

    if (logoAttachment) {
      mailOptions.attachments = [logoAttachment];
    }

    console.log(`[TalentSearch Mail] Dispatching credentials email to ${recipient}...`);

    const info = await transporter.sendMail(mailOptions);

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
