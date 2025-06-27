import "./level.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import lico1 from "../../defaults/img/l-ico-1.gif";
import lico2 from "../../defaults/img/l-ico-2.gif";
import lico3 from "../../defaults/img/l-ico-3.png";
import WaterImg from "../../defaults/img/img1.png";

const Level = () => {
  const [levels, setLevels] = useState([]);
  const [error, setError] = useState(null);
  const publicURL = process.env.REACT_APP_PUBLIC_API_URL;
  const { auth, setCommonError, setCommonWarning, setCommonSuccess } =
    useAuth();
  const navigate = useNavigate();
  const topic = JSON.parse(localStorage.getItem("topic"));
  const subject = JSON.parse(localStorage.getItem("subject"));
  const [topicData, setTopicData] = useState(null);

  useEffect(() => {
    // console.log(auth);
    if (!auth.token) navigate("/login");
    if (!topic) navigate("/topic");
    const fetchData = async () => {
      try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}levels`, {
          token: auth.token,
          topic: topic,
        });
        const resData = res.data;
        if (resData.status === 200) {
          setLevels(resData.data);
          // console.log(resData.data);
          const fnl_data = resData.data;
          if (fnl_data.length === 0) {
            // navigate("/topic");
            setTimeout(() => {
              navigate("/topic");
            }, 2000);
            localStorage.removeItem("topic");
            setCommonError("Levels not found");
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
          const topicList = resData.data;

          const matchedTopic = topicList.find(
            (item) => item.id === parseInt(topic)
          );

          if (matchedTopic) {
            setTopicData(matchedTopic);
            // console.log("Matched Subject:", matchedTopic);
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

    fetchData();
    fetchTopics();
  }, [auth.token, navigate]);

  const nextPage = (level, status, level_acc) => {
    // console.log(level_acc);
    // console.log(auth.user.level);
    if (level_acc > auth.user.level) {
      setCommonWarning("You don't have access for this level.");
      return;
    }
    localStorage.setItem("level", JSON.stringify(level));
    if (status === "active" || status === "completed") {
      navigate("/subtopic");
      // window.location.href = "/subtopic";
    }
    // else if (status === "completed") {
    //   setCommonSuccess(
    //     "You've already completed this level. Kindly try to completed the next level"
    //   );
    // }
    else {
      setCommonWarning("Kindly complete the previous level.");
    }
  };

  const pathSegments = [
    "M50,70 C100,120 125,150 150,180",
    "M150,180 C200,110 250,70 300,80",
    "M300,80 C400,120 450,30 500,40",
    "M500,40 C550,150 580,250 600,260",
    "M600,260 C700,160 750,160 800,180",
    "M800,180 C900,60 950,60 1000,80",
    "M1000,80 C1100,160 1140,180 1180,200",
  ];

  let lvl_pre_index = -1;

  return (
    <div class="section-content">
      <div class="section-content mt-020">
        <div class="row">
          <div class="tm-sc-icon-box icon-box icon-left iconbox-centered-in-responsive iconbox-theme-colored1 animate-icon-on-hover animate-icon-rotate-y pd-res-40">
            <div class="icon-box-wrapper-1">
              <a href="#">
                <div class="icon-wrapper-1">
                  <a class="icon-type-font-icon">
                    {" "}
                    <img
                      src={publicURL + topicData?.thumbnail}
                      alt="Dictionary"
                      className="w-20 h-20 rounded-full object-cover img"
                    />
                  </a>
                </div>
              </a>
              <div class="icon-text">
                <div class="content">
                  <h2 class="text-theme-colore-1">{topicData?.title}</h2>
                </div>
              </div>
              <div class="clearfix"></div>
            </div>
          </div>
          <div class="col-md-12 col-lg-12 col-xl-12 leve">
            <div class="tm-sc-nav-tabs-levels pricin nav-tab-btn-button button-rounded">
              <div class="map-wrapper">
                <div class="map map-scaled">
                  <svg>
                    {pathSegments.map((d, index) => (
                      <path
                        key={index}
                        className="path-segment upcoming"
                        d={d}
                      />
                    ))}
                    {levels.length > 0 ? (
                      levels.map((value1, idx) => {
                        if (value1.is_completed === 1) {
                          return (
                            <path
                              class="path-segment completed"
                              d={pathSegments[idx]}
                            />
                          );
                        }
                      })
                    ) : (
                      <p>-</p>
                    )}
                  </svg>
                  {levels.length > 0 ? (
                    levels.map((value, index) => {
                      let comp_status = null;
                      if (value.is_completed === 1) {
                        comp_status = "completed";
                        lvl_pre_index = index;
                      } else if (lvl_pre_index + 1 === index) {
                        comp_status = "active";
                      } else {
                        comp_status = "inactive";
                      }
                      return (
                        <div
                          key={value.id}
                          class={`level l${index + 1} ${comp_status}`}
                        >
                          <div class="level-content">
                            <div
                              class={`badge L${index + 1}`}
                              onClick={() =>
                                nextPage(value.id, comp_status, value.level)
                              }
                            >
                              {comp_status === "completed" ? (
                                <img src={lico1} />
                              ) : comp_status === "active" ? (
                                <img src={lico2} />
                              ) : (
                                <img src={lico3} />
                              )}
                            </div>
                            <div
                              class={`info levels${index + 1}`}
                              onClick={() =>
                                nextPage(value.id, comp_status, value.level)
                              }
                            >
                              <div class="info-right">
                                <h4>{value.title}</h4>
                                {/* <span>Age: 2 to 4</span> */}
                              </div>
                              <div class="info-left">
                                <strong>L{index + 1}</strong>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div class="loader"></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Level;
