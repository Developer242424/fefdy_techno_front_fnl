import React, { useRef } from "react";
import Certificate from "./content";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function Modal({ onClose }) {
  const contentRef = useRef();

  const downloadPDF = () => {
    const input = contentRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save("modal-content.pdf");
    });
  };

  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <div ref={contentRef}>
          <Certificate />
        </div>
        <button onClick={onClose}>Close</button>
        <button onClick={downloadPDF}>Download</button>
      </div>
    </div>
  );
}

const styles = {
  backdrop: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999999999,
  },
  modal: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
  },
};
