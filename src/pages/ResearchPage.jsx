import React from 'react';
import { GraduationCap, BookOpenCheck } from 'lucide-react';

const researchPapers = [
  {
    author: "Dr. Neeraj Kumar Dixit",
    title: "Design in-silico multi-pathogenic vaccine of dengue and zika viruses using envelope protein",
    journal: "International Journal of Pharmaceutical Sciences and Research",
    year: 2022,
  },
  {
    author: "Dr. Neeraj Kumar Dixit",
    title: "Design of Epitope- based vaccine for Dengue virus using Immunoinformatic approach",
    journal: "International Journal on Life Science and Bioengineering",
    year: 2018,
  },
  {
    author: "Dr. Neeraj Kumar Dixit",
    title: "Using an immunoinformatic approach, identification of B-cell envelope proteome for multipathogenic dengue and Zika viruses",
    journal: "International Journal of Pharmaceutical Sciences and Research",
    year: 2022,
  },


];

export default function Research() {
  return (
    <div className="bg-blue-50 bg-opacity-70 py-8 sm:py-20"> {/* Changed background to blue-50 and adjusted padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> {/* Adjusted padding */}

        {/* Page Heading */}
        <h1 className="text-center text-2xl sm:text-5xl font-extrabold text-gray-900 mb-6 sm:mb-8 relative pb-2">
          <span className="">UNIVERSITY <span className="text-blue-500">RESEARCH</span></span> {/* Blue theme for heading */}
        </h1>
        <p className="mt-1 max-w-xl mx-auto text-xl text-gray-600 text-center mb-14"> {/* Centered paragraph */}
          Explore pioneering research from Saroj International University's faculty, contributing to scientific advancement globally.
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {/* Expert Faculty Card */}
          <div className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-md"> {/* Added bg-white, padding, rounded, shadow */}
            <GraduationCap className="h-10 w-10 text-blue-600" /> {/* Blue icon color */}
            <div>
              <h3 className="text-xl font-bold text-gray-900">EXPERT FACULTY</h3> {/* Uppercase and bold */}
              <p className="text-gray-700 text-base">Led by experienced researchers across global journals.</p> {/* Adjusted text color */}
            </div>
          </div>
          {/* Published Work Card */}
          <div className="flex items-center space-x-4 bg-white p-6 rounded-lg shadow-md"> {/* Added bg-white, padding, rounded, shadow */}
            <BookOpenCheck className="h-10 w-10 text-blue-600" /> {/* Blue icon color */}
            <div>
              <h3 className="text-xl font-bold text-gray-900">PUBLISHED WORK</h3> {/* Uppercase and bold */}
              <p className="text-gray-700 text-base">Peer-reviewed publications in international journals.</p> {/* Adjusted text color */}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow-md p-6"> {/* Table container styling */}
          <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">RECENT PUBLICATIONS</h2> {/* Added heading for the table */}
          <table className="min-w-full table-auto text-left border-collapse"> {/* Removed top border, used border-collapse */}
            <thead>
              <tr className="bg-blue-100 text-sm text-blue-800 uppercase tracking-wider"> {/* Blue theme for table header */}
                <th className="px-4 py-3 border-b border-gray-200">AUTHOR</th> {/* Added bottom border to header cells */}
                <th className="px-4 py-3 border-b border-gray-200">TITLE</th>
                <th className="px-4 py-3 border-b border-gray-200">JOURNAL</th>
                <th className="px-4 py-3 border-b border-gray-200">YEAR</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-base divide-y divide-gray-200"> {/* Adjusted text size */}
              {researchPapers.map((paper, idx) => (
                <tr key={idx} className="hover:bg-blue-50 transition-colors duration-200"> {/* Blue hover effect */}
                  <td className="px-4 py-3">{paper.author}</td>
                  <td className="px-4 py-3">{paper.title}</td>
                  <td className="px-4 py-3">{paper.journal}</td>
                  <td className="px-4 py-3">{paper.year}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}