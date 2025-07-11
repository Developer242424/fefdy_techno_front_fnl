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
                      const subClassNumber = (index % 5) + 1;
                      return (
                        // <div key={index} className="carousel-item">
                        <div className={`item basic c${subClassNumber}`}>
                          <img
                            className="item-img"
                            src={publicURL + value.thumbnail}
                            alt=""
                            width="70%"
                            height="300px"
                            style={{
                              borderRadius: "50%",
                              border: "5px solid #e8fff6",
                              marginTop: "4px",
                            }}
                          />
                          <h3>{value.subject}</h3>
                          <ul key={index} className="subject-li">
                            {value.topics.length > 0 ? (
                              value.topics.map((value1, index1) => (
                                <li key={index1}>
                                  <i className="fa fa-star"></i>
                                  {value1.title}
                                </li>
                              ))
                            ) : (
                              <p>-</p>
                            )}
                          </ul>
                          <button onClick={() => nextPage(value.id)}>
                            Let's go
                          </button>
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
