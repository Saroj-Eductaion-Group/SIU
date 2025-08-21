import { useState } from 'react';
import { saveAs } from 'file-saver';
import Layout from './Layout';
import { FiDownload, FiEye, FiSearch } from 'react-icons/fi';
import PdfViewerModal from './PdfViewerModal'; // adjust path as needed

export default function PdfPage({ JSONFile }) {
  const { pageHeading, subHeading, documents } = JSONFile;

  const [previewFile, setPreviewFile] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  const pdfFiles = documents;

  const categories = ['All', ...new Set(pdfFiles.map(file => file.category))];

  const handleDownload = async (fileUrl, fileName) => {
    setIsLoading(true);
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();
      saveAs(blob, fileName);
    } catch (error) {
      alert('Download failed.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredFiles = pdfFiles.filter(file => {
    const matchesSearch = file.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      <div className="min-h-screen py-56 bg-gradient-to-br from-gray-50 to-gray-100 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">{pageHeading}</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {subHeading}
            </p>
          </div>

          <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Filter:</span>
              <select
                className="rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>

          {filteredFiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFiles.map((file) => (
                <div key={file.id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full mb-2">
                          {file.category}
                        </span>
                        <h2 className="text-xl font-semibold text-gray-800 mb-1">{file.title}</h2>
                      </div>
                      <span className="text-xs text-gray-500">{file.size}</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-4">{file.description}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <span>Updated: {file.date}</span>
                    </div>
                  </div>
                  <div className="px-5 py-3 bg-gray-50 border-t flex justify-end space-x-2">
                    <button
                      onClick={() => setPreviewFile(file.fileUrl)}
                      className="flex items-center px-3 py-2 bg-blue-600 border border-gray-300 rounded-lg hover:bg-blue-800 hover:cursor-pointer text-sm font-medium text-white"
                    >
                      <FiEye className="mr-2" /> Preview
                    </button>
                    {/* <button
                      onClick={() => handleDownload(file.fileUrl, file.fileName)}
                      disabled={isLoading}
                      className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium disabled:opacity-70"
                    >
                      {isLoading ? 'Downloading...' : (<><FiDownload className="mr-2" /> Download</>)}
                    </button> */}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm">
              <h3 className="text-lg font-medium text-gray-700">No documents found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {previewFile && (
          <PdfViewerModal
            fileUrl={previewFile}
            onClose={() => setPreviewFile(null)}
          />
        )}
      </div>
    </Layout>
  );
}
