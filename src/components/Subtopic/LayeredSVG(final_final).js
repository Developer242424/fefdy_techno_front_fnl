import React, { useEffect, useRef, useState } from "react";

// function extractOriginalPath(encoded) {
//   if (!encoded) return null;

//   const decoded = encoded.replace(/_x([0-9A-Fa-f]{2})_/g, (_, hex) =>
//     String.fromCharCode(parseInt(hex, 16))
//   );
//   const match = decoded.match(/\((.*?)\)/);
//   if (!match) return null;

//   let path = match[1];
//   const parts = path.split("/");
//   const fileName = parts.pop();

//   const cleanedFileName = fileName
//     .replace(/_/g, " ")
//     .replace(/\s{2,}/g, " ")
//     .trim();

//   parts.push(cleanedFileName);
//   return parts.join("/");
// }

function extractEncodedIdOnly(fullId) {
  const match = fullId.match(/(_x28_.*?_x29_)/);
  return match ? match[1] : null;
}

function extractOriginalPath(encoded) {
  if (!encoded) return null;

  const decoded = encoded.replace(/_x([0-9A-Fa-f]{2})_/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );

  const match = decoded.match(/\((.*?)\)/);
  if (!match) return null;

  let path = match[1];

  // Replace underscores with spaces in the full path
  let cleanedPath = path
    .replace(/_/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();

  return cleanedPath;
}

function decodeIdToOriginalPath(input) {
  if (!input) return ""; // 👈 prevent .replace() on null
  const decoded = input.replace(/_x([0-9A-Fa-f]{2})_/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
  const match = decoded.match(/\((.*?)\)/);
  return match ? match[1] : decoded;
}

let currentAudio;
function playAudio(path) {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  currentAudio = new Audio(path);
  currentAudio.play().catch((err) => console.error("Audio error:", err));
}

function getCurrentGoogleTranslateLanguage() {
  const select = document.querySelector(".goog-te-combo");
  return select ? select.value : null;
}

const LayeredSVG = ({ src }) => {
  const containerRef = useRef(null);
  const [svgContent, setSvgContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const adioURL = "https://fefdygames.com/erpvideos/";
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setError("");
    fetch(src)
      .then((res) => res.text())
      .then((data) => {
        setSvgContent(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading file:", err);
        setError("Sorry, the file could not be loaded.");
        setIsLoading(false);
      });
  }, [src]);

  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgContent, "image/svg+xml");
    const svgElement = svgDoc.querySelector("svg");

    if (!svgElement) {
      setError("Sorry, the file could not be loaded.");
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

        const path1 = extractEncodedIdOnly(group.id);
        const path = extractOriginalPath(group.id);
        // console.log(group.id);
        // console.log(path1);
        // console.log(path);
        if (path) {
          const cleanId = decodeIdToOriginalPath(path);
          //   const textToSpeak = cleanId || "Unnamed group";

          const lang = getCurrentGoogleTranslateLanguage();
          console.log("Current Google Translate language:", lang);

          const parts = cleanId.split("/");
          const insertIndex = parts.indexOf("techno") + 1;

          let ext_path =
            lang === "ta"
              ? "tamil"
              : lang === "ml"
              ? "malayalam"
              : lang === "hi"
              ? "hindi"
              : lang === "te"
              ? "telugu"
              : null;
          if (insertIndex > 0 && ext_path !== null) {
            parts.splice(insertIndex, 0, ext_path); // insert 'videos' after 'techno'
          }

          const modifiedPath = parts.join("/"); // rebuilt path
          const textToSpeak = modifiedPath || "Unnamed group";

          console.log(textToSpeak);
          playAudio(adioURL + textToSpeak);
        }
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
        hasSpoken = true;

        text.style.fill = "#e80707";

        svgElement.querySelectorAll(".highlight").forEach((el) => {
          el.classList.remove("highlight");
          el.style.filter = "";
        });

        svgElement.querySelectorAll("line").forEach((line) => {
          line.style.filter = "";
          line.style.stroke = "";
        });

        // const path = extractOriginalPath(text.id);
        const path1 = extractEncodedIdOnly(text.id);
        const path = extractOriginalPath(text.id);
        // console.log(text.id);
        // console.log(path1);
        // console.log(path);
        if (path) {
          const cleanId = decodeIdToOriginalPath(path);

          const target =
            svgElement.querySelector(`path#${CSS.escape(cleanId)}`) ||
            svgElement.querySelector(`g#${CSS.escape(cleanId)}`);

          if (target) {
            target.classList.add("highlight");
            target.style.filter = "drop-shadow(0 0 6px #689E41)";
          }

          //   const line = svgElement.querySelector(`line#${CSS.escape(text.id)}`);
          const line = svgElement.querySelector(
            `line[id^="${CSS.escape(path1)}"]`
          );
          //   console.log("Text id: " + text.id);
          //   console.log("Line element:", line);
          if (line) {
            line.style.filter = "drop-shadow(0 0 6px #689E41)";
            line.style.stroke = "#689E41";
          }

          playAudio(adioURL + cleanId);
        }
      };

      const handleMouseLeave = () => {
        hasSpoken = false;
        text.style.fill = "";

        const path = extractOriginalPath(text.id);
        if (path) {
          const cleanId = decodeIdToOriginalPath(path);

          const target =
            svgElement.querySelector(`path#${CSS.escape(cleanId)}`) ||
            svgElement.querySelector(`g#${CSS.escape(cleanId)}`);
          if (target) {
            target.classList.remove("highlight");
            target.style.filter = "";
          }

          const line = svgElement.querySelector(`line#${CSS.escape(cleanId)}`);
          if (line) {
            line.style.filter = "";
            line.style.stroke = "";
          }
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
      if (elem.requestFullscreen) elem.requestFullscreen();
      else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
      else if (elem.msRequestFullscreen) elem.msRequestFullscreen();
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  return (
    <div>
      {!hasUserInteracted ? (
        <div className="start-overlay" style={{ display: "none" }}>
          <button onClick={() => setHasUserInteracted(true)}>
            Click to Start
          </button>
        </div>
      ) : null}

      {isLoading ? (
        <div className="loader"></div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : (
        <>
          <button
            className="fullscreen-1"
            id="fullscreenBtn"
            onClick={handleFullscreen}
          >
            <i className="fas fa-expand"></i>
          </button>
          <div
            ref={containerRef}
            className="svg-container"
            style={{ width: "100%", height: "auto" }}
          />
        </>
      )}
    </div>
  );
};

export default LayeredSVG;
