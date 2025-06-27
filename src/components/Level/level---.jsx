import "./level.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import lico1 from "../../defaults/img/l-ico-1.gif";
import lico2 from "../../defaults/img/l-ico-2.gif";
import lico3 from "../../defaults/img/l-ico-3.png";

function Level() {
  const [levels, setLevels] = useState([]);
  const [error, setError] = useState(null);
  const publicURL = process.env.REACT_APP_PUBLIC_API_URL;
  const { auth, setCommonError } = useAuth();
  const navigate = useNavigate();
  const topic = JSON.parse(localStorage.getItem("topic"));

  useEffect(() => {
    // console.log(auth);
    if (!auth.token) navigate("/login");
    if (!topic) navigate("/topic");
    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}levels`,
          {
            token: auth.token,
            topic: topic,
          }
        );
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

    fetchData();
  }, [auth.token, navigate]);

  useEffect(() => {
    const levels_show = document.querySelectorAll(".level");
    const svg = document.querySelector("svg");
    const originalPaths = Array.from(
      document.querySelectorAll(".path-segment")
    );

    const handleLevelClick = (index) => {
      levels_show.forEach((l, i) => {
        const badge = l.querySelector(".badge");
        const strong = l.querySelector("strong");

        l.classList.remove("active", "completed", "inactive");

        if (i < index) {
          l.classList.add("completed");
          badge.innerHTML = `<img src="${lico1}" alt="Completed" />`;
          badge.style.backgroundColor = "#b2f2bb";
          strong.style.backgroundColor = "";
        } else if (i === index) {
          l.classList.add("active");
          badge.innerHTML = `<img src="${lico2}" alt="Active" />`;
          badge.style.backgroundColor = "#6a1b9a";
          strong.style.backgroundColor = "";
        } else {
          l.classList.add("inactive");
          badge.innerHTML = `<img src="${lico3}" alt="Inactive" />`;
          badge.style.backgroundColor = "#9b9b9b";
          strong.style.backgroundColor = "#9b9b9b";
        }
      });

      svg
        ?.querySelectorAll(".path-segment.duplicated")
        ?.forEach((p) => p.remove());

      for (let i = 0; i < index; i++) {
        const clone = originalPaths[i].cloneNode();
        clone.classList.remove("upcoming");
        clone.classList.add("completed", "duplicated");
        svg?.appendChild(clone);
      }
    };

    levels_show.forEach((level) => {
      const index = +level.dataset.index;
      const clickHandler = () => handleLevelClick(index);
      level.addEventListener("click", clickHandler);
      level._clickHandler = clickHandler; // store for cleanup
    });

    // Auto-trigger first level
    const defaultLevel = document.querySelector('.level[data-index="7"]');
    if (defaultLevel) defaultLevel.click();

    // Cleanup event listeners on unmount
    return () => {
      levels_show.forEach((level) => {
        level.removeEventListener("click", level._clickHandler);
        delete level._clickHandler;
      });
    };
  }, [levels]);

  const nextPage = (level) => {
    localStorage.setItem("level", JSON.stringify(level));
    navigate("/subtopic");
  };

  const paths = [
    "M50,70 C100,120 125,150 150,180",
    "M150,180 C200,110 250,70 300,80",
    "M300,80 C400,120 450,30 500,40",
    "M500,40 C550,150 580,250 600,260",
    "M600,260 C700,160 750,160 800,180",
    "M800,180 C900,60 950,60 1000,80",
    "M1000,80 C1100,160 1140,180 1180,200",
  ];

  return (
    <div className="section-content">
      <div className="section-content">
        <div className="row">
          <div className="col-md-12 col-lg-12 col-xl-12 ">
            <div className="tm-sc-nav-tabs-pricing-level nav-tab-btn-button button-rounded">
              <div className="map">
                <svg>
                  {levels.map((level, index) => {
                    if (index + 1 < levels.length) {
                      return (
                        <path
                          key={index}
                          className="path-segment upcoming"
                          d={paths[index] || ""}
                        />
                      );
                    }
                    return null;
                  })}
                  {/* <path
                    className="path-segment upcoming"
                    d="M50,70 C100,120 125,150 150,180"
                  />
                  <path
                    className="path-segment upcoming"
                    d="M150,180 C200,110 250,70 300,80"
                  />
                  <path
                    className="path-segment upcoming"
                    d="M300,80 C400,120 450,30 500,40"
                  />
                  <path
                    className="path-segment upcoming"
                    d="M500,40 C550,150 580,250 600,260"
                  />
                  <path
                    className="path-segment upcoming"
                    d="M600,260 C700,160 750,160 800,180"
                  />
                  <path
                    className="path-segment upcoming"
                    d="M800,180 C900,60 950,60 1000,80"
                  />
                  <path
                    className="path-segment upcoming"
                    d="M1000,80 C1100,160 1140,180 1180,200"
                  /> */}
                </svg>

                {levels.length > 0 ? (
                  levels.map((value, index) => (
                    <div
                      key={index}
                      className={`level l${index + 1} ${
                        index === 0 ? "active" : ""
                      }`}
                      data-index={index}
                    >
                      <div
                        className="badge"
                        onClick={() => nextPage(value.id)}
                      ></div>
                      <div
                        className={`info level-${index + 1}`}
                        onClick={() => nextPage(value.id)}
                      >
                        <div
                          className={`${
                            index === 0 ? `info-right1` : "info-right"
                          }`}
                        >
                          <h4>
                            {/* Introduction of the body */}
                            {value.title}
                          </h4>
                          {/* <span>Age: 2 to 4</span> */}
                        </div>
                        <div className="info-left">
                          <strong>L{index + 1}</strong>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div class="loader"></div>
                )}

                {/* <div className="level l1 active" data-index="0">
                  <div className="badge" onClick={nextPage}></div>
                  <div className="info level-1" onClick={nextPage}>
                    <div className="info-right1">
                      <h4>Introduction of the body</h4>
                      <span>Age: 2 to 4</span>
                    </div>
                    <div className="info-left">
                      <strong>L1</strong>
                    </div>
                  </div>
                </div>
                <div className="level l2" data-index="1">
                  <div className="badge" onClick={nextPage}></div>
                  <div className="info level-2" onClick={nextPage}>
                    <div className="info-left">
                      <strong>L2</strong>
                    </div>
                    <div className="info-right">
                      <h4>Basic body functions</h4>
                      <span>Age: 4 to 6</span>
                    </div>
                  </div>
                </div>
                <div className="level l3" data-index="2">
                  <div className="badge" onClick={nextPage}></div>
                  <div className="info level-3" onClick={nextPage}>
                    <div className="info-left">
                      <strong>L3</strong>
                    </div>
                    <div className="info-right">
                      <h4>Healthy habits</h4>
                      <span>Age: 6 to 8</span>
                    </div>
                  </div>
                </div>
                <div className="level l4" data-index="3">
                  <div className="badge" onClick={nextPage}></div>
                  <div className="info level-4" onClick={nextPage}>
                    <div className="info-left">
                      <strong>L4</strong>
                    </div>
                    <div className="info-right">
                      <h4>Senses and what they do</h4>
                      <span>Age: 8 to 10</span>
                    </div>
                  </div>
                </div>
                <div className="level l5" data-index="4">
                  <div className="badge" onClick={nextPage}></div>
                  <div className="info level-5" onClick={nextPage}>
                    <div className="info-left">
                      <strong>L5</strong>
                    </div>
                    <div className="info-right">
                      <h4>Muscles, bones and movement</h4>
                      <span>Age: 10 to 12</span>
                    </div>
                  </div>
                </div>
                <div className="level l6" data-index="5">
                  <div className="badge" onClick={nextPage}></div>
                  <div className="info level-6" onClick={nextPage}>
                    <div className="info-left">
                      <strong>L6</strong>
                    </div>
                    <div className="info-right">
                      <h4>The digestive system</h4>
                      <span>Age: 12 to 16</span>
                    </div>
                  </div>
                </div>
                <div className="level l7" data-index="6">
                  <div className="badge" onClick={nextPage}></div>
                  <div className="info level-7" onClick={nextPage}>
                    <div className="info-left">
                      <strong>L7</strong>
                    </div>
                    <div className="info-right">
                      <h4>The circulatory system</h4>
                      <span>Age: 16 to 18</span>
                    </div>
                  </div>
                </div>
                <div className="level l8" data-index="7">
                  <div className="badge" onClick={nextPage}></div>
                  <div className="info level-8" onClick={nextPage}>
                    <div className="info-left">
                      <strong>L8</strong>
                    </div>
                    <div className="info-right">
                      <h4>Introduction of the body</h4>
                      <span>Age: 18 to 20</span>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Level;
