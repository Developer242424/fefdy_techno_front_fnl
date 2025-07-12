import React, { useEffect, useRef, useState, useTransition } from "react";

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
  return match[1]
    .replace(/_/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function decodeIdToOriginalPath(input) {
  if (!input) return "";
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
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const adioURL = "https://fefdygames.com/erpvideos/";

  // Preload fetch once per src
  useEffect(() => {
    let controller = new AbortController();
    setIsLoading(true);
    setError("");
    fetch(src, { signal: controller.signal })
      .then((res) => res.text())
      .then((data) => {
        startTransition(() => {
          // console.log(data);
          const cleanedXml = data.replace(/<i:[^>]+>[\s\S]*?<\/i:[^>]+>/g, "");
          setSvgContent(cleanedXml);
          setIsLoading(false);
        });
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          console.error("Error loading file:", err);
          setError("Sorry, the file could not be loaded.");
          setIsLoading(false);
        }
      });
    return () => controller.abort();
  }, [src]);

  // Parse and inject SVG, add events
  useEffect(() => {
    if (!svgContent || !containerRef.current) return;

    requestAnimationFrame(() => {
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

      const highlightColor = "#689E41";
      const textHighlight = "#e80707";

      const resetHighlights = () => {
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
      };

      const handleEnter = (id, isText) => {
        resetHighlights();

        const encodedId = extractEncodedIdOnly(id);
        const path = extractOriginalPath(id);
        if (!path) return;
        const cleanId = decodeIdToOriginalPath(path);

        if (isText) {
          const target =
            svgElement.querySelector(`path#${CSS.escape(cleanId)}`) ||
            svgElement.querySelector(`g#${CSS.escape(cleanId)}`);
          if (target) {
            target.classList.add("highlight");
            target.style.filter = `drop-shadow(0 0 6px ${highlightColor})`;
          }
          const line = svgElement.querySelector(
            `line[id^="${CSS.escape(encodedId)}"]`
          );
          if (line) {
            line.style.filter = `drop-shadow(0 0 6px ${highlightColor})`;
            line.style.stroke = highlightColor;
          }
          playAudio(adioURL + cleanId);
        } else {
          const group = svgElement.querySelector(`g#${CSS.escape(id)}`);
          if (!group) return;
          group.classList.add("highlight");
          group.style.filter = `drop-shadow(0 0 6px ${highlightColor})`;

          const line = svgElement.querySelector(`line#${CSS.escape(id)}`);
          if (line) {
            line.style.filter = `drop-shadow(0 0 6px ${highlightColor})`;
            line.style.stroke = "#f3ffc4";
          }

          const text = svgElement.querySelector(`text#${CSS.escape(id)}`);
          if (text) {
            text.style.fill = textHighlight;
          }

          const lang = getCurrentGoogleTranslateLanguage();
          const parts = cleanId.split("/");
          const insertIndex = parts.indexOf("techno") + 1;
          let ext_path = null;
          switch (lang) {
            case "ta":
              ext_path = "tamil";
              break;
            case "ml":
              ext_path = "malayalam";
              break;
            case "hi":
              ext_path = "hindi";
              break;
            case "te":
              ext_path = "telugu";
              break;
            default:
              break;
          }
          if (insertIndex > 0 && ext_path) {
            parts.splice(insertIndex, 0, ext_path);
          }
          playAudio(adioURL + parts.join("/"));
        }
      };

      const handleLeave = () => {
        resetHighlights();
        window.speechSynthesis.cancel();
      };

      // Add event listeners
      const groups = svgElement.querySelectorAll("g[id]");
      groups.forEach((group) => {
        group.style.cursor = "pointer";
        group.addEventListener("mouseenter", () =>
          handleEnter(group.id, false)
        );
        group.addEventListener("mouseleave", handleLeave);
      });

      const texts = svgElement.querySelectorAll("text[id]");
      texts.forEach((text) => {
        text.style.cursor = "pointer";
        text.addEventListener("mouseenter", () => handleEnter(text.id, true));
        text.addEventListener("mouseleave", handleLeave);
      });
    });
  }, [svgContent]);

  const handleFullscreen = () => {
    const elem = containerRef.current;
    if (!document.fullscreenElement) {
      elem.requestFullscreen?.();
      elem.webkitRequestFullscreen?.();
      elem.msRequestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
  };

  return (
    <div>
      {!hasUserInteracted && (
        <div className="start-overlay" style={{ display: "none" }}>
          <button onClick={() => setHasUserInteracted(true)}>
            Click to Start
          </button>
        </div>
      )}
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
