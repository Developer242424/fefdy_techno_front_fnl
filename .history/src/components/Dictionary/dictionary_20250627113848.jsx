import React, { useState } from "react";
import "./dictionary.css";
import { useAuth } from "../../context/AuthContext";

export default function Dictionary({ onClose }) {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [title, setTitle] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const searchWord = async () => {
    if (!word.trim()) return;

    try {
      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await res.json();

      if (data.title === "No Definitions Found") {
        setTitle(word);
        setDefinition("No definition found. Try another word.");
      } else {
        const meaning = data[0].meanings[0].definitions[0].definition;
        setTitle(data[0].word);
        setDefinition(meaning);
      }

      setShowResult(true);
      if (word.trim()) setShowIcon(true);
    } catch (error) {
      setTitle(word);
      setDefinition("An error occurred. Try again.");
      setShowResult(true);
      setShowIcon(true);
    }

    setWord("");
  };

  const speakDefinition = () => {
    if (!definition) return;
    const utterance = new SpeechSynthesisUtterance(definition);
    speechSynthesis.speak(utterance);
  };

  const { auth } = useAuth();
  const publicURL = process.env.REACT_APP_PUBLIC_API_URL;

  return (
    <div className="chatContent" id="chatBox">
      <ul className="nav nav-tabs translatorDiv">
        <div className="translate">
          <div className="wrapper">
            <div className="trans-tit">
              <h1 className="t-title">
                Dictionary:{" "}
                <span className="di-title">
                  What word do you want to look up 123?
                </span>
              </h1>
              <button className="btn closeBtn" onClick={onClose}>
                Close
              </button>
            </div>

            <div className="translate-content">
              <div className="d-flex transParent col-sm-12">
                <div className="text-input-5 transResult col-sm-12">
                  <div className="dictionary-box">
                    <div className="w-title">
                      {showIcon && (
                        <div id="iconWrapper">
                          <a className="mini-cart-icon" href="#">
                            <span className="items-count-user">
                              <img
                                src={publicURL + auth?.user?.profile_image}
                                alt="Logo"
                              />
                            </span>
                          </a>
                        </div>
                      )}
                      <div className="fw-bold fs-5 title-new">{title}</div>
                    </div>

                    {showResult && (
                      <div id="result" className="definition-box">
                        <div className="w-explain">
                          <div className="explanation-label">Explanation</div>
                        </div>
                        <div className="text-start">
                          <div className="row">
                            <div className="definitionTextn">
                              <div className="definition-text">
                                {definition}
                              </div>
                              <button
                                className="btn btn-danger"
                                onClick={speakDefinition}
                              >
                                <i
                                  className="fa fa-volume-up"
                                  aria-hidden="true"
                                ></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="input-group mt-3 search">
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                className="form-control search"
                placeholder="Type your queries......................."
              />
              <button className="btn btn-success" onClick={searchWord}>
                <i className="fa fa-search" aria-hidden="true"></i>
              </button>
            </div>
          </div>
        </div>
      </ul>
    </div>
  );
}
