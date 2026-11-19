import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';

const PrivacyPolicy = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-blue-50 py-12 px-4 sm:px-6 lg:px-8">
        <Helmet>
          <title>Privacy Policy | Saroj International University</title>
          <meta
            name="description"
            content="Learn how Saroj International University collects, uses, and protects your personal information."
          />
        </Helmet>

        <div className="max-w-5xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-indigo-900 mb-4">
              Privacy Policy
            </h1>
           
          </div>

          {/* Table of Contents */}
          <section className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-indigo-900 mb-4">Table of Contents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              {[
                'Introduction',
                'Information We Collect',
                'How We Use Your Information',
                'Legal Basis for Processing',
                'Data Sharing and Disclosure',
                'International Data Transfers',
                'Data Retention',
                'Data Security',
                'Cookies and Tracking Technologies',
                'Third-Party Links',
                'Children\'s Privacy',
                'Your Data Protection Rights',
                'Changes to This Policy',
                'Contact Information'
              ].map((item, index) => (
                <a 
                  key={index} 
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="text-indigo-600 hover:text-indigo-800 hover:underline"
                >
                  {item}
                </a>
              ))}
            </div>
          </section>

          {/* Introduction - Expanded */}
          <section id="introduction" className="bg-white p-8 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-indigo-900">1. Introduction</h2>
            <p>
              Saroj International University ("we", "our", or "us") is committed to protecting 
              your privacy. This Privacy Policy explains how we collect, use, disclose, and 
              safeguard your information when you visit our website (<a href="https://sarojuniversity.edu.in/" className="text-indigo-600">https://.sarojuniversity.edu.in</a>), 
              use our mobile applications, or interact with our services.
            </p>
            <p>
              We recognize that your personal data belongs to you and we are committed to 
              being transparent about how we collect, use, and share your information in 
              compliance with applicable data protection laws, including the General Data 
              Protection Regulation (GDPR) and other relevant privacy regulations.
            </p>
            <p>
              <strong>Please read this policy carefully.</strong> By accessing or using our services, 
              you agree to the collection and use of information in accordance with this policy. 
              If you do not agree with our policies and practices, you should not use our services.
            </p>
          </section>

          {/* Information We Collect - Expanded */}
          <section id="information-we-collect" className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-indigo-900">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-indigo-800">2.1 Personal Information You Provide</h3>
            <p>
              We collect information that you voluntarily provide when you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Create an account or register for our services</li>
              <li>Apply for admission or enroll in academic programs</li>
              <li>Submit inquiries through contact forms or email</li>
              <li>Participate in surveys, competitions, or promotions</li>
              <li>Make payments or financial transactions</li>
              <li>Subscribe to newsletters or marketing communications</li>
              <li>Attend our events or participate in our programs</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-indigo-800">2.2 Types of Personal Data Collected</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Examples</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    {category: 'Identity Data', examples: 'Full name, date of birth, gender, photograph, government ID numbers'},
                    {category: 'Contact Data', examples: 'Email address, phone number, mailing address, emergency contacts'},
                    {category: 'Academic Data', examples: 'Educational background, transcripts, test scores, academic records'},
                    {category: 'Financial Data', examples: 'Bank account details, payment card information, scholarship details'},
                    {category: 'Technical Data', examples: 'IP address, browser type, device information, login data'},
                    {category: 'Usage Data', examples: 'Information about how you use our website and services'},
                    {category: 'Marketing Data', examples: 'Your preferences in receiving marketing from us'}
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.category}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{row.examples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <h3 className="text-xl font-semibold text-indigo-800">2.3 Information Collected Automatically</h3>
            <p>
              When you visit our website, we automatically collect certain information about 
              your device and browsing actions, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Log data (IP address, browser type, pages visited, time spent)</li>
              <li>Device information (hardware model, operating system, unique device identifiers)</li>
              <li>Location data (approximate location derived from IP address)</li>
              <li>Analytics data (interactions with our website and services)</li>
            </ul>
            
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong>  When you voluntarily send us electronic mail or fill up a form on our
              website, we will keep a record of this information so that we can
              respond to you. We only collect information from you when you
              register on our site or fill out a form. When filling out a form,
              you may be asked to enter your name, e-mail address, or phone number.
              You may, however, visit our site anonymously.
              </p>
            </div>
          </section>

          {/* How We Use Your Information - Expanded */}
          <section id="how-we-use-your-information" className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-indigo-900">3. How We Use Your Information</h2>
            
            <p>
              We use the information we collect for various purposes, including:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Academic Administration',
                  description: 'Processing applications, enrollment, academic record maintenance, degree verification, and providing educational services.',
                  icon: '🎓'
                },
                {
                  title: 'Service Delivery',
                  description: 'Providing and maintaining our services, authenticating users, processing payments, and communicating about your account.',
                  icon: '🛠️'
                },
                {
                  title: 'Communication',
                  description: 'Sending important notices, responding to inquiries, providing customer support, and sending administrative information.',
                  icon: '✉️'
                },
                {
                  title: 'Improvement & Development',
                  description: 'Analyzing usage trends, improving our services, developing new features, and conducting research.',
                  icon: '📈'
                },
                {
                  title: 'Marketing',
                  description: 'Sending promotional communications about programs, events, and services that may be of interest (with your consent where required).',
                  icon: '📢'
                },
                {
                  title: 'Security & Compliance',
                  description: 'Detecting and preventing fraud, protecting our systems, complying with legal obligations, and enforcing our policies.',
                  icon: '🔒'
                }
              ].map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold text-indigo-800 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <h3 className="text-xl font-semibold text-indigo-800">3.1 Legal Basis for Processing</h3>
            <p>
              We process your personal data based on one or more of the following legal grounds:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Contractual necessity:</strong> When processing is necessary for the performance of a contract with you</li>
              <li><strong>Legal obligation:</strong> When processing is necessary for compliance with legal requirements</li>
              <li><strong>Legitimate interests:</strong> When processing is necessary for our legitimate interests (balanced against your rights)</li>
              <li><strong>Consent:</strong> When you have given clear consent for specific purposes</li>
              <li><strong>Vital interests:</strong> When processing is necessary to protect someone's life</li>
              <li><strong>Public task:</strong> When processing is necessary to perform a task in the public interest</li>
            </ul>
          </section>

          {/* Data Sharing and Disclosure - New Section */}
          <section id="data-sharing-and-disclosure" className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-indigo-900">4. Data Sharing and Disclosure</h2>
            
            <p>
              We may share your personal data with third parties in the following circumstances:
            </p>
            
            <h3 className="text-xl font-semibold text-indigo-800">4.1 Service Providers</h3>
            <p>
              We engage third-party companies and individuals to facilitate our services, 
              provide services on our behalf, perform service-related services, or assist 
              us in analyzing how our services are used. These third parties have access 
              to your personal data only to perform these tasks on our behalf and are 
              obligated not to disclose or use it for any other purpose.
            </p>
            
            <h3 className="text-xl font-semibold text-indigo-800">4.2 Academic Partners</h3>
            <p>
              We may share information with partner institutions, accreditation bodies, 
              or other educational organizations for academic purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Verification of academic credentials</li>
              <li>Joint academic programs</li>
              <li>Research collaborations</li>
              <li>Study abroad programs</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-indigo-800">4.3 Legal Requirements</h3>
            <p>
              We may disclose your personal data if required to do so by law or in response 
              to valid requests by public authorities (e.g., a court or government agency).
            </p>
            
            <h3 className="text-xl font-semibold text-indigo-800">4.4 Business Transfers</h3>
            <p>
              In the event of a merger, acquisition, reorganization, bankruptcy, or similar 
              event, your information may be transferred as part of that transaction.
            </p>
            
            <div className="bg-purple-50 border-l-4 border-purple-500 p-4">
              <p className="text-sm text-purple-700">
                <strong>Important:</strong> We will never sell your personal information to third parties 
                for marketing purposes without your explicit consent.
              </p>
            </div>
          </section>

          {/* International Data Transfers - New Section */}
          <section id="international-data-transfers" className="bg-white p-8 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-indigo-900">5. International Data Transfers</h2>
            
            <p>
              Your information, including personal data, may be transferred to — and maintained on — 
              computers located outside of your state, province, country, or other governmental 
              jurisdiction where the data protection laws may differ from those of your jurisdiction.
            </p>
            
            <p>
              If you are located outside India and choose to provide information to us, please note 
              that we transfer the data, including personal data, to India and process it there.
            </p>
            
            <p>
              We will take all steps reasonably necessary to ensure that your data is treated securely 
              and in accordance with this privacy policy and no transfer of your personal data will 
              take place to an organization or a country unless there are adequate controls in place 
              including the security of your data and other personal information.
            </p>
          </section>

          {/* Data Retention - New Section */}
          <section id="data-retention" className="bg-white p-8 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-indigo-900">6. Data Retention</h2>
            
            <p>
              We will retain your personal data only for as long as is necessary for the purposes 
              set out in this privacy policy. We will retain and use your personal data to the 
              extent necessary to comply with our legal obligations (for example, if we are required 
              to retain your data to comply with applicable laws), resolve disputes, and enforce our 
              legal agreements and policies.
            </p>
            
            <p>
              For students and alumni, we typically retain academic records indefinitely as part of 
              your permanent academic record. Other personal data will be retained according to the 
              following schedule:
            </p>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Retention Period</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    {type: 'Admission applications (unsuccessful)', period: '2 years after decision'},
                    {type: 'Student academic records', period: 'Permanent'},
                    {type: 'Financial records', period: '7 years after last transaction'},
                    {type: 'Website activity logs', period: '1 year'},
                    {type: 'Marketing preferences', period: '3 years after last interaction'},
                    {type: 'Employment applications', period: '2 years after submission'}
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{row.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Data Security - Expanded */}
          <section id="data-security" className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-indigo-900">7. Data Security</h2>
            
            <p>
              The security of your data is important to us. We implement appropriate technical and 
              organizational measures designed to protect your personal data against accidental or 
              unlawful destruction, loss, alteration, unauthorized disclosure, or access.
            </p>
            
            <h3 className="text-xl font-semibold text-indigo-800">7.1 Security Measures</h3>
            <p>
              Our security measures include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and vulnerability testing</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Secure network architecture and firewalls</li>
              <li>Incident response and breach notification procedures</li>
              <li>Employee training on data protection</li>
            </ul>
            
            <h3 className="text-xl font-semibold text-indigo-800">7.2 Data Breach Notification</h3>
            <p>
              In the event of a personal data breach that is likely to result in a risk to your 
              rights and freedoms, we will notify you and the relevant supervisory authority 
              without undue delay and, where feasible, within 72 hours of becoming aware of the breach.
            </p>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-4">
              <p className="text-sm text-red-700">
                <strong>Important:</strong> While we strive to use commercially acceptable means to protect 
                your personal data, no method of transmission over the Internet or method of electronic 
                storage is 100% secure. Therefore, we cannot guarantee absolute security.
              </p>
            </div>
          </section>

          {/* Cookies and Tracking Technologies - Expanded */}
          <section id="cookies-and-tracking-technologies" className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-indigo-900">8. Cookies and Tracking Technologies</h2>
            
            <p>
              We use cookies and similar tracking technologies to track activity on our services 
              and hold certain information to improve and analyze our services.
            </p>
            
            <h3 className="text-xl font-semibold text-indigo-800">8.1 Types of Cookies</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Examples</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    {
                      type: 'Essential',
                      purpose: 'Necessary for website functionality',
                      examples: 'Session cookies, authentication cookies'
                    },
                    {
                      type: 'Performance',
                      purpose: 'Improve website performance',
                      examples: 'Analytics cookies, optimization cookies'
                    },
                    {
                      type: 'Functionality',
                      purpose: 'Remember user preferences',
                      examples: 'Language preferences, font size choices'
                    },
                    {
                      type: 'Targeting/Advertising',
                      purpose: 'Deliver personalized ads',
                      examples: 'Tracking cookies, social media cookies'
                    }
                  ].map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.type}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{row.purpose}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{row.examples}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <h3 className="text-xl font-semibold text-indigo-800">8.2 Managing Cookies</h3>
            <p>
              You can instruct your browser to refuse all cookies or to indicate when a cookie is 
              being sent. However, if you do not accept cookies, you may not be able to use some 
              portions of our services.
            </p>
            
            <p>
              Most web browsers allow some control of most cookies through the browser settings. 
              To find out more about cookies, including how to see what cookies have been set 
              and how to manage and delete them, visit <a href="https://www.allaboutcookies.org" className="text-indigo-600">www.allaboutcookies.org</a>.
            </p>
            
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <p className="text-sm text-yellow-700">
                <strong>Note:</strong> We may use third-party services (like Google Analytics) that collect, 
                monitor, and analyze this type of information to improve our services' functionality.
              </p>
            </div>
          </section>

          {/* Third-Party Links - New Section */}
          <section id="third-party-links" className="bg-white p-8 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-indigo-900">9. Third-Party Links</h2>
            
            <p>
              Our services may contain links to other sites that are not operated by us. If you 
              click on a third-party link, you will be directed to that third party's site. We 
              strongly advise you to review the privacy policy of every site you visit.
            </p>
            
            <p>
              We have no control over and assume no responsibility for the content, privacy 
              policies, or practices of any third-party sites or services.
            </p>
          </section>

          {/* Children's Privacy - New Section */}
          <section id="childrens-privacy" className="bg-white p-8 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-indigo-900">10. Children's Privacy</h2>
            
            <p>
              Our services are not directed to children under the age of 13. We do not knowingly 
              collect personally identifiable information from children under 13. If you are a 
              parent or guardian and you are aware that your child has provided us with personal 
              data, please contact us.
            </p>
            
            <p>
              If we become aware that we have collected personal data from children without 
              verification of parental consent, we take steps to remove that information from 
              our servers.
            </p>
            
            <p>
              For students under 18 years old applying to our programs, we may require parental 
              consent for certain data processing activities.
            </p>
          </section>

          {/* Your Data Protection Rights - Expanded */}
          <section id="your-data-protection-rights" className="bg-white p-8 rounded-lg shadow-md space-y-6">
            <h2 className="text-2xl font-bold text-indigo-900">11. Your Data Protection Rights</h2>
            
            <p>
              Depending on your location and applicable laws, you may have certain rights regarding 
              your personal data:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Right to Access',
                  description: 'Request copies of your personal data that we hold.',
                  icon: '📄'
                },
                {
                  title: 'Right to Rectification',
                  description: 'Request correction of inaccurate or incomplete data.',
                  icon: '✏️'
                },
                {
                  title: 'Right to Erasure',
                  description: 'Request deletion of your personal data under certain conditions.',
                  icon: '🗑️'
                },
                {
                  title: 'Right to Restriction',
                  description: 'Request restriction of processing your personal data.',
                  icon: '⏸️'
                },
                {
                  title: 'Right to Data Portability',
                  description: 'Request transfer of your data to another organization.',
                  icon: '📤'
                },
                {
                  title: 'Right to Object',
                  description: 'Object to our processing of your personal data.',
                  icon: '✋'
                },
                {
                  title: 'Right to Withdraw Consent',
                  description: 'Withdraw consent where processing is based on consent.',
                  icon: '🔄'
                },
                {
                  title: 'Right to Complain',
                  description: 'Lodge a complaint with a supervisory authority.',
                  icon: '⚖️'
                }
              ].map((item, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">{item.icon}</span>
                    <div>
                      <h3 className="font-semibold text-indigo-800 mb-1">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <h3 className="text-xl font-semibold text-indigo-800">11.1 Exercising Your Rights</h3>
            <p>
              To exercise any of these rights, please contact us using the details provided in the 
              "Contact Us" section below. We may need to verify your identity before responding to 
              your request.
            </p>
            
            <p>
              We will respond to all legitimate requests within one month. Occasionally it may take 
              us longer if your request is particularly complex or you have made several requests, 
              in which case we will notify you and keep you updated.
            </p>
          </section>

          {/* Changes to This Policy - Expanded */}
          <section id="changes-to-this-policy" className="bg-white p-8 rounded-lg shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-indigo-900">12. Changes to This Privacy Policy</h2>
            
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes 
              by posting the new Privacy Policy on this page and updating the "Last Updated" date at 
              the top of this policy.
            </p>
            
            <p>
              We will let you know via email and/or a prominent notice on our services prior to the 
              change becoming effective and update the "last updated" date at the top of this Privacy 
              Policy.
            </p>
            
            <p>
              You are advised to review this Privacy Policy periodically for any changes. Changes to 
              this Privacy Policy are effective when they are posted on this page.
            </p>
            
            <div className="bg-green-50 border-l-4 border-green-500 p-4">
              <p className="text-sm text-green-700">
                <strong>Notification:</strong> For significant changes that affect how we process your personal 
                data, we will provide more prominent notice (including, for certain services, email 
                notification of privacy policy changes).
              </p>
            </div>
          </section>

         
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;