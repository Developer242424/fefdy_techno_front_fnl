import "./topic.css";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import StarGIF from "../../defaults/img/star.gif";
import TrophyGIF from "../../defaults/img/Trophy.gif";

function Topic() {
  const [topics, setTopics] = useState([]);
  const [error, setError] = useState(null);
  const publicURL = process.env.REACT_APP_PUBLIC_API_URL;
  const { auth, isLoading, setCommonError } = useAuth();
  const navigate = useNavigate();
  const subject = JSON.parse(localStorage.getItem("subject"));
  const [subjectData, setsubjectData] = useState(null);

  useEffect(() => {
    // console.log(auth);
    if (!auth.token) navigate("/login");
    if (!subject) navigate("/");
    const fetchData = async () => {
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

    fetchData();
    fetchSubjects();
  }, [auth.token]);

  const nextPage = (topic) => {
    localStorage.setItem("topic", JSON.stringify(topic));
    navigate("/level");
  };
  let topicClass = null;

  return (
    <div>
      <div className="section-content">
        <div className="row">
          <div className="col-lg-12">
            <div className="tm-sc-nav-tabs-pricing-topic sub nav-tab-btn-button button-rounded">
              <div className="gallery col-lg-12">
                <div className="row gal">
                  {topics.length > 0 ? (
                    topics.map((value, index) => {
                      const subClassNumber = (index % 6) + 1;
                      // console.log(subClassNumber);
                      return (
                        <div
                          onClick={() => nextPage(value.id)}
                          className={`topic-content sub-${subClassNumber}`}
                          key={index}
                        >
                          <div
                            className={`progress-badge sub-${subClassNumber}`}
                          >
                            {value.comp_levels}/{value.levels}
                            {value.comp_levels === value.levels && (
                              <img src={TrophyGIF} className="trophy" />
                            )}
                          </div>
                          <div>
                            <img
                              className="sub-img"
                              src={publicURL + value.thumbnail}
                              alt={value.title}
                            />
                          </div>
                          <div></div>
                          <h3 className="sub-sub">{value.title}</h3>
                          <div style={{ minHeight: "32px" }}>
                            {value.comp_levels > 0 &&
                              value.comp_levels < value.levels &&
                              Array.from({ length: value.comp_levels }).map(
                                (_, idx) => (
                                  <img
                                    src={StarGIF}
                                    style={{ width: "12%", marginTop: "-15px" }}
                                  />
                                )
                              )}
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
}

export default Topic;
