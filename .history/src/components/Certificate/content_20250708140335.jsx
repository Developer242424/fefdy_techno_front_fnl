import React, { useEffect, useState } from "react";
import "./content.css";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import Corner from "../../defaults/img/corner.png";
import FefdyLogo from "../../defaults/img/fefdy-logo.png";
import Ciaa from "../../defaults/img/ciaa.png";
import Iao from "../../defaults/img/iao.png";
import Signature from "../../defaults/img/signature.png";

const Certificate = () => {
  const [error, setError] = useState(null);
  const [subjects, setSubjects] = useState(null);
  const [topics, setTopics] = useState([]);
  const { logout, auth, isLoading, setCommonError } = useAuth();
  const subject = JSON.parse(localStorage.getItem("subject"));
  useEffect(() => {
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
          const filteredSubjects = subjectsList.filter(
            (item) => item.is_purchased === 1
          );
          const sub_ids = filteredSubjects.map((item) => item.id);
          setSubjects(filteredSubjects);
          fetchTopics(sub_ids);
        } else if (resData.status === 401) {
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

    const fetchTopics = async (ids) => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}certificate`,
          {
            token: auth.token,
            subjects: ids,
          }
        );
        // console.log(res);
        const resData = res.data;
        if (resData.status === 200) {
          const topicsList = resData.data;
          setTopics(topicsList);
        } else if (resData.status === 401) {
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
  }, []);

  return (
    <div class="certificate">
      <div class="inner-border">
        <img src={Corner} class="corner tl" />
        <img src={Corner} class="corner tr" />
        <img src={Corner} class="corner bl" />
        <img src={Corner} class="corner br" />

        <div class="logo">
          <img src={FefdyLogo} class="logo-main" alt="FEFDY Logo" />
        </div>
        <div class="certificate-header">
          <img src={Ciaa} class="logo_1" alt="Left Logo" />
          <div class="title-text">
            <h1 class="certificate-title">CERTIFICATE</h1>
            <h2 class="certificate-subtitle">OF EXCELLENCE</h2>
          </div>
          <img src={Iao} class="logo_1" alt="Right Logo" />
        </div>
        <p class="presented">THIS CERTIFICATE IS PROUDLY PRESENTED TO</p>
        <p class="description">
          <span class="recipient-inline">Thanikachalam Venkataramanan</span>,
          Age:
          <span class="recipient-inline">24</span>, for completing the following
          Subject in the <strong>FEFDY Brain Gym</strong> with dedication:{" "}
          {subjects &&
            subjects.length > 0 &&
            subjects.map((value, index) => {
              const filteredTopics = topics.filter(
                (item) => item.subject === value.id
              );
              const completedTopics = filteredTopics.filter(
                (item) => item.comp_levels === item.levels
              );
              const allCompleted =
                filteredTopics.length > 0 &&
                completedTopics.length === filteredTopics.length;
              return (
                <React.Fragment key={index}>
                  <span className="subject_c">{value.subject}</span>
                  {!allCompleted ? <span className="chapter_c"> - C1</span> : ""}
                </React.Fragment>
              );
            })}
          <span className="subject_c"> Science -</span>{" "}
          <span className="chapter_c">C1</span>{" "}
          <span className="levels_c">(L1 - L3), </span>{" "}
          <span className="chapter_c">C2</span>{" "}
          <span className="levels_c">(L1, L2), </span>
          <span className="subject_c">Math -</span>{" "}
          <span className="chapter_c">C1</span>{" "}
          <span className="levels_c">(L1 - L3), </span>{" "}
          <span className="chapter_c">C2</span>{" "}
          <span className="levels_c">(L1 - L2), </span>
          <span className="subject_c">English -</span>{" "}
          <span className="chapter_c">C1</span>{" "}
          <span className="levels_c">(L1 - L3), </span>{" "}
          <span className="chapter_c">C2</span>{" "}
          <span className="levels_c">(L1 - L2), </span>
          This achievement is recognized and appreciated throughout the year{" "}
          <span class="recipient-inline">2025</span>.
        </p>

        <div class="footer_certificate">
          <div class="footer-box">
            <div class="footer-line"></div>
            <span>DATE</span>
          </div>
          <div class="footer-box">
            <img src={Signature} class="signature" />
            <div class="footer-line"></div>
            <span>FOUNDER OF FEFDY</span>
          </div>
        </div>
        <div className="footer_bottom text-center">
          <p>Refer: C1 - Chapter, L1 - Level</p>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
