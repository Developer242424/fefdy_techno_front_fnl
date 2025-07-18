import React, { useEffect, useState } from "react";
import "./reports.css";
import "../../defaults/css/bootstrap.min.css";
import CertificateModal from "../Certificate/certificatemodal";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Reports = () => {
  const publicURL = process.env.REACT_APP_PUBLIC_API_URL;
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const { auth } = useAuth();
  const [reportsData, setreportsData] = useState(null);
  const [usedApi, setUseApi] = useState(false);

  const openModal = () => setShowCertificateModal(true);
  const closeModal = () => setShowCertificateModal(false);

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const res = await axios.post(
          `${process.env.REACT_APP_API_URL}wholereports`,
          {
            token: auth.token,
          }
        );
        const resData = res.data;
        if (resData.status === 200) {
          const reportsList = resData.data[0];
          setUseApi(true);
          setreportsData(reportsList);
        } else {
          console.error("Error fetching data:", resData.message);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    if (!usedApi) {
      fetchSubjects();
    }
  }, [auth.token, usedApi]);

  return (
    <div>
      <div className="section-content">
        {showCertificateModal && <CertificateModal onClose={closeModal} />}
        <div className="row">
          <div className="col-lg-12">
            <div className="tm-sc-nav-tabs_1-pricing-reports sub nav-tab-btn-button button-rounded">
              <div className="gallery col-lg-12">
                <div className="row gal">
                  <div className="col-lg-12">
                    <div className="row d-flex align-items-baseline">
                      <div className="col-lg-8 scroll_tab">
                        <ul className="nav nav-tabs_1" id="myTab" role="tablist">
                          {reportsData &&
                            reportsData.map((value, index) => {
                              const sanitizedSubject = value.subject.replace(/\s+/g, "");
                              return (
                                <li className="nav-item" key={value.id}>
                                  <a
                                    className={`nav-link ${index === 0 ? "active" : ""}`}
                                    id={`${sanitizedSubject + value.id}-tab`}
                                    data-toggle="tab"
                                    href={`#${sanitizedSubject + value.id}`}
                                    role="tab"
                                    aria-controls={sanitizedSubject + value.id}
                                    aria-selected="true"
                                  >
                                    <div className="avatar-container_c">
                                      <img
                                        className="tab_avatar"
                                        alt="avatar"
                                        src={publicURL + value.thumbnail}
                                      />
                                    </div>
                                    <div>{value.subject}</div>
                                  </a>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                      <div className="col-lg-4 text-right">
                        <button onClick={openModal} className="btn btn-primary">
                          View Certificate
                        </button>
                      </div>
                    </div>

                    <div className="tab-content" id="myTabContent">
                      {reportsData &&
                        reportsData.map((value, index) => {
                          const sanitizedSubject = value.subject.replace(/\s+/g, "");
                          const topicsArr = value.topics;
                          return (
                            <div
                              className={`tab-pane fade ${index === 0 ? "show active" : ""}`}
                              id={`${sanitizedSubject + value.id}`}
                              role="tabpanel"
                              aria-labelledby={`${sanitizedSubject + value.id}-tab`}
                              key={value.id}
                            >
                              <div className="table-container">
                                <table className="table-fixed">
                                  <thead>
                                    <tr>
                                      {topicsArr &&
                                        topicsArr.map((Tvalue) => {
                                          const levelsArr = [...Tvalue.levels].sort(
                                            (a, b) => a.its_level - b.its_level
                                          );
                                          const allLevelsComplete1 =
                                            levelsArr.length > 0 &&
                                            levelsArr.every(
                                              (level) =>
                                                level.subtopics?.length > 0 &&
                                                level.subtopics.every(
                                                  (sub) =>
                                                    sub.complete_count >=
                                                    JSON.parse(sub.category).length &&
                                                    sub.question_types.length ===
                                                    Tvalue.question_types.length
                                                )
                                            );
                                          const questionTypes = Tvalue.question_types || [];

                                          const totalLevels = levelsArr.length;

                                          const completedLevels = levelsArr.filter((level) => {
                                            const subtopics = level.subtopics || [];
                                            return (
                                              subtopics.length > 0 &&
                                              subtopics.every(
                                                (sub) =>
                                                  sub.complete_count >= JSON.parse(sub.category).length &&
                                                  sub.question_types.length === questionTypes.length
                                              )
                                            );
                                          }).length;

                                          const topicPercentage =
                                            totalLevels > 0
                                              ? Math.round((completedLevels / totalLevels) * 100)
                                              : 0;

                                          const allLevelsComplete = topicPercentage === 100;
                                          return (
                                            <th key={Tvalue.id} style={{ width: `700px` }}>
                                              <div className="progress_1">
                                                <div
                                                  className={`progress-bar w-${topicPercentage}`}
                                                  role="progressbar"
                                                  style={{ width: `${topicPercentage}%` }}
                                                  aria-valuenow="100"
                                                  aria-valuemin="0"
                                                  aria-valuemax="100"
                                                >
                                                  {topicPercentage}%
                                                </div>
                                              </div>
                                              {allLevelsComplete && (
                                                <i className="fa fa-check subject_check" />
                                              )}{" "}
                                              {Tvalue.title}
                                            </th>
                                          );
                                        })}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      {topicsArr &&
                                        topicsArr.map((Tvalue1, Tindex1) => {
                                          const levelsArr = [...Tvalue1.levels].sort(
                                            (a, b) => a.its_level - b.its_level
                                          );
                                          const questionTypesArr = Tvalue1.question_types;
                                          return (
                                            <td key={Tvalue1.id}>
                                              <div id={`accordion${Tvalue1.id}_${Tindex1}`}>
                                                {levelsArr.map((Lvalue, Lindex) => {
                                                  const subtopicsArr = Lvalue.subtopics;
                                                  const allSubtopicsComplete =
                                                    subtopicsArr?.length > 0 &&
                                                    subtopicsArr.every(
                                                      (s) =>
                                                        s.complete_count >=
                                                        JSON.parse(s.category).length &&
                                                        s.question_types.length ===
                                                        questionTypesArr.length
                                                    );

                                                  const ttl_marks = subtopicsArr.reduce((sum, d) => sum + (d.ttl_mark || 0), 0);
                                                  const got_marks = subtopicsArr.reduce((sum, d) => sum + (d.got_mark || 0), 0);
                                                  const percentageCalc = Math.round((got_marks / ttl_marks) * 100);

                                                  return (
                                                    <div className="card" key={Lvalue.id}>
                                                      <div
                                                        className={`card-header ${allSubtopicsComplete ? "complete" : ""
                                                          }`}
                                                        id={`heading${Lvalue.id}_${Lindex}`}
                                                        data-toggle="collapse"
                                                        data-target={`#collapse${Lvalue.id}_${Lindex}`}
                                                        aria-expanded="false"
                                                        aria-controls={`collapse${Lvalue.id}_${Lindex}`}
                                                      >
                                                        <h5 className="d-flex align-items-center">
                                                          <span>{Lvalue.title}</span>
                                                          <span className="level_score blink-soft">
                                                            {!Number.isNaN(percentageCalc) ? percentageCalc : 0}%
                                                          </span>
                                                          <i
                                                            className="fas fa-chevron-down rotate-icon"
                                                            data-toggle="collapse"
                                                            data-target={`#collapse${Lvalue.id}_${Lindex}`}
                                                            aria-expanded="false"
                                                            aria-controls={`collapse${Lvalue.id}_${Lindex}`}
                                                          ></i>
                                                        </h5>
                                                      </div>
                                                      <div
                                                        id={`collapse${Lvalue.id}_${Lindex}`}
                                                        className="collapse"
                                                        aria-labelledby={`heading${Lvalue.id}_${Lindex}`}
                                                        data-parent={`#accordion${Tvalue1.id}_${Tindex1}`}
                                                      >
                                                        <div className="card-body" style={{ padding: "0px" }}>
                                                          <table className="accord">
                                                            {subtopicsArr.map((Svalue, Sindex) => {
                                                              const subCat = JSON.parse(Svalue.category);
                                                              const isComplete =
                                                                Svalue.complete_count >= subCat.length &&
                                                                Svalue.question_types.length === questionTypesArr.length;
                                                              return (
                                                                <tr
                                                                  key={Sindex}
                                                                  style={
                                                                    isComplete
                                                                      ? { background: "#AFEEB8" }
                                                                      : {}
                                                                  }
                                                                >
                                                                  <td>
                                                                    <a href="#">
                                                                      {Svalue.title}
                                                                      <span className="subtopic_score">
                                                                        {" "}
                                                                        ({Svalue.got_mark} / {Svalue.ttl_mark})
                                                                      </span>
                                                                    </a>
                                                                  </td>
                                                                </tr>
                                                              );
                                                            })}
                                                          </table>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  );
                                                })}
                                              </div>
                                            </td>
                                          );
                                        })}
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
