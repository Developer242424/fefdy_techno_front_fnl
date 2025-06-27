// App.js
import "./defaults/css/bootstrap.min.css";
import "./defaults/css/style-main.css";
import "./defaults/css/responsive.css";
import "./defaults/css/font-awesome5.css";
import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Subject from "./components/Subject/subject";
import Level from "./components/Level/level";
import Subtopic from "./components/Subtopic/subtopic";
import FlipBook from "./components/Subtopic/Flipbook";
import FlipBook1 from "./components/Subtopic/pageflip";
import Topic from "./components/Topic/topic";
import Login from "./components/Login/login";
import Profile from "./components/Profile/profile";
import logo from "./defaults/img/logo.png";
import icon011 from "./defaults/img/icon-01 1.png";
import { useAuth } from "./context/AuthContext";

function LayoutWrapper({ children }) {
  const location = useLocation();
  const { logout } = useAuth();

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
                  { pageLanguage: "en" },
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
  }, [location.pathname]);

  // Show layout only if not login page
  const isLogin = location.pathname === "/login";

  const { auth } = useAuth();
  const navigate = useNavigate();
  const publicURL = process.env.REACT_APP_PUBLIC_API_URL;

  const profilePage = () => {
    navigate("/myprofile");
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
                <div className=" col-lg-2 col-sm-auto align-self-center">
                  <button
                    className="btn btn-primary"
                    onClick={(e) => {
                      navigate(-1);
                    }}
                  >
                    Back
                  </button>
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
            </div>
            {children}
          </div>
        </section>
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
        <Route path="/flip" element={<FlipBook />} />
        <Route path="/flip1" element={<FlipBook1 />} />
      </Routes>
    </LayoutWrapper>
  );
}

export default App;
