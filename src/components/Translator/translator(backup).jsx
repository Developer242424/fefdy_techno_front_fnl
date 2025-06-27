import React, { useEffect, useRef } from "react";
import countries from "./countries";
import "./translator.css";

export default function Translator({ onClose }) {
  const fromTextRef = useRef(null);
  const toTextRef = useRef(null);
  const fromSelectRef = useRef(null);
  const toSelectRef = useRef(null);
  const exchangeRef = useRef(null);
  const translateBtnRef = useRef(null);

  useEffect(() => {
    const fromText = fromTextRef.current;
    const toText = toTextRef.current;
    const fromSelect = fromSelectRef.current;
    const toSelect = toSelectRef.current;
    const exchangeIcon = exchangeRef.current;
    const translateBtn = translateBtnRef.current;

    // Populate language dropdowns
    [fromSelect, toSelect].forEach((select, index) => {
      select.innerHTML = "";
      for (let code in countries) {
        const selected =
          (index === 0 && code === "en-GB") || (index === 1 && code === "ta-IN")
            ? "selected"
            : "";
        const option = `<option ${selected} value="${code}">${countries[code]}</option>`;
        select.insertAdjacentHTML("beforeend", option);
      }
    });

    const handleSwap = () => {
      const tempText = fromText.value;
      const tempLang = fromSelect.value;
      fromText.value = toText.value;
      toText.value = tempText;
      fromSelect.value = toSelect.value;
      toSelect.value = tempLang;
    };

    const handleKeyup = () => {
      if (!fromText.value) toText.value = "";
    };

    const handleTranslate = async () => {
      const text = fromText.value.trim();
      const translateFrom = fromSelect.value;
      const translateTo = toSelect.value;

      if (!text) return;
      toText.setAttribute("placeholder", "Translating...");

      try {
        const res = await fetch(
          `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`
        );
        const data = await res.json();
        const bestMatch =
          data.matches?.find((m) => m.id === 0)?.translation ||
          data.responseData.translatedText;
        toText.value = bestMatch;
        toText.setAttribute("placeholder", "Translation");
      } catch (err) {
        console.error(err);
        toText.value = "Translation failed.";
      }
    };

    const startSpeechRecognition = () => {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) {
        alert("Speech recognition not supported.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = fromSelect.value.split("-")[0];
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      recognition.onstart = () => {
        fromText.placeholder = "Listening...";
      };

      recognition.onresult = (event) => {
        const result = event.results[0][0].transcript;
        fromText.value = result;
        fromText.dispatchEvent(new Event("keyup"));
      };

      recognition.onerror = () => {
        fromText.placeholder = "Speech not recognized.";
      };

      recognition.onend = () => {
        fromText.placeholder =
          "Water is used for cooking, cleaning and bathing.";
      };

      recognition.start();
    };

    const speakText = (text, lang) => {
      const utterance = new SpeechSynthesisUtterance(text);
      const loadAndSpeak = () => {
        const voices = speechSynthesis.getVoices();

        let matchedVoice = voices.find((v) => v.lang === lang);
        if (!matchedVoice) {
          const baseLang = lang.split("-")[0];
          matchedVoice = voices.find((v) => v.lang.startsWith(baseLang));
        }

        if (!matchedVoice) {
          alert(
            `No voice found for language: ${lang}. Falling back to English.`
          );
          matchedVoice = voices.find((v) => v.lang.startsWith("en"));
        }
        console.log(
          speechSynthesis.getVoices().map((v) => `${v.name} - ${v.lang}`)
        );

        if (matchedVoice) {
          utterance.voice = matchedVoice;
          utterance.lang = matchedVoice.lang;
          speechSynthesis.speak(utterance);
        } else {
          alert("No suitable voice found for text-to-speech.");
        }
      };

      if (speechSynthesis.getVoices().length === 0) {
        speechSynthesis.onvoiceschanged = loadAndSpeak;
      } else {
        loadAndSpeak();
      }
    };

    const handleIconClick = (e) => {
      const target = e.target;
      const isFrom = target.id === "from";
      const text = isFrom ? fromText.value : toText.value;
      const lang = isFrom ? fromSelect.value : toSelect.value;

      if (target.classList.contains("fa-copy")) {
        navigator.clipboard.writeText(text);
      } else if (target.classList.contains("fa-microphone")) {
        startSpeechRecognition();
      } else if (target.classList.contains("fa-volume-up")) {
        if (text.trim()) {
          speakText(text, lang);
        }
      }
    };

    exchangeIcon?.addEventListener("click", handleSwap);
    fromText?.addEventListener("keyup", handleKeyup);
    translateBtn?.addEventListener("click", handleTranslate);
    document.querySelectorAll(".icons i").forEach((icon) => {
      icon.addEventListener("click", handleIconClick);
    });

    return () => {
      exchangeIcon?.removeEventListener("click", handleSwap);
      fromText?.removeEventListener("keyup", handleKeyup);
      translateBtn?.removeEventListener("click", handleTranslate);
      document.querySelectorAll(".icons i").forEach((icon) => {
        icon.removeEventListener("click", handleIconClick);
      });
    };
  }, []);

  return (
    <div className="chatContent" id="chatBoxtwo">
      <ul className="nav nav-tabs translatorDiv">
        <div className="translate">
          <div className="wrapper">
            <div className="trans-tit">
              <h1 className="t-titl">Translator</h1>
              <button className="btn closeBtn" onClick={onClose}>
                Close
              </button>
            </div>
            <div className="translate-content">
              <div className="d-flex transParent col-sm-12">
                <div className="text-input-1 transResult col-sm-6">
                  <div className="textarea-input">
                    <select
                      className="language-select"
                      ref={fromSelectRef}
                      style={{
                        color: "#33703C",
                        background: "#E3FFD7",
                        fontSize: "23px",
                        height: "37px",
                        fontFamily: "Abyssinica SIL",
                        fontWeight: 400,
                      }}
                    ></select>
                    <textarea
                      spellCheck="false"
                      className="from-text"
                      placeholder="Enter your text..."
                      ref={fromTextRef}
                    ></textarea>
                    <ul className="controls">
                      <li className="row from">
                        <div className="icons">
                          <i
                            id="from"
                            className="fa fa-microphone"
                            style={{
                              borderRadius: "50%",
                              border: "5px solid #e8fff6",
                              marginTop: "12px",
                            }}
                          ></i>
                          <i
                            id="from"
                            className="fas fa-volume-up top"
                            style={{
                              borderRadius: "50%",
                              border: "5px solid #e8fff6",
                              marginTop: "12px",
                            }}
                          ></i>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="text-input-2 transResult col-sm-6">
                  <div className="textarea-input">
                    <select
                      className="language-select"
                      ref={toSelectRef}
                      style={{
                        color: "#33703C",
                        background: "#E3FFD7",
                        fontSize: "23px",
                        height: "37px",
                        fontFamily: "Abyssinica SIL",
                        fontWeight: 400,
                      }}
                    ></select>
                    <textarea
                      spellCheck="false"
                      readOnly
                      disabled
                      className="to-text trans"
                      placeholder="..."
                      ref={toTextRef}
                    ></textarea>
                    <ul className="controls">
                      <li className="exchange" ref={exchangeRef}>
                        <i className="fas fa-exchange-alt"></i>
                      </li>
                      <li className="row to">
                        <div className="icons top tr">
                          <i
                            id="to"
                            className="fas fa-volume-up top"
                            style={{
                              width: "10px",
                              position: "absolute",
                              right: "121%",
                              bottom: "19%",
                            }}
                          ></i>
                          <i
                            id="to"
                            className="fas fa-copy top one"
                            style={{
                              width: "10px",
                              position: "absolute",
                              right: "30%",
                              bottom: "19%",
                            }}
                          ></i>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="go-button">
              <button ref={translateBtnRef}>Go</button>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
}
