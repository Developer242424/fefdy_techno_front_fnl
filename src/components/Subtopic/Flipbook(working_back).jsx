import React, { useState, useRef, useEffect } from "react";
import HTMLFlipBook from "react-pageflip";
import { Document, Page, pdfjs } from "react-pdf";

// Set the correct workerSrc for pdfjs
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.js";

const PDFPage = React.forwardRef(({ pageNumber, scale }, ref) => (
  <div className="page" ref={ref}>
    <div className="page-content">
      <Page
        pageNumber={pageNumber}
        width={500}
        scale={scale}
        renderAnnotationLayer={false}
        renderTextLayer={false}
      />
      <div className="page-footer">Page {pageNumber}</div>
    </div>
  </div>
));

PDFPage.displayName = "PDFPage";

const FlipbookPDF = ({ src, initialScale }) => {
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(null);
  const flipbookRef = useRef(null);

  useEffect(() => {
    setScale(initialScale);
  }, [src, initialScale]);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const toggleFullscreen = () => {
    setScale(1.0);
    const elem = flipbookRef.current;
    if (!elem) {
      console.error("Flipbook container not found.");
      return;
    }

    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(); // Safari
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen(); // Firefox
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen(); // IE/Edge
      }
    } else {
      document.exitFullscreen?.();
    }
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.1, 3.0)); // Max zoom level
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.1, 0.5)); // Min zoom level
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center bg-gray-900 text-white">
      {/* <div className="container"> */}
        <div className="row">
          <div className="col-9">
            <Document
              file={src}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={<p>Loading PDF...</p>}
              renderMode="canvas"
            >
              {numPages && (
                <div ref={flipbookRef} className="flipbook-container bg-white">
                  <HTMLFlipBook
                    width={500}
                    height={650}
                    showCover={false}
                    mobileScrollSupport={true}
                  >
                    {Array.from({ length: numPages }, (_, index) => (
                      <PDFPage
                        key={index}
                        pageNumber={index + 1}
                        scale={scale}
                      />
                    ))}
                  </HTMLFlipBook>
                </div>
              )}
            </Document>
          </div>
          <div className="col-3">
            <div className="mb-4 flex space-x-4">
              <button
                className="px-4 py-2 bg-purple-700 rounded hover:bg-purple-800"
                onClick={zoomOut}
              >
                ➖
              </button>
              <button
                className="px-4 py-2 bg-purple-700 rounded hover:bg-purple-800"
                onClick={zoomIn}
              >
                ➕
              </button>
              <button
                className="px-4 py-2 bg-purple-700 rounded hover:bg-purple-800"
                onClick={toggleFullscreen}
              >
                🔍
              </button>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default FlipbookPDF;
