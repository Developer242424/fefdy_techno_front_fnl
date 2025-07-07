// App.js
import "./defaults/css/bootstrap.min.css";
import "./defaults/css/style-main.css";
import "./defaults/css/responsive.css";
import "./defaults/css/font-awesome5.css";
import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Subject from "./components/Subject/subject";
import Level from "./components/Level/level";
import Subtopic from "./components/Subtopic/subtopic";
import Topic from "./components/Topic/topic";
import Login from "./components/Login/login";
import Profile from "./components/Profile/profile";
import logo from "./defaults/img/logo.png";
import icon011 from "./defaults/img/icon-01 1.png";
import { useAuth } from "./context/AuthContext";
import Translator from "./components/Translator/translator";
import Dictionary from "./components/Dictionary/dictionary";
import TransImg from "./defaults/img/trans.png";
import DicImg from "./defaults/img/dis.png";
import CompImg from "./defaults/img/l-ico-1.gif";
import ProcImg from "./defaults/img/l-ico-2.gif";
import axios from "axios";
import CertificateModal from "./certificatemodal"

function LayoutWrapper({ children }) {
  const location = useLocation();
  const { logout, auth, isLoading, setCommonError } = useAuth();
  const [error, setError] = useState(null);
  const subject = JSON.parse(localStorage.getItem("subject"));
  const topic_id = JSON.parse(localStorage.getItem("topic"));
  const level_id = JSON.parse(localStorage.getItem("level"));
  const [subjectData, setsubjectData] = useState(null);
  const [topics, setTopics] = useState([]);
  const [topicData, setTopicData] = useState([]);
  const [levelData, setLevelData] = useState([]);

  useEffect(() => {
    if (location.pathname !== "/login") {
      // Check if script is already added
      const existingScript = document.querySelector(
        'script[src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"]'
      );

      // Check if Google Translate element is already initialized
      const existingElement = document.getElementById(
        "google_translate_element"
      );

      // Prevent duplicate script + translator UI
      if (
        !existingScript &&
        existingElement &&
        existingElement.innerHTML === ""
      ) {
        const script = document.createElement("script");
        script.src =
          "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        script.async = true;

        script.onload = () => {
          // Ensure the translation element is initialized only once
          window.googleTranslateElementInit = () => {
            if (window.google && window.google.translate) {
              try {
                new window.google.translate.TranslateElement(
                  { pageLanguage: "en", includedLanguages: "en,ta,te,ml,hi" },
                  "google_translate_element"
                );
              } catch (error) {
                console.error("Error initializing Google Translate:", error);
              }
            } else {
              console.warn("Google Translate API is not available.");
            }
          };

          // If the script loaded but init is not available yet, call the init function
          if (window.google && window.google.translate) {
            window.googleTranslateElementInit();
          } else {
            console.warn("Google Translate failed to load properly.");
          }
        };

        script.onerror = () => {
          console.warn("Failed to load Google Translate script.");
        };

        document.body.appendChild(script);
      }
    }

    const fetchSubjects = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}subjects`,
          {
            token: auth.token,
          }
        );
        // console.log(res);
        const resData = res.data;
        if (resData.status === 200) {
          const subjectsList = resData.data;

          const matchedSubject = subjectsList.find(
            (item) => item.id === parseInt(subject)
          );

          if (matchedSubject) {
            setsubjectData(matchedSubject);
            // console.log("Matched Subject:", matchedSubject);
          } else {
            console.warn("No matching subject found for ID:", subject);
          }
        } else if (resData.status === 401) {
          navigate("/login");
          console.error("Error fetching data:", resData.message);
        } else if (resData.status === 400) {
          console.log("Error fetching data:", resData.message);
        } else if (resData.status === 500) {
          console.error("Error fetching data:", resData.message);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
      }
    };

    const fetchTopics = async () => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}topics`, {
          token: auth.token,
          subject: subject,
        });
        // console.log(res);
        const resData = res.data;
        if (resData.status === 200) {
          setTopics(resData.data);
          const fnl_data = resData.data;
          // console.log(resData.data);
          if (fnl_data.length === 0) {
            setTimeout(() => {
              navigate("/");
            }, 2000);
            localStorage.removeItem("subject");
            setCommonError("Topics not found");
          }
          const topicsList = resData.data;

          const matchedTopic = topicsList.find(
            (item) => item.id === parseInt(topic_id)
          );

          if (matchedTopic) {
            setTopicData(matchedTopic);
            // console.log("Matched Subject:", matchedTopic);
          } else {
            console.warn("No matching subject found for ID:", topic_id);
          }
        } else if (resData.status === 401) {
          navigate("/login");
          console.error("Error fetching data:", resData.message);
        } else if (resData.status === 400) {
          console.log("Error fetching data:", resData.message);
        } else if (resData.status === 500) {
          console.error("Error fetching data:", resData.message);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
      }
    };

    const fetchLevels = async () => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}levels`, {
          token: auth.token,
          topic: topic_id,
        });
        // console.log(res);
        const resData = res.data;
        if (resData.status === 200) {
          const levelsList = resData.data;

          const matchedLevel = levelsList.find(
            (item) => item.id === parseInt(level_id)
          );

          if (matchedLevel) {
            setLevelData(matchedLevel);
            // console.log("Matched Subject:", matchedLevel);
          } else {
            console.warn("No matching subject found for ID:", level_id);
          }
        } else if (resData.status === 401) {
          navigate("/login");
          console.error("Error fetching data:", resData.message);
        } else if (resData.status === 400) {
          console.log("Error fetching data:", resData.message);
        } else if (resData.status === 500) {
          console.error("Error fetching data:", resData.message);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
      }
    };

    fetchSubjects();
    fetchTopics();
    fetchLevels();
  }, [location.pathname, auth.token]);

  // Show layout only if not login page
  const isLogin = location.pathname === "/login";

  const navigate = useNavigate();
  const publicURL = process.env.REACT_APP_PUBLIC_API_URL;

  const profilePage = () => {
    navigate("/myprofile");
  };

  const [trasnDicActiveTab, setTrasnDicActiveTab] = useState(null);

  const closeTransDic = async () => {
    setTrasnDicActiveTab(null);
  };

  return isLogin ? (
    children
  ) : (
    <div id="wrapper" className="clearfix">
      <div className="main-content-area">
        <section>
          <div className="container-fluid pt-0">
            <div className="row">
              <div className="col-lg-9">
                <div className="col-sm-auto align-self-center">
                  <a className="menuzord-brand site-brand" href="/">
                    <img
                      className="logo-default logo-2x retina"
                      src={logo}
                      alt="Logo"
                    />
                  </a>
                </div>
                <div className="home-btn">
                  {" "}
                  <a
                    href="#"
                    onClick={(e) => {
                      navigate("/");
                    }}
                  >
                    <i class="fa fa-home" aria-hidden="true"></i>
                  </a>{" "}
                </div>
              </div>

              <div className="col-lg-2 mt-20">
                <div className="language">
                  <div id="google_translate_element"></div>
                </div>
              </div>
              <div className="col-lg-1">
                <ul className="list-inline nav-side-icon-list">
                  <li className="hidden-mobile-mode">
                    <div className="top-nav-mini-cart-icon-container">
                      <div className="top-nav-mini-cart-icon-contents">
                        <a
                          className="mini-cart-icon"
                          href="#"
                          onClick={(e) => profilePage()}
                        >
                          <span className="items-count">
                            <img
                              src={publicURL + auth?.user?.profile_image}
                              alt="Icon"
                            />
                          </span>
                        </a>
                        <div className="dropdown-content">
                          <ul className="cart_list product_list_widget">
                            <li className="mini_cart_item">
                              <a href="#" onClick={(e) => profilePage()}>
                                {auth?.user?.name}
                              </a>
                              <p className="total">
                                <strong>{auth?.user?.email}</strong>
                              </p>
                            </li>
                          </ul>
                          <div className="buttons cart-action-buttons">
                            <div className="row">
                              <div className="col-6 pe-0">
                                {/* <a
                                  href="#"
                                  className="btn btn-theme-colored2 btn-block btn-sm wc-forward"
                                  onclick={(e) => {
                                    e.preventDefault();
                                    logout();
                                  }}
                                >
                                  Logout
                                </a> */}
                                <button
                                  className="btn btn-theme-colored2 btn-block btn-sm wc-forward"
                                  onClick={() => logout()}
                                >
                                  Logout
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>

              {location.pathname !== "/" ? (
                <div className="row align-middle justify-content-center mt-0 mb-0">
                  <div
                    className={`${
                      location.pathname === "/subtopic" ||
                      location.pathname === "/topic"
                        ? "col-lg-6"
                        : "col-lg-4"
                    } col-sm-auto align-self-start`}
                  >
                    <i
                      className="btn btn-primary back_btn fa fa-arrow-left"
                      onClick={(e) => {
                        location.pathname === "/subtopic"
                          ? navigate("/level")
                          : location.pathname === "/level"
                          ? navigate("/topic")
                          : location.pathname === "/topic"
                          ? navigate("/")
                          : navigate(-1);
                      }}
                      aria-hidden="true"
                    ></i>
                    <h3 className="font-1">
                      {subjectData?.subject}
                      {(location.pathname === "/level" ||
                        location.pathname === "/subtopic") &&
                        ` - ${topicData?.title}`}
                      {location.pathname === "/subtopic" &&
                        ` - ${levelData?.title}`}
                      {/* - Level 1 to {topics[0]?.levels || 0}{" "} */}
                    </h3>
                  </div>

                  {location.pathname === "/level" ? (
                    <div className="col-lg-4 col-sm-auto align-self-center text-center">
                      <div className="levels-comp">
                        <span className="comp-1">
                          <img src={CompImg} alt="Dictionary" />
                        </span>
                        <p className="mb-0">Completed</p>
                      </div>
                      <div className="levels-comp">
                        <span className="comp-1">
                          <img src={ProcImg} alt="Dictionary" />
                        </span>
                        <p className="mb-0">Under Process</p>
                      </div>
                    </div>
                  ) : null}

                  <div
                    className={`${
                      location.pathname === "/subtopic" ||
                      location.pathname === "/topic"
                        ? "col-lg-6"
                        : "col-lg-4"
                    } col-sm-auto align-self-end text-right`}
                  >
                    <h3 className="font-2">
                      Total - {subjectData?.topics?.length || 0} Topics
                    </h3>
                  </div>
                </div>
              ) : null}
            </div>

            {trasnDicActiveTab === "dictionary" && (
              <Dictionary onClose={closeTransDic} />
            )}
            {trasnDicActiveTab === "translator" && (
              <Translator onClose={closeTransDic} />
            )}
            {children}
          </div>
        </section>
        <div class="navButt">
          <div
            class={
              trasnDicActiveTab === "dictionary"
                ? "buttonOne active"
                : "buttonOne"
            }
            id="dictionaryBtn"
            onClick={(e) => setTrasnDicActiveTab("dictionary")}
          >
            <img width="45px" src={DicImg} alt="Dictionary" />
          </div>
          <div
            className={
              trasnDicActiveTab === "translator" ? "buttonT active" : "buttonT"
            }
            id="translatorBtn"
            onClick={(e) => setTrasnDicActiveTab("translator")}
          >
            <img width="45px" src={TransImg} alt="Translator" />
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <LayoutWrapper>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Subject />} />
        <Route path="/level" element={<Level />} />
        <Route path="/subtopic" element={<Subtopic />} />
        <Route path="/topic" element={<Topic />} />
        <Route path="/myprofile" element={<Profile />} />
      </Routes>
    </LayoutWrapper>
  );
}

export default App;
