import React, { useEffect, useRef, useState } from "react";

const LayeredSVG = ({ src }) => {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(src)
      .then((res) => res.text())
      .then((data) => {
        setSvgContent(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading SVG:", err);
        setIsLoading(false);
      });
  }, [src]);

  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
    const svgElement = svgDoc.querySelector("svg");

    if (!svgElement) {
      console.warn("SVG element not found");
      return;
    }

    const svgContainer = containerRef.current;
    svgContainer.innerHTML = "";
    svgContainer.appendChild(svgElement);

    const groups = svgElement.querySelectorAll("g[id]");
    const texts = svgElement.querySelectorAll("text");

    groups.forEach((group) => {
      group.style.cursor = "pointer";
      let hasSpoken = false;

      const handleMouseEnter = () => {
        if (hasSpoken) return;
        hasSpoken = true;

        svgElement.querySelectorAll(".highlight").forEach((el) => {
          el.classList.remove("highlight");
          el.style.filter = "";
        });

        svgElement.querySelectorAll("line").forEach((line) => {
          line.style.filter = "";
          line.style.stroke = "";
        });

        svgElement.querySelectorAll("text").forEach((text) => {
          text.style.fill = "";
        });

        group.classList.add("highlight");
        group.style.filter = "drop-shadow(0 0 6px #689E41)";

        const line = svgElement.querySelector(`line#${CSS.escape(group.id)}`);
        if (line) {
          line.style.filter = "drop-shadow(0 0 6px #689E41)";
          line.style.stroke = "#f3ffc4";
        }

        const text = svgElement.querySelector(`text#${CSS.escape(group.id)}`);
        if (text) {
          text.style.fill = "#e80707";
        }

        const cleanId = group.id.replace(/[^a-zA-Z\s]/g, "").trim();
        const textToSpeak = cleanId || "Unnamed group";
        const utterance = new SpeechSynthesisUtterance(textToSpeak);
        utterance.rate = 0.8;
        utterance.pitch = 1;

        const voices = window.speechSynthesis.getVoices();
        utterance.voice =
          voices.find((v) => v.name.includes("Google US English")) ||
          voices.find((v) => v.lang.startsWith("en")) ||
          null;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      };

      const handleMouseLeave = () => {
        hasSpoken = false;

        group.classList.remove("highlight");
        group.style.filter = "";

        const line = svgElement.querySelector(`line#${CSS.escape(group.id)}`);
        if (line) {
          line.style.filter = "";
          line.style.stroke = "";
        }

        const text = svgElement.querySelector(`text#${CSS.escape(group.id)}`);
        if (text) {
          text.style.fill = "";
        }

        window.speechSynthesis.cancel();
      };

      group.addEventListener("mouseenter", handleMouseEnter);
      group.addEventListener("mouseleave", handleMouseLeave);
    });

    texts.forEach((text) => {
      if (!text.id) return;

      text.style.cursor = "pointer";
      let hasSpoken = false;

      const handleMouseEnter = () => {
        if (hasSpoken) return;
        // console.log(text.id);
        hasSpoken = true;
        const cleanId =
          text.id.replace(/[^a-zA-Z\s]/g, "").trim() || "Unnamed element";

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
          svgElement.querySelector(`path#${CSS.escape(cleanId)}`) ||
          svgElement.querySelector(`g#${CSS.escape(cleanId)}`);

        if (target) {
          target.classList.add("highlight");
          target.style.filter = "drop-shadow(0 0 6px #689E41)";
        }

        const line = svgElement.querySelector(`line#${CSS.escape(cleanId)}`);
        // console.log(line);
        if (line) {
          line.style.filter = "drop-shadow(0 0 6px #689E41)";
          line.style.stroke = "#689E41";
        }
        const utterance = new SpeechSynthesisUtterance(cleanId);
        utterance.rate = 0.8;
        utterance.pitch = 1;

        const voices = window.speechSynthesis.getVoices();
        utterance.voice =
          voices.find((v) => v.name.includes("Google US English")) ||
          voices.find((v) => v.lang.startsWith("en")) ||
          null;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utterance);
      };

      const handleMouseLeave = () => {
        hasSpoken = false;
        text.style.fill = "";

        const target =
          svgElement.querySelector(`path#${CSS.escape(text.id)}`) ||
          svgElement.querySelector(`g#${CSS.escape(text.id)}`);

        if (target) {
          target.classList.remove("highlight");
          target.style.filter = "";
        }

        const line = svgElement.querySelector(`line#${CSS.escape(text.id)}`);
        if (line) {
          line.style.filter = "";
          line.style.stroke = "";
        }

        window.speechSynthesis.cancel();
      };

      text.addEventListener("mouseenter", handleMouseEnter);
      text.addEventListener("mouseleave", handleMouseLeave);
    });
  }, [svgContent]);

  const handleFullscreen = () => {
    const elem = containerRef.current;

    if (!document.fullscreenElement) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <div>
      {isLoading ? (
        // <p>Loading file...</p>
        <div class="loader"></div>
      ) : (
        <>
          <button className="fullscreen-1" id="fullscreenBtn" onClick={handleFullscreen}>
            <i className="fas fa-expand"></i>
          </button>
          <div ref={containerRef} className="svg-container" style={{ width: "100%", height: "auto" }} />
        </>
      )}
    </div>
  );
};

export default LayeredSVG;
