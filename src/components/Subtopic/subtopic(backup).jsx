import React, { useEffect, useState } from "react";
import "./subtopic.css";
import giphy from "../../defaults/img/giphy.gif";
import ico1 from "../../defaults/img/ico-1.png";
import ico2 from "../../defaults/img/ico-2.png";
import ico3 from "../../defaults/img/ico-3.png";
import ico4 from "../../defaults/img/ico-4.png";
import ico5 from "../../defaults/img/ico-5.png";
import ico6 from "../../defaults/img/ico-6.png";

import titleicon from "../../defaults/img/title-icon.png";
import axios from "axios";
import Flipbook from "./Flipbook";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";

function Subtopic() {
  const publicURL = process.env.REACT_APP_PUBLIC_API_URL;
  const videoURL = "https://fefdygames.com/erpvideos/";
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [subtopicsdata, setSubtopicData] = useState([]);
  const [activeTabItem, setActiveTabItem] = useState(null);
  const [activeLeftTab, setActiveLeftTab] = useState(null);
  const { auth, setCommonError } = useAuth();
  const navigate = useNavigate();
  const subject = JSON.parse(localStorage.getItem("subject"));
  const topic = JSON.parse(localStorage.getItem("topic"));
  const level = JSON.parse(localStorage.getItem("level"));

  useEffect(() => {
    if (!auth.token) navigate("/login");
    if (!level) navigate("/level");
    const fetchTopics = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}topics`,
          {
            token: auth.token,
            subject: subject,
          }
        );
        if (res.data.status === 200) {
          setTopics(res.data.data);
        } else if (res.data.status === 401) {
          navigate("/login");
          console.error("Error fetching data:", res.data.message);
        } else if (res.data.status === 400) {
          console.log("Error fetching data:", res.data.message);
        } else if (res.data.status === 500) {
          console.error("Error fetching data:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
      }
    };

    const fetchSubtopics = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}subtopics`,
          {
            token: auth.token,
            level: level,
          }
        );
        if (res.data.status === 200) {
          const fnl_data = res.data.data;
          setSubtopics(fnl_data);
          if (fnl_data.length > 0) {
            setActiveLeftTab(fnl_data[0]);
            subtopicsData(fnl_data[0], fnl_data[0].title);
          } else {
            // navigate("/level");
            setTimeout(() => {
              navigate("/level");
            }, 2000);
            localStorage.removeItem("level");
            setCommonError("Subtopics not found");
          }
        } else if (res.data.status === 401) {
          navigate("/login");
          console.error("Error fetching data:", res.data.message);
        } else if (res.data.status === 400) {
          console.log("Error fetching data:", res.data.message);
        } else if (res.data.status === 500) {
          console.error("Error fetching data:", res.data.message);
        }
      } catch (error) {
        console.error("Error fetching subtopics:", error);
      }
    };

    fetchTopics();
    fetchSubtopics();
  }, [auth.token, navigate]);

  const subtopicsData = async (subtopic, title) => {
    setActiveLeftTab(subtopic);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}subtopicdata`,
        {
          token: auth.token,
          subtopic: subtopic.id,
        }
      );
      if (res.data.status === 200) {
        setSubtopicData(res.data.data);
        setActiveTabItem(res.data.data.length > 0 ? res.data.data[0] : null);
        const subtopicElement =
          document.getElementsByClassName("subtopic-text")[0];
        if (subtopicElement) {
          subtopicElement.innerHTML = title;
        }
      } else if (res.data.status === 401) {
        navigate("/login");
        console.error("Error fetching data:", res.data.message);
      } else if (res.data.status === 400) {
        console.log("Error fetching data:", res.data.message);
      } else if (res.data.status === 500) {
        console.error("Error fetching data:", res.data.message);
      }
    } catch (error) {
      console.error("Error fetching subtopic data:", error);
    }
  };

  const levelPage = (topic) => {
    localStorage.setItem("topic", JSON.stringify(topic));
    navigate("/level");
  };

  return (
    <div className="section-content">
      <div className="row">
        {/* Sidebar Icons */}
        <div className="col-md-12 col-lg-1 col-xl-1 pr-0 pr-lg-20">
          <div className="scroll-wrapper">
            <div className="tm-sc-justos-funfact mb-md-50">
              {topics.length > 0 ? (
                topics.map((value) => (
                  <div
                    key={value.id}
                    className="tm-sc-funfact funfact funfact-lefticon mb-20 text-md-center text-lg-start"
                  >
                    <div
                      className={`funfact-icon float-left mr-40 bg-theme-colored1${
                        topic === value.id ? " active" : ""
                      }`}
                      style={{ cursor: "pointer" }}
                      onClick={() => levelPage(value.id)}
                    >
                      <img src={publicURL + value.thumbnail} alt="" />
                    </div>
                  </div>
                ))
              ) : (
                <p>Data not found</p>
              )}
              {/* {[ico1, ico2, ico3, ico4, ico5, ico6].map((icon, index) => (
                <div
                  key={index}
                  className="tm-sc-funfact funfact funfact-lefticon mt-20 text-md-center text-lg-start"
                >
                  <a href="#">
                    <div className="funfact-icon float-left mr-40 bg-theme-colored1">
                      <img src={icon} alt="" />
                    </div>
                  </a>
                </div>
              ))} */}
            </div>
          </div>
        </div>

        {/* Left Side Content */}
        <div className="col-md-12 col-lg-3 col-xl-3">
          <div className="tm-sc-jus-feature-box">
            <div className="tm-sc-icon-box icon-box icon-left iconbox-centered-in-responsive iconbox-theme-colored1 animate-icon-on-hover animate-icon-rotate-y pd-res-40">
              <div className="icon-box-wrapper">
                <a href="#">
                  <div className="icon-wrapper">
                    <img src={titleicon} alt="Title Icon" />
                  </div>
                </a>
                <div className="icon-text">
                  <div className="content">
                    <h4 className="text-theme-colored1 subtopic-text">-</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="tm-sc-about-area our-faq pl-20 pl-lg-20 pl-sm-0">
            <div className="entry-content">
              <div className="progress-container">
                <div className="progress" id="progress_step_path"></div>
                <ul className="step-progress">
                  {subtopics.length > 0 ? (
                    subtopics.map((value, index) => (
                      <li
                        key={value.id}
                        className={`step ${
                          activeLeftTab?.id === value.id ? "active_step" : ""
                        }`}
                      >
                        <a
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            subtopicsData(value, value.title);
                          }}
                        >
                          <span
                            className={`circle2 ${
                              activeLeftTab?.id === value.id ? "active" : ""
                            }`}
                          >
                            {index + 1}
                          </span>
                          <span className="text">{value.title}</span>
                        </a>
                        {activeLeftTab?.id === value.id && (
                          <span className="step-gif">
                            <img src={giphy} alt="progress gif" />
                          </span>
                        )}
                      </li>
                    ))
                  ) : (
                    <p>Data not found</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-md-12 col-lg-8 col-xl-8">
          <div className="tm-sc-nav-tabs-pricing nav-tab-btn-button button-rounded">
            <ul className="nav nav-tabs">
              {subtopicsdata.map((value) => {
                return (
                  <li
                    key={value.id}
                    className={`nav-item ${
                      activeTabItem?.id === value.id ? "active" : ""
                    }`}
                    onClick={() => setActiveTabItem(value)}
                  >
                    <a
                      href="#"
                      className={`nav-link ${
                        activeTabItem?.id === value.id ? "active" : ""
                      }`}
                      onClick={(e) => e.preventDefault()}
                    >
                      <span className="title">{value.title}</span>
                    </a>
                  </li>
                );
              })}
            </ul>

            <div className="tab-content mt-3">
              {/* {activeTabItem?.type?.toLowerCase() === "pdf" && (
                <div className="tab-pane fadeInLeft active show">
                  <div className="tab-pane-inner">
                    <div className="row">
                      <iframe
                        className="scroll"
                        src={
                          activeTabItem?.cat_data?.source
                            ? `${publicURL + activeTabItem.cat_data.source}`
                            : "/pdf-flip.html"
                        }
                        style={{ border: 0, width: "100%", height: "42vh" }}
                        allowFullScreen
                        frameBorder="0"
                        title="PDF View"
                      />

                      <Flipbook
                        pdfSource={publicURL + activeTabItem?.cat_data?.source}
                      />
                    </div>
                  </div>
                </div>
              )} */}

              {activeTabItem?.type?.toLowerCase() === "pdf" && (
                <div className="tab-pane fadeInLeft active show">
                  <div className="tab-pane-inner">
                    <div className="row">
                      <Flipbook src="/ByteBeatJan2024.pdf" />
                    </div>
                  </div>
                </div>
              )}

              {activeTabItem?.type?.toLowerCase() === "video" && (
                <div className="tab-pane fadeInLeft active show">
                  <div className="tab-pane-inner">
                    <div className="row">
                      {activeTabItem?.cat_data?.source?.includes(
                        "youtube.com"
                      ) ||
                      activeTabItem?.cat_data?.source?.includes("youtu.be") ? (
                        // <iframe
                        //   className="scroll"
                        //   src={activeTabItem.cat_data.source}
                        //   style={{ border: 0, width: "100%", height: "41vh" }}
                        //   allow="autoplay; encrypted-media"
                        //   allowFullScreen
                        //   frameBorder="0"
                        //   title="YouTube Video"
                        // />
                        <div
                          style={{ position: "relative", paddingTop: "42vh" }}
                        >
                          <ReactPlayer
                            url={activeTabItem.cat_data.source}
                            width="100%"
                            height="100%"
                            style={{ position: "absolute", top: 0, left: 0 }}
                            controls={true}
                          />
                        </div>
                      ) : (
                        <video
                          className="scroll"
                          style={{ border: 0, width: "100%", height: "42vh" }}
                          controls
                          preload="auto"
                          autobuffer
                          controlsList="nodownload"
                        >
                          <source
                            src={videoURL + activeTabItem?.cat_data?.source}
                            type="video/mp4"
                          />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subtopic;
