import React, { useEffect, useState } from "react";
import "./reports.css";
import "../../defaults/css/bootstrap.min.css"
import CertificateModal from "../Certificate/certificatemodal";

const Reports = () => {
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const openModal = () => setShowCertificateModal(true);
  const closeModal = () => setShowCertificateModal(false);
  return <div>
    <div className="section-content">
      {showCertificateModal && (
        <CertificateModal onClose={closeModal} />
      )}
      <div className="row">
        <div className="col-lg-12">
          <div className="tm-sc-nav-tabs-pricing-reports  sub nav-tab-btn-button button-rounded">
            <div className="gallery col-lg-12">
              <div className="row gal">
                <div className="col-lg-12">
                  <div className="scroll_tab">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                      <li class="nav-item">

                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"
                          aria-selected="true"> <div className="avatar-container_1">
                            <img alt="avatar" src="https://feboo.fefdybraingym.com/public/uploads/subjects/1751630532123-368341224.jpg" /></div> Science</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab"
                          aria-controls="profile" aria-selected="false"><div className="avatar-container_1">
                            <img alt="avatar" src="https://feboo.fefdybraingym.com/public/uploads/subjects/1751630526327-831975994.jpg" /></div> Mathematics</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" id="contact-tab" data-toggle="tab" href="#contact" role="tab"
                          aria-controls="contact" aria-selected="false"><div className="avatar-container_1">
                            <img alt="avatar" src="https://feboo.fefdybraingym.com/public/uploads/subjects/1751631879867-177704686.jpg" /></div> English</a>
                      </li>

                    </ul>

                  </div> <button onClick={openModal} className="btn btn-primary">
                    View Certificate
                  </button>
                  <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                      <div class="table-container">
                        <table class="table-fixed">
                          <thead>
                            <tr>
                              <th style={{ width: "700px" }} ><i class="fa fa-check subject_check" aria-hidden="true"></i> Water
                              </th>
                              <th style={{ width: "700px" }} >My Body</th>
                              <th style={{ width: "700px" }} >Air</th>
                              <th style={{ width: "700px" }} >Plants</th>
                              <th style={{ width: "700px" }} >Animals</th>
                              <th style={{ width: "700px" }} >Seasons</th>

                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td><div id="accordion">
                                <div class="card">
                                  <div class="card-header complete" id="headingOne" data-toggle="collapse" data-target="#collapseOne"
                                    aria-expanded="true" aria-controls="collapseOne">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 1</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseOne"
                                        aria-expanded="true" aria-controls="collapseOne"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div class="card">
                                  <div class="card-header" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo"
                                    aria-expanded="false" aria-controls="collapseTwo">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 2</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseTwo"
                                        aria-expanded="false" aria-controls="collapseTwo"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div class="card">
                                  <div class="card-header" id="headingThree" data-toggle="collapse" data-target="#collapseThree"
                                    aria-expanded="false" aria-controls="collapseThree">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 3</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseThree"
                                        aria-expanded="false" aria-controls="collapseThree"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div></td>
                              <td><div id="accordion1">
                                <div class="card">
                                  <div class="card-header" id="headingOne" data-toggle="collapse" data-target="#collapseOne"
                                    aria-expanded="true" aria-controls="collapseOne">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 1</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseOne"
                                        aria-expanded="true" aria-controls="collapseOne"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div class="card">
                                  <div class="card-header" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo"
                                    aria-expanded="false" aria-controls="collapseTwo">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 2</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseTwo"
                                        aria-expanded="false" aria-controls="collapseTwo"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div class="card">
                                  <div class="card-header" id="headingThree" data-toggle="collapse" data-target="#collapseThree"
                                    aria-expanded="false" aria-controls="collapseThree">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 3</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseThree"
                                        aria-expanded="false" aria-controls="collapseThree"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div></td>
                              <td><div id="accordion2">
                                <div class="card">
                                  <div class="card-header" id="headingOne" data-toggle="collapse" data-target="#collapseOne"
                                    aria-expanded="true" aria-controls="collapseOne">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 1</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseOne"
                                        aria-expanded="true" aria-controls="collapseOne"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div class="card">
                                  <div class="card-header" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo"
                                    aria-expanded="false" aria-controls="collapseTwo">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 2</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseTwo"
                                        aria-expanded="false" aria-controls="collapseTwo"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div class="card">
                                  <div class="card-header" id="headingThree" data-toggle="collapse" data-target="#collapseThree"
                                    aria-expanded="false" aria-controls="collapseThree">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 3</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseThree"
                                        aria-expanded="false" aria-controls="collapseThree"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div></td>
                              <td><div id="accordion3">
                                <div class="card">
                                  <div class="card-header" id="headingOne" data-toggle="collapse" data-target="#collapseOne"
                                    aria-expanded="true" aria-controls="collapseOne">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 1</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseOne"
                                        aria-expanded="true" aria-controls="collapseOne"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div class="card">
                                  <div class="card-header" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo"
                                    aria-expanded="false" aria-controls="collapseTwo">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 2</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseTwo"
                                        aria-expanded="false" aria-controls="collapseTwo"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div class="card">
                                  <div class="card-header" id="headingThree" data-toggle="collapse" data-target="#collapseThree"
                                    aria-expanded="false" aria-controls="collapseThree">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 3</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseThree"
                                        aria-expanded="false" aria-controls="collapseThree"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div></td>
                              <td><div id="accordion4">
                                <div class="card">
                                  <div class="card-header" id="headingOne" data-toggle="collapse" data-target="#collapseOne"
                                    aria-expanded="true" aria-controls="collapseOne">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 1</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseOne"
                                        aria-expanded="true" aria-controls="collapseOne"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div class="card">
                                  <div class="card-header" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo"
                                    aria-expanded="false" aria-controls="collapseTwo">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 2</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseTwo"
                                        aria-expanded="false" aria-controls="collapseTwo"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div class="card">
                                  <div class="card-header" id="headingThree" data-toggle="collapse" data-target="#collapseThree"
                                    aria-expanded="false" aria-controls="collapseThree">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 3</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseThree"
                                        aria-expanded="false" aria-controls="collapseThree"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div></td>
                              <td><div id="accordion5">
                                <div class="card">
                                  <div class="card-header" id="headingOne" data-toggle="collapse" data-target="#collapseOne"
                                    aria-expanded="true" aria-controls="collapseOne">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 1</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseOne"
                                        aria-expanded="true" aria-controls="collapseOne"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div class="card">
                                  <div class="card-header" id="headingTwo" data-toggle="collapse" data-target="#collapseTwo"
                                    aria-expanded="false" aria-controls="collapseTwo">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 2</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseTwo"
                                        aria-expanded="false" aria-controls="collapseTwo"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                                <div class="card">
                                  <div class="card-header" id="headingThree" data-toggle="collapse" data-target="#collapseThree"
                                    aria-expanded="false" aria-controls="collapseThree">
                                    <h5 class="d-flex justify-content-between align-items-center">
                                      <span>Level 3</span>
                                      <i class="fas fa-chevron-down rotate-icon" data-toggle="collapse" data-target="#collapseThree"
                                        aria-expanded="false" aria-controls="collapseThree"></i>
                                    </h5>
                                  </div>
                                  <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordion">
                                    <div class="card-body" style={{ padding: "0px" }}>
                                      <table className="accord">
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">What is Water?</a></td>
                                        </tr>
                                        <tr style={{ background: "#AFEEB8" }}>
                                          <td><a href="#">Where Do We Find Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Why Do We Need Water?</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Fun with Water!</a></td>
                                        </tr>
                                        <tr>
                                          <td><a href="#">Be Kind to Water!</a></td>
                                        </tr>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                              </div></td>

                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                      <h3>Profile Tab</h3>
                      <p>This is the profile tab content. You can add information about the user here.</p>
                    </div>
                    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                      <h3>Contact Tab</h3>
                      <p>This is the contact tab content. You can provide contact details here.</p>
                    </div>
                    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab1">
                      <h3>Contact Tab</h3>
                      <p>This is the contact tab content. You can provide contact details here.</p>
                    </div>
                    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab2">
                      <h3>Contact Tab</h3>
                      <p>This is the contact tab content. You can provide contact details here.</p>
                    </div>
                    <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab3">
                      <h3>Contact Tab</h3>
                      <p>This is the contact tab content. You can provide contact details here.</p>
                    </div>

                  </div>
                </div>

              </div></div></div></div></div></div></div>
    ;
};

export default Reports;
