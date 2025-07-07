import React from "react";
import Certificate from "./content";

export default function Modal({ onClose }) {
  return (
    <div style={styles.backdrop}>
      <div style={styles.modal}>
        <Certificate />
        <button onClick={onClose}>Close</button>
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
