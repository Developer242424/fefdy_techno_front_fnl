import "./subject.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import img5 from "../../defaults/img/img5.png";
import english from "../../defaults/img/english.png";
import maths from "../../defaults/img/maths.png";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";

import top_bg from "../../defaults/img/top_bg.png";
import science from "../../defaults/img/science.png";
import subject_img from "../../defaults/img/subject_img.jpg";

function Subject() {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const publicURL = process.env.REACT_APP_PUBLIC_API_URL;

  useEffect(() => {
    if (!auth.token) navigate("/login");

    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}subjects`,
          {
            token: auth.token,
          }
        );

        const resData = res.data;
        if (resData.status === 200) {
          setSubjects(resData.data);
        } else if (resData.status === 401) {
          navigate("/login");
        } else {
          console.error("Error fetching data:", resData.message);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const nextPage = (subject) => {
    localStorage.setItem("subject", JSON.stringify(subject));
    navigate("/topic");
  };

  const nextPage1 = (subject, topic) => {
    localStorage.setItem("subject", JSON.stringify(subject));
    localStorage.setItem("topic", JSON.stringify(topic));
    navigate("/level");
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    // prevArrow: (
    //   <button type="button" className="carousel-control-prev" id="prevBtn">
    //     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    //     <span className="visually-hidden">Previous</span>
    //   </button>
    // ),
    // nextArrow: (
    //   <button type="button" className="carousel-control-next" id="nextBtn">
    //     <span className="carousel-control-next-icon" aria-hidden="true"></span>
    //     <span className="visually-hidden">Next</span>
    //   </button>
    // ),
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="section-content">
      <div className="row">
        <div className="col-lg-12">
          <div className="tm-sc-nav-tabs-pricing-subject sub nav-tab-btn-button button-rounded">
            <div className="container">
              <div className="carousel">
                <Slider {...settings} className="carousel-items">
                  {subjects.length > 0 ? (
                    subjects.map((value, index) => {
                      const subClassNumber = (index % 4) + 1;
                      return (
                        // <div key={index} className="carousel-item">
                        <div>
                          <div
                            class="card subject_card"
                            style={{
                              background: value.background
                                ? `#e4fff6 url(${publicURL + value.background
                                }) no-repeat bottom center`
                                : "#e4fff6",
                              backgroundSize: "cover",
                              width: "100%",
                              display: "inline-block",
                            }}
                          >
                            {/* <div className="card-body"> */}
                            <div class={`header-img${subClassNumber}`}>
                              <h2>{value.subject}</h2>
                            </div>

                            <div class="avatar-container">
                              <img
                                src={publicURL + value.thumbnail}
                                alt="avatar"
                              />
                            </div>
                            <div class="social-links">
                              {value.topics.length > 0 ? (
                                value.topics.map((value1, index1) => {
                                  return value.is_purchased === 1 ? (
                                    <a
                                      href="#"
                                      className="social-card purchased"
                                      onClick={() => nextPage1(value.id, value1.id)}
                                      key={index1}
                                    >
                                      <span>
                                        <i className="fa fa-star"></i> {value1.title}
                                      </span>
                                    </a>
                                  ) : (
                                    <a
                                      href="#"
                                      className="social-card locked"
                                      key={index1}
                                    >
                                      <span>
                                        <i className="fa fa-lock"></i> {value1.title}
                                      </span>
                                    </a>
                                  );
                                })
                              ) : (
                                <p>-</p>
                              )}
                            </div>
                            {/* </div> */}
                            {/* <div className="card-footer"> */}
                            <div class="text-center go_button_div">
                              {value.is_purchased === 1 ? (
                                <button
                                  type="button"
                                  class="btn btn-primary go_button"
                                  onClick={() => nextPage(value.id)}
                                >
                                  Let's Go
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  class="btn btn-primary go_button"
                                >
                                  Purchase Now
                                </button>
                              )}
                            </div>
                            {/* </div> */}
                          </div>
                        </div>
                        // </div>
                      );
                    })
                  ) : (
                    <div className="loader"></div>
                  )}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Subject;
