import React, { useEffect, useState } from "react";
import "./reports.css";
import "../../defaults/css/bootstrap.min.css";
import CertificateModal from "../Certificate/certificatemodal";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const Reports = () => {
  const publicURL = process.env.REACT_APP_PUBLIC_API_URL;
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const { logout, auth, isLoading, setCommonError } = useAuth();
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
        // console.log(res);
        const resData = res.data;
        if (resData.status === 200) {
          const reportsList = resData.data[0];
          // console.log(reportsList);
          setUseApi(true);
          setreportsData(reportsList);
        } else if (resData.status === 401) {
          console.error("Error fetching data:", resData.message);
        } else if (resData.status === 400) {
          console.log("Error fetching data:", resData.message);
        } else if (resData.status === 500) {
          console.error("Error fetching data:", resData.message);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    if (usedApi === false) {
      fetchSubjects();
    }
  }, []);

  return (
    <div>
      <div className="section-content">
        {showCertificateModal && <CertificateModal onClose={closeModal} />}
        <div className="row">
          <div className="col-lg-12">
            <div className="tm-sc-nav-tabs_1-pricing-reports  sub nav-tab-btn-button button-rounded">
              <div className="gallery col-lg-12">
                <div className="row gal">
                  <div className="col-lg-12">
                    <div className="row d-flex align-items-baseline">
                      <div className="col-lg-8 scroll_tab">
                        <ul className="nav nav-tabs_1" id="myTab" role="tablist">
                          {reportsData &&
                            reportsData.length > 0 &&
                            reportsData.map((value, index) => {
                              const sanitizedSubject = value.subject.replace(
                                /\s+/g,
                                ""
                              );
                              return (
                                <li class="nav-item">
                                  <a
                                    class={`nav-link ${index === 0 ? `active` : ``
                                      }`}
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
                      </div>{" "}
                      <div className="col-lg-4 text-right">
                        <button onClick={openModal} className="btn btn-primary">
                          View Certificate
                        </button>
                      </div>
                    </div>

                    <div className="tab-content" id="myTabContent">
                      {reportsData &&
                        reportsData.length > 0 &&
                        reportsData.map((value, index) => {
                          const TsanitizedSubject = value.subject.replace(
                            /\s+/g,
                            ""
                          );
                          const topicsArr = value.topics;
                          return (
                            <div
                              class={`tab-pane fade ${index === 0 ? `show active` : ``
                                }`}
                              id={`${TsanitizedSubject + value.id}`}
                              role="tabpanel"
                              aria-labelledby={`${TsanitizedSubject + value.id
                                }-tab`}
                            >
                              <div class="table-container">
                                <table class="table-fixed">
                                  <thead>
                                    <tr>
                                      {topicsArr &&
                                        topicsArr.length > 0 &&
                                        topicsArr.map((Tvalue, Tindex) => {
                                          const levelsArr1 = Tvalue.levels;
                                          levelsArr1.sort(
                                            (a, b) => a.its_level - b.its_level
                                          );
                                          const allLevelsComplete =
                                            levelsArr1.length > 0
                                              ? levelsArr1.every(
                                                (level) =>
                                                  level.subtopics?.length >
                                                  0 &&
                                                  level.subtopics.every(
                                                    (sub) =>
                                                      sub.complete_count >=
                                                      JSON.parse(sub.category)
                                                        .length
                                                  )
                                              )
                                              : false;
                                          return (
                                            <th style={{ width: "700px" }}>
                                              {allLevelsComplete && (
                                                <i
                                                  class="fa fa-check subject_check"
                                                  aria-hidden="true"
                                                ></i>
                                              )}{" "}
                                              {Tvalue.title}
                                              <span className="topic_score"> (50%)</span>
                                            </th>
                                          );
                                        })}
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      {topicsArr &&
                                        topicsArr.length > 0 &&
                                        topicsArr.map((Tvalue1, Tindex1) => {
                                          const levelsArr = Tvalue1.levels;
                                          levelsArr.sort(
                                            (a, b) => a.its_level - b.its_level
                                          );
                                          return (
                                            <td>
                                              <div
                                                id={`accordion${Tvalue1.id}_${Tindex1}`}
                                              >
                                                {levelsArr &&
                                                  levelsArr.length > 0 &&
                                                  levelsArr.map(
                                                    (Lvalue, Lindex) => {
                                                      const subtopicsArr =
                                                        Lvalue.subtopics;
                                                      const allSubtopicsComplete =
                                                        subtopicsArr?.length > 0
                                                          ? subtopicsArr.every(
                                                            (s) =>
                                                              s.complete_count >=
                                                              JSON.parse(
                                                                s.category
                                                              ).length
                                                          )
                                                          : false;
                                                      return (
                                                        <div class="card">
                                                          <div
                                                            class={`card-header ${allSubtopicsComplete
                                                              ? `complete`
                                                              : ``
                                                              }`}
                                                            id={`heading${Lvalue.id}_${Lindex}`}
                                                            data-toggle="collapse"
                                                            data-target={`#collapse${Lvalue.id}_${Lindex}`}
                                                            aria-expanded="false"
                                                            aria-controls={`collapse${Lvalue.id}_${Lindex}`}
                                                          >
                                                            <h5 class="d-flex align-items-center ">
                                                              <span>
                                                                {Lvalue.title}
                                                              </span><span className="level_score">(30%)</span>
                                                              <i
                                                                class="fas fa-chevron-down rotate-icon "
                                                                data-toggle="collapse"
                                                                data-target={`#collapse${Lvalue.id}_${Lindex}`}
                                                                aria-expanded="false"
                                                                aria-controls={`collapse${Lvalue.id}_${Lindex}`}
                                                              ></i>
                                                            </h5>
                                                          </div>
                                                          <div
                                                            id={`collapse${Lvalue.id}_${Lindex}`}
                                                            class="collapse"
                                                            aria-labelledby={`heading${Lvalue.id}_${Lindex}`}
                                                            data-parent={`#accordion${Tvalue1.id}_${Tindex1}`}
                                                          >
                                                            <div
                                                              class="card-body"
                                                              style={{
                                                                padding: "0px",
                                                              }}
                                                            >
                                                              <table className="accord">
                                                                {subtopicsArr &&
                                                                  subtopicsArr.length >
                                                                  0 &&
                                                                  subtopicsArr.map(
                                                                    (
                                                                      Svalue,
                                                                      Sindex
                                                                    ) => {
                                                                      const subCat =
                                                                        JSON.parse(
                                                                          Svalue.category
                                                                        );
                                                                      const isComplete =
                                                                        Svalue.complete_count >=
                                                                        subCat.length;
                                                                      return (
                                                                        <tr
                                                                          key={
                                                                            Sindex
                                                                          }
                                                                          style={
                                                                            isComplete
                                                                              ? {
                                                                                background:
                                                                                  "#AFEEB8",
                                                                              }
                                                                              : {}
                                                                          }
                                                                        >
                                                                          <td>
                                                                            <a href="#">
                                                                              {
                                                                                Svalue.title
                                                                              }
                                                                              <span className="subtopic_score"> (5 / 10)</span>  </a>
                                                                          </td>
                                                                        </tr>
                                                                      );
                                                                    }
                                                                  )}
                                                              </table>
                                                            </div>
                                                          </div>
                                                        </div>
                                                      );
                                                    }
                                                  )}
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
