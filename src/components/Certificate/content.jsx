import React from "react";
import "./content.css";
import Corner from "../../defaults/img/corner.png";
import FefdyLogo from "../../defaults/img/fefdy-logo.png";
import Ciaa from "../../defaults/img/ciaa.png";
import Iao from "../../defaults/img/iao.png";
import Signature from "../../defaults/img/signature.png";

const Certificate = () => {
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
          <span class="recipient-inline">24</span>, for successfully completing
          all 8 levels in Science, Math and English in the{" "}
          <strong> FEFDY Brain Gym</strong>, demonstrating consistent excellence
          throughout the year <span class="recipient-inline">2025</span>.
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
      </div>
    </div>
  );
};

export default Certificate;
