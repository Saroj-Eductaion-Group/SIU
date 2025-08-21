import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';

const TermsAndConditions = () => {
  const [expandedSections, setExpandedSections] = useState({
    accounts: false,
    payments: false,
    conduct: false,
    intellectualProperty: false,
    liability: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <Layout>

    <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Terms & Conditions | Saroj International University</title>
        <meta name="description" content="Terms and conditions governing the use of Saroj International University's website and services." />
      </Helmet>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-indigo-900 mb-3 sm:mb-4">Terms & Conditions</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Introduction */}
          <section id="introduction" className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Introduction</h2>
            <div className="text-gray-700 space-y-4">
              <p>Welcome to Saroj International University ("University", "we", "our", or "us"). These Terms & Conditions ("Terms") govern your access to and use of our website, services, and applications (collectively, the "Services").</p>
              <p>By accessing or using our Services, you agree to be bound by these Terms and our Privacy Policy. If you disagree with any part of these Terms, you may not access the Services.</p>
              
              <div className="bg-red-50 border-l-4 border-red-500 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      These Terms constitute a legally binding agreement between you and Saroj International University. Please read them carefully.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* User Accounts */}
          <section id="accounts" className="p-6 border-b border-gray-200">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => toggleSection('accounts')}
            >
              <h2 className="text-2xl font-bold text-indigo-900">User Accounts</h2>
              <svg 
                className={`w-6 h-6 text-indigo-600 transform transition-transform ${expandedSections.accounts ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {expandedSections.accounts && (
              <div className="mt-4 text-gray-700 space-y-4">
                <p>To access certain features of our Services, you may be required to create an account. When creating an account, you agree to:</p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain the security of your password and accept all risks of unauthorized access</li>
                  <li>Promptly update your information if it changes</li>
                  <li>Be responsible for all activities that occur under your account</li>
                </ul>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-blue-800 mb-2">Account Types</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded shadow-sm">
                      <h4 className="font-medium text-blue-700 mb-1">Student Accounts</h4>
                      <p className="text-sm text-gray-600">For enrolled students to access academic resources.</p>
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm">
                      <h4 className="font-medium text-blue-700 mb-1">Faculty Accounts</h4>
                      <p className="text-sm text-gray-600">For teaching staff to manage courses and materials.</p>
                    </div>
                    <div className="bg-white p-3 rounded shadow-sm">
                      <h4 className="font-medium text-blue-700 mb-1">Applicant Accounts</h4>
                      <p className="text-sm text-gray-600">For prospective students applying to programs.</p>
                    </div>
                  </div>
                </div>
                
                <p>We reserve the right to refuse service, terminate accounts, or remove content at our sole discretion.</p>
              </div>
            )}
          </section>

          {/* Payments */}
          <section id="payments" className="p-6 border-b border-gray-200">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => toggleSection('payments')}
            >
              <h2 className="text-2xl font-bold text-indigo-900">Payments and Fees</h2>
              <svg 
                className={`w-6 h-6 text-indigo-600 transform transition-transform ${expandedSections.payments ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {expandedSections.payments && (
              <div className="mt-4 text-gray-700 space-y-4">
                <p>Certain Services may require payment of fees. By using these Services, you agree to pay all applicable fees as described on our website.</p>
                
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Type</th>
                        <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th scope="col" className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Refund Policy</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">Tuition Fees</td>
                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-500">Academic program charges</td>
                        <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">Per academic policy</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">Application Fees</td>
                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-500">Program application processing</td>
                        <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">Non-refundable</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm font-medium text-gray-900">Other Fees</td>
                        <td className="px-4 py-3 sm:px-6 sm:py-4 text-sm text-gray-500">Library, lab, etc.</td>
                        <td className="px-4 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-sm text-gray-500">Case by case</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        All fees are subject to change without notice. Payment deadlines are strictly enforced, and late payments may incur additional charges.
                      </p>
                    </div>
                  </div>
                </div>
                
                <p>We use third-party payment processors to handle all financial transactions. Your payment information is processed directly by these providers and we do not store your complete payment details.</p>
              </div>
            )}
          </section>

          {/* Code of Conduct */}
          <section id="conduct" className="p-6 border-b border-gray-200">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => toggleSection('conduct')}
            >
              <h2 className="text-2xl font-bold text-indigo-900">Code of Conduct</h2>
              <svg 
                className={`w-6 h-6 text-indigo-600 transform transition-transform ${expandedSections.conduct ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {expandedSections.conduct && (
              <div className="mt-4 text-gray-700 space-y-4">
                <p>When using our Services, you agree to abide by the following code of conduct:</p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-green-800 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Do
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-green-900">
                      <li>Respect all members of the university community</li>
                      <li>Use appropriate and professional language</li>
                      <li>Protect the privacy of others</li>
                      <li>Report any security vulnerabilities</li>
                    </ul>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-red-800 mb-2 flex items-center">
                      <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Don't
                    </h3>
                    <ul className="list-disc pl-5 space-y-1 text-red-900">
                      <li>Engage in harassment or discrimination</li>
                      <li>Share login credentials</li>
                      <li>Upload malicious software</li>
                      <li>Violate academic integrity policies</li>
                    </ul>
                  </div>
                </div>
                
                <p>Violations of this code may result in suspension or termination of your access to the Services, disciplinary action, or legal consequences as appropriate.</p>
              </div>
            )}
          </section>

          {/* Intellectual Property */}
          <section id="intellectualProperty" className="p-6 border-b border-gray-200">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => toggleSection('intellectualProperty')}
            >
              <h2 className="text-2xl font-bold text-indigo-900">Intellectual Property</h2>
              <svg 
                className={`w-6 h-6 text-indigo-600 transform transition-transform ${expandedSections.intellectualProperty ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {expandedSections.intellectualProperty && (
              <div className="mt-4 text-gray-700 space-y-4">
                <p>The Services and their original content, features, and functionality are owned by Saroj International University and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
                
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">License to Use</h3>
                  <p className="text-purple-900 mb-2">We grant you a limited, non-exclusive, non-transferable, revocable license to use our Services for personal, non-commercial purposes, subject to these Terms.</p>
                  <p className="text-purple-900">This license does not include:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-purple-900">
                    <li>Resale or commercial use of the Services</li>
                    <li>Distribution, public performance, or public display</li>
                    <li>Modification or creation of derivative works</li>
                    <li>Use of data mining or extraction tools</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 border-l-4 border-orange-400 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-orange-700">
                        Course materials provided to students are for individual educational use only. Unauthorized sharing, reproduction, or distribution may violate copyright laws and university policies.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Liability */}
          <section id="liability" className="p-6 border-b border-gray-200">
            <div 
              className="flex justify-between items-center cursor-pointer" 
              onClick={() => toggleSection('liability')}
            >
              <h2 className="text-2xl font-bold text-indigo-900">Limitation of Liability</h2>
              <svg 
                className={`w-6 h-6 text-indigo-600 transform transition-transform ${expandedSections.liability ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {expandedSections.liability && (
              <div className="mt-4 text-gray-700 space-y-4">
                <p>In no event shall Saroj International University, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:</p>
                
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your access to or use of or inability to access or use the Services</li>
                  <li>Any conduct or content of any third party on the Services</li>
                  <li>Any content obtained from the Services</li>
                  <li>Unauthorized access, use or alteration of your transmissions or content</li>
                </ul>
                
                <div className="bg-gray-100 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-2">Disclaimer</h3>
                  <p className="text-gray-700">The Services are provided on an "AS IS" and "AS AVAILABLE" basis. The University makes no warranties, expressed or implied, and hereby disclaims all warranties including, without limitation, implied warranties of merchantability, fitness for a particular purpose, and non-infringement.</p>
                </div>
              </div>
            )}
          </section>

          {/* Termination */}
          <section id="termination" className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Termination</h2>
            <div className="text-gray-700 space-y-4">
              <p>We may terminate or suspend your account and bar access to the Services immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of these Terms.</p>
              <p>If you wish to terminate your account, you may simply discontinue using the Services. All provisions of these Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.</p>
            </div>
          </section>

          {/* Changes */}
          <section id="changes" className="p-6">
            <h2 className="text-2xl font-bold text-indigo-900 mb-4">Changes to Terms</h2>
            <div className="text-gray-700 space-y-4">
              <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.</p>
              <p>By continuing to access or use our Services after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you must stop using the Services.</p>
              
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      We encourage you to periodically review these Terms for changes. The "Last updated" date at the top of this page indicates when these Terms were last revised.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        
      </div>
    </div>
    </Layout>

  );
};

export default TermsAndConditions;