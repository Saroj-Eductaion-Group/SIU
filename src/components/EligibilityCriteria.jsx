import { GraduationCap, BookOpen, Atom, CheckCircle } from 'lucide-react';

const EligibilityCriteria = () => {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 rounded-xl shadow-sm border border-gray-200">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
          <GraduationCap className="text-blue-600" size={28} />
          <span>Eligibility Criteria</span>
        </h2>
        
        {/* B.Tech Eligibility */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <BookOpen className="text-blue-500" size={20} />
            <span>For B.Tech (AI, Data Science, Machine Learning & Robotics)</span>
          </h3>
          
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircle className="flex-shrink-0 text-green-500 mt-1" size={18} />
              <div>
                <p className="font-medium">Educational Qualifications:</p>
                <p>Candidate must have passed the higher secondary examination (10+2) or its equivalent from a recognized board or institution.</p>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <CheckCircle className="flex-shrink-0 text-green-500 mt-1" size={18} />
              <div>
                <p className="font-medium">Stream of Study:</p>
                <p>Candidate should have studied Physics, Chemistry, and Mathematics as core subjects in their 10+2 curriculum.</p>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <CheckCircle className="flex-shrink-0 text-green-500 mt-1" size={18} />
              <div>
                <p className="font-medium">Minimum Marks Requirement:</p>
                <p>A minimum Percentage of 50% in 10+2 from a Recognized School/Institution.</p>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <CheckCircle className="flex-shrink-0 text-green-500 mt-1" size={18} />
              <div>
                <p className="font-medium">Selection Process:</p>
                <p>After meeting the eligibility criteria, candidates may be required to undergo a selection process, which may include a combination of entrance exam scores, academic performance, and possibly personal interviews or counselling sessions.</p>
              </div>
            </li>
          </ul>
        </div>
        
        {/* M.Tech Eligibility */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
            <Atom className="text-blue-500" size={20} />
            <span>For M.Tech (AI, Data Science, Machine Learning & Robotics)</span>
          </h3>
          
          <ul className="space-y-4 text-gray-700">
            <li className="flex items-start gap-3">
              <CheckCircle className="flex-shrink-0 text-green-500 mt-1" size={18} />
              <div>
                <p className="font-medium">Educational Qualifications:</p>
                <p>Candidates must hold a Bachelor's degree in Engineering or Technology (B.E./B.Tech) in relevant disciplines such as Computer Science, Electrical Engineering, Electronics and Communication Engineering, Information Technology, or related fields from a recognized university or institution.</p>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <CheckCircle className="flex-shrink-0 text-green-500 mt-1" size={18} />
              <div>
                <p className="font-medium">Minimum Marks Requirement:</p>
                <p>Candidates should have a minimum aggregate score of 50% in their Bachelor's degree.</p>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <CheckCircle className="flex-shrink-0 text-green-500 mt-1" size={18} />
              <div>
                <p className="font-medium">Selection Process:</p>
                <p>Admission to M.Tech programs often involves a selection process, which includes a combination of academic performance in undergraduate studies, personal interviews, and/or written tests conducted by Saroj International University.</p>
              </div>
            </li>
            
            <li className="flex items-start gap-3">
              <CheckCircle className="flex-shrink-0 text-green-500 mt-1" size={18} />
              <div>
                <p className="font-medium">Professional Certifications:</p>
                <p>Certain professional certifications or online courses in relevant areas may be considered as additional qualifications. These could be in programming languages (Python, R), machine learning frameworks (TensorFlow, PyTorch), or data science tools (SQL, Tableau).</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EligibilityCriteria;