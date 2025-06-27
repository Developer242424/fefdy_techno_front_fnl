// import React, { useEffect, useRef, useState } from "react";
// import $ from "jquery";
// import "./Flipbook.css"; // Optional: Add custom CSS if needed

// const Flipbook = ({ pdfSource }) => {
//   const bookRef = useRef(null);
//   const [source, setSource] = useState(
//     pdfSource ||
//     "http://npm.d2cwebsolutions.in/public/uploads/subtopics/1745993943455-230939133.pdf"
//   );

//   useEffect(() => {
//     const loadDflip = () => {
//       // Check if dflip.js is loaded globally and pdfSource is valid
//       if (window.dflip && source) {
//         const $book = $(bookRef.current);
//         $book.dflip({
//           source: source, // The URL of the PDF to be displayed in the flipbook
//         });

//         // Cleanup when the component is unmounted
//         return () => {
//           $book.dflip("destroy");
//         };
//       } else {
//         console.log("dflip.js loaded: ", window.dflip); // Check if dflip is loaded
//         console.log("Source: ", source); // Check the source URL being passed
//         console.log("failed dflip: dflip.js not loaded or pdfSource invalid");
//       }
//     };

//     // Call loadDflip on component mount
//     loadDflip();
//   }, [source]); // Trigger on source change

//   return (
//     <div
//       className="_df_book"
//       ref={bookRef}
//       style={{ height: "800px", width: "100%" }}
//     />
//   );
// };

// export default Flipbook;

// Worker
// import React from "react";
// import { Worker, Viewer } from "@react-pdf-viewer/core";
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import pdfjsWorker from "pdfjs-dist/build/pdf.worker.min?url"; // 👈 Webpack-aware import

// const Flipbook = ({ pdfSource }) => {
//   console.log(pdfSource);
//   return (
//     <div style={{ height: "800px", width: "100%" }}>
//       <Worker workerUrl={pdfjsWorker}>
//         <Viewer
//           fileUrl={`http://npm.d2cwebsolutions.in/v1/api/pdf?url=${encodeURIComponent(
//             pdfSource
//           )}`}
//         />
//       </Worker>
//     </div>
//   );
// };

// export default Flipbook;

// React flip page
// import React from "react";
// import FlipPage from "react-flip-page";

// const Flipbook = ({ pdfSource }) => {
//   return (
//     <div style={{ height: "800px", width: "100%" }}>
//       <FlipPage width={500} height={800}>
//         {[
//           // 👈 Wrap in array
//           <div key="page-1">
//             <img
//               src={pdfSource}
//               alt="flipbook page"
//               style={{ width: "100%", height: "100%", objectFit: "cover" }}
//             />
//           </div>,
//           // Add more pages as needed
//         ]}
//       </FlipPage>
//     </div>
//   );
// };

// export default Flipbook;

// import React, { useState } from "react";
// import { Document, Page, pdfjs } from "react-pdf";

// // ✅ Load worker locally instead of from CDN
// import workerSrc from "pdfjs-dist/build/pdf.worker.min?url";

// // Assign worker path
// pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;

// const Flipbook = ({ pdfSource }) => {
//   const [pageNumber, setPageNumber] = useState(1);
//   const [numPages, setNumPages] = useState(null);

//   const onDocumentLoadSuccess = ({ numPages }) => {
//     setNumPages(numPages);
//     setPageNumber(1);
//   };

//   return (
//     <div style={{ height: "800px", width: "100%", textAlign: "center" }}>
//       <Document file={pdfSource} onLoadSuccess={onDocumentLoadSuccess}>
//         <Page pageNumber={pageNumber} width={600} />
//       </Document>
//       <div style={{ marginTop: 20 }}>
//         <button
//           onClick={() => setPageNumber((p) => Math.max(p - 1, 1))}
//           disabled={pageNumber <= 1}
//         >
//           Previous
//         </button>
//         <span style={{ margin: "0 15px" }}>
//           Page {pageNumber} of {numPages}
//         </span>
//         <button
//           onClick={() => setPageNumber((p) => Math.min(p + 1, numPages))}
//           disabled={pageNumber >= numPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Flipbook;
