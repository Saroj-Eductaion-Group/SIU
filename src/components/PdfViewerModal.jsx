import { useState } from 'react';
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import { searchPlugin } from '@react-pdf-viewer/search';
import { FiX, } from 'react-icons/fi';
import '@react-pdf-viewer/core/lib/styles/index.css';

function PdfViewerModal({ fileUrl, onClose, fileName }) {
  const [scale, setScale] = useState(1);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const searchPluginInstance = searchPlugin();

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const handleFitToPage = () => setScale(SpecialZoomLevel.PageFit);
  const toggleSearch = () => setIsSearchOpen(prev => !prev);
  const toggleBookmark = () => setIsBookmarked(prev => !prev);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-xl w-full max-w-6xl h-[90vh] flex flex-col relative overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b bg-gray-50">
          <div className="flex items-center space-x-3">
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Close document viewer"
              title="Close"
            >
              <FiX className="w-5 h-5 text-gray-700" />
            </button>
            <div>
              <h2 className="font-medium text-gray-800">{fileName || 'Document Viewer'}</h2>
              <p className="text-xs text-gray-500">PDF Document</p>
            </div>
          </div>

          {/* Optional actions */}
          {/* <div className="flex items-center space-x-2 bg-gray-100 rounded-lg px-2 py-1">
            <button 
              onClick={handleZoomOut}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              aria-label="Zoom out"
              title="Zoom out"
            >
              <FiZoomOut className="w-4 h-4 text-gray-700" />
            </button>
            <span className="text-sm font-medium text-gray-700">
              {typeof scale === 'number' ? `${Math.round(scale * 100)}%` : 'Fit'}
            </span>
            <button 
              onClick={handleZoomIn}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              aria-label="Zoom in"
              title="Zoom in"
            >
              <FiZoomIn className="w-4 h-4 text-gray-700" />
            </button>
            <button 
              onClick={handleFitToPage}
              className="text-xs px-2 py-1 hover:bg-gray-200 rounded colors"
              aria-label="Fit to page"
              title="Fit to page"
            >
              Fit
            </button>
          </div> */}

          <div className="flex space-x-1">
            <button
              onClick={toggleSearch}
              className={`p-2 hover:bg-gray-200 rounded-full transition-colors ${isSearchOpen ? 'bg-gray-200' : ''}`}
              aria-label="Search document"
              title="Search"
            >
              {/* <FiSearch className="w-5 h-5 text-gray-700" /> */}
            </button>
            
            <button
              onClick={toggleBookmark}
              className={`p-2 hover:bg-gray-200 rounded-full transition-colors ${isBookmarked ? 'bg-gray-200 text-blue-500' : 'text-gray-700'}`}
              aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
              title={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            >
              {/* <FiBookmark className="w-5 h-5" /> */}
            </button>
            
            <button
              className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Share document"
              title="Share"
            >
              {/* <FiShare2 className="w-5 h-5 text-gray-700" /> */}
            </button>
          </div>
        </div>

        {/* PDF Viewer (without toolbar/sidebar) */}
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <div className="flex-1 overflow-auto relative">
            <Viewer
              fileUrl={fileUrl}
              plugins={[searchPluginInstance]} // Only search plugin if needed
              defaultScale={SpecialZoomLevel.PageFit}
              theme={{ theme: 'light' }}
              onZoom={zoom => setScale(zoom.scale)}
              renderLoader={(percentages) => (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white">
                  <div className="w-64 bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${percentages}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-500">Loading document... {percentages}%</span>
                </div>
              )}
            />
          </div>
        </Worker>

        {/* Footer */}
        <div className="p-3 border-t bg-gray-50 flex justify-between items-center">
          <div className="flex space-x-4">
            <span className="text-sm text-gray-500">
              Press <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-gray-200 rounded text-xs">F</kbd> to search
            </span>
            <span className="text-sm text-gray-500">Use mouse wheel to scroll</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            title="Close preview"
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
}

export default PdfViewerModal;
