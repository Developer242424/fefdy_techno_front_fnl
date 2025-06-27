import React, { useEffect, useRef, useState } from "react";

const LayeredSVG = ({ src }) => {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState("");

  const [activeGroup, setActiveGroup] = useState(null);
  const [activeGroupId, setActiveGroupId] = useState(null);
  const [activeElement, setActiveElement] = useState(null);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    // Fetch SVG markup from src URL
    fetch(src)
      .then((res) => res.text())
      .then((data) => setSvgContent(data))
      .catch((err) => console.error("Error loading SVG:", err));
  }, [src]);

  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    // Parse SVG string to DOM
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
    const svgElement = svgDoc.querySelector("svg");

    if (!svgElement) {
      console.warn("SVG element not found");
      return;
    }

    const svgContainer = containerRef.current;
    svgContainer.innerHTML = ""; // clear old content
    svgContainer.appendChild(svgElement);

    const paths = svgElement.querySelectorAll("path");
    const texts = svgElement.querySelectorAll("text");

    // Helper: find closest parent group (<g>) with ID
    const getGroupWithId = (element) => {
      let current = element.closest("g");
      while (current) {
        if (current.hasAttribute("id")) return current;
        current = current.parentElement?.closest("g");
      }
      return null;
    };

    // Clear previous event listeners to avoid duplicates
    // (Optional: you can add cleanup if you want)

    // Setup event listeners on paths
    paths.forEach((path) => {
      path.style.stroke = "none";
      path.style.cursor = "pointer";

      path.addEventListener("mouseenter", () => {
        // Remove previous highlights
        svgElement
          .querySelectorAll(".highlight")
          .forEach((el) => el.classList.remove("highlight"));

        const pathId = path.getAttribute("id");

        if (pathId) {
          path.classList.add("highlight");
          setActiveElement(path);
          setActiveId(pathId);

          path.style.filter = "drop-shadow(0 0 6px #689E41)";
          const line = svgElement.querySelector(`line#${CSS.escape(pathId)}`);
          if (line) {
            line.style.fill = "drop-shadow(0 0 6px #689E41)";
            line.style.stroke = "#f3ffc4";
          }
          const text = svgElement.querySelector(`text#${CSS.escape(pathId)}`);
          if (text) {
            text.style.fill = "#e80707";
          }

          const cleanPathId = pathId.replace(/[^a-zA-Z\s]/g, "").trim();
          const textToSpeak = cleanPathId || "Unnamed path";
          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);
          return;
        }

        // If path has no id, look for parent group with id
        const targetGroup = getGroupWithId(path);

        if (activeGroup && activeGroup !== targetGroup) {
          activeGroup.classList.remove("highlight");
        }

        if (targetGroup && targetGroup.id) {
          targetGroup.classList.add("highlight");
          setActiveGroup(targetGroup);
          setActiveGroupId(targetGroup.id);
          targetGroup.style.filter = "drop-shadow(0 0 6px #689E41)";

          const line = svgElement.querySelector(
            `line#${CSS.escape(targetGroup.id)}`
          );
          if (line) {
            line.style.fill = "drop-shadow(0 0 6px #689E41)";
            line.style.stroke = "#f3ffc4";
          }

          const text = svgElement.querySelector(
            `text#${CSS.escape(targetGroup.id)}`
          );
          if (text) {
            text.style.fill = "#e80707";
          }

          const cleanGroupId = targetGroup.id
            .replace(/[^a-zA-Z\s]/g, "")
            .trim();
          const textToSpeak = cleanGroupId || "Unnamed group";
          const utterance = new SpeechSynthesisUtterance(textToSpeak);
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);
        } else {
          console.log("No parent <g> with an ID found.");
        }
      });

      path.addEventListener("mouseleave", () => {
        if (path !== activeElement) {
          window.speechSynthesis.cancel();
          path.classList.remove("highlight");
          path.style.filter = "";

          const targetGroup = getGroupWithId(path);
          if (targetGroup && targetGroup !== activeGroup) {
            targetGroup.classList.remove("highlight");
            targetGroup.style.filter = "";

            const targetLine = svgElement.querySelector(
              `line#${CSS.escape(targetGroup.id)}`
            );
            if (targetLine) {
              targetLine.style.fill = "";
              targetLine.style.stroke = "";
              targetLine.style.filter = "";
            }
            const targetText = svgElement.querySelector(
              `text#${CSS.escape(targetGroup.id)}`
            );
            if (targetText) {
              targetText.style.fill = "";
              targetText.style.stroke = "";
              targetText.style.filter = "";
            }
          }

          const line = svgElement.querySelector(
            `line#${CSS.escape(path.getAttribute("id"))}`
          );
          if (line) {
            line.style.fill = "";
            line.style.stroke = "";
          }
          const text = svgElement.querySelector(
            `text#${CSS.escape(path.getAttribute("id"))}`
          );
          if (text) {
            text.style.fill = "";
            text.style.stroke = "";
          }
        }
      });
    });

    // Setup event listeners on texts
    texts.forEach((text) => {
      text.style.cursor = "pointer";

      text.addEventListener("mouseenter", () => {
        text.style.fill = "#e80707";

        svgElement.querySelectorAll(".highlight").forEach((el) => {
          el.classList.remove("highlight");
          el.style.filter = "";
        });

        svgElement.querySelectorAll("line").forEach((line) => {
          line.style.filter = "";
          line.style.stroke = "";
        });

        const target =
          svgElement.querySelector(`path#${CSS.escape(text.id)}`) ||
          svgElement.querySelector(`g#${CSS.escape(text.id)}`);

        if (target) {
          target.style.filter = "drop-shadow(0 0 6px #689E41)";
          target.classList.add("highlight");

          const line = svgElement.querySelector(`line#${CSS.escape(text.id)}`);
          if (line) {
            line.style.filter = "drop-shadow(0 0 6px #689E41)";
            line.style.stroke = "#689E41";
          }

          const cleanId =
            text.id.replace(/[^a-zA-Z\s]/g, "").trim() || "Unnamed element";
          const utterance = new SpeechSynthesisUtterance(cleanId);
          window.speechSynthesis.cancel();
          window.speechSynthesis.speak(utterance);
        }
      });

      text.addEventListener("mouseleave", () => {
        text.style.fill = "";
        const target =
          svgElement.querySelector(`path#${CSS.escape(text.id)}`) ||
          svgElement.querySelector(`g#${CSS.escape(text.id)}`);

        if (target) {
          target.style.filter = "";
          target.classList.remove("highlight");

          const line = svgElement.querySelector(
            `line#${CSS.escape(target.id)}`
          );
          if (line) {
            line.style.filter = "";
            line.style.stroke = "";
          }
        }
        window.speechSynthesis.cancel();
      });
    });
  }, [svgContent, activeGroup, activeGroupId, activeId, activeElement]);

  return (
    <div
      ref={containerRef}
      className="svg-container"
      style={{ width: "100%", height: "100vh" }}
    />
  );
};

export default LayeredSVG;
